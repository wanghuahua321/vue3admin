<template>
  <div class="channel">
    <!-- <div style="backgroud: #ccc;">
      <svg-icon iconName="身份_ico_wx" />
      <svg-icon iconName="身份_ico_xz" />
      <svg-icon iconName="bj" />
      <svg-icon iconName="fangda_14" />

      <svg-icon iconName="glgn" />
      <svg-icon iconName="glljzfc" />
      <svg-icon iconName="logo_huise" />
      <svg-icon iconName="logo" />
      <svg-icon iconName="qx" />
      <svg-icon iconName="sc_13" />
      <svg-icon iconName="sc_17" />
      <svg-icon iconName="shuaxin_14" />
      <svg-icon iconName="suoxiao_14" />

      <svg-icon iconName="sx" />
      <svg-icon iconName="tishi" />
      <svg-icon iconName="xj" />

      <svg-icon iconName="sp" />
      <svg-icon iconName="tu" />

      <svg-icon iconName="tp" />
      <svg-icon iconName="wj" />
      <svg-icon iconName="zhanghao" />
      <svg-icon iconName="mima" />
    </div> -->
    <div>
      <tabbar :tabbraList="tabbraList" @choseTab="choseTab" activeKeys="alls"></tabbar>

      <div v-if="choseOne.key=='alls'" class="channels">
        <div class="channels_item">
          <div class="c_tit">
            <img src="@/assets/images/facebook.png" alt="" title="" />
          </div>
          <div class="c_cont">
            <h2>Facebook Messenger</h2>
            <p>1分钟完成配置</p>
          </div>
          <div class="addchan">
            <a-button type="primary" @click="addchannel('news','')">添加</a-button>
          </div>
        </div>

      </div>

      <div v-else-if="choseOne.key=='mines' " class="mychannel">
        <div class="my_items" v-for="items in channelData" :key="items.id">
          <div class="left_img">
            <img src="@/assets/images/facebook.png" alt="" title="" />
          </div>
          <div class="rig_cont">
            <h2 class="r_tit">Facebook Messenger</h2>
            <dl class="my_info">
              <dt>名称:</dt>
              <dd>{{items.name}}</dd>
            </dl>
            <dl class="my_info">
              <dt>最近修改:</dt>
              <dd>{{items.editDate}}</dd>
            </dl>

          </div>

          <div class="handles">
            <a-button @click="addchannel('edit',items)" shape="round">
              <template #icon>
                <EditOutlined />
                修改
              </template>
            </a-button>
            <a-button @click="addchannel('delete',items)" shape="circle">
              <template #icon>
                <DeleteOutlined />
                删除
              </template>
            </a-button>
          </div>
        </div>

      </div>

      <modalCon :showDialogue="showDialogue" @closeDia="closeDia" @confimAdd="confimAdd">
        <template #modalCon>
          <div v-if="dialogType=='delete'" class="diaforms">
            确定删除该渠道？
          </div>
          <div v-else class="diaforms">
            <a-form ref="formRef" :model="dialogueData" :rules="rules">
              <a-form-item label="name" name="name">
                <a-input v-model:value="dialogueData.name" placeholder="请输入渠道名称" />
              </a-form-item>
              <a-form-item label="emailorphoneno" :name="['channelConfiguration','EmailorPhoneNo']">
                <a-input v-model:value="dialogueData.channelConfiguration.EmailorPhoneNo" placeholder="请输入账号" />
              </a-form-item>
              <a-form-item label="PassWord" :name="['channelConfiguration','PassWord']">
                <a-input v-model:value="dialogueData.channelConfiguration.PassWord" placeholder="请输入密码" />
              </a-form-item>

              <a-form-item label="FBApp_Key" :name="['channelConfiguration','FBApp_Key']">
                <a-input v-model:value="dialogueData.channelConfiguration.FBApp_Key" placeholder="请输入EmailorPhoneNo" />
              </a-form-item>
              <a-form-item label="FBApp_Secret" :name="['channelConfiguration','FBApp_Secret']">
                <a-input v-model:value="dialogueData.channelConfiguration.FBApp_Secret" placeholder="请输入FBApp_Secret" />
              </a-form-item>
              <a-form-item label="FBUserAccessToken" :name="['channelConfiguration','FBUserAccessToken']">
                <a-input v-model:value="dialogueData.channelConfiguration.FBUserAccessToken" placeholder="请输入FBUserAccessToken" />
              </a-form-item>

              <a-form-item label="appId" name="appId">
                <a-input v-model:value="dialogueData.appId" placeholder="请输入appId" />
              </a-form-item>
              <a-form-item label="projectId" name="projectId">
                <a-input v-model:value="dialogueData.projectId" placeholder="请输入projectId" />
              </a-form-item>
              <a-form-item label="sinchUsername" name="sinchUsername">
                <a-input v-model:value="dialogueData.sinchUsername" placeholder="请输入sinchUsername" />
              </a-form-item>
              <a-form-item label="sinchPassword" name="sinchPassword">
                <a-input v-model:value="dialogueData.sinchPassword" placeholder="请输入sinchPassword" />
              </a-form-item>

            </a-form>
          </div>
        </template>
      </modalCon>
    </div>

  </div>
</template>

