<template>
  <div class="page">
    <el-form :model="form" ref="form" label-width="100px" class="demo-ruleForm" label-position="top">
      <sub-tit> 创建成效评价申请 </sub-tit>
      <basic-input :form="form" @change="villageChange"></basic-input>
      <sub-tit> 未来乡村创建成效评分表 </sub-tit>
      <score-table :form="form"></score-table>

      <file-attach
        :data="form.countySaveAnnex"
        @addFile="onCountyFileAdd"
        @removeFile="onCountyFileRemove"
      ></file-attach>
    </el-form>
    <div class="action-wrp">
      <el-button @click="onBack">返回</el-button>
      <el-button type="primary" @click="onSubmit">提交</el-button>
      <el-button type="primary" @click="onSave">保存待发</el-button>
    </div>
  </div>
</template>

<script>
import rule from '@/mixins/rule';

import SubTit from '../components/SubTit.vue';
import BasicInput from '../components/BasicInput.vue';
import ScoreTable from '../components/ScoreTable.vue';
import FileAttach from '../components/FileAttach.vue'; // 附件上传

import { saveInfo, getDetail } from '@/api2/acceptanceEvaluation';

export default {
  name: 'index',
  mixins: [rule],
  components: {
    SubTit,
    BasicInput,
    ScoreTable,
    FileAttach,
  },
  // 接口文档地址： http://172.16.25.142:5000/doc.html#/%E6%9C%AA%E6%9D%A5%E4%B9%A1%E6%9D%91%E5%B7%A5%E4%BD%9C%E5%8F%B0%E6%9C%8D%E5%8A%A1/%E6%9C%AA%E6%9D%A5%E4%B9%A1%E6%9D%91%E5%88%9B%E5%BB%BA%E6%88%90%E6%95%88/createUsingPOST
  data() {
    return {
      form: {
        areaId: '',
        buildPutInCity: '',
        buildPutInCounty: '',
        buildSupportCity: '',
        buildSupportCounty: '',
        buildUseCity: '',
        buildUseCounty: '',
        carryOutConstructionCity: '',
        carryOutConstructionCounty: '',
        carryOutCreateCity: '',
        carryOutCreateCounty: '',
        completionStatement: '',
        conclusion: '',
        countySaveAnnex: [],
        declarationId: '',
        digitalScenesCity: '',
        digitalScenesCounty: '',
        digitalSocietyCity: '',
        digitalSocietyCounty: '',
        featureCity: '',
        featureCounty: '',
        indicatorsCommonalityCity: '',
        indicatorsCommonalityCounty: '',
        indicatorsPersonalityCity: '',
        indicatorsPersonalityCounty: '',
        negativeCity: '',
        negativeCounty: '',
        saveToGo: '',
        scenesBasicCity: '',
        scenesBasicCounty: '',
        scenesBuildCity: '',
        scenesBuildCounty: '',
        scenesEmphasisCity: '',
        scenesEmphasisCounty: '',
        totalCity: '',
        totalCounty: '',
        workBoardCity: '',
        workBoardCounty: '',
        workGuideCity: '',
        workGuideCounty: '',
        workMechanismCity: '',
        workMechanismCounty: '',
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
        form.countySaveAnnex = this.form.countySaveAnnex.map((c) => c.fileId).join(',');
        form.saveToGo = 0;
        this._saveInfo(form);
      });
    },

    async onSave() {
      await this._beforeSubmit('是否保存待发？');

      const form = { ...this.form };
      form.countySaveAnnex = this.form.countySaveAnnex.map((c) => c.fileId).join(',');
      form.saveToGo = 1;
      this._saveInfo(form, '保存成功！');
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

    _saveInfo(form, message) {
      saveInfo(form).then((res) => {
        console.log(res, 'res-----');
        this.$notify.success({
          title: message || '提交成功！',
        });

        this.$router.back();
      });
    },

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

    villageChange(val) {
      this.form.areaId = val.areaId;
      this.form.declarationId = val.declarationId;

      this.$refs.form.validateField('areaId');
      this.$refs.form.validateField('declarationId');
    },

    getData() {
      const id = this.$route.query.id;
      getDetail({ id }).then((res) => {
        this.form = res;
        this.form.countySaveAnnex = res.countySaveAnnexFiles || [];
      });
    },
  },
  mounted() {
    const query = this.$route.query;
    query.id && query.edit && this.getData();
  },
};
</script>

<style scoped lang="scss">
.page {
  padding: 20px;
  background-color: #fff;

  .action-wrp {
    margin-top: 50px;
    text-align: center;
  }
}
</style>
