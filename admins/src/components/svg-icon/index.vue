<template>
  <svg class="svg-icon" aria-hidden="true">
    <!-- <use :href="'#icon-'+iconName" /> -->
    <use href="#icon-baobiao" />
  </svg>
</template>

<script>
export default {
  name: 'svg-icon',
  props: {
    iconName: {
      type: String,
      default: '',
      require: true,
    },
  },
  setup () {
    //获取当前svg目录下的所有svg文件
    const req = require.context('@/assets/icons', false, /\.svg$/);
    //解析
    const requireAll = (requireContext) => {
      return requireContext.keys().map(requireContext);
    };
    requireAll(req);
  },
};
</script>
<style lang="scss" scoped>
.svg-icon {
  position: relative;
  width: 20px;
  height: 20px;
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