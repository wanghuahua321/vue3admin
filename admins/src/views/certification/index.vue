<template>
  <!-- 身份认证 -->
  <div class="certiFication">
    <!-- 射特菲可渗 认证 -->
    <tabbar :tabbraList="tabbraList" @choseTab="choseTab"></tabbar>
    <div class="certCont">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang='ts'>
import { reactive, onMounted, toRefs, watch } from "vue";
import tabbar from "@/components/tabbar.vue";
export default {
  name: "certiFication",
  components: {
    tabbar,
  },
  setup() {
    const pageData = reactive({
      tabbraList: [
        {
          key: "1",
          title: "角色",
        },
        {
          key: "2",
          title: "用户",
        },
        {
          key: "3",
          title: "租户",
        },
      ],
      choseOne: {
        key: "1",
        title: "角色",
      },
    });
    const choseTab = (data) => {
      pageData.choseOne = data;
    };

    watch(
      () => pageData.choseOne,
      (newsvalue) => {
        console.log("newsssss", newsvalue);
      }
    );
    onMounted(() => {});
    return {
      ...toRefs(pageData),
      choseTab,
    };
  },
};
</script>

<style scoped lang="scss">
</style>
