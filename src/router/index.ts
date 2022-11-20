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
  meta: {
    allowed: true
  },
  name: 'signup',
  component: () => import('@/views/signup.vue')

}]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (!window.sessionStorage.getItem('username') && to.name !== 'signin' && !(to.meta && to.meta.allowed)) {
    next({ name: 'signin' })
  } else {
    next()
  }
})
export default router
