<template>
  <div class="LoginIndex">
    <div class="lleft">
      <svg-icon iconName="baobiao" />
      <!-- <svg-icon v-if="!isedits" @click="b_handle" iconName="bianji" /> -->
    </div>
    <div class="lrig">
      <div>
        用户名:
        <a-input v-model:value="infos.names" placeholder="Basic usage" />
        <br>
        密码:
        <a-input v-model:value="infos.password" placeholder="Basic usage" />
        <br>
        <a-button type="primary" @click="logins">denglu</a-button>
      </div>
    </div>

  </div>
</template>

<script lang='ts'>
import axios from "axios";
import { reactive, onMounted, toRefs } from "vue";
import { useRouter, useRoute } from "vue-router";
import { LoginInfo } from "../utils/api";
import { encrypt } from "../utils/encrypt";
import { useStore } from "vuex";
// const store = useStore();

export default {
  components: {},
  setup() {
    const pagesDatas = reactive({
      infos: {
        names: "admin",
        password: "Pass@word1",
      },
    });
    const router = useRouter();
    const store = useStore();
    onMounted(() => {
      console.log("12");
    });
    const logins = () => {
      console.log("1");
      let data = {
        email: pagesDatas.infos.names,
        password: encrypt(pagesDatas.infos.password),
        returnUrl: "",
        language: "zh",
        code: 123,
      };
      LoginInfo.Login(data).then((res) => {
        console.log("res", res);
        store.commit("setToken", res.data.tokenAccess);
      });
    };
    return {
      ...toRefs(pagesDatas),
      logins,
    };
  },
};
</script>

<style scoped lang="scss">
.LoginIndex {
  display: flex;
  .lleft {
    flex: 2;
  }
  .lrig {
    flex: 1;
    display: flex;
    align-items: center;
    height: 100vh;
    align-items: center;
    justify-content: center;
  }
}
</style>
