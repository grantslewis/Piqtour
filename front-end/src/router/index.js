import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Gallery from '../views/Gallery.vue'
import Photo from '../views/Photo.vue'
import Collage from '../views/Collage.vue'
// import Edit from '../views/Edit.vue'
import Location from '../views/Location.vue'
import Dashboard from '../views/Dashboard.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/gallery',
    name: 'Gallery',
    component: Gallery
  },
  {
    path: '/collage',
    name: 'Collage',
    component: Collage
  },
  {
    path: '/photo/:id',
    name: 'Photo',
    component: Photo,
    props: true,
  },
  {
    path: '/location/:id',
    name: 'Location',
    component: Location
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
