<template>
  <div class="channel">
    <!-- <div style="backgroud: #ccc;">
      <svg-icon iconName="huiyuan2" />
      <svg-icon iconName="liaotian2" />
      <svg-icon iconName="pingtai2" />
      <svg-icon iconName="shanchu" />
      <svg-icon iconName="shezhi2" />

      <svg-icon iconName="shouye2" />
      <svg-icon iconName="tixing" />
      <svg-icon iconName="tupian" />
      <svg-icon iconName="wenjian" />
      <svg-icon iconName="yuyan" />

            <svg-icon iconName="wenjian" />
      <svg-icon iconName="yuyan" />
    </div> -->

    <div>
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="全部">
          <div class="channels">
            <div class="channels_item" v-for="(item,inx) in channelData" :key="inx">
              <div class="c_tit">
                <img src="@/assets/images/facebook.png" alt="" title="" />
              </div>
              <div class="c_cont">
                <h2>Facebook Messenger</h2>
                <p>1分钟完成配置</p>
              </div>
              <div class="addchan">
                <a-button type="primary" @click="addchannel">添加</a-button>
              </div>
            </div>

          </div>

          <modalCon :showDialogue="showDialogue" @closeDia="closeDia" @confimAdd="confimAdd">
            <template #modalCon>
              <div class="diaforms">
                <a-form ref="formRef" :model="dialogueData" :rules="rules">
                  <a-form-item label="name" name="name">
                    <a-input v-model:value="dialogueData.name" />
                  </a-form-item>
                  <a-form-item label="emailorphoneno" :name="['channelConfiguration','emailorphoneno']">
                    <a-input v-model:value="dialogueData.channelConfiguration.emailorphoneno" />
                  </a-form-item>
                  <a-form-item label="password" :name="['channelConfiguration','password']">
                    <a-input v-model:value="dialogueData.channelConfiguration.password" />
                  </a-form-item>

                  <a-form-item label="appId" name="appId">
                    <a-input v-model:value="dialogueData.appId" />
                  </a-form-item>
                  <a-form-item label="projectId" name="projectId">
                    <a-input v-model:value="dialogueData.projectId" />
                  </a-form-item>
                  <a-form-item label="sinchUsername" name="sinchUsername">
                    <a-input v-model:value="dialogueData.sinchUsername" />
                  </a-form-item>
                  <a-form-item label="sinchPassword" name="sinchPassword">
                    <a-input v-model:value="dialogueData.sinchPassword" />
                  </a-form-item>

                </a-form>
              </div>
            </template>
          </modalCon>

        </a-tab-pane>
        <a-tab-pane key="2" tab="我的" force-render>

          <div class="mychannel">
            <div class="my_items">
              <div class="left_img">
                <img src="@/assets/images/facebook.png" alt="" title="" />
              </div>
              <div class="rig_cont">
                <h2 class="r_tit">Facebook Messenger</h2>
                <dl class="my_info">
                  <dt>名称:</dt>
                  <dd>Fashion & Fancy</dd>
                </dl>
                <dl class="my_info">
                  <dt>ID:</dt>
                  <dd>100576222122289</dd>
                </dl>

                <div class="handles">

                  <a-button type="primary" shape="circle">
                    <template #icon>
                      <DownloadOutlined />
                    </template>
                  </a-button>
                  <a-button type="primary" shape="circle">
                    <template #icon>
                      <DownloadOutlined />
                    </template>
                  </a-button>
                </div>

              </div>
            </div>
            <div class="my_items">
              1
            </div>
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>

  </div>
</template>

