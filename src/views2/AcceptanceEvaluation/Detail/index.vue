<template>
  <div class="page">
    <el-form ref="form" label-width="100px" class="demo-ruleForm" label-position="top">
      <RouterBack>详情</RouterBack>
      <sub-tit> 申报详情 </sub-tit>
      <BaseInfo :form="form" />
      <score-table :form="form" disabled></score-table>
      <city-info v-if="showCity" :form="form"></city-info>
      <province-info v-if="showProvince" :form="form"></province-info>
      <div class="extra-content" v-if="form.multipartFileVO && form.finalStatus === FINAL_STATUS.PROVINCE_VERIFY_PASSED">
        <sub-tit class="mb-4"> 扫描件下载 </sub-tit>
        <div class="extra-content">
          <view-file :data="[form.multipartFileVO]"></view-file>
        </div>
      </div>
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
        const { oldSmallVideoFile, createPerformanceAuditTimeDO } = res;
        this.form = res;
        this.form.oldSmallPics = (res.oldSmallPics || '').split(',').map((ele) => ({ filePath: ele, url: ele }));
        this.form.oldSmallVideo = oldSmallVideoFile ? [oldSmallVideoFile] : [];
        this.form.cityAcceptTime = createPerformanceAuditTimeDO?.id;
        this.form.cityAcceptTimeStr = createPerformanceAuditTimeDO ? createPerformanceAuditTimeDO?.acceptanceTimeStart + ' 至 ' + createPerformanceAuditTimeDO?.acceptanceTimeEnd : '';
        console.log('xxxxx', this.form.oldSmallPics, this.form.oldSmallVideo);
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
.extra-content {
  padding: 0 20px;
}
</style>
