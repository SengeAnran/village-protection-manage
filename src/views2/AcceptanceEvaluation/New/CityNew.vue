<template>
  <div>
    <el-form :model="form" ref="form" label-width="100px" class="demo-ruleForm" label-position="top">
      <base-info></base-info>
      <score-table :form="detailData"></score-table>
      <sub-tit> 设区市比选意见 </sub-tit>
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
import SubTit from '../components/SubTit.vue';
import BaseInfo from '../components/BaseInfo.vue';
import ScoreTable from '../components/ScoreTable.vue';
import CityInput from '../components/CityInput.vue'; // 市区审核

import { cityAudit } from '@/api2/acceptanceEvaluation';

export default {
  components: { BaseInfo, SubTit, CityInput, ScoreTable },
  data() {
    return {
      detailData: {},
      form: {
        cityAcceptTime: '',
        cityLevelRating: '',
        cityRanking: '',
        citySaveAnnex: [],
        cityVerify: 1, // 默认选中通过
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
    onBack() {
      this.$router.back();
    },
    onSubmit() {
      this.$refs.form.validate(async (valid) => {
        if (!valid) return;
        await this._beforeSubmit('是否确认提交？');

        const form = { ...this.form };
        form.countySaveAnnex = this.form.citySaveAnnex.map((c) => c.fileId).join(',');
        form.saveToGoCity = 0;
        this._saveInfo(form);
      });
    },
    async onSave() {
      await this._beforeSubmit('是否保存待发？');

      const form = { ...this.form };
      form.countySaveAnnex = this.form.citySaveAnnex.map((c) => c.fileId).join(',');
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
};
</script>
