<template>
  <div class="msgPagecon">
    <div class="pageInfo">
      <div class="pageimg"></div>
      <b>宰妍琬</b>
      <a-button type="primary" :size="size" style="width:78%">
        <template #icon>
          <DownloadOutlined />
        </template>
      </a-button>
    </div>
    <span class="small_tit">备注</span>
    <div class="note">
      <a-textarea readOnly v-model:value="value1" placeholder="Basic usage" :rows="3" />
    </div>
    <span class="small_tit">会员信息</span>
    <dl>
      <dt>姓名</dt>
      <dd>
        <a-input readOnly placeholder="请选择随访人员" />
      </dd>
    </dl>
    <span class="small_tit">社交信息</span>
    <dl>
      <dt>微博</dt>
      <dd>
        <a-input readOnly v-model:value="value2" placeholder="Basic usage" />
      </dd>
    </dl>
    <span class="small_tit">购买信息</span>
    <dl>
      <dt>累计消费</dt>
      <dd>
        <a-input readOnly v-model:value="value3" placeholder="Basic usage" />
      </dd>
    </dl>
  </div>
</template>

<script lang='ts'>
import { reactive, onMounted, toRefs } from "vue";
export default {
  name: "msgPagecon",
  components: {},
  setup() {
    onMounted(() => {});
    return {};
  },
};
</script>

<style scoped lang="scss">
.msgPagecon {
  width: 100%;
  box-sizing: border-box;
  padding: 0px 4%;
}
.small_tit {
  font-size: 12px;
  color: $elementMine;
  font-weight: 600;
  padding: 8px 0px;
}
dl {
  display: flex;
  align-items: center;
  justify-content: space-around;
  dt {
    color: $cFontcolor;
  }
  dd {
    color: $mFontcolor;
    :deep(.ant-input) {
      border: 0px solid !important;
      box-shadow: 0 0 0 0px !important;
    }
    :deep(.textarea.ant-input) {
      border: 0px solid !important;
      box-shadow: 0 0 0 0px !important;
    }
  }
}

.pageInfo {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 24px 0px;
  .pageimg {
    width: 64px;
    height: 64px;
    border-radius: 12px;
    border: 1px solid;
  }
  b {
    font-size: 16px;
    color: $cFontcolor;
    font-weight: 600;
    margin: 12px 0px;
  }
}
</style>
