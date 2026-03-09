p = "packages/opencode/src/tool/registry.ts"
with open(p, "r") as f: lines = f.readlines()
del lines[30:35]
lines[30:30] = ["import { BookmarkCurrentSessionTool } from "./bookmark"
", "import { GetCurrentSessionTitleTool } from "./session-title"
"]
with open(p, "w") as f: f.writelines(lines)
