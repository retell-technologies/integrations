export type WidgetType = 'default'
export type DeviceType = 'mobile_app' | 'mobile' | 'desktop' | 'tv'
export type ContentType = 'article'
export type Language = 'en' | 'ru'
export type CallbackType = 'opened' | 'start' | 'resume' | 'pause' | 'progress' | 'end'

export type PlayerEvent =
| { type: 'RetellStart' | 'RetellWidgetError' | 'RetellEnd', data?: undefined }
| { type: 'RetellResume' | 'RetellPause' | 'RetellProgress', data: { progress: number } }
| { type: 'RetellWidgetReady', data?: { height: number } }

export type ConvertedPlayerEvent = 
| { type: 'start' | 'widgeterror' | 'end' | 'resume' | 'pause' }
| { type: 'progress', data: { progress: number } }
| { type: 'widgetready', data: { height: number } }

export type Callbacks = Record<CallbackType, Callback> & {
  progress: Callback & {
    options: {
      marks: number[],
    }
  }
}

export interface WidgetTheme {
  backgroundColor?: string
  border?: string
  borderRadius?: number
  padding?: number
  buttonColor?: string
  buttonColorClick?: string
  buttonColorHover?: string
  buttonSize?: number
  buttonSizeClick?: number
  buttonSizeHover?: number
  fontColor?: string
  fontExtraColor?: string
  fontFamily?: string
  pointerColor?: string
  pointerColorClick?: string
  pointerColorHover?: string
  pointerSize?: number
  pointerSizeClick?: number
  pointerSizeHover?: number
  progressBarColor?: string
  progressBarColorActive?: string
  progressBarColorHover?: string
  progressBarThickness?: number
}

export interface WidgetUserOptions {
  type: ContentType
  url?: string
  widget: WidgetType
  podcastId?: string
  rate?: number
  source?: DeviceType
  theme?: WidgetTheme
}

export interface Callback {
  handler?: (data: ConvertedPlayerEvent) => any
  options?: Object
}
