<template>
  <div class="psw-wrp">
    <h2
      style="
        font-size: 28px;
        text-align: center;
        color: #226af5;
        margin-bottom: 30px;
      "
    >
      跟着节气游乡村管理后台
    </h2>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="input-wrp">
      <el-form-item prop="name">
        <el-input
          v-model="ruleForm.name"
          placeholder="请输入账号"
          prefix-icon="el-icon-user"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="ruleForm.password"
          type="password"
          @keydown.enter.native="submitForm('ruleForm')"
          placeholder="请输入密码"
          prefix-icon="el-icon-lock"
        ></el-input>
      </el-form-item>
      <el-form-item class="login-wrp">
        <el-button
          class="login-btn"
          type="primary"
          @click="submitForm('ruleForm')"
        >
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { setToken } from "@/utils/auth";
import md5 from "@/utils/md5.min";

export default {
  name: "Password",
  data() {
    return {
      ruleForm: {
        name: "",
        password: "",
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入您的用户名或手机号",
            trigger: "blur",
          },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    ...mapActions("user", ["login"]),
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          await this.login({
            userName: this.ruleForm.name,
            password: md5(this.ruleForm.password),
            type: "PASSWORD",
          }).then((res) => {
            setToken(res.token);
            this.$router.push("/").catch(() => {});
          });
        } else {
          return false;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.psw-wrp {
  padding: 30px;
  width: 580px;
  background-color: #fff;
  border-radius: 6px;
  .el-form-item {
    margin-bottom: 32px;
    ::v-deep .el-input__inner {
      height: 64px;
      border-radius: 0;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      font-size: 20px;
      padding-left: 52px;
    }
    ::v-deep .el-input__icon {
      color: #b8c1d5;
      font-size: 26px;
      padding-left: 10px;
      // padding-top: 15px;
      line-height: 62px;
    }
    ::v-deep .el-form-item__error {
      font-size: 14px;
    }
  }
  .login-wrp {
    margin-top: 68px;
    margin-bottom: 30px;
    .login-btn {
      height: 64px;
      width: 100%;
      border-radius: 0;
      box-shadow: 0px 4px 18px 0px rgba(71, 120, 208, 0.7);
      border-radius: 8px;
      background: #2169f6;
      font-size: 22px;
    }
  }
  .remember-wrp {
    height: 20px;
    line-height: 20px;
    span {
      margin-left: 14px;
      user-select: none;
      font-size: 18px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #6074a3;
      line-height: 33px;
    }
    cursor: pointer;
    ::v-deep .el-form-item__content {
      height: 33px;
      line-height: 33px;
      display: flex;
      align-items: center;
    }
    ::v-deep .el-checkbox__input {
      transform: scale(1.1);
    }
  }
}
</style>
