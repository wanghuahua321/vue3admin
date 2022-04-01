<template>
  <div class="message">
    <div class="fence">
      <!-- <div :class="selectinx==inx?'fence_item selected':'fence_item' " v-for="(items,inx) in 5" :key="inx" @click="fences(inx)">
        <div>tupian</div>
        <div class="fence_info">
          <p>Derrick Schmidt</p>
          <span>2022/02/01</span>
        </div>
        <b class="unread">4</b>
      </div> -->

      <div class="reports_li">
        <div class="reports_lis_all">
          <div class="reports_tree">
            <div class="lt_icons">
              <svg-icon iconName="wenjianjia" />
              <span class="span_lable">123</span>
            </div>
            <div class="rt_handle">
              <span class="span_nums">4个</span>
            </div>
          </div>
          <files></files>
          <!-- <grouplist v-if="items.showChildren" :grouplistData="items.children" :typesVal='types'></grouplist> -->
        </div>
      </div>

    </div>
    <div class="chatMsg">
      聊天
    </div>
    <div class="msgPage">
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

    </div>

  </div>
</template>

<script lang='ts'>
import { reactive, onMounted, toRefs } from "vue";
import { DownloadOutlined } from "@ant-design/icons-vue";
import { Message } from "@/utils/api";
import files from "./component/files.vue";

export default {
  name: "chatIndex",
  components: {
    DownloadOutlined,
    files,
  },
  setup() {
    const pagesDatas = reactive<any>({
      selectinx: 0,
      value1: "value1",
      value2: "value2",
      value3: "value3",
      value4: "value4",
    });
    const fences = (item) => {
      pagesDatas.selectinx = item;
    };

    const contactsLeft = () => {
      Message.contacts().then((res) => {
        console.log(res);
      });
    };
    onMounted(() => {
      contactsLeft();
    });
    return {
      ...toRefs(pagesDatas),
      fences,
      contactsLeft,
    };
  },
};
</script>

<style scoped lang="scss">
.reports_li {
  position: relative;
  width: 100%;
  box-sizing: border-box;
  padding: 0px 7%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #eceef5;
  cursor: pointer;
  .reports_lis_all {
    width: 100%;
  }
  .reports_tree {
    display: flex;
    width: 100%;
    height: 60px;
    align-items: center;
    // justify-content: space-between;
    .lt_icons {
      display: flex;
      align-items: center;
    }
    .span_lable {
      padding-left: 0.24rem;
      font-size: 14px;
      color: #2a2a2a;
      font-weight: 600;
    }
    .rt_handle {
      font-size: 14px;
      position: absolute;
      right: 7%;
      color: #8f8f8f;
      .checkRido {
        padding-left: 0.32rem;
      }
    }
    .rt_h_active {
      right: 0.52rem !important;
    }
  }
}
.message {
  margin-top: 12px;
  display: flex;
  // min-height: 616px;
  height: 100%;
  .fence {
    flex: 1;
    background: #fff;

    .fence_item {
      width: 100%;
      box-sizing: border-box;
      padding: 0px 7%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid #eceef5;
      height: 60px;
      cursor: pointer;

      .fence_info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
        p {
          font-size: 14px;
          margin-bottom: 0em;
        }
        span {
          font-size: 12px;
        }
      }
      .unread {
        width: 24px;
        height: 24px;
        background: #ff605d;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
      }
    }

    .selected {
      position: relative;
      background: #f8f9fb !important;
      &::before {
        content: "";
        width: 5px;
        height: 60px;
        transform: scaleX(-1);
        background: #ff6b48;
        border-radius: 2px;
        position: absolute;
        left: -5px;
        top: 0px;
      }
    }
  }
  .chatMsg {
    flex: 2;
    border: 1px solid;
    margin: 0px 3%;
    background: #fff;
  }
  .msgPage {
    flex: 1;
    background: #fff;
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
  }
}
</style>
