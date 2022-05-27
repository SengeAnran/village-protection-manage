<template>
  <div class="view-file-module" @click="openFile">
    <i class="el-icon-link"></i>
    {{ data.fileName }}
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
  methods: {
    openFile() {
      console.log('open file');
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
