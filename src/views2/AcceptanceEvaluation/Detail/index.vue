<template>
  <div class="page">
    <el-form ref="form" label-width="100px" class="demo-ruleForm" label-position="top">
      <BaseInfo />
      <score-table :form="form" disabled></score-table>

      <city-info></city-info>
      <province-info></province-info>
    </el-form>

    <div style="text-align: center; padding: 40px">
      <el-button @click="$router.back()">返回</el-button>
    </div>
  </div>
</template>

<script>
import BaseInfo from '../components/BaseInfo.vue';
import ScoreTable from '../components/ScoreTable.vue';
import CityInfo from '../components/CityInfo.vue';
import ProvinceInfo from '../components/ProvinceInfo.vue';

import { getDetail } from '@/api2/acceptanceEvaluation';

export default {
  name: 'index',
  components: { BaseInfo, ScoreTable, CityInfo, ProvinceInfo },
  data() {
    return {
      form: {},
    };
  },
  methods: {
    getData() {
      const id = this.$route.query.id;
      getDetail({ id }).then((res) => {
        console.log(res, 'res');
      });
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style scoped lang="scss">
.page {
  background-color: #fff;
}
</style>
