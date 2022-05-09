<template>
  <div>
    <!-- <div class="tool-box">
      <a-popover placement="top" :width="400" trigger="click">
        <template #content>
          <div class="emoji-scrollbar">
            <div class="emoji-group">
              <div class="emoji" v-for="(emoji, index) in emojis" :key="index" @click="content += emoji">{{ emoji }}</div>
            </div>
          </div>
        </template>

        <SmileOutlined />

      </a-popover>


      <a-upload name="file" v-model:file-list="fileList" :before-upload="beforeUpload" @change="FilesCustomRequest">
        list-type="picture" :action='fileUploads' :header="{token:$store}" :action="fileUploads" :data="uploads" 
        123
        <PictureOutlined />
      </a-upload>
    </div> -->

    <!-- <a-textarea v-model:value="currentUser.content" placeholder="Basic usage" resize="none" :rows="4" @focus="focus = !focus"
        @blur="focus = !focus" /> -->

    <!-- http://192.168.0.120:8080/01FYQR7YX49FGRMSKXYWYW9SSH/MESSENGER/2022-04/3.png -->
    <!-- <a-input v-model="content" type="textarea" resize="none" rows="4" @focus="focus = !focus" @blur="focus = !focus" @keydown="listener" /> -->
    <!-- <a-tooltip effect="dark" placement="top-end" content="按Enter发送消息，Shift+Enter换行">
      
    </a-tooltip> -->
    <edItors />

    <span class="iconfont icon-send" @click="submit">
      发送
    </span>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs, onMounted, computed, watch, toRaw } from 'vue'
import { SmileOutlined, PictureOutlined } from '@ant-design/icons-vue';
import { useStore } from 'vuex'
// import { getUUID } from '@/utils'
import { useRoute } from 'vue-router'
import { uploads } from '@/utils/api'
import edItors from "@/components/editors.vue";

export default defineComponent({
  components: {
    SmileOutlined,
    PictureOutlined,
    edItors
  },
  setup (props, ctx) {
    const store = useStore()
    const route = useRoute()

    const data = reactive({
      /* TextMessage  文本  "PhotoMessage" 图片 FileMessage  文件*/
      currentUser: {
        messageType: "TextMessage",
        content: ""
      },
      focus: false,
      fileList: [],
      uploads: {
        contactId: ''
      },
      fileUploads: "https://192.168.0.120/api/app/facebook-operation/file-upload/",
      emojis: '😃 😄 😁 😆 😅 🤣 😂 🙂 🙃 😉 😊 😇 😍 🤩 😘 😗 ☺️ 😚 😙 😋 😛 😜 🤪 😝 😝 🤗 🤭 🤫 🤔 🤐 🤨 😐 😑 😶 😏 😒 🙄 😬 🤥 😌 😔 😪 🤤 😴 😷 🤒 🤕 🤢 🤮 🤧 😵 🤯 🤠 😎 🤓 🧐 😕 😟 🙁 ☹️ 😮 😯 😲 😳 😦 😧 😨 😰 😥 😢 😭 😱 😖 😣 😞 😓 😩 😫 😤 😡 😠 🤬 😈 👿 💀 ☠️ 🤡 👹 👺 👻 👽 🙈 🙉 🙊 💋 💌 💘 💝 💖 💗 💓 💞 💕 💔 ❤️ 🧡 💛 💚 💙 💜 🖤 💬 🤳 👃 👅 👄 👶 🧒 👋 🤚 🖐️ ✋ 🖖 👌 ✌️ 🤞 🤟 🤘 🤙 👈 👉 👆 🖕 👇 ☝️ 👍 ⬆️ ➡️ ⬇️ ⬅️ ↩️ ↪️ ⤴️ ⤵️ 🔃 🔄 🔙 🔚 🔛 🔜 🔝 🔀 🔁 🔂 ▶️ ⏩ ⏭️ ⏯️ ◀️ ⏪ ⏮️ 🔼 ⏫ 🔽 ⏬'.split(' ')
    })

    const token = computed(() => {
      return store.store.token
    })

    watch(
      () => route.params,
      (newsvalue, oldvalues) => {
        data.uploads.contactId = newsvalue.type
        data.fileUploads = data.fileUploads + newsvalue.type
        // getChatMsg()
      }, {
      immediate: true
    }
    );

    const beforeUpload = (file) => {
      data.currentUser.messageType = "PhotoMessage"
      data.currentUser.content = "https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png"
      // if (file.type.includes('image')) {
      //   data.currentUser.messageType = 'PhotoMessage'
      // }
      console.log("file55", file);
      // const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      // if (!isJpgOrPng) {
      //   // message.error('You can only upload JPG file!');
      // }
      // const isLt2M = file.size / 1024 / 1024 < 2;
      // if (!isLt2M) {
      //   // message.error('Image must smaller than 2MB!');
      // }
      // return isJpgOrPng && isLt2M;
    };

    const FilesCustomRequest = (info) => {
      console.log("info", info);
      data.currentUser.messageType = "PhotoMessage"
      data.currentUser.content = "https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png"
      //   console.log("infoinfo", info);
      //   if (info.file.status === 'uploading') {
      //     console.log("1234");
      //     // loading.value = true;
      //     // return;
      //   }
      //   if (info.file.status === 'done') {
      //     const res = info.file.response
      //     data.currentUser.messageType = res.messageType
      //     data.currentUser.content = res.url
      //   }

    }



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




    //  */
    const submit = () => {
      data.currentUser.messageType = "PhotoMessage"
      data.currentUser.content = "https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png"
      let sendValue = JSON.parse(JSON.stringify(data.currentUser))
      ctx.emit('sents', sendValue)
      data.currentUser.content = ""
    }

    //  * 图片上传成功事件
    const uploadSuccessHandle = (res, _file) => {
      console.log("res", res);


      // if (SUCCESS_CODE.includes(res.code)) {
      //   store.dispatch('websocket/send', paramsHandle(1, 2, res.data.url))
      //   store.dispatch('message/updateScrollBottom')
      // } else {
      //   ElMessage({
      //     message: res.message,
      //     type: 'warning'
      //   })
      // }
    }

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
      beforeUpload,
      uploadSuccessHandle,
      FilesCustomRequest,
      token,
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
.message-input {
  padding: 0px 0px 20px 0px;
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
