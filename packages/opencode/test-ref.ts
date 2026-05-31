import { Context, Effect, Layer, ManagedRuntime } from "effect"
import { memoMap } from "@opencode-ai/core/effect/memo-map"

const InstanceRef = Context.Reference<string | undefined>("test/InstanceRef", {
  defaultValue: () => undefined,
})

const getInstance = Effect.gen(function* () {
  const ctx = yield* InstanceRef
  if (!ctx) return yield* Effect.die(new Error("InstanceRef not provided"))
  return ctx
})

class MyService extends Context.Service<MyService, { run: () => Effect.Effect<string> }>()("test/MyService") {}

const layer = Layer.effect(
  MyService,
  Effect.gen(function* () {
    return {
      run: () => getInstance,
    }
  }),
)

const rt = ManagedRuntime.make(layer, { memoMap })

async function test() {
  try {
    const result = await rt.runPromise(
      MyService.use((svc) => svc.run()).pipe(Effect.provideService(InstanceRef, "hello")),
    )
    console.log("Result:", result)
  } catch (err) {
    console.log("Error:", err)
  }
}

test()
