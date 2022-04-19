<template>
  <div class="tenant">
    tenant
  </div>
</template>

<script lang='ts'>
import { reactive, onMounted, toRefs } from "vue";
export default {
  name: "tenant",
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
