<template>
  <el-table class="table-custom" max-height="600" :data="data" border style="width: 90%">
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
        <!--        {{ scope.row.yearRate || scope.row.yearRate === 0 ? scope.row.yearRate.toFixed(1) + '%' : '-' }}-->
        {{ formatScore(scope.row.yearRate || 0) }}
      </template>
    </el-table-column>
    <el-table-column align="center" :label="isEnd ? '计划投资完成率（%）' : '本次计划投资完成率（%）'">
      <template slot-scope="scope">
        <!--        {{ scope.row.planRate || scope.row.planRate === 0 ? scope.row.planRate.toFixed(1) + '%' : '-' }}-->
        {{ scope.row.planRate ? formatScore(scope.row.planRate) : '-' }}
      </template>
    </el-table-column>
    <el-table-column :label="isEnd ? '完成投资（万元）' : '本次完成投资（万元）'" header-align="center">
      <!-- 村级用户 -->
      <el-table-column align="center" label="总投资" width="100">
        <template slot-scope="scope">
          {{
            scope.row.completeTotal || scope.row.completeTotal === 0 ? formatMoney(scope.row.completeTotal || 0) : '-'
          }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="政府投资" width="150">
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
    <el-table-column align="center" :label="isEnd ? '总体进度（%）' : '本次总体进度（%）'" width="170">
      <template slot-scope="scope">
        {{
          scope.row.overallProgress || scope.row.overallProgress === 0
            ? scope.row.overallProgress.toFixed(1) + '%'
            : '-'
        }}
      </template>
    </el-table-column>
    <el-table-column fixed="right" v-if="useAction" label="操作">
      <template slot-scope="scope">
        <slot name="action" :data="scope.row"></slot>
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
    // form: {
    //   type: Object,
    //   default: () => {},
    // },
    data: {
      type: Array,
      default: () => [],
    },
    type: {
      type: String,
      default: 'edit',
    },
    useAction: {
      type: Boolean,
      default: false,
    },
    isEnd: {
      type: Boolean,
      default: false,
    },
    defaultFirstYear: {
      type: Number,
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
    if (this.defaultFirstYear) {
      this.firstYear = this.defaultFirstYear;
    }
    this.init();
  },
  methods: {
    formatMoney,
    formatScore,
    mapType,
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
      if (this.data && this.data.length > 0) {
        this.isFirstTimeReport = this.data.some((i) => {
          return i.completeDrive === null && i.completeGov === null && i.completeTotal === null;
        });
        const firstTimeValue = (this.data[0] && this.data[0].gmtModified) || '';
        this.lastUpdateTime = firstTimeValue.slice(0, 10);
        this.firstYear = (this.data[0] && this.data[0].firstYear) || 2022;
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
      height: 8px;
    }
  }
  &::v-deep .el-table__fixed-right {
    //right: 8px !important;
  }
  //&::v-deep .el-table--scrollable-y .el-table__body-wrapper {
  //  &::-webkit-scrollbar {
  //    z-index: 10;
  //    width: 5px;
  //  }
  //}

  &::v-deep .el-table__fixed {
    border-bottom: 5px solid rgba(238, 35, 35, 0);
  }

  &::v-deep .el-form-item--small.el-form-item {
    margin-bottom: 0;
  }
}
</style>
