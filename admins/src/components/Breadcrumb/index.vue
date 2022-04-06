<template>
  <a-breadcrumb class="app-breadcrumb">
    <a-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
      <!-- <span v-if="item.redirect === 'noRedirect' || index == levelList.length - 1">
        {{
				item.meta.title
			}}
      </span> -->
      <a @click.self.prevent="handleLink(item)">{{ item.meta.title }} </a>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script>
import * as pathToRegexp from 'path-to-regexp'
import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default {
  name: 'BreadCrumn',
  setup () {
    // data
    const levelList = ref(null)
    const route = useRoute()
    const router = useRouter()

    // methods
    const getBreadcrumb = () => {
      // 只显示带有meta.title的路由

      let matched = route.matched.filter((item) => item.meta && item.meta.title)
      const first = matched[0]


      levelList.value = matched.filter(
        (item) => {
          return item.meta && item.meta.title
        }
      )
    }


    const pathCompile = (path) => {
      const { params } = route
      const toPath = pathToRegexp.compile(path)
      return toPath(params)
    }

    const handleLink = (item) => {
      const { redirect, path } = item
      if (redirect) {
        router.push(redirect)
        return
      }
      router.push(pathCompile(path))
    }

    // watch
    watch(
      () => route.path,
      (path) => {
        // if (path.startsWith('/redirect/')) {
        //   return
        // }
        getBreadcrumb()
      },
      { immediate: true }
    )

    // mounted
    onMounted(() => {
      getBreadcrumb()
    })

    return {
      levelList,
      getBreadcrumb,
      pathCompile,
      handleLink
    }
  }
}
</script>

<style lang="less" scoped>
.app-breadcrumb.ant-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;
}
</style>
