import makeQuery from '../makeQuery'
import type { WidgetUserOptions } from '../types'

export default function createIFrame  (widgetURL: string) {
  return (options: WidgetUserOptions) => {
    const queryOptions = makeQuery(options)
    const iframe = document.createElement('iframe')
    const iframeSrc = widgetURL + queryOptions

    iframe.setAttribute('src', iframeSrc)
    iframe.className = 'retell-frame'
    iframe.style.background = 'transparent'
    iframe.style.visibility = 'visible'
    iframe.style.border = '0'
    iframe.style.width = '0px'
    iframe.style.height = '0px'
    iframe.style.maxHeight = '0px'
    iframe.style.minHeight = '0px'

    return iframe
  }
}
