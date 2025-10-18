import { createApp } from 'vue'
import App from './App.vue'

// Importamos el router
import router from './router/index.js'

// Creamos la app y le decimos que use el router
const app = createApp(App)
app.use(router)

// Montamos la aplicación en el div del index.html
app.mount('#app')
