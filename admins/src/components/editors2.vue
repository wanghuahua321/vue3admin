<template>
  <!-- 编辑器 -->
  <div class="menus">
    <div>
      <a-upload name="file" :show-upload-list="false" :file-list="fileList" :before-upload="beforeUpload" :customRequest="FilesCustomRequest">
        <svg-icon style="cursor: pointer;" iconName="wj" />
      </a-upload>
    </div>
    <div style="paddingLeft:10px; cursor: pointer;" @click="smileClick">
      <svg-icon iconName="biaoqing" />
    </div>
  </div>
  <div class="editCon">
    <div class="editimages" contenteditable="plaintext-only" v-html="editHtml" ref="editCons" @keydown="keydowns">

    </div>
    <div class="sents" @click="submit">发送</div>
  </div>
</template>

<script>
import { onMounted, onBeforeUnmount, ref, reactive, watch, toRefs, inject, nextTick } from 'vue';
import { uploads } from '@/utils/api'
import { useRoute } from 'vue-router'
import { SmileOutlined, PictureOutlined } from '@ant-design/icons-vue';
import { message } from "ant-design-vue";
import { FileTextOutlined } from '@ant-design/icons-vue';
import { imgbaseUrl } from "@/utils/baseurl"

export default {
  name: 'app',
  components: {
    PictureOutlined,
    SmileOutlined
  },
  props: {
    contactId: {
      type: String,
      default: ""
    },
  },
  emits: ['sents'],
  setup (props, ctx) {
    const editCons = ref(null);
    const route = useRoute()

    const pageData = reactive({
      html: '',
      text: '',

      currentUser: {
        messageType: "TextMessage",
        url: ""
      },
      messageTypess: "TextMessage",
      focus: false,
      fileList: [
        // {
        //   messageType: "PhotoMessage",
        //   url: "https://192.168.0.120:8080/Avatars/8.png"
        // },
        // {
        //   messageType: "FileMessage",
        //   url: "http://192.168.0.120:8080/01FYNSN02RGTW6ETXZBMSYJQRX/MESSENGER/2022-04/123.png"
        // }

        // <FileTextOutlined />
      ],
      uploads: {
        contactId: ''
      },
      fileUploads: "https://192.168.0.120/api/app/facebook-operation/file-upload/",
      editHtml: "",
      upResults: {},
      sentResults: [],
      isup: false,
      filename: []
    });

    onMounted(() => {

    });

    watch(
      () => route.params,
      (newsvalue, oldvalues) => {
        pageData.uploads.contactId = newsvalue.type
        // getChatMsg()
        nextTick(() => {
          pageData.editHtml = ""
          editCons.value.innerHTML = ""
        })
      }, {
      immediate: true
    }
    );




    const submit = () => {
      blurEdit()
      setTimeout(function () {
        if (editCons.value.innerHTML.replace(/[ ]|[&nbsp;]/g, '') == "") {
          message.error("不能发送空白消息")
        } else {
          let sentvalue = {}

          for (let i = 0; i < pageData.sentResults.length; i++) {
            if (pageData.sentResults[i].constructor.name == 'HTMLImageElement') {
              sentvalue.messageType = "PhotoMessage"
              sentvalue.url = document.querySelector(".fileimg").src
              ctx.emit('sents', sentvalue)
            } else if (pageData.sentResults[i].constructor.name == 'HTMLDivElement') {
              sentvalue.messageType = "FileMessage"
              sentvalue.url = document.querySelector(".fileimg2").src
              ctx.emit('sents', sentvalue)
            } else {
              sentvalue.messageType = "TextMessage"
              sentvalue.url = pageData.sentResults[i].data
              ctx.emit('sents', sentvalue)
            }
          }

          pageData.editHtml = ""
          pageData.sentResults.length = 0;
          pageData.fileList.length = 0
          editCons.value.innerHTML = ""
        }

      }, 500)


    }

    const smileClick = () => {
    }

    const keydowns = (event) => {
      let keyCode = event.keyCode ? event.keyCode : (event.which ? event.which : event.charCode);
      let altKey = event.ctrlKey || event.metaKey;
      // console.log("000000", altKey);
      if (keyCode == 13 && altKey) {
        //换行

      } else if (keyCode == 13) {
        blurEdit()
        submit()
      }

    }


    var timer
    function blurEdit (e) {
      clearTimeout(timer)
      timer = setTimeout(function () {

        const domss = new DOMParser().parseFromString(editCons.value.innerHTML, 'text/html')
        console.log("domssdomss", domss);
        console.log("domss.body.childNodes", domss.body.childNodes);
        pageData.sentResults = [...domss.body.childNodes]

      }, 500)
    }
    // https://192.168.0.120:8080/Avatars/8.png
    const beforeUpload = (file) => {
      console.log("file55", file);
      if (file.type.indexOf('image') == -1) {
        console.log("图片");

      } else {
        // if(file.type)
      }
    };

    const FilesCustomRequest = async (info) => {
      let formData = new FormData()
      formData.append('file', info.file)
      pageData.fileList.length = 0
      await uploads.fileUpload(props.contactId, formData).then((res) => {
        pageData.upResults = res
        pageData.fileList.push(res)
        // pageData.sentResults.push(res)
      }).catch((error) => {
        console.log(error);
      })

      dealHtml()

    }

    const dealHtml = () => {
      let doms = ""
      pageData.editHtml = editCons.value.innerHTML

      if (pageData.fileList.length > 0) {
        pageData.fileList.map((res) => {
          if (res.messageType == "PhotoMessage") {
            doms = `<img  class="fileimg" alt="图片显示错误" src="${res.url}"  onerror="https://192.168.0.120:8080/Avatars/8.png"/>`
            pageData.editHtml += doms
          } else if (res.messageType == "FileMessage") {
            doms = `<div class="filespans">
                <div class="filespan">     
                 <b class="files">
                 <img src="${imgbaseUrl}/resource/file.png"  alt="图片显示错误" />
                 </b>
                 
                <b class="_text">
                <i>文件夹</i>
                <i>${filename(res.url)}</i>
                </b></div>
                <img  class="fileimg2" style="display:none"  src="${res.url}" />
                </div>`
            pageData.editHtml += doms
          }
        })

      }

      const domss = new DOMParser().parseFromString(pageData.editHtml, 'text/html')
      pageData.sentResults = [...domss.body.childNodes]
    }

    const filename = (val) => {

      let filenames = val.substring(val.lastIndexOf("/") + 1)
      // str.subString()
      return filenames
    };





    return {
      blurEdit,
      beforeUpload,
      FilesCustomRequest,
      submit,
      editCons,
      smileClick,
      ...toRefs(pageData),
      keydowns,
      filename
    };
  },
};
</script>

