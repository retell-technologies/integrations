import getDeviceType from '../getDeviceType'
import isValidUrl from '../isValidUrl'
import normalizeUrl from '../normalizeUrl'
import type { WidgetUserOptions } from '../types'

export default function validateOptions(userOptions: Partial<WidgetUserOptions>): WidgetUserOptions {
  const source = userOptions.source || getDeviceType()
  const type = userOptions.type || 'article'
  const widget = userOptions.widget || 'default'
  const theme = userOptions.theme || {}

  const options: WidgetUserOptions = {
    ...Object.entries(userOptions).reduce((acc, [key, value]) => {
      if (!value) { return acc }
      acc[key] = value
      return acc
    }, {} as { [x: string]: any }),
    type,
    widget,
    theme,
    source,
  }

  if (!options.url) {
    options.url = normalizeUrl(window.location.href)
  } else if (!isValidUrl(options.url)) {
    throw new Error('Retell: Invalid URL')
  } else {
    options.url = normalizeUrl(options.url)
  }

  return options
}
