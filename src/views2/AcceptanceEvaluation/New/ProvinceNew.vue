<template>
  <div>
    <el-form :model="form" ref="form" label-width="100px" class="demo-ruleForm" label-position="top">
      <sub-tit> 申报详情 </sub-tit>
      <base-info :showBaseInfoTable="showBaseInfoTable" :form="form"></base-info>
      <score-table :form="form" disabled></score-table>
      <!--      <city-info :form="form"></city-info>-->
      <province-input :form="form"></province-input>
    </el-form>

    <div style="margin-top: 50px; text-align: center">
      <el-button @click="onBack">返回</el-button>
      <el-button type="primary" @click="onSubmit">提交</el-button>
      <!-- <el-button type="primary" @click="onSave">保存待发</el-button> -->
    </div>
  </div>
</template>
<script>
import BaseInfo from '../components/BaseInfo.vue';
import ScoreTable from '../components/ScoreTable.vue';
import CityInfo from '../components/CityInfo.vue';
import ProvinceInput from '../components/ProvinceInput.vue';
import SubTit from '../components/SubTit.vue';

import { provinceAudit, getDetail } from '@/api2/acceptanceEvaluation';
import { PROVINCE_DEFAULT_FORM as DEFAULT_FORM } from '../constants';

export default {
  components: { BaseInfo, CityInfo, ScoreTable, ProvinceInput, SubTit },
  data() {
    return {
      form: {
        id: 0,
        provinceOpinion: '',
        provinceVerify: '',
        saveToGoProvince: 0,
        selfAssessmentFile: {},
        oldSmallSelfReportFile: {},
      },
      showBaseInfoTable: false,
    };
  },
  methods: {
    getDetail() {
      const id = this.$route.query.id;
      getDetail({ id }).then((res) => {
        const { oldSmallVideoFile, createPerformanceAuditTimeDO } = res;
        this.form = res;
        this.form.countySaveAnnex = res.countySaveAnnexFiles || [];
        this.form.citySaveAnnex = res.citySaveAnnexFiles ? res.citySaveAnnexFiles[0] : {};
        // this.form.citySaveAnnex = res.countySaveAnnexFiles || [];
        this.form.oldSmallPics = (res.oldSmallPics || '').split(',').map((ele) => ({ filePath: ele, url: ele }));
        this.form.oldSmallVideo = oldSmallVideoFile ? [oldSmallVideoFile] : [];
        // this.form.cityAcceptTime = createPerformanceAuditTimeDO?.id;
        this.form.cityAcceptTimeStr = createPerformanceAuditTimeDO
          ? createPerformanceAuditTimeDO?.acceptanceTimeStart + ' 至 ' + createPerformanceAuditTimeDO?.acceptanceTimeEnd
          : '';
        this.showBaseInfoTable = true;
      });
    },
    onBack() {
      this.$router.back();
    },
    onSubmit() {
      this.$refs.form.validate(async (valid) => {
        if (!valid) return;
        let msg;
        if (this.form.provinceVerify === 0) {
          // 驳回市级重填
          msg = '是否确认驳回该条申报信息，驳回后将流转至市级修改';
        } else if (this.form.provinceVerify === 1) {
          // 通过
          msg = '是否确认通过该条申报信息';
        } else {
          msg = '是否确认不通过该条申报信息';
        }
        await this._beforeSubmit(msg);

        // const form = { ...this.form };
        const form = this._assignForm();
        form.saveToGoProvince = 0;
        this._saveInfo(form, '提交成功');
      });
    },
    async onSave() {
      await this._beforeSubmit('是否保存待发？');

      // const form = { ...this.form };
      const form = this._assignForm();
      form.saveToGoProvince = 1;
      this._saveInfo(form, '保存成功！');
    },

    _saveInfo(form, message) {
      provinceAudit(form).then((res) => {
        console.log(res, 'res-----');
        this.$notify.success({
          title: message || '保存成功！',
        });

        this.$router.back();
      });
    },
    _assignForm() {
      const form = {};
      Object.keys(DEFAULT_FORM).map((key) => {
        form[key] = this.form[key];
      });
      return form;
    },
    _beforeSubmit(msg) {
      return new Promise((resolve) => {
        this.$confirm(msg, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          resolve();
        });
      });
    },
    _modifyPageTitle(val) {
      this.$route.meta.title = val;
    },
  },
  mounted() {
    this.getDetail();
    this._modifyPageTitle('审核');
  },
};
</script>
