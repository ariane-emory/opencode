{
  lib,
  stdenvNoCC,
  callPackage,
  bun,
  sysctl,
  makeBinaryWrapper,
  models-dev,
  ripgrep,
  installShellFiles,
  versionCheckHook,
  writableTmpDirAsHomeHook,
  node_modules ? callPackage ./node-modules.nix { },
}:
stdenvNoCC.mkDerivation (finalAttrs: {
  pname = "baseone";
  version = args.version;

  src = args.src;

  src = lib.fileset.toSource {
    root = ../.;
    fileset = lib.fileset.intersection (lib.fileset.fromSource (lib.sources.cleanSource ../.)) (
      lib.fileset.unions [
        ../packages
        ../bun.lock
        ../package.json
        ../patches
        ../install
      ]
    );
  };

  node_modules = stdenvNoCC.mkDerivation {
    pname = "${finalAttrs.pname}-node_modules";
    inherit (finalAttrs) version src;

    impureEnvVars = lib.fetchers.proxyImpureEnvVars ++ [
      "GIT_PROXY_COMMAND"
      "SOCKS_SERVER"
    ];

    nativeBuildInputs = [
      bun
    ];

    dontConfigure = true;

    buildPhase = ''
      runHook preBuild
      export HOME=$(mktemp -d)
      export BUN_INSTALL_CACHE_DIR=$(mktemp -d)
      bun install \
        --cpu="${if stdenvNoCC.hostPlatform.isAarch64 then "arm64" else "x64"}" \
        --os="${if stdenvNoCC.hostPlatform.isLinux then "linux" else "darwin"}" \
        --frozen-lockfile \
        --ignore-scripts \
        --no-progress \
        --linker=isolated
      bun --bun ${./scripts/canonicalize-node-modules.ts}
      bun --bun ${./scripts/normalize-bun-binaries.ts}
      runHook postBuild
    '';

    installPhase = ''
      runHook preInstall

      mkdir -p $out
      find . -type d -name node_modules -exec cp -R --parents {} $out \;

      runHook postInstall
    '';

    dontFixup = true;

    outputHashAlgo = "sha256";
    outputHashMode = "recursive";
    outputHash =
      (lib.pipe ./hashes.json [
        builtins.readFile
        builtins.fromJSON
      ]).nodeModules.${stdenvNoCC.hostPlatform.system};
  };

  nativeBuildInputs = [
    bun
    installShellFiles
    makeBinaryWrapper
    models-dev
    writableTmpDirAsHomeHook
  ];

  configurePhase = ''
    runHook preConfigure

    cp -R ${finalAttrs.node_modules}/. .

    runHook postConfigure
  '';

  env.MODELS_DEV_API_JSON = "${models-dev}/dist/_api.json";
  env.OPENCODE_DISABLE_MODELS_FETCH = true;
  env.BASEONE_VERSION = args.version;
  env.BASEONE_CHANNEL = "stable";

  buildPhase = ''
    runHook preBuild

    cp -r ${finalAttrs.node_modules}/node_modules .
    cp -r ${finalAttrs.node_modules}/packages .

    (
      cd packages/opencode

      chmod -R u+w ./node_modules
      mkdir -p ./node_modules/@ariane-emory
      rm -f ./node_modules/@opencode-ai/{script,sdk,plugin}
      ln -s $(pwd)/../../packages/script ./node_modules/@opencode-ai/script
      ln -s $(pwd)/../../packages/sdk/js ./node_modules/@opencode-ai/sdk
      ln -s $(pwd)/../../packages/plugin ./node_modules/@opencode-ai/plugin

      cp ${./bundle.ts} ./bundle.ts
      chmod +x ./bundle.ts
      bun run ./bundle.ts
    )

    runHook postBuild
  '';

  installPhase = ''
    runHook preInstall

    install -Dm755 dist/opencode-*/bin/opencode $out/bin/opencode
    install -Dm644 schema.json $out/share/opencode/schema.json

    mkdir -p $out/lib/baseone
    cp -r dist $out/lib/baseone/
    chmod -R u+w $out/lib/baseone/dist

    # Select bundled worker assets deterministically (sorted find output)
    worker_file=$(find "$out/lib/base-one/dist" -type f \( -path '*/tui/worker.*' -o -name 'worker.*' \) | sort | head -n1)
    parser_worker_file=$(find "$out/lib/base-one/dist" -type f -name 'parser.worker.*' | sort | head -n1)
    if [ -z "$worker_file" ]; then
      echo "ERROR: bundled worker not found"
      exit 1
    fi

    main_wasm=$(printf '%s\n' "$out"/lib/baseone/dist/tree-sitter-*.wasm | sort | head -n1)
    wasm_list=$(find "$out/lib/baseone/dist" -maxdepth 1 -name 'tree-sitter-*.wasm' -print)
    for patch_file in "$worker_file" "$parser_worker_file"; do
      [ -z "$patch_file" ] && continue
      [ ! -f "$patch_file" ] && continue
      if [ -n "$wasm_list" ] && grep -q 'tree-sitter' "$patch_file"; then
        # Rewrite wasm references to absolute store paths to avoid runtime resolve failures.
        bun --bun ${scripts + "/patch-wasm.ts"} "$patch_file" "$main_wasm" $wasm_list
      fi
    done

    mkdir -p $out/lib/baseone/node_modules
    cp -r ../../node_modules/.bun $out/lib/baseone/node_modules/
    mkdir -p $out/lib/baseone/node_modules/@opentui

    mkdir -p $out/bin
    makeWrapper ${bun}/bin/bun $out/bin/baseone \
      --add-flags "run" \
      --add-flags "$out/lib/baseone/dist/src/index.js" \
      --prefix PATH : ${
        lib.makeBinPath (
          [
            ripgrep
          ]
          # bun runs sysctl to detect if dunning on rosetta2
          ++ lib.optional stdenvNoCC.hostPlatform.isDarwin sysctl
        )
      } \
      --argv0 baseone

    runHook postInstall
  '';

  postInstall = ''
    for pkg in $out/lib/baseone/node_modules/.bun/@opentui+core-* $out/lib/baseone/node_modules/.bun/@opentui+solid-* $out/lib/baseone/node_modules/.bun/@opentui+core@* $out/lib/baseone/node_modules/.bun/@opentui+solid@*; do
      if [ -d "$pkg" ]; then
        pkgName=$(basename "$pkg" | sed 's/@opentui+\([^@]*\)@.*/\1/')
        ln -sf ../.bun/$(basename "$pkg")/node_modules/@opentui/$pkgName \
          $out/lib/baseone/node_modules/@opentui/$pkgName
      fi
    done
  '' + lib.optionalString (stdenvNoCC.buildPlatform.canExecute stdenvNoCC.hostPlatform) ''
    # trick yargs into also generating zsh completions
    installShellCompletion --cmd baseone \
      --bash <($out/bin/baseone completion) \
      --zsh <(SHELL=/bin/zsh $out/bin/baseone completion)
  '';

  nativeInstallCheckInputs = [
    versionCheckHook
    writableTmpDirAsHomeHook
  ];
  doInstallCheck = true;
  versionCheckKeepEnvironment = [ "HOME" "OPENCODE_DISABLE_MODELS_FETCH" ];
  versionCheckProgramArg = "--version";

  passthru = {
    jsonschema = "${placeholder "out"}/share/opencode/schema.json";
  };

  meta = {
    description = "AI coding agent built for the terminal";
    longDescription = ''
      BaseOne is a terminal-based agent that can build anything.
      It combines a TypeScript/JavaScript core with a Go-based TUI
      to provide an interactive AI coding experience.
    '';
    homepage = "https://github.com/ariane-emory/baseone";
    license = lib.licenses.mit;
    mainProgram = "baseone";
    inherit (node_modules.meta) platforms;
  };
})
