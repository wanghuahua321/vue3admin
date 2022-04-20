<template>
  <div class="img-cropper">

  </div>
</template>

<script lang='ts'>
import { reactive, onMounted, toRefs, ref } from "vue";
import "vue-cropper/dist/index.css";
import { VueCropper } from "vue-cropper";
export default {
  name: "posTing",
  components: {},
  setup() {
    const pagedata = reactive({
      imgSrc: "",
      cropper: "",
      options: {
        aspectRatio: 1 / 1,
        preview: ".preview-box",
        // crop: () => {
        //     this.cropDisabled = false;
        // }
      },
      cropDisabled: true,
    });

    const cropperImg = ref();

    const initDrawImg = () => {};
    onMounted(() => {
      initDrawImg();
    });
    return {
      ...toRefs(pagedata),
      cropperImg,
    };
  },
};
</script>
<style lang="less" scoped>
.img-cropper {
  display: flex;
  flex-direction: column;
}
</style>
