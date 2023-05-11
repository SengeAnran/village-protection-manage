<template>
  <el-form ref="form" class="form" label-position="top" :model="form" label-width="80px">
    <div class="detail-top">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="项目名称" prop="projectName" :rules="rule.input">
            <el-input v-model="form.projectName" placeholder="请输入项目名称" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="类型" prop="type">
            <el-input v-bind:value="changeType(form.type)" placeholder="-" disabled></el-input>
            <!--            <el-select v-model="form.type" placeholder="" disabled>-->
            <!--              <el-option v-for="item in typeOption" :key="item.value" :label="item.label" :value="item.value">-->
            <!--              </el-option>-->
            <!--            </el-select>-->
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="计划总投资（万元）" prop="planTotal" :rules="rule.input">
            <el-input-number
              v-model="form.planTotal"
              :precision="2"
              :controls="false"
              placeholder="请输入计划总投资（万元）"
              disabled
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="是否开工" prop="isStart" :rules="rule.select">
            <el-radio v-model="form.isStart" :disabled="startDisabled" :label="0">否</el-radio>
            <el-radio v-model="form.isStart" :disabled="startDisabled" :label="1">是</el-radio>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <!--          <el-form-item label="本月完成总投资（万元）" prop="completeTotal" :rules="completeTotalInput">-->
          <el-form-item label="本月完成总投资（万元）" prop="completeTotal" :rules="rule.inputNumber">
            <el-input v-model="form.completeTotal" disabled placeholder="-"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <!--          <el-form-item label="其中政府投资（万元）" prop="completeGov" :rules="completeGovInput">-->
          <el-form-item label="其中政府投资（万元）" prop="completeGov" :rules="rule.inputNumber">
            <el-input v-model="form.completeGov" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <!--          <el-form-item label="其中带动投资（万元）" prop="completeDrive" :rules="completeDriveInput">-->
          <el-form-item label="其中带动投资（万元）" prop="completeDrive" :rules="rule.inputNumber">
            <el-input v-model="form.completeDrive" placeholder="请输入" maxlength="8"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="之前报送完成总投资（万元）" prop="lastTotal">
            <span>{{ formatMoney(form.lastTotal || 0) }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="之前报送政府投资（万元）" prop="lastGov">
            <span>{{ formatMoney(form.lastGov || 0) }}</span>
            <!--            <el-input v-model="form.lastGov" placeholder="请输入联系人" disabled></el-input>-->
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="之前报送带动投资（万元）" prop="lastDrive">
            <span>{{ formatMoney(form.lastDrive || 0) }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="本月总体进度（%）" prop="overallProgress" :rules="overallProgressInput">
            <el-input v-model="form.overallProgress" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="之前报送总体进度（%）" prop="lastOverallProgress">
            <span>{{ formatScore(form.lastOverallProgress || 0) }}%</span>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row v-if="form.isStart" :gutter="20">
        <el-col :span="20">
          <el-form-item label="本月项目进度情况照片" prop="monthPic" :rules="rule.upload">
            <UploadImg2 :modal="false" :defaultData="oldPics" v-model="form.monthPic" :limit="5" />
            <i style="color: #d40000">请上传1至5张照片，每张大小不可超过10MB</i>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="form.isStart" :gutter="20">
        <el-col :span="18">
          <el-form-item label="是否竣工" prop="isEnd" :rules="rule.select">
            <el-radio v-model="form.isEnd" :disabled="isEndDisabled" :label="0">否</el-radio>
            <el-radio v-model="form.isEnd" :disabled="isEndDisabled" :label="1">是</el-radio>
          </el-form-item>
          <i style="color: #ff6b00"
            >（投资完成率需达到100%并且总体进度为100%才可选择竣工；选择“是”则该项目状态变更为“已竣工”，之后月份无法再进行填报。）</i
          >
        </el-col>
      </el-row>
    </div>
    <div class="btns">
      <div class="btn-content">
        <el-button @click="$emit('input', false)">关闭</el-button>
        <el-button type="primary" @click="onSubmit">{{ $route.query.modify ? '提交' : '确定' }}</el-button>
      </div>
    </div>
  </el-form>
</template>

<script>
import { PROJECT_TYPE } from './constants';
import rule from '@/mixins/rule';
import { getFillInDEcho, postSaveOne } from '@/api2/progressSubmission';
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
      require: true,
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
        lastTotal: '', // 之前报送完成总投资（万元）
        lastGov: '', // 之前报送政府投资（万元）
        lastDrive: '', // 之前报送带动投资（万元）
        overallProgress: '', // 本月总体进度（%）
        lastOverallProgress: '', // 之前报送总体进度（%）
        isStart: '', // 是否开工
        monthPic: [], // 本月项目进度情况照片
        isEnd: '', // 是否竣工

        planRate: '', // 计划投资完成率（%）
        yearRate: '', // 计划投资完成率（%）
      },
      firstYear: 2022,
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
      let res;
      if (this.form.completeGov === '' && this.form.completeDrive === '') {
        // 为空时
        return '-';
      }
      res =
        (Number(this.form.completeGov).toFixed(4) * 10000 + Number(this.form.completeDrive).toFixed(4) * 10000) / 10000;
      if (res === 0) {
        return Number(this.form.completeGov) === 0 && Number(this.form.completeDrive) === 0 ? res : '-';
      }
      return (
        (Number(this.form.completeGov).toFixed(4) * 10000 + Number(this.form.completeDrive).toFixed(4) * 10000) /
          10000 || '-'
      );
    },
    isEndDisabled() {
      // 投资完成率需达到100%才可选择竣工并且总体进度100%才可选择竣工或者计划投资为0 完成投资也为0的情况下也能选择已竣工
      return !(
        (this.calcRateTotal(this.modifyData, this.form) >= 100 && Number(this.form.overallProgress) === 100) ||
        (this.form.planTotal === 0 && this.form.completeTotal === 0)
      );
    },
  },
  watch: {
    completeTotal(val) {
      if (val || val === 0) {
        this.form.completeTotal = val;
      }
    },
    isEndDisabled(val) {
      if (val) {
        this.form.isEnd = 0;
      }
    },
  },
  beforeMount() {
    this.initData();
    this.getData();
    // console.log(this.modifyData);
    // console.log(Number(this.$route.query.reportingTime.slice(0, 4)));
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
      this.firstYear = this.modifyData.firstYear || 2022;
    },
    async getData() {
      if (this.id) {
        const res = await getFillInDEcho({ id: this.id });
        const { projectName, type, planTotal, lastTotal, lastGov, lastDrive, lastOverallProgress, isStart, isEnd } =
          res;
        this.form.projectName = projectName;
        this.form.type = type;
        this.form.planTotal = planTotal;
        this.form.lastTotal = lastTotal;
        this.form.lastGov = lastGov;
        this.form.lastDrive = lastDrive;
        this.form.lastOverallProgress = lastOverallProgress;
        this.form.isStart = isStart;
        if (isEnd || isEnd !== null) {
          this.form.isEnd = isEnd;
        }

        // console.log(this.type, res.isStart);
        if (this.type === 'add' && res.lastIsStart) {
          this.startDisabled = true;
        }
      }
      if (this.modifyData.id) {
        // add 和 modify 都回显数据
        const { completeTotal, completeGov, completeDrive, isStart, overallProgress, monthPic, isEnd } =
          this.modifyData;
        this.form.completeTotal = completeTotal;
        this.form.completeGov = completeGov;
        this.form.completeDrive = completeDrive;
        this.form.isStart = isStart;
        this.form.overallProgress = overallProgress;
        if (isEnd) {
          this.form.isEnd = isEnd;
        }
        if (monthPic && this.type === 'modify') {
          // 填报模式不用回显照片
          this.oldPics = monthPic
            .split(',')
            .filter((ele) => Boolean(ele))
            .map((ele) => ({ filePath: ele }));
        }
        // console.log('modifyData', this.form);
      }

      // this.oldMeetingPic = res.
    },

    // 添加 项目
    onSubmit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          //点击【确认】增加判断，若项目是否开工为否却已填写完成投资和总体进度，弹出操作确认弹窗；
          //该项目已填写完成投资和总体进度，是否确认项目为未开工状态
          if (!this.form.isStart && this.form.completeTotal && this.form.overallProgress) {
            this.$confirm('该项目已填写完成投资和总体进度，是否确认项目为未开工状态', {
              showClose: false,
            })
              .then(() => {
                console.log(111);
                this.detailData();
              })
              .catch(() => {});
            return;
          }
          this.detailData();

          // postSaveOne(data).then(() => {
          //   this.$message({
          //     type: 'success',
          //     message: '提交成功!',
          //   });
          //   this.$emit('saveItem', data);
          //   this.$refs.form.resetFields();
          //   this.$emit('input', false);
          // });
        }
      });
    },
    detailData() {
      const dataFrom = {
        completeDrive: Number(this.form.completeDrive),
        completeGov: Number(this.form.completeGov),
        completeTotal: Number(this.form.completeTotal),
        overallProgress: Number(this.form.overallProgress),
        id: this.id,
        isStart: this.form.isStart,
        monthPic: (this.form.monthPic || [])
          .map((i) => {
            return i.filePath;
          })
          .join(','),
        // monthPic: this.form.monthPic,
        isEnd: this.form.isEnd,
        planRate: this.calcRateTotal(this.modifyData, this.form),
        yearRate: this.calcRateCurrentYear(this.modifyData, this.form),
      };
      // console.log(dataFrom);
      if (this.$route.query.modify) {
        postSaveOne(dataFrom).then(() => {
          this.$message({
            type: 'success',
            message: '修改成功!',
          });
          this.$emit('saveItem', dataFrom);
          this.$emit('refresh');
          this.$refs.form.resetFields();
          this.$emit('input', false);
        });
      } else {
        this.$emit('saveItem', dataFrom);
        this.$refs.form.resetFields();
        this.$emit('input', false);
      }
    },
    //  计划投资完成率（%）
    calcRateTotal(scope, formData) {
      const data = scope;
      const form = formData;
      const { planFirstDrive, planFirstGov, planSecondDrive, planSecondGov } = data;
      const plantTotal =
        Number(planFirstDrive) + Number(planFirstGov) + Number(planSecondDrive) + Number(planSecondGov) || 1;
      const currentTotal = Number(form.completeGov || 0) + Number(form.completeDrive || 0);
      const result = ((currentTotal / plantTotal) * 100 || 0).toFixed(1);
      data.planRate = result;
      form.yearRate = result;
      // console.log('xxxx total', currentTotal, plantTotal, result);

      return result ? result : 0;
    },
    // 年度投资完成率（%）
    /*
     * scope 数据列表的数据
     * formData 数据表的填报数据
     */
    calcRateCurrentYear(scope, formData) {
      // 第一年度计算方式：第一年度完成投资/第一年计划投资  ；
      // 第二年度计算方式：完成投资/计划投资（和投资完成率一样）
      // console.log(scope);
      const data = scope;
      const form = formData;
      const { planFirstDrive, planFirstGov, planSecondDrive, planSecondGov } = data;
      // 填报的年份 === 第一年
      const isFirstYear =
        this.firstYear ===
        (this.$route.query.reportingTime
          ? Number(this.$route.query.reportingTime.slice(0, 4))
          : new Date().getFullYear());
      // console.log(isFirstYear);
      // 计划总投资
      const plantTotal = isFirstYear
        ? Number(planFirstDrive) + Number(planFirstGov)
        : Number(planFirstDrive) + Number(planFirstGov) + Number(planSecondDrive) + Number(planSecondGov);
      // 计划投资为0 完成率直接返回0
      if (plantTotal === 0) {
        return 0;
      }
      // 已完成投资额
      const currentTotal = Number(form.completeGov || 0) + Number(form.completeDrive || 0);
      const result = ((currentTotal / plantTotal) * 100 || 0).toFixed(1);
      data.yearRate = result;
      form.yearRate = result;
      // console.log('xxxx total', currentTotal, plantTotal, result);
      return result ? result : 0;
    },
    // 项目类型
    changeType(val) {
      if (val || val === 0) {
        return PROJECT_TYPE[val];
      }
      return null;
    },

    // 校验completeGov
    completeGovInputValue(rule, value, callback) {
      if (!value && value !== 0) {
        callback(new Error('填写不能为空'));
      } else if (isNaN(value)) {
        callback(new Error('请输入正确格式的数字'));
      } else if (Number(value) < (Number(this.form.lastGov) || 0)) {
        callback(new Error('不可少于之前报送政府投资'));
      } else {
        callback();
      }
    },
    // 校验completeTotal
    completeTotalInputValue(rule, value, callback) {
      if (!value && value !== 0) {
        callback(new Error('填写不能为空'));
      } else if (isNaN(value)) {
        callback(new Error('请输入正确格式的数字'));
      } else if (Number(value) < (Number(this.form.lastTotal) || 0)) {
        callback(new Error('不可少于之前报送完成总投资'));
      } else {
        callback();
      }
    },
    // 校验completeDrive
    completeDriveInputValue(rule, value, callback) {
      if (!value && value !== 0) {
        callback(new Error('填写不能为空'));
      } else if (isNaN(value)) {
        callback(new Error('请输入正确格式的数字'));
      } else if (Number(value) < (Number(this.form.lastDrive) || 0)) {
        callback(new Error('不可少于之前报送带动投资'));
      } else {
        callback();
      }
    },
    // 投资完成率
    getInvCompletionRate() {
      return ((this.form.completeTotal || 0) / (this.form.planTotal || 1)) * 100;
    },
    // 校验overallProgress
    overallProgressInputValue(rule, value, callback) {
      if (!value && value !== 0) {
        callback(new Error('填写不能为空'));
        // } else if (Number(value) < (Number(this.form.lastOverallProgress) || 0)) {
      } else if (isNaN(value)) {
        callback(new Error('请输入正确格式的数字'));
      } else if (this.getInvCompletionRate() === 0 && this.form.planTotal === 0) {
        //若完成投资率数值为0 ，需判断总计划投资是否为0，是则限制不生效，否则限制依旧生效
        if (value * 1 >= 0 && value * 1 <= 100) {
          callback();
        } else {
          callback(new Error('请输入正确的数字范围'));
        }
      } else if (this.getInvCompletionRate() > 100) {
        //若完成投资率数值为0 ，需判断总计划投资是否为0，是则限制不生效，否则限制依旧生效
        if (value * 1 >= 80 && value * 1 <= 100) {
          callback();
        } else {
          callback(new Error('请输入正确的数字范围'));
        }
      } else if (
        Number(value) < this.getInvCompletionRate() * 0.8 ||
        Number(value) > this.getInvCompletionRate() * 1.2
      ) {
        //总体进度不可小于或大于投资完成率20%
        callback(new Error('总体进度不可小于或大于投资完成率的20%'));
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
</style>
