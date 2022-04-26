import { LoginInfo } from "../utils/api";
const actions = {

  async getCurrentUser({ commit }) {
    await LoginInfo.getUserinfo().then((res) => {
      if (res) {
        commit("setUserInfo", res);
      }
    });
  },
  loaddingAct(context,loading){
    context.commit("setloadding",loading)
  }
}
export default actions;