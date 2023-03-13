<template>
  <el-dialog
    class="my-el-dialog"
    :visible="dialog"
    append-to-body
    width="760"
    height="708"
    :title="title"
    @close="$emit('closeView')"
  >
    <video ref="video" style="width: 100%; max-height: 80vh" :src="path" controls></video>
  </el-dialog>
</template>

<script>
export default {
  props: {
    path: {
      type: String,
    },
    title: {
      type: String,
    },
    dialog: {
      type: Boolean,
    },
  },
  watch: {
    dialog(val) {
      if (!val) {
        const video = this.$refs.video;
        if (video) {
          video.pause();
        }
      }
    },
  },
};
</script>

<style scoped>
.my-el-dialog ::v-deep .el-dialog__header {
  text-align: center;
}
.my-el-dialog ::v-deep .el-dialog__body {
  padding-top: 0;
}
</style>
