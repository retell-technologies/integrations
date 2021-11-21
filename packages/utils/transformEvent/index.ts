import { PlayerEvent, ConvertedPlayerEvent } from '../types'

export default function transformEvent(event: PlayerEvent): ConvertedPlayerEvent {
  return {
    type: event.type.replace('Retell', '').toLowerCase(),
    data: event.data,
  } as ConvertedPlayerEvent
}
