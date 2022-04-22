<template>
  <div class="user">
    tenant
    <tables :table_header="roleHeader" :table_data="roleData" :tagList="tagLists" @editClick="editClick" @refrcoshAgain="getTenants()"></tables>

    <a-modal :title="dialogMsgs.addTit" :visible="dialogMsgs.addvisible" :maskClosable="dialogMsgs.confirmLoading" :confirm-loading="confirmLoading"
      @ok="handleOk" @cancel="handleCancel">
      <tenantForm v-if="dialogMsgs.addvisible" :isEdit="dialogMsgs.isAdd" ref="createRole" :types="types"></tenantForm>
    </a-modal>

  </div>
</template>

<script lang='ts'>
import { reactive, onMounted, toRefs, watch, toRef, PropType, ref } from "vue";
import tables from "@/components/tables.vue";
import { certification } from "@/utils/api";
import tenantForm from "./component/tenantForm.vue";
import { useStore } from "vuex";

interface dialogMsgss {
  isAdd?: boolean;
  addTit?: string;
  addvisible?: boolean;
  confirmLoading?: boolean;
}
export default {
  name: "tenant",
  components: {
    tables,
    tenantForm,
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
          title: "租户名称",
          dataIndex: "name",
          width: "30%",
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
          kinds: "tenant",
        },
        {
          keys: 1,
          ktit: "管理链接字符串",
          icons: "glljzfc",
          colors: "#FBEBE6",
          kinds: "tenant",
        },
        {
          keys: 2,
          ktit: "管理功能",
          icons: "glgn",
          colors: "#DBF0F3",
          kinds: "tenant",
        },
        {
          keys: 3,
          ktit: "删除",
          icons: "sc_17",
          colors: "#FBEBE6",
          kinds: "tenant",
        },
      ],
      types: "",
      // dialogMsgs: {},
    });
    // pagedata.dialogMsgs = toRefs(props.dialogMsg);
    onMounted(() => {
      getTenants();
      // console.log("dialogMsg", pagedata.dialogMsgs);
    });
    const getTenants = () => {
      certification.tenant
        .getTenant()
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
      console.log("tenant", createRole.value.createRoleform);

      createRole.value.roleForm
        .validate()
        .then(() => {
          addTenants(createRole.value.createRoleform);
        })
        .catch((error) => {
          console.log("error", error);
        });
    };

    const handleCancel = () => {
      ctx.emit("closedia");
    };

    const editClick = (val, kinds, ktit) => {
      let dialogMsg = {
        isAdd: false,
        addTit: ktit,
        addvisible: true,
        confirmLoading: false,
      };
      console.log("value", val);
      store.commit("setDialogMsg", dialogMsg);
      pagedata.formData = val;
      pagedata.editsId = val.id;
      pagedata.types = ktit;
    };
    //新增
    const addTenants = (addParams) => {
      certification.tenant
        .addTenant(addParams)
        .then((res) => {
          ctx.emit("closedia");
        })
        .catch((error) => {
          console.log(error);
        });
    };
    return {
      ...toRefs(pagedata),
      getTenants,
      editClick,
      handleOk,
      handleCancel,
      createRole,
      addTenants,
    };
  },
};
</script>

<style scoped lang="scss">
</style>
