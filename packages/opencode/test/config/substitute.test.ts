import { test, expect } from "bun:test"
import { substituteArguments } from "../../src/config/substitute"

test("substituteArguments - no placeholders", () => {
  const { result, hasPlaceholders } = substituteArguments("hello world", ["a", "b"])
  expect(result).toBe("hello world")
  expect(hasPlaceholders).toBe(false)
})

test("substituteArguments - single placeholder", () => {
  const { result, hasPlaceholders } = substituteArguments("hello $1", ["world"])
  expect(result).toBe("hello world")
  expect(hasPlaceholders).toBe(true)
})

test("substituteArguments - multiple placeholders", () => {
  const { result, hasPlaceholders } = substituteArguments("$1 and $2", ["first", "second"])
  expect(result).toBe("first and second")
  expect(hasPlaceholders).toBe(true)
})

test("substituteArguments - last placeholder swallows remaining", () => {
  const { result } = substituteArguments("$1 $2", ["a", "b", "c", "d"])
  expect(result).toBe("a b c d")
})

test("substituteArguments - missing argument returns empty", () => {
  const { result } = substituteArguments("$1 and $3", ["only", "two"])
  expect(result).toBe("only and ")
})

test("substituteArguments - $ARGUMENTS replaced", () => {
  const { result } = substituteArguments("args: $ARGUMENTS", ["a", "b", "c"])
  expect(result).toBe("args: a b c")
})
