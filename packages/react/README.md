# React Integration

## Install

---

```bash
npm install @retell/player-react
yarn add @retell/player-react
```

## Usage

---

### **Class Components**

```jsx
import React, { Component } from 'react'
import { RetellPlayer } from '@retell/player-react'

class Example extends Component {
  render() {
    return <RetellPlayer />
  }
}
```

### **Functional Components**

```jsx
import React, { Component } from 'react'
import { RetellPlayer } from '@retell/player-react'

const Example = () => {
  return <RetellPlayer />
}
```

### Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| articleUrl | `String` | Current page URL | Article URL |
| rate | `Number` | 1 | Player playback rate |
| widget | `String`| default | Player widget |
| callbacks | `Object` | {} | Player Callbacks |

### Callbacks

| Event | Description |
| --- | --- |
| onOpened | This event fires when the player is successfully initialized |
| onStart | This event fires when the player start playing audio (first play) |
| onResume | This event fires on audio pause |
| onPause | This event fires on audio pause |
| onEnd | This event fires when the audio is complete playing |
| onProgress | This event fires on audio playing progress multiples by 5. |

## Examples

```jsx
<RetellPlayer
    articleUrl={url}
    callbacks={{
      onOpened(event) { console.log(event) },
      onStart(event) { console.log(event) },
      onResume(event) { console.log(event) },
      onPause(event) { console.log(event) },
      onProgress(event) { console.log(event) },
      onEnd(event) { console.log(event) },
    }}
  />
```