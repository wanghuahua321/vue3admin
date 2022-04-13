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
        <a-tab-pane key="2" tab="我的" force-render>Content of Tab Pane 2</a-tab-pane>
      </a-tabs>
    </div>

  </div>
</template>

<script lang='ts'>
import { reactive, onMounted, toRefs, ref } from "vue";
import modalCon from "@/components/modalCon.vue";
import { channels } from "@/utils/api";
import { tuple } from "ant-design-vue/lib/_util/type";
export default {
  name: "channelIndex",
  components: {
    modalCon,
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
</style>
