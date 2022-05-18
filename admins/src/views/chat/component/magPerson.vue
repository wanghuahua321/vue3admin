<template>
  <div class="msgPagecon">
    <div class="pageInfo">
      <div class="pageimg">
        <!-- fix -->
        <a-image :src="user.phoneurl" />
      </div>
      <b>{{user.display_name}}</b>
      <a-button type="primary" style="width:78%">
        <template #icon>
          <!-- <DownloadOutlined /> -->
          浏览主页
        </template>
      </a-button>
    </div>
    <!-- <span class="small_tit">备注</span>
    <div class="note">
      <a-textarea readOnly placeholder="Basic usage" :rows="3" />
    </div> -->
    <span class="small_tit">会员信息</span>
    <dl>
      <dt>{{user.display_name}}</dt>
      <dd>
        <a-input readOnly placeholder="请选择随访人员" />
      </dd>
    </dl>
    <span class="small_tit">社交信息</span>
    <dl>
      <dt>微博</dt>
      <dd>
        <a-input readOnly placeholder="Basic usage" />
      </dd>
    </dl>
    <span class="small_tit">购买信息</span>
    <dl>
      <dt>累计消费</dt>
      <dd>
        <a-input readOnly placeholder="Basic usage" />
      </dd>
    </dl>
  </div>
</template>

<script lang='ts'>
import { computed, reactive, onMounted, toRefs, toRef } from "vue";
import { useStore } from "vuex";
export default {
  name: "msgPagecon",
  props: {
    msgPerson: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {},
  setup(props, ctx) {
    const store = useStore();
    const pageDatas = reactive({
      msgPagecons: {},
    });

    const user = computed(() => {
      return store.state.chatPerson || {};
    });

    onMounted(() => {});
    return {
      ...toRefs(pageDatas),
      user,
    };
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
  }
  b {
    font-size: 16px;
    color: $cFontcolor;
    font-weight: 600;
    margin: 12px 0px;
  }
}
</style>
