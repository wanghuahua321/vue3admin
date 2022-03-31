import { LoginInfo } from "../utils/api";
const actions = {

  async getCurrentUser({ commit }) {
    await LoginInfo.getUserinfo().then((res) => {
      if (res) {
        commit("setUserInfo", res);
      }
    });
  },
}
export default actions;