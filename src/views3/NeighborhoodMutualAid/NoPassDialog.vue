<template>
  <el-dialog
    width="30%"
    :visible="visible"
    top="39vh"
    append-to-body
    @close="close"
  >
    <el-input
      type="textarea"
      :rows="6"
      placeholder="请输入不通过原因"
      v-model="reviewNotes"
      resize="none"
    >
    </el-input>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="noPassConfirm">提交</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      reviewNotes: "",
    };
  },
  methods: {
    close() {
      this.$emit("update:visible", false);
    },
    noPassConfirm() {
      if (!this.reviewNotes) {
        this.$message({
          type: "warning",
          message: "请输入不通过原因",
        });
      } else {
        this.$emit("confirm", this.reviewNotes);
      }
    },
  },
};
</script>
