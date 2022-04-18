<template>
  <div class="tables">
    <a-table :rowKey="record=>record.id" :columns="table_header" :data-source="table_data" :pagination="pagination" @change="handleTableChange">
      <template #isPublic="{text}">
        {{filterData(text)}}
      </template>
      <template #operation="{record}">
        {{record.isPublic}}
        <a href="javascript:;" @click="edit_role_click(record)">修改</a>
        <a-popconfirm title="确定要删除吗?" @confirm="() => del_role_click(record)">
          <a href="javascript:;">删除</a>
        </a-popconfirm>
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
    });
    onMounted(() => {});
    const handleTableChange = () => {};
    const edit_role_click = (rows) => {
      ctx.emit("editClick", rows);
      store.commit("setEditClick", rows);
    };
    function filterData(val) {
      let isPub = "";
      val ? (isPub = "是") : (isPub = "否");
      return isPub;
    }
    return {
      ...toRefs(pagedata),
      handleTableChange,
      edit_role_click,
      filterData,
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
}
</style>
