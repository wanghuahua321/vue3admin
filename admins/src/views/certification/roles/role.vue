<template>
  <div class="role">
    role
    <tables :table_header="roleHeader" :table_data="roleData" :tagList="tagLists" @editClick="editClick"></tables>

    <permissionDialog ref="permissionDialog"></permissionDialog>

    <a-modal :title="dialogMsgs.addTit" :visible="dialogMsgs.addvisible" :maskClosable="dialogMsgs.confirmLoading" :confirm-loading="confirmLoading"
      @ok="handleOk" @cancel="handleCancel">
      <createForm v-if="dialogMsgs.addvisible" :formData="formData" :isEdit="dialogMsgs.isAdd" ref="createRole"></createForm>
    </a-modal>

  </div>
</template>

<script lang='ts'>
import { reactive, onMounted, toRefs, watch, toRef, PropType } from "vue";
import tables from "@/components/tables.vue";
import { certification } from "@/utils/api";
import createForm from "../component/createForm.vue";
import permissionDialog from "@/components/permissionDialog.vue";
interface dialogMsgss {
  isAdd?: boolean;
  addTit?: string;
  addvisible?: boolean;
  confirmLoading?: boolean;
}
export default {
  name: "role",
  components: {
    tables,
    permissionDialog,
    createForm,
  },

  props: {
    dialogMsgs: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },

  setup(props, ctx) {
    const pagedata = reactive({
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
          title: "操作",
          dataIndex: "operation",
          // slots: { customRender: "operation" },
          slots: { customRender: "operation" },
        },
      ],
      newRoleTitle: "",
      confirmLoading: false,
      tagLists: [
        {
          keys: 0,
          ktit: "编辑",
          icons: "bj",
          colors: "#E7E7FF",
          kinds: "role",
        },
        {
          keys: 1,
          ktit: "权限",
          icons: "qx",
          colors: "#FBEBE6",
          kinds: "role",
        },
      ],
      // dialogMsgs: {},
    });
    // pagedata.dialogMsgs = toRefs(props.dialogMsg);
    onMounted(() => {
      getRoles();
      // console.log("dialogMsg", pagedata.dialogMsgs);
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

    // watch(
    //   () => pagedata.dialogMsgs,
    //   (newsvalue) => {
    //     console.log("999", newsvalue);
    //   },
    //   { immediate: true, deep: true }
    // );

    const handleOk = () => {
      // (props.dialogMsgs as dialogMsgs).addvisible = false;
      ctx.emit("closedia");
    };

    const handleCancel = () => {
      ctx.emit("closedia");
      // (props.dialogMsgs as dialogMsgs).addvisible = false;
    };

    const editClick = (val) => {
      let params = {
        isAdd: false,
        addTit: "编辑角色",
        addvisible: false,
        confirmLoading: false,
      };
      ctx.emit("editDialog", params);
      // (pagedata.dialogMsgs as dialogMsgs).addvisible = true;
      // (pagedata.dialogMsgs as dialogMsgs).isAdd = false;
      // (pagedata.dialogMsgs as dialogMsgs).addTit = "bianji";

      console.log("vals", val);
      // pagedata.visible = true;
      // pagedata.dialogMsgs = val.dialogMsg;
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
