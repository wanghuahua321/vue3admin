<template>
  <div class="createForm">
    Look how they shine for you
    <!-- {{$store.state.editClick}} -->
    <a-form-model ref="roleForm" :model="createRoleform" :rules="rules">
      <a-form-model-item ref="name" label="RoleName" prop="name">
        <a-input v-model="createRoleform.name" />
      </a-form-model-item>
      <a-form-model-item>
        <a-checkbox v-model="createRoleform.isDefault">
          <!-- 默认 -->
          1
        </a-checkbox>
      </a-form-model-item>
      <a-form-model-item>
        <a-checkbox v-model="createRoleform.isPublic">
          <!-- 公开 -->
          1
        </a-checkbox>
      </a-form-model-item>
    </a-form-model>

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
        name: [
          {
            required: true,
            message: "请先填写",
            trigger: ["blur", "change"],
          },
        ],
      },
    });
    onMounted(() => {
      // console.log("99999999", store.state.editClick);

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
</style>
