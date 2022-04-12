<template>
  <div>
    <a-modal title="Title" v-model:visible="visible" :confirm-loading="confirmLoading" @ok="handleOk">
      <slot name="modalCon"></slot>
    </a-modal>

  </div>
</template>

<script lang='ts'>
import { reactive, onMounted, toRefs } from "vue";
import { tuple } from "ant-design-vue/lib/_util/type";
export default {
  name: "modalCon",
  props: {
    visible: {
      type: Boolean,
      default: true,
      require: true,
    },
  },
  components: {},
  setup() {
    const pagedata = reactive({
      // visible: true,
      confirmLoading: false,
    });
    onMounted(() => {});

    const handleOk = () => {
      pagedata.confirmLoading = true;
      setTimeout(() => {
        // pagedata.visible = false;
        pagedata.confirmLoading = false;
      }, 2000);
    };
    return {
      ...toRefs(pagedata),
      handleOk,
    };
  },
};
</script>

<style scoped lang="scss">
</style>
