import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: "Main",
    component: () => import('../views/Main'),
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('../views/home')
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('@/views/user')
      },
      {
        path: '/medicine',
        name: 'medicine',
        component: () => import('@/views/medicine')
      },
      {
        path: '/robotchat',
        name: 'robotchat',
        component: () => import('@/views/other/robotchat.vue')
      },
      {
        path: '/robotstate',
        name: 'robotstate',
        component: () => import('@/views/other/robotstate.vue')
      },
      {
        path: '/robotnavigator',
        name: 'robotnavigator',
        component: () => import('@/views/other/robotnavigator.vue')
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue')
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router