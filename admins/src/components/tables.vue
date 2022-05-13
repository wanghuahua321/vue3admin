<template>
  <div class="tables">

    <a-table :rowKey="record=>record.id" :columns="table_header" :data-source="table_data" :pagination="pagination" @change="handleTableChange">

      <template #isPublic="{text}">
        {{filterData(text)}}
      </template>

      <template #operation="{record}">

        <div class="tagalls">
          <a-tag v-for="tag in tagList" :key="tag" :color="tag.colors" @click="editTagClick(tag,record)">
            <div class="taglis" :style="filterChange(tag.colors)">

              <a-popconfirm class="tagspan" v-if="tag.ktit=='删除'" title="确定要删除吗?" ok-text="确定" cancel-text="取消"
                @confirm.stop="() => del_role_click(tag,record)">
                <div class="icons">
                  <svg-icon style="height:18px" :iconName="tag.icons" />
                  <span class="ospan">删除</span>
                </div>
              </a-popconfirm>

              <span v-else class="tagspan">
                <div class="icons">
                  <svg-icon :iconName="tag.icons" />
                  <span class="ospan"> {{ tag.ktit }}</span>
                </div>

              </span>
            </div>
          </a-tag>
        </div>

      </template>
      <template #postInx="{record}">
        <div class="posting">
          <div class="p_img">
            <div v-if="record.full_picture" class="imgs">
              <img :src="record.full_picture" alt="发帖图片" />
            </div>
            <div class="txts" v-else>文本</div>
          </div>
          <div class="p_fig">
            <span class="span1">{{record.message?record.message:"--"}}</span>
            <span class="span2">{{record.created_time?record.created_time:"--"}}</span>
          </div>
        </div>
        <!--  -->
      </template>
      <template #operation1="{record}">
        <a-popconfirm class="tagspan1" title="确定要删除吗?" ok-text="确定" cancel-text="取消" @confirm.stop="() => del_role_click1(record)">
          <div class="icons1">
            <svg-icon style="height:18px" iconName="sc_17" />
            <span class="ospan">删除</span>
          </div>
        </a-popconfirm>

      </template>

    </a-table>
  </div>
</template>

<script lang='ts'>
import { reactive, onMounted, toRefs } from "vue";
import { useStore } from "vuex";
import { certification, Posting } from "@/utils/api";
import { message } from "ant-design-vue";
export default {
  name: "tables",
  components: {},
  props: {
    table_header: {
      type: Array,
      default: () => {
        return [];
      },
    },
    table_data: {
      type: Array,
      default: () => {
        return [];
      },
    },
    tagList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    pagination: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  setup(props, ctx) {
    const store = useStore();
    const pagedata = reactive({
      table_header: [],
      table_data: [],
      dialogMsg: {
        isAdd: false,
        addTit: "编辑角色",
        addvisible: false,
        confirmLoading: false,
      },
    });
    onMounted(() => {});
    const handleTableChange = (pagination) => {
      console.log("99pagination9", pagination);
      ctx.emit("changePage", pagination);
    };

    function filterData(val) {
      let isPub = "";
      val ? (isPub = "是") : (isPub = "否");
      return isPub;
    }

    function filterChange(vals) {
      let resoults = "";
      switch (vals) {
        case "#E7E7FF":
          resoults = "#5561FF";
          break;
        case "#FBEBE6":
          resoults = "#FF6B48";
          break;
        case "#DBF0F3":
          resoults = "#5ABECF";
          break;
        default:
          resoults = "";
      }
      return `color:${resoults}`;
    }
    const permissions = () => {};
    const editTagClick = (types, rows) => {
      if (types.keys == 0) {
        //编辑
        ctx.emit("editClick", rows, types.kinds, types.ktit);
      }
      if (types.kinds == "role") {
        types.keys == 1
          ? ctx.emit("editClick", rows, "permissions", types.ktit)
          : "";
      } else if (types.kinds == "user") {
        types.keys == 1
          ? ctx.emit("editClick", rows, "permissions", types.ktit)
          : "";
      } else if (types.kinds == "tenant") {
        if (types.keys == 1) {
          //管理链接字符串

          ctx.emit("editClick", rows, types.kinds, types.ktit);
        } else if (types.keys == 2) {
          //管理功能
          ctx.emit("editClick", rows, types.kinds, types.ktit);
        }
      }
      store.commit("setEditClick", rows);
    };

    const del_role_click = (tag, record) => {
      if (tag.kinds == "user") {
        certification.user
          .deleteUser(record.id)
          .then((res) => {
            message.success("删除成功");
            ctx.emit("refrcoshAgain");
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (tag.kinds == "tenant") {
        certification.tenant
          .delTenant(record.id)
          .then((res) => {
            message.success("删除成功");
            ctx.emit("refrcoshAgain");
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        certification.roles
          .deleteRoles(record.id)
          .then((res) => {
            message.success("删除成功");
            ctx.emit("refrcoshAgain");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };

    const del_role_click1 = (record) => {
      Posting.delPost(record.post_id)
        .then((res) => {
          if (res.isSuccess) {
            message.success("删除成功");
          } else {
            message.error(res.message);
          }
          ctx.emit("refrcoshAgain");
        })
        .catch((error) => {
          console.log(error);
        });
    };
    return {
      ...toRefs(pagedata),
      handleTableChange,
      filterData,
      permissions,
      filterChange,
      editTagClick,
      del_role_click,
      del_role_click1,
    };
  },
};
</script>

<style scoped lang="scss">
.tables {
  .ant-table-thead > tr > th {
    font-weight: 600;
    text-align: left;
    font-size: 13px;
    color: #3e414a;
  }

  :deep(.ant-tag) {
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
  }
}
.tagalls {
  display: flex;
  align-items: center;
  width: 88%;
  justify-content: space-around;
}
.taglis {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  padding: 0px 6px;
  .tagspan {
    display: inline-block;
    // margin-left: 8px;
    font-size: 13px;
    letter-spacing: 1px;
    font-weight: 500;
    font-family: SourceHanSansCN-Medium;
    padding: 0px 4px;
    .icons {
      display: flex;
    }
    .ospan {
      font-size: 14px;
      font-weight: 500;
      padding-left: 6px;
      letter-spacing: 1px;
    }
  }
}
.tagspan1 {
  background-color: rgb(251, 235, 230);
  width: 72%;
  padding: 8px 4px;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  .ospan {
    padding-left: 10px;
    color: #ff6b48;
  }
}
.posting {
  display: flex;
  .p_img {
    width: 40%;
    height: 82px;
    .imgs {
      min-width: 80%;
      height: 100%;
    }
    img {
      height: 100%;
    }
    .txts {
      min-width: 80%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
  }

  .p_fig {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding-left: 10px;
    .span1 {
      color: #3e414a;
      font-size: 14px;
      font-weight: 600;
    }
    .span2 {
      font-size: 12px;
      color: #9fa4bb;
    }
  }
}

:deep(.ant-spin-container) {
  position: inherit !important;
}
:deep(.ant-table-pagination.ant-pagination) {
  position: fixed;
  right: 0px;
  bottom: 20px;
}
:deep(.ant-table-tbody > tr > td) {
  padding: 14px 12px;
  border-bottom: 10px solid #f8f9fb !important;
  color: #3e414a;
  font-weight: 500;
}
:deep(.ant-table-thead > tr > th) {
  font-weight: 600;
}
:deep(.ant-table-thead > tr > th) {
  border-bottom: 0px solid #ccc;
}
</style>
