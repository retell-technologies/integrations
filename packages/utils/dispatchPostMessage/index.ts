import { PlayerEvent } from '../types'

export function dispatchPostMessage(event: PlayerEvent): void {
  window.parent.postMessage(event, '*')
}
