<template>
  <div class="modals" ref="mod">
    <a-modal :title="titles" :getContainer='()=>$refs.mod' :visible="showDialogue" @cancel="onCancel" @ok="handleOk">
      <slot name="modalCon"></slot>
    </a-modal>

  </div>
</template>

<script lang='ts'>
import { reactive, onMounted, toRefs } from "vue";
export default {
  name: "modalCon",
  props: {
    showDialogue: {
      type: Boolean,
      require: true,
    },
    titles: {
      type: String,
      default: "添加Fancebook Messager",
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

  :deep(.ant-modal-body) {
    padding: 14px 24px 14px 24px;
    font-size: 14px;
    line-height: 1.5715;
    word-wrap: break-word;
    background-color: #f8f9fb;
  }
  :deep(.ant-modal-header) {
    border-bottom: 0px solid #f0f0f0;
    background-color: #f8f9fb;
  }
  :deep(.ant-modal-footer) {
    border-top: 0px solid #f0f0f0;
    background-color: #f8f9fb;
  }
  :deep(.ant-modal-title) {
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.9);
    line-height: 24px;
    font-weight: 600;
  }
}
</style>
