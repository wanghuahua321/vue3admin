import state from "./state";
const tokenAlias = btoa('token');
const getters={
  token: (state: any): string => {
    return state.token ? state.token : localStorage[tokenAlias]
  },

};
export default getters
