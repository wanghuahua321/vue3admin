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
        <div class="reports_lis_all" v-for="items in fencesData.data" :key="items.appid" @click="showReports(items,inx)">
          <div class="reports_tree">
            <div class="lt_icons">
              <svg-icon iconName="wenjianjia" />
              <span class="span_lable">{{items.display_name}}</span>
            </div>
            <div class="rt_handle">
              <span class="span_nums">{{items.channel_credentials.length}}条</span>
            </div>
          </div>

          <folder v-if="items.showChildren" :floderList="items.channel_credentials"></folder>
        </div>
      </div>

    </div>
    <div class="chatMsg">
      <content></content>
    </div>
    <div class="msgPage">
      <!-- <msgPagecon></msgPagecon> -->
    </div>

  </div>
</template>

<script lang='ts'>
import { reactive, onMounted, toRefs } from "vue";
import { DownloadOutlined } from "@ant-design/icons-vue";
import { Message } from "@/utils/api";
import folder from "./component/leftsidebar/folder.vue";
import msgPagecon from "./component/magPerson.vue";
import { baseUrl } from "@/utils/baseurl";
import content from "./component/contents/content.vue";
// import { useWebSocket } from "../../hookes";

export default {
  name: "chatIndex",
  components: {
    DownloadOutlined,
    folder,
    msgPagecon,
    content,
  },
  setup() {
    const pagesDatas = reactive<any>({
      selectinx: 0,
      value1: "value1",
      value2: "value2",
      value3: "value3",
      value4: "value4",
      fencesData: {
        data: [
          {
            appid: "01FXRNXY02TEX69Z81KJP5NKXE",
            display_name: "facebook",
            channel_credentials: [
              {
                channel: "MESSENGER",
                status: "ACTIVE",
                contactId: "01FXRNXY02TEX69Z81KJP5NKXE-MESSENGER",
                contacts: [
                  {
                    lastMessage: {
                      message_Id: "01FZFNJ9WJS92SGMD24YZ1SHHW",
                      messageType: "TextMessage",
                      contact_Id: "01FXRQPFYFM66SB57D3WDG26WV",
                      isRead: false,
                      message: {
                        text: "0",
                        lastMessageDateStr: "2022/03/31",
                      },
                    },
                    id: "01FXRQPFYFM66SB57D3WDG26WV",
                    identity: "4976064819145825",
                    language: "UNSPECIFIED",
                    display_name: "Unknown",
                    email: "",
                    channel_priority: ["MESSENGER"],
                  },
                  {
                    lastMessage: {
                      message_Id: "01FYNSN000224E5V7B9GEJMMA8",
                      messageType: "TextMessage",
                      contact_Id: "01FYNSN02RGTW6ETXZBMSYJQRX",
                      isRead: false,
                      message: {
                        text: "Youtube： #直播在线人数、#视频观看次数、#订阅、#点赞、#评论、#分享、#账号 Facebook ：#直播在线人数、#专页赞、#主页关注、#群组、#帖子赞、#帖子分享、#评论、#视频观看、#帖子展示量 Instagram ：#粉丝关注、#帖子赞、#视频观看、#评论 Twitter ：#关注者、#转推、#点赞、#评论数 、#展示量、#互动量 Tik Tok：#粉丝、#视频赞、#分享、#观看数 Shopee:#直播在线人数 微信：fensi777999",
                        lastMessageDateStr: "2022/03/21",
                      },
                    },
                    id: "01FYNSN02RGTW6ETXZBMSYJQRX",
                    identity: "7649590338399271",
                    language: "UNSPECIFIED",
                    display_name: "Cheung Cheung",
                    email: "",
                    channel_priority: ["MESSENGER"],
                  },
                  {
                    lastMessage: {
                      message_Id: "01FYQR7YTAPQ0RB19SH4RS098B",
                      messageType: "TextMessage",
                      contact_Id: "01FYQR7YX49FGRMSKXYWYW9SSH",
                      isRead: false,
                      message: {
                        text: "11",
                        lastMessageDateStr: "2022/03/22",
                      },
                    },
                    id: "01FYQR7YX49FGRMSKXYWYW9SSH",
                    identity: "7177029705702467",
                    language: "UNSPECIFIED",
                    display_name: "Xins Misw",
                    email: "",
                    channel_priority: ["MESSENGER"],
                  },
                ],
              },
            ],
          },
          {
            appid: "01FY8B36YY87YG9R95RWRK07M1",
            display_name: "lilifacebook",
            channel_credentials: [
              {
                channel: "MESSENGER",
                status: "ACTIVE",
                contactId: "01FY8B36YY87YG9R95RWRK07M1-MESSENGER",
                contacts: [
                  {
                    lastMessage: {
                      message_Id: "01FYZJX6WQKPB3NB7N4BD9HVSK",
                      messageType: "MediaMessage",
                      contact_Id: "01FY8BHDMXD8AE0WEF0AHXXPD3",
                      isRead: false,
                      message: {
                        lastMessageDateStr: "2022/03/25",
                        url: "https://scontent.xx.fbcdn.net/v/t1.15752-9/274738849_380559813605539_4369330687459145_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=58c789&_nc_ohc=jPvzd70iLwQAX90ewtV&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AVLvG6XARpzBQIl2vP4aqOwzF12WSJ0L10zUGFt63jbqJA&oe=6260E352",
                        thumbnail_url: "",
                      },
                    },
                    id: "01FY8BHDMXD8AE0WEF0AHXXPD3",
                    identity: "5410815092263838",
                    language: "UNSPECIFIED",
                    display_name: "张丽",
                    email: "",
                    channel_priority: ["MESSENGER"],
                  },
                  {
                    lastMessage: {
                      message_Id: "01FYQRTR9S9RBNQ5R8MC1FKGX8",
                      messageType: "TextMessage",
                      contact_Id: "01FYQRA8FBR834J68YREV90HKB",
                      isRead: false,
                      message: {
                        text: "123",
                        lastMessageDateStr: "2022/03/22",
                      },
                    },
                    id: "01FYQRA8FBR834J68YREV90HKB",
                    identity: "5057183960971576",
                    language: "UNSPECIFIED",
                    display_name: "Xins Misw",
                    email: "",
                    channel_priority: ["MESSENGER"],
                  },
                ],
              },
            ],
          },
        ],
        isSuccess: true,
        errorCode: null,
        message: "",
      },
    });
    const fences = (item) => {
      pagesDatas.selectinx = item;
    };
    // const ws = useWebSocket(handleMessage);
    const contactsLeft = () => {
      Message.contacts().then((res) => {
        console.log(res);
      });
    };

    const showReports = (items, inx) => {
      if (!items.showChildren) {
        if (items.channel_credentials) {
          items.channel_credentials.forEach((ele) => {
            ele.showChildren = false;
          });
        }
      }
      items.showChildren = !items.showChildren;
      // console.log("items55", items);
    };

    function handleMessage() {
      console.log("123445555555555");
    }

    onMounted(() => {
      contactsLeft();
      // let ws = new WebSocket(
      //   "ws://192.168.0.115:6800/Chat?contactId=01FXRNXY02TEX69Z81KJP5NKXE-MESSENGER&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJJc0F2YWlsYWJsZSI6ZmFsc2UsIklkIjpudWxsLCJOYW1lIjpudWxsLCJUb2tlblRpbWUiOiIyMDIyLTAzLTI4VDE0OjA3OjI0Ljc4NzY4NjYrMDg6MDAiLCJleHAiOjE2Nzk5ODM2NDUuMH0.CK5nNzeeM__JJc6y7xaruIRkwHnCS9dX5EZOAPZWm88"
      // );
      // console.log("ws", ws);

      // ws.onopen = function () {
      //   console.log("ws onopen");
      //   let huas = {
      //     fromContactId: "01FXRNXY02TEX69Z81KJP5NKXE-MESSENGER",
      //     toContactIdList: ["01FY8B36YY87YG9R95RWRK0111-MESSENGER"],
      //     content: "from456to123",
      //   };
      //   ws.send(JSON.stringify(huas));
      // };
      // ws.onmessage = function (e) {
      //   console.log("ws onmessage");
      //   console.log("from server: " + e.data);
      // };

      // let ws2 = new WebSocket(
      //   "ws://192.168.0.115:6800/Chat?contactId=01FY8B36YY87YG9R95RWRK0111-MESSENGER&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJJc0F2YWlsYWJsZSI6ZmFsc2UsIklkIjpudWxsLCJOYW1lIjpudWxsLCJUb2tlblRpbWUiOiIyMDIyLTAzLTI4VDE0OjA3OjI0Ljc4NzY4NjYrMDg6MDAiLCJleHAiOjE2Nzk5ODM2NDUuMH0.CK5nNzeeM__JJc6y7xaruIRkwHnCS9dX5EZOAPZWm88"
      // );

      // ws2.onopen = function () {
      //   console.log("ws2 onopen");
      //   let huas = {
      //     fromContactId: "01FXRNXY02TEX69Z81KJP5NKXE-MESSENGER",
      //     toContactIdList: ["01FY8B36YY87YG9R95RWRK0111-MESSENGER"],
      //     content: "from456to123",
      //   };
      //   ws.send(JSON.stringify(huas));
      // };
      // ws2.onmessage = function (e) {
      //   console.log("ws onmessage");
      //   console.log("from server: " + e.data);
      // };
      pagesDatas.fencesData.data.map((res) => {
        res.showChildren = false;
        if (res.channel_credentials && res.channel_credentials.length > 0) {
          res.channel_credentials.map((channel) => {
            channel.showChildren = false;
          });
        }
      });
    });
    return {
      ...toRefs(pagesDatas),
      fences,
      contactsLeft,
      showReports,
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
    height: 60px;
    align-items: center;
    border-bottom: 1px solid #eceef5;
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
    // border: 1px solid;
    margin: 0px 3%;
    background: #fff;
  }
  .msgPage {
    flex: 1;
    background: #fff;
  }
}
</style>
