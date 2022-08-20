<template>
  <div class="viewer-com-root" v-html="value"></div>
</template>
<script>
export default {
  props: {
    value: String,
  },
};
</script>

<style lang="scss" scoped>
.viewer-com-root {
  min-height: 100px;
  max-height: 400px;
  padding: 10px;
  border: 1px solid #ccc;
  z-index: 1000;
  overflow: auto;
}
</style>
