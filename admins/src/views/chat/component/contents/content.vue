<template>
  <div class="content">
    <transition name="el-fade-in-linear" mode="out-in">
      <div class="content-message">
        <div class="message">
          <div class="message-header ellipse-1">
            <div class="name">{{displayName? displayName:'--'}}</div>
            <!-- {{}}000 -->
            <!-- <div class="icon-btn-box">
              jj
            </div> -->
          </div>
          <div class="message-group" ref="msgContent">
            <div class="message-group-box" ref="refScrollbar">

              <div class="message-container">
                <!-- class="message-wrap message-wrap_sender" -->
                <div class="senttimes">
                  <!-- 09:30 -->
                </div>
                <div :class="`message-wrap ${currentUser.isRight ? 'message-wrap_sender' : 'message-wrap_recipient'}`"
                  v-for="currentUser in chatRecord" :key="currentUser.message_Id">
                  <!-- <a-avatar class=" avatar width-50" :size="50" :src="1 === currentUser.id ? currentUser.avatar : friend.avatar" /> -->
                  <a-avatar :size="50">
                    <template #icon>
                      <!-- fix -->
                      <!-- <a-image :width="50" :src="$store.state.chatPerson.phoneurl" /> -->
                      <UserOutlined />
                    </template>
                  </a-avatar>

                  <div class="message-box">
                    <div class="details">
                      <!-- <span class="nickname">{{1 === currentUser.id ? currentUser.nickname : friend.nickname}}</span> -->

                      <span class="time">
                        <!-- {{currentUser.receviedDate?currentUser.receviedDate:'--'}} -->
                      </span>
                    </div>

                    <div class="content margin_t-10">
                      <span v-if="currentUser.messageType=='TextMessage'">{{currentUser.message}}</span>
                      <a-image v-else-if="currentUser.messageType=='PhotoMessage'" :width="100" :src="currentUser.message" />
                      <span class="con_file" v-else>
                        <b class="file_b">
                          <FileTextOutlined class="icons_sty" />
                        </b>
                        <dl class="files">
                          <dt>{{ filename(currentUser.message)}}</dt>
                          <dd>1k</dd>
                        </dl>
                      </span>
                      <!-- <a-image v-else :width="100" :src="currentUser.message" /> -->
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
          <div class="message-input">
            <editors @sents="sents" :contactId="contactId"></editors>
            <!-- <msginput @sents="sents" sentTime="20:9"></msginput> -->
          </div>
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
import { computed, ref, reactive, toRefs, onMounted, watch, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import { UserOutlined, FileTextOutlined } from '@ant-design/icons-vue';
import { Message } from "@/utils/api"
import msginput from './msginput.vue'
import { useWebSocket } from "../../../../hookes";
import { useRouter, useRoute } from 'vue-router'
import editors from "@/components/editors2.vue"


export default ({
  components: {
    FileTextOutlined,
    msginput,
    UserOutlined,
    editors
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

    const msgContent = ref();
    const ws = useWebSocket(handleMessage)
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
    const filename = (val) => {
      let filenames = val.substring(val.lastIndexOf("/") + 1)
      // str.subString()
      return filenames
    };


    // let wss = new WebSocket("ws://192.168.0.115:6800/Chat?contactId=01FXRNXY02TEX69Z81KJP5NKXE-MESSENGER");
    // wss.onopen = ((res) => {
    //   console.log(res, "连接成功");
    // })

    // wss.onerror = ((res) => {
    //   console.log(res, '=====err');
    // })

    // wss.onmessage = ((res) => {
    //   console.log(res.data, "接受数据123");

    // })

    // wss.onclose = function () {
    //   // 关闭 websocket
    //   console.log("连接已关闭...");
    // };

    onMounted(() => {
    })


    onUnmounted(() => {
      // window.removeEventListener('scroll', scrollBottom, true);
    });


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
      console.log("收到信息");
      console.log('[  JSON.parse(e.data)] >', JSON.parse(e.data))
      if (JSON.parse(e.data)) {
        if (JSON.parse(e.data).messageType == 'DeliveryMessage') {
          return
        } else {
          pageData.chatRecord.push(JSON.parse(e.data))
          store.commit('setrandDoms', Math.random())
          store.commit('setWsdata', JSON.parse(e.data))
          ctx.emit("doneSent",)
        }
      }
    }

    const sents = (data) => {
      console.log("datas", data);
      let datas = {
        contact_id: pageData.contactId,
        messageType: data.messageType,
        message: data.url,
        replyToMessageId: "" //回复的某个人信息
      }

      Message.sentMessage(datas).then((res) => {
        let params = {
          message: data,
          isRead: true,
          isRight: true,// 发送方
        }
        let sentdata = { ...res.data, ...params }
        // pageData.chatRecord.push(sentdata)
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
      filename,
      msgContent,
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
  background-color: #fff;
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
    height: 42px;
    border-bottom: 1px solid $darkColor-7;
    display: flex;
    line-height: 42px;
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
    height: 32%;
  }
}
.message-group {
  // height: calc(100% - 190px);
  height: 68%;
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
          span {
            background: #f8f9fb !important;
          }
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
          padding: 0px 10px;
          font-size: 14px;
          color: #333629;
          text-align: left;
          background-color: #fbebe6;
          border-radius: 4px;
          max-width: 60%;
          white-space: wrap;
          word-break: break-all;
          text-overflow: ellipsis;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 30;
          -webkit-box-orient: vertical;
          display: flex;
          align-items: center;
        }

        .con_file {
          display: flex;
          background-color: #f5f5f5;
          .file_b {
            min-width: 50px;
            .icons_sty {
              font-size: 58px;
              padding: 0px 0px 0px 6px;
              color: #fa9d3b;
              background-color: #f5f5f5;
            }
          }
          .files {
            min-width: 100px;
            dt {
              font-size: 14px;
              color: #333629;
            }
            dd {
              font-size: 12px;
              color: #9fa4bb;
            }
          }
        }
      }
    }
  }
}
</style>
