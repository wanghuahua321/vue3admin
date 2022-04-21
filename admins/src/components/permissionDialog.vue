<template>
  <a-modal :title=" '权限-'+ permissionsQuery.providerKey" v-model:visible="diaVisible" :maskClosable="false" @cancel="cancels">
    <a-form label-position="top">
      <a-tabs tab-position="left">
        <a-tab-pane v-for="group in permissionData.groups" :key="group.name" :tab="group.displayName">
          <a-form-item :label="group.displayName">
            <a-tree ref="permissionTree" :tree-data="
                                transformPermissionTree(group.permissions)
                            " v-model:replaceFields="treeDefaultProps" v-model:checkedKeys="checkedKeys" checkable defaultExpandAll />
          </a-form-item>
        </a-tab-pane>

        <!-- <a-tab-pane v-for="group in permissionData.groups" :key="group.name" :tab="group.displayName">
          <a-form-item :label="group.displayName">
            <a-tree ref="permissionTree" :tree-data="
                                transformPermissionTree(group.permissions)
                            " :replace-fields="treeDefaultProps" :checked-keys="checkedKeys" checkable check-strictly default-expand-all
              @check="onCheck" />
          </a-form-item>
        </a-tab-pane> -->
      </a-tabs>
    </a-form>
    <template #footer>
      <a-button key="back" @click="cancels">取消</a-button>
      <a-button key="submit" type="primary" :loading="loading" @click="updatePermissionData()">保存</a-button>
    </template>

  </a-modal>
</template>

<script lang='ts'>
import { reactive, onMounted, toRefs, onBeforeMount } from "vue";
import { certification } from "@/utils/api";
export default {
  name: "permissionDialog",
  components: {},
  props: {
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
    diaVisible: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, ctx) {
    // console.log("999", props.providerName);

    const pageData = reactive({
      activeKey: "role",
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

    pageData.permissionsQuery.providerName = props.providerName as string;
    const onCheck = (checkedKeys) => {
      console.log("9999", onCheck);
      pageData.checkedKeys = checkedKeys.checked || [];
    };

    const getPermission = () => {
      let query = {
        providerKey: "admin",
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
    function handleUpdatePermission(row: any) {
      if (pageData.permissionsQuery.providerName === "R") {
        pageData.permissionsQuery.providerKey = row.name;
      } else if (pageData.permissionsQuery.providerName === "U") {
        pageData.permissionsQuery.providerKey = row.id;
      }

      certification.Permissions.getPermissions(pageData.permissionsQuery)
        .then((res) => {
          const keys: any = [];
          for (let i in res.groups) {
            const group: any = res.groups[i];
            console.log("group", group);

            for (let j in group.permissions) {
              if (group.permissions[j].isGranted) {
                keys.push(group.permissions[j].name);
              }
            }
          }
          setTimeout(() => {
            pageData.checkedKeys = keys;
          }, 200);
        })
        .catch((error) => {
          console.log(error);
        });
    }

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

    const cancels = () => {
      ctx.emit("closes");
      pageData.checkedKeys.length = 0;
    };

    function updatePermissionData() {
      console.log("pageData", pageData.checkedKeys);

      const tempData: any = [];
      let permissionDatas = pageData.permissionData as any;
      for (const i in permissionDatas.groups) {
        const keys = pageData.checkedKeys;
        console.log("keys", keys);
        const group = permissionDatas.groups[i];
        console.log("group", group);
        for (const j in group.permissions) {
          if (
            group.permissions[j].isGranted &&
            !keys.some((v: any) => v === group.permissions[j].name)
          ) {
            tempData.push({
              isGranted: false,
              name: group.permissions[j].name,
            });
          } else if (
            !group.permissions[j].isGranted &&
            keys.some((v: any) => v === group.permissions[j].name)
          ) {
            tempData.push({
              isGranted: true,
              name: group.permissions[j].name,
            });
          }
        }
      }

      console.log("permissionsQuery", tempData);

      // certification.Permissions.updataPermissions(pageData.permissionsQuery, {
      //   permissions: tempData,
      // })
      //   .then((res) => {
      //     // pageData.dialogPermissionFormVisible = false;
      //     console.log(
      //       "permissionsQuery.providerKey,",
      //       pageData.permissionsQuery.providerKey
      //     );
      //     console.log(
      //       "permissionsQuery.providerName,",
      //       pageData.permissionsQuery.providerName
      //     );
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
    }

    onBeforeMount(() => {
      getPermission();
    });
    return {
      changeTabs,
      ...toRefs(pageData),
      onCheck,
      getPermission,
      isGrantedByOtherProviderName,
      transformPermissionTree,
      updatePermissionData,
      cancels,
      handleUpdatePermission,
    };
  },
};
</script>

