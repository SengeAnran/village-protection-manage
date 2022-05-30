<template>
  <div class="page">
    <el-form :model="form" ref="form" label-width="100px" class="demo-ruleForm" label-position="top">
      <sub-tit> {{ (isEdit && '修改') || '创建' }}成效评价申请 </sub-tit>
      <basic-input :form="form" @change="villageChange"></basic-input>
      <sub-tit> 未来乡村创建成效评分表 </sub-tit>
      <score-table :form="form"></score-table>

      <file-attach
        :data="form.countySaveAnnex"
        @addFile="onCountyFileAdd"
        @removeFile="onCountyFileRemove"
      ></file-attach>

      <province-info v-if="[0, 1].includes(form.provinceVerify)" :form="form"></province-info>
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
import ProvinceInfo from '../components/ProvinceInfo.vue';

import { saveInfo, getDetail, updateInfo, getCountyTempData } from '@/api2/acceptanceEvaluation';
import { COUNTY_DEFAULT_FORM as DEFAULT_FORM } from '../constants';

export default {
  name: 'index',
  mixins: [rule],
  components: {
    SubTit,
    BasicInput,
    ScoreTable,
    FileAttach,
    ProvinceInfo,
  },
  data() {
    return {
      form: {
        isSave: undefined,
        areaId: '',
        buildPutInCounty: '',
        buildSupportCounty: '',
        buildUseCounty: '',
        carryOutConstructionCounty: '',
        carryOutCreateCounty: '',
        completionStatement: '',
        conclusion: '',
        countySaveAnnex: [],
        declarationId: '',
        digitalScenesCounty: '',
        digitalSocietyCounty: '',
        featureCounty: '',
        indicatorsCommonalityCounty: '',
        indicatorsPersonalityCounty: '',
        negativeCounty: '',
        saveToGo: '',
        scenesBasicCounty: '',
        scenesBuildCounty: '',
        scenesEmphasisCounty: '',
        totalCounty: '',
        workBoardCounty: '',
        workGuideCounty: '',
        workMechanismCounty: '',
      },
      hasTempData: false,
    };
  },

  computed: {
    isEdit() {
      const query = this.$route.query;
      return query.id && query.edit;
    },
    saveMethod() {
      return this.isEdit ? updateInfo : saveInfo;
      // return saveInfo;
    },
    tempSaveMethod() {
      // return this.hasTempData ? updateInfo : saveInfo;
      return saveInfo;
    },
  },

  methods: {
    onBack() {
      this.$router.back();
    },
    onSubmit() {
      this.$refs.form.validate(async (valid) => {
        if (!valid) return;
        await this._beforeSubmit('是否确认提交？');

        // const form = { ...this.form };
        const form = this._assignForm();
        form.countySaveAnnex = this.form.countySaveAnnex.map((c) => c.fileId).join(',');
        form.saveToGo = 0;
        this._saveInfo(form);
      });
    },

    async onSave() {
      await this._beforeSubmit('是否保存待发？');

      // const form = { ...this.form };
      const form = this._assignForm();
      form.countySaveAnnex = this.form.countySaveAnnex.map((c) => c.fileId).join(',');
      form.saveToGo = 1;
      // this._saveInfo(form, '保存成功！');
      this.tempSaveMethod(form).then(() => {
        this.$notify.success({
          title: '保存成功！',
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

    _assignForm() {
      const form = {};
      Object.keys(DEFAULT_FORM).map((key) => {
        form[key] = this.form[key];
      });
      return form;
    },

    _saveInfo(form, message) {
      this.saveMethod(form).then(() => {
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
    // 获取保存待发数据
    getCountyTempData() {
      getCountyTempData().then((res) => {
        // console.log(res, '获取保存待发数据');
        this.hasTempData = Boolean(res);
        this.form = res || { ...DEFAULT_FORM };
        this.form.countySaveAnnex = res.countySaveAnnexFiles || [];
      });
    },

    _modifyPageTitle(val) {
      this.$route.meta.title = val;
    },
  },

  mounted() {
    const query = this.$route.query;
    if (query.id && query.edit) {
      this.getData();
      this._modifyPageTitle('修改');
    } else {
      this.getCountyTempData();
      this._modifyPageTitle('新增');
    }
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
