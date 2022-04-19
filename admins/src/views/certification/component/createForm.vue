<template>
  <div class="createForm">

    <a-form ref="roleForm" :model="createRoleform" :rules="rules">
      <a-form-item class="formItems" ref="names" name="name">
        <span slot="label">*name</span>
        <a-input v-model="createRoleform.name" placeholder="请输入渠道名称" />
      </a-form-item>

      <a-form-item>
        <a-checkbox v-model="createRoleform.isDefault">
          <!-- 默认 -->
          默认
        </a-checkbox>
      </a-form-item>
      <a-form-item>
        <a-checkbox v-model="createRoleform.isPublic">
          <!-- 公开 -->
          公开
        </a-checkbox>
      </a-form-item>
    </a-form>

  </div>
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
  setup() {
    const roleForm = ref();
    const store = useStore();
    const pagedata = reactive({
      formData: {},
      createRoleform: {},
      rules: {
        name: {
          required: true,
          message: "Please input name",
        },
      },
    });
    onMounted(() => {
      console.log("99999999", pagedata.formData);

      if (pagedata.formData) {
        pagedata.createRoleform = { ...store.state.editClick };
      }
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
