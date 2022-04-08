<template>
  <!-- 编辑器 -->
  <div ref='editor'></div>
  <button @click='syncHTML'>同步内容</button>
  <div :innerHTML='content.html'></div>
</template>

<script>
import { onMounted, onBeforeUnmount, ref, reactive } from 'vue';
import WangEditor from 'wangeditor';

export default {
  name: 'app',
  setup () {
    const editor = ref();
    const content = reactive({
      html: '',
      text: '',
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
      instance.config.uploadImgServer = '/upload-img' // 上传图片
      instance.config.uploadImgMaxLength = 5 //一次最多上传 5 个图片
      instance.config.uploadImgParamsWithUrl = true //如果需要将参数拼接到 url 中，可再加上如下配置。
      instance.config.showLinkImg = false
      instance.config.uploadImgParams = {  //自定义参数
        token: 'xxxxx',
        x: 100
      }
      Object.assign(instance.config, {
        onchange () {
          console.log('change');
        },
      });
      instance.create();
    });

    onBeforeUnmount(() => {
      instance.destroy();
      instance = null;
    });

    const syncHTML = () => {
      console.log("syncHTML", instance.txt.html());
      content.html = instance.txt.html();
    };

    return {
      syncHTML,
      editor,
      content,
    };
  },
};
</script>