<script lang='ts'>
import { reactive, onMounted, toRefs, ref } from "vue";
import modalCon from "@/components/modalCon.vue";
import { channels } from "@/utils/api";
import { DownloadOutlined } from "@ant-design/icons-vue";
export default {
  name: "channelIndex",
  components: {
    modalCon,
    DownloadOutlined,
  },
  setup() {
    const formRef = ref();
    const pagedata = reactive({
      activeKey: "1",
      formState: {
        name: undefined,
        sub: { name: undefined },
      },
      channelData: [],
      showDialogue: false,
      dialogueData: {
        name: "facebook123",
        channelValue: "FacebookMessenger",
        channelConfiguration: {
          emailorphoneno: "1638029480@qq.com",
          password: "Pass@word1",
        },
        appId: "01FXRNXY02TEX69Z81KJP5NKXY",
        projectId: "2c7d361d-eac5-46e3-948a-548eee9e1508",
        sinchUsername: "417a75d3-4754-4ef4-86cc-2597e2aef84a",
        sinchPassword: "mgBnUQcHkEWqz5XBkXkjaW9vcU",
      },
    });

    const rules = {
      name: {
        required: true,
        message: "Please input name",
      },
      channelConfiguration: {
        password: {
          required: true,
          message: "Please input password",
        },
        emailorphoneno: {
          required: true,
          message: "Please input emailorphoneno",
        },
      },
      projectId: {
        required: true,
        message: "Please input projectId",
      },
      appId: {
        required: true,
        message: "Please input appId",
      },
      sinchUsername: {
        required: true,
        message: "Please input sinchUsername",
      },
      sinchPassword: {
        required: true,
        message: "Please input sinchPassword",
      },
    };

    const resetForm = () => {
      formRef.value.resetFields();
    };

    const addchannel = () => {
      pagedata.showDialogue = true;
    };
    const confimAdd = () => {
      //确认按钮
      // pagedata.showDialogue = false;
      (pagedata.dialogueData as any).channelConfiguration = JSON.stringify(
        pagedata.dialogueData.channelConfiguration
      ); //处理字段

      // formRef.value
      //   .validate()
      //   .then(() => {
      //     console.log("dialogueData", JSON.stringify(pagedata.dialogueData));

      //     // channels
      //     //   .addChannel(pagedata.dialogueData)
      //     //   .then((res) => {
      //     //     console.log("chuangjian");
      //     //   })
      //     //   .catch((error) => {});
      //   })
      //   .catch((error) => {
      //     console.log("error", error);
      //   });
    };
    const closeDia = () => {
      // 取消按钮
      pagedata.showDialogue = false;
    };

    onMounted(() => {
      loadData();
    });

    const loadData = () => {
      channels
        .getChannel()
        .then((res) => {
          pagedata.channelData = res.items;
          pagedata.channelData.map((res: any) => {
            res.channelConfiguration = JSON.parse(res.channelConfiguration);
          });
        })
        .catch((error) => {});
    };
    return {
      addchannel,
      resetForm,
      confimAdd,
      rules,
      ...toRefs(pagedata),
      loadData,
      closeDia,
      formRef,
    };
  },
};
</script>

<style scoped lang="scss">
.channels {
  display: flex;
  margin-top: 54px;
  .channels_item {
    width: 14%;
    height: 220px;
    border: 1px solid #e1e3eb;
    margin-right: 16px;
    background: #ffffff;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    .c_tit {
      width: 56px;
      height: 56px;
      position: relative;
      top: -28px;
      img {
        width: 100%;
      }
    }
    .c_cont {
      h2 {
        font-size: 14px;
        color: #3e414a;
        line-height: 20px;
        font-weight: 500;
      }

      p {
        font-size: 12px;
        color: #9fa4bb;
        text-align: center;
        font-weight: 400;
      }
    }

    .addchan {
      width: 80%;
      position: absolute;
      bottom: 27px;
    }
  }
}
.ant-btn {
  width: 100%;
  border-radius: 8px;
}
.diaforms {
  :deep(.ant-form-item-control-input) {
    width: 86%;
    margin: 0 7%;
  }
  :deep(.ant-form-horizontal .ant-form-item-label) {
    width: 21%;
  }
}

.mychannel {
  width: 100%;
  height: 100%;
  display: flex;

  .my_items {
    width: 23%;
    height: 172px;
    min-width: 286px;
    background: #ffffff;
    border-radius: 12px;
    margin-right: 16px;
    box-sizing: border-box;
    padding: 22px;
    display: flex;
    box-shadow: 0 0 4px 1px rgba(73, 77, 81, 0.2);
    :nth-child(4n) {
      margin-right: 0% !important;
    }

    .left_img {
      width: 56px;
      height: 56px;
      img {
        width: 100%;
      }
    }

    .rig_cont {
      width: calc(100% - 76px);
      margin-left: 20px;
      .r_tit {
        font-size: 15px;
        color: #3e414a;
        line-height: 20px;
        font-weight: 600;
      }

      .my_info {
        display: flex;
        padding-top: 10px;
        dt {
          font-size: 12px;
          color: #9fa4bb;
          min-width: 23%;
        }
        dd {
          font-size: 13px;
          color: #3e414a;
        }
      }

      .handles {
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
</style>
