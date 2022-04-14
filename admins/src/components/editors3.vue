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
    <!-- <div class="sents" @click="submit">发送</div> -->
    <div class="sents" @click="dealHtml('1')">图片</div>
    <div class="sents2" @click="dealHtml('2')">文件</div>
  </div>

  <!-- <div :innerHTML='content.html'></div> -->
</template>

<script>
import { onMounted, onBeforeUnmount, ref, reactive, watch, toRefs } from 'vue';
import { uploads } from '@/utils/api'
import { useRoute } from 'vue-router'
import { SmileOutlined, PictureOutlined } from '@ant-design/icons-vue';

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
      sentResults: []
    });

    onMounted(() => {
      let hua = [
        {
          messageType: "PhotoMessage",
          url: 'https://www.baidu.com/img/PCfb_5bf082d29588c07f842ccde3f97243ea.png'
        },
        {
          messageType: "FileMessage",
          url: 'https://www.baidu.com/img/PCfb_5bf082d29588c07f842ccde3f97243ea.png'
        }
      ]

      pageData.fileList.push(...hua)
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

      pageData.editHtml = ""
      // pageData.sentResults.length = 0;
      // pageData.fileList.length = 0;
      editCons.value.innerHTML = ""
    }
    function blurEdit () {
      pageData.currentUser.url = editCons.value.innerHTML
      console.log("888ssssssss", pageData.currentUser.url);
      // dealHtml()
    }

    const beforeUpload = (file) => {
      console.log("file55", file);
      if (file.type.indexOf('image') == -1) {
        console.log("图片");

      } else {
        // if(file.type)
      }
    };
    function getBase64 (file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    }

    const FilesCustomRequest = async (info, value) => {
      console.log("infoinfo", info);
      console.log("value", value);
      let formData = new FormData()
      formData.append('file', info.file)
      formData.append('TempleteFile', info.file.name)

      await uploads.fileUpload('01FYQR7YX49FGRMSKXYWYW9SSH', formData).then((res) => {
        pageData.upResults = res
        pageData.fileList.push(res)
        pageData.sentResults.push(res)
      }).catch((error) => {
        console.log(error);
      })



    }



    const dealHtml = (type) => {
      let doms = ""
      // pageData.editHtml = ""
      if (type == '1') {
        console.log("00000000000");
        doms = `<img class="fileimg" src="https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png" />`
        pageData.editHtml += doms
      } else {
        doms = `<span class="filespan">
               <b class="_img"><img src="" /></b>
               <b class="_text">
                <i>文件夹</i>
                <i>222</i>
               </b>
              </span>`
        pageData.editHtml += doms
      }

    }





    return {
      blurEdit,
      beforeUpload,
      FilesCustomRequest,
      submit,
      editCons,
      dealHtml,
      getBase64,
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
    overflow: auto;
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
  .sents2 {
    position: absolute;
    bottom: 10px;
    right: 40px;
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
