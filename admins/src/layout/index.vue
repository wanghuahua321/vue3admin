<template>
  <div class="manage-container">
    <div class="con-left">
      <leftpannel @menuSel="menuSel"></leftpannel>
    </div>
    <div class="con-rig">
      <div class="cont_tit">
        <Navbar></Navbar>
      </div>
      <router-view></router-view>
    </div>
  </div>

</template>
<script lang='ts'>
// import { reactive, onMounted, toRefs } from "vue";
import { reactive, toRefs, watch } from "vue";
import leftpannel from "./leftpannel.vue";
import { useRouter } from "vue-router";
import Navbar from "./Navbar.vue";
export default {
  name: "homeIndex",
  components: {
    leftpannel,
    Navbar,
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
  width: 100%;
  .con-left {
    width: 130px;
  }
  .con-rig {
    width: 100%;
    .cont_tit {
      width: 100%;
    }
  }
}
</style>
