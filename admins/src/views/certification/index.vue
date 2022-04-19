<template>
  <!-- 身份认证 -->
  <div class="certiFication">
    <!-- 射特菲可渗 认证 -->
    <div class="tops">
      <tabbar :tabbraList="tabbraList" @choseTab="choseTab"></tabbar>

      <div class="certsRig">
        <a-button class="antActive">
          <template #icon>
            <div class="btns" @click="addRoles()">
              <svg-icon iconName="xj" />
              新建角色
            </div>
          </template>
        </a-button>

        <a-button>
          <template #icon>
            <div class="btns">
              <svg-icon iconName="sx" />
              刷新
            </div>
          </template>
        </a-button>
      </div>
    </div>

    <div class="certCont">
      <router-view>
        <component :is="showCom" :dialogMsgs="dialogMsg" @closedia="closedia" @editDialog="editDialog"></component>
      </router-view>
    </div>

  </div>
</template>

<script lang='ts'>
import { reactive, onMounted, toRefs, watch } from "vue";
import tabbar from "@/components/tabbar.vue";
import role from "./roles/role.vue";
import user from "./users/user.vue";
import tenant from "./tenants/tenant.vue";
import { DownloadOutlined } from "@ant-design/icons-vue";
export default {
  name: "certiFication",
  components: {
    tabbar,
    role,
    user,
    tenant,
    DownloadOutlined,
  },
  setup() {
    const pageData = reactive({
      tabbraList: [
        {
          key: "role",
          title: "角色",
        },
        {
          key: "user",
          title: "用户",
        },
        {
          key: "tenant",
          title: "租户",
        },
      ],
      choseOne: {
        key: "role",
        title: "角色",
      },
      showCom: "role",
      dialogMsg: {
        isAdd: true,
        addTit: "新建角色",
        addvisible: false,
        confirmLoading: false,
      },
    });
    const choseTab = (data) => {
      pageData.choseOne = data;
    };
    const addRoles = () => {
      pageData.dialogMsg.addvisible = true;
    };
    const closedia = () => {
      pageData.dialogMsg.addvisible = false;
    };
    const editDialog = (params) => {
      pageData.dialogMsg = params;
      addRoles();
    };

    watch(
      () => pageData.choseOne,
      (newsvalue) => {
        pageData.showCom = newsvalue.key;
      }
    );

    const handleOk = () => {};
    const handleCancel = () => {};
    onMounted(() => {});
    return {
      ...toRefs(pageData),
      choseTab,
      addRoles,
      handleOk,
      handleCancel,
      closedia,
      editDialog,
    };
  },
};
</script>

<style scoped lang="scss">
.certiFication {
  .tops {
    display: flex;
    justify-content: space-between;
    .certsRig {
      .ant-btn {
        width: 166px;
        height: 36px;
        border-radius: 8px;
        border-color: $elementMine;
        color: $elementMine;
        &:nth-child(1) {
          margin-right: 10px;
        }
        .btns {
          display: flex;
          align-items: center;
          justify-content: center;
          .svg-icon {
            margin-right: 10px;
          }
        }
      }
      .antActive {
        background-color: #ff6b48;
        color: #fff;
      }
    }
  }
}
</style>
