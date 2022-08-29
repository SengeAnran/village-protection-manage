<template>
  <el-dialog title="添加" :visible.sync="dialogVisible" width="800px" :lock-scroll="true" @close="resetForm"
    @closed="$emit('closed')">
    <el-form :rules="rule" ref="projectForm" :model="projectForm" label-width="260px">
      <el-form-item label="项目名称：" prop="projectName" :rules="rule.input">
        <el-input v-model="projectForm.projectName" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="建设单位：" prop="constructUnit" :rules="rule.input">
        <el-input v-model="projectForm.constructUnit" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="建设地点：" prop="constructAddress" :rules="rule.input">
        <el-input v-model="projectForm.constructAddress" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="建设内容和规模：" prop="constructDetail" :rules="rule.input">
        <el-input v-model="projectForm.constructDetail" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="进度安排：" prop="schedule" :rules="rule.input">
        <el-input v-model="projectForm.schedule" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="用地情况：" prop="landUse" :rules="rule.input">
        <el-input v-model="projectForm.landUse" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item :label="`${projectForm.firstYear}年计划投资（万元）：`">
        <plain-text :value="projectForm.planFirstGov + projectForm.planFirstDrive" maxlength="8" />
      </el-form-item>
      <el-form-item label="其中政府投资：" prop="planFirstGov" :rules="rule.inputNumber">
        <el-input-number v-model="projectForm.planFirstGov" maxlength="8"></el-input-number>
      </el-form-item>
      <el-form-item label="其中带动投资：" prop="planFirstDrive" :rules="rule.inputNumber">
        <el-input-number v-model="projectForm.planFirstDrive" maxlength="8"></el-input-number>
      </el-form-item>
      <el-form-item :label="`${projectForm.firstYear + 1}年计划投资（万元）：`">
        <plain-text :value="projectForm.planSecondGov + projectForm.planSecondDrive" maxlength="8" />
      </el-form-item>
      <el-form-item label="其中政府投资：" prop="planSecondGov" :rules="rule.inputNumber">
        <el-input-number v-model="projectForm.planSecondGov" maxlength="8"></el-input-number>
      </el-form-item>
      <el-form-item label="其中带动投资：" prop="planSecondDrive" :rules="rule.inputNumber">
        <el-input-number v-model="projectForm.planSecondDrive" maxlength="8"></el-input-number>
      </el-form-item>
      <el-form-item label="类型：" prop="type" :rules="rule.select">
        <el-select v-model="projectForm.type" placeholder="请选择">
          <el-option v-for="(item, index) of types" :key="index" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="运行维护管理安排：" prop="arrangements" :rules="rule.input">
        <el-input v-model="projectForm.arrangements" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="备注：">
        <el-input v-model="projectForm.remark" maxlength="20"></el-input>
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
