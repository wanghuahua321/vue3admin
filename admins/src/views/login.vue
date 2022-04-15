<template>
  <div class="jc-login">
    <div class="container">
      <div class="wrapper">
        <div class="login-logo enter-x-l">
          <p>
            <svg-icon iconName="logo" />
            <span>Admin</span>
          </p>
        </div>
        <div class="flex-item login-info">
          <div class="info-box">
            <img alt="JC Admin" src="../assets/images/123.png" />
            <h1 class="enter-x-r">Admin后台管理系统</h1>
            <p class="enter-x-r"><span>欢迎使用</span></p>
          </div>
        </div>
        <div class="flex-item login-form">
          <div class="form-box enter-x-l">
            <h1 class="login-title enter-x-l">登录</h1>
            <a-form ref="loginForms" :model="formData" :rules="rules">
              <a-form-item name="username" class="enter-x-l">
                <a-input aria-autocomplete="off" v-model:value="formData.username" size="large" placeholder="用户名" />
              </a-form-item>
              <a-form-item name="password" class="enter-x-l">
                <a-input-password aria-autocomplete="off" v-model:value="formData.password" size="large" placeholder="密码" @keyup.enter="logins" />
              </a-form-item>
              <a-form-item class="enter-x-l" name="isCheckd">
                <a-checkbox v-model:checked="formData.isChecked">记住我</a-checkbox>
              </a-form-item>
              <a-form-item class="enter-x-l">
                <a-button size="large" :loading="loading" class="btn-login" type="primary" @click="logins">登录</a-button>
              </a-form-item>
            </a-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { reactive, onMounted, toRefs, inject, ref, nextTick } from "vue";
import { useRouter, useRoute } from "vue-router";
import { LoginInfo } from "../utils/api";
import { encrypt } from "../utils/encrypt";
import { useStore } from "vuex";
// const store = useStore();

export default {
  components: {},
  setup() {
    const pagesDatas = reactive({
      formData: {
        username: "15200001111",
        password: "1q2w3E*",
        isChecked: false,
      },
      rules: {
        username: [
          { required: true, trigger: "blur", message: "请输入用户名" },
        ],
        password: [
          {
            min: 6,
            required: true,
            trigger: "blur",
            message: "密码不能小于6位",
          },
        ],
      },
      loading: false,
    });
    const loginForms = ref();
    const router = useRouter();
    const store = useStore();

    nextTick(() => {
      console.log("12", loginForms.value);
    });

    // onMounted(() => {});
    const logins = () => {
      console.log("  loginForm.value", loginForms.value);
      // router.push({
      //   path: "/home",
      // });

      loginForms.value
        .validate() /*  */
        .then(() => {
          let data = {
            grant_type: "password",
            client_id: "Basic_App",
            client_secret: "1q2w3E*",
            username: pagesDatas.formData.username,
            password: pagesDatas.formData.password,
            scope: "Basic",
          };

          console.log("1234");
          // router.push({ path: redirect.value || "/", query: otherQuery.value });
          LoginInfo.Login(data).then((res) => {
            store.commit("setToken", res.token);
            getUsers();
          });
        })
        .catch((error) => {
          console.log("error", error);
          console.log("请先登录");
        });
    };

    const getUsers = () => {
      LoginInfo.getApplication().then((res) => {
        console.log("成员", res);
      });
      LoginInfo.getUserinfo().then((res) => {
        store.commit("setUserInfo", res);
        router.push({
          path: "/home",
        });
      });
    };
    return {
      ...toRefs(pagesDatas),
      logins,
      getUsers,
      loginForms,
    };
  },
};
</script>

<style lang="scss" scoped>
.jc-login {
  overflow: hidden;
  height: 100%;
  padding: 0 16px;
  position: relative;
  &::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin-left: -48%;
    background-image: url("../assets/svgs/login-bg.svg");
    background-position: 100%;
    background-repeat: no-repeat;
    background-size: auto 100%;
    content: "";
  }
  .container {
    margin: 0 auto;
    height: 100%;
    box-sizing: border-box;
    .wrapper {
      display: flex;
      height: 100%;
      .login-logo {
        position: absolute;
        top: 8px;
        display: none;
        p {
          color: #fff;
          img {
            width: 30px;
            vertical-align: -7px;
          }
          span {
            font-weight: bold;
            font-size: 16px;
            display: inline-block;
            padding-left: 5px;
          }
        }
      }
      .flex-item {
        width: 50%;
      }
      .login-info {
        position: relative;
        .info-box {
          position: absolute;
          top: 50%;
          color: #fff;
          margin-top: -159px;
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          img {
            width: 45%;
            vertical-align: middle;
          }
          h1 {
            margin: 56px 0 20px 0;
            font-weight: normal;
            color: #fff;
          }
        }
      }
      .login-form {
        position: relative;
        .form-box {
          position: absolute;
          top: 50%;
          margin-top: -168px;
          margin-left: 90px;
          width: 400px;
          .login-title {
            margin-bottom: 20px;
          }
          .btn-login {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>