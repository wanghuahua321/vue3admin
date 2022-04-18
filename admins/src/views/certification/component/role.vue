<template>
  <div class="role">
    role
    <tables :table_header="roleHeader" :table_data="roleData" @editClick="editClick"></tables>

    <permissionDialog ref="permissionDialog"></permissionDialog>
    <a-modal :title="newRoleTitle" :visible="visible" :maskClosable="false" :confirm-loading="confirmLoading" @ok="handleOk" @cancel="handleCancel">
      <createForm v-if="visible" :formData="formData" ref="createRole"></createForm>
    </a-modal>

  </div>
</template>

<script lang='ts'>
import { reactive, onMounted, toRefs } from "vue";
import tables from "@/components/tables.vue";
import { certification } from "@/utils/api";
import createForm from "./createForm.vue";
import permissionDialog from "@/components/permissionDialog.vue";
export default {
  name: "role",
  components: {
    tables,
    permissionDialog,
    createForm,
  },
  setup() {
    const pagedata = reactive({
      visible: false,
      formData: {},
      roleData: [],
      roleHeader: [
        {
          title: "角色名称",
          dataIndex: "name",
          width: "30%",
        },
        {
          title: "是否公开",
          dataIndex: "isPublic",
          slots: { customRender: "isPublic" },
        },
        {
          title: "operation",
          dataIndex: "operation",
          slots: { customRender: "operation" },
        },
      ],
      newRoleTitle: "",
      confirmLoading: false,
    });
    onMounted(() => {
      getRoles();
    });
    const getRoles = () => {
      certification.roles
        .getRoles()
        .then((res) => {
          pagedata.roleData = res.items;
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const handleOk = () => {};

    const handleCancel = () => {};

    const editClick = (val, Boolean) => {
      console.log("vals", val);
      pagedata.visible = true;
    };
    return {
      ...toRefs(pagedata),
      getRoles,
      editClick,
      handleOk,
      handleCancel,
    };
  },
};
</script>

<style scoped lang="scss">
</style>
