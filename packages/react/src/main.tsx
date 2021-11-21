import type { WidgetType, WidgetTheme, ContentType, PlayerEvent, ConvertedPlayerEvent } from '@retell/utils'
import React from 'react'
import validateOptions from '@retell/utils/validateOptions'
import makeQuery from '@retell/utils/makeQuery'
import transformEvent from '@retell/utils/transformEvent'


export interface Callbacks {
  onOpened?(event: ConvertedPlayerEvent): void;
  onStart?(event: ConvertedPlayerEvent): void;
  onResume?(event: ConvertedPlayerEvent): void;
  onPause?(event: ConvertedPlayerEvent): void;
  onProgress?(event: ConvertedPlayerEvent): void;
  onEnd?(event: ConvertedPlayerEvent): void;
  onError?(event: ConvertedPlayerEvent): void;
}

export type Props = {
  articleUrl?: string
  callbacks?: Callbacks
  podcastId?: string
  progressMarks?: number[]
  rate?: number
  theme?: WidgetTheme
  type?: ContentType
  widget?: WidgetType
}

export const RetellPlayer = ({
  articleUrl, type, podcastId, widget, rate, theme, callbacks, progressMarks,
}: Props) => {
  const options = validateOptions({
    url: articleUrl,
    type,
    podcastId,
    widget,
    rate,
    theme,
  })

  const queryOptions = makeQuery(options)

  const callbacksDictionary = {
    start: callbacks?.onStart,
    resume: callbacks?.onResume,
    pause: callbacks?.onPause,
    progress: callbacks?.onProgress,
    end: callbacks?.onEnd,
    error: callbacks?.onError,
  }

  const IFrame = React.useRef(document.createElement('iframe'))
  const IFrameSrc = "https://widget.retell.cc" + queryOptions
  IFrame.current.className = 'retell-frame'
  IFrame.current.style.background = 'transparent'
  IFrame.current.setAttribute('src', IFrameSrc)
  IFrame.current.style.visibility = 'visible'
  IFrame.current.style.border = '0'
  IFrame.current.style.width = '0'
  IFrame.current.style.height = '0'
  IFrame.current.style.maxHeight = '0'

  const openIframe = (height: number = 60) => {
    IFrame.current.style.width = '100%'
    IFrame.current.style.height = `${height}px`
    IFrame.current.style.maxHeight = `${height}px`
  }

  const handlePostMessage = (event: { data: PlayerEvent }) => {
    if (!event.data.type || !event.data.type.startsWith('Retell')) {
      return
    }

    const data = transformEvent(event.data)

    switch (data.type) {
      case 'widgeterror':
        callbacks?.onError?.(data)
        break

      case 'widgetready':
        openIframe(data.data.height)
        callbacks?.onOpened?.(data)

        break

      case 'progress':
        if (progressMarks?.includes(data.data.progress)) {
          callbacks?.onProgress?.(data)
        }
        break

      default:
        callbacksDictionary[data.type]?.(data)
        break
    }
  }

  const renderIFrame = React.useCallback(() => {
    const parentNode = document.getElementsByClassName('retell-player')[0]
    if (!parentNode) {
      throw new Error('Fatal Error')
    }
    parentNode.innerHTML = ''
    parentNode.appendChild(IFrame.current)
    window.addEventListener('message', handlePostMessage, false)
  }, [IFrame])

  React.useEffect(() => {
    renderIFrame()
  }, [articleUrl, renderIFrame])

  return (
    <div className="retell-player" />
  )
}

RetellPlayer.defaultProps = {
  articleUrl: window.location.href,
  callbacks: {},
  podcastId: '',
  progressMarks: [15, 25, 50, 75, 95],
  rate: 1,
  theme: {},
  type: 'article',
  widget: 'default',
} as Props
