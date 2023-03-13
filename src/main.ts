import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './style.css'; 

const app = createApp(App)
app.use(store)
app.use(router)

const meta = document.createElement('meta')
meta.name = 'naive-ui-style'
document.head.appendChild(meta)

app.mount('#app')
