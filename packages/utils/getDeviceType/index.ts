import isMobile from './isMobile'
import isTV from './isTV'
import isWebview from './isWebview'

/**
 * The getDeviceType function checking your user-agent and returning a type of your device
 * @returns "mobile_app" | "mobile" | "desktop" | "tv"
 */
export default function getDeviceType(): 'mobile_app' | 'mobile' | 'desktop' | 'tv' {
  if (isWebview()) {
    return 'mobile_app'
  }
  if (isTV()) {
    return 'tv'
  }
  return isMobile() ? 'mobile' : 'desktop'
}
