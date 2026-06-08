import { Effect } from "effect"
import type { DatabaseMigration } from "../migration"

export default {
  id: "20260607100000_add_session_time_pinned",
  up(tx) {
    return Effect.gen(function* () {
      yield* tx.run(`SELECT 1`)
    })
  },
} satisfies DatabaseMigration.Migration
