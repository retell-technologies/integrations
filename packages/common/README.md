# JavaScript SDK

## Install the Retell player

---

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

---

To initialize Retell Player, use the following:

```jsx
<script data-voiced="player">
  Retell.init({ url: "..." })
</script>
```

if you install player through NPM you should import the package

```jsx
import { Retell } from '@retell/player-js'
```

## Player parameters

---

`url` *string (optional)*

Article URL. This is default set to `Current page URL`

`widget` *string (optional)*

Player theme. This is default set to `default`. *(Currently, it is the only theme)*

`rate` *float (optional)*

Player rate. This is default set to `1.0`

`theme` *object (optional)* `DEPRECATED`

Now you can customize your widget directly in Retell Console *<https://console.retell.cc>*

## Player Callbacks

---

You can run custom functions by registering Player callbacks:

```jsx
Retell.registerCallback(eventName, callback, options)
```

**Examples:**

```jsx
Retell.registerCallback('opened', function(event)){
  reachGoal('your-goal');
});
```

```jsx
Retell.registerCallback('progress', function(event){
  console.log(event.data.progress);
}, {
  marks: [15, 25, 50, 75, 95],
});
```

## Events

---

### opened

This event fires when the player is successfully initialized

### start

This event fires when the player start playing audio *(first play)*

### resume

This event fires on audio resume

### pause

This event fires on audio pause

### end

This event fires when the audio is complete playing

### progress

This event fires on audio playing progress

**Event data:**

`progress` *number*

**Options:**

`marks` *number[]*

The array of progress numbers, on which callback should be called
