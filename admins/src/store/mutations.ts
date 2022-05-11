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
    localStorage[tokenAlias]=""
    // state.user = null;
    // state.role = "";
  },

  setUserInfo(state:storeState, count:object){
    state.userInfo=count
    localStorage.setItem('userInfo',JSON.stringify(count))
  },

  setChatPerson(state:storeState,count:object){
    state.chatPerson=count
  },

  setEditClick(state:storeState,count:object){
    state.editClick=count
    
  },
  setDialogMsg(state:storeState,count:object){
    state.dialogMsg=count
  },
  setDialogMsgClo(state:any,count:boolean){
    state.dialogMsg.addvisible=count
  },
  setDialogMsgTit(state:any,count:string){ //修改tit
    state.dialogMsg.addTit=count
    console.log("00000",state.dialogMsg.addTit);
    
  },
  setloadding(state,count){
    state.loadding=count
  },
  setWsdata(state,count){
    state.wsdata=count
  },
  setrandDoms(state,count){
    state.randDoms=count
  },
  setcontIds(state,count){
    state.contIds=count
  }
  
};
export default mutations;