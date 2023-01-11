import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.config.globalProperties.API_URL = 'http://localhost:8080/api'

app.use(router)
app.mount('#app');