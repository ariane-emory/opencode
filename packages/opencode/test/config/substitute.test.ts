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

test("substituteArguments - $N with ${N..} does not swallow", () => {
  // Regression test for: $2 should NOT swallow args meant for ${3..}
  // This is the use case for commands like /edit-branch-and-merge
  // $1 = command name (edit-branch-and-merge)
  // $2 = branch name (feat/add-arianes-themes)
  // ${3..} = remaining args (foo bar baz)
  const { result } = substituteArguments("Branch: $2, Args: ${3..}", [
    "edit-branch-and-merge",
    "feat/add-arianes-themes",
    "foo",
    "bar",
    "baz",
  ])
  expect(result).toBe("Branch: feat/add-arianes-themes, Args: foo bar baz")
})

test("substituteArguments - ${2:fallback} uses default", () => {
  const { result } = substituteArguments("${2:fallback}", ["only-one"])
  expect(result).toBe("fallback")
})

test("substituteArguments - ${3:$2} uses previous arg fallback", () => {
  const { result } = substituteArguments("${3:$2}", ["a", "b"])
  expect(result).toBe("b")
})

test("substituteArguments - ${2..3:fallback} uses slice when present", () => {
  const { result } = substituteArguments("${2..3:fallback}", ["a", "b", "c", "d"])
  expect(result).toBe("b c")
})

test("substituteArguments - ${2..3:fallback} uses default when missing", () => {
  const { result } = substituteArguments("${2..3:fallback}", ["a"])
  expect(result).toBe("fallback")
})

test("substituteArguments - mixed range and chained defaults", () => {
  const { result } = substituteArguments("${2..:default string}, ${3:$2:a secondary default}, ${2..3:a value}", [
    "foo",
    "bar",
    "baz",
    "quux",
  ])
  expect(result).toBe("bar baz quux, baz, bar baz")
})
