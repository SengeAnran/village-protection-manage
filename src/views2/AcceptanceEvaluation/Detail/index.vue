<template>
  <div class="page">
    <RouterBack>详情</RouterBack>
    <el-form ref="form" label-width="100px" class="demo-ruleForm" label-position="top">
      <BaseInfo :showBaseInfoTable="showBaseInfoTable" :form="form" />
      <base-box-title> 未来乡村创建成效评分表 </base-box-title>
      <score-table :form="form" disabled></score-table>
      <!--      <city-info v-if="showCity" :form="form"></city-info>-->
      <!--      <province-info v-if="showProvince" :form="form"></province-info>-->
      <div class="extra-content" v-if="showDownLoad(form)">
        <sub-tit class="mb-4"> 扫描件下载 </sub-tit>
        <div class="extra-content">
          <view-file2 :data="form.multipartFileVO"></view-file2>
        </div>
      </div>
    </el-form>

    <div style="text-align: center; padding: 40px">
      <el-button @click="$router.back()">返回</el-button>
      <el-button v-if="showModify(form)" @click="edit(form)" type="primary">修改</el-button>
    </div>
  </div>
</template>

<script>
import BaseInfo from '../components/BaseInfo.vue';
import BaseInfoTable from '../components/BaseInfoTable';
import PropertyTable from '../components/PropertyTable';
import ScoreTable from '../components/ScoreTable.vue';
import CityInfo from '../components/CityInfo.vue';
import ProvinceInfo from '../components/ProvinceInfo.vue';

import { getDetail } from '@/api2/acceptanceEvaluation';

import { FINAL_STATUS } from '@/views2/utils/constants';
import role from '@/views2/mixins/role';

export default {
  name: 'index',
  components: { BaseInfo, ScoreTable, CityInfo, ProvinceInfo, BaseInfoTable, PropertyTable },
  mixins: [role],
  data() {
    return {
      form: {},
      finalStatus: null,
      showBaseInfoTable: false,
    };
  },
  computed: {
    showCity() {
      const finalStatus = this.form.finalStatus;
      const canViewStatus =
        finalStatus !== FINAL_STATUS.COUNTRY_REPORT_PENDING && finalStatus != FINAL_STATUS.CITY_VERIFY_PENDING;
      let canViewIdentity = canViewStatus;
      if ((this.COUNTRY || this.COUNTRY_LEADER) && finalStatus !== FINAL_STATUS.CITY_VERIFY_REJECTED) {
        canViewIdentity = false;
      }
      return canViewIdentity;
    },
    showProvince() {
      const finalStatus = this.form.finalStatus;
      const canViewStatus =
        finalStatus === FINAL_STATUS.PROVINCE_VERIFY_REJECTED ||
        finalStatus === FINAL_STATUS.PROVINCE_VERIFY_PASSED ||
        finalStatus === FINAL_STATUS.PROVINCE_VERIFY_REJECTED2;
      let canViewIdentity = canViewStatus;
      if (
        this.COUNTRY ||
        this.COUNTRY_LEADER ||
        ((this.CITY || this.CITY_LEADER) && finalStatus === FINAL_STATUS.PROVINCE_VERIFY_PASSED)
      ) {
        canViewIdentity = false;
      }
      return canViewIdentity;
    },
  },
  methods: {
    // 是否显示修改
    showModify(data) {
      const countryShow =
        (this.COUNTRY || this.COUNTRY_LEADER) &&
        (data.finalStatus === FINAL_STATUS.COUNTRY_REPORT_PENDING ||
          data.finalStatus === FINAL_STATUS.CITY_VERIFY_REJECTED);
      const cityShow =
        (this.CITY || this.CITY_LEADER) &&
        (data.finalStatus === FINAL_STATUS.CITY_REPORT_PENDING ||
          data.finalStatus === FINAL_STATUS.PROVINCE_VERIFY_REJECTED);
      return countryShow || cityShow;
    },
    showDownLoad(data) {
      return data.multipartFileVO && data.multipartFileVO.length > 0;
    },
    // 修改
    edit(data) {
      const { id } = data;
      this.$router.push({
        name: 'NewAcceptanceEvaluation',
        query: { id, edit: true },
      });
    },
    getData() {
      const id = this.$route.query.id;
      getDetail({ id }).then((res) => {
        const { oldSmallVideoFile, createPerformanceAuditTimeDO, multipartFileVO } = res;
        this.form = res;
        this.finalStatus = res.finalStatus;
        // this.form.oldSmallPics = (res.oldSmallPics || '').split(',').map((ele) => ({ filePath: ele, url: ele }));
        this.form.oldSmallVideo = oldSmallVideoFile ? [oldSmallVideoFile] : [];
        // this.form.cityAcceptTime = createPerformanceAuditTimeDO?.id;
        this.form.multipartFileVO = multipartFileVO ? [multipartFileVO] : [];
        this.form.cityAcceptTimeStr = createPerformanceAuditTimeDO
          ? createPerformanceAuditTimeDO?.acceptanceTimeStart + ' 至 ' + createPerformanceAuditTimeDO?.acceptanceTimeEnd
          : '';
        this.showBaseInfoTable = true;
        // console.log('xxxxx', this.form.oldSmallPics, this.form.oldSmallVideo);
      });
    },
  },
  beforeMount() {
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
.demo-ruleForm {
  position: relative;
}
</style>
