import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)
app.config.globalProperties.API_URL = 'http://localhost:8080/api'

app.use(router)
app.use(store);
app.mount('#app');