<template>
  <h3 class="text-gray-800 text-2xl mb-8 router-back" @click="$router.back()">
    <i class="el-icon-arrow-left"></i>
    <slot />
  </h3>
</template>
<style lang="scss" scoped>
.router-back {
  cursor: pointer;
  display: inline-block;
}
</style>
