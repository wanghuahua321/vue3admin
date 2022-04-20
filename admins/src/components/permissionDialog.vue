<template>
  <a-modal title="111" v-model:visible="dialogPermissionFormVisible" :maskClosable="false" @cancel="dialogPermissionFormVisible = false">
    <a-form label-position="top">
      <a-tabs tab-position="left">
        <a-tab-pane v-for="group in permissionData.groups" :key="group.name" :tab="group.displayName">
          <a-form-item :label="group.displayName">
            <a-tree ref="permissionTree" checkable :tree-data="
                                transformPermissionTree(group.permissions)
                            " v-model:replaceFields="treeDefaultProps" v-model:checkedKeys="checkedKeys" checkedKeys defaultExpandAll />
          </a-form-item>
        </a-tab-pane>
      </a-tabs>
    </a-form>
    <div slot="footer" class="dialog-footer">
      <a-button @click="dialogPermissionFormVisible = false">
        取消
      </a-button>
      <a-button type="primary" @click="updatePermissionData()">
        保存
      </a-button>
    </div>
  </a-modal>
</template>

<script lang='ts'>
import { reactive, onMounted, toRefs } from "vue";
import { certification } from "@/utils/api";
export default {
  name: "permissionDialog",
  components: {},
  props: {
    tabbraList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    providerName: {
      type: String,
      default: "",
    },
    perFormData: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  setup(props, ctx) {
    // console.log("999", props.providerName);

    const pageData = reactive({
      activeKey: "role",
      dialogPermissionFormVisible: true,
      permissionsQuery: {
        providerKey: "",
        providerName: "",
      },
      checkedKeys: [],
      treeDefaultProps: {
        children: "children",
        title: "label",
        key: "name",
      },
      permissionData: {},
    });
    const changeTabs = (val) => {
      pageData.activeKey = val.key;
      ctx.emit("choseTab", val);
    };
    // pageData.permissionsQuery.providerName = props.providerName;
    const onCheck = (checkedKeys) => {
      console.log("9999", onCheck);
      pageData.checkedKeys = checkedKeys.checked || [];
    };

    const getPermission = () => {
      let query = {
        providerKey: "111",
        providerName: "R",
      };
      certification.Permissions.getPermissions(query)
        .then((res) => {
          pageData.permissionData = res;
        })
        .catch((error) => {
          console.log(error);
        });
    };

    function transformPermissionTree(permissions, name = null) {
      let arr: any = [];
      if (
        !permissions ||
        !permissions.some((v: any) => v.parentName === name)
      ) {
        return arr;
      }
      let parents = permissions.filter((v: any) => v.parentName === name);
      for (const i in parents) {
        let label = "";
        // if (pageData.permissionsQuery.providerName === "R") {
        //   label = parents[i].displayName;
        // } else if (pageData.permissionsQuery.providerName === "U") {
        //   label = parents[i].displayName;
        //   // + ' ' + parents[i].grantedProviders.map((provider: any) => {
        //   //         return `${provider.providerName}: ${provider.providerKey}`;
        //   //     });
        // }
        label = parents[i].displayName;
        let newObj: any = {
          name: parents[i].name,
          label: label,
          disabled: isGrantedByOtherProviderName(parents[i].grantedProviders),
          children: transformPermissionTree(permissions, parents[i].name),
        };
        arr.push(newObj);
      }
      return arr;
    }

    function isGrantedByOtherProviderName(grantedProviders: any) {
      if (grantedProviders.length) {
        return (
          grantedProviders.findIndex(
            (p: any) =>
              p.providerName !== pageData.permissionsQuery.providerName
          ) > -1
        );
      }
      return false;
    }

    onMounted(() => {
      getPermission();
    });
    return {
      changeTabs,
      ...toRefs(pageData),
      onCheck,
      getPermission,
      isGrantedByOtherProviderName,
      transformPermissionTree,
    };
  },
};
</script>

