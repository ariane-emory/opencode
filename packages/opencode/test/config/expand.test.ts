import { expect, test, describe } from "bun:test"
import { MarkdownExpand } from "../../src/config/expand"

describe("MarkdownExpand", () => {
  describe("expand", () => {
    test("should expand a simple shell command", async () => {
      const content = "Hello !`echo world`"
      const result = await MarkdownExpand.expand(content)
      expect(result).toBe("Hello world")
    })

    test("should expand multiple shell commands", async () => {
      const content = "!`echo hello` !`echo world`"
      const result = await MarkdownExpand.expand(content)
      expect(result).toBe("hello world")
    })

    test("should handle commands with no output", async () => {
      const content = "before!`true`after"
      const result = await MarkdownExpand.expand(content)
      expect(result).toBe("beforeafter")
    })

    test("should preserve content without shell commands", async () => {
      const content = "This is plain text\nwith multiple lines"
      const result = await MarkdownExpand.expand(content)
      expect(result).toBe("This is plain text\nwith multiple lines")
    })

    test("should handle multiline command output", async () => {
      const content = "Lines: !`printf 'a\\nb\\nc'`"
      const result = await MarkdownExpand.expand(content)
      expect(result).toBe("Lines: a\nb\nc")
    })

    test("should strip YAML frontmatter", async () => {
      const content = `---
title: Test
description: A test file
---

Content here`
      const result = await MarkdownExpand.expand(content)
      expect(result).toBe("Content here")
    })

    test("should strip frontmatter and expand commands", async () => {
      const content = `---
title: Test
---

Hello !`+"`echo world`"
      const result = await MarkdownExpand.expand(content)
      expect(result).toBe("Hello world")
    })

    test("should expand recursively when output contains shell syntax", async () => {
      // First command outputs shell syntax via cat, which should be expanded in second pass
      const content = "!`cat /tmp/test-expand.txt`"
      // Create the temp file with shell syntax using Bun.write to avoid escaping issues
      await Bun.write("/tmp/test-expand.txt", "!`echo inner`")
      const result = await MarkdownExpand.expand(content)
      expect(result).toBe("inner")
    })

    test("should handle failed commands gracefully", async () => {
      const content = "Result: !`exit 1`"
      const result = await MarkdownExpand.expand(content)
      // Failed command should return empty string (no stderr captured)
      expect(result).toBe("Result:")
    })

    test("should handle non-existent command", async () => {
      const content = "Result: !`nonexistent_command_12345`"
      const result = await MarkdownExpand.expand(content)
      // Should not throw, result may contain error or be empty
      expect(typeof result).toBe("string")
    })

    test("should respect cwd option", async () => {
      const content = "Dir: !`pwd`"
      const result = await MarkdownExpand.expand(content, { cwd: "/tmp" })
      expect(result).toBe("Dir: /tmp")
    })

    test("should handle empty content", async () => {
      const result = await MarkdownExpand.expand("")
      expect(result).toBe("")
    })

    test("should handle content with only frontmatter", async () => {
      const content = `---
title: Only frontmatter
---
`
      const result = await MarkdownExpand.expand(content)
      expect(result.trim()).toBe("")
    })

    test("should prevent infinite loops with max iterations", async () => {
      // This would cause infinite expansion if not guarded
      // The command outputs itself
      const content = "!`echo '!\\`echo infinite\\`'`"
      const result = await MarkdownExpand.expand(content)
      // Should eventually stop and return something
      expect(typeof result).toBe("string")
    })

    test("should expand positional arguments as $1, $2, etc.", async () => {
      const content = "First: !`echo $1`, Second: !`echo $2`"
      const result = await MarkdownExpand.expand(content, { args: ["hello", "world"] })
      expect(result).toBe("First: hello, Second: world")
    })

    test("should expand $ARGUMENTS as all arguments joined", async () => {
      const content = "Args: !`echo $ARGUMENTS`"
      const result = await MarkdownExpand.expand(content, { args: ["one", "two", "three"] })
      expect(result).toBe("Args: one two three")
    })

    test("should handle empty arguments gracefully", async () => {
      const content = "Value: !`echo hello`"
      const result = await MarkdownExpand.expand(content, { args: [] })
      expect(result).toBe("Value: hello")
    })

    test("should substitute $1, $2 in plain text", async () => {
      const content = "Hello $1, welcome to $2!"
      const result = await MarkdownExpand.expand(content, { args: ["Alice", "Wonderland"] })
      expect(result).toBe("Hello Alice, welcome to Wonderland!")
    })

    test("should substitute $ARGUMENTS in plain text", async () => {
      const content = "You said: $ARGUMENTS"
      const result = await MarkdownExpand.expand(content, { args: ["hello", "world"] })
      expect(result).toBe("You said: hello world")
    })

    test("should replace $1 and $ARGUMENTS with empty string when no args provided", async () => {
      const content = "First: $1, All: $ARGUMENTS, End"
      const result = await MarkdownExpand.expand(content, { args: [] })
      expect(result).toBe("First: , All: , End")
    })

    test("should replace unsupplied positional args with empty string", async () => {
      const content = "First: $1, Second: $2, Third: $3"
      const result = await MarkdownExpand.expand(content, { args: ["only-one"] })
      expect(result).toBe("First: only-one, Second: , Third:")
    })
  })
})
