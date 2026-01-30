import { describe, expect, test } from "bun:test"
import { Command } from "../../src/command"

describe("Command.hints", () => {
  test("should extract $N placeholders", () => {
    const template = "Hello $1 and $2"
    const result = Command.hints(template)
    expect(result).toEqual(["$1", "$2"])
  })

  test("should extract ${...} placeholders", () => {
    const template = "Hello ${1} and ${2:3}"
    const result = Command.hints(template)
    expect(result).toEqual(["${1}", "${2:3}"])
  })

  test("should extract $ARGUMENTS placeholder", () => {
    const template = "Hello $ARGUMENTS"
    const result = Command.hints(template)
    expect(result).toEqual(["$ARGUMENTS"])
  })

  test("should extract mixed placeholders", () => {
    const template = "Hello $1 and ${2:3} and $ARGUMENTS"
    const result = Command.hints(template)
    expect(result).toEqual(["$1", "${2:3}", "$ARGUMENTS"])
  })

  test("should deduplicate placeholders", () => {
    const template = "Hello $1 and $1 again"
    const result = Command.hints(template)
    expect(result).toEqual(["$1"])
  })

  test("should handle ${:} syntax", () => {
    const template = "All args: ${:}"
    const result = Command.hints(template)
    expect(result).toEqual(["${:}"])
  })

  test("should handle ${:3} syntax", () => {
    const template = "First three: ${:3}"
    const result = Command.hints(template)
    expect(result).toEqual(["${:3}"])
  })

  test("should handle ${2:} syntax", () => {
    const template = "From second: ${2:}"
    const result = Command.hints(template)
    expect(result).toEqual(["${2:}"])
  })
})
