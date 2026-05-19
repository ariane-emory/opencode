export * as ConfigFormatter from "./formatter"

import { Schema } from "effect"
import { ConfigBoolean } from "@opencode-ai/core/schema"

export const Entry = Schema.Struct({
  disabled: Schema.optional(ConfigBoolean),
  command: Schema.optional(Schema.mutable(Schema.Array(Schema.String))),
  environment: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  extensions: Schema.optional(Schema.mutable(Schema.Array(Schema.String))),
})

export const Info = Schema.Union([ConfigBoolean, Schema.Record(Schema.String, Entry)])
export type Info = Schema.Schema.Type<typeof Info>
