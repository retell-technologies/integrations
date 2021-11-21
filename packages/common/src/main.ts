import { getLastDOMElement } from '@retell/utils/getLastDOMElement'
import createIFrame from '@retell/utils/createIFrame'
import validateOptions from '@retell/utils/validateOptions'
import transformEvent from '@retell/utils/transformEvent'
import type { Callback, Callbacks, CallbackType, WidgetUserOptions } from '@retell/utils/types'

const callbacks: Callbacks = {
  opened: {
    handler: undefined,
  },
  start: {
    handler: undefined,
  },
  resume: {
    handler: undefined,
  },
  pause: {
    handler: undefined,
  },
  end: {
    handler: undefined,
  },
  progress: {
    handler: undefined,
    options: {
      marks: [],
    },
  },
}

function openIframe(height = 60): void {
  const iframes = document.querySelectorAll('iframe.retell-frame') as NodeListOf<HTMLIFrameElement>
  iframes.forEach((iframe: HTMLIFrameElement) => {
    iframe.style.width = '100%'
    iframe.style.height = `${height}px`
    iframe.style.maxHeight = `${height}px`
  })
}

const closeIframe = () => {
  const iframes = document.querySelectorAll('iframe.retell-frame') as NodeListOf<HTMLIFrameElement>
  iframes.forEach((iframe: HTMLIFrameElement) => {
    iframe.style.width = '0px'
    iframe.style.height = '0px'
    iframe.style.maxHeight = '0px'
  })
}

export function handlePostMessage(event: MessageEvent): void {
  if (!event.data.type || !event.data.type.startsWith('Retell')) {
    return
  }

  const data = transformEvent(event.data)

  switch (data.type) {
    case 'widgeterror':
      closeIframe()
      break

    case 'widgetready':
      openIframe(data.data.height)
      if (callbacks.opened && typeof callbacks.opened.handler === 'function') {
        callbacks.opened.handler(data)
      }
      break

    case 'progress':
      if (!(typeof callbacks.progress?.handler === 'function')) {
        break
      }

      const { marks } = callbacks.progress.options
      if (marks.length && marks.indexOf(data.data.progress) === -1) {
        break
      }
      callbacks.progress.handler(data)
      break

    default:
      if (typeof callbacks[data.type]?.handler === 'function') {
        callbacks[data.type]?.handler?.(data)
      }
      break
  }
}

function insertIframe(options: WidgetUserOptions, target: Element): void {
  const iframe = createIFrame("https://widget.retell.cc")(options)

  window.addEventListener('message', handlePostMessage, false)

  target.parentNode?.insertBefore(iframe, target.previousSibling)
}

export function registerCallback(event: CallbackType, cb: Callback['handler'], options?: Object): void {
  if (callbacks[event] && typeof cb === 'function') {
    callbacks[event].handler = cb

    if (options) {
      callbacks[event].options = options
    }
  }
}

export function init(userOptions: WidgetUserOptions): void {
  const scriptElement = getLastDOMElement('script[data-voiced=player]')

  if (!scriptElement) {
    throw new Error('Retell: There is no script tags with data-voiced attribute')
  }

  insertIframe(validateOptions(userOptions), scriptElement)
}