<style scoped  lang="scss">
.menus {
  width: 100%;
  height: 42px;
  display: flex;
  align-items: center;
  padding: 0px 10px;
  border-bottom: 2px solid #ccc;
}
.fileimg {
  min-width: 50px;
  height: 50px;
  // border: 1px solid #ccc;
}
.editCon {
  width: 100%;
  height: calc(100% - 42px);
  // border: 3px solid gray;
  position: relative;
  .editimages {
    width: 100%;
    height: calc(100% - 40px);
    overflow-y: auto;
    word-break: normal;
    user-select: text;
    white-space: pre-wrap;
    outline: 1px solid #ffffff;
    &::-webkit-scrollbar {
      // 纵向滚动条和横向滚动条宽度
      width: 3px;
      height: 1px;
    }
    &::-webkit-scrollbar-thumb {
      // 滚动条背景条样式
      border-radius: 6px;
      -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      background: #ccc;
    }
    &::-webkit-scrollbar-track {
      // 滚动条按钮样式
      -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      border-radius: 6px;
      background: #ffffff;
    }
  }
  .editHtml {
    width: 100%;
    height: 100%;
    min-height: 100px;
    // display: flex;
    // flex-wrap: wrap;
    text-align: left;
    -webkit-user-modify: read-write;
    overflow-wrap: break-word;
    -webkit-line-break: after-white-space;
    outline: 1px solid #ffffff;
  }

  .files_txt {
    display: flex;
    width: 80%;
    border: 1px solid;
    ._fileicon {
      width: 30%;
      img {
        width: 100%;
      }
    }
    ._rig {
    }
  }
  .sents {
    position: absolute;
    bottom: 10px;
    right: 10px;
    padding: 6px 10px;
    z-index: 9999;
    border: 1px solid #ccc;
    border-radius: 6px;
    color: #89d961;
    font-size: 13px;
    letter-spacing: 1px;
    cursor: pointer;
  }
}
</style>
<style>
.filespans {
  /* margin: 0 2px 0 2px;
  position: relative;
  width: 70%;
  overflow: hidden;
  height: 60px;
  display: flex; */
}
.filespan {
  -webkit-user-modify: read-only;
  cursor: default;
  border: 1px solid gray;
  /* display: inline-block; */
  line-height: 0;
  margin: 0 2px 0 2px;
  position: relative;
  width: 56%;
  overflow: hidden;
  height: 60px;
  display: flex;
}
.filespan .files {
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.filespan .files img {
  width: 56%;
  height: 82%;
}

.filespan ._img {
  width: 32%;
  float: left;
}
.filespan ._img img {
  width: 100%;
}
.filespan ._text {
  float: left;
  width: 68%;
  height: 100%;
}
.filespan ._text i {
  display: block;
  width: 100%;
  height: 30px;
  line-height: 30px;
  font-style: normal;
}
.fileimg {
  width: 32%;
  min-width: 50px;
  min-height: 50px;
  border: 1px solid #ccc;
}
</style>
