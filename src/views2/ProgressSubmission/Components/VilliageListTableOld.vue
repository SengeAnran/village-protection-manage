<template>
  <el-table class="table-custom" :data="data" border style="width: 90%">
    <el-table-column label="序号" type="index" fixed> </el-table-column>
    <el-table-column prop="projectName" label="项目名称"> </el-table-column>
    <el-table-column prop="type" align="center" label="类型">
      <template slot-scope="scope">
        {{ mapType(scope.row.type) }}
      </template>
    </el-table-column>
    <el-table-column prop="type" align="center" label="是否开工">
      <template slot-scope="scope">
        {{ scope.row.isStart === 0 ? '否' : scope.row.isStart === 1 ? '是' : '-' }}
      </template>
    </el-table-column>
    <el-table-column label="计划总投资（万元）" header-align="center">
      <el-table-column :label="`${firstYear}年`" header-align="center">
        <el-table-column prop="planFirstGov" label="政府投资">
          <template slot-scope="scope">
            <span>{{ formatMoney(scope.row.planFirstGov || 0) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="planFirstDrive" label="带动投资">
          <template slot-scope="scope">
            <span>{{ formatMoney(scope.row.planFirstDrive || 0) }}</span>
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column :label="`${firstYear + 1}年`" header-align="center">
        <el-table-column prop="planSecondGov" label="政府投资">
          <template slot-scope="scope">
            <span>{{ formatMoney(scope.row.planSecondGov || 0) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="planSecondDrive" label="带动投资">
          <template slot-scope="scope">
            <span>{{ formatMoney(scope.row.planSecondDrive || 0) }}</span>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table-column>
    <el-table-column align="center" label="年度投资完成率（%）">
      <template slot-scope="scope">
        {{ scope.row.yearRate || scope.row.yearRate === 0 ? scope.row.yearRate.toFixed(1) + '%' : '-' }}
      </template>
    </el-table-column>
    <el-table-column align="center" label="计划投资完成率（%）">
      <template slot-scope="scope">
        {{ scope.row.planRate || scope.row.planRate === 0 ? scope.row.planRate.toFixed(1) + '%' : '-' }}
      </template>
    </el-table-column>
    <el-table-column
      v-if="!isFirstTimeReport && lastUpdateTime"
      :label="'完成投资（万元） ' + lastUpdateTime"
      header-align="center"
    >
      <el-table-column prop="completeTotal" label="总投资">
        <template slot-scope="scope">
          {{ formatMoney(scope.row.completeTotal || 0) }}
        </template>
      </el-table-column>
      <el-table-column prop="completeGov" label="政府投资">
        <template slot-scope="scope">
          <span>{{ formatMoney(scope.row.completeGov || 0) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="completeDrive" label="带动投资">
        <template slot-scope="scope">
          <span>{{ formatMoney(scope.row.completeDrive || 0) }}</span>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column
      v-if="!isFirstTimeReport && lastUpdateTime"
      prop="overallProgress"
      :label="'总体进度（%） ' + lastUpdateTime"
      header-align="center"
      width="120"
    >
      <template slot-scope="scope"> {{ formatScore(scope.row.overallProgress || 0) }}% </template>
    </el-table-column>
    <el-table-column v-if="type === 'edit'" label="本月完成投资（万元）" header-align="center">
      <!-- 村级用户 -->
      <el-table-column align="center" label="总投资" width="100">
        <template slot-scope="scope">
          {{
            scope.row.completeTotal || scope.row.completeTotal === 0 ? formatMoney(scope.row.completeTotal || 0) : '-'
          }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="政府投资" width="150">
        <!--        <template slot-scope="scope">-->
        <!--          <div>-->
        <!--            <el-form-item-->
        <!--              :prop="`tmpKey-gov-first-${scope.$index}`"-->
        <!--              label=""-->
        <!--              :show-message="false"-->
        <!--              :rules="rules[`tmpKey-gov-first-${scope.$index}`]"-->
        <!--            >-->
        <!--              <el-input-number-->
        <!--                v-model="form[`tmpKey-gov-first-${scope.$index}`]"-->
        <!--                size="mini"-->
        <!--                maxlength="20"-->
        <!--                placeholder="请输入"-->
        <!--                :controls="false"-->
        <!--                :precision="2"-->
        <!--              />-->
        <!--            </el-form-item>-->
        <!--          </div>-->
        <!--        </template>-->
        <template slot-scope="scope">
          {{ scope.row.completeGov || scope.row.completeGov === 0 ? formatMoney(scope.row.completeGov || 0) : '-' }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="带动投资" width="150">
        <template slot-scope="scope">
          {{
            scope.row.completeDrive || scope.row.completeDrive === 0 ? formatMoney(scope.row.completeDrive || 0) : '-'
          }}
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column v-if="type === 'edit'" label="本月总体进度（%）" width="170">
      <template slot-scope="scope">
        <div v-if="VILLAGE">
          <el-form-item
            :prop="`tmpKey-global-first-${scope.$index}`"
            label=""
            :show-message="false"
            :rules="rules[`tmpKey-global-first-${scope.$index}`]"
          >
            <el-input-number
              v-model="form[`tmpKey-global-first-${scope.$index}`]"
              size="mini"
              maxlength="20"
              placeholder="请输入"
              :controls="false"
              :precision="1"
            >
            </el-input-number>
            %
          </el-form-item>
        </div>
        <div v-else>
          <span class="cell">{{ formatScore(scope.row.globalRate || 0, 1) }}%</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="rate" label="年度投资完成率（%）">
      <template slot-scope="scope">
        <!-- 村级用户 -->
        <div v-if="VILLAGE && type === 'edit'">
          {{ calcRateCurrentYear(scope) }}
        </div>
        <!-- 省市级用户 -->
        <div v-else>
          <span class="cell">{{ formatScore(scope.row.yearRate || 0, 1) }}%</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="rate" label="计划投资完成率（%）">
      <template slot-scope="scope">
        <!-- 县级用户 -->
        <div v-if="VILLAGE && type === 'edit'">
          {{ calcRateTotal(scope) }}
        </div>
        <!-- 省市级用户 -->
        <div v-else>
          <span class="cell">{{ formatScore(scope.row.planRate || 0, 1) }}%</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="rate" label="是否开工" width="130">
      <template slot-scope="scope">
        <!-- 村级用户 -->
        <div v-if="VILLAGE && type === 'edit'">
          <el-form-item label="" :show-message="false">
            <el-radio-group
              v-model="form.detailLists[scope.$index].state"
              :disabled="form.detailLists[scope.$index].lastState"
            >
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
        <!-- 省市县级级用户 -->
        <div v-else>
          <span class="cell">{{ scope.row.isStart ? '是' : '否' }}</span>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import { mapGetters } from 'vuex';
import { mapType } from '@/views2/utils/project';
import _ from 'lodash';
import { formatMoney, formatScore } from '@/views2/utils/formatter';
import role from '@/views2/mixins/role';

export default {
  mixins: [role],
  props: {
    form: {
      type: Object,
      default: () => {},
    },
    data: {
      type: Array,
      default: () => [],
    },
    type: {
      type: String,
      default: 'edit',
    },
  },
  data() {
    return {
      refill: false,
      isFirstTimeReport: false,
      lastUpdateTime: '',
      firstYear: 2022,
      rules: {},
    };
  },
  computed: {
    ...mapGetters(['userInfo']),
  },
  beforeMount() {
    this.init();
  },
  methods: {
    formatMoney,
    formatScore,
    mapType,
    calcRateTotal(scope) {
      const data = scope.row;
      const form = this.form;
      const { planFirstDrive, planFirstGov, planSecondDrive, planSecondGov } = data;
      const plantTotal =
        Number(planFirstDrive) + Number(planFirstGov) + Number(planSecondDrive) + Number(planSecondGov) || 1;
      const currentTotal =
        Number(form[`tmpKey-gov-first-${scope.$index}`] || 0) + Number(form[`tmpKey-drive-first-${scope.$index}`] || 0);
      const result = ((currentTotal / plantTotal) * 100 || 0).toFixed(1);
      data.planRate = result;
      console.log('xxxx total', currentTotal, plantTotal, result);

      return result ? result + '%' : '0%';
    },
    calcRateCurrentYear(scope) {
      const data = scope.row;
      const form = this.form;
      const { planFirstDrive, planFirstGov, planSecondDrive, planSecondGov } = data;
      const isFirstYear = this.firstYear === new Date().getFullYear();
      const plantTotal = isFirstYear
        ? Number(planFirstDrive) + Number(planFirstGov) || 1
        : Number(planSecondDrive) + Number(planSecondGov) || 1;
      const currentTotal =
        Number(form[`tmpKey-gov-first-${scope.$index}`] || 0) + Number(form[`tmpKey-drive-first-${scope.$index}`] || 0);
      const result = ((currentTotal / plantTotal) * 100 || 0).toFixed(1);
      data.yearRate = result;
      return result ? result + '%' : '0%';
    },
    showMessage: _.debounce(function (message) {
      this.$message.error(message);
    }, 0),
    createRule(min, obj, arg) {
      const result = [
        {
          required: true,
          trigger: 'blur',
          validator: (rule, value, callback) => {
            obj[arg] = value;
            if (!value && value !== 0) {
              callback(new Error('填写不能为空'));
              this.showMessage('填写不能为空');
              // }else if((typeof value === String && value.indexOf(".") !== -1 && value.split('.').length > 2) || !parseFloat(value) || parseFloat(value).toString() !== value){
            } else if (isNaN(value)) {
              callback(new Error('请输入正确格式的数字')); //防止输入多个小数点
              this.showMessage('请输入正确格式的数字');
            } else if (Number(value) < min) {
              callback(new Error('不能小于上次申报值'));
              this.showMessage('不能小于上次申报值');
            } else {
              callback();
            }
          },
        },
      ];
      return result;
    },
    init() {
      console.log(this.data);
      if (this.data && this.data.length > 0) {
        this.isFirstTimeReport = this.data.some((i) => {
          return i.completeDrive === null && i.completeGov === null && i.completeTotal === null;
        });
        const firstTimeValue = (this.data[0] && this.data[0].gmtModified) || '';
        this.lastUpdateTime = firstTimeValue.slice(0, 10);
        this.firstYear = (this.data[0] && this.data[0].firstYear) || 2022;
        if (this.type === 'edit') {
          const length = this.data.length;
          for (let index = 0; index < length; index++) {
            const element = this.data[index];
            const key1 = `tmpKey-gov-first-${index}`;
            const key2 = `tmpKey-drive-first-${index}`;
            const key3 = `tmpKey-global-first-${index}`;

            this.$set(this.form, key1, 0);
            this.$set(this.form, key2, 0);
            this.$set(this.form, key3, 0);

            this.rules[key1] = this.createRule(element.completeGov || 0, element, 'completeGovNow');
            this.rules[key2] = this.createRule(element.completeDrive || 0, element, 'completeDriveNow');
            this.rules[key3] = this.createRule(element.overallProgress || 0, element, 'overallProgressNow');
          }
        }
      }
    },
    removeItem(index) {
      this.$myConfirm({
        content: '确认删除该数据？',
      }).then(() => {
        this.$emit('remove', index);
      });
    },
    onClick(scope) {
      console.log(scope);
      console.log(scope.$index);
    },
  },
};
</script>
<style lang="scss" scoped>
.table-custom {
  display: block !important;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.05);
  width: 90%;

  ::v-deep tr th {
    background-color: #f3f3f3;
    color: #222;
  }

  &::v-deep .el-table__body-wrapper {
    //width: 10px;
    //height: 10px;
    //background-color: #1e8dff;
    //padding-bottom: 10px;
    &::-webkit-scrollbar {
      z-index: 10;
      width: 10px;
      height: 10px;
    }
  }

  &::v-deep .el-table__fixed {
    border-bottom: 5px solid rgba(238, 35, 35, 0);
  }

  &::v-deep .el-form-item--small.el-form-item {
    margin-bottom: 0;
  }
}
</style>
