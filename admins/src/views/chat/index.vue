<template>
  <router-view>
    <div class="message">
      <div class="fence">
        <div :class="selectinx==inx?'fence_item selected':'fence_item' " v-for="(item,inx) in fencesData.items" :key="inx" @click="fences(inx,item)">
          <div class="fence_img">
            <!-- fix -->
            <img :src="item.phoneurl" />
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
          <!-- <b class="unread">4</b> -->
        </div>

      </div>
      <div class="chatMsg">
        <contents :chatData="chatData" :selectinx="selectinx" @doneSent="doneSent"></contents>
      </div>
      <div class="msgPage">
        <msgPagecon></msgPagecon>
      </div>

    </div>
  </router-view>
</template>

<script lang='ts'>
import { reactive, onMounted, toRefs, watch, provide } from "vue";
import { DownOutlined } from "@ant-design/icons-vue";
import { Message } from "@/utils/api";
import msgPagecon from "./component/magPerson.vue";
import contents from "./component/contents/content.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "chatIndex",
  components: {
    msgPagecon,
    contents,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const pagesDatas = reactive<any>({
      selectinx:
        sessionStorage.getItem("initSelectinx") == null
          ? 0
          : Number(sessionStorage.getItem("initSelectinx")),

      fencesData: {}, //左侧数据
      chatData: {},
      isChang: false,
    });

    watch(
      () => store.state.randDoms,
      (newsvalue, oldvalues) => {
        pagesDatas.fencesData.items[pagesDatas.selectinx].lastMessage =
          store.state.wsdata;
      }
    );

    const fences = (inx, item, isexit?) => {
      if (isexit) {
        pagesDatas.isChang = true;
        let ids = pagesDatas.fencesData.items.findIndex((value) => {
          return value.id == item.id;
        });
        pagesDatas.fencesData.items.splice(ids, 1);
        pagesDatas.fencesData.items.unshift(item);

        pagesDatas.selectinx = 0;
        console.log(
          "pagesDatas.fencesData+++++88888",
          pagesDatas.fencesData.items[pagesDatas.selectinx]
        );
      } else {
        pagesDatas.selectinx = inx;
        pagesDatas.isChang = false;
      }
      pagesDatas.chatData = item;
      sessionStorage.setItem("initSelectinx", inx);
      router.push({
        name: "chatinx",
        params: { type: item.id },
      });
      store.commit("setChatPerson", item);
    };
    const contactsLeft = async () => {
      await Message.contacts().then((res) => {
        if (!pagesDatas.isChang) {
          pagesDatas.fencesData = res;
          fences(
            pagesDatas.selectinx,
            pagesDatas.fencesData.items[pagesDatas.selectinx]
          );
        }

        router.push({
          name: "chatinx",
          params: {
            type: pagesDatas.fencesData.items[pagesDatas.selectinx].id,
          },
        });
        store.commit(
          "setChatPerson",
          pagesDatas.fencesData.items[pagesDatas.selectinx]
        );
      });
    };

    const doneSent = () => {
      contactsLeft();
      fences(0, pagesDatas.chatData, "types");
    };

    onMounted(() => {
      contactsLeft();
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
      // padding-left: 0.24rem;
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
  justify-content: space-between;
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
      &:hover {
        background: #e7e7e7;
      }
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
          height: 100%;
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
