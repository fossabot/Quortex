import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import( /* webpackChunkName: "about" */ '../views/Signup.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import( /* webpackChunkName: "about" */ '../views/Home.vue')
  },
  {
    path: '/signin',
    name: 'Signin',
    component: () => import( /* webpackChunkName: "about" */ '../views/Signin.vue')
  }
]

const router = new VueRouter({
  mode: "history",
  routes
})

export default router