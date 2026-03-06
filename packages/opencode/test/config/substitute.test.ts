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

test("substituteArguments - $N placeholders do not swallow", () => {
  const { result } = substituteArguments("$1 $2", ["a", "b", "c", "d"])
  expect(result).toBe("a b")
})

test("substituteArguments - missing argument returns empty", () => {
  const { result } = substituteArguments("$1 and $3", ["only", "two"])
  expect(result).toBe("only and ")
})

test("substituteArguments - $ARGUMENTS replaced", () => {
  const { result } = substituteArguments("args: $ARGUMENTS", ["a", "b", "c"])
  expect(result).toBe("args: a b c")
})

test("substituteArguments - ${N} syntax single arg", () => {
  const { result, hasPlaceholders } = substituteArguments("hello ${1}", ["world"])
  expect(result).toBe("hello world")
  expect(hasPlaceholders).toBe(true)
})

test("substituteArguments - ${N..M} slice", () => {
  const { result } = substituteArguments("${1..3}", ["a", "b", "c", "d"])
  expect(result).toBe("a b c")
})

test("substituteArguments - ${N..} open-ended slice", () => {
  const { result } = substituteArguments("${2..}", ["a", "b", "c", "d"])
  expect(result).toBe("b c d")
})

test("substituteArguments - ${..M} slice from start", () => {
  const { result } = substituteArguments("${..2}", ["a", "b", "c", "d"])
  expect(result).toBe("a b")
})

test("substituteArguments - ${..} all arguments", () => {
  const { result } = substituteArguments("all: ${..}", ["a", "b", "c"])
  expect(result).toBe("all: a b c")
})
