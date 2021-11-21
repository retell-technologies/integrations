# Vue Integration

## Install

---

```bash
npm install @retell/player-vue
yarn add @retell/player-vue
```

Install the plugin into Vue:

```jsx
import Vue from 'vue'
import RetellPlayer from '@retell/player-react'

Vue.use(RetellPlayer)
```

## Usage

---

```html
<template>
 <div>
  <retell-player />
 </div>
</template>
```

You can specify the `articleUrl` to create a player with the custom article at any place, if `articleUrl` is not specified, by default will be used a current page URL

```html
<template>
 <div>
   <retell-player articleUrl="ABSOLUTE_LINK_TO_THE_ARTICLE" />
 </div>
</template>
```

### Nuxt SSR Example

```html
<template>
 <client-only>
   <retell-player />
 </client-only>
</template>
```

### Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| articleUrl | `String` | Current page URL | Article URL |
| rate | `Number` | 1 | Player playback rate |
| widget | `String` | default | Player widget |

### Events

| Event | Description |
| --- | --- |
| opened | This event fires when the player is successfully initialized |
| start | This event fires when the player start playing audio (first play) |
| resume | This event fires on audio pause |
| pause | This event fires on audio pause |
| end | This event fires when the audio is complete playing |
| progress | This event fires on audio playing progress multiples by 5. |

## Examples

```html
<template>
 <retell-player
   @opened="onOpened"
   @progress="onProgress"
 />
</template>
```

```jsx
<script>
export default {
 methods: {
  onOpened () {
   console.log('Player opened')
  },
  onProgress (event) {
   if ([25, 50, 75, 100].includes(event.data.progress)) {
    console.log('Player progress:', event.data.progress)
   }
  }
 }
}
</script>
```
