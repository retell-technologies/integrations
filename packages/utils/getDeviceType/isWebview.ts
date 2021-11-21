/**
 * The isWebview function checking your user-agent and returning true if it mobile app
 * @returns boolean
 */
export default function isWebview(): boolean {
  const WEBVIEW_TRIGGERS = [
    'WebView',
    '(iPhone|iPod|iPad)(?!.*Safari)',
    'Android.*(wv|.0.0.0)',
    'Linux; U; Android',
  ]

  const regexp = new RegExp(`(${WEBVIEW_TRIGGERS.join('|')})`, 'ig')
  return !!navigator.userAgent.match(regexp)
}
