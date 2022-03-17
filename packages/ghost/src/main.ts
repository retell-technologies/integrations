import { PlayerEvent } from '@retell/utils/types';
import { createIFrame, validateOptions } from '@retell/utils'

function insertElement(rootElement: Element, iframeElement: Element): void {
  rootElement.insertBefore(iframeElement, rootElement.firstChild);
}

function openIframe(id: string, height: number = 60): void {
  const iframes = document.querySelectorAll(`iframe[data-retell-id=${id}]`) as NodeListOf<HTMLIFrameElement>
  iframes.forEach((iframe: HTMLIFrameElement) => {
    iframe.style.width = '100%'
    iframe.style.height = `${height}px`
    iframe.style.maxHeight = `${height}px`
  })
}

const getContainer = (): HTMLDivElement | null => {
  if (window.location.pathname === '/') { return null }

  const container: HTMLDivElement | null = document.querySelector('.retell-container')
  if (container) { return container }

  const section = document.querySelector('article.post > header + section')

  if (!section) { return null }

  const newContainer = document.createElement('div')
  newContainer.setAttribute('class', 'retell-container')

  insertElement(section, newContainer)

  return newContainer
}

function handlePostMessage(event: MessageEvent<PlayerEvent>): void {
  if (!event.data.name || !event.data.name.startsWith('Retell')) {
    return
  }

  const message = event.data;
  switch (message.name) {
    case 'RetellStart':
      openIframe(message.id, message.options.height)
      break
    default:
      break
  }
}

export default function init(): void {
  const container = getContainer()
  if (!container) { return }

  const iframe = createIFrame("https://widget.retell.cc")(validateOptions({widget: 'default'}))
  container.appendChild(iframe)
  window.addEventListener('message', handlePostMessage, false)
}
