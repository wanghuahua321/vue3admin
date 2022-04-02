<template>
  <div class="grouplist">
    <div class="baobiao_lis" v-for="items in filesList" :key="items.appid" @click.stop="filesItem(items)">
      <div class="lt_icons">
        <svg-icon iconName="baobiao" />
      </div>
      <div class="defby_Self">
        <div class="chatname">
          <b>{{items.display_name}}</b>
          <p> {{items.lastMessage.message.lastMessageDateStr}}</p>
        </div>
        <div class="chatMsg">
          <p>{{items.lastMessage.message.text || "--"}}</p>
        </div>

      </div>
    </div>

  </div>
</template>

<script lang='ts'>
import { reactive, onMounted, toRefs } from "vue";
import { useStore } from "vuex";
export default {
  name: "fiLes",
  props: {
    filesList: {
      type: Array,
      default: () => [],
    },
  },
  components: {},
  setup(props, ctx) {
    // onMounted(() => {});

    const store = useStore();

    const filesItem = (items) => {
      // console.log("itemsddddd", items);
      // ctx.emit("chatPer", items);
      store.commit("setChatPerson", items);
    };
    return {
      filesItem,
    };
  },
};
</script>

<style scoped lang="scss">
.grouplist {
  width: 100%;

  .baobiao_lis {
    display: flex;
    width: 100%;
    height: 52px;
    align-items: center;
    box-sizing: border-box;
    padding: 0px 9%;
    &:hover {
      background: $hoverMine;
    }
    .defby_design {
      padding-left: 8px;
    }
    .defby_Self {
      padding-left: 8px;
      width: 100%;
      .chatname {
        display: flex;
        width: 100%;
        justify-content: space-between;
        p {
          color: #999999;
        }
      }
      .chatMsg {
        width: 100%;
        p {
          color: #999999;
          width: 96%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
</style>
