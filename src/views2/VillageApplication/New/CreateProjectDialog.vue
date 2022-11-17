<template>
  <el-dialog
    title="添加"
    :visible.sync="dialogVisible"
    width="800px"
    :lock-scroll="true"
    :close-on-click-modal="false"
    @close="resetForm"
    @closed="$emit('closed')"
  >
    <el-form :rules="rule" ref="projectForm" :model="projectForm" label-width="260px">
      <el-form-item label="项目名称：" prop="projectName" :rules="rules.inputMaxRequire50">
        <el-input v-model="projectForm.projectName"></el-input>
      </el-form-item>
      <el-form-item label="建设单位：" prop="constructUnit" :rules="rules.inputMax">
        <el-input v-model="projectForm.constructUnit"></el-input>
      </el-form-item>
      <el-form-item label="建设地点：" prop="constructAddress" :rules="rules.inputMaxRequire">
        <el-input v-model="projectForm.constructAddress"></el-input>
      </el-form-item>
      <el-form-item label="建设内容和规模：" prop="constructDetail" :rules="rules.inputMaxRequire255">
        <el-input v-model="projectForm.constructDetail"></el-input>
      </el-form-item>
      <el-form-item label="进度安排：" prop="scheduleRange" :rules="rule.multiSelect">
        <el-date-picker
          v-model="projectForm.scheduleRange"
          type="monthrange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM"
          :picker-options="pickerOptions"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="用地情况（m²）：" prop="landUse">
        <el-input-number v-model="projectForm.landUse" :maxlength="8" :min="0" class="number"></el-input-number>
      </el-form-item>
      <el-form-item :label="`${scheduleStartYear}年计划投资（万元）：`">
        <plain-text
          :value="(projectForm.planFirstGov || 0) + (projectForm.planFirstDrive || 0)"
          :formatter="formatMoney"
          maxlength="8"
        />
      </el-form-item>
      <el-form-item label="其中政府投资：" prop="planFirstGov" :rules="rule.inputNumberContainZero">
        <el-input-number
          v-model="projectForm.planFirstGov"
          :precision="2"
          :maxlength="8"
          :min="0"
          class="number"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="其中带动投资：" prop="planFirstDrive" :rules="rule.inputNumberContainZero">
        <el-input-number
          v-model="projectForm.planFirstDrive"
          :precision="2"
          :maxlength="8"
          :min="0"
          class="number"
        ></el-input-number>
      </el-form-item>
      <el-form-item :label="`${scheduleStartYear + 1}年计划投资（万元）：`">
        <!--  (projectForm.planSecondGov || 0) 兼容undefined      -->
        <plain-text
          :value="(projectForm.planSecondGov || 0) + (projectForm.planSecondDrive || 0)"
          :formatter="formatMoney"
          maxlength="8"
        />
      </el-form-item>
      <el-form-item label="其中政府投资：" prop="planSecondGov" :rules="rule.inputNumberContainZero">
        <el-input-number
          v-model="projectForm.planSecondGov"
          :precision="2"
          :maxlength="8"
          :min="0"
          class="number"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="其中带动投资：" prop="planSecondDrive" :rules="rule.inputNumberContainZero">
        <el-input-number
          v-model="projectForm.planSecondDrive"
          :precision="2"
          :maxlength="8"
          :min="0"
          class="number"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="类型：" prop="type">
        <el-select v-model="projectForm.type" placeholder="请选择">
          <el-option v-for="(item, index) of types" :key="index" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="运行维护管理安排：" prop="arrangements" :rules="rules.inputMax">
        <el-input v-model="projectForm.arrangements"></el-input>
      </el-form-item>
      <el-form-item label="备注：" prop="remark" :rules="rules.inputMax">
        <el-input v-model="projectForm.remark"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确定</el-button>
        <el-button @click="resetForm">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import rule from '@/mixins/rule';
import { types } from '@/views2/utils/project';
import { formatMoney } from '@/views2/utils/formatter';

