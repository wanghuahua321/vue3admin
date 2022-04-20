<template>
  <div class="img-cropper">

    <div class="leftCropper">
      <VueCropper ref="cropperImg" :img="option.img" :outputSize="option.size" :outputType="option.outputType" :info="true" :full="option.full"
        :fixed="option.fixed" :fixedNumber="option.fixedNumber" :can-move="option.canMove" :can-move-box="option.canMoveBox"
        :fixed-box="option.fixedBox" :original="option.original" :auto-crop="option.autoCrop" :auto-crop-width="option.autoCropWidth"
        :auto-crop-height="option.autoCropHeight" :center-box="option.centerBox" @realTime="realTime" :high="option.high" @img-load="imgLoad"
        mode="100% auto" :max-img-size="option.max" @crop-moving="cropMoving"></VueCropper>

      <div class="cropper-tool">
        <a-upload :before-upload="beforeUpload" @change="handleChange" accept="image/png, image/jpeg" :showUploadList="false">
          上传图片
        </a-upload>
        <!-- @click="reset" -->
        <!-- <a-button icon="close" style="margin: 0 10px;" title="取消"></a-button>
        <a-button title="确定" icon="check"></a-button> -->
        <div @click="cancelHandel">取消</div>
        <div @click="okHandel">确定</div>

      </div>
    </div>

    <div class="rigCropper">
      <a-image :width="114" :src="imgSrc" :fallback="option.img" />
    </div>

  </div>
</template>

<script lang='ts'>
import { reactive, onMounted, toRefs, ref } from "vue";
import "vue-cropper/dist/index.css";
import { VueCropper } from "vue-cropper";
import { getBase64, dataURLtoFile } from "@/utils/file";
export default {
  name: "posTing",
  components: {
    VueCropper,
  },
  setup() {
    const pagedata = reactive({
      imgSrc: "",
      cropper: "",
      option: {
        name: "",
        img: "https://avatars2.githubusercontent.com/u/15681693?s=460&v=4",
        size: 1,
        full: false,
        outputType: "png",
        canMove: false,
        fixedBox: false,
        original: false,
        canMoveBox: true,
        autoCrop: true,
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 120,
        autoCropHeight: 120,
        centerBox: true,
        high: true,
        max: 99999,
        fixed: true,
        fixedNumber: [1, 1],
      },
      cropDisabled: true,
    });

    const cropperImg = ref();

    const initDrawImg = () => {};
    const beforeUpload = () => {};
    const handleChange = (info) => {
      getBase64(info.file.originFileObj, (imgUrl) => {
        console.log("imgUrl", imgUrl);
        let target = {
          name: info.file.name,
          img: imgUrl,
        };
        pagedata.option = Object.assign({}, pagedata.option, target);
      });
    };

    const cancelHandel = () => {
      pagedata.option.img = "";
    };
    const okHandel = () => {
      // confirmLoading.value = true;
      cropperImg.value.getCropData((data) => {
        // 转换为File对象
        let file = dataURLtoFile(data, pagedata.option.name);
        //将裁剪侯的图片对象返回给父组件
        // emit("ok", file);
        // cancelHandel();
        // confirmLoading.value = false;
        getBase64(file, (base64) => {
          console.log("file", file);
          console.log("base64", base64);
          pagedata.imgSrc = base64;
        });
      });
    };
    onMounted(() => {
      initDrawImg();
    });
    return {
      ...toRefs(pagedata),
      cropperImg,
      handleChange,
      beforeUpload,
      cancelHandel,
      okHandel,
    };
  },
};
</script>
<style lang="less" scoped>
.img-cropper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 300px;
  .leftCropper {
    width: 42%;
    height: 100%;
    margin-right: 8%;
    .vue-cropper {
      width: 100%;
      height: 200px;
    }

    .cropper-tool {
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
    }
  }
  .rigCropper {
    width: 50%;
    height: 100%;
    display: flex;
    align-items: self-start;
    justify-content: center;

    :deep(.ant-image-img) {
      border-radius: 50%;
    }
    :deep(.ant-form-item .ant-upload) {
      color: #ff6b48;
      letter-spacing: 1px;
      font-size: 13px;
    }
  }
}
</style>
