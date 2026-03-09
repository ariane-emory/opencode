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

test("substituteArguments - simple $N does not swallow", () => {
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

test("substituteArguments - ${1} syntax single arg", () => {
  const { result, hasPlaceholders } = substituteArguments("hello ${1}", ["world"])
  expect(result).toBe("hello world")
  expect(hasPlaceholders).toBe(true)
})

test("substituteArguments - ${N} does not swallow", () => {
  const { result } = substituteArguments("${1} ${2}", ["a", "b", "c", "d"])
  expect(result).toBe("a b")
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

test("substituteArguments - ${1:default} with provided arg", () => {
  const { result } = substituteArguments("${1:fallback}", ["provided"])
  expect(result).toBe("provided")
})

test("substituteArguments - ${1:default} with empty arg", () => {
  const { result } = substituteArguments("${1:fallback}", [""])
  expect(result).toBe("fallback")
})

test("substituteArguments - ${1:default} with whitespace arg", () => {
  const { result } = substituteArguments("${1:fallback}", ["   "])
  expect(result).toBe("fallback")
})

test("substituteArguments - ${1:default} with missing arg", () => {
  const { result } = substituteArguments("${2:fallback}", ["only-one"])
  expect(result).toBe("fallback")
})

test("substituteArguments - ${1:multi word default}", () => {
  const { result } = substituteArguments("${1:foo bar baz}", [])
  expect(result).toBe("foo bar baz")
})

test("substituteArguments - mix of $1 and ${2:default}", () => {
  const { result } = substituteArguments("$1 and ${2:fallback}", ["first"])
  expect(result).toBe("first and fallback")
})

test("substituteArguments - ${2:default} does not swallow", () => {
  const { result } = substituteArguments("${1:first} ${2:second}", ["a", "b", "c"])
  expect(result).toBe("a b")
})

test("substituteArguments - ${N:default} hasPlaceholders is true", () => {
  const { hasPlaceholders } = substituteArguments("${1:default}", [])
  expect(hasPlaceholders).toBe(true)
})

test("substituteArguments - ${3:$2} with arg3 missing uses arg2", () => {
  const { result } = substituteArguments("${3:$2}", ["a", "b"])
  expect(result).toBe("b")
})

test("substituteArguments - ${3:$2} with arg3 present uses arg3", () => {
  const { result } = substituteArguments("${3:$2}", ["a", "b", "c"])
  expect(result).toBe("c")
})

test("substituteArguments - ${2:$1} fallback chain", () => {
  const { result } = substituteArguments("${2:$1}", ["only-first"])
  expect(result).toBe("only-first")
})

test("substituteArguments - ${1..:default} with args", () => {
  const { result } = substituteArguments("${1..:fallback}", ["a", "b", "c"])
  expect(result).toBe("a b c")
})

test("substituteArguments - ${1..:default} without args uses default", () => {
  const { result } = substituteArguments("${1..:fallback}", [])
  expect(result).toBe("fallback")
})

test("substituteArguments - ${2..3:default} with args", () => {
  const { result } = substituteArguments("${2..3:fallback}", ["a", "b", "c", "d"])
  expect(result).toBe("b c")
})

test("substituteArguments - ${2..3:default} without args uses default", () => {
  const { result } = substituteArguments("${2..3:fallback}", ["a"])
  expect(result).toBe("fallback")
})

test("substituteArguments - ${..:default} captures all from start", () => {
  const { result } = substituteArguments("${..:fallback}", ["a", "b"])
  expect(result).toBe("a b")
})

test("substituteArguments - ${..:default} without args uses default", () => {
  const { result } = substituteArguments("${..:fallback}", [])
  expect(result).toBe("fallback")
})

test("substituteArguments - ${..3:default} with args", () => {
  const { result } = substituteArguments("${..3:fallback}", ["a", "b", "c", "d"])
  expect(result).toBe("a b c")
})

test("substituteArguments - ${..3:default} without args uses default", () => {
  const { result } = substituteArguments("${..3:fallback}", [])
  expect(result).toBe("fallback")
})

test("substituteArguments - ${1..:multi word default}", () => {
  const { result } = substituteArguments("${1..:foo bar baz}", [])
  expect(result).toBe("foo bar baz")
})

test("substituteArguments - ${N..:default} hasPlaceholders is true", () => {
  const { hasPlaceholders } = substituteArguments("${1..:default}", [])
  expect(hasPlaceholders).toBe(true)
})

test("substituteArguments - ${2:$1:fallback} uses arg2", () => {
  const { result } = substituteArguments("${2:$1:fallback}", ["a", "b"])
  expect(result).toBe("b")
})

test("substituteArguments - ${2:$1:fallback} falls back to arg1", () => {
  const { result } = substituteArguments("${2:$1:fallback}", ["a", ""])
  expect(result).toBe("a")
})

test("substituteArguments - ${2:$1:fallback} falls back to literal", () => {
  const { result } = substituteArguments("${2:$1:fallback}", ["", ""])
  expect(result).toBe("fallback")
})

test("substituteArguments - ${3:$2:$1:final} chained fallback", () => {
  const { result } = substituteArguments("${3:$2:$1:final}", ["first"])
  expect(result).toBe("first")
})

test("substituteArguments - ${3:$2:$1:final} uses final", () => {
  const { result } = substituteArguments("${3:$2:$1:final}", [])
  expect(result).toBe("final")
})

test("substituteArguments - ${1::fallback} invalid returns unchanged", () => {
  const { result } = substituteArguments("${1::fallback}", [])
  expect(result).toBe("${1::fallback}")
})

test("substituteArguments - ${1:$2:} invalid returns with empty between colons", () => {
  const { result } = substituteArguments("${1:$2:}", ["", ""])
  expect(result).toBe("${1::}")
})

test("substituteArguments - ${1..:$2:fallback} range with chained fallback", () => {
  const { result } = substituteArguments("${1..:$2:fallback}", ["", "b"])
  expect(result).toBe("b")
})

test("substituteArguments - ${1..:$2:fallback} range uses final fallback", () => {
  const { result } = substituteArguments("${1..:$2:fallback}", [])
  expect(result).toBe("fallback")
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

test("substituteArguments - arguments with spaces are split", () => {
  // Spaces are ALWAYS separators in OpenCode slash commands
  const { result } = substituteArguments("$1 $2 $3", ["hello world test"])
  expect(result).toBe("hello world test")
})
