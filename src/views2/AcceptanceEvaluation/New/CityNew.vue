<template>
  <div>
    <el-form :model="form" ref="form" label-width="100px" class="demo-ruleForm" label-position="top">
      <sub-tit> 申报详情</sub-tit>
      <base-info :form="form"></base-info>
      <sub-tit> 未来乡村创建成效评分表 </sub-tit>
      <score-table :form="form" @evaluateChange="setCityRanking"></score-table>
      <city-input :form="form" @evaluateChange="setCityRanking"></city-input>

      <province-info v-if="[0, 1].includes(form.provinceVerify)" :form="form"></province-info>
    </el-form>

    <div style="margin-top: 50px; text-align: center">
      <el-button @click="onBack">返回</el-button>
      <el-button type="primary" @click="onSubmit">保存</el-button>
      <!-- <el-button type="primary" @click="onSave">保存待发</el-button> -->
    </div>
  </div>
</template>
<script>
import BaseInfo from '../components/BaseInfo.vue';
import ScoreTable from '../components/ScoreTable.vue';
import CityInput from '../components/CityInput.vue'; // 市区审核
import ProvinceInfo from '../components/ProvinceInfo.vue';
import SubTit from '../components/SubTit.vue';

import { cityAudit, getDetail, getCityRanking } from '@/api2/acceptanceEvaluation';
import { CITY_DEFAULT_FORM as DEFAULT_FORM } from '../constants';

export default {
  components: { BaseInfo, CityInput, ScoreTable, ProvinceInfo, SubTit },
  data() {
    return {
      form: {
        cityAcceptTime: '',
        cityLevelRating: '',
        cityRanking: '', // 实际仅仅用作展示
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
        console.log(res);
        const { oldSmallVideoFile } = res;
        this.form = res;
        this.form.countySaveAnnex = res.countySaveAnnexFiles || [];
        this.form.citySaveAnnex = res.citySaveAnnexFiles ? res.citySaveAnnexFiles[0] : {};
        this.form.oldSmallPics = (res.oldSmallPics || '').split(',').map((ele) => ({ filePath: ele, url: ele }));
        this.form.oldSmallVideo = oldSmallVideoFile ? [oldSmallVideoFile] : [];
        // this.form.cityAcceptTimeStr = createPerformanceAuditTimeDO ? createPerformanceAuditTimeDO?.acceptanceTimeStart + ' 至 ' + createPerformanceAuditTimeDO?.acceptanceTimeEnd : '';
      });
    },
    onBack() {
      this.$router.back();
    },
    setCityRanking() {
      const { totalCity, acceptTime } = this.form;
      if (!totalCity || totalCity === 0) {
        return;
      }
      if (!acceptTime) {
        return;
      }
      this._getCityRanking();
    },
    onSubmit() {
      //  如果只是驳回操作的话，不上传评分，也不校验评分
      if (this.form.cityVerify === 0) {
        this.$refs.form.validateField(['cityOpinion'], async (message) => {
          if (message) return;
          await this._beforeSubmit('是否确认保存？');

          // const form = { ...this.form };
          const form = this._assignForm();
          form.citySaveAnnex = this.form.citySaveAnnex.fileId;
          form.saveToGoCity = 0;

          form.carryOutCreateCity = null;
          form.carryOutConstructionCity = null;
          form.indicatorsCommonalityCity = null;
          form.indicatorsPersonalityCity = null;
          form.digitalSocietyCity = null;
          form.digitalScenesCity = null;
          form.scenesBasicCity = null;
          form.scenesBuildCity = null;
          form.scenesEmphasisCity = null;
          form.buildPutInCity = null;
          form.buildSupportCity = null;
          form.buildUseCity = null;
          form.workMechanismCity = null;
          form.workBoardCity = null;
          form.workGuideCity = null;
          form.featureCity = null;
          form.negativeCity = null;

          this._saveInfo(form);
        });
      } else {
        this.$refs.form.validate(async (valid) => {
          if (!valid) return;
          await this._beforeSubmit('是否确认提交？');

          // const form = { ...this.form };
          const form = this._assignForm();
          form.citySaveAnnex = this.form.citySaveAnnex.fileId;
          form.saveToGoCity = 0;
          this._saveInfo(form);
        });
      }
    },
    async onSave() {
      await this._beforeSubmit('是否保存待发？');

      // const form = { ...this.form };
      const form = this._assignForm();
      form.citySaveAnnex = this.form.citySaveAnnex.fileId;
      form.saveToGoCity = 1;
      this._saveInfo(form, '保存成功！');
    },

    _saveInfo(form, message) {
      cityAudit(form).then((res) => {
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
    _getCityRanking() {
      const params = {
        areaId: this.$store.getters.userInfo.areaId,
        acceptTime: this.form.acceptTime,
        totalCity: this.form.totalCity,
      };
      getCityRanking(params).then((res) => {
        this.form.cityRanking = res;
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
