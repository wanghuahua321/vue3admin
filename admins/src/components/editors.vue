<template>
  <!-- 编辑器 -->
  <div ref='editor'></div>
  <span class="iconfont icon-send" @click="submit">
    发送
  </span>
  <!-- <div :innerHTML='content.html'></div> -->
</template>

<script>
import { onMounted, onBeforeUnmount, ref, reactive, watch, toRefs } from 'vue';
import WangEditor from 'wangeditor';
import { useRoute } from 'vue-router'

export default {
  name: 'app',
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

    let instance;
    onMounted(() => {
      instance = new WangEditor(editor.value);
      // 自定义菜单
      instance.config.menus = [
        'emoticon',
        'image',
      ];
      instance.config.height = 50
      instance.config.uploadImgServer = contents.fileUploads // 上传图片
      // instance.config.uploadFileName = "你自定义的文件名";
      instance.config.uploadImgMaxLength = 5 //一次最多上传 5 个图片
      instance.config.uploadImgParamsWithUrl = false //如果需要将参数拼接到 url 中，可再加上如下配置。
      instance.config.showLinkImg = false
      instance.config.withCredentials = true
      instance.config.uploadImgParams = {  //自定义参数
        contactId: contents.uploads.contactId,
      }
      Object.assign(instance.config, {
        onchange () {
          console.log('change');
        },
      });
      instance.config.uploadImgHooks = {
        // 上传图片之前
        before: function (xhr) {
          console.log(xhr)

          // 可阻止图片上传
          // return {
          //   prevent: true,
          //   msg: '需要提示给用户的错误信息'
          // }
        },
        // 图片上传并返回了结果，图片插入已成功
        success: function (xhr) {
          console.log('success', xhr)
        },
        // 图片上传并返回了结果，但图片插入时出错了
        fail: function (xhr, editor, resData) {
          console.log('fail', resData)
        },
        // 上传图片出错，一般为 http 请求的错误
        error: function (xhr, editor, resData) {
          console.log('error', xhr, resData)
        },
        // 上传图片超时
        timeout: function (xhr) {
          console.log('timeout')
        },
        // 图片上传并返回了结果，想要自己把图片插入到编辑器中
        // 例如服务器端返回的不是 { errno: 0, data: [...] } 这种格式，可使用 customInsert
        customInsert: function (insertImgFn, result) {
          // result 即服务端返回的接口
          console.log('customInsert', result)
          let imags = "https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png"
          // insertImgFn 可把图片插入到编辑器，传入图片 src ，执行函数即可
          insertImgFn(imags)
        }
      }
      instance.create();
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

    onBeforeUnmount(() => {
      instance.destroy();
      instance = null;
    });

    const syncHTML = () => {
      console.log("syncHTML", instance.txt.text());
      // content.html = instance.txt.html();
    };

    const submit = () => {
      contents.currentUser.content = instance.txt.text()
      // contents.currentUser.messageType = "PhotoMessage"
      // contents.currentUser.content = "https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png"
      // let sendValue = JSON.parse(JSON.stringify(contents.currentUser))
      ctx.emit('sents', contents.currentUser)
      instance.txt.clear()
    }

    return {
      syncHTML,
      editor,
      ...toRefs(contents),
      submit
    };
  },
};
</script>
