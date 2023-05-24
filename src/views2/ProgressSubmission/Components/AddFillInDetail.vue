<template>
  <div class="add-fill-in-detail">
    <div class="report-time">{{ time }} 报送</div>
    <detail-form v-bind="$attrs" :form="form" :oldPics="oldPics" />
  </div>
</template>

<script>
import { PROJECT_TYPE } from './constants';
import rule from '@/mixins/rule';
import { progressReportDetail } from '@/api2/progressSubmission';
import { formatMoney, formatScore } from '@/views2/utils/formatter';
import role from '@/views2/mixins/role';
import DetailForm from './DetailForm';
export default {
  mixins: [rule, role],
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
    reportingTime: {
      type: String,
      default: '',
    },
    detailData: {
      type: Object,
      default: () => {},
    },
  },
  name: 'AddFillIn',
  components: { DetailForm },
  data() {
    return {
      firstYear: 2022,
      reportingTimes: null, // 月份
      options: [], // 时间选项
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
  watch: {
    reportingTime(val) {
      if (val && val !== this.form.times[0]) {
        this.getData();
      }
    },
  },
  computed: {
    time() {
      return this.reportingTimes || this.reportingTime;
    },
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
        // console.log(this.detailData);
        this.form = this.detailData;
        if (this.form.monthPic) {
          this.oldPics = this.form.monthPic
            .split(',')
            .filter((ele) => Boolean(ele))
            .map((ele) => ({ filePath: ele }));
        }
      }
      if (this.type === 'detail' || this.type === 'verity') {
        const data = {
          // reportingTime: this.reportingTime,
          projectId: this.id,
        };
        const res = await progressReportDetail(data);
        this.form = res;
        this.firstYear = this.form.firstYear || 2022;
        if (this.form.monthPic) {
          this.oldPics = this.form.monthPic
            .split(',')
            .filter((ele) => Boolean(ele))
            .map((ele) => ({ filePath: ele }));
        }
        if (this.type === 'verity' && res.times && res.times.length > 0) {
          this.reportingTimes = res.times[0];
          this.options = res.times.map((i) => {
            return {
              label: i,
              value: i,
            };
          });
        }
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
.report-time {
  margin-bottom: 18px;
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
  line-height: 22px;
}
</style>
