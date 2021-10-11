<template>
  <el-dialog
    class="dialog-wrp"
    destroy-on-close
    append-to-body
    :close-on-click-modal="false"
    width="612px"
    top="30vh"
    :visible="visible"
    @close="cancel"
  >
    <div class="bind-wrp">
      <h4 class="title">{{ title }}</h4>
      <p class="tips">请输入用户名和密码绑定浙政钉信息！</p>
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        class="form"
        label-position="right"
        label-width="0px"
      >
        <el-form-item prop="userName">
          <el-input
            class="input"
            v-model="form.userName"
            placeholder="请输入用户名"
          >
            <i slot="prefix" class="el-input__icon el-icon-user-solid"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            class="input"
            v-model="form.password"
            placeholder="请输入密码"
            type="password"
          >
            <i slot="prefix" class="el-input__icon el-icon-lock"></i>
          </el-input>
        </el-form-item>
        <el-form-item align="right">
          <el-button type="primary" @click.stop.prevent="confirm">
            绑定
          </el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    visible: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      form: {
        userName: "",
        password: "",
      },
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  watch: {
    visible(val) {
      if (val && this.data) {
        this.form.userName = this.data.userName || "";
        this.form.password = this.data.password || "";
      }
    },
  },
  methods: {
    confirm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit("confirm", this.form);
        }
      });
    },
    close() {
      this.$refs.form.resetFields();
      this.$emit("update:visible", false);
    },
    cancel() {
      this.close();
      this.$emit("cancel");
    },
  },
};
</script>
<style lang="scss" scoped>
.dialog-wrp {
  ::v-deep .el-dialog__body {
    padding: 0;
  }
}
.bind-wrp {
  width: 612px;
  min-height: 332px;
  background: #fff;
  // box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  margin: 0 auto;

  .title {
    padding-top: 30px;
    font-size: 24px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    // color: #262626;
    color: #1e8dff;
    line-height: 33px;
    text-align: center;
  }
  .tips {
    text-align: center;
    margin-top: 10px;
    color: #ff8c13;
    font-size: 14px;
  }
  .form {
    padding: 30px 100px 30px;
    .input {
      height: 50px;
      ::v-deep .el-input__inner {
        height: 50px;
        font-size: 18px;
        padding-left: 40px;
      }
      .el-input__icon {
        font-size: 18px;
        margin-left: 6px;
      }
    }
    .el-button {
      font-size: 18px;
    }
  }
}
</style>
