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
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginIndex.vue')
  },
  {
    path: '/home/index',
    name: 'homeindex',
    component: () => import(/* webpackChunkName: "about" */ '../views/home/index.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]


export default routes;
