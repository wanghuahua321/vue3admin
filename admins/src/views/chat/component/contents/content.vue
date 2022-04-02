<template>
  <div class="content">
    <transition name="el-fade-in-linear" mode="out-in">
      <div class="content-message">
        <div class="message">
          <div class="message-header ellipse-1">
            <div class="name">123</div>
            <div class="icon-btn-box">
              jj
              <!-- <span :class="`iconfont icon-${detailVisible ? 'right' : 'left'}`" @click="detailHandle" /> -->
            </div>
          </div>
          <div class="message-group">
            <div class="message-group-box" ref="refScrollbar">
              <div ref="refInner">
                <!-- <el-icon v-show="loading">
                  <loading />
                </el-icon> -->
                <!-- <span class="tips">暂无更多</span> -->
                <!-- <message v-show="!loading" v-for="(item, index) in list" :key="index" :data="item" class="margin-20-n" /> -->
                <div class="message-container">
                  <!-- <div :class="`message-wrap ${2 === currentUser.id ? 'message-wrap_sender' : 'message-wrap_recipient'}`"> -->
                  <div class="message-wrap message-wrap_sender" v-for="currentUser in chatData" :key="currentUser">
                    <!-- <a-avatar class=" avatar width-50" :size="50" :src="1 === currentUser.id ? currentUser.avatar : friend.avatar" /> -->
                    <a-avatar :size="50">
                      <template #icon>
                        <UserOutlined />
                      </template>
                    </a-avatar>

                    <div class="message-box">
                      <div class="details">
                        <!-- <span class="nickname">{{1 === currentUser.id ? currentUser.nickname : friend.nickname}}</span> -->
                        <span class="nickname">huahua</span>
                        <span class="time">
                          2022-04-01 18:01:39
                        </span>
                      </div>
                      <div class="content margin_t-10">
                        <span>{{currentUser.content}}</span>
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
          </div>
          <div class="message-input">
            <msginput @sents="sents"></msginput>
          </div>
          <!-- <message-list class="message-group" />
    <message-input class="message-input" /> -->
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
import { computed, ref, reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
import { UserOutlined } from '@ant-design/icons-vue';
// import ContentMessage from './contentMessage'
import msginput from './msginput.vue'
import { useWebSocket } from "../../../../hookes";


export default ({
  components: {
    // ContentMessage,
    msginput,
    UserOutlined
  },
  setup () {
    const ws = useWebSocket(handleMessage)
    const store = useStore()
    const pageData = reactive({
      currentUser: {
        id: "1",
        avatar: require('../../../../assets/images/person.png'),
        nickname: "wanghuahu"
      },
      chatData: [

      ]

    })
    // const currentUser = computed(() => store.state.user.user)
    // const friend = computed(() => store.state.conversation.active)


    function handleMessage (e) {
      // console.log("接受", e);
      const _msgData = JSON.parse(e.data)
      pageData.chatData.push(_msgData)

    }

    const sents = (data) => {
      console.log("data", data);
      // pageData.chatData.push(data)
      ws.send(JSON.stringify(data))

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
      ...toRefs(pageData)
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

.message {
  display: flex;
  flex-flow: column;
  border-right: 1px solid $darkColor-7;
  overflow: hidden;
  height: 100%;
  &-header {
    position: relative;
    padding: 0 0 0 20px;
    height: $height;
    border-bottom: 1px solid $darkColor-7;
    display: flex;
    line-height: $height;
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
}
.message-group-box {
  padding: 0 20px;
  height: 352px;
}
.tips {
  font-size: 12px;
  color: $darkColor-6;
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
          color: $lightColor-0;
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
