<template>
  <div class="tables">

    <a-table :rowKey="record=>record.id" :columns="table_header" :data-source="table_data" :pagination="pagination" @change="handleTableChange">

      <template #isPublic="{text}">
        {{filterData(text)}}
      </template>

      <template #operation="{record}">

        <!-- <a href="javascript:;" @click="edit_role_click(record)">修改</a> -->

        <a-tag v-for="tag in tagList" :key="tag" :color="tag.colors" @click="editTagClick(tag,record)">
          <div class="taglis" :style="filterChange(tag.colors)">

            <a-popconfirm class="tagspan" v-if="tag.ktit=='删除'" title="确定要删除吗?" @confirm.stop="() => del_role_click(tag,record)">
              <svg-icon :iconName="tag.icons" />
              删除
            </a-popconfirm>

            <span v-else class="tagspan">
              <svg-icon :iconName="tag.icons" />
              {{ tag.ktit }}
            </span>
          </div>
        </a-tag>
        <!-- <a-popconfirm title="确定要删除吗?" @confirm="() => del_role_click(record)">
          <a href="javascript:;">删除</a>
        </a-popconfirm> -->
        <!-- <a href="javascript:;" @click="permissions(record)">权限</a> -->
      </template>
      <template #postInx="{record}">
        <div class="posting">
          <div class="p_img">
            <img
              src="https://scontent-nrt1-1.xx.fbcdn.net/v/t39.30808-6/278728548_130870952865902_8921852071585078014_n.png?_nc_cat=111&ccb=1-5&_nc_sid=2d5d41&_nc_ohc=U_xhxwbUr_cAX_tbpmK&_nc_ht=scontent-nrt1-1.xx&edm=AKIiGfEEAAAA&oh=00_AT_311buYnBzTWLZNcPm7W2BaezpU5FqZyLOEykyQis1ag&oe=626A0CE0" />
          </div>
          <div class="p_fig">
            <span class="span1">{{record.message}}</span>
            <span class="span2">{{record.created_time}}</span>
          </div>
        </div>
        <!--  -->
      </template>
    </a-table>
  </div>
</template>

<script lang='ts'>
import { reactive, onMounted, toRefs } from "vue";
import { useStore } from "vuex";
import { certification } from "@/utils/api";
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
    const permissions = () => {
      console.log("permissions");
    };
    const editTagClick = (types, rows) => {
      console.log("typestypes", types);

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
    return {
      ...toRefs(pagedata),
      handleTableChange,
      filterData,
      permissions,
      filterChange,
      editTagClick,
      del_role_click,
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
  :deep(.ant-table-tbody > tr > td) {
    border-bottom: 0px solid #f0f0f0 !important;
  }
  :deep(.ant-tag) {
    border-radius: 6px;
    font-weight: 600;
  }
}

.taglis {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  padding: 0px 6px;
  .tagspan {
    display: inline-block;
    margin-left: 8px;
    font-size: 13px;
    letter-spacing: 1px;
    font-weight: 500;
    font-family: SourceHanSansCN-Medium;
  }
}

.posting {
  display: flex;
  .p_img {
    height: 82px;
    img {
      width: 100%;
      height: 100%;
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
</style>
