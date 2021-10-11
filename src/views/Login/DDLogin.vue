<template>
  <div class="ddLogin-wrp">
    <h3 class="title">
      <img :src="require('@/assets/imgs/zwd-icon.png')" alt="" />
      浙政钉扫码登陆
    </h3>
    <div class="code-wrp">
      <div class="code-con">
        <iframe
          class="iframe"
          width="200"
          height="300"
          :src="QRCodeUrl"
          frameborder="0"
          scrolling="no"
        ></iframe>
      </div>
    </div>
    <p class="tips">手机扫码登录</p>
    <BindAccount
      :visible.sync="bindVisible"
      title="历史文化村落保护管理系统"
      @confirm="bindConfirm"
      @cancel="refreshIframe"
    />
  </div>
</template>

<script>
import { QRCodeUrl, QRLogin } from "@/utils/dd";
import { setToken, setLoginType } from "@/utils/auth";

import { scanBinding } from "@/api/user";
import BindAccount from "./Components/BindAccount.vue";
// import Bus from "@/utils/bus";

export default {
  components: { BindAccount },
  data() {
    return {
      QRCodeUrl: QRCodeUrl,

      bindVisible: false,

      zwddUserInfo: {}, // 用户浙政钉信息
    };
  },
  // created() {
  //   QRLogin().then((res) => {
  //     setToken(res.token);
  //     this.$router.push("/").catch(() => {});
  //   });
  // },
  beforeMount() {
    QRLogin().then((res) => {
      this.QRLoginListener(res);
    });
    // Bus.$on("scanResult", (res) => {
    //   this.QRLoginListener(res);
    // });
  },
  methods: {
    /**
     * res.code: 200 绑定成功 201 暂未绑定
     */
    QRLoginListener(res) {
      const { code } = res;
      switch (code) {
        case "200":
          if (res.token) {
            this.loginSuccess(res);
          }
          break;
        case "201":
          this.bindVisible = true;
          this.zwddUserInfo = res.zwddUserInfo;
          break;
        default:
          break;
      }
    },

    // 登录成功
    loginSuccess(res) {
      // console.log(res);
      setToken(res.token);
      setLoginType(res.loginType);
      this.$router.push("/").catch(() => {});
    },
    bindConfirm(userInfo) {
      const params = {
        ...userInfo,
        zwddUserInfo: this.zwddUserInfo,
      };
      scanBinding(params).then((res) => {
        console.log(res);
        if (res.code === "200") {
          this.loginSuccess(res);
        } else {
          this.$message({ type: "success", message: "绑定失败" });
        }
      });
    },
    refreshIframe() {
      const iframe = this.$refs.iframe;
      window.open(iframe.src, "refresh_name", "");
    },
  }
};
</script>
<style lang="scss" scoped>
.ddLogin-wrp {
  width: 360px;
  height: 480px;
  background: #ffffff;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  .title {
    padding-left: 24px;
    display: flex;
    align-items: center;
    font-size: 32px;
    font-weight: 500;
    color: #2299fe;
    margin-bottom: 40px;
    padding-top: 34px;
    & img {
      width: 60px;
      height: 60px;
      margin-right: 14px;
    }
  }
  .code-wrp {
    width: 238px;
    height: 270px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    overflow: hidden;
    padding-top: 10px;
    margin: 0 auto;
    .code-con {
      margin: 0 auto;
      width: 200px;
      height: 260px;
      .iframe {
        position: relative;
        top: -52px;
      }
    }
  }

  .tips {
    text-align: center;
    font-size: 22px;
    font-weight: 500;
    color: #333333;
    line-height: 30px;
    margin-top: 16px;
  }
}
</style>
