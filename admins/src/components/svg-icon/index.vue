<template>
  <div>
    <svg class="svg-icon" aria-hidden="true">
      <use :xlink:href="iconNames"></use>

    </svg>
  </div>
</template>

<script lang='ts'>
import { ref } from "vue";
export default {
  name: "svg-icon",
  props: ["iconName"],
  components: {},
  setup(props, ctx) {
    const iconNames = ref(props.iconName);
    console.log("iconNames", iconNames);

    //获取当前svg目录下的所有svg文件
    const req = require.context("@/assets/icons", false, /\.svg$/);
    //解析
    const requireAll = (requireContext) => {
      return requireContext.keys().map(requireContext);
    };
    requireAll(req);

    return { iconNames };
  },
};
</script>

<style scoped lang="scss">
.svg-icon {
  position: relative;
  width: 40px;
  height: 40px;
  overflow: hidden;
  vertical-align: -0.15em;
  fill: currentColor;
  max-width: 100%;
  max-height: 100%;
  &::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    pointer-events: none;
    cursor: pointer;
    content: "";
  }
}
</style>