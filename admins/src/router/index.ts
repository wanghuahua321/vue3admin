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
     next()
   }else{
     next({name:"homeindex"})
   }

   console.log("toName",toName);
   console.log("to",to);
   
   next()
})

export default router
