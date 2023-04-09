import { validateOptions, createIFrame, getLastDOMElement }  from '@retell/utils'
import type { PlayerOptions, PlayerEvent } from '@retell/utils/types'

const PLAYER_URL = "https://widget.retell.cc"
const callbacks = {
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
    options: { marks: [] },
  },
} as Record<string, { handler: any, options?: Record<string, any> }>

function openIframe(id: string, height: number = 60): void {
  const iframes = document.querySelectorAll(`iframe[data-retell-id=${id}]`) as NodeListOf<HTMLIFrameElement>
  iframes.forEach((iframe: HTMLIFrameElement) => {
    iframe.style.width = '100%'
    iframe.style.height = `${height}px`
    iframe.style.maxHeight = `${height}px`
  })
}

export function handlePostMessage(event: MessageEvent<PlayerEvent>): void {
  if (!event.data.name || !event.data.name.startsWith('Retell')) {
    return
  }
  const message = event.data;

  switch (message.name) {
    case 'RetellStart':
      openIframe(message.id, message.options.height)
      callbacks.start.handler?.()
      break
    case 'RetellProgress':
      const { marks } = callbacks.progress?.options || { marks: [] }
      if (marks.length && marks.indexOf(message.options.progress) === -1) {
        break
      }
      callbacks.progress.handler?.({...message.options, data: message.options})
      break
    case 'RetellEnd':
      callbacks.end.handler?.(message.options)
      break
    default:
      break
  }
}

function insertIframe(options: PlayerOptions, target: Element): void {
  const iframe = createIFrame(PLAYER_URL)(options)
  window.addEventListener('message', handlePostMessage, false)
  target.parentNode?.insertBefore(iframe, target.previousSibling)
}

export function init(userOptions: PlayerOptions): void {
  const scriptElement = getLastDOMElement('script[data-voiced=player]')
  if (!scriptElement) {
    throw new Error('Retell: There is no script tags with data-voiced attribute')
  }

  insertIframe(validateOptions(userOptions), scriptElement)
}

export function registerCallback(event: string, cb: (options: any) => any, options?: Object): void {
  if (callbacks[event] && typeof cb === 'function') {
    callbacks[event].handler = cb
  }

  if (options) {
    callbacks[event].options = options
  }
}
