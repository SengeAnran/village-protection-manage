<template>
  <div>
    <el-button @click="goSystem(2)">浙江省未来乡村建设服务平台</el-button>
    <el-button @click="goSystem(1)">历史文化村落保护管理应用</el-button>
    <el-button @click="goSystem(3)">跟着节气游乡村管理后台</el-button>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "index",
  methods: {
    ...mapMutations("user", ["SET_SYSTEM_TIME"]),
    goSystem(type) {
      this.SET_SYSTEM_TIME(type);
      console.log(type);
      this.$router.push("/");
    },
  },
}
</script>

<style lang="scss" scoped>

</style>