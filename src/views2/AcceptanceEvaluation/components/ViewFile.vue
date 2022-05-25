<template>
  <div class="view-file-module">
    <i class="el-icon-link"></i>
    附件名称附件名称附件名称附件名称附件名称.pdf
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style lang="scss" scoped>
.view-file-module {
  cursor: pointer;
  .el-icon-link {
    font-size: 16px;
    font-weight: bold;
  }
  &:hover {
    color: #409eff;
    .el-icon-link {
      color: #409eff;
    }
  }
}
</style>
