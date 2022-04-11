<template>
  <!-- 编辑器 -->
  <div class="menus">
    <div>
      <a-upload name="file" v-model:file-list="fileList" :before-upload="beforeUpload" @change="FilesCustomRequest">
        <!-- list-type="picture" :action='fileUploads' :header="{token:$store}" :action="fileUploads" :data="uploads" -->
        <PictureOutlined />
      </a-upload>
    </div>
  </div>
  <div class="editCon" @keyup.enter="enters">
    <!-- 
    1234 -->
    <div class="editimages">

      <div class="files_txt">
        <div class="_fileicon">
          <img src="https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png" />
        </div>
        <div class="_rig">
          <div>444444444</div>
          <p>23.7</p>
        </div>

      </div>

      <div class="files_txt">
        <div class="_fileicon">
          <img src="https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png" />
        </div>
        <div class="_rig">
          <div>444444444</div>
          <p>23.7</p>
        </div>

      </div>

      <!-- <img src="https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png" />
      <img src="https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png" />
      <img src="https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png" />
      <img src="https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png" />
      <p>12333333</p> -->
    </div>
  </div>

  <!-- <div :innerHTML='content.html'></div> -->
</template>

<script>
import { onMounted, onBeforeUnmount, ref, reactive, watch, toRefs } from 'vue';
import WangEditor from 'wangeditor';
import { useRoute } from 'vue-router'
import { SmileOutlined, PictureOutlined } from '@ant-design/icons-vue';

export default {
  name: 'app',
  components: {
    PictureOutlined
  },
  setup (props, ctx) {
    const editor = ref();
    const route = useRoute()

    const contents = reactive({
      html: '',
      text: '',

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
    });

    onMounted(() => {
      let hua = document.querySelector('.editCon')
      console.log("hua", hua.innerHTML);
    });

    watch(
      () => route.params,
      (newsvalue, oldvalues) => {
        console.log("newsssss", newsvalue);
        contents.uploads.contactId = newsvalue.type
        contents.fileUploads = contents.fileUploads + newsvalue.type
        // getChatMsg()
      }, {
      immediate: true
    }
    );

    const enters = () => {
      console.log("huahuah");

    }

    const beforeUpload = (file) => {
      // contents.currentUser.messageType = "PhotoMessage"
      // contents.currentUser.content = "https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png"
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
      // contents.currentUser.messageType = "PhotoMessage"
      // contents.currentUser.content = "https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png"
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



    return {
      enters,
      beforeUpload,
      FilesCustomRequest,
      ...toRefs(contents),
    };
  },
};
</script>

<style scoped  lang="scss">
.menus {
  width: 100%;
  height: 42px;
}
.editCon {
  width: 100%;
  height: calc(100% - 42px);
  border: 3px solid gray;
  -moz-user-modify: read-write;
  -webkit-user-modify: read-write;

  .editimages {
    width: 100%;
    display: flex;
    flex-wrap: wrap;

    img {
      width: 32%;
    }
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
}
</style>
