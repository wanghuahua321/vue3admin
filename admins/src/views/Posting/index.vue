<template>
  <!-- 发帖相关 -->
  <div class="Posting">
    <div class="tops">
      <tabbar :tabbraList="tabbraList" @choseTab="choseTab" activeKeys="104161248870206" tabKinds="Post"></tabbar>
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
    <keep-alive>
      <tables :table_header="postHeader" :table_data="postData" :pagination="pagination" @changePage="changePage" @refrcoshAgain="getPostdata">
      </tables>
    </keep-alive>

    <modalCon titles="添加新帖" :showDialogue="showDialogue" @closeDia="closeDia" @confimAdd="confimAdd">
      <template #modalCon>
        <div class="diaforms">
          <a-checkbox-group v-model:value="hasCheck" :options="checkedList" @change="onChange" />
          <div class="sentValue">
            <span class="spans">内容:</span>
            <a-textarea v-model:value="textarea" placeholder="请输入内容" :rows="4" />
          </div>

          <div v-if="showupImgs" class="uploads">
            <a-upload list-type="picture-card" v-model:file-list="fileList" @preview="handlePreview" @change="handleChange">
              <div v-if="fileList.length <3">
                <plus-outlined />
              </div>
            </a-upload>
            <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
              <img alt="example" style="width: 100%" :src="previewImage" />
            </a-modal>
          </div>

          <div class="kinds">
            <div @click="upImgs">
              <svg-icon iconName="tp" />
            </div>
          </div>
        </div>
      </template>
    </modalCon>
  </div>
</template>

