<template>

  <a-form class="createForm" ref="roleForm" :model="createRoleform" :rules="rules">
    <a-tabs tab-position="top">
      <a-tab-pane key="1" tab="用户信息">
        <a-form-item>
          <ImgCropper ref="imgCroppers" @okHandels="okHandels"></ImgCropper>
          <!-- <a-input v-model:value="createRoleform.email" placeholder="请输入管理员电子邮箱地址" /> -->
        </a-form-item>
        <a-form-item label="用户名称" name="userName">
          <a-input v-model:value="createRoleform.userName" placeholder="请输入用户名称" />
        </a-form-item>
        <a-form-item label="名" name="name">
          <a-input v-model:value="createRoleform.name" placeholder="请输入名" />
        </a-form-item>
        <a-form-item label="姓" name="surname">
          <a-input v-model:value="createRoleform.surname" placeholder="请输入姓" />
        </a-form-item>
        <a-form-item label="密码" name="password">
          <a-input v-model:value="createRoleform.password" placeholder="请输入密码" />
        </a-form-item>
        <a-form-item label="邮箱地址" name="email">
          <a-input v-model:value="createRoleform.email" placeholder="请输入邮箱地址" />
        </a-form-item>
        <a-form-item label="手机号" name="phoneNumber">
          <a-input v-model:value="createRoleform.phoneNumber" placeholder="请输入手机号" />
        </a-form-item>
        <a-form-item name="lockoutEnabled">
          <a-checkbox v-model:checked="createRoleform.lockoutEnabled">
            登录失败,账户被锁定
          </a-checkbox>
        </a-form-item>

      </a-tab-pane>
      <a-tab-pane key="2" tab="角色">
        <a-form-item>
          <!-- {{assignableRoles}} -->
          <a-checkbox-group v-model:value="value2" :options="plainOptions" />
          <!-- <a-checkbox-group v-model:value="createRoleform.roleNames" :options="plainOptions"></a-checkbox-group> -->
          <!-- <a-checkbox-group :value="createRoleform.roleNames" @change="changeRoles" v-if="assignableRoles">
            <a-checkbox v-for="role in 3" :key="role.id" :value="role.name" style="width:100%;margin-left: 15px;padding: 5px 0;">
              123</a-checkbox>
          </a-checkbox-group> -->
        </a-form-item>
      </a-tab-pane>
    </a-tabs>
  </a-form>

</template>
<script lang='ts'>
import { reactive, onMounted, toRefs, ref } from "vue";
import { certification } from "@/utils/api";
import ImgCropper from "./ImgCropper.vue";
import { useStore } from "vuex";

export default {
  name: "createForm",
  components: {
    ImgCropper,
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
    formData: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  setup(props) {
    const roleForm = ref();
    const imgCroppers = ref();
    const store = useStore();
    const phoneNumberValidator = (rule: any, value: any, callback: any) => {
      console.log("value", value);
      if (!value) {
        return new Promise((resolve, reject) => {
          reject("22");
        });
      }
      const reg = /^[1][3,5,7,8][0-9]{9}$/;
      if (!reg.test(value)) {
        return new Promise((resolve, reject) => {
          reject("手机号格式不对");
        });
      }
      return Promise.resolve();
    };

    const passwordValidator = (rule: any, value: any, callback: any) => {
      if (!value) {
        return new Promise((resolve, reject) => {
          reject("error");
        });
      }
      if (value.length < 6) {
        return new Promise((resolve, reject) => {
          reject("不能小于六位");
        });
      }
      return Promise.resolve();
    };

    const pagedata = reactive({
      formDatas: {},
      createRoleform: {
        lockoutEnabled: "",
      },
      extraProperties: {
        Title: "",
      },
      value2: ["Apple"],
      plainOptions: ["Apple", "Pear", "Orange"],
      rules: {
        userName: {
          required: true,
          message: "Please input name",
        },
        phoneNumber: {
          required: true,
          validator: phoneNumberValidator,
          trigger: ["blur", "change"],
        },
        password: {
          required: true,
          validator: passwordValidator,
          trigger: ["blur", "change"],
        },
        email: [
          {
            required: true,
            message: "字段邮箱地址不是有效的邮箱地址",
            trigger: "blur",
          },
          {
            type: "email",
            message: "字段邮箱地址不是有效的邮箱地址",
            trigger: ["blur", "change"],
          },
          {
            max: 256,
            message: "字段邮箱地址不是有效的邮箱地址",
            trigger: "blur",
          },
        ],
      },
    });
    if (props.isEdit) {
      console.log("999", store.state.editClick);
      pagedata.createRoleform = { ...store.state.editClick };
    } else {
      console.log("999000", store.state.editClick);
      pagedata.createRoleform = { ...store.state.editClick };
    }

    onMounted(() => {
      // console.log("99999999", pagedata.formData);
      // console.log("isEdit", props.formData);
      // if (pagedata.formDatas) {
      // }
    });

    const okHandels = (vals) => {
      pagedata.extraProperties.Title = vals;
    };

    return {
      ...toRefs(pagedata),
      roleForm,
      imgCroppers,
      okHandels,
    };
  },
};
</script>

<style scoped lang="scss">
.createForm {
  width: 100%;
  min-height: 180px;
  :deep(.ant-col) {
    min-width: 80px !important;
  }
  .formItems {
    // flex-direction: column !important;
    // // justify-content: space-around;
    // align-items: flex-start;
  }
}
</style>
