import { storeState } from '@/interface/index'
const tokenAlias = btoa('token');
const mutations = {
  setToken(state:storeState,count:string){
    state.token=count;
    localStorage[tokenAlias] = count;

  },
  Logout: (state: storeState) => {
    //退出登录的操作,需要清楚的一些状态
    state.token = '';
    localStorage.removeItem(tokenAlias);
    // state.user = null;
    // state.role = "";
  },

  setUserInfo(state:storeState, count:object){
    state.userInfo=count
    localStorage.setItem('userInfo',JSON.stringify(count))
  },

  setChatPerson(state:storeState,count:object){
    state.chatPerson=count
    console.log("state.chatPerson",state.chatPerson);
    
  }
};
export default mutations;