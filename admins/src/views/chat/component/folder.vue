<template>
  <div class="reports_li">
    <div class="reports_lis_all" v-for="items in floderList" :key="items.appid" @click.stop="floderLists(items,inx)">
      <div class="reports_tree">
        <div class="lt_icons">
          <svg-icon iconName="wenjianjia" />
          <span class="span_lable">{{items.display_name}}</span>
        </div>
        <div class="rt_handle">
          <span class="span_nums">个</span>
        </div>
      </div>

      <files v-if="items.showChildren" :filesList="items.contacts"></files>
      <!-- <files v-if="items.showChildren&&items.channel_credentials.length>0" :filesList="items.channel_credentials"></files> -->
      <!-- <grouplist v-if="items.showChildren" :grouplistData="items.children" :typesVal='types'></grouplist> -->
    </div>
  </div>
</template>

<script lang='ts'>
import files from "./files.vue";
import { reactive, onMounted, toRefs } from "vue";
export default {
  name: "folDers",
  props: {
    floderList: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    files,
  },
  setup() {
    const floderLists = (items, inx) => {
      items.showChildren = !items.showChildren;
      console.log("items", items);
    };
    // onMounted(() => {});
    return {
      floderLists,
    };
  },
};
</script>

<style scoped lang="scss">
.reports_li {
  position: relative;
  width: 100%;
  box-sizing: border-box;
  padding: 0px 7%;
  // display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #eceef5;
  cursor: pointer;
  .reports_lis_all {
    width: 100%;
  }
  .reports_tree {
    display: flex;
    width: 100%;
    height: 60px;
    align-items: center;
    border-bottom: 1px solid #eceef5;
    // justify-content: space-between;
    .lt_icons {
      display: flex;
      align-items: center;
    }
    .span_lable {
      padding-left: 0.24rem;
      font-size: 14px;
      color: #2a2a2a;
      font-weight: 600;
    }
    .rt_handle {
      font-size: 14px;
      position: absolute;
      right: 7%;
      color: #8f8f8f;
      .checkRido {
        padding-left: 0.32rem;
      }
    }
    .rt_h_active {
      right: 0.52rem !important;
    }
  }
}
</style>
