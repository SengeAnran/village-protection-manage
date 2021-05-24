<template>
  <div class="login-wrp">
    <Password />
  </div>
</template>
<script>
import Password from "./Password";
export default {
  name: "Login",
  components: { Password },
};
</script>
<style lang="scss" scoped>
.login-wrp {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
