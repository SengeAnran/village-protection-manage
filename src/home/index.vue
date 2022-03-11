<template>
<div>
  <el-button @click="goSystem(1)">浙江省未来乡村建设服务平台</el-button>
  <el-button @click="goSystem(2)">历史文化村落保护管理应用</el-button>
  <el-button @click="goSystem(3)">跟着节气游乡村管理后台</el-button>
</div>
</template>

<script>
export default {
  name: "index",
  methods: {
    goSystem(type) {
      console.log(type);
      switch (type) {
        case 1: this.$router.push('/'); break;
        case 2: this.$router.push('/'); break;
        case 3: this.$router.push('/'); break;
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>