# Ghost Integration

## Setup

1. Log into your Ghost admin dashboard
2. Go to `Settings`
3. Select `Code injection`
4. Paste the audio player script in `Site Header` then click `Save`

```jsx
<script src="https://unpkg.com/@retell/ghost@latest/dist/ghost-helper.js"></script>
```

Player should appear on every generated article
