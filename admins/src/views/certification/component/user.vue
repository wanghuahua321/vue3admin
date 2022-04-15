<template>
  <div class="user">
    user
  </div>
</template>

<script lang='ts'>
import { reactive, onMounted, toRefs } from "vue";
export default {
  name: "user",
  components: {},
  setup() {
    const pagedata = reactive({});
    onMounted(() => {});
    return {
      ...toRefs(pagedata),
    };
  },
};
</script>

<style scoped lang="scss">
</style>
