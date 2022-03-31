import state from "./state";
const tokenAlias = btoa('token');
const getters={
  token: (state): string => {
    return state.token ? state.token : localStorage[tokenAlias]
  },
  getUserInfo:(state):object=>{
    console.log("state.countstate", state);
    return Object.keys(state.userInfo).length==0? localStorage.getItem('userInfo') :state.userInfo
  }
};
export default getters
