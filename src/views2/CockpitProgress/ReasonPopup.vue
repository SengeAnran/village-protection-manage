<template>
  <el-dialog
    class="dialog"
    title="退回原因"
    :close-on-click-modal="false"
    :visible.sync="_visible"
    width="500px"
    top="22%"
  >
    <div class="content">{{ rejection }}</div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    rejection: {
      type: String,
      default: '',
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
