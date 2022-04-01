<template>
  <div class="grouplist">
    <div class="baobiao_lis" v-for="items in filesList" :key="items.appid">
      <div class="lt_icons">
        <svg-icon iconName="baobiao" />
      </div>
      <div class="defby_Self">
        <p class="dep">{{items.channel}}</p>
        <div class="def_handle">
          <span>456</span>
          <i class="browse">
            <svg-icon iconName="2-3liulan" />
            777
          </i>

        </div>

      </div>
    </div>

  </div>
</template>

<script lang='ts'>
import { reactive, onMounted, toRefs } from "vue";
export default {
  name: "fiLes",
  props: {
    filesList: {
      type: Array,
      default: () => [],
    },
  },
  components: {},
  setup() {
    // onMounted(() => {});
    return {};
  },
};
</script>

<style scoped lang="scss">
.grouplist {
  .baobiao_lis {
    display: flex;
    width: 100%;
    height: 60px;
    align-items: center;
    margin-left: 3%;
    .defby_design {
      padding-left: 0.24rem;
    }
    .defby_Self {
      padding-left: 0.24rem;
      // display: flex;
      // width: 100%;
      .dep {
        text-align: left;
        font-size: 13px;
        line-height: 0.36rem;
        font-weight: 700;
        color: #2a2a2a;
      }
      .def_handle {
        display: flex;
        // padding-left: 0.42rem;
        font-size: 0.22rem !important;
        color: #7c7f95 !important;
        font-weight: 400;
        align-items: center;
        .browse {
          padding: 0px 0.18rem 0px 0.36rem;
          min-width: 1.5rem;
        }
        .svg-icon {
          margin: 0px 0.1rem;
          position: relative;
          top: -0.03rem;
          max-width: inherit !important;
          width: 0.32rem;
          &:nth-child(2) {
            top: 0.08rem;
          }
        }
        span {
          position: relative; /*定位横线（当横线的父元素）*/
          &::after {
            content: ""; /*CSS伪类用法*/
            position: absolute; /*定位背景横线的位置*/
            top: 25%;
            background: #7c7f95; /*宽和高做出来的背景横线*/
            width: 1px;
            height: 50%;
            margin-left: 0.16rem;
          }
        }
        i {
          font-style: normal;

          display: flex;
          align-items: center;
        }
        b {
          font-weight: normal;
          display: flex;
          align-items: center;
        }
      }
    }
  }
}
</style>
