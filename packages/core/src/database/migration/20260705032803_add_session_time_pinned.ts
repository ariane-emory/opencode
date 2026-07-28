import { Effect } from "effect"
import type { DatabaseMigration } from "../migration"

export default {
  id: "20260705032803_add_session_time_pinned",
  up(tx) {
    return Effect.gen(function* () {
      if (
        (yield* tx.all<{ name: string }>(`PRAGMA table_info(\`session\`)`)).some((column) => column.name === "time_pinned")
      )
        return
      yield* tx.run(`ALTER TABLE \`session\` ADD \`time_pinned\` integer;`)
    })
  },
} satisfies DatabaseMigration.Migration
