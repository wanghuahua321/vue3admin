<template>
  <div class="user">
    tenant
    <tables :table_header="roleHeader" :table_data="roleData" :pagination="pagination" :tagList="tagLists" @editClick="editClick"
      @refrcoshAgain="getTenants()" @changePage="changePage"></tables>

    <a-modal :title="dialogMsgs.addTit" :visible="dialogMsgs.addvisible" :maskClosable="dialogMsgs.confirmLoading" :confirm-loading="confirmLoading"
      @ok="handleOk" @cancel="handleCancel">
      <tenantForm v-if="dialogMsgs.addvisible" :isEdit="dialogMsgs.isAdd" ref="createRole" :types="types" :editsId="editsId"></tenantForm>
    </a-modal>

  </div>
</template>

<script lang='ts'>
import { reactive, onMounted, toRefs, watch, toRef, PropType, ref } from "vue";
import tables from "@/components/tables.vue";
import { certification } from "@/utils/api";
import tenantForm from "./component/tenantForm.vue";
import { useStore } from "vuex";
import { message } from "ant-design-vue";

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
      // dialogMsgs: {},
    });
    // pagedata.dialogMsgs = toRefs(props.dialogMsg);
    onMounted(() => {
      getTenants();
    });
    const getTenants = () => {
      certification.tenant
        .getTenant(pagedata.pageParms)
        .then((res) => {
          pagedata.roleData = res.items;
          pagedata.pagination.total = res.totalCount;
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
      const {
        createRoleform,
        temp,
        useSharedDatabase,
        features,
        featuresQuery,
      } = createRole.value;

      createRole.value.roleForm
        .validate()
        .then(() => {
          if (props.dialogMsgs.isAdd) {
            addTenants(createRole.value.createRoleform);
          } else {
            if (pagedata.types.includes("链接")) {
              Connections(useSharedDatabase, createRoleform);
            } else if (pagedata.types.includes("功能")) {
              const tempData: any = { features: [] };
              features.map((feature: any) => {
                if (
                  feature.valueType.name === "FreeTextStringValueType" ||
                  feature.valueType.name === "SelectionStringValueType" ||
                  feature.valueType.name === "ToggleStringValueType"
                ) {
                  tempData.features.push({
                    name: feature.name,
                    value: temp[feature.name],
                  });
                }
              });

              featuresQuery.providerKey = pagedata.editsId;
              updataFeature(featuresQuery, tempData);
            } else {
              updataTenants(createRole.value.createRoleform);
            }
          }
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
          getTenants();
          ctx.emit("closedia");
        })
        .catch((error) => {
          console.log(error);
        });
    };
    //编辑
    const updataTenants = (params) => {
      certification.tenant
        .updataTenant(params.id, params)
        .then((res) => {
          getTenants();
          ctx.emit("closedia");
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const updataFeature = (featuresQuery, tempData) => {
      certification.tenant
        .updataFeatures(featuresQuery, tempData)
        .then((res) => {
          message.success("管理功能保存成功");
          ctx.emit("closedia");
        })
        .catch((error) => {});
    };

    const Connections = (useSharedDatabase, createRoleform) => {
      if (
        useSharedDatabase ||
        (!useSharedDatabase && !createRoleform.defaultConnectionString)
      ) {
        certification.tenant
          .delConnect(createRoleform.id)
          .then((res) => {
            ctx.emit("closedia");
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        console.log("123");
        let objs: any = {};
        objs.defaultConnectionString = createRoleform.defaultConnectionString;
        certification.tenant
          .updataConnection(createRoleform.id, objs)
          .then((res) => {
            ctx.emit("closedia");
            message.success("管理链接字符串保存成功");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };
    const changePage = (pagedatas) => {
      pagedata.pagination.current = pagedatas.current;
      pagedata.pagination.pageSize = pagedatas.pageSize;
      (pagedata.pageParms as any).SkipCount =
        (pagedatas.current - 1) * pagedatas.pageSize;
      pagedata.pageParms.MaxResultCount = pagedatas.pageSize;
      getTenants();
    };
    return {
      ...toRefs(pagedata),
      getTenants,
      editClick,
      handleOk,
      handleCancel,
      createRole,
      addTenants,
      updataTenants,
      Connections,
      updataFeature,
      changePage,
    };
  },
};
</script>

<style scoped lang="scss">
</style>
