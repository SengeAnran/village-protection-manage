<template>
  <div>
    <el-form :model="form" ref="form" label-width="100px" class="demo-ruleForm" label-position="top">
      <base-info></base-info>
      <score-table :form="form" disabled></score-table>
      <city-info :form="form"></city-info>
      <province-input :form="form"></province-input>
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
import CityInfo from '../components/CityInfo.vue';
import ProvinceInput from '../components/ProvinceInput.vue';

import { cityAudit, getDetail } from '@/api2/acceptanceEvaluation';

export default {
  components: { BaseInfo, CityInfo, ScoreTable, ProvinceInput },
  data() {
    return {
      form: {
        id: 0,
        provinceOpinion: '',
        provinceVerify: '',
        saveToGoProvince: 0,
      },
    };
  },
  methods: {
    getDetail() {
      const id = this.$route.query.id;
      getDetail({ id }).then((res) => {
        console.log(res);
      });
    },
    onBack() {
      this.$router.back();
    },
    onSubmit() {
      this.$refs.form.validate(async (valid) => {
        if (!valid) return;
        await this._beforeSubmit('是否确认提交？');

        const form = { ...this.form };
        form.saveToGoProvince = 0;
        this._saveInfo(form);
      });
    },
    async onSave() {
      await this._beforeSubmit('是否保存待发？');

      const form = { ...this.form };
      form.saveToGoProvince = 1;
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
  mounted() {
    this.getDetail();
  },
};
</script>
