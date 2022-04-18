<template>
  <a-modal title="111" v-model:visible="dialogPermissionFormVisible" :maskClosable="false" @cancel="dialogPermissionFormVisible = false">
    <a-form label-position="top">
      <a-tabs tab-position="left">
        <a-tab-pane v-for="group in permissionData.groups" :key="group.name" :tab="group.displayName">
          <a-form-item :label="group.displayName">
            <a-tree ref="permissionTree" :tree-data="
                                transformPermissionTree(group.permissions)
                            " :replace-fields="treeDefaultProps" :checked-keys="checkedKeys" checkable check-strictly default-expand-all
              @check="onCheck" />
          </a-form-item>
        </a-tab-pane>
      </a-tabs>
    </a-form>
    <div slot="footer" class="dialog-footer">
      <a-button @click="dialogPermissionFormVisible = false">
        {{ $t("AbpIdentity['Cancel']") }}
      </a-button>
      <a-button type="primary" @click="updatePermissionData()">
        {{ $t("AbpIdentity['Save']") }}
      </a-button>
    </div>
  </a-modal>
</template>

<script lang='ts'>
import { reactive, onMounted, toRefs } from "vue";
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
  },
  setup(props, ctx) {
    const pageData = reactive({
      activeKey: "role",
    });
    const changeTabs = (val) => {
      pageData.activeKey = val.key;
      ctx.emit("choseTab", val);
    };

    onMounted(() => {});
    return {
      changeTabs,
      ...toRefs(pageData),
    };
  },
};
</script>

