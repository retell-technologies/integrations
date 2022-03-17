export type WidgetType = 'default'
export type Language = 'en' | 'ru'
export interface PlayerOptions {
  id?: string,
  url: string
  widget: WidgetType
}

export interface PlayerEvent {
  id: string,
  name: string,
  options?: any
}