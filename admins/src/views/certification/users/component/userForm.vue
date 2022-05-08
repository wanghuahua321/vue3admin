<template>

  <a-form class="createForm" ref="roleForm" :model="createRoleform" :rules="rules">
    <a-tabs tab-position="top">
      <a-tab-pane key="1" tab="用户信息">
        <a-form-item>
          <ImgCropper ref="imgCroppers" @okHandels="okHandels"
            :extraProperties="createRoleform.extraProperties&&createRoleform.extraProperties.Title?createRoleform.extraProperties.Title:''">
          </ImgCropper>
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
          <a-checkbox-group :value="createRoleform.roleNames" @change="changeRoles">
            <a-checkbox v-for="role in plainOptions" :key="role.id" :value="role.name" style="width:100%;margin-left: 15px;padding: 5px 0;">
              {{ role.name }}</a-checkbox>
          </a-checkbox-group>

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
      if (!value) {
        return new Promise((resolve, reject) => {
          reject("字段手机号不可为空");
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
          reject("字段管理员密码不可为空");
        });
      }
      if (value.length < 6) {
        return new Promise((resolve, reject) => {
          reject("密码至少为6个字符");
        });
      }
      return Promise.resolve();
    };

    const pagedata = reactive({
      formDatas: {},
      createRoleform: {
        lockoutEnabled: true,
        roleNames: ["0426"] as any,
      },
      extraProperties: {
        Title: "",
      },
      value2: ["Apple"],
      plainOptions: ["Apple", "Pear", "Orange"],
      rules: {
        userName: {
          required: true,
          message: "字段用户名称不可为空",
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
      //新增
      pagedata.createRoleform = {
        lockoutEnabled: true,
        roleNames: [],
      };
    } else {
      pagedata.createRoleform = {
        ...store.state.editClick,
        roleNames: [],
      };
      getRolesByUserIds((pagedata.createRoleform as any).id);
    }

    onMounted(() => {
      getUsersRole();
    });

    const okHandels = (vals) => {
      pagedata.extraProperties.Title = vals;
    };
    const changeRoles = (val) => {
      console.log("9999", val);

      pagedata.createRoleform.roleNames = val;
    };

    const getUsersRole = () => {
      certification.user.getUsersRole().then((res) => {
        pagedata.plainOptions = res.items;
      });
    };

    function getRolesByUserIds(ids) {
      certification.user.getRolesByUserId(ids).then((res) => {
        if (res.items.length > 0) {
          res.items.forEach((ress) => {
            pagedata.createRoleform.roleNames.push(ress.name);
          });
        } else {
          pagedata.createRoleform.roleNames.length = 0;
        }
      });
    }

    return {
      ...toRefs(pagedata),
      roleForm,
      imgCroppers,
      okHandels,
      getUsersRole,
      changeRoles,
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
