import state from "./state";
const tokenAlias = btoa('token');
const getters={
  token: (state): string => {
    return state.token ? state.token : localStorage[tokenAlias]
  },
  getUserInfo:(state):object=>{
    return state.userInfo
  }
};
export default getters
