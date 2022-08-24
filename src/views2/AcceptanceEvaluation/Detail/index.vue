<template>
  <div class="page">
    <el-form ref="form" label-width="100px" class="demo-ruleForm" label-position="top">
      <sub-tit> 申报详情 </sub-tit>
      <BaseInfo :form="form" />
      <score-table :form="form" disabled></score-table>
      <city-info v-if="showCity" :form="form"></city-info>
      <province-info v-if="showProvince" :form="form"></province-info>
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
import SubTit from '../components/SubTit.vue';

import { getDetail } from '@/api2/acceptanceEvaluation';

import { FINAL_STATUS } from '@/views2/utils/constants';

export default {
  name: 'index',
  components: { BaseInfo, ScoreTable, CityInfo, ProvinceInfo, SubTit },
  data() {
    return {
      form: {},
    };
  },
  computed: {
    showCity() {
      const finalStatus = this.form.finalStatus;
      return finalStatus !== FINAL_STATUS.COUNTRY_REPORT_PENDING && finalStatus != FINAL_STATUS.CITY_VERIFY_PENDING;
    },
    showProvince() {
      const finalStatus = this.form.finalStatus;
      return finalStatus === FINAL_STATUS.PROVINCE_VERIFY_REJECTED || finalStatus === FINAL_STATUS.PROVINCE_VERIFY_PASSED;
    },
  },
  methods: {
    getData() {
      const id = this.$route.query.id;
      getDetail({ id }).then((res) => {
        this.form = res;
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
  padding: 20px;
  background-color: #fff;
}
</style>
