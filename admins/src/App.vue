<template>
  <a-config-provider>
    <div class="aspins" v-show="isloadding">
      <a-spin size="large" :spinning="isloadding">
      </a-spin>
    </div>
    <router-view />
  </a-config-provider>
</template>

<script>
import { reactive, toRefs, computed, ref } from 'vue';
import { useStore } from 'vuex';

export default ({
  setup () {
    const delayTime = 100;
    const store = useStore();
    const isloadding = computed(() => {
      return store.state.loadding;
    });
    return { isloadding, delayTime };
  },
})
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  // color: #2c3e50;
  width: 100%;
  height: 100%;
  body,
  h2,
  ul,
  ol,
  h1 {
    margin: 0;
    padding: 0;
  }

  p,
  dl,
  dd {
    margin: 0;
  }
}

nav {
  padding: 30px;
  s a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.aspins {
  width: 120px;
  height: 120px;
  top: 50%;
  left: 50%;
  background: rgba(17, 17, 17, 0.7);
  transform: translate(-50%, -50%);
  border-radius: 5px;
  z-index: 999;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
