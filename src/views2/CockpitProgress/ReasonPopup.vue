<template>
  <el-dialog
    class="dialog"
    title="驳回原因"
    :close-on-click-modal="false"
    :visible.sync="_visible"
    width="500px"
    top="22%"
  >
    <div class="content">这里是驳回原因</div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    id: {
      type: Number,
      default: 0,
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    _visible: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit('update:visible', val);
      },
    },
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.dialog {
  ::v-deep .el-dialog__body {
    padding-top: 10px;
  }
  .content {
    border-top: 1px solid #ddd;
    padding-top: 20px;
  }
}
</style>
