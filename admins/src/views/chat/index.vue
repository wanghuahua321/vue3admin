<template>
  <router-view>
    <div class="message">
      <div class="fence">
        <div :class="selectinx==inx?'fence_item selected':'fence_item' " v-for="(item,inx) in fencesData.items" :key="inx" @click="fences(inx,item)">
          <div class="fence_img">
            <img src="../../assets/images/person.png" />
          </div>
          <div class="fence_info">
            <div class="chatname">
              <b>{{item.display_name}}</b>
              <p>{{item.lastMessage? item.lastMessage.receviedDate :'--'}}</p>
            </div>
            <div class="chatMsg">
              <p>{{item.lastMessage? item.lastMessage.message:'--'}}</p>
            </div>
          </div>
          <b class="unread">4</b>
        </div>

        <!-- <div class="reports_li">
          <div class="reports_lis_all" v-for="(items,inx) in fencesData.data" :key="items.appid" @click="showReports(items,inx)">
            <div class="reports_tree">
              <div class="lt_icons">
                <svg-icon iconName="wenjianjia" />
                <span class="span_lable">{{items.display_name}}</span>
              </div>
              <div class="rt_handle">
                <DownOutlined />
              </div>
            </div>

            <folder v-if="items.showChildren" :floderList="items.channel_credentials"></folder>
          </div>
        </div> -->

      </div>
      <div class="chatMsg">
        <contents :chatData="chatData" :selectinx="selectinx" @doneSent="doneSent"></contents>
      </div>
      <div class="msgPage">
        <!-- <msgPagecon></msgPagecon> -->
      </div>

    </div>
  </router-view>
</template>

<script lang='ts'>
import { reactive, onMounted, toRefs, watch, provide } from "vue";
import { DownloadOutlined, DownOutlined } from "@ant-design/icons-vue";
import { Message } from "@/utils/api";
import folder from "./component/leftsidebar/folder.vue";
import msgPagecon from "./component/magPerson.vue";
import contents from "./component/contents/content.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "chatIndex",
  components: {
    DownloadOutlined,
    DownOutlined,
    folder,
    msgPagecon,
    contents,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const pagesDatas = reactive<any>({
      selectinx: 0,
      value1: "value1",
      value2: "value2",
      value3: "value3",
      value4: "value4",
      fencesData: {}, //左侧数据
      chatData: {},
    });

    const fences = (inx, item) => {
      pagesDatas.selectinx = inx;
      pagesDatas.chatData = item;

      router.push({
        name: "chatinx",
        params: { type: item.id },
      });
    };
    const contactsLeft = () => {
      Message.contacts().then((res) => {
        pagesDatas.fencesData = res;
      });
    };

    const doneSent = () => {
      contactsLeft();
    };

    onMounted(() => {
      contactsLeft();
      // fences(pagesDatas.selectinx, pagesDatas.fencesData[pagesDatas.selectinx]);
    });
    return {
      ...toRefs(pagesDatas),
      fences,
      contactsLeft,
      doneSent,
    };
  },
};
</script>

<style scoped lang="scss">
.reports_li {
  position: relative;
  width: 100%;

  // display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  .reports_lis_all {
    width: 100%;
  }
  .reports_tree {
    display: flex;
    width: 100%;
    height: 48px;
    align-items: center;
    box-sizing: border-box;
    padding: 0px 7%;
    // border-bottom: 1px solid #eceef5;
    // justify-content: space-between;
    &:hover {
      background: $hoverMine;
    }
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
  width: 100%;
  .fence {
    // flex: 1;
    width: 24%;
    background: #fff;
    .fence_img {
      width: 14%;
      height: 36px;
      img {
        width: 100%;
      }
    }

    .fence_item {
      display: flex;
      width: 100%;
      height: 60px;
      align-items: center;
      box-sizing: border-box;
      padding: 0px 9%;
      // &:hover {
      //   background: $hoverMine;
      // }
      cursor: pointer;
      position: relative;
      .fence_info {
        padding-left: 8px;
        width: 90%;
        // display: flex;
        // flex-direction: column;
        // justify-content: center;
        // align-content: center;
        .chatname {
          display: flex;
          width: 100%;
          justify-content: space-between;
          p {
            color: #999999;
          }
        }
        .chatMsg {
          width: 100%;
          p {
            color: #999999;
            width: 96%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }
      .unread {
        width: 18px;
        height: 18px;
        background: #ff605d;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        position: absolute;
        top: 0px;
        left: 15.6%;
      }
    }

    .selected {
      position: relative;
      background: #e7e7e7 !important;
      &::before {
        content: "";
        width: 5px;
        height: 60px;
        transform: scaleX(-1);
        background: #ff6b48;
        border-radius: 2px;
        position: absolute;
        left: -5px;
        top: -1px;
      }
    }
  }
  .chatMsg {
    // flex: 2;
    width: 47%;
  }
  .msgPage {
    // flex: 1;
    width: 23%;
    background: #fff;
  }
}
</style>
