<template>
  {{isEdit}}
  <a-form v-if="isEdit" class="createForm" ref="roleForm" :model="createRoleform" :rules="rules">
    <a-form-item class="formItems" label="租户名称" ref="names" name="userName">
      <a-input v-model:value="createRoleform.userName" placeholder="请输入租户名称" />
    </a-form-item>

    <!-- <a-form-item class="formItems" label="管理员密码" ref="names" name="name">
      <a-input v-model:value="createRoleform.name" placeholder="请输入管理员密码" />
    </a-form-item> -->
    <a-form-item class="formItems" label="手机号" ref="names" name="phoneNumber">
      <a-input v-model:value="createRoleform.phoneNumber" placeholder="请输入手机号" />
    </a-form-item>
  </a-form>

  <a-form v-else class="createForm" ref="roleForm" :model="createRoleform" :rules="rules">
    <a-tabs tab-position="top">
      <a-tab-pane key="1" tab="用户信息">
        <a-form-item label="头像">
          <!-- <a-input v-model:value="createRoleform.email" placeholder="请输入管理员电子邮箱地址" /> -->
        </a-form-item>
        <a-form-item label="用户名称" name="userName">
          <a-input v-model:value="createRoleform.userName" placeholder="请输入用户名称" />
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
// import ImgCropper from "./ImgCropper.vue";
import { useStore } from "vuex";

export default {
  name: "createForm",
  components: {
    // ImgCropper,
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
    const store = useStore();
    const pagedata = reactive({
      formDatas: {},
      createRoleform: {},
      value2: ["Apple"],
      plainOptions: ["Apple", "Pear", "Orange"],
      rules: {
        userName: {
          required: true,
          message: "Please input name",
        },
        phoneNumber: {
          required: true,
          message: "Please input name",
        },
        password: {
          required: true,
          message: "Please input name",
        },
        email: {
          required: true,
          message: "字段邮箱地址不是有效的邮箱地址",
        },
      },
    });
    if (props.isEdit) {
      pagedata.createRoleform = { ...store.state.editClick };
    } else {
      pagedata.createRoleform = {};
    }

    onMounted(() => {
      // console.log("99999999", pagedata.formData);
      // console.log("isEdit", props.formData);
      // if (pagedata.formDatas) {
      // }
    });

    return {
      ...toRefs(pagedata),
      roleForm,
    };
  },
};
</script>

<style scoped lang="scss">
.createForm {
  width: 100%;
  min-height: 180px;
  .formItems {
    // flex-direction: column !important;
    // // justify-content: space-around;
    // align-items: flex-start;
  }
}
</style>
