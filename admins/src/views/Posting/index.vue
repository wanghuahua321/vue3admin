<template>
  <!-- 发帖相关 -->
  <div class="Posting">
    <div class="Posting_tit">
      <div class="p_tit_tabs">
        <span>12</span>
        <span>23</span>

      </div>

      <a-button type="primary" shape="round" :size="size">
        <template #icon>
          <DownloadOutlined />
          Download
        </template>
      </a-button>

    </div>

    <div class="post_con">

    </div>

  </div>
</template>

<script lang='ts'>
import { reactive, onMounted, toRefs } from "vue";
export default {
  name: "posTing",
  components: {},
  setup() {
    onMounted(() => {});
    return {};
  },
};
</script>

<style scoped lang="scss">
.Posting {
  width: 100%;
  height: 100%;
  border: 1px solid;
  .Posting_tit {
    .p_tit_tabs {
    }
  }
}
</style>
