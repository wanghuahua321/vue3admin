<template>
  <div class="LoginIndex">
    <div class="lleft">

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
        <a-button type="primary" @click="getUsers">denglu2</a-button>
      </div>
    </div>

  </div>
</template>

<script lang='ts'>
import axios from "axios";
import { reactive, onMounted, toRefs, inject } from "vue";
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

    let cookies = inject("$cookies");

    onMounted(() => {
      console.log("12");
    });
    const logins = () => {
      let data = {
        grant_type: "password",
        client_id: "Basic_App",
        client_secret: "1q2w3E*",
        username: "15200001111",
        password: "1q2w3E*",
        scope: "Basic",
      };
      LoginInfo.Login(data).then((res) => {
        // store.commit("setToken", res.token);
        // (cookies as any).set(
        //   ".AspNetCore.Identity.Application",
        //   res.token,
        //   "1M"
        // );
      });
      // router.push({
      //   name: "homepage",
      // });
    };

    const getUsers = () => {
      LoginInfo.getApplication().then((res) => {
        console.log("成员", res);
      });
      LoginInfo.getUserinfo().then((res) => {
        console.log("成员", res);
      });
    };
    return {
      ...toRefs(pagesDatas),
      logins,
      getUsers,
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
