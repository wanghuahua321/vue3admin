<template>
  <div class="leftpannel">
    <div class="layout-logo" v-if="!collapsed">
      <router-link to="/">
        <img alt="JC Admin" src="../assets/images/logo-jc.png" />
      </router-link>
    </div>
    <div class="layout-logo-collapsed" v-else>
      <router-link to="/">
        <img alt="JC Admin" src="../assets/images/logo-jc.png" />
      </router-link>
    </div>
    <!-- <a-button type="primary" @click="toggleCollapsed" style="margin-bottom: 16px">
      <MenuUnfoldOutlined v-if="collapsed" />
      <MenuFoldOutlined v-else />
    </a-button> -->
    <a-menu class="menus" mode="inline" :inline-collapsed="collapsed" v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys" @click='selects'
      @openChange='openChange'>
      <template v-for="items in menuList">
        <a-menu-item v-if="!items.children" :key="items.key">
          <template #icon>
            <PieChartOutlined />
          </template>
          <span>{{items.title}}</span>
        </a-menu-item>
        <a-sub-menu v-else :key="items.key">
          <template #icon>
            <MailOutlined />
          </template>
          <template #title>{{items.title}}</template>
          <a-menu-item v-for="subitem in items.children" :key="subitem.key">{{subitem.title}}</a-menu-item>
        </a-sub-menu>
      </template>

    </a-menu>
  </div>
</template>
<script lang='ts'>
// import { reactive, onMounted, toRefs } from "vue";
import { reactive, toRefs, watch } from "vue";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  MailOutlined,
} from "@ant-design/icons-vue";
import { useRouter, useRoute } from "vue-router";
export default {
  name: "homeIndex",
  components: {
    // MenuFoldOutlined,
    // MenuUnfoldOutlined,
    PieChartOutlined,
    MailOutlined,
  },
  setup(props, ctx) {
    /* 
    let list2 =ref<string[]>(["1","2","3"])
    */
    const router = useRouter();
    const pagedata = reactive<any>({
      selectedKeys: ["home"],
      openKeys: [],
      preOpenKeys: [],
      rootSubmenuKeys: [],
      collapsed: false,
      menuList: [
        {
          title: "首页",
          name: "/dashboard",
          icon: "dashboard",
          key: "home",
        },
        {
          title: "聊天",
          name: "/dashboard",
          icon: "dashboard",
          key: "chat",
        },
        {
          title: "发帖",
          name: "/dashboard",
          icon: "dashboard",
          key: "posting",
        },
        {
          title: "渠道",
          name: "/dashboard",
          icon: "dashboard",
          key: "channel",
        },
        // {
        //   title: "Option 1",
        //   name: "/dashboard",
        //   icon: "dashboard",
        //   key: "1",
        //   children: [
        //     {
        //       title: "Option 1-------1",
        //       name: "/dashboard",
        //       icon: "dashboard",
        //       key: "1-1",
        //     },
        //     {
        //       title: "Option 1-------222",
        //       name: "/dashboard",
        //       icon: "dashboard",
        //       key: "1-22",
        //     },
        //   ],
        // },
        // {
        //   title: "Option 2",
        //   name: "/dashboard",
        //   icon: "dashboard",
        //   key: "3",
        //   children: [
        //     {
        //       title: "Option 3-------1",
        //       name: "/dashboard",
        //       icon: "dashboard",
        //       key: "3-1",
        //     },
        //     {
        //       title: "Option 3-------222",
        //       name: "/dashboard",
        //       icon: "dashboard",
        //       key: "3-22",
        //     },
        //   ],
        // },
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
      console.log("888", items);

      pagedata.selectedKeys.length = 0;
      pagedata.selectedKeys.push(items.key);
      // router.push({
      //   name: items.key,
      // });
      ctx.emit("menuSel", items.key);
    };

    const openChange = (openKeys: string[]) => {
      console.log("openKeysopenKeys", openKeys);
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
  width: 130px;
  height: 100vh;
  .menus {
    width: 100%;
    // height: 100%;
    :deep(.ant-menu-item) {
      height: 80px;
    }
  }
}

.layout-logo {
  height: 42px;
  line-height: 42px;
  text-align: center;
  span {
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    display: inline-block;
    padding-left: 8px;
    vertical-align: middle;
  }
  img {
    height: 30px;
    vertical-align: middle;
  }
}
.layout-logo-collapsed {
  text-align: center;
  line-height: 42px;
  img {
    height: 30px;
  }
}
</style>
