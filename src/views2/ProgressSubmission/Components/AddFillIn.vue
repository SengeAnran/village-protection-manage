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
          <el-form-item label="类型" prop="type" :rules="rule.select">
            <el-select v-model="form.type" placeholder="请选择">
              <el-option v-for="item in typeOption" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
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
          <el-form-item label="本月完成总投资（万元）" prop="completeTotal" :rules="rule.input">
            <el-input v-model="form.completeTotal" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="其中政府投资（万元）" prop="completeGov" :rules="rule.input">
            <el-input v-model="form.completeGov" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="其中带动投资（万元）" prop="completeDrive" :rules="rule.input">
            <el-input v-model="form.completeDrive" placeholder="请输入" maxlength="8"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="上月报送完成总投资（万元）" prop="lastTotal">
            <span>{{ formatMoney(form.lastTotal || 0) }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="上月报送政府投资（万元）" prop="lastGov">
            <span>{{ formatMoney(form.lastGov || 0) }}</span>
            <!--            <el-input v-model="form.lastGov" placeholder="请输入联系人" disabled></el-input>-->
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="上月报送带动投资（万元）" prop="lastDrive">
            <span>{{ formatMoney(form.lastDrive || 0) }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="本月总体进度（%）" prop="leader" :rules="rule.input">
            <el-input v-model="form.leader" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="上月报送总体进度（%）" prop="overallProgress" :rules="rule.input">
            <span>{{ formatScore(form.overallProgress || 0) }}%</span>
          </el-form-item>
        </el-col>
      </el-row>
    </div>
  </el-form>
</template>

<script>
import { PROJECT_TYPE } from './constants';
import rule from '@/mixins/rule';
import { getFillInDEcho } from '@/api2/progressSubmission';
import { formatMoney, formatScore } from '@/views2/utils/formatter';
export default {
  mixins: [rule],
  props: {
    id: {
      type: Number,
      require: true,
    },
  },
  name: 'AddFillIn',
  data() {
    return {
      form: {
        area: '',
        villageName: '',
        declarationBatch: '',
        investNum: '',
        leader: '',
        contactPerson: '',
        phone: '',
        detailLists: [],
        endLists: [],
      },
      typeOption: [],
    };
  },
  beforeMount() {
    this.initData();
  },
  mounted() {
    this.getData();
  },
  methods: {
    formatMoney,
    formatScore,
    initData() {
      this.typeOption.concat(
        Object.keys(PROJECT_TYPE).map((i) => {
          return {
            value: i,
            label: PROJECT_TYPE[i],
          };
        }),
      );
      console.log(this.typeOption);
    },
    getData() {
      getFillInDEcho({ id: this.id }).then((res) => {
        console.log(res);
        this.form = res;
      });
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
</style>
