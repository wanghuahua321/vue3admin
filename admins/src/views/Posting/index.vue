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

    <tables :table_header="postHeader" :table_data="postData" :pagination="pagination" @changePage="changePage">
    </tables>

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
      checkedList: ["Apple", "Orange"],
      plainOptions: ["Apple", "Pear", "Orange"],
      fileList: [],
      previewVisible: false,
      previewImage: "",
      showupImgs: false,
      postData: [
        {
          post_id: "104161248870206_130870959532568",
          full_picture:
            "https://scontent-nrt1-1.xx.fbcdn.net/v/t39.30808-6/278728548_130870952865902_8921852071585078014_n.png?_nc_cat=111&ccb=1-5&_nc_sid=2d5d41&_nc_ohc=U_xhxwbUr_cAX_tbpmK&_nc_ht=scontent-nrt1-1.xx&edm=AKIiGfEEAAAA&oh=00_AT_311buYnBzTWLZNcPm7W2BaezpU5FqZyLOEykyQis1ag&oe=626A0CE0",
          created_time: "2022-04-24 10:22:04",
          message: "2022-04-22预售新品现在开抢",
          likesCount: 0,
          commentsCount: 0,
          sharesCount: 0,
          clickCount: 0,
          dealCount: 0,
        },
        {
          post_id: "104161248870206_130868039532860",
          full_picture:
            "https://scontent-nrt1-1.xx.fbcdn.net/v/t39.30808-6/278706932_130868036199527_636053022120442368_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=2d5d41&_nc_ohc=JOdTGvMOF3AAX9qg0f-&_nc_ht=scontent-nrt1-1.xx&edm=AKIiGfEEAAAA&oh=00_AT9UTUq2bnzbeLFzNqywn-A4DOjTGfZ53_B-vCKkNO0ZBg&oe=6268FA7C",
          created_time: "2022-04-24 10:06:02",
          message: "2022-04-22新品发布",
          likesCount: 0,
          commentsCount: 0,
          sharesCount: 0,
          clickCount: 0,
          dealCount: 0,
        },
        {
          post_id: "104161248870206_130093676276963",
          full_picture:
            "https://scontent-nrt1-1.xx.fbcdn.net/v/t39.30808-6/278971092_130093669610297_8756349593715465201_n.png?_nc_cat=100&ccb=1-5&_nc_sid=2d5d41&_nc_ohc=Xl9bPSU4S54AX9zxbbr&_nc_ht=scontent-nrt1-1.xx&edm=AKIiGfEEAAAA&oh=00_AT8LXDWIAre6dbo--aOAfmwK8UqlF282pfHZTAqFZmaq9Q&oe=626A7D20",
          created_time: "2022-04-21 14:30:06",
          message: "the time is:2022/4/21 14:20:37",
          likesCount: 1,
          commentsCount: 4,
          sharesCount: 2,
          clickCount: 0,
          dealCount: 0,
        },
        {
          post_id: "104161248870206_130057762947221",
          full_picture:
            "https://scontent-nrt1-1.xx.fbcdn.net/v/t39.30808-6/278886391_130057759613888_3493525720664162340_n.png?_nc_cat=111&ccb=1-5&_nc_sid=2d5d41&_nc_ohc=iYHBv3fvDXwAX_73eJs&_nc_ht=scontent-nrt1-1.xx&edm=AKIiGfEEAAAA&oh=00_AT-C054Wtxn3C0dNjFZgVqR2E7xmL2eRjcVYegitwVebSg&oe=626A4DFC",
          created_time: "2022-04-21 11:50:00",
          message: "the time is:2022/4/21 11:40:39",
          likesCount: 1,
          commentsCount: 0,
          sharesCount: 0,
          clickCount: 0,
          dealCount: 0,
        },
        {
          post_id: "104161248870206_129495989670065",
          full_picture:
            "https://scontent-nrt1-1.xx.fbcdn.net/v/t39.30808-6/278913884_129495986336732_5456121165733466640_n.png?_nc_cat=110&ccb=1-5&_nc_sid=2d5d41&_nc_ohc=J69NS7nz9MEAX_-eeHc&_nc_ht=scontent-nrt1-1.xx&edm=AKIiGfEEAAAA&oh=00_AT8ttoMBhKvROfD2eKt7qK0v6kUsaYGvbx2rTb9rTecRDQ&oe=62694822",
          created_time: "2022-04-19 18:00:05",
          message: "my first publication1738",
          likesCount: 0,
          commentsCount: 0,
          sharesCount: 0,
          clickCount: 0,
          dealCount: 0,
        },
        {
          post_id: "104161248870206_129513816334949",
          full_picture:
            "https://scontent-nrt1-1.xx.fbcdn.net/v/t39.30808-6/278500077_129513813001616_196750647469476458_n.png?_nc_cat=103&ccb=1-5&_nc_sid=2d5d41&_nc_ohc=Ngbd_ZpUfrEAX8zbd0-&_nc_ht=scontent-nrt1-1.xx&edm=AKIiGfEEAAAA&oh=00_AT8i3yrdpSBKzv25izBQ-4tMMaauwVBgZt3o2vrN2hWJAg&oe=6269383B",
          created_time: "2022-04-19 11:33:02",
          message: "the time is:2022/4/19 11:23:00",
          likesCount: 0,
          commentsCount: 1,
          sharesCount: 2,
          clickCount: 0,
          dealCount: 0,
        },
        {
          post_id: "104161248870206_129508029668861",
          full_picture:
            "https://scontent-nrt1-1.xx.fbcdn.net/v/t39.30808-6/278770370_129508023002195_3012376012521520260_n.png?_nc_cat=102&ccb=1-5&_nc_sid=2d5d41&_nc_ohc=gJkQHlC5X4gAX-JrF32&_nc_ht=scontent-nrt1-1.xx&edm=AKIiGfEEAAAA&oh=00_AT-yMBQeTUwo4VQc66UUqVjyGlcNtLG4KThTwifwAYVtJA&oe=626A0A49",
          created_time: "2022-04-19 11:08:01",
          message: "the time is:2022/4/19 10:58:40",
          likesCount: 2,
          commentsCount: 3,
          sharesCount: 0,
          clickCount: 0,
          dealCount: 0,
        },
        {
          post_id: "104161248870206_129498759669788",
          full_picture:
            "https://scontent-nrt1-1.xx.fbcdn.net/v/t39.30808-6/278898171_129498756336455_3088052490640439682_n.png?_nc_cat=102&ccb=1-5&_nc_sid=2d5d41&_nc_ohc=eJXNnJaRFegAX8v25in&_nc_oc=AQncPGNcbXwP_dLDPBD29duS9QuUbtTxWYmg3_R4Liz2NmP3v5oeEquvLrkZJVp_SYA&_nc_ht=scontent-nrt1-1.xx&edm=AKIiGfEEAAAA&oh=00_AT-g8YJy4twwXOuVvU4Z0GXyRLbglK750CL4smhUu_KmoQ&oe=62698B8D",
          created_time: "2022-04-19 10:30:00",
          message: "the time is:2022/4/19 10:20:00",
          likesCount: 0,
          commentsCount: 1,
          sharesCount: 1,
          clickCount: 0,
          dealCount: 0,
        },
        {
          post_id: "104161248870206_129296516356679",
          full_picture:
            "https://scontent-nrt1-1.xx.fbcdn.net/v/t39.30808-6/278795549_129296513023346_3117129238185722960_n.png?_nc_cat=101&ccb=1-5&_nc_sid=2d5d41&_nc_ohc=Y-KiW1MGj9YAX9MSNOx&_nc_ht=scontent-nrt1-1.xx&edm=AKIiGfEEAAAA&oh=00_AT9C3AdKhp5jhu0p4YbebYiEwrSR4sIK9hajMBUQ7iOrWA&oe=626969B3",
          created_time: "2022-04-19 03:38:00",
          message: "my first publication1738",
          likesCount: 1,
          commentsCount: 0,
          sharesCount: 0,
          clickCount: 0,
          dealCount: 0,
        },
        {
          post_id: "104161248870206_129295989690065",
          full_picture:
            "https://scontent-nrt1-1.xx.fbcdn.net/v/t39.30808-6/278814446_129295986356732_1155308971797548399_n.png?_nc_cat=110&ccb=1-5&_nc_sid=2d5d41&_nc_ohc=4UHiSyHDbrMAX8Tw_X0&_nc_ht=scontent-nrt1-1.xx&edm=AKIiGfEEAAAA&oh=00_AT-qJKu6YF2fU9jdmTxkXfnO6v6PdLeWisqzaIIZvh_dQQ&oe=626ACFED",
          created_time: "2022-04-19 01:36:02",
          message: "my first publication",
          likesCount: 0,
          commentsCount: 0,
          sharesCount: 0,
          clickCount: 0,
          dealCount: 0,
        },
        {
          post_id: "104161248870206_129294256356905",
          full_picture: "",
          created_time: "2022-04-18 17:30:14",
          message: "1730",
          likesCount: 0,
          commentsCount: 0,
          sharesCount: 0,
          clickCount: 0,
          dealCount: 0,
        },
        {
          post_id: "104161248870206_129292419690422",
          full_picture: "",
          created_time: "2022-04-18 17:18:30",
          message: "1714",
          likesCount: 0,
          commentsCount: 0,
          sharesCount: 0,
          clickCount: 0,
          dealCount: 0,
        },
        {
          post_id: "104161248870206_129290406357290",
          full_picture: "",
          created_time: "2022-04-18 17:06:14",
          message: "Hello World!",
          likesCount: 0,
          commentsCount: 0,
          sharesCount: 0,
          clickCount: 0,
          dealCount: 0,
        },
        {
          post_id: "104161248870206_128328473120150",
          full_picture: "",
          created_time: "2022-04-15 11:28:50",
          message: "0415",
          likesCount: 0,
          commentsCount: 0,
          sharesCount: 0,
          clickCount: 0,
          dealCount: 0,
        },
        {
          post_id: "104161248870206_128114363141561",
          full_picture: "",
          created_time: "2022-04-14 16:45:40",
          message: "1642",
          likesCount: 0,
          commentsCount: 0,
          sharesCount: 0,
          clickCount: 0,
          dealCount: 0,
        },
        {
          post_id: "104161248870206_128112309808433",
          full_picture:
            "https://scontent-nrt1-1.xx.fbcdn.net/v/t39.30808-6/278563177_128112113141786_2007088279556632103_n.png?_nc_cat=110&ccb=1-5&_nc_sid=8024bb&_nc_ohc=FnkTaTPFKTcAX91_YTA&_nc_ht=scontent-nrt1-1.xx&edm=AKIiGfEEAAAA&oh=00_AT_hAV7yk2r5Tw9lshYX7F31sB5tzrp8vMlTHmPoFz8NqA&oe=626A3B71",
          created_time: "2022-04-14 16:33:41",
          message: "1633",
          likesCount: 0,
          commentsCount: 0,
          sharesCount: 0,
          clickCount: 0,
          dealCount: 0,
        },
        {
          post_id: "104161248870206_128108809808783",
          full_picture: "",
          created_time: "2022-04-14 16:17:25",
          message: "1616",
          likesCount: 0,
          commentsCount: 0,
          sharesCount: 1,
          clickCount: 0,
          dealCount: 0,
        },
        {
          post_id: "104161248870206_128106949808969",
          full_picture: "",
          created_time: "2022-04-14 16:05:51",
          message: "1605",
          likesCount: 0,
          commentsCount: 0,
          sharesCount: 0,
          clickCount: 0,
          dealCount: 0,
        },
        {
          post_id: "104161248870206_128037936482537",
          full_picture:
            "https://scontent-nrt1-1.xx.fbcdn.net/v/t39.30808-6/278366925_128037843149213_757552229179980163_n.png?_nc_cat=104&ccb=1-5&_nc_sid=8024bb&_nc_ohc=R_7g_mr5ag4AX-_O3sU&_nc_ht=scontent-nrt1-1.xx&edm=AKIiGfEEAAAA&oh=00_AT_-5qFuQlFc3fOHebKxucre_60dRpASndr6mAHKVJ_0-w&oe=6269014F",
          created_time: "2022-04-14 10:21:38",
          message: "测试发贴",
          likesCount: 0,
          commentsCount: 0,
          sharesCount: 0,
          clickCount: 0,
          dealCount: 0,
        },
        {
          post_id: "104161248870206_128037763149221",
          full_picture: "",
          created_time: "2022-04-14 10:20:57",
          message: "测试发帖",
          likesCount: 0,
          commentsCount: 0,
          sharesCount: 0,
          clickCount: 0,
          dealCount: 0,
        },
        {
          post_id: "104161248870206_123442713608726",
          full_picture: "",
          created_time: "2022-03-29 14:43:28",
          message: "20220329 14:43",
          likesCount: 0,
          commentsCount: 0,
          sharesCount: 0,
          clickCount: 0,
          dealCount: 0,
        },
        {
          post_id: "104161248870206_116579220961742",
          full_picture: "",
          created_time: "2022-03-08 15:04:02",
          message: "",
          likesCount: 0,
          commentsCount: 0,
          sharesCount: 0,
          clickCount: 0,
          dealCount: 0,
        },
        {
          post_id: "104161248870206_104163088870022",
          full_picture:
            "https://scontent-nrt1-1.xx.fbcdn.net/v/t39.30808-6/274114846_104163012203363_8641908049846933570_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=dd9801&_nc_ohc=T-UsBw7h6o8AX_4VJUX&_nc_ht=scontent-nrt1-1.xx&edm=AKIiGfEEAAAA&oh=00_AT8y74Br6WCDrdtNJfZZbL3YlwkoC8g2BBQ7fNJfCGYJqw&oe=62697F9E",
          created_time: "2022-02-16 09:59:30",
          message: "",
          likesCount: 0,
          commentsCount: 0,
          sharesCount: 0,
          clickCount: 0,
          dealCount: 0,
        },
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

    onMounted(() => {
      // getPostdata();
      // getPostdata();
    });
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
      pagedata.choseOne = data;
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
    const getPosttab = () => {
      Posting.getPosting()
        .then((res) => {
          if (res) {
            pagedata.tabbraList = res;
          } else {
            message.error("获取列表失败");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const getPostdata = () => {
      Posting.getPostdata(pagedata.choseOne.page_id)
        .then((res) => {
          if (res) {
            pagedata.postData = res;
          } else {
            message.error("获取列表失败");
          }
        })
        .catch((error) => {
          console.log(error);
        });
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
      getPostdata,
      getPosttab,
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
