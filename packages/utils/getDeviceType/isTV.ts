/**
 * The isTV function checking your user-agent and returning true if it TV
 * @returns boolean
 */
export default function isTV(): boolean {
  const TV_TRIGGERS = [
    'Nintendo',
    'TV',
    'PlayStation',
    'XBOX',
  ]

  const regexp = new RegExp(`(${TV_TRIGGERS.join('|')})`, 'ig')
  return !!navigator.userAgent.match(regexp)
}
