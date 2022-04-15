<template>
  <div class="cont_header">
    <div class="crumbs">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    </div>

    <div class="searchs">
      <a-input class="searchsinp" placeholder="Basic usage">
        <template #prefix>
          <user-outlined type="user" />
        </template>
      </a-input>

    </div>

    <!-- <div class="header-left">
      <menu-unfold-outlined v-if="isCollapsed" class="trigger" @click="handleIconClick" />
      <menu-fold-outlined v-else class="trigger" @click="handleIconClick" />
    </div> -->

    <div class="header-right-info">
      <a-popover placement="bottom" trigger="click" :overlayClassName="jcMsgPopover">
        <template #content>
          <a-list :dataSource="data">
            <template #renderItem="{ item }">
              <a-list-item>
                <a-list-item-meta description="这是一条消息内容">
                  <template #title>
                    <a href="#">{{ item.title }}66</a>
                  </template>
                  <template #avatar>
                    <a-avatar src="https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png" />
                  </template>
                </a-list-item-meta>
              </a-list-item>
            </template>
          </a-list>
        </template>
        <a-badge dot class="jc-header-badge">
          <BellOutlined class="info-icon" />
        </a-badge>
      </a-popover>
    </div>

    <a-layout-header class="header-main">

      <div class="header-right">

        <a-dropdown placement="bottomRight" overlayClassName="jc-dropdown-menu">
          <!-- <a class="ant-dropdown-link" @click.prevent>
            Click me
            <DownOutlined />
          </a> -->
          <div class="user-info">
            <a-avatar class="user-avatar" :size="40" :src="avatarUrl">
              <template #icon>
                <UserOutlined />
              </template>
            </a-avatar>
            <div class="user-name">
              <span>{{UserInfo.name}}</span>
              <DownOutlined />
            </div>

          </div>
          <template #overlay>
            <a-menu>
              <a-menu-item @click="handleToUserCenter">
                <UserOutlined />
                个人中心
              </a-menu-item>
              <a-menu-item @click="handleLoginOut">
                <LoginOutlined />
                退出
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </a-layout-header>
  </div>
</template>

<script>

// type limitObj = {

// }

import { ref, createVNode, reactive, toRef, toRefs, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { Modal } from 'ant-design-vue'
import Breadcrumb from '@/components/Breadcrumb/index.vue'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  LoginOutlined,
  ExclamationCircleOutlined,
  BellOutlined,
  DownOutlined
} from '@ant-design/icons-vue'
// import Breadcrumb from '@/components/Breadcrumb'



export default {
  name: 'NavBar',
  components: {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    LoginOutlined,
    Breadcrumb,
    BellOutlined,
    DownOutlined
  },
  props: {
    isCollapsed: {
      type: Boolean,
      default: false
    }
  },
  emits: ['icon-click'],

  setup (props, { emit }) {
    // data

    const store = useStore()
    const router = useRouter()
    const pageDatas = reactive({
      UserInfo: {}
    })
    const avatarUrl = ref(require('@/assets/images/person.png'))
    const jcMsgPopover = ref('jc-msg-popover')
    const data = ref([
      {
        title: '消息1审批'
      },
      {
        title: '消息2审批'
      },
      {
        title: '消息3审批'
      },
      {
        title: '消息4审批'
      }
    ])

    onMounted(() => {
      pageDatas.UserInfo = store.getters.getUserInfo;
    })
    // methods
    const handleIconClick = () => {
      emit('icon-click')
    }

    const handleLoginOut = () => {
      Modal.confirm({
        title: '提示',
        icon: createVNode(ExclamationCircleOutlined),
        content: '您确定要退出系统吗？',
        okText: '确认',
        cancelText: '取消',
        centered: true,
        async onOk () {
          await store.dispatch('user/logout')
          router.push('/login')
        }
      })
    }

    const handleToUserCenter = () => {
      router.push('/userCenter')
    }

    return {
      data,
      avatarUrl,
      jcMsgPopover,
      ...toRefs(pageDatas),
      handleIconClick,
      handleLoginOut,
      handleToUserCenter
    }
  }
}
</script>

<style lang="scss">
.cont_header {
  width: 95%;
  height: 42px;
  margin-top: 32px;
  position: relative;
  display: flex;
  justify-content: flex-end;
  .crumbs {
    width: 60px;
    position: absolute;
    left: 3.5%;
    text-align: center;
    span {
      font-size: 22px;
      min-width: 110px;
      display: inline-block;
    }
  }
  .searchs {
    width: 384px;
    .searchsinp {
      border-radius: 5px !important;
      line-height: 32px;
    }
  }

  .header-right-info {
    width: 42px;
    height: 42px;
    background: #fff;
    margin: 0 30px 0px 21px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    .jc-header-badge {
      height: 42px;
      line-height: 42px;
      >>> .ant-badge-dot {
        top: 36% !important;
        right: 30% !important;
      }
    }
    .info-icon {
      font-size: 22px;
      vertical-align: middle;
      padding: 0 4px;
      cursor: pointer;
    }
  }
}
.jc-dropdown-menu {
  .ant-dropdown-menu {
    li.ant-dropdown-menu-item {
      min-width: 140px;
    }
  }
}
.jc-msg-popover {
  max-width: 300px;
  min-width: 250px;
}
</style>

<style lang="scss" scoped>
.header-main {
  background: #f8f9fb;
  padding: 0 15px;
  height: 42px;
  line-height: 42px;
  // display: flex;
  // position: absolute;
  // z-index: 100;
  // right: 0;
  // top: 0;
  transition: left 0.2s;
  // box-shadow: 0 1px 4px #eee;
  :deep(.ant-input-affix-wrapper .ant-input) {
    line-height: 40px;
  }
  .user-info {
    cursor: pointer;
    .user-avatar {
      margin-right: 8px;
    }
    .user-name {
      vertical-align: middle;
      display: inline-block;
      span {
        padding-left: 12px;
      }
    }
  }
  .header-right {
    margin-left: auto;
    display: flex;
    .header-right-info {
      margin-right: 20px;
      height: 46px;
      line-height: 46px;
      .jc-header-badge {
        height: 46px;
        line-height: 46px;
        :deep(.ant-badge-dot) {
          top: 14px;
        }
      }
    }
  }
  .breadcrumb-container {
    line-height: 46px;
    margin-left: 20px;
  }
}
</style>
