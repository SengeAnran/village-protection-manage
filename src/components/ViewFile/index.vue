<template>
  <div>
    <el-link
      class="file"
      v-for="(item, i) in data"
      :key="i"
      @click="open(item.filePath)"
    >
      <i class="el-icon-link"></i>
      <span>{{ item.fileName }}</span>
    </el-link>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
    };
  },
  methods: {
    open(src) {
      window.open(src, "_blank");
    },
  },
};
</script>

<style lang="scss" scoped>
.file {}
</style>
