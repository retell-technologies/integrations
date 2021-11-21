/**
 * The normalizeUrl function returning a received URL without query parameters and hash
 * @param url string
 * @returns string
 */
export default function normalizeUrl(url: string): string {
  let result = url

  const qIndex = result.indexOf('?')
  if (qIndex > -1) {
    result = result.substring(0, qIndex)
  }

  const hashIndex = result.indexOf('#')
  if (hashIndex > -1) {
    result = result.substring(0, hashIndex)
  }

  return result
}
