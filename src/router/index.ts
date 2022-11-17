import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/home.vue'

const routes: RouteRecordRaw[] = [{
  path: '/',
  name: 'home',
  component: Home,
  children: []
}, {
  path: '/signin',
  name: 'signin',
  component: () => import('@/views/signin.vue')
}, {
  path: '/signup',
  name: 'signup',
  component: () => import('@/views/signup.vue')

}]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
export default router
