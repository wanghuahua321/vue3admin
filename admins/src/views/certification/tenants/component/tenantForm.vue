<template>

  <a-form class="createForm" ref="roleForm" :model="createRoleform" :rules="rules">
    <a-form-item class="formItems" label="租户名称" ref="names" name="name">
      <a-input v-model:value="createRoleform.name" placeholder="请输入租户名称" />
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
      pagedata.createRoleform = { ...store.state.editClick };
    } else {
      pagedata.createRoleform = {};
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
