<template>
  <!-- 发帖相关 -->
  <div class="Posting">
    <div class="tops">
      <tabbar :tabbraList="tabbraList" @choseTab="choseTab" activeKeys="1"></tabbar>
      <div class="certsRig">
        <a-button class="antActive">
          <template #icon>
            <div class="btns" @click="addPost()">
              <svg-icon iconName="xj" />
              发帖子
            </div>
          </template>
        </a-button>

      </div>
    </div>
    <div v-if="choseOne.key=='1'" class="channels">
      <tables :table_header="postHeader" :table_data="postData" :pagination="pagination" @changePage="changePage">
      </tables>
    </div>
    <div v-else-if="choseOne.key=='2' " class="mychannel">
      2
    </div>

    <modalCon :showDialogue="showDialogue" @closeDia="closeDia" @confimAdd="confimAdd">
      <template #modalCon>
        <div class="diaforms">
          <a-checkbox-group v-model:value="checkedList" :options="plainOptions" />
          <div>
            <span>内容:</span>
            <a-textarea v-model:value="textarea" placeholder="Basic usage" :rows="4" />
          </div>

          <div v-if="showupImgs" class="uploads">
            <a-upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76" list-type="picture-card" v-model:file-list="fileList"
              @preview="handlePreview">
              <div v-if="fileList.length < 8">
                <plus-outlined />
                <div class="ant-upload-text">Upload</div>
              </div>
            </a-upload>
            <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
              <img alt="example" style="width: 100%" :src="previewImage" />
            </a-modal>
          </div>

          <div class="kinds">
            <div @click="upImgs">图片</div>
          </div>
        </div>
      </template>
    </modalCon>
  </div>
</template>

<script lang='ts'>
import { reactive, onMounted, toRefs } from "vue";
import { channels } from "@/utils/api";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import tabbar from "@/components/tabbar.vue";
import modalCon from "@/components/modalCon.vue";
import tables from "@/components/tables.vue";
export default {
  name: "posTing",
  components: {
    EditOutlined,
    DeleteOutlined,
    PlusOutlined,
    tabbar,
    modalCon,
    tables,
  },
  setup() {
    const pagedata = reactive({
      seletItemsId: "",
      tabbraList: [
        {
          key: "1",
          title: "Fashion&Fancy",
        },
        {
          key: "2",
          title: "fashionandfancy2021",
        },
      ],
      dialogueData: {
        name: "",
        channelValue: 0,
        channelConfiguration: {
          emailorphoneno: "",
          password: "",
        },
        appId: "",
        projectId: "",
        sinchUsername: "",
        sinchPassword: "",
      },
      choseOne: {
        key: "1",
        title: "Fashion&Fancy",
      },
      showCom: "Fashion&Fancy",
      showDialogue: true,
      checkedList: ["Apple", "Orange"],
      plainOptions: ["Apple", "Pear", "Orange"],
      fileList: [],
      previewVisible: false,
      previewImage: "",
      showupImgs: false,
      postData: [{}],
      postHeader: [
        {
          title: "post",
          dataIndex: "name",
          width: "30%",
        },
        {
          title: "评论",
          dataIndex: "isPublic",
          slots: { customRender: "isPublic" },
        },
        {
          title: "喜欢",
          dataIndex: "isPublic",
          slots: { customRender: "isPublic" },
        },
        {
          title: "点击",
          dataIndex: "isPublic",
          slots: { customRender: "isPublic" },
        },
        {
          title: "触达",
          dataIndex: "isPublic",
          slots: { customRender: "isPublic" },
        },
        {
          title: "分享",
          dataIndex: "isPublic",
          slots: { customRender: "isPublic" },
        },
      ],
      pagination: {
        current: 1,
        total: 0,
        pageSize: 8, //每页中显示10条数据
        showSizeChanger: true,
        pageSizeOptions: ["8", "10", "20", "50", "100"], //每页中显示的数据
        showTotal: (total) => `共有 ${total} 条数据`, //分页中显示总的数据
      },
      pageParms: {
        SkipCount: 0, //跳过1页就传10
        MaxResultCount: 8, //每页的数据
      },
      textarea: "",
    });

    onMounted(() => {});
    const addPost = () => {
      pagedata.showDialogue = true;
    };
    function getBase64(file: any) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    }
    const handleCancel = () => {
      pagedata.previewVisible = false;
    };
    const handlePreview = async (file: any) => {
      if (!file.url && !file.preview) {
        file.preview = (await getBase64(file.originFileObj)) as string;
      }
      pagedata.previewVisible = file.url || file.preview;
      pagedata.previewVisible = true;
    };
    const handleChange = ({ fileList: newFileList }: any) => {
      pagedata.fileList = newFileList;
    };
    const confimAdd = () => {
      let formData = JSON.parse(JSON.stringify(pagedata.dialogueData));
      (formData as any).channelConfiguration = JSON.stringify(
        formData.channelConfiguration
      );

      // pagedata.formData = formData;
      // if (pagedata.dialogType == "delete") {
      //   deleteData();
      // } else {
      //   formRef.value
      //     .validate()
      //     .then(() => {
      //       if (pagedata.dialogType == "news") {
      //         addChannels();
      //       } else if (pagedata.dialogType == "edit") {
      //         editInterface();
      //       }
      //     })
      //     .catch((error) => {
      //       console.log("error", error);
      //     });
      // }
    };
    const closeDia = () => {
      // 取消按钮
      pagedata.showDialogue = false;
      // formRef.value.resetFields();
    };

    const upImgs = () => {
      pagedata.showupImgs = true;
    };
    const choseTab = (data) => {
      // pagedata.choseOne = data;
      // if (data.key == "1") {
      // }
    };
    const changePage = (pagedatas) => {
      pagedata.pagination.current = pagedatas.current;
      pagedata.pagination.pageSize = pagedatas.pageSize;
      (pagedata.pageParms as any).SkipCount =
        (pagedatas.current - 1) * pagedatas.pageSize;
      pagedata.pageParms.MaxResultCount = pagedatas.pageSize;
      // getRoles();
    };
    return {
      ...toRefs(pagedata),
      addPost,
      closeDia,
      upImgs,
      handleCancel,
      handlePreview,
      handleChange,
      changePage,
      confimAdd,
      choseTab,
    };
  },
};
</script>

<style scoped lang="scss">
.Posting {
  width: 100%;
  height: 100%;
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
  .Posting_tit {
    .p_tit_tabs {
    }
  }
}
</style>
