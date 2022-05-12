<template>
  <!-- 编辑器 -->
  <div class="menus">
    <div>
      <a-upload name="file" :show-upload-list="false" :file-list="fileList" :before-upload="beforeUpload" :customRequest="FilesCustomRequest">
        <!-- list-type="picture" :action='fileUploads' :header="{token:$store}" :action="fileUploads" :data="uploads" -->
        <svg-icon style="cursor: pointer;" iconName="wj" />
      </a-upload>
    </div>
    <div style="paddingLeft:10px; cursor: pointer;" @click="smileClick">
      <svg-icon iconName="biaoqing" />
    </div>
  </div>
  <div class="editCon">
    <!-- 
    1234 -->
    <!-- @keyup.enter="submit"        @input="blurEdit" -->
    <div class="editimages">
      <p style="white-space: nowrap;" class="editHtml" ref="editCons" v-html="editHtml" @keydown="keydowns">

      </p>
    </div>
    <div class="sents" @click="submit">发送</div>
  </div>

  <!-- <div :innerHTML='content.html'></div> -->
</template>

<script>
import { onMounted, onBeforeUnmount, ref, reactive, watch, toRefs, inject, nextTick } from 'vue';
import { uploads } from '@/utils/api'
import { useRoute } from 'vue-router'
import { SmileOutlined, PictureOutlined } from '@ant-design/icons-vue';
import { message } from "ant-design-vue";
import { FileTextOutlined } from '@ant-design/icons-vue';

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
      setTimeout(function () {
        if (editCons.value.innerHTML.replace(/[ ]|[&nbsp;]/g, '') == "") {
          message.error("不能发送空白消息")
        } else {
          let sentvalue = {}

          for (let i = 0; i < pageData.sentResults.length; i++) {
            console.log("pageData.sentResults[i].constructor.name", pageData.sentResults[i].constructor.name);
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
            // console.log("0000000000000000", document.getElementsByClassName("fileimg")[0].constructor.value);
          }

          pageData.editHtml = ""
          pageData.sentResults.length = 0;
          pageData.fileList.length = 0
          editCons.value.innerHTML = ""
          // pageData.fileList.length = 0;
          // editCons.value.innerHTML.replace(/[ ]|[&nbsp;]/g, '') = ""

        }

      }, 500)


    }

    const smileClick = () => {
      console.log("999999");

    }

    const keydowns = (event) => {
      // console.log("999999", event);
      // console.log("editCons.value.innerHTML", editCons.value.innerHTML);
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
        console.log("editCons.value.innerHTML", editCons.value.innerHTML);
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
      console.log("infoinfo", info);
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

      console.log(" pageData.fileList", pageData.fileList);

      if (pageData.fileList.length > 0) {
        pageData.fileList.map((res) => {
          if (res.messageType == "PhotoMessage") {
            doms = `<img  class="fileimg" alt="图片显示错误" src="${res.url}"  onerror="https://192.168.0.120:8080/Avatars/8.png"/>`
            pageData.editHtml += doms
          } else if (res.messageType == "FileMessage") {
            doms = `<div class="filespans">
                <div class="filespan">     
                 <b>
                 <img  src="../images/txt.png" />
                 </b>
                 
                <b class="_text">
                <i>文件夹</i>
                <i>222</i>
                </b></div>
                <img  class="fileimg2" style="display:none"  src="${res.url}" />
                </div>`
            pageData.editHtml += doms
          }
        })

      }

      console.log("pageData.editHtml77", pageData.editHtml);
      const domss = new DOMParser().parseFromString(pageData.editHtml, 'text/html')
      pageData.sentResults = [...domss.body.childNodes]
      console.log('[ domss ] >', domss)
      console.log('[ eleNodes ] >', pageData.sentResults)
    }





    return {
      blurEdit,
      beforeUpload,
      FilesCustomRequest,
      submit,
      editCons,
      smileClick,
      ...toRefs(pageData),
      keydowns
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
    height: 100%;
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
.filespan {
  -webkit-user-modify: read-only;
  cursor: default;
  border: 1px solid gray;
  display: inline-block;
  line-height: 0;
  margin: 0 2px 0 2px;
  position: relative;
  width: 70%;
  overflow: hidden;
  height: 60px;
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
<template>
  <!-- 编辑器 -->
  <div class="menus">
    <div>
      <a-upload name="file" :show-upload-list="false" :file-list="fileList" :before-upload="beforeUpload" :customRequest="FilesCustomRequest">
        <!-- list-type="picture" :action='fileUploads' :header="{token:$store}" :action="fileUploads" :data="uploads" -->
        <svg-icon style="cursor: pointer;" iconName="wj" />
      </a-upload>
    </div>
    <div style="paddingLeft:10px; cursor: pointer;" @click="smileClick">
      <svg-icon iconName="biaoqing" />
    </div>
  </div>
  <div class="editCon">
    <!-- 
    1234 -->
    <!-- @keyup.enter="submit"        @input="blurEdit" -->
    <div class="editimages">
      <p style="white-space: nowrap;" class="editHtml" ref="editCons" v-html="editHtml" @keydown="keydowns">

      </p>
    </div>
    <div class="sents" @click="submit">发送</div>
  </div>

  <!-- <div :innerHTML='content.html'></div> -->
</template>

<script>
import { onMounted, onBeforeUnmount, ref, reactive, watch, toRefs, inject, nextTick } from 'vue';
import { uploads } from '@/utils/api'
import { useRoute } from 'vue-router'
import { SmileOutlined, PictureOutlined } from '@ant-design/icons-vue';
import { message } from "ant-design-vue";
import { FileTextOutlined } from '@ant-design/icons-vue';

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
      setTimeout(function () {
        if (editCons.value.innerHTML.replace(/[ ]|[&nbsp;]/g, '') == "") {
          message.error("不能发送空白消息")
        } else {
          let sentvalue = {}

          for (let i = 0; i < pageData.sentResults.length; i++) {
            console.log("pageData.sentResults[i].constructor.name", pageData.sentResults[i].constructor.name);
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
            // console.log("0000000000000000", document.getElementsByClassName("fileimg")[0].constructor.value);
          }

          pageData.editHtml = ""
          pageData.sentResults.length = 0;
          pageData.fileList.length = 0
          editCons.value.innerHTML = ""
          // pageData.fileList.length = 0;
          // editCons.value.innerHTML.replace(/[ ]|[&nbsp;]/g, '') = ""

        }

      }, 500)


    }

    const smileClick = () => {
      console.log("999999");

    }

    const keydowns = (event) => {
      // console.log("999999", event);
      // console.log("editCons.value.innerHTML", editCons.value.innerHTML);
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
        console.log("editCons.value.innerHTML", editCons.value.innerHTML);
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
      console.log("infoinfo", info);
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

      console.log(" pageData.fileList", pageData.fileList);

      if (pageData.fileList.length > 0) {
        pageData.fileList.map((res) => {
          if (res.messageType == "PhotoMessage") {
            doms = `<img  class="fileimg" alt="图片显示错误" src="${res.url}"  onerror="https://192.168.0.120:8080/Avatars/8.png"/>`
            pageData.editHtml += doms
          } else if (res.messageType == "FileMessage") {
            doms = `<div class="filespans">
                <div class="filespan">     
                 <b>
                 <img  src="../images/txt.png" />
                 </b>
                 
                <b class="_text">
                <i>文件夹</i>
                <i>222</i>
                </b></div>
                <img  class="fileimg2" style="display:none"  src="${res.url}" />
                </div>`
            pageData.editHtml += doms
          }
        })

      }

      console.log("pageData.editHtml77", pageData.editHtml);
      const domss = new DOMParser().parseFromString(pageData.editHtml, 'text/html')
      pageData.sentResults = [...domss.body.childNodes]
      console.log('[ domss ] >', domss)
      console.log('[ eleNodes ] >', pageData.sentResults)
    }





    return {
      blurEdit,
      beforeUpload,
      FilesCustomRequest,
      submit,
      editCons,
      smileClick,
      ...toRefs(pageData),
      keydowns
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
    height: 100%;
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
.filespan {
  -webkit-user-modify: read-only;
  cursor: default;
  border: 1px solid gray;
  display: inline-block;
  line-height: 0;
  margin: 0 2px 0 2px;
  position: relative;
  width: 70%;
  overflow: hidden;
  height: 60px;
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
<template>
  <!-- 编辑器 -->
  <div class="menus">
    <div>
      <a-upload name="file" :show-upload-list="false" :file-list="fileList" :before-upload="beforeUpload" :customRequest="FilesCustomRequest">
        <!-- list-type="picture" :action='fileUploads' :header="{token:$store}" :action="fileUploads" :data="uploads" -->
        <svg-icon style="cursor: pointer;" iconName="wj" />
      </a-upload>
    </div>
    <div style="paddingLeft:10px; cursor: pointer;" @click="smileClick">
      <svg-icon iconName="biaoqing" />
    </div>
  </div>
  <div class="editCon">
    <!-- 
    1234 -->
    <!-- @keyup.enter="submit"        @input="blurEdit" -->
    <div class="editimages">
      <p style="white-space: nowrap;" class="editHtml" ref="editCons" v-html="editHtml" @keydown="keydowns">

      </p>
    </div>
    <div class="sents" @click="submit">发送</div>
  </div>

  <!-- <div :innerHTML='content.html'></div> -->
</template>

<script>
import { onMounted, onBeforeUnmount, ref, reactive, watch, toRefs, inject, nextTick } from 'vue';
import { uploads } from '@/utils/api'
import { useRoute } from 'vue-router'
import { SmileOutlined, PictureOutlined } from '@ant-design/icons-vue';
import { message } from "ant-design-vue";
import { FileTextOutlined } from '@ant-design/icons-vue';

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
      setTimeout(function () {
        if (editCons.value.innerHTML.replace(/[ ]|[&nbsp;]/g, '') == "") {
          message.error("不能发送空白消息")
        } else {
          let sentvalue = {}

          for (let i = 0; i < pageData.sentResults.length; i++) {
            console.log("pageData.sentResults[i].constructor.name", pageData.sentResults[i].constructor.name);
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
            // console.log("0000000000000000", document.getElementsByClassName("fileimg")[0].constructor.value);
          }

          pageData.editHtml = ""
          pageData.sentResults.length = 0;
          pageData.fileList.length = 0
          editCons.value.innerHTML = ""
          // pageData.fileList.length = 0;
          // editCons.value.innerHTML.replace(/[ ]|[&nbsp;]/g, '') = ""

        }

      }, 500)


    }

    const smileClick = () => {
      console.log("999999");

    }

    const keydowns = (event) => {
      // console.log("999999", event);
      // console.log("editCons.value.innerHTML", editCons.value.innerHTML);
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
        console.log("editCons.value.innerHTML", editCons.value.innerHTML);
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
      console.log("infoinfo", info);
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

      console.log(" pageData.fileList", pageData.fileList);

      if (pageData.fileList.length > 0) {
        pageData.fileList.map((res) => {
          if (res.messageType == "PhotoMessage") {
            doms = `<img  class="fileimg" alt="图片显示错误" src="${res.url}"  onerror="https://192.168.0.120:8080/Avatars/8.png"/>`
            pageData.editHtml += doms
          } else if (res.messageType == "FileMessage") {
            doms = `<div class="filespans">
                <div class="filespan">     
                 <b>
                 <img  src="../images/txt.png" />
                 </b>
                 
                <b class="_text">
                <i>文件夹</i>
                <i>222</i>
                </b></div>
                <img  class="fileimg2" style="display:none"  src="${res.url}" />
                </div>`
            pageData.editHtml += doms
          }
        })

      }

      console.log("pageData.editHtml77", pageData.editHtml);
      const domss = new DOMParser().parseFromString(pageData.editHtml, 'text/html')
      pageData.sentResults = [...domss.body.childNodes]
      console.log('[ domss ] >', domss)
      console.log('[ eleNodes ] >', pageData.sentResults)
    }





    return {
      blurEdit,
      beforeUpload,
      FilesCustomRequest,
      submit,
      editCons,
      smileClick,
      ...toRefs(pageData),
      keydowns
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
    height: 100%;
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
.filespan {
  -webkit-user-modify: read-only;
  cursor: default;
  border: 1px solid gray;
  display: inline-block;
  line-height: 0;
  margin: 0 2px 0 2px;
  position: relative;
  width: 70%;
  overflow: hidden;
  height: 60px;
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
