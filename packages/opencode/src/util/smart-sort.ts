export function smartCompare(a: string, b: string): number {
  const versionCompare = compareVersionTokens(a, b)
  if (versionCompare !== 0) return versionCompare

  const dateA = extractDate(a)
  const dateB = extractDate(b)

  if (dateA !== null && dateB !== null) {
    return dateB.getTime() - dateA.getTime()
  }

  if (dateA !== null) return -1
  if (dateB !== null) return 1

  return a.localeCompare(b)
}

function compareVersionTokens(a: string, b: string): number {
  const tokensA = extractVersionTokens(a)
  const tokensB = extractVersionTokens(b)
  if (tokensA.length === 0 || tokensB.length === 0) return 0

  const limit = Math.max(tokensA.length, tokensB.length)
  for (let index = 0; index < limit; index++) {
    const tokenA = tokensA[index]
    const tokenB = tokensB[index]
    if (tokenA === undefined || tokenB === undefined) {
      if (tokenA === undefined && tokenB === undefined) return 0
      return tokenA === undefined ? 1 : -1
    }
    if (tokenA !== tokenB) return tokenB - tokenA
  }

  return 0
}

function extractVersionTokens(str: string) {
  const match = str.match(/\d+(?:\.\d+)*/)
  if (!match) return []
  return match[0]
    .split(".")
    .map(Number)
    .filter((value) => !Number.isNaN(value))
}

function extractDate(str: string): Date | null {
  const mmddMatch = str.match(/(\d{2})-(\d{2})(?:\s|$)/)
  if (mmddMatch) {
    const month = parseInt(mmddMatch[1], 10)
    const day = parseInt(mmddMatch[2], 10)
    if (month >= 1 && month <= 12 && day >= 1 && day <= 31) {
      const year = new Date().getFullYear()
      return new Date(year, month - 1, day)
    }
  }

  const yyyymmddMatch = str.match(/(\d{4})-(\d{2})-(\d{2})/)
  if (yyyymmddMatch) {
    const year = parseInt(yyyymmddMatch[1], 10)
    const month = parseInt(yyyymmddMatch[2], 10)
    const day = parseInt(yyyymmddMatch[3], 10)
    return new Date(year, month - 1, day)
  }

  return null
}
