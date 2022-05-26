<template>
  <div>
    <el-form :model="form" ref="form" label-width="100px" class="demo-ruleForm" label-position="top">
      <base-info :form="form"></base-info>
      <score-table :form="form"></score-table>
      <city-input :form="form"></city-input>
    </el-form>

    <div style="margin-top: 50px; text-align: center">
      <el-button @click="onBack">返回</el-button>
      <el-button type="primary" @click="onSubmit">提交</el-button>
      <el-button type="primary" @click="onSave">保存待发</el-button>
    </div>
  </div>
</template>
<script>
import BaseInfo from '../components/BaseInfo.vue';
import ScoreTable from '../components/ScoreTable.vue';
import CityInput from '../components/CityInput.vue'; // 市区审核

import { cityAudit, getDetail } from '@/api2/acceptanceEvaluation';

const DEFALUT_FORM = {
  cityAcceptTime: '',
  cityLevelRating: '',
  cityRanking: '',
  citySaveAnnex: [],
  cityVerify: '',
  id: 0,
  saveToGoCity: 0, //0/1 默认是提交
  cityOpinion: '', // 驳回说明

  buildPutInCity: '',
  buildSupportCity: '',
  buildUseCity: '',
  carryOutConstructionCity: '',
  carryOutCreateCity: '',
  digitalScenesCity: '',
  digitalSocietyCity: '',
  featureCity: '',
  indicatorsCommonalityCity: '',
  indicatorsPersonalityCity: '',
  negativeCity: '',
  scenesBasicCity: '',
  scenesBuildCity: '',
  scenesEmphasisCity: '',
  totalCity: '',
  workBoardCity: '',
  workGuideCity: '',
  workMechanismCity: '',
};

export default {
  components: { BaseInfo, CityInput, ScoreTable },
  data() {
    return {
      detail: {},
      form: {
        cityAcceptTime: '',
        cityLevelRating: '',
        cityRanking: '',
        citySaveAnnex: [],
        cityVerify: '',
        id: 0,
        saveToGoCity: 0, //0/1 默认是提交
        cityOpinion: '', // 驳回说明

        buildPutInCity: '',
        buildSupportCity: '',
        buildUseCity: '',
        carryOutConstructionCity: '',
        carryOutCreateCity: '',
        digitalScenesCity: '',
        digitalSocietyCity: '',
        featureCity: '',
        indicatorsCommonalityCity: '',
        indicatorsPersonalityCity: '',
        negativeCity: '',
        scenesBasicCity: '',
        scenesBuildCity: '',
        scenesEmphasisCity: '',
        totalCity: '',
        workBoardCity: '',
        workGuideCity: '',
        workMechanismCity: '',
      },
    };
  },
  methods: {
    getDetail() {
      const id = this.$route.query.id;
      getDetail({ id }).then((res) => {
        this.form = res;
        this.form.citySaveAnnex = res.countySaveAnnexFiles || [];
      });
    },
    onBack() {
      this.$router.back();
    },
    onSubmit() {
      this.$refs.form.validate(async (valid) => {
        if (!valid) return;
        await this._beforeSubmit('是否确认提交？');

        // const form = { ...this.form };
        const form = this._assignForm();
        form.citySaveAnnex = this.form.citySaveAnnex.map((c) => c.fileId).join(',');
        form.saveToGoCity = 0;
        this._saveInfo(form);
      });
    },
    async onSave() {
      await this._beforeSubmit('是否保存待发？');

      // const form = { ...this.form };
      const form = this._assignForm();
      form.citySaveAnnex = this.form.citySaveAnnex.map((c) => c.fileId).join(',');
      form.saveToGoCity = 1;
      this._saveInfo(form, '保存成功！');
    },

    _saveInfo(form, message) {
      cityAudit(form).then((res) => {
        console.log(res, 'res-----');
        this.$notify.success({
          title: message || '提交成功！',
        });

        this.$router.back();
      });
    },
    _assignForm() {
      const form = {};
      Object.keys(DEFALUT_FORM).map((key) => {
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
  },
  mounted() {
    this.getDetail();
  },
};
</script>
