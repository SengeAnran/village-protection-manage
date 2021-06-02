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
          height="224"
          :src="QRCodeUrl"
          frameborder="0"
          scrolling="no"
        ></iframe>
      </div>
    </div>
    <p class="tips">手机扫码登录</p>
  </div>
</template>

<script>
import { QRCodeUrl, QRLogin } from "@/utils/dd";
import { setToken } from "@/utils/auth";

export default {
  data() {
    return {
      QRCodeUrl: QRCodeUrl,
    };
  },
  created() {
    QRLogin().then((res) => {
      setToken(res.token);
      this.$router.push("/").catch(() => {});
    });
  },
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
    height: 225px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    overflow: hidden;
    padding-top: 10px;
    margin: 0 auto;
    .code-con {
      margin: 0 auto;
      width: 200px;
      height: 200px;
      .iframe {
        position: relative;
        top: -24px;
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
