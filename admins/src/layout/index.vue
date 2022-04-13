<template>
  <div class="manage-container">
    <div class="con-left">
      <leftpannel @menuSel="menuSel"></leftpannel>
    </div>
    <div class="con-rig">
      <div class="cont_tit">
        <Navbar></Navbar>
      </div>
      <div class="conRig_con">
        <router-view></router-view>
      </div>
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
    width: 7%;
    min-width: 86px;
  }
  .con-rig {
    width: 100%;
    background: #f8f9fb;
    .cont_tit {
      width: 100%;
    }

    .conRig_con {
      width: 93%;
      margin: 0 auto;
      box-sizing: border-box;
      padding-right: 1%;
      margin-top: 30px;
      height: calc(100vh - 115px);
    }
  }
}
</style>
