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
            {{ form.type }}
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
            {{ form.schedule + '-' + form.scheduleEnd }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="用地情况（m²）" prop="landUse" :rules="rule.input">
            {{ form.landUse }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否开工" prop="isStart">
            {{ form.isStart ? '是' : '否' }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否竣工" prop="isEnd" :rules="rule.input">
            {{ form.isEnd ? '是' : '否' }}
          </el-form-item>
        </el-col>
      </el-row>
      <hr class="hr" />
      <div class="box-title">计划总投资（万元）</div>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="2022年计划投资" prop="planFirst" :rules="rule.input">
            {{ form.planFirst }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="其中政府投资" prop="planFirstGov">
            {{ form.planFirstGov }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="其中带动投资" prop="planFirstDrive" :rules="rule.input">
            {{ form.planFirstDrive }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="2023年计划投资" prop="planSecond" :rules="rule.input">
            {{ form.planSecond }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="其中政府投资" prop="planSecondGov">
            {{ form.planSecondGov }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="其中带动投资" prop="planSecondDrive" :rules="rule.input">
            {{ form.planSecondDrive }}
          </el-form-item>
        </el-col>
      </el-row>
      <hr class="hr" />
      <div class="box-title">完成总投资（万元）</div>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="2022年完成投资" prop="planSecond" :rules="rule.input">
            {{ form.comFirst }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="其中政府投资" prop="comFirstGov">
            {{ form.comFirstGov }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="其中带动投资" prop="comFirstDrive" :rules="rule.input">
            {{ form.comFirstDrive }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="2023年完成投资" prop="comSecond" :rules="rule.input">
            {{ form.comSecond }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="其中政府投资" prop="comSecondGov">
            {{ form.comSecondGov }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="其中带动投资" prop="comSecondDrive" :rules="rule.input">
            {{ form.comSecondDrive }}
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="计划投资完成率（%）" prop="planRate" :rules="rule.input">
            {{ form.planRate }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="年度投资完成率（%）" prop="yearRate">
            {{ form.yearRate }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="总体进度（%）" prop="overallProgress" :rules="rule.input">
            {{ form.overallProgress }}
          </el-form-item>
        </el-col>
      </el-row>
      <hr class="hr" />
      <ViewImg v-if="form.monthPic && form.monthPic.length" :data="form.monthPic" :modal="false"></ViewImg>
    </div>
  </el-form>
</template>

<script>
import { PROJECT_TYPE } from './constants';
import rule from '@/mixins/rule';
import { getFillInDEcho } from '@/api2/progressSubmission';
import { formatMoney, formatScore } from '@/views2/utils/formatter';
// const completeGovInputValue = (rule, value, callback) => {
//   console.log(rule, value);
//   callback();
// };
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
    modifyData: {
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
        planTotal: '', // 计划总投资（万元）
        completeTotal: '', // 本月完成总投资（万元）
        completeGov: '', // 其中政府投资（万元）
        completeDrive: '', // 其中带动投资（万元）
        lastTotal: '', // 上月报送完成总投资（万元）
        lastGov: '', // 上月报送政府投资（万元）
        lastDrive: '', // 上月报送带动投资（万元）
        overallProgress: '', // 本月总体进度（%）
        lastOverallProgress: '', // 上月报送总体进度（%）
        isStart: '', // 是否开工
        monthPic: [], // 本月项目进度情况照片
        isEnd: '', // 是否竣工

        // planRate: '', // 计划投资完成率（%）
        // yearRate: '', // 计划投资完成率（%）
      },
      typeOption: [],
      startDisabled: false, // 开工能否修改
      oldPics: [], //
      completeGovInput: [
        {
          type: 'string',
          required: true,
          trigger: 'blur',
          validator: this.completeGovInputValue,
        },
      ],
      completeTotalInput: [
        {
          type: 'string',
          required: true,
          trigger: 'blur',
          validator: this.completeTotalInputValue,
        },
      ],
      completeDriveInput: [
        {
          type: 'string',
          required: true,
          trigger: 'blur',
          validator: this.completeDriveInputValue,
        },
      ],
      overallProgressInput: [
        {
          type: 'string',
          required: true,
          trigger: 'blur',
          validator: this.overallProgressInputValue,
        },
      ],
    };
  },
  computed: {
    completeTotal() {
      return Number(this.form.completeGov) + Number(this.form.completeDrive);
    },
  },
  watch: {
    completeTotal(val) {
      if (val) {
        this.form.completeTotal = val;
      }
    },
  },
  beforeMount() {
    this.initData();
    this.getData();
  },
  mounted() {},
  methods: {
    formatMoney,
    formatScore,
    initData() {
      this.typeOption = this.typeOption.concat(
        Object.keys(PROJECT_TYPE).map((i) => {
          return {
            value: Number(i),
            label: PROJECT_TYPE[i],
          };
        }),
      );
    },
    async getData() {
      if (this.id) {
        const res = await getFillInDEcho({ id: this.id });
        const { projectName, type, planTotal, lastTotal, lastGov, lastDrive, lastOverallProgress, isStart } = res;
        this.form.projectName = projectName;
        this.form.type = type;
        this.form.planTotal = planTotal;
        this.form.lastTotal = lastTotal;
        this.form.lastGov = lastGov;
        this.form.lastDrive = lastDrive;
        this.form.lastOverallProgress = lastOverallProgress;
        this.form.isStart = isStart;
        if (this.type === 'add' && res.isStart) {
          this.startDisabled = true;
        }
      }
      console.log(this.modifyData);
      if (this.type === 'modify' && this.modifyData.id) {
        const { completeTotal, completeGov, completeDrive, isStart, overallProgress, monthPic, isEnd } =
          this.modifyData;
        this.form.completeTotal = completeTotal;
        this.form.completeGov = completeGov;
        this.form.completeDrive = completeDrive;
        this.form.isStart = isStart;
        this.form.overallProgress = overallProgress;
        this.form.isEnd = isEnd;
        if (monthPic) {
          this.oldPics = monthPic
            .split(',')
            .filter((ele) => Boolean(ele))
            .map((ele) => ({ filePath: ele }));
        }
        console.log('modifyData', this.form);
      }

      // this.oldMeetingPic = res.
    },
    // 添加 项目
    onSubmit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const data = {
            completeDrive: Number(this.form.completeDrive),
            completeGov: Number(this.form.completeGov),
            completeTotal: Number(this.form.completeTotal),
            overallProgress: Number(this.form.overallProgress),
            // planRate: Number(this.form.planRate),
            // yearRate: Number(this.form.yearRate),
            id: this.id,
            isStart: this.form.isStart,
            monthPic: (this.form.monthPic || [])
              .map((i) => {
                return i.filePath;
              })
              .join(','),
            // monthPic: this.form.monthPic,
            isEnd: this.form.isEnd,
          };
          console.log(data);
          this.$emit('saveItem', data);
          this.$refs.form.resetFields();
          this.$emit('input', false);
        }
      });
    },
    // 校验completeGov
    completeGovInputValue(rule, value, callback) {
      if (!value) {
        callback(new Error('填写不能为空'));
      } else if (Number(value) < (Number(this.form.lastGov) || 0)) {
        callback(new Error('可少于上月报送政府投资'));
      } else {
        callback();
      }
    },
    // 校验completeTotal
    completeTotalInputValue(rule, value, callback) {
      if (!value) {
        callback(new Error('填写不能为空'));
      } else if (Number(value) < (Number(this.form.lastTotal) || 0)) {
        callback(new Error('不可少于上月报送完成总投资'));
      } else {
        callback();
      }
    },
    // 校验completeDrive
    completeDriveInputValue(rule, value, callback) {
      if (!value) {
        callback(new Error('填写不能为空'));
      } else if (Number(value) < (Number(this.form.lastDrive) || 0)) {
        callback(new Error('可少于上月报送带动投资'));
      } else {
        callback();
      }
    },
    // 校验overallProgress
    overallProgressInputValue(rule, value, callback) {
      if (!value) {
        callback(new Error('填写不能为空'));
      } else if (Number(value) < (Number(this.form.lastOverallProgress) || 0)) {
        callback(new Error('可少于上月报送总体进度'));
      } else {
        callback();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.detail-top {
  .el-input {
    max-width: 240px;
  }
}
.btns {
  margin: 12px auto 0;
  display: flex;
  justify-content: space-around;
  .btn-content {
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
