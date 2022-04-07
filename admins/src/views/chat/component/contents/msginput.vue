<template>
  <div :class="`message-input-container${focus ? ' highlight' : ''}`">
    <div class="tool-box">
      <a-popover placement="top" :width="400" trigger="click">
        <!--       <template #content>
          123
          <SmileOutlined />
          <span class="iconfont icon-smile" />
        </template> -->

        <SmileOutlined />
        <!-- <el-scrollbar class="emoji-scrollbar"> -->
        <div class="emoji-group">
          <!-- <div class="emoji" v-for="(emoji, index) in emojis" :key="index" @click="content += emoji">{{ emoji }}</div> -->
        </div>
        <!-- </el-scrollbar> -->
      </a-popover>
      <!-- <el-upload class="image-upload" :action="uploadApi()" :show-file-list="false" :on-success="uploadSuccessHandle" :headers="{
          [TOKEN_KEY]: token
        }">
        <span class="iconfont icon-image" />
      </el-upload> -->

      <!-- <span class="iconfont icon-file" /> -->
    </div>
    <div class="textarea padding_t-10">
      <a-textarea v-model:value="currentUser.content" placeholder="Basic usage" resize="none" :rows="4" @focus="focus = !focus"
        @blur="focus = !focus" />
      <!-- <a-input v-model="content" type="textarea" resize="none" rows="4" @focus="focus = !focus" @blur="focus = !focus" @keydown="listener" /> -->
      <a-tooltip effect="dark" placement="top-end" content="按Enter发送消息，Shift+Enter换行">
        <span class="iconfont icon-send" @click="submit">
          发送
        </span>
      </a-tooltip>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs, onMounted, computed } from 'vue'
import { SmileOutlined } from '@ant-design/icons-vue';
import { useStore } from 'vuex'
// import { getUUID } from '@/utils'
// import { emojiApi } from '@/api'
// import { uploadApi } from '@/api/user'
// import { SUCCESS_CODE, TOKEN_KEY } from '@/utils/constants'
// import { ElMessage } from 'element-plus'

