import createIFrame from '@retell/utils/createIFrame'
import validateOptions from '@retell/utils/validateOptions'
import transformEvent from '@retell/utils/transformEvent'

function insertElement(referenceNode: Element, newNode: Element): void {
  referenceNode.insertBefore(newNode, referenceNode.firstChild)
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

function handlePostMessage(event: MessageEvent): void {
  if (!event.data.type || !event.data.type.startsWith('Retell')) {
    return
  }

  const data = transformEvent(event.data)

  const iframes = document.querySelectorAll('iframe.retell-frame') as NodeListOf<HTMLIFrameElement>

  if (data.type === 'widgetready') {
    iframes.forEach((iframe: HTMLIFrameElement) => {
      iframe.style.width = '100%'
      iframe.style.height = `${data.data.height}px`
      iframe.style.maxHeight = `${data.data.height}px`
    })
    return
  }

  if (data.type === 'widgeterror') {
    iframes.forEach((iframe: HTMLIFrameElement) => {
      iframe.style.width = '0px'
      iframe.style.height = '0px'
      iframe.style.maxHeight = '0px'
    })
  }
}

export default function init(): void {
  const container = getContainer()
  if (!container) { return }

  const iframe = createIFrame("https://widget.retell.cc")(validateOptions({
    type: 'article',
    widget: 'default',
  }))
  container.appendChild(iframe)
  window.addEventListener('message', handlePostMessage, false)
}
