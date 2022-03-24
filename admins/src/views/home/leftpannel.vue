<template>
  <div class="leftpannel">
    <a-button type="primary" @click="toggleCollapsed" style="margin-bottom: 16px">
      <MenuUnfoldOutlined v-if="collapsed" />
      <MenuFoldOutlined v-else />
    </a-button>
    <a-menu class="menus" mode="inline" theme="dark" :inline-collapsed="collapsed" :openKeys="openKeys" :selectedKeys="selectedKeys" @click='selects'
      @openChange='openChange'>

      <template v-for="items in menuList">
        <a-menu-item v-if="!items.children" :key="items.ids">
          <template #icon>
            <PieChartOutlined />
          </template>
          <span>{{items.title}}</span>
        </a-menu-item>
        <a-sub-menu v-else :key="items.ids">
          <template #icon>
            <MailOutlined />
          </template>
          <template #title>{{items.title}}</template>
          <a-menu-item v-for="subitem in items.children" :key="subitem.ids">{{subitem.title}}</a-menu-item>
        </a-sub-menu>
      </template>

    </a-menu>
  </div>
</template>
<script lang='ts'>
// import { reactive, onMounted, toRefs } from "vue";
import { defineComponent, onMounted, reactive, toRefs, watch } from "vue";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  MailOutlined,
} from "@ant-design/icons-vue";
import { Item } from "ant-design-vue/lib/menu";
export default {
  name: "homeIndex",
  components: {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
    MailOutlined,
  },
  setup() {
    /* 
    let list2 =ref<string[]>(["1","2","3"])
    */
    const pagedata = reactive<any>({
      selectedKeys: ["2"],
      openKeys: [],
      preOpenKeys: [],
      rootSubmenuKeys: [],
      collapsed: false,
      menuList: [
        {
          title: "Option 2",
          name: "/dashboard",
          icon: "dashboard",
          ids: "2",
        },
        {
          title: "Option 1",
          name: "/dashboard",
          icon: "dashboard",
          ids: "1",
          children: [
            {
              title: "Option 1-------1",
              name: "/dashboard",
              icon: "dashboard",
              ids: "1-1",
            },
            {
              title: "Option 1-------222",
              name: "/dashboard",
              icon: "dashboard",
              ids: "1-22",
            },
          ],
        },
        {
          title: "Option 2",
          name: "/dashboard",
          icon: "dashboard",
          ids: "3",
          children: [
            {
              title: "Option 3-------1",
              name: "/dashboard",
              icon: "dashboard",
              ids: "3-1",
            },
            {
              title: "Option 3-------222",
              name: "/dashboard",
              icon: "dashboard",
              ids: "3-22",
            },
          ],
        },
      ],
    });

    watch(
      () => pagedata.openKeys,
      (val, oldVal) => {
        console.log("oldValoldVal", oldVal);
        console.log("val", val);
        pagedata.preOpenKeys = oldVal;
      }
    );
    const toggleCollapsed = () => {
      pagedata.collapsed = !pagedata.collapsed;
      pagedata.openKeys = pagedata.collapsed ? [] : pagedata.preOpenKeys;
    };

    const selects = (items, inx) => {
      pagedata.selectedKeys.length = 0;
      pagedata.selectedKeys.push(items.key);
    };

    const openChange = (openKeys: string[]) => {
      let latestOpenKey = openKeys.find((key) => {
        pagedata.openKeys.indexOf(key) === -1;
      });
      if (pagedata.rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
        pagedata.openKeys = openKeys;
      } else {
        pagedata.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    };
    return {
      ...toRefs(pagedata),
      toggleCollapsed,
      selects,
      openChange,
    };
  },
};
</script>

<style scoped lang="scss">
.leftpannel {
  width: 256px;
  height: 100vh;
  .menus {
    width: 100%;
    height: 100%;
    :deep(.ant-menu-item) {
      height: 80px;
    }
  }
}
</style>
