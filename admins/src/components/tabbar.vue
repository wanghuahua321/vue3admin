<template>
  <div class="tabBar">
    <div :class="activeKey==items.key? 'tabBar_li actives':'tabBar_li' " v-for="items in tabbraList" :key="items.key" @click="changeTabs(items)">
      {{items.title}}
    </div>

  </div>
</template>

<script lang='ts'>
import { reactive, onMounted, toRefs } from "vue";
export default {
  name: "tabBar",
  components: {},
  props: {
    tabbraList: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  setup(props, ctx) {
    const pageData = reactive({
      activeKey: "1",
    });
    const changeTabs = (val) => {
      pageData.activeKey = val.key;
      ctx.emit("choseTab", val);
    };

    onMounted(() => {});
    return {
      changeTabs,
      ...toRefs(pageData),
    };
  },
};
</script>

<style scoped lang="scss">
.tabBar {
  display: flex;
  width: 336px;
  height: 36px;
  border: 1px solid rgba(255, 107, 72, 1);
  border-radius: 10px;
  justify-content: space-between;
  .tabBar_li {
    width: 33%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: $mFontcolor;
  }

  .actives {
    height: 36px;
    background: #ff6b48;
    border-radius: 10px;
    position: relative;
    left: -1px;
    color: #fff;
  }
}
</style>
