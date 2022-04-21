<template>
  <div class="role">
    role
    <tables :table_header="roleHeader" :table_data="roleData" :tagList="tagLists" @editClick="editClick" @closes="closes" @refrcoshAgain="getRoles">
    </tables>

    <permissionDialog ref="permissionDialog" providerName="R" :perFormData="formData" :diaVisible="diaVisible" @closes="diaVisible=false">
    </permissionDialog>

    <a-modal :title="dialogMsgs.addTit" :visible="dialogMsgs.addvisible" :maskClosable="dialogMsgs.confirmLoading" :confirm-loading="confirmLoading"
      @ok="handleOk" @cancel="handleCancel">
      <createForm v-if="dialogMsgs.addvisible" :isEdit="dialogMsgs.isAdd" ref="createRole"></createForm>
    </a-modal>

  </div>
</template>

<script lang='ts'>
import { reactive, onMounted, toRefs, watch, toRef, PropType, ref } from "vue";
import tables from "@/components/tables.vue";
import { certification } from "@/utils/api";
import createForm from "../component/createForm.vue";
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
    const createRole = ref();
    const store = useStore();
    const pagedata = reactive({
      formData: {},
      editsId: "",
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
        {
          keys: 2,
          ktit: "删除",
          icons: "sc_17",
          colors: "#FBEBE6",
          kinds: "role",
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
      console.log("createRole.value.roleForm", createRole.value.createRoleform);
      // let editParam = {
      //   name: createRole.value.createRoleform.name,
      //   isDefault: createRole.value.createRoleform.isDefault,
      //   isPublic: createRole.value.createRoleform.isPublic,
      //   concurrencyStamp: createRole.value.createRoleform.concurrencyStamp,
      // };
      (pagedata.formData as any).name = "sdssss";
      createRole.value.roleForm
        .validate()
        .then(() => {
          if (props.dialogMsgs.isAdd) {
            addRoles();
          } else {
            editInterface();
          }
          ctx.emit("closedia");
        })
        .catch((error) => {
          console.log("error", error);
        });
    };

    const handleCancel = () => {
      ctx.emit("closedia");
      // (props.dialogMsgs as dialogMsgs).addvisible = false;
    };
    const closes = () => {
      pagedata.dioParams.addvisible = false;
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
      } else {
        store.commit("setDialogMsg", dialogMsg);
      }
      pagedata.formData = val;
      pagedata.editsId = val.id;
      pagedata.types = ktit;
      console.log("formData", val);
      console.log("vals", kinds);
    };
    const editInterface = () => {
      certification.roles
        .editRoles(pagedata.editsId, createRole.value.createRoleform)
        .then((res) => {
          message.success("保存成功");
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const addRoles = () => {
      certification.roles
        .addRoles(createRole.value.createRoleform)
        .then((res) => {
          message.success("新增成功");
          getRoles();
        })
        .catch((error) => {
          console.log(error);
        });
    };
    return {
      ...toRefs(pagedata),
      getRoles,
      editClick,
      handleOk,
      handleCancel,
      createRole,
      editInterface,
      closes,
      addRoles,
    };
  },
};
</script>

<style scoped lang="scss">
</style>
