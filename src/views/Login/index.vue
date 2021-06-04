<template>
  <div class="login-wrp">
    <el-button
      type="warning"
      @click="showTab = Number(!showTab)"
      class="switch-btn"
      >切换登录方式</el-button
    >
    <div class="desc-wrp">
      <h2 class="title">历史文化村落保护管理系统</h2>
      <img
        class="village-img"
        :src="require('@/assets/imgs/village.png')"
        alt=""
      />
    </div>
    <div class="con">
      <Password v-if="!showTab" />
      <DDLogin v-else />
    </div>
  </div>
</template>
<script>
import Password from "./Password";
import DDLogin from "./DDLogin";
export default {
  name: "Login",
  components: { Password, DDLogin },
  data() {
    return {
      showTab: 1,
    };
  },
};
</script>
<style lang="scss" scoped>
.login-wrp {
  width: 100%;
  height: 100vh;
  background: url("../../assets/imgs/login-bg.jpg") no-repeat left center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  .switch-btn {
    position: absolute;
    left: 0;
    top: 0;
  }
  .desc-wrp {
    position: relative;
    margin-left: -40px;
    .title {
      font-size: 54px;
      font-weight: 600;
      color: #ffffff;
      line-height: 75px;
      margin-bottom: 140px;
      letter-spacing: 1px;
      white-space: nowrap;
    }
    .village-img {
      width: 668px;
    }
  }
  .con {
    margin-left: 13%;
  }
}
</style>
