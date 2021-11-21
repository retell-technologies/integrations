# JavaScript SDK

## **Installation**

You can install Retell Player through NPM

```bash
npm install --save @retell/player-js
yarn add @retell/player-js
```

Or, you can use CDN

```html
<script src="https://unpkg.com/@retell/player-js@latest/dist/common.min.js"></script>
```

## Initialize the Retell player

To initialize Retell Player, use the following:

```html
<script data-voiced="player">
 Retell.init({ url: "..." })
</script>
```

if you install player through NPM you should import the package

```jsx
import { Retell } from '@retell/player-js'
```

### Player parameters

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| url | `String` | Current page URL | Article URL |
| rate | `Number` | 1 | Player playback rate |
| widget | `String` | default | Player widget |

## Player Callbacks

You can run custom functions by registering Player callbacks:

```jsx
Retell.registerCallback(eventName, callback, options)
```

### Events

| Event | Description |
| --- | --- |
| opened | This event fires when the player is successfully initialized |
| start | This event fires when the player start playing audio (first play) |
| resume | This event fires on audio resume |
| pause | This event fires on audio pause |
| end | This event fires when the audio is complete playing |
| progress | This event fires on audio playing progress multiples by 5. |

### **Examples:**

```jsx
Retell.registerCallback('opened', function(event)){
  reachGoal('your-goal');
});
```

```jsx
Retell.registerCallback('progress', function(event){
 if ([25, 50, 75, 100].includes(event.data.progress)) {
   console.log(event.data.progress);
 }
});
```