export default {
  mixins: [rule],
  props: {
    value: {
      type: Boolean,
      default: true,
    },
    scheduleStartYear: {
      // 第一年
      type: [Number, String],
      default: '-',
    },
    editData: {
      type: Object,
      default: null,
    },
    dateRange: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      types,
      projectForm: {
        // 项目表单
        projectName: '', // 项目名称
        constructUnit: '', // 建设单位
        constructAddress: '', // 建设地点
        constructDetail: '', // 建设内容和规模
        scheduleRange: [], // 进度安排范围
        // schedule: '', // 进度安排范围开始
        // scheduleEnd: '', // 进度安排范围结束
        landUse: '', // 用地情况
        planSecondGov: '',
        planSecondDrive: '',
        planFirstGov: '',
        planFirstDrive: '',
        arrangements: '', // 运行维护管理安排
        remark: '', // 备注
        type: null,
        // 富文本
      },
      rules: {
        inputMax: [
          { message: '长度不得超过20个字符', trigger: 'change', max: 20 },
          { message: '长度不得超过20个字符', trigger: 'blur', max: 20 },
        ],
        inputMaxRequire: [
          { message: '长度不得超过20个字符', trigger: 'change', max: 20 },
          { message: '长度不得超过20个字符', trigger: 'blur', max: 20 },
          {
            required: true,
            message: '请输入',
            trigger: 'blur',
          },
        ],
        inputMaxRequire50: [
          { message: '长度不得超过50个字符', trigger: 'change', max: 50 },
          { message: '长度不得超过50个字符', trigger: 'blur', max: 50 },
          {
            required: true,
            message: '请输入',
            trigger: 'blur',
          },
        ],
        inputMaxRequire255: [
          { message: '长度不得超过255个字符', trigger: 'change', max: 255 },
          { message: '长度不得超过255个字符', trigger: 'blur', max: 255 },
          {
            required: true,
            message: '请输入',
            trigger: 'blur',
          },
        ],
      },
    };
  },
  computed: {
    dialogVisible: {
      set: function (val) {
        this.$emit('input', val);
      },
      get: function () {
        return this.value;
      },
    },
    pickerOptions() {
      const dataRange = this.dateRange;
      // console.log(dataRange);
      const dataRangeStart = dataRange[0].trim().slice(0, 7) + '-01 00:00:00';
      // console.log('dataRangeStart', dataRangeStart);
      // 月份Date.parse后默认是8：00 会影响起始值的选取
      const range = [Date.parse(dataRangeStart), Date.parse(dataRange[1])];
      // console.log('range[0]', Date.parse(dataRangeStart));
      // console.log(dataRange, range, 'range', Date.parse(dataRange[0]));
      return {
        disabledDate(time) {
          const timeLong = time.getTime();
          return timeLong > range[1] || timeLong < range[0];
        },
      };
    },
  },
  watch: {
    value(next) {
      if (next && this.editData) {
        this.projectForm = { ...this.editData };
        this.$set(this.projectForm, 'scheduleRange', [
          '' + this.editData.schedule + '',
          '' + this.editData.scheduleEnd + '',
        ]);
        // this.projectForm.scheduleRange = [new Date(this.editData.schedule), new Date(this.editData.scheduleEnd)];
        console.log(this.projectForm.scheduleRange);
      }
    },
  },
  mounted() {
    // if (this.editData) {
    //   this.projectForm = { ...this.editData };
    //   this.projectForm.scheduleRange = [new Date(this.editData.schedule), new Date(this.editData.scheduleEnd)];
    //   console.log(this.projectForm.scheduleRange);
    // }
  },
  methods: {
    formatMoney,
    // 添加 项目
    onSubmit() {
      this.$refs.projectForm.validate((valid) => {
        if (valid) {
          const [schedule, scheduleEnd] = this.projectForm.scheduleRange;
          // console.log(this.projectForm);
          this.$emit('change', { ...this.projectForm, schedule, scheduleEnd });
          this.resetForm();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm() {
      this.projectForm = {
        // 项目表单
        projectName: '', // 项目名称
        construct: '', // 建设单位
        constructAddress: '', // 建设地点
        constructDetail: '', // 建设内容和规模
        scheduleRange: [], // 进度安排范围
        // schedule: '', // 进度安排范围开始
        // scheduleEnd: '', // 进度安排范围结束
        landUse: '', // 用地情况
        planSecondGov: '',
        planSecondDrive: '',
        planFirstGov: '',
        planFirstDrive: '',
        arrangements: '', // 运行维护管理安排
        remark: '', // 备注
        type: null,
        firstYear: new Date().getFullYear(),
      };
      this.$refs.projectForm.resetFields();
      this.dialogVisible = false;
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" scoped>
.number {
  width: 230px;
}
</style>
