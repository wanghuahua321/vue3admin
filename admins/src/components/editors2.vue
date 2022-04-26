<template>
  <!-- 编辑器 -->
  <div class="menus">
    <div>
      <a-upload name="file" :show-upload-list="false" :file-list="fileList" :before-upload="beforeUpload" :customRequest="FilesCustomRequest">
        <!-- list-type="picture" :action='fileUploads' :header="{token:$store}" :action="fileUploads" :data="uploads" -->
        <PictureOutlined />
      </a-upload>
    </div>
  </div>
  <div class="editCon" @keyup.enter="submit">
    <!-- 
    1234 -->
    <div class="editimages">
      <p class="editHtml" ref="editCons" v-html="editHtml" @input="blurEdit">

      </p>

    </div>
    <div class="sents" @click="submit">发送</div>
  </div>

  <!-- <div :innerHTML='content.html'></div> -->
</template>

<script>
import { onMounted, onBeforeUnmount, ref, reactive, watch, toRefs } from 'vue';
import { uploads } from '@/utils/api'
import { useRoute } from 'vue-router'
import { SmileOutlined, PictureOutlined } from '@ant-design/icons-vue';
import { message } from "ant-design-vue";

export default {
  name: 'app',
  components: {
    PictureOutlined
  },
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
      fileList: [],
      uploads: {
        contactId: ''
      },
      fileUploads: "https://192.168.0.120/api/app/facebook-operation/file-upload/",
      editHtml: "",
      upResults: {},
      sentResults: [],
      isup: false
    });

    onMounted(() => {
      let hua = document.querySelector('.editCon')
      // console.log("hua", hua.innerHTML);
    });

    watch(
      () => route.params,
      (newsvalue, oldvalues) => {
        console.log("newsssss", newsvalue);
        pageData.uploads.contactId = newsvalue.type
        // getChatMsg()
      }, {
      immediate: true
    }
    );


    const submit = () => {
      pageData.currentUser.url = editCons.value.innerHTML
      console.log("99999", editCons.value.innerHTML);
      console.log("setttttttttttt", pageData.sentResults);
      console.log("11111", pageData.fileList);
      // pageData.sentResults.forEach((res) => {
      //   ctx.emit('sents', res)
      // })

      if (editCons.value.innerHTML.replace(/[ ]|[&nbsp;]/g, '') == "") {
        message.error("不能发送空白消息")
      } else {
        //发送之后移到顶端
        if (pageData.isup) {
          pageData.sentResults.forEach((res) => {
            ctx.emit('sents', res)
          })
        }
        ctx.emit('sents', editCons.value.innerHTML.replace(/[ ]|[&nbsp;]/g, ''))
      }

      // pageData.editHtml = ""
      // pageData.sentResults.length = 0;
      // pageData.fileList.length = 0;
      // editCons.value.innerHTML.replace(/[ ]|[&nbsp;]/g, '') = ""

    }
    function blurEdit () {
      pageData.isup = false
      pageData.currentUser.url = editCons.value.innerHTML
      console.log("888", pageData.currentUser.url);
    }

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
      formData.append('TempleteFile', info.file.name)
      pageData.isup = true

      await uploads.fileUpload('01FYQR7YX49FGRMSKXYWYW9SSH', formData).then((res) => {
        pageData.upResults = res
        pageData.fileList.push(res)
        pageData.sentResults.push(res)
      }).catch((error) => {
        console.log(error);
      })

      dealHtml()

    }

    const dealHtml = () => {
      let doms = ""
      pageData.editHtml = ""
      // if (editCons.value.innerHTML) {
      //   console.log("有值", editCons.value.innerHTML);
      //   pageData.editHtml += editCons.value.innerHTML
      //   /* push */
      //   pageData.currentUser.url = editCons.value.innerHTML
      //   pageData.sentResults.push(pageData.currentUser)
      // }
      if (pageData.fileList.length > 0) {

        pageData.fileList.map((res) => {
          console.log("res999", res);
          if (res.messageType == "PhotoMessage") {
            doms = `<img class="fileimg" src="${res.url}" />`
            pageData.editHtml += doms
          } else if (res.messageType == "FileMessage") {
            doms = `<span class="filespan">
               <b class="_img"><img src="${res.url}" /></b>
               <b class="_text">
                <i>文件夹</i>
                <i>222</i>
               </b>
              </span>`
            pageData.editHtml += doms
          }
        })
      }
    }





    return {
      blurEdit,
      beforeUpload,
      FilesCustomRequest,
      submit,
      editCons,
      ...toRefs(pageData),
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
}
</style>
