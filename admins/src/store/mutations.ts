const tokenAlias = btoa('token');
const mutations = {
  setToken(state:any,count:any){
    state.token=count;
    localStorage[tokenAlias] = count;
    console.log("state.token",state.token);
    
  },
  Logout: (state: any) => {
    //退出登录的操作,需要清楚的一些状态
    state.token = '';
    localStorage.removeItem(tokenAlias);
    state.user = null;
    state.role = "";
  },
};
export default mutations;