import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
const routerView = import('@/layout/index.vue')

const routes: Array<RouteRecordRaw> = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: HomeView
  // },
  {
    path: '/login',
    name: 'logins',
    component: () => import(/* webpackChunkName: "logins" */ '../views/login.vue')
  },
  {
    path: '/',
    name: 'home',
    component: routerView,
    redirect: { name: "homeinx" },
    children: [
     {
      path: '/home',
      name: 'homeinx',
      component: () => import(/* webpackChunkName: "homehomerig" */ '@/views/home/index.vue'),
     }
    ]
  },
  {
    path: '/chat',
    name: 'chat',
    component: routerView,
    redirect: { name: "chatinx" },
    meta: {
      TabbarShow: true //需要显示底部导航
    },
    children:[
      {
        path: '/chat',
        name: 'chatinx',
        component: () => import(/* webpackChunkName: "homehomerig" */ '../views/chat/index.vue'),
      }
    ]
  }

]


export default routes;
