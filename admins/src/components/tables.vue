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
            <svg-icon :iconName="tag.icons" />
            <span class="tagspan" v-if="tag.ktit=='删除'">
              <a-popconfirm title="确定要删除吗?" @confirm="() => del_role_click(record)">
                删除
              </a-popconfirm>
            </span>
            <span v-else class="tagspan"> {{ tag.ktit }}</span>
          </div>
        </a-tag>
        <!-- <a-popconfirm title="确定要删除吗?" @confirm="() => del_role_click(record)">
          <a href="javascript:;">删除</a>
        </a-popconfirm> -->
        <!-- <a href="javascript:;" @click="permissions(record)">权限</a> -->
      </template>
      <template #customTitle>
        1111
      </template>
    </a-table>
  </div>
</template>

<script lang='ts'>
import { reactive, onMounted, toRefs } from "vue";
import { useStore } from "vuex";
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
  },
  setup(props, ctx) {
    console.log("props", props.table_data);

    const store = useStore();
    const pagedata = reactive({
      pagination: {
        current: 1,
        total: 0,
        pageSize: 8, //每页中显示10条数据
        showSizeChanger: true,
        pageSizeOptions: ["8", "10", "20", "50", "100"], //每页中显示的数据
        showTotal: (total) => `共有 ${total} 条数据`, //分页中显示总的数据
      },
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
    const handleTableChange = () => {};

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
        ctx.emit("editClick", rows, types.kinds);
      }
      if (types.kinds == "role") {
        types.keys == 1 ? ctx.emit("editClick", rows, "permissions") : "";
      } else if (types.kinds == "user") {
        types.keys == 1 ? ctx.emit("editClick", rows, "permissions") : "";
      } else if (types.kinds == "tenant") {
        if (types.keys == 1) {
          //管理链接字符串
          ctx.emit("editClick", rows, types.kinds);
        } else if (types.keys == 2) {
          //管理功能
          ctx.emit("editClick", rows, types.kinds);
        }
      }
      store.commit("setEditClick", rows);
    };

    const del_role_click = (record) => {
      console.log("values", record);
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
</style>
