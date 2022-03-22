import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import routers from './routers';
import store from '@/store';

/* hash模式中url路径中的# */
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes:routers
})

console.log("process.env.NODE_ENV",process.env.NODE_ENV);

// const isDev = process.env.NODE_ENV == "development";
router.beforeEach(async (to,from,next)=>{
   const toName=to.name;
   if (store.getters.token) {
     console.log("123");
     
    //  next()
   }else{
    console.log("234");
    //  next({name:"logins"})
   }
   next()
})

export default router
