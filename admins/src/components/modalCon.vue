<template>
  <div>
    <a-modal title="Title" :visible="showDialogue" @cancel="onCancel" @ok="handleOk">
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
    showDialogue: {
      type: Boolean,
      require: true,
    },
  },
  components: {},
  setup(props, ctx) {
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
    const onCancel = () => {
      ctx.emit("closeDia", false);
    };
    return {
      ...toRefs(pagedata),
      handleOk,
      onCancel,
    };
  },
};
</script>

<style scoped lang="scss">
</style>
