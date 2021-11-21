/**
 * The isValidUrl function checking a string is URL
 * @param url string
 * @returns boolean
 */
export default function isValidUrl(url: string): boolean {
  if (!url.startsWith('http')) {
    return false
  }

  try {
    const { pathname } = new URL(url)
    if (pathname.includes('//')) { return false }
  } catch (_) {
    return false
  }

  return true
}
