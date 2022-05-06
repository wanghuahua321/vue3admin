<template>
  <div class="user">
    <tables :table_header="roleHeader" :table_data="roleData" :tagList="tagLists" :pagination="pagination" @editClick="editClick"
      @refrcoshAgain="getUser()" @changePage="changePage"></tables>

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
          width: "22%",
        },
        {
          title: "邮箱地址",
          dataIndex: "email",
          width: "22%",
        },
        {
          title: "手机号码 ",
          dataIndex: "phoneNumber",
          width: "22%",
        },
        {
          title: "操作",
          dataIndex: "operation",
          width: "32%",
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
      pagination: {
        current: 1,
        total: 0,
        pageSize: 8, //每页中显示10条数据
        showSizeChanger: true,
        pageSizeOptions: ["8", "10", "20", "50", "100"], //每页中显示的数据
        showTotal: (total) => `共有 ${total} 条数据`, //分页中显示总的数据
      },
      pageParms: {
        SkipCount: 0, //跳过1页就传10
        MaxResultCount: 8, //每页的数据
      },
    });
    const permissionDialog = ref();
    onMounted(() => {
      getUser();
    });
    const getUser = () => {
      certification.user
        .getUsers(pagedata.pageParms)
        .then((res) => {
          pagedata.roleData = res.items;
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const handleOk = () => {
      let addParam = {
        ...createRole.value.createRoleform,
      };
      addParam["extraProperties"] = {
        ...createRole.value.extraProperties,
      };
      createRole.value.roleForm
        .validate()
        .then(() => {
          if (props.dialogMsgs.isAdd) {
            addUsers(addParam);
          } else {
            updataUsers(addParam);
          }
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

          if (res.error) {
            message.error(res.error.message);
          } else {
            message.success("新增用户成功");
            ctx.emit("closedia");
          }
          getUser();
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const updataUsers = (addUserPar) => {
      certification.user
        .updataUser(addUserPar.id, addUserPar)
        .then((res) => {
          getUser();
          if (res.error) {
            message.error("修改用户保存失败");
          } else {
            message.success("修改用户保存成功");
            ctx.emit("closedia");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const changePage = (pagedatas) => {
      pagedata.pagination.current = pagedatas.current;
      pagedata.pagination.pageSize = pagedatas.pageSize;
      (pagedata.pageParms as any).SkipCount =
        (pagedatas.current - 1) * pagedatas.pageSize;
      pagedata.pageParms.MaxResultCount = pagedatas.pageSize;
      getUser();
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
      changePage,
      updataUsers,
    };
  },
};
</script>

<style scoped lang="scss">
</style>
