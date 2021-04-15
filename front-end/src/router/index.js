import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Gallery from '../views/Gallery.vue'
import Photo from '../views/Photo.vue'
import Collage from '../views/Collage.vue'
import Edit from '../views/Edit.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/gallery',
    name: 'Gallery',
    component: Gallery
  },
  {
    path: '/edit',
    name: 'Edit',
    component: Edit
  },
  {
    path: '/collage',
    name: 'Collage',
    component: Collage
  },
  {
    path: '/photo/:id',
    name: 'Photo',
    component: Photo
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