<script lang='ts'>
import { reactive, onMounted, toRefs, ref, markRaw } from "vue";
import modalCon from "@/components/modalCon.vue";
import { channels } from "@/utils/api";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import tabbar from "@/components/tabbar.vue";
export default {
  name: "channelIndex",
  components: {
    modalCon,
    EditOutlined,
    DeleteOutlined,
    tabbar,
  },
  setup() {
    const formRef = ref();
    const pagedata = reactive({
      formState: {
        name: undefined,
        sub: { name: undefined },
      },
      channelData: [],
      showDialogue: false,
      dialogueData: {
        name: "",
        channelValue: 0,
        channelConfiguration: {
          EmailorPhoneNo: "",
          PassWord: "",
          FBApp_Key: "",
          FBApp_Secret: "",
          FBUserAccessToken: "",
        },
        appId: "",
        projectId: "",
        sinchUsername: "",
        sinchPassword: "",
      },
      formData: {}, //处理后要新增的值
      dialogType: "",
      seletItems: {},
      seletItemsId: "",
      tabbraList: [
        {
          key: "alls",
          title: "全部",
        },
        {
          key: "mines",
          title: "我的",
        },
      ],
      choseOne: {
        key: "alls",
        title: "全部",
      },
      showCom: "alls",
    });

    const rules = {
      name: {
        required: true,
        message: "Please input name",
      },
      channelConfiguration: {
        PassWord: {
          required: true,
          message: "Please input password",
        },
        EmailorPhoneNo: {
          required: true,
          message: "Please input emailorphoneno",
        },
        FBApp_Key: {
          required: true,
          message: "Please input FBApp_Key",
        },
        FBApp_Secret: {
          required: true,
          message: "Please input FBApp_Secret",
        },
        FBUserAccessToken: {
          required: true,
          message: "Please input FBUserAccessToken",
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

    const addchannel = (type, value) => {
      pagedata.dialogType = type;
      pagedata.seletItems = value;
      pagedata.seletItemsId = value.id;
      if (pagedata.dialogType == "edit") {
        getOneChannel();
      }
      pagedata.showDialogue = true;
    };
    const confimAdd = () => {
      let formData = JSON.parse(JSON.stringify(pagedata.dialogueData));
      (formData as any).channelConfiguration = JSON.stringify(
        formData.channelConfiguration
      );

      pagedata.formData = formData;
      if (pagedata.dialogType == "delete") {
        deleteData();
      } else {
        formRef.value
          .validate()
          .then(() => {
            if (pagedata.dialogType == "news") {
              addChannels();
            } else if (pagedata.dialogType == "edit") {
              editInterface();
            }
          })
          .catch((error) => {
            console.log("error", error);
          });
      }
    };
    const closeDia = () => {
      // 取消按钮
      pagedata.showDialogue = false;
      formRef.value.resetFields();
    };

    onMounted(() => {
      // loadData();
    });

    const myloadData = () => {
      channels
        .getChannel()
        .then((res) => {
          pagedata.channelData = res.items;
        })
        .catch((error) => {});
    };

    const deleteData = () => {
      /* 删除操作 */
      channels
        .delChannel(pagedata.seletItemsId)
        .then((res) => {
          if (res.isSuccess) {
            message.success(res.message);
            pagedata.showDialogue = false;
            myloadData();
          }
        })
        .catch((error) => {});
    };

    const getOneChannel = () => {
      //修改前获取某一个信息
      channels
        .getChannelId(pagedata.seletItemsId)
        .then((res) => {
          let formDatas = JSON.parse(res.channelConfiguration);
          pagedata.dialogueData = res;
          pagedata.dialogueData.channelConfiguration = formDatas;
        })
        .catch((error) => {});
    };

    const addChannels = () => {
      channels
        .addChannel(pagedata.formData)
        .then((res) => {
          message.success("新增渠道成功");
          pagedata.showDialogue = false;
          formRef.value.resetFields();
        })
        .catch((error) => {});
    };

    const editInterface = () => {
      channels
        .updataChannel(pagedata.seletItemsId, pagedata.formData)
        .then((res) => {
          message.success("修改成功");
          myloadData();
          pagedata.showDialogue = false;
        })
        .catch((error) => {});
    };

    const changeTab = (val) => {
      if (val == 2) {
        myloadData();
      }
    };
    const choseTab = (data) => {
      pagedata.choseOne = data;
      if (data.key == "mines") {
        myloadData();
      }
    };

    return {
      addchannel,
      confimAdd,
      rules,
      ...toRefs(pagedata),
      myloadData,
      closeDia,
      formRef,
      deleteData,
      changeTab,
      getOneChannel,
      addChannels,
      editInterface,
      choseTab,
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
    min-width: 160px;
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
    width: 28%;
  }
}

.mychannel {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  padding-top: 20px;

  .my_items {
    width: 23.5%;
    height: 172px;
    min-width: 286px;
    background: #ffffff;
    border-radius: 12px;
    margin-right: 2%;
    box-sizing: border-box;
    margin-bottom: 28px;
    padding: 22px;
    display: flex;
    position: relative;
    box-shadow: 0px 0px 6px 0px rgba(214, 189, 179, 0.61);
    &:nth-child(4n) {
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
          font-weight: 700;
        }
        dd {
          font-size: 13px;
          color: #3e414a;
        }
      }
    }

    .handles {
      display: flex;
      justify-content: space-between;
      padding-top: 15px;
      position: absolute;
      width: 85%;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      :deep(.ant-btn) {
        width: 36%;
        border-radius: 4px;
      }
    }
  }
}
</style>
