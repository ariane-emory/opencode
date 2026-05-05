export * as ConfigFormatter from "./formatter"

import { Schema } from "effect"
import { zod } from "@/util/effect-zod"
import { ConfigBoolean, withStatics } from "@/util/schema"

export const Entry = Schema.Struct({
  disabled: Schema.optional(ConfigBoolean),
  command: Schema.optional(Schema.mutable(Schema.Array(Schema.String))),
  environment: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  extensions: Schema.optional(Schema.mutable(Schema.Array(Schema.String))),
}).pipe(withStatics((s) => ({ zod: zod(s) })))

export const Info = Schema.Union([ConfigBoolean, Schema.Record(Schema.String, Entry)]).pipe(
  withStatics((s) => ({ zod: zod(s) })),
)
export type Info = Schema.Schema.Type<typeof Info>
