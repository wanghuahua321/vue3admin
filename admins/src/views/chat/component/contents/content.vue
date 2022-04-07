<template>
  <div class="content">
    <transition name="el-fade-in-linear" mode="out-in">
      <div class="content-message">
        <div class="message">
          <div class="message-header ellipse-1">
            <div class="name">{{displayName? displayName:'--'}}</div>
            <!-- <div class="icon-btn-box">
              jj
            </div> -->
          </div>
          <div class="message-group">
            <div class="message-group-box" ref="refScrollbar">

              <div class="message-container">
                <!-- class="message-wrap message-wrap_sender" -->
                <div class="senttimes">
                  09:30
                </div>
                <div :class="`message-wrap ${currentUser.isRight ? 'message-wrap_sender' : 'message-wrap_recipient'}`"
                  v-for="currentUser in chatRecord" :key="currentUser.message_Id">
                  <!-- <a-avatar class=" avatar width-50" :size="50" :src="1 === currentUser.id ? currentUser.avatar : friend.avatar" /> -->
                  <a-avatar :size="50">
                    <template #icon>
                      <UserOutlined />
                    </template>
                  </a-avatar>

                  <div class="message-box">
                    <div class="details">
                      <!-- <span class="nickname">{{1 === currentUser.id ? currentUser.nickname : friend.nickname}}</span> -->
                      <span class="nickname">20:9</span>

                      <span class="time">
                        {{currentUser.message?currentUser.message.lastMessageDateStr:'--'}}
                      </span>
                    </div>

                    <div class="content margin_t-10">
                      <span>{{currentUser.message}}</span>
                      <!-- <a-image v-if="data.type === 2" style="width: 100px; height: 100px" :src="data.url" :preview-src-list="[data.url]" /> -->
                      <!-- <div class="loading-icon-box" v-show="data.loading">
                          <el-icon class="loading-icon">
                            <loading />
                          </el-icon>
                        </div> -->
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
          <div class="message-input">
            <msginput @sents="sents" sentTime="20:9"></msginput>
          </div>
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
import { computed, ref, reactive, toRefs, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import { UserOutlined } from '@ant-design/icons-vue';
import { Message } from "@/utils/api"
import msginput from './msginput.vue'
// import { useWebSocket } from "../../../../hookes";
import routes from '@/router/routers';
import { useRouter, useRoute } from 'vue-router'
import { tuple } from 'ant-design-vue/lib/_util/type';
import router from '@/router';
import { Item } from 'ant-design-vue/lib/menu';


export default ({
  components: {
    // ContentMessage,
    msginput,
    UserOutlined
  },
  props: {
    selectinx: {
      type: Number,
    },
    chatData: {
      type: Object,
      default: () => ({})
    }
  },
  setup (props, ctx) {
    // const { chatData, selectinx } = toRefs(props)
    const store = useStore()
    const route = useRoute();
    const pageData = reactive({
      chatPerson: {}, //左侧的person 信息
      currentUser: {
        id: "1",
        avatar: require('../../../../assets/images/person.png'),
        nickname: "wanghuahu"
      },
      chatRecord: [],
      nextPageToken: "", //获取聊天记录第二页需要token
      contactId: "",
      chatDatas: {},
      displayName: ""
    });

    let wss = new WebSocket("ws://192.168.0.115:6800/Chat?contactId=01FXRNXY02TEX69Z81KJP5NKXE-MESSENGER");
    wss.onopen = ((res) => {
      console.log(res, "连接成功");
    })

    wss.onerror = ((res) => {
      console.log(res, '=====err');
    })

    wss.onmessage = ((res) => {
      console.log(res, "接受数据");

    })

    wss.onclose = function () {
      // 关闭 websocket
      console.log("连接已关闭...");
    };

    onMounted(() => {

      // this.ws.onmessage = (res => {
      //   let received_msg = JSON.parse(res.data);
      //   console.log("数据已接收...", received_msg);
      //   this.newsList = received_msg;
      // })

    })


    /*  获取聊天记录 */
    const getChatMsg = () => {
      pageData.chatRecord.length = 0;
      pageData.nextPageToken = ""
      let params = {
        page_token: "",
        pageSize: 20,
        contactId: pageData.contactId ? pageData.contactId : '',
      };
      Message.contactId(params).then((res) => {
        if (res.data && res.isSuccess) {
          pageData.chatRecord.push(...res.data.messageList)
          pageData.nextPageToken = res.data.nextPageToken;
          pageData.displayName = res.data.displayName
        }
      }).catch((error) => {
        console.log(error);
      });
    };

    watch(
      () => route.params,
      (newsvalue, oldvalues) => {
        pageData.contactId = newsvalue.type
        getChatMsg()
      }, {
      immediate: true
    }
    );

    function handleMessage (e) {
      console.log("接受", e);
      debugger
      // const _msgData = JSON.parse(e.data)
      // pageData.chatData.push(_msgData)

    }

    const sents = (data) => {
      let datas = {
        contact_id: pageData.contactId,
        messageType: "TextMessage",
        message: data,
      }

      Message.sentMessage(datas).then((res) => {
        let params = {
          message: data,
          isRead: true,
          isRight: true,// 发送方
        }
        let sentdata = { ...res.data, ...params }
        pageData.chatRecord.push(sentdata)
        // ws.send(data)
        /* 已经发送过消息，要刷新左边菜单栏 */
        ctx.emit("doneSent",)

      }).catch((error) => {
        console.log(error);
      });

    }

    // const user = computed(() => {
    //   return store.state.conversation.active || {}
    // })

    // const detailVisible = ref(false)

    // const detailHandle = () => {
    //   detailVisible.value = !detailVisible.value
    // }

    return {
      // user,
      // detailVisible,
      // detailHandle
      sents,
      ...toRefs(pageData),
      getChatMsg,

    }
  }
})
</script>

<style lang="scss" scoped>
@import "@/assets/css/_variable.scss";
.content {
  display: flex;
  background-color: #f5f5f5;
  height: 100%;
  // align-items: center;
  &-message {
    flex: 1;
  }
}

$height: 50px;

@mixin pseudo {
  content: "";
  position: absolute;
  top: 21px;
  height: 8px;
  width: 8px;
  border-top: 2px solid $darkColor-6;
  border-right: 2px solid $darkColor-6;
  cursor: pointer;
}
.content-message {
  width: 100%;
}
.message {
  display: flex;
  flex-flow: column;
  border-right: 1px solid $darkColor-7;
  overflow: hidden;
  height: 100%;
  &-header {
    position: relative;
    padding: 0 0 0 20px;
    height: 60px;
    border-bottom: 1px solid $darkColor-7;
    display: flex;
    line-height: 60px;
    .name {
      flex: 1;
      text-align: left;
      color: $darkColor-8;
      font-weight: bold;
    }
    .icon-btn-box {
      width: 30px;
      color: $darkColor-6;
      .iconfont {
        cursor: pointer;
        &:hover {
          color: $activeColor;
        }
      }
    }
  }
  &-group {
    flex: 1;
  }
  &-input {
    border-top: 1px solid $darkColor-7;
    height: 140px;
  }
}
.message-group {
  height: calc(100% - 190px);
  overflow: auto;

  &::-webkit-scrollbar {
    // 纵向滚动条和横向滚动条宽度
    width: 6px;
    height: 1px;
  }
  &::-webkit-scrollbar-thumb {
    // 滚动条背景条样式
    border-radius: 6px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: $elementMine;
  }
  &::-webkit-scrollbar-track {
    // 滚动条按钮样式
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 6px;
    background: $hoverMine;
  }
}

.message-group-box {
  padding: 0 20px;
  height: 352px;
}
.tips {
  font-size: 12px;
  color: $darkColor-6;
}
.senttimes {
  width: 50px;
  background: #dadada;
  margin: 10px auto;
  text-align: center;
  padding: 3px 0px;
}
.message-container {
  .message-wrap {
    display: flex;
    padding-top: 18px;

    &_recipient {
      flex-direction: row;
      .message-box {
        margin-left: 10px;
        .details {
          flex-direction: row;
          .nickname {
            margin-right: 10px;
          }
        }
        .content {
          flex-direction: row;
          position: relative;
          span::before {
            content: "";
            position: absolute;
            left: -10px;
            border-right: 5px solid $activeColor;
            border-top: 5px solid transparent;
            border-left: 5px solid transparent;
            border-bottom: 5px solid transparent;
          }
        }
      }
    }
    &_sender {
      flex-direction: row-reverse;
      .message-box {
        margin-right: 10px;
        .details {
          flex-direction: row-reverse;
          .nickname {
            margin-left: 10px;
          }
        }
        .content {
          flex-direction: row-reverse;
          span::before {
            content: "";
            position: absolute;
            right: -10px;
            border-left: 5px solid $activeColor;
            border-top: 5px solid transparent;
            border-right: 5px solid transparent;
            border-bottom: 5px solid transparent;
          }
          .loading-icon-box {
            position: relative;
            .loading-icon {
              position: absolute;
              top: 50%;
              right: 5px;
              transform: translateY(-50%);
            }
          }
        }
      }
    }
    .message-box {
      flex: 1;
      .details {
        display: flex;
        font-size: 12px;
        .nickname {
          color: $darkColor-9;
        }
        .time {
          color: $darkColor-6;
        }
      }
      .content {
        display: flex;
        span {
          position: relative;
          padding: 10px;
          font-size: 14px;
          color: $mFontcolor;
          text-align: left;
          background-color: $activeColor;
          border-radius: 4px;
          max-width: 50%;
        }
      }
    }
  }
}
</style>
