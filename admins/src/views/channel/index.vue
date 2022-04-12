<template>
  <div class="channel">
    <div>
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="全部">
          <div class="channels">
            <div class="channels_item">
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

          <modalCon>
            <template #modalCon>
              <div>
                <a-form ref="formRef" :model="formState" :rules="rules">
                  <a-form-item label="Activity name" name="name">
                    <a-input v-model:value="formState.name" />
                  </a-form-item>
                  <a-form-item label="Sub name" :name="['sub', 'name']">
                    <a-input v-model:value="formState.sub.name" />
                  </a-form-item>
                  <!-- <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
                    <a-button type="primary" @click="onSubmit">Create</a-button>
                    <a-button style="margin-left: 10px" @click="resetForm">Reset</a-button>
                  </a-form-item> -->
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
    });

    const rules = {
      name: {
        required: true,
        message: "Please input name",
      },
      sub: {
        name: [
          {
            required: true,
            message: "Please input name",
          },
        ],
      },
    };

    const onSubmit = () => {
      formRef.value
        .validate()
        .then(() => {
          console.log("values");
        })
        .catch((error) => {
          console.log("error", error);
        });
    };
    const resetForm = () => {
      formRef.value.resetFields();
    };

    const addchannel = () => {
      console.log("dinji");
    };
    onMounted(() => {});
    return {
      addchannel,
      onSubmit,
      resetForm,
      rules,
      ...toRefs(pagedata),
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
</style>
