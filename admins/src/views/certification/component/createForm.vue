<template>
  <a-form class="createForm" ref="roleForm" :model="createRoleform" :rules="rules">
    <a-form-item class="formItems" ref="names" name="name">
      <template #label>name</template>
      <a-input v-model:value="createRoleform.name" placeholder="请输入渠道名称" />
    </a-form-item>

    <a-form-item>
      <a-checkbox v-model:checked="createRoleform.isDefault">
        <!-- 默认 -->
        默认
      </a-checkbox>
    </a-form-item>
    <a-form-item>
      <a-checkbox v-model:checked="createRoleform.isPublic">
        <!-- 公开 -->
        公开
      </a-checkbox>
    </a-form-item>
  </a-form>

</template>
<script lang='ts'>
import { reactive, onMounted, toRefs, ref } from "vue";
import { certification } from "@/utils/api";
import { useStore } from "vuex";

export default {
  name: "createForm",
  components: {},
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
    formData: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  setup(props) {
    const roleForm = ref();
    const store = useStore();
    const pagedata = reactive({
      formDatas: {},
      createRoleform: {},
      rules: {
        name: {
          required: true,
          message: "Please input name",
        },
      },
    });
    if (props.isEdit) {
      pagedata.createRoleform = {};
    } else {
      pagedata.createRoleform = { ...store.state.editClick };
    }

    onMounted(() => {
      // console.log("99999999", pagedata.formData);
      // console.log("isEdit", props.formData);
      // if (pagedata.formDatas) {
      // }
    });

    return {
      ...toRefs(pagedata),
      roleForm,
    };
  },
};
</script>

<style scoped lang="scss">
.createForm {
  width: 100%;
  min-height: 180px;
  .formItems {
    // flex-direction: column !important;
    // // justify-content: space-around;
    // align-items: flex-start;
  }
}
</style>
