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
  const tokens=store.getters.token
  const { token, userInfo } = store.state;
 
   if(to.path==='/login'){
    console.log("tokens",token);
     next()
   }else{
      if (tokens) {
        /* 重新发起缓存配置 */
        if(!token){
          store.commit("setToken",tokens)
        }
        if(Object.keys(userInfo).length===0){
          await store.dispatch('getCurrentUser');  
        }
        next()
      }else{ 
      next('/login')
      }
   }
  
})

export default router
