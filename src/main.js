import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import mitt from 'mitt'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

export const emitter = mitt()
const app = createApp(App).use(store).use(router)
app.config.globalProperties.emitter = emitter
app.config.globalProperties.axios = axios

app.mount('#app')
