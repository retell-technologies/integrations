<template>
  <div ref="player" className="retell-player" />
</template>

<script lang="ts" setup>
import type { WidgetType, WidgetTheme, ContentType } from '@retell/utils'
import makeQuery from '@retell/utils/makeQuery'
import transformEvent from '@retell/utils/transformEvent'
import validateOptions from '@retell/utils/validateOptions'
import { ref, defineProps, defineEmits, onMounted } from 'vue-demi'

interface Props {
  type?: ContentType
  url?: string
  widget?: WidgetType
  rate?: number
  theme?: WidgetTheme
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (event: 'opened', value: { type: 'widgetready', data: { height: number } }): void
  (event: 'error', value: { type: 'widgeterror' }): void
  (event: 'end', value: { type: 'end' }): void
  (event: 'resume', value: { type: "resume" }):   void
  (event: 'pause', value: { type: "pause" }): void
  (event: 'progress', value: { type: "progress", data: { progress: number } }): void
}>()

const player = ref<HTMLDivElement | null>(null)

const openIframe = (height = 60) => {
  const iframes = document.querySelectorAll('iframe.retell-frame') as NodeListOf<HTMLIFrameElement>
  iframes.forEach((iframe) => {
    iframe.style.width = '100%'
    iframe.style.height = `${height}px`
  })
}

const handlePostMessage = (event: MessageEvent) => {
  if (!event.data.type || !event.data.type.startsWith('Retell')) {
    return
  }

  const data = transformEvent(event.data)

  switch (data.type) {
    case 'widgeterror':
      emit('error', { type: 'widgeterror' })
      break

    case 'widgetready':
      openIframe(data.data.height)
      emit('opened', data)
      break

    case 'progress':
      emit('progress', { type: 'progress', data: { progress: data.data.progress }})
      break

    case 'end':
      emit('end', { type: 'end' })
      break

    case 'pause':
      emit('pause', { type: 'pause' })
      break

    case 'resume':
      emit('resume', { type: 'resume' })
      break
  }
}

onMounted(() => {
  const queryOptions = makeQuery(validateOptions({ ...props }))
  const iframe = document.createElement('iframe')
  const iframeSrc = "https://widget.retell.cc" as string + queryOptions

  iframe.setAttribute('src', iframeSrc)
  iframe.className = 'retell-frame'
  iframe.style.background = 'transparent'
  iframe.style.visibility = 'visible'
  iframe.style.border = '0'
  iframe.style.width = '0'
  iframe.style.height = '0'

  window.addEventListener('message', handlePostMessage, false)
  player.value?.parentNode?.insertBefore(iframe, player.value?.previousSibling)

})
</script>
