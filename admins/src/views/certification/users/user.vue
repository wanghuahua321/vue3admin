<template>
  <div class="user">
    user
    <tables :table_header="roleHeader" :table_data="roleData" :tagList="tagLists" @editClick="editClick" @refrcoshAgain="getUser()"></tables>

    <permissionDialog ref="permissionDialog" providerName="U" :perFormData="formData" :diaVisible="diaVisible" @closes="diaVisible=false">
    </permissionDialog>

    <a-modal :title="dialogMsgs.addTit" :visible="dialogMsgs.addvisible" :maskClosable="dialogMsgs.confirmLoading" :confirm-loading="confirmLoading"
      @ok="handleOk" @cancel="handleCancel">
      <userForm v-if="dialogMsgs.addvisible" :isEdit="dialogMsgs.isAdd" ref="createRole"></userForm>
    </a-modal>

  </div>
</template>

<script lang='ts'>
import { reactive, onMounted, toRefs, watch, toRef, PropType, ref } from "vue";
import tables from "@/components/tables.vue";
import { certification } from "@/utils/api";
import userForm from "./component/userForm.vue";
import permissionDialog from "@/components/permissionDialog.vue";
import { message } from "ant-design-vue";
import { useStore } from "vuex";
interface dialogMsgss {
  isAdd?: boolean;
  addTit?: string;
  addvisible?: boolean;
  confirmLoading?: boolean;
}
export default {
  name: "user",
  components: {
    tables,
    permissionDialog,
    userForm,
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
    const createRole = ref();
    const store = useStore();
    const pagedata = reactive({
      formData: {},
      editsId: "",
      roleData: [],
      roleHeader: [
        {
          title: "用户名称",
          dataIndex: "userName",
          width: "30%",
        },
        {
          title: "邮箱地址",
          dataIndex: "email",
        },
        {
          title: "手机号码 ",
          dataIndex: "phoneNumber",
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
          kinds: "user",
        },
        {
          keys: 1,
          ktit: "权限",
          icons: "qx",
          colors: "#FBEBE6",
          kinds: "user",
        },
        {
          keys: 2,
          ktit: "删除",
          icons: "sc_13",
          colors: "#DBF0F3",
          kinds: "user",
        },
      ],
      diaVisible: false,
      dioParams: {
        isAdd: true,
        addTit: "编辑角色",
        addvisible: false,
        confirmLoading: false,
      },
      types: "",
    });
    const permissionDialog = ref();
    onMounted(() => {
      getUser();
      // console.log("dialogMsg", pagedata.dialogMsgs);
    });
    const getUser = () => {
      certification.user
        .getUsers()
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
      console.log("createRole.value.roleForm55", createRole.value);
      let addParam = {
        ...createRole.value.createRoleform,
      };
      addParam["extraProperties"] = {
        ...createRole.value.extraProperties,
      };

      console.log("99999", addParam);

      createRole.value.roleForm
        .validate()
        .then(() => {
          addUsers(addParam);
        })
        .catch((error) => {
          console.log("error", error);
        });
    };

    const closes = () => {
      pagedata.diaVisible = false;
    };

    const handleCancel = () => {
      ctx.emit("closedia");
      // (props.dialogMsgs as dialogMsgs).addvisible = false;
    };

    const editClick = (val, kinds, ktit) => {
      let dialogMsg = {
        isAdd: false,
        addTit: ktit,
        addvisible: true,
        confirmLoading: false,
      };
      if (kinds == "permissions") {
        pagedata.diaVisible = true;
        permissionDialog.value.handleUpdatePermission(val);
      } else {
        store.commit("setDialogMsg", dialogMsg);
      }
      pagedata.formData = val;
      pagedata.editsId = val.id;
      pagedata.types = ktit;
      console.log("formData", val);
      console.log("vals", kinds);
    };
    const addUsers = (addUserPar) => {
      certification.user
        .addUser(addUserPar)
        .then((res) => {
          console.log("res", res);

          if (!res) {
            message.error("该手机号已被注册");
          } else {
            message.success("新增用户成功");
            ctx.emit("closedia");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    return {
      ...toRefs(pagedata),
      getUser,
      editClick,
      handleOk,
      handleCancel,
      createRole,
      addUsers,
      closes,
      permissionDialog,
    };
  },
};
</script>

<style scoped lang="scss">
</style>
