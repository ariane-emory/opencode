/**
 * Compares two strings intelligently, understanding version numbers and dates.
 * Returns negative if a should come before b, positive if b should come before a.
 * Higher versions and more recent dates come first.
 */
export function smartCompare(a: string, b: string): number {
  // Extract version numbers (e.g., "3", "2.5", "1.5")
  const versionA = extractVersion(a)
  const versionB = extractVersion(b)

  // Compare versions (higher = newer = comes first)
  if (versionA !== null && versionB !== null && versionA !== versionB) {
    return versionB - versionA // Descending
  }

  // Same version or no version, check for dates
  const dateA = extractDate(a)
  const dateB = extractDate(b)

  if (dateA !== null && dateB !== null) {
    return dateB.getTime() - dateA.getTime() // Descending (newest first)
  }

  // If only one has a date, it should come first
  if (dateA !== null) return -1
  if (dateB !== null) return 1

  // Fall back to alphabetical
  return a.localeCompare(b)
}

/**
 * Extract version number from string like "Gemini 2.5 Flash"
 * Returns the version as a number, or null if not found
 */
function extractVersion(str: string): number | null {
  // Match version patterns like "2.5", "3", "2.0", "1.5"
  // Look for numbers that likely represent versions (preceded by word boundary or space)
  const match = str.match(/(?:^|\s)(\d+(?:\.\d+)?)(?:\s|$|[^\d])/)
  if (match) {
    return parseFloat(match[1])
  }
  return null
}

/**
 * Extract date from string like "Preview 05-20" or "2024-05-20"
 * Returns Date object or null
 */
function extractDate(str: string): Date | null {
  // Try MM-DD format (e.g., "05-20")
  const mmddMatch = str.match(/(\d{2})-(\d{2})(?:\s|$)/)
  if (mmddMatch) {
    const month = parseInt(mmddMatch[1], 10)
    const day = parseInt(mmddMatch[2], 10)
    if (month >= 1 && month <= 12 && day >= 1 && day <= 31) {
      // Assume current year for MM-DD format
      const year = new Date().getFullYear()
      return new Date(year, month - 1, day)
    }
  }

  // Try YYYY-MM-DD format
  const yyyymmddMatch = str.match(/(\d{4})-(\d{2})-(\d{2})/)
  if (yyyymmddMatch) {
    const year = parseInt(yyyymmddMatch[1], 10)
    const month = parseInt(yyyymmddMatch[2], 10)
    const day = parseInt(yyyymmddMatch[3], 10)
    return new Date(year, month - 1, day)
  }

  return null
}
