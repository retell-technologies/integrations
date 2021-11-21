import { createApp } from 'vue'
import App from './App.vue'
import RetellPlayer from './plugins/retell-player'

const app = createApp(App)

app.use(RetellPlayer)
app.mount('#app')
