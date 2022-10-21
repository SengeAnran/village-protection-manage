<template>
  <div>
    <el-form :model="form" ref="form" label-width="100px" class="demo-ruleForm" label-position="top">
      <sub-tit> {{ (isEdit && '修改') || '创建' }}成效评价申请 </sub-tit>
      <basic-input :form="form" @change="villageChange"></basic-input>
      <sub-tit> 浙江省未来乡村创建成效自评总结 </sub-tit>
      <div style="padding: 20px; padding-top: 4px">
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="mb-8 mt-2">
              <el-form-item prop="selfAssessmentSummary" label="浙江省未来乡村创建成效自评总结" :rules="rule.input">
                <el-input
                  style="min-width: 42%; max-width: 90%"
                  type="textarea"
                  :rows="5"
                  :autosize="{ minRows: 10 }"
                  :placeholder="`一、基本情况
二、创建方案的实施情况
三、数字化建设与应用情况
四、场景特别是“一老一小”场景建设情况
五、建设投入情况
六、工作推进情况
七、特色和创新情况
八、相关附件
报告中涉及到的支撑材料可作为附件单独提供，并需提供附件清单方便查阅。`"
                  show-word-limit
                  v-model="form.selfAssessmentSummary"
                />
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <file-attach
          :data="form.countySaveAnnex"
          :required="false"
          desc1="报告中涉及的支撑材料可作为附件单独提供，并需提供附件清单方便查阅"
          :showDesc2="false"
          @addFile="onCountyFileAdd"
          @removeFile="onCountyFileRemove"
        ></file-attach>
      </div>
      <sub-tit> 浙江省未来乡村“一老一小”服务场景验收自评报告 </sub-tit>
      <div style="padding: 20px; padding-top: 4px">
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="mb-8 mt-2">
              <el-form-item
                prop="oldSmallSelfReport"
                label="浙江省未来乡村“一老一小”服务场景验收自评报告"
                :rules="rule.input"
              >
                <el-input
                  style="min-width: 42%; max-width: 90%"
                  type="textarea"
                  maxlength="500"
                  :rows="5"
                  :autosize="{ minRows: 5 }"
                  :placeholder="`一、基本情况
二、建设成效及制度建设情况
三、数字化建设与应用情况
四、特色和创新情况。`"
                  show-word-limit
                  v-model="form.oldSmallSelfReport"
                />
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-form-item
          label="请上传有“一老一小”服务场景照片，各场景3至5张（包含场景全景照、运维现场照）"
          :rules="rule.upload"
          prop="oldSmallPics"
        >
          <p style="color: #ff6b00" class="py-4 leading-5">
            <span style="display: block">
              <i class="el-icon-warning"></i>
              照片大小范围为1MB-10MB之间
            </span>
          </p>
          <UploadImg2 :defaultData="oldSmallPicsDefault" v-model="form.oldSmallPics" :limit="10" />
        </el-form-item>
        <el-form-item label="请上传有关“一老一小”服务场景的视频" :rules="rule.upload" prop="oldSmallVideo">
          <p style="color: #ff6b00" class="py-4 leading-5">
            <span style="display: block">
              <i class="el-icon-warning"></i>
              视频大小不可超过600MB
            </span>
          </p>
          <UploadVideo2 :defaultData="oldSmallVideoDefault" v-model="form.oldSmallVideo" />
        </el-form-item>
      </div>
      <sub-tit> 未来乡村创建成效评分表 </sub-tit>
      <score-table :form="form"></score-table>
      <province-info v-if="[0, 1].includes(form.provinceVerify)" :form="form"></province-info>
    </el-form>
    <div class="action-wrp">
      <el-button @click="onBack">返回</el-button>
      <el-button type="primary" @click="onSubmit">保存</el-button>
      <!-- <el-button type="primary" @click="onSave">保存待发</el-button> -->
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

import { saveInfo, getDetail } from '@/api2/acceptanceEvaluation';
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
        ...DEFAULT_FORM,
      },
      loading: true,
      hasTempData: false,
      oldSmallPicsDefault: [],
      oldSmallVideoDefault: [],
    };
  },

  computed: {
    isEdit() {
      const query = this.$route.query;
      return query.id && query.edit;
    },
    saveMethod() {
      // return this.isEdit ? updateInfo : saveInfo;
      return saveInfo;
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
        await this._beforeSubmit('是否确认保存？');

        // const form = { ...this.form };
        const form = this._assignForm();
        form.countySaveAnnex = this.form.countySaveAnnex.map((c) => c.fileId).join(',');
        form.oldSmallPics = this.form.oldSmallPics.map((c) => c.filePath).join(',');
        form.oldSmallVideo = this.form.oldSmallVideo.map((c) => c.fileId).join(',');

        form.saveToGo = 0;
        this._saveInfo(form);
      });
    },

    async onSave() {
      await this._beforeSubmit('是否保存待发？');

      // const form = { ...this.form };
      const form = this._assignForm();
      form.countySaveAnnex = this.form.countySaveAnnex.map((c) => c.fileId).join(',');
      form.oldSmallPics = this.form.oldSmallPics.map((c) => c.filePath).join(',');
      form.oldSmallVideo = this.form.oldSmallVideo.map((c) => c.fileId).join(',');

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
      // console.log('xxxxxx _saveInfo', form, message);
      this.saveMethod(form).then(() => {
        this.$notify.success({
          title: message || '保存成功！',
        });

        this.$router.back();
      });
    },

    // 县级附件上传
    onCountyFileAdd(file) {
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
      this.$refs.form.validateField(['areaId', 'declarationId']);
    },

    getData() {
      const id = this.$route.query.id;
      getDetail({ id }).then((res) => {
        const { oldSmallVideoFile, createPerformanceAuditTimeDO } = res;
        this.form = res;
        this.form.selfAssessmentSummary = res.selfAssessmentSummary || '';
        this.form.countySaveAnnex = res.countySaveAnnexFiles || [];
        this.oldSmallPicsDefault = (res.oldSmallPics || '')
          .split(',')
          .filter((ele) => Boolean(ele))
          .map((ele) => ({ filePath: ele }));
        this.form.oldSmallPics = [];
        this.oldSmallVideoDefault = oldSmallVideoFile ? [oldSmallVideoFile] : [];
        this.form.oldSmallVideo = [];
        this.form.cityAcceptTime = createPerformanceAuditTimeDO?.id;
        this.form.cityAcceptTimeStr = createPerformanceAuditTimeDO
          ? createPerformanceAuditTimeDO?.acceptanceTimeStart + ' 至 ' + createPerformanceAuditTimeDO?.acceptanceTimeEnd
          : '';
        // console.log('getDetail', this.form);
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
      this._modifyPageTitle('新增');
    }
    setTimeout(() => {
      this.loading = false;
      console.log('xxxxxxx loading false');
    }, 1000);
  },
};
</script>

<style scoped lang="scss">
.action-wrp {
  margin-top: 50px;
  text-align: center;
}
</style>
