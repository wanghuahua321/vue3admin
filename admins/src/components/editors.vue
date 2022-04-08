<template>
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
