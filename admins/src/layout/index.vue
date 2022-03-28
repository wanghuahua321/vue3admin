<template>
  <div class="manage-container">
    <div class="con-left">
      <leftpannel @menuSel="menuSel"></leftpannel>
    </div>
    <div class="con-rig">
      <router-view></router-view>
    </div>
  </div>

</template>
<script lang='ts'>
// import { reactive, onMounted, toRefs } from "vue";
import { reactive, toRefs, watch } from "vue";
import leftpannel from "./leftpannel.vue";
import { useRouter } from "vue-router";

export default {
  name: "homeIndex",
  components: {
    leftpannel,
  },
  setup() {
    const router = useRouter();

    const menuSel = (item) => {
      console.log("router", item);
      router.push({
        name: item,
      });
    };
    return {
      menuSel,
    };
  },
};
</script>

<style scoped lang="scss">
.manage-container {
  display: flex;
}
</style>
