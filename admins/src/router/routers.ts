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
    meta: {
      title: '首页',
    },
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
      title: '聊天',
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
    path: '/posting',
    name: 'posting',
    component: () =>routerView,
    redirect: { name: "postIndex" },
    meta: {
      title: '发帖',
      TabbarShow: true //需要显示底部导航
    },
    children:[
      {
        path: '/postIndex',
        name: 'postIndex',
        component: () => import(/* webpackChunkName: "chat" */ '../views/Posting/index.vue'),
      }
    ]
  },
  {
    path: '/identity',
    name: 'identity',
    component: () =>routerView,
    redirect: { name: "certification" },
    meta: {
      title: '身份认证',
      TabbarShow: true //需要显示底部导航
    },
    children:[
      {
        path: '/certification',
        name: 'certification',
        component: () => import(/* webpackChunkName: "chat" */ '../views/certification/index.vue'),
      }
    ]
  },
  {
    path: '/channel',
    name: 'channel',
    component: () =>routerView,
    redirect: { name: "channelIndex" },
    meta: {
      title: '渠道',
      TabbarShow: true //需要显示底部导航
    },
    children:[
      {
        path: '/channelIndex',
        name: 'channelIndex',
        component: () => import(/* webpackChunkName: "chat" */ '../views/channel/index.vue'),
      }
    ]
  }



]


export default routes;
