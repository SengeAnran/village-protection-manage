<template>
  <div class="page">
    <el-form ref="form" label-width="100px" class="demo-ruleForm" label-position="top">
      <BaseInfo />
    </el-form>
  </div>
</template>

<script>
import BaseInfo from '../components/BaseInfo.vue';

import { getDetail } from '@/api2/acceptanceEvaluation';

export default {
  name: 'index',
  components: { BaseInfo },
  methods: {
    getData() {
      getDetail().then((res) => {
        console.log(res, 'res');
      });
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style scoped></style>
