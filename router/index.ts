import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/list'
    },
    {
      path: '/list',
      component: () => import('../pages/list.vue')
    },
    {
      path: '/create',
      redirect: '/create/template'
    },
    {
      path: '/create/template',
      component: () => import('../pages/create/template.vue')
    },
    {
      path: '/create/questions',
      component: () => import('../pages/create/questions.vue')
    },
    {
      path: '/chat/:id',
      component: () => import('../pages/chat/[id].vue')
    },
    {
      path: '/answers/:id',
      component: () => import('../pages/answers/[id].vue')
    }
  ]
})
