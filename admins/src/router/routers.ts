import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue';

const routes: Array<RouteRecordRaw> = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: HomeView
  // },
  {
    path: '/',
    name: 'logins',
    component: () => import(/* webpackChunkName: "logins" */ '../views/login.vue')
  },
  {
    path: '/homepage',
    name: 'homepage',
    component: () => import(/* webpackChunkName: "homePage" */ '../views/homePage.vue'),
    redirect: { name: "Home" },
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import(/* webpackChunkName: "about" */ '../views/home/leftpannel.vue'),
        meta: {
          TabbarShow: true //需要显示底部导航
        }
      }
    ]
  },

]


export default routes;
