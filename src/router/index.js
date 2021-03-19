import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Gallery from '../views/Gallery.vue'
import Random from '../views/Random.vue'
import Photo from '../views/Photo.vue'
import Collage from '../views/Collage.vue'

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
    path: '/random',
    name: 'Random',
    component: Random
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
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
