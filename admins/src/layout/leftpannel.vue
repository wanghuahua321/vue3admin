<template>
  <div class="leftpannel">
    <div class="layout-logo" v-if="!collapsed">
      <router-link to="/">
        <svg-icon class="logos" iconName="logo" />
      </router-link>
    </div>
    <div class="layout-logo-collapsed" v-else>
      <router-link to="/">
        <svg-icon iconName="logo" />
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
          <!-- <template #icon>
            <PieChartOutlined />
          </template> -->
          <!-- <span>{{items.title}}</span> -->

          <span class="svgicons">
            <svg-icon :iconName="items.key==selectedKeys[0]?items.actIcon : items.icon " />
          </span>

        </a-menu-item>
        <a-sub-menu v-else :key="items.key">
          <!-- <template #icon>
            <MailOutlined />
          </template> -->
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
      selectedKeys:
        sessionStorage.getItem("itemskey") == null
          ? ["home"]
          : [sessionStorage.getItem("itemskey")],
      openKeys: [],
      preOpenKeys: [],
      rootSubmenuKeys: [],
      collapsed: false,
      menuList: [
        {
          title: "首页",
          name: "/dashboard",
          icon: "shouye1",
          actIcon: "shouye2",
          key: "home",
        },
        {
          title: "聊天",
          name: "/dashboard",
          icon: "liaotian1",
          actIcon: "liaotian2",
          key: "chat",
        },
        {
          title: "发帖",
          name: "/dashboard",
          icon: "fatie1",
          actIcon: "fatie2",
          key: "posting",
        },
        {
          title: "渠道",
          name: "/dashboard",
          icon: "pingtai1",
          actIcon: "pingtai2",
          key: "channel",
        },
        // {
        //   title: "设置",
        //   name: "/dashboard",
        //   icon: "shezhi1",
        //   key: "channel",
        // },
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
      sessionStorage.setItem("itemskey", items.key);
      // router.push({
      //   name: items.key,
      // });
      console.log("huahuahau", pagedata.selectedKeys);
      console.log("huahuahau", items);

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
.svg-icon {
  width: 22px;
  height: 22px;
}
.leftpannel {
  width: 100%;
  // width: 8%;
  height: 100vh;
  .menus {
    width: 100%;
    // height: 100%;
    :deep(.ant-menu-item) {
      height: 80px;
      text-align: center;
      padding-left: 8px !important;
    }
    :deep(.ant-menu-title-content) {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    :deep(.ant-menu-item-selected) {
      .svgicons {
        width: 44px;
        height: 44px;
        background-color: red;
        display: inline-block;
        background: #ff6b48;
        border-radius: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}

.layout-logo {
  width: 100%;
  height: 56px;
  text-align: center;
  margin-top: 20px;
  .logos {
    width: 82%;
    height: 96%;
    margin: 0 auto;
  }
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
