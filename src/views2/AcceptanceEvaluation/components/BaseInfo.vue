<template>
  <div style="position: relative">
    <base-box-title> 浙江省未来乡村创建成效申请表 </base-box-title>
    <BaseInfoTable v-if="showBaseInfoTable" :form="form" />
    <div class="examine-result">
      <img v-if="finalStatus || finalStatus === 0" :src="require(`../imgs/${finalStatus}.png`)" alt="" />
    </div>
    <base-box-title> 物业服务配备表 </base-box-title>
    <PropertyTable :form="form" />
    <base-box-title v-if="showForDetail"> 浙江省未来乡村创建成效自评总结 </base-box-title>
    <div v-if="showForDetail" class="basic-info-module">
      <el-form-item label="浙江省未来乡村创建成效自评总结">
        <view-file-single v-if="form.selfAssessmentFile" :data="form.selfAssessmentFile"></view-file-single>
        <div v-else>--</div>
      </el-form-item>
      <el-form-item label="附件">
        <view-file2
          v-if="form.countySaveAnnexFiles && form.countySaveAnnexFiles.length"
          :data="form.countySaveAnnexFiles"
        ></view-file2>
        <div v-else>--</div>
      </el-form-item>
    </div>
    <base-box-title v-if="showForDetail"> 浙江省未来乡村“一老一小”服务场景验收自评报告 </base-box-title>
    <div v-if="showForDetail" class="basic-info-module">
      <el-form-item label="">
        <!--        {{ form.oldSmallSelfReport }}-->
        <view-file-single v-if="form.oldSmallSelfReportFile" :data="form.oldSmallSelfReportFile"></view-file-single>
        <div v-else>--</div>
      </el-form-item>
      <!--      <el-form-item label="“一老一小”服务场景照片">-->
      <!--        <ViewImg v-if="form.oldSmallPics && form.oldSmallPics.length" :data="form.oldSmallPics"></ViewImg>-->
      <!--        <div v-else>&#45;&#45;</div>-->
      <!--      </el-form-item>-->
      <el-form-item label="“一老一小”服务场景的视频">
        <ViewVideo2 v-if="form.oldSmallVideo && form.oldSmallVideo.length" :data="form.oldSmallVideo"></ViewVideo2>
        <div v-else>--</div>
      </el-form-item>
    </div>
  </div>
</template>
<script>
// import ViewFile from './ViewFile.vue';
// import { getDetail } from '@/api2/acceptanceEvaluation';
import BaseInfoTable from './BaseInfoTable';
import PropertyTable from './PropertyTable';
import { formatMoney } from '@/views2/utils/formatter';
import role from '@/views2/mixins/role';
import { FINAL_STATUS } from '@/views2/utils/constants';

export default {
  components: {
    // ViewFile,
    PropertyTable,
    BaseInfoTable,
  },
  mixins: [role],
  props: {
    form: {
      type: Object,
      default: () => ({}),
    },
    showBaseInfoTable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // 片区名称
      district: '',
      showForDetail: true,
    };
  },

  computed: {
    finalStatus() {
      return this.form.finalStatus;
    },
  },
  methods: {
    formatMoney,
  },
  beforeMount() {
    if ((this.CITY || this.CITY_LEADER) && this.form.finalStatus === FINAL_STATUS.CITY_VERIFY_PENDING) {
      this.showForDetail = false;
    }
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.basic-info-module {
  padding: 20px;
}
.examine-result {
  position: absolute;
  right: 7px;
  top: -23px;
}
</style>
