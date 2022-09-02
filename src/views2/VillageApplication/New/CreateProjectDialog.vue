<template>
  <el-dialog title="添加" :visible.sync="dialogVisible" width="800px" :lock-scroll="true" @close="resetForm"
    @closed="$emit('closed')">
    <el-form :rules="rule" ref="projectForm" :model="projectForm" label-width="260px">
      <el-form-item label="项目名称：" prop="projectName" :rules="rules.inputMaxRequire">
        <el-input v-model="projectForm.projectName" ></el-input>
      </el-form-item>
      <el-form-item label="建设单位：" prop="constructUnit" :rules="rules.inputMax">
        <el-input v-model="projectForm.constructUnit" ></el-input>
      </el-form-item>
      <el-form-item label="建设地点：" prop="constructAddress" :rules="rules.inputMaxRequire">
        <el-input v-model="projectForm.constructAddress" ></el-input>
      </el-form-item>
      <el-form-item label="建设内容和规模：" prop="constructDetail" :rules="rules.inputMaxRequire">
        <el-input v-model="projectForm.constructDetail" ></el-input>
      </el-form-item>
      <el-form-item label="进度安排：" prop="schedule" :rules="rule.date">
        <el-date-picker
          v-model="projectForm.schedule"
          type="month"
          placeholder="选择日期"
          value-format="yyyy-MM"
          :picker-options="pickerOptions"
          >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="用地情况（m²）：" prop="landUse">
        <el-input-number v-model="projectForm.landUse" :maxlength="8" :min="0" class="number"></el-input-number>
      </el-form-item>
      <el-form-item :label="`${projectForm.firstYear}年计划投资（万元）：`">
        <plain-text :value="projectForm.planFirstGov + projectForm.planFirstDrive" maxlength="8" />
      </el-form-item>
      <el-form-item label="其中政府投资：" prop="planFirstGov" :rules="rule.inputNumber">
        <el-input-number v-model="projectForm.planFirstGov" :maxlength="8" :min="0" class="number"></el-input-number>
      </el-form-item>
      <el-form-item label="其中带动投资：" prop="planFirstDrive" :rules="rule.inputNumber">
        <el-input-number v-model="projectForm.planFirstDrive" :maxlength="8" :min="0" class="number"></el-input-number>
      </el-form-item>
      <el-form-item :label="`${projectForm.firstYear + 1}年计划投资（万元）：`">
        <plain-text :value="projectForm.planSecondGov + projectForm.planSecondDrive" maxlength="8" />
      </el-form-item>
      <el-form-item label="其中政府投资：" prop="planSecondGov" :rules="rule.inputNumber">
        <el-input-number v-model="projectForm.planSecondGov" :maxlength="8" :min="0" class="number"></el-input-number>
      </el-form-item>
      <el-form-item label="其中带动投资：" prop="planSecondDrive" :rules="rule.inputNumber">
        <el-input-number v-model="projectForm.planSecondDrive" :maxlength="8" :min="0" class="number"></el-input-number>
      </el-form-item>
      <el-form-item label="类型：" prop="type" :rules="rule.select">
        <el-select v-model="projectForm.type" placeholder="请选择">
          <el-option v-for="(item, index) of types" :key="index" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="运行维护管理安排：" prop="arrangements" :rules="rules.inputMax">
        <el-input v-model="projectForm.arrangements" ></el-input>
      </el-form-item>
      <el-form-item label="备注：" prop="remark" :rules="rules.inputMax">
        <el-input v-model="projectForm.remark" ></el-input>
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

export default {
  mixins: [rule],
  props: {
    value: {
      type: Boolean,
      default: true,
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
        schedule: '', // 进度安排
        landUse: '', // 用地情况
        planSecondGov: '',
        planSecondDrive: '',
        planFirstGov: '',
        planFirstDrive: '',
        arrangements: '', // 运行维护管理安排
        remark: '', // 备注
        type: null,
        firstYear: new Date().getFullYear(),
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
            required: true, message: "请输入", trigger: "blur",
          },
        ]
      }
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
      const range = [Date.parse(dataRange[0]), Date.parse(dataRange[1])];
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
      }
    },
  },
  mounted() {
    if (this.editData) {
      this.projectForm = { ...this.editData };
    }
  },
  methods: {
    // 添加 项目
    onSubmit() {
      this.$refs.projectForm.validate((valid) => {
        if (valid) {
          // console.log(this.projectForm);
          this.$emit('change', { ...this.projectForm });
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
        schedule: '', // 进度安排
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
      // this.$refs.projectForm.resetFields();
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
