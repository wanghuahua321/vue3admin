<template>
  <div>
    homeIndex
  </div>
</template>

<script lang='ts'>
import { reactive, onMounted, toRefs } from "vue";
export default {
  name: "homeIndex",
  components: {},
  setup() {
    onMounted(() => {
      console.log("11");
    });
    return {};
  },
};
</script>

<style scoped lang="scss">
</style>
