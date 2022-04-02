<template>
  <div class="reports_lis">
    <div class="reports_lis_alls" v-for="items in floderList" :key="items.appid" @click.stop="floderLists(items,inx)">
      <div :class="items.showChildren? 'reports_tree borders': 'reports_tree'">
        <div class="lt_icons">
          <svg-icon iconName="wenjianjia" />
          <span class="span_lable">{{items.channel}}</span>
        </div>
        <div class="rt_handle">
          <span class="span_nums">{{items.contacts.length}}条</span>
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
.borders {
  border-bottom: 1px solid #eceef5;
}
.reports_lis {
  position: relative;
  width: 100%;

  justify-content: space-between;
  align-items: center;
  // border-bottom: 2px solid #eceef5;
  cursor: pointer;
  .reports_lis_alls {
    width: 100%;
  }
  .reports_tree {
    display: flex;
    width: 100%;
    box-sizing: border-box;
    // display: flex;
    padding: 0px 9%;
    height: 42px;
    align-items: center;
    &:hover {
      background: $hoverMine;
    }
    // justify-content: space-between;
    .lt_icons {
      display: flex;
      align-items: center;
    }
    .span_lable {
      padding-left: 6px;
      font-size: 12px;
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