export default defineComponent({
  components: {
    SmileOutlined
  },
  setup (props, ctx) {
    const store = useStore()

    const token = computed(() => store.state.user.token.token)

    const data = reactive({
      //   let huas = {
      //     fromContactId: "01FXRNXY02TEX69Z81KJP5NKXE-MESSENGER",
      //     toContactIdList: ["01FY8B36YY87YG9R95RWRK0111-MESSENGER"],
      //     content: "from456to123",
      //   };
      currentUser: {
        fromContactId: "01FXRNXY02TEX69Z81KJP5NKXE-MESSENGER",
        toContactIdList: ["01FY8B36YY87YG9R95RWRK0111-MESSENGER"],
        // nickname: "wanghuahu",
        content: ""
      },
      focus: false,
      emojis: '😃 😄 😁 😆 😅 🤣 😂 🙂 🙃 😉 😊 😇 😍 🤩 😘 😗 ☺️ 😚 😙 😋 😛 😜 🤪 😝 😝 🤗 🤭 🤫 🤔 🤐 🤨 😐 😑 😶 😏 😒 🙄 😬 🤥 😌 😔 😪 🤤 😴 😷 🤒 🤕 🤢 🤮 🤧 😵 🤯 🤠 😎 🤓 🧐 😕 😟 🙁 ☹️ 😮 😯 😲 😳 😦 😧 😨 😰 😥 😢 😭 😱 😖 😣 😞 😓 😩 😫 😤 😡 😠 🤬 😈 👿 💀 ☠️ 🤡 👹 👺 👻 👽 🙈 🙉 🙊 💋 💌 💘 💝 💖 💗 💓 💞 💕 💔 ❤️ 🧡 💛 💚 💙 💜 🖤 💬 🤳 👃 👅 👄 👶 🧒 👋 🤚 🖐️ ✋ 🖖 👌 ✌️ 🤞 🤟 🤘 🤙 👈 👉 👆 🖕 👇 ☝️ 👍 ⬆️ ➡️ ⬇️ ⬅️ ↩️ ↪️ ⤴️ ⤵️ 🔃 🔄 🔙 🔚 🔛 🔜 🔝 🔀 🔁 🔂 ▶️ ⏩ ⏭️ ⏯️ ◀️ ⏪ ⏮️ 🔼 ⏫ 🔽 ⏬'.split(' ')
    })

    /**
     * 获取emoji表情
     */
    // const getEmoji = () => {
    //   emojiApi().then(r => {
    //     if (r) {
    //       data.emojis = r.split(' ')
    //     }
    //   })
    // }

    /**
     * 参数处理
     */
    // const paramsHandle = (type = 1, messageType = 1, url = '') => {
    //   const params = {
    //     message: {
    //       ack: getUUID(), // ack 消息确认
    //       from: store.state.user.user.id, // 当前用户ID
    //       to: store.state.conversation.active.id, // 接收者ID
    //       type: type, // 消息类型 1-私聊 2-群聊
    //       messageType: messageType, // 发送消息类型 1-text 2-image 3-file
    //       content: messageType === 1 ? data.content : '', // 消息内容 messageType = 1
    //       url: url // 资源路径 messageType = 2 | 3
    //     }
    //   }
    //   return params
    // }

    // /**
    //  * 发送
    //  */
    const submit = () => {
      let value = data.currentUser.content
      ctx.emit('sents', value)
      data.currentUser.content = ""
    }

    // /**
    //  * 图片上传成功事件
    //  */
    // const uploadSuccessHandle = (res, _file) => {
    //   if (SUCCESS_CODE.includes(res.code)) {
    //     store.dispatch('websocket/send', paramsHandle(1, 2, res.data.url))
    //     store.dispatch('message/updateScrollBottom')
    //   } else {
    //     ElMessage({
    //       message: res.message,
    //       type: 'warning'
    //     })
    //   }
    // }

    // /**
    //  * 监听textarea 键盘事件 取消回车换行 改为 shift+回车 换行
    //  */
    // const listener = (e) => {
    //   if (e.keyCode === 13) {
    //     if (!e.shiftKey) {
    //       submit()
    //       e.preventDefault()
    //       return false
    //     }
    //   }
    // }

    onMounted(() => {
      // getEmoji()
    })

    return {
      ...toRefs(data),
      focus,
      // listener,
      submit,
      // uploadApi,
      // uploadSuccessHandle,
      // TOKEN_KEY,
      token
    }
  }
})
</script>

<style lang="scss" scoped>
@import "@/assets/css/_variable.scss";

.textarea:deep(.ant-input) {
  width: 100%;
  height: 100%;
  border: 0px solid #d9d9d9 !important;
}

.textarea:deep(.ant-input:focus) {
  box-shadow: 0 0 0 0px;
}
.highlight {
  background-color: $lightColor-0;
}
.message-input-container {
  padding: 3px 20px 20px 20px;
  text-align: left;
  height: 100%;
  .tool-box {
    width: 100%;
    height: 28px;
    .iconfont {
      font-size: 20px;
      cursor: pointer;
    }
    .iconfont {
      margin-right: 10px;
    }
    .image-upload {
      display: inline;
    }
  }
  .textarea {
    position: relative;
    width: 100%;
    height: calc(100% - 28px);
    ::v-deep(.el-textarea__inner) {
      padding: 0;
      border: none;
      background: transparent;
    }
    .iconfont {
      position: absolute;
      right: -16px;
      bottom: -16px;
      font-size: 24px;
      color: $activeColor;
      cursor: pointer;
    }
    ::-webkit-scrollbar {
      display: none;
    }
  }
}
.emoji-scrollbar {
  height: 200px;
  .emoji-group {
    display: flex;
    flex-wrap: wrap;
    .emoji {
      flex: 0 0 auto;
      width: 34px;
      font-size: 22px;
      cursor: pointer;
    }
  }
}
</style>
