<template>
  <div class="Homepage">
    <div class="banners">
      <h2>Hi，Mae Reeves</h2>
      <p>2022.02.22 12:22</p>
      <div class="banner_img">
        <!-- alt 是图片无法正常加载  鼠标hover 显示的值 -->
        <img src="@/assets/images/main.png" alt="" title="" />
      </div>
      <div class="infos">
        <div class="newsInfo">

          <p>最新信息</p>
          <div class="newsInfo_cons">
            <!-- <a-carousel> -->
            <div class="person_info" v-for="item in 5" :key="item">
              <span class="points"></span>
              <div class="p_info_left"> tupian </div>
              <div class="p_info_rig">
                <div class="prig_tit">
                  <p>雒君山</p>
                  <span>2月3日</span>
                </div>
                <span class="p_content">主管要学会三个方向的沟通：向上沟通向下沟…</span>
              </div>
            </div>

            <!-- </a-carousel> -->
          </div>
        </div>
        <div class="platform">
          <p>集成平台</p>
          <div class="platform_con">
            <div class="platform_item" v-for="items in 5" :key="items">
              <div class="plat_img"></div>
              <span class="plat_span">dsadsa;dkada</span>
            </div>
          </div>
        </div>

      </div>

    </div>
    <div class="banner_right">
      <div class="calendar">
        <a-calendar v-model:value="calendarValue" @panelChange="onPanelChange" />
      </div>
      <div class="recommend">
        <p class="recommend_p">2022年1月13日 推送</p>
        <div class="recommend_item" v-for="items in 5" :key="items">
          <div class="r_item_imgs">tupian </div>
          <div class="r_item_conts">
            <p>FB-messenger</p>
            <span>发布5条帖子</span>
          </div>
          <div class="elipses">
            ...
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { reactive, onMounted, toRefs } from "vue";
import { Moment } from "moment";
export default {
  name: "homeRig",
  components: {},
  setup() {
    const pagesDatas = reactive<any>({
      calendarValue: "",
    });
    const onPanelChange = (value: Moment, mode: string) => {
      console.log(value, mode);
    };
    onMounted(() => {});
    return {
      ...toRefs(pagesDatas),
      onPanelChange,
    };
  },
};
</script>

<style scoped lang="scss">
.ant-carousel :deep(.slick-slide) {
  // text-align: center;
  // height: 160px;
  // line-height: 160px;
  background: #364d79;
  overflow: hidden;
}

.ant-carousel :deep(.slick-slide h3) {
  color: #fff;
}
.ant-fullcalendar-fullscreen :deep(.ant-fullcalendar-date) {
  height: 36px;
  width: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  border-top: 0px;
}
.ant-fullcalendar-fullscreen:deep(.ant-fullcalendar-column-header) {
  padding-left: 12px;
  padding-bottom: 5px;
  text-align: left;
}
.calendar :deep(.ant-fullcalendar-header) {
  display: flex;
  padding: 0px 16px 11px 0;
}
.calendar :deep(.ant-fullcalendar-calendar-body) {
  padding: 2px 0px !important;
}

.Homepage {
  display: flex;
  width: 100%;
  .banners {
    width: 68%;
    margin-right: 3%;
    h2 {
      color: $mFontcolor;
      font-size: 26px;
    }
    p {
      color: $cFontcolor;
      font-size: 14px;
      margin-bottom: 0em;
    }
    .banner_img {
      width: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }

    .infos {
      display: flex;
      width: 100%;
      justify-content: space-between;
      padding: 6px 0px 14px 0px;
      p {
        font-size: 14px;
        color: $cFontcolor;
        padding: 6px 0px 14px 0px;
      }
      .newsInfo {
        width: 46%;
        // border: 1px solid;
        .newsInfo_cons {
          box-sizing: border-box;
          padding: 0 4.5%;
          background: #fff;
        }
        .person_info {
          display: flex !important;
          // width: 91% !important;
          margin: 0 auto;
          align-items: center;
          padding-top: 12px;

          .points {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #5561ff;
          }
        }
        .p_info_left {
          width: 34px;
          height: 34px;
          border: 1px solid;
          margin: 0px 16px;
          border-radius: 5px;
        }
        .p_info_rig {
          // padding-left: 16px;
          .prig_tit {
            display: flex;
            justify-content: space-between;
            align-items: center;
            p {
              font-size: 14px;
              color: $mFontcolor;
            }
            span {
              font-size: 12px;
              color: $cFontcolor;
            }
          }
          .p_content {
            font-size: 12px;
            color: $cFontcolor;
          }
        }
      }
      .platform {
        width: 52%;
        .platform_con {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          &::after {
            content: "";
            width: 31.5%;
          }
          // background: #fff;
          .platform_item {
            width: 31.5%;
            height: 138px;
            background: #fff;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin-bottom: 10px;

            .plat_img {
              width: 46px;
              height: 46px;
              border: 1px solid;
            }
            .plat_span {
            }
          }
        }
      }
    }
  }

  .banner_right {
    width: 29%;
    box-sizing: border-box;
    // padding-left: 32px;
    .calendar {
      width: 96%;
      margin: 0 auto;
      height: 312px;
    }

    .recommend {
      .recommend_p {
        color: $mFontcolor;
        font-size: 14px;
        font-weight: 700;
      }
      .recommend_item {
        width: 100%;
        height: 70px;
        background: #ffffff;
        border-radius: 12px;
        display: flex;
        box-sizing: border-box;
        padding: 0px 6%;
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        .r_item_imgs {
          width: 40px;
          height: 40px;
          border: 1px solid;
          margin: 0% 25px;
        }
        .r_item_conts {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
      }
    }
  }
}
</style>
