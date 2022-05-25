<template>
  <div class="page">
    <el-form :model="form" ref="form" label-width="100px" class="demo-ruleForm" label-position="top">
      <sub-tit> 创建成效评价申请 </sub-tit>
      <basic-input :form="form"></basic-input>
      <sub-tit> 未来乡村创建成效评分表 </sub-tit>
      <score-table></score-table>
      <county-attach
        :data="form.countySaveAnnex"
        @addFile="onCountyFileAdd"
        @removeFile="onCountyFileRemove"
      ></county-attach>
    </el-form>
    <div>
      <el-button @click="onBack">返回</el-button>
      <el-button type="primary" @click="onSubmit">提交</el-button>
      <el-button type="primary" @click="onSave">保存待发</el-button>
    </div>
  </div>
</template>

<script>
import rule from '@/mixins/rule';

import SubTit from '../components/SubTit.vue';
import BasicInput from './BasicInput.vue';
import ScoreTable from './ScoreTable.vue';
import CountyAttach from './CountyAttach.vue';
export default {
  name: 'index',
  mixins: [rule],
  components: {
    SubTit,
    BasicInput,
    ScoreTable,
    CountyAttach,
  },

  data() {
    return {
      form: {
        areaId: '',
        batch: '',
        buildPutInCity: 0,
        buildPutInCounty: 0,
        buildSupportCity: 0,
        buildSupportCounty: 0,
        buildUseCity: 0,
        buildUseCounty: 0,
        carryOutConstructionCity: 0,
        carryOutConstructionCounty: 0,
        carryOutCreateCity: 0,
        carryOutCreateCounty: 0,
        completionStatement: '',
        conclusion: '',
        contactPerson: '',
        countySaveAnnex: [],
        digitalScenesCity: 0,
        digitalScenesCounty: 0,
        digitalSocietyCity: 0,
        digitalSocietyCounty: 0,
        featureCity: 0,
        featureCounty: 0,
        indicatorsCommonalityCity: 0,
        indicatorsCommonalityCounty: 0,
        indicatorsPersonalityCity: 0,
        indicatorsPersonalityCounty: 0,
        leader: '',
        negativeCity: 0,
        negativeCounty: 0,
        phone: '',
        saveToGo: 0,
        scenesBasicCity: 0,
        scenesBasicCounty: 0,
        scenesBuildCity: 0,
        scenesBuildCounty: 0,
        scenesEmphasisCity: 0,
        scenesEmphasisCounty: 0,
        totalCity: 0,
        totalCounty: 0,
        totalInvestment: 0,
        villageName: '',
        workBoardCity: 0,
        workBoardCounty: 0,
        workGuideCity: 0,
        workGuideCounty: 0,
        workMechanismCity: 0,
        workMechanismCounty: 0,
      },
    };
  },

  methods: {
    onBack() {
      this.$router.back();
    },
    onSubmit() {},
    onSave() {},

    // 县级附件上传
    onCountyFileAdd(file) {
      console.log('onCountyFileAdd', file);
      this.form['countySaveAnnex'].push(file);
    },
    onCountyFileRemove(file) {
      const index = this.form['countySaveAnnex'].findIndex((item) => {
        return item.uid === file.uid || item.filePath === file.url;
      });
      if (index !== -1) {
        this.form['countySaveAnnex'].splice(index, 1);
      }
    },
  },
};
</script>

<style scoped>
.page {
  padding: 20px;
  background-color: #fff;
}
</style>
