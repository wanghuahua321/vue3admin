<template>
  <div class="logins">
    <div class="lefts_img"></div>
    <div class="rig_img"></div>
    <div class="logins_conts">
      <div class="logins_conts_inner">
        <div class="l_left">
          <svg-icon iconName="tu" />
        </div>
        <div class="l_rig">
          <div class="loginUser">
            <div class="user_top">
              <svg-icon class="logos" iconName="logo" />
            </div>

            <a-form style="width:90%,margin:0 auto" ref="loginForms" :model="formData" :rules="rules">
              <a-form-item name="username" class="enter-x-l">
                <a-input aria-autocomplete="off" v-model:value="formData.username" size="large" placeholder="用户名">
                  <template #prefix>
                    <svg-icon class="logins_icon" iconName="zhanghao" />
                  </template>
                </a-input>
              </a-form-item>
              <a-form-item name="password" class="enter-x-l">
                <a-input-password aria-autocomplete="off" v-model:value="formData.password" size="large" placeholder="密码" @keyup.enter="logins">
                  <template #prefix>
                    <svg-icon class="logins_icon" iconName="mima" />
                  </template>
                </a-input-password>
              </a-form-item>
              <a-form-item class="ischecks" name="isCheckd">
                <a-checkbox v-model:checked="formData.isChecked">记住我</a-checkbox>
              </a-form-item>
              <a-form-item class="buttons">
                <a-button style="width:100%" size="large" :loading="loading" type="primary" @click="logins">登录</a-button>
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
.logins {
  width: 100%;
  height: 100vh;
  background-color: #ffded3;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  .lefts_img {
    position: absolute;
    top: 0;
    left: 0%;
    width: 24.8%;
    min-height: 30%;
    background-image: url("../assets/images/zuo.png");
    background-position: 100%;
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .rig_img {
    position: absolute;
    bottom: 0px;
    right: 0%;
    width: 18.6%;
    min-height: 41%;
    background-image: url("../assets/images/you.png");
    background-position: 100%;
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

  .logins_conts {
    width: 92%;
    height: 88%;
    margin: 0 auto;
    background: #ffffff;
    box-shadow: 0px 2px 14px 0px rgba(176, 110, 82, 0.61);
    border-radius: 20px;
    position: relative;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .logins_conts_inner {
    width: 84%;
    height: 88.5%;
    display: flex;

    .l_left {
      width: 50%;
      height: 100%;
      display: flex;
      align-items: center;
      .svg-icon {
        width: 95%;
        height: 90%;
      }
    }
    .l_rig {
      width: 50%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;

      .loginUser {
        width: 70%;
        height: 85%;
        .user_top {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
        }
        .logins_icon {
          margin-right: 8px;
          .svg-icon {
            width: 23px;
            height: 23px;
          }
        }
        .ischecks {
          margin-bottom: 10px;
        }
        .logos {
          width: 23%;
          height: 100%;
        }

        .buttons {
          width: 100%;
        }
      }
    }
  }
}
:deep(.ant-input-affix-wrapper) {
  border: 0px solid #d9d9d9 !important;
  border-bottom: 2px solid #e8e8e8 !important;
}
:deep(.ant-input-affix-wrapper-focused) {
  box-shadow: none !important;
}
:deep(.ant-input-affix-wrapper > input.ant-input) {
  line-height: 32px;
}
</style>