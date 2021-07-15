import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'App',
    redirect: { name: 'Home' }
  },
  {
    path: '/home/:path?',
    name: 'Home',
    component: Home,
    props: true
  },
  {
    path: '/video',
    name: 'Video',
    component: () => import('../views/Video')
  }
]

const router = new VueRouter({
  // mode: 'history',
  routes
})

export default router
