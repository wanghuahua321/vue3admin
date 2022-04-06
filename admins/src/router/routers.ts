import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
const routerView =import(/* webpackChunkName: "layout" */ '@/layout/index.vue')

const routes: Array<RouteRecordRaw> = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: HomeView
  // },
  {
    path: '/login',
    name: 'logins',
    component: () => import(/* webpackChunkName: "login" */ '../views/login.vue')
  },
  {
    path: '/',
    name: 'home',
    component:() => routerView,
    redirect: { name: "homeinx" },
    children: [
     {
      path: '/home',
      name: 'homeinx',
      component: () => import(/* webpackChunkName: "home" */ '@/views/home/index.vue'),
     }
    ]
  },
  {
    path: '/chat',
    name: 'chat',
    component: () =>routerView,
    redirect: { name: "chatinx" },
    meta: {
      TabbarShow: true //需要显示底部导航
    },
    children:[
      {
        path: '/chat/:type?',
        name: 'chatinx',
        component: () => import(/* webpackChunkName: "chat" */ '../views/chat/index.vue'),
      }
    ]
  },
  {
    path: '/post',
    name: 'Post',
    component: () =>routerView,
    redirect: { name: "postIndex" },
    meta: {
      TabbarShow: true //需要显示底部导航
    },
    children:[
      {
        path: '/postIndex/:type?',
        name: 'postIndex',
        component: () => import(/* webpackChunkName: "chat" */ '../views/Posting/index.vue'),
      }
    ]
  }


]


export default routes;
