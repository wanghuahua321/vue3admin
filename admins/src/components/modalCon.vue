<template>
  <div class="modals">
    <a-modal title="添加Fancebook Messager" :visible="showDialogue" @cancel="onCancel" @ok="handleOk">
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
      ctx.emit("confimAdd", false);
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
.modals {
  :deep(.ant-modal .ant-modal-content) {
    background-color: #f8f9fb !important;
  }

  :deep(.ant-modal-title) {
  }
}
</style>
