/**
 * The isMobile function checking your user-agent and returning true if it mobile browser
 * @returns boolean
 */
export default function isMobile(): boolean {
  return /Mobi|Android/i.test(navigator.userAgent)
}
