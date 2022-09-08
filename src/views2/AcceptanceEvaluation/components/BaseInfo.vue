<template>
  <div class="basic-info-module">
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="mb-8">
          <el-form-item label="片区名称"> {{ form.name }} </el-form-item>
        </div>
      </el-col>
      <el-col :span="8">
        <el-form-item label="创建批次" prop="countrySortNum">
          {{ saveVO.declarationBatch }}
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="总投资（万元）" prop="investNum">
          {{ formatMoney(saveVO.investNum) }}
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="领办领导" prop="leader">
          {{ saveVO.leader }}
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="联系人" prop="contactPerson">
          {{ saveVO.contactPerson }}
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="联系方式" prop="phone">
          {{ saveVO.phone }}
        </el-form-item>
      </el-col>
    </el-row>

    <el-form-item label="乡镇（街道）人民政府（办事处）关于创建方案完成情况说明" prop="basicText">
      {{ form.completionStatement }}
    </el-form-item>

    <el-form-item label="县（市、区）人民政府自评结论" prop="basicText">
      {{ form.conclusion }}
    </el-form-item>
    <el-form-item label="浙江省未来乡村创建成效自评总结">
      {{ form.selfAssessmentSummary }}
    </el-form-item>
    <el-form-item label="附件">
      <div v-if="form.countySaveAnnexFiles && form.countySaveAnnexFiles.length">
        <view-file v-for="(item, i) in form.countySaveAnnexFiles" :key="i" :data="item"></view-file>
      </div>
      <div v-else>--</div>
    </el-form-item>
    <el-form-item label="浙江省未来乡村“一老一小”服务场景验收自评报告">
      {{ form.oldSmallSelfReport }}
    </el-form-item>
    <el-form-item label="“一老一小”服务场景照片">
      <ViewImg v-if="form.oldSmallPics && form.oldSmallPics.length" :data="form.oldSmallPics"></ViewImg>
      <div v-else>--</div>
    </el-form-item>
    <el-form-item label="“一老一小”服务场景的视频">
      <ViewVideo v-if="form.oldSmallVideo && form.oldSmallVideo.length" :data="form.oldSmallVideo"></ViewVideo>
      <div v-else>--</div>
    </el-form-item>
  </div>
</template>
<script>
import ViewFile from './ViewFile.vue';
// import { getDetail } from '@/api2/acceptanceEvaluation';
import { formatMoney } from '@/views2/utils/formatter';

export default {
  components: {
    ViewFile,
  },
  props: {
    form: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      // 片区名称
      district: '',
    };
  },
  computed: {
    saveVO() {
      return this.form.saveVO || {};
    },
    villageType() {
      return this.saveVO.decType;
    },
  },
  methods: {
    formatMoney,
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.basic-info-module {
  padding: 20px;
}
</style>
