<template>
  <el-form ref="form" class="form" label-position="top" :model="form" label-width="80px">
    <div class="detail-top">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="项目名称" prop="projectName" :rules="rule.input">
            {{ form.projectName }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="类型" prop="type">
            {{ form.type === null ? '--' : PROJECT_TYPE[Number(form.type)] }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="建设单位" prop="constructUnit" :rules="rule.input">
            {{ form.constructUnit }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="建设地点" prop="constructAddress" :rules="rule.input">
            {{ form.constructAddress }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="建设内容和规模" prop="constructDetail">
            {{ form.constructDetail }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="进度安排" prop="schedule" :rules="rule.input">
            {{ form.schedule + ' 至 ' + form.scheduleEnd }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="用地情况（m²）" prop="landUse">
            {{ form.landUse }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否开工" prop="isStart">
            {{ form.isStart === '' ? '--' : form.isStart ? '是' : '否' }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否竣工" prop="isEnd">
            {{ form.isEnd === '' ? '--' : form.isEnd ? '是' : '否' }}
          </el-form-item>
        </el-col>
      </el-row>
      <hr class="hr" />
      <div class="box-title">计划总投资（万元）</div>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="2022年计划投资" prop="planFirst">
            {{ formatMoney(form.planFirst || form.planFirstGov + form.planFirstDrive) }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="其中政府投资" prop="planFirstGov">
            {{ formatMoney(form.planFirstGov || 0) }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="其中带动投资" prop="planFirstDrive">
            {{ formatMoney(form.planFirstDrive || 0) }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="2023年计划投资" prop="planSecond">
            {{ formatMoney(form.planSecond || Number(form.planSecondGov) + Number(form.planSecondDrive)) }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="其中政府投资" prop="planSecondGov">
            {{ formatMoney(form.planSecondGov || 0) }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="其中带动投资" prop="planSecondDrive">
            {{ formatMoney(form.planSecondDrive || 0) }}
          </el-form-item>
        </el-col>
      </el-row>
      <hr class="hr" />
      <div class="box-title">完成总投资（万元）</div>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="2022年完成投资" prop="planSecond">
            {{ formatMoney(form.comFirst || Number(form.comFirstGov) + Number(form.comFirstDrive) || 0) }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="其中政府投资" prop="comFirstGov">
            {{ formatMoney(form.comFirstGov || 0) }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="其中带动投资" prop="comFirstDrive">
            {{ formatMoney(form.comFirstDrive) }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="2023年完成投资" prop="comSecond">
            {{ formatMoney(form.comSecond || Number(form.comSecondGov) + Number(form.comSecondDrive)) }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="其中政府投资" prop="comSecondGov">
            {{ formatMoney(form.comSecondGov) }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="其中带动投资" prop="comSecondDrive">
            {{ formatMoney(form.comSecondDrive) }}
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="计划投资完成率（%）" prop="planRate">
            {{ formatScore(form.planRate) }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="年度投资完成率（%）" prop="yearRate">
            {{ formatScore(form.yearRate) }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="总体进度（%）" prop="overallProgress">
            {{ formatScore(form.overallProgress) }}
          </el-form-item>
        </el-col>
      </el-row>
      <hr class="hr" />
      <ViewImg v-if="oldPics && oldPics.length" :data="oldPics" :modal="false"></ViewImg>
    </div>
  </el-form>
</template>

<script>
import { PROJECT_TYPE } from './constants';
import rule from '@/mixins/rule';
import { getFillInDEcho, progressReportDetail } from '@/api2/progressSubmission';
import { formatMoney, formatScore } from '@/views2/utils/formatter';
export default {
  mixins: [rule],
  props: {
    id: {
      type: Number,
      require: true,
    },
    value: {
      type: Boolean,
      default: true,
    },
    type: {
      type: String,
      default: 'add',
    },
    detailData: {
      type: Object,
      default: () => {},
    },
  },
  name: 'AddFillIn',
  data() {
    return {
      form: {
        projectName: '', // 项目名称
        type: '', // 类型
        constructUnit: '', // 建设单位
        constructAddress: '', // 建设地点
        constructDetail: '', // 建设内容和规模
        schedule: '', // 进度安排
        scheduleEnd: '', // 进度安排
        landUse: '', // 用地情况（m²）
        isStart: '', // 是否开工
        isEnd: '', // 是否竣工
        planFirst: '', // 2022年计划投资
        planFirstGov: '', // 其中政府投资
        planFirstDrive: [], // 其中带动投资
        planSecond: '', // 2023年计划投资
        planSecondGov: '', // 其中政府投资
        planSecondDrive: '', // 其中带动投资
        comFirst: '', // 2022年完成投资
        comFirstGov: '', // 其中政府投资
        comFirstDrive: '', // 其中带动投资
        comSecond: '', // 2023年完成投资
        comSecondGov: '', // 其中政府投资
        comSecondDrive: '', // 其中带动投资
        planRate: '', // 计划投资完成率
        yearRate: '', // 年度投资完成率
        overallProgress: '', // 总体进度
        monthPic: [], // 照片
      },
      typeOption: [],
      oldPics: [], //
      PROJECT_TYPE,
    };
  },
  beforeMount() {
    this.getData();
  },
  mounted() {},
  methods: {
    formatMoney,
    formatScore,
    async getData() {
      if (this.type === 'add') {
        console.log(this.detailData);
        this.form = this.detailData;
        if (this.form.monthPic) {
          this.oldPics = this.form.monthPic
            .split(',')
            .filter((ele) => Boolean(ele))
            .map((ele) => ({ filePath: ele }));
        }
      }
      if (this.type === 'detail') {
        const res = await progressReportDetail({ id: this.id });
        this.form = res;
        // const { projectName, type, planTotal, lastTotal, lastGov, lastDrive, lastOverallProgress, isStart } = res;
        // this.form.projectName = projectName;
        // this.form.type = type;
        // this.form.planTotal = planTotal;
        // this.form.lastTotal = lastTotal;
        // this.form.lastGov = lastGov;
        // this.form.lastDrive = lastDrive;
        // this.form.lastOverallProgress = lastOverallProgress;
        // this.form.isStart = isStart;
      }

      // this.oldMeetingPic = res.
    },
  },
};
</script>

<style lang="scss" scoped>
.el-form-item {
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  line-height: 22px;
  &::v-deep .el-form-item__label {
    font-size: 16px;
    color: #666666;
  }
  &::v-deep .el-form-item__content {
    font-size: 16px;
    color: #333333;
  }
}

.hr {
  border-top: 1px dashed #eeeeee;
  margin-top: 14px;
  margin-bottom: 32px;
}
.box-title {
  height: 40px;
  line-height: 40px;
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
  margin-bottom: 13px;
}
</style>
