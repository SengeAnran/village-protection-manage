<template>
  <div class="page">
    <el-form ref="form" label-width="100px" class="demo-ruleForm" label-position="top">
      <BaseInfo />
    </el-form>
  </div>
</template>

<script>
import BaseInfo from './BaseInfo.vue';
export default {
  name: 'index',
  components: { BaseInfo },
};
</script>

<style scoped></style>
