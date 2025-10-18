import { createRouter, createWebHistory } from 'vue-router'

// Importamos las vistas (las páginas)
import MuroView from '../views/MuroView.vue'
import InfoView from '../views/InfoView.vue'
import PhotosView from '../views/PhotosView.vue'
import BoxesView from '../views/BoxesView.vue'

// Definimos las rutas
const routes = [
  { path: '/', component: MuroView },
  { path: '/info', component: InfoView },
  { path: '/photos', component: PhotosView },
  { path: '/boxes', component: BoxesView },
]

// Creamos el router
const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Lo exportamos para usarlo en main.js
export default router