<script lang='ts'>
import { reactive, onMounted, toRefs, onBeforeMount } from "vue";
import { Posting } from "@/utils/api";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import tabbar from "@/components/tabbar.vue";
import modalCon from "@/components/modalCon.vue";
import tables from "@/components/tables.vue";
import { getBase64, dataURLtoFile } from "@/utils/file";
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
          page_id: "104161248870206",
          page_name: "上海十六面体服装销售有限公司",
        },
        {
          page_id: "104381945586170",
          page_name: "购物平台公共主页",
        },
        {
          page_id: "108983731714273",
          page_name: "售卖板块",
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
        page_id: "104161248870206",
        page_name: "上海十六面体服装销售有限公司",
      },
      showCom: "Fashion&Fancy",
      showDialogue: false,
      checkedList: [],
      hasCheck: [],
      fileList: [],
      previewVisible: false,
      previewImage: "",
      showupImgs: false,
      postData: [
        // {
        //   post_id: "104161248870206_104163088870022",
        //   full_picture:
        //     "https://scontent-nrt1-1.xx.fbcdn.net/v/t39.30808-6/274114846_104163012203363_8641908049846933570_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=dd9801&_nc_ohc=T-UsBw7h6o8AX_4VJUX&_nc_ht=scontent-nrt1-1.xx&edm=AKIiGfEEAAAA&oh=00_AT8y74Br6WCDrdtNJfZZbL3YlwkoC8g2BBQ7fNJfCGYJqw&oe=62697F9E",
        //   created_time: "2022-02-16 09:59:30",
        //   message: "",
        //   likesCount: 0,
        //   commentsCount: 0,
        //   sharesCount: 0,
        //   clickCount: 0,
        //   dealCount: 0,
        // },
      ],
      postHeader: [
        {
          title: "post",
          width: "48%",
          slots: { customRender: "postInx" },
        },
        {
          title: "评论",
          dataIndex: "commentsCount",
        },
        {
          title: "喜欢",
          dataIndex: "likesCount",
        },
        {
          title: "点击",
          dataIndex: "clickCount",
        },
        {
          title: "触达",
          dataIndex: "dealCount",
        },
        {
          title: "分享",
          dataIndex: "sharesCount",
        },
        {
          title: "操作",
          dataIndex: "operation1",
          // slots: { customRender: "operation" },
          slots: { customRender: "operation1" },
        },
      ],
      pagination: {
        current: 1,
        total: 0,
        pageSize: 4, //每页中显示10条数据
        showSizeChanger: true,
        pageSizeOptions: ["4", "10", "20", "50", "100"], //每页中显示的数据
        showTotal: (total) => `共有 ${total} 条数据`, //分页中显示总的数据
      },
      pageParms: {
        SkipCount: 0, //跳过1页就传10
        MaxResultCount: 4, //每页的数据
      },
      textarea: "",
    });

    onBeforeMount(() => {
      getPosttab();
      // pagedata.checkedList = (pagedata.tabbraList as any).map((item) => {
      //   let ress: any = {};
      //   ress.label = item.page_name;
      //   ress.value = item.page_id;
      //   return ress;
      // });
      getPostdata();
    });
    const addPost = () => {
      console.log("checkedList", pagedata.checkedList);

      pagedata.showDialogue = true;
    };
    // function getBase64(file: any) {
    //   return new Promise((resolve, reject) => {
    //     const reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.onload = () => resolve(reader.result);
    //     reader.onerror = (error) => reject(error);
    //   });
    // }

    const handleCancel = () => {
      pagedata.previewVisible = false;
    };
    const handlePreview = async (file: any) => {
      getBase64(file.originFileObj, (imgUrl) => {
        console.log("imgUrl", imgUrl);
        pagedata.previewImage = imgUrl;
      });
      pagedata.previewVisible = true;
    };
    const handleChange = ({ fileList: newFileList }: any) => {
      pagedata.fileList = newFileList;
    };
    const confimAdd = () => {
      let cheksDeal = pagedata.hasCheck.join();
      let params = {
        pageIds: cheksDeal,
        message: pagedata.textarea,
      };

      const formData = new FormData();
      const flists: any = [];
      for (let i = 0; i < pagedata.fileList.length; i++) {
        formData.append("files", (pagedata.fileList[i] as any).originFileObj);
      }
      // formData.append("file", );
      // for (let j = 0; j < formData.getAll("files").length; j++) {
      //   flists.push(formData.getAll("files")[j]);
      // }

      sentPosts(params, formData);
    };
    const closeDia = () => {
      // 取消按钮
      pagedata.showDialogue = false;
      cleanValues();
    };

    const upImgs = () => {
      pagedata.showupImgs = true;
    };
    const choseTab = (data) => {
      pagedata.choseOne = data;
      pagedata.pagination.current = 1;
      getPostdata();
    };
    const changePage = (pagedatas) => {
      pagedata.pagination.current = pagedatas.current;
      pagedata.pagination.pageSize = pagedatas.pageSize;
      (pagedata.pageParms as any).SkipCount =
        (pagedatas.current - 1) * pagedatas.pageSize;
      pagedata.pageParms.MaxResultCount = pagedatas.pageSize;
      // getRoles();
    };
    const getPosttab = () => {
      Posting.getPosting()
        .then((res) => {
          if (res.length > 0) {
            pagedata.tabbraList = res;
            pagedata.checkedList = (pagedata.tabbraList as any).map((item) => {
              let ress: any = {};
              ress.label = item.page_name;
              ress.value = item.page_id;
              return ress;
            });
          }
        })
        .catch((error) => {
          console.log("999", error);
        });
    };
    const getPostdata = () => {
      Posting.getPostdata(pagedata.choseOne.page_id)
        .then((res) => {
          pagedata.postData = res[0].posts;
        })
        .catch((error) => {
          console.log("999", error);
        });
    };

    const sentPosts = (params, formData) => {
      Posting.sentPost(params, formData)
        .then((res) => {
          let isPost = true;
          res.forEach((items) => {
            if (!items.isSuccess) {
              isPost = false;
              message.error(`${items.page_id}发帖失败`);
            }
          });
          isPost ? message.success("发帖成功") : "";
          pagedata.previewVisible = false;
          pagedata.showDialogue = false;
          cleanValues();
          getPostdata();
        })
        .catch((error) => {
          console.log(error);
        });
    };

    function cleanValues() {
      pagedata.fileList.length = 0;
      pagedata.textarea = "";
      pagedata.hasCheck.length = 0;
      pagedata.showupImgs = false;
    }

    const onChange = (checkedValue) => {
      pagedata.hasCheck = checkedValue;
    };

    const delPosts = () => {};
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
      getPostdata,
      getPosttab,
      onChange,
      sentPosts,
      delPosts,
    };
  },
};
</script>

<style scoped lang="scss">
:deep(.ant-tooltip) {
  display: none !important;
}
:deep(.ant-checkbox-inner) {
  border: 1px solid #ff6b48;
}
:deep(.ant-checkbox-group-item) {
  margin-bottom: 6px;
}
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
.uploads {
  margin-top: 10px;
}
:deep(.ant-upload.ant-upload-select-picture-card) {
  width: 72px;
  height: 72px;
}
:deep(.ant-upload-list-picture-card .ant-upload-list-item) {
  width: 72px;
  height: 72px;
}
:deep(.ant-upload-list-picture-card-container) {
  width: 80px;
  height: 80px;
}
.sentValue {
  padding-top: 14px;
  .spans {
    padding: 10px 0px;
    display: inline-block;
    font-size: 14px;
    color: #181818;
    font-weight: 600;
    letter-spacing: 1px;
  }
}
.kinds {
  padding-top: 25px;
}
</style>
