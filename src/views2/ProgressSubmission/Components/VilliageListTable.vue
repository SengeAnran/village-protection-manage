<template>
  <el-table class="table-custom" :data="data" border style="width: 90%">
    <el-table-column label="序号" type="index" fixed> </el-table-column>
    <el-table-column prop="projectName" label="项目名称" width="120"> </el-table-column>
    <el-table-column prop="constructUnit" label="建设单位" width="120"> </el-table-column>
    <el-table-column prop="constructAddress" label="建设地点" width="120"> </el-table-column>
    <el-table-column prop="constructDetail" label="建设内容和规模" width="120"> </el-table-column>
    <el-table-column prop="schedule" label="进度安排" width="120"> </el-table-column>
    <el-table-column prop="landUse" label="用地情况" width="120"> </el-table-column>
    <el-table-column label="计划投资" width="350" header-align="center">
      <el-table-column prop="investmentAmount" label="总投资（万元）" width="120">
        <template slot-scope="scope">
          <span>
            {{
                (scope.row.planGovInvestment || 0) +
                (scope.row.planSocialInvestment || 0) +
                (scope.row.planSelfInvestment || 0)
            }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="planGovInvestment" label="政府投资（万元）" width="150"> </el-table-column>
      <el-table-column prop="planSocialInvestment" label="社会投资（万元）" width="150"> </el-table-column>
      <el-table-column prop="planSelfInvestment" label="自筹投资（万元）" width="150"> </el-table-column>
    </el-table-column>
    <el-table-column v-if="!isFirstTimeReport && lastUpdateTime" :label="'完成投资 ' + lastUpdateTime" width="250" header-align="center">
      <el-table-column prop="completeTotalInvestment" label="总投资（万元）" width="120">
        <template slot-scope="scope">
          <span>
            {{
                (scope.row.completeGovInvestment || 0) +
                (scope.row.completeSocialInvestment || 0) +
                (scope.row.completeSelfInvestment || 0)
            }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="completeGovInvestment" label="其中政府投资（万元）" width="120"></el-table-column>
      <el-table-column prop="completeSocialInvestment" label="其中社会投资（万元）" width="120"></el-table-column>
      <el-table-column prop="completeSelfInvestment" label="其中自筹投资（万元）" width="120"></el-table-column>
    </el-table-column>
    <el-table-column v-if="type === 'edit'" label="完成投资" width="250" header-align="center">
      <el-table-column prop="completeTotalInvestmentNow" label="总投资（万元）" width="150">
        <template slot-scope="scope">
          <!-- 县级用户 -->
          <span>
            {{ (scope.row.completeGovInvestmentNow || 0) + (scope.row.completeSocialInvestmentNow || 0) +
                (scope.row.completeSelfInvestmentNow || 0)
            }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="completeGovInvestmentNow" label="其中政府投资（万元）" width="150">
        <template slot-scope="scope">
          <!-- 县级用户 -->
          <div>
            <el-form-item label="" :show-message="false">
              <el-input-number v-model="form.detailLists[scope.$index].completeGovInvestmentNow" size="mini"
                :min="form.detailLists[scope.$index].completeGovInvestment || 0" maxlength="20" placeholder="请输入" />
            </el-form-item>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="completeSocialInvestmentNow" label="其中社会投资（万元）" width="150">
        <template slot-scope="scope">
          <!-- 县级用户 -->
          <div>
            <el-form-item label="" :show-message="false">
              <el-input-number v-model="form.detailLists[scope.$index].completeSocialInvestmentNow" size="mini"
                :min="form.detailLists[scope.$index].completeSocialInvestment || 0" maxlength="20" placeholder="请输入" />
            </el-form-item>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="completeSelfInvestmentNow" label="其中自筹投资（万元）" width="150">
        <template slot-scope="scope">
          <!-- 县级用户 -->
          <div>
            <el-form-item label="" :show-message="false">
              <el-input-number v-model="form.detailLists[scope.$index].completeSelfInvestmentNow" size="mini"
                :min="form.detailLists[scope.$index].completeSelfInvestment || 0" maxlength="20" placeholder="请输入" />
            </el-form-item>
          </div>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column prop="rate" width="130" :key="100" label="是否开工">
      <template slot-scope="scope">
        <!-- 县级用户 -->
        <div v-if="(userInfo.roleId === USER_TYPE.COUNTRY || userInfo.roleId === USER_TYPE.COUNTRY_LEADER) && type === 'edit'">
          <el-form-item label="" :show-message="false">
            <el-radio-group v-model="form.detailLists[scope.$index].state"
              :disabled="form.detailLists[scope.$index].lastState">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
        <!-- 省市级用户 -->
        <div v-else>
          <span class="cell">{{ scope.row.state ? '是' : '否' }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="rate" width="120" :key="101" label="完成率">
      <template slot-scope="scope">
        <!-- 县级用户 -->
        <div v-if="(userInfo.roleId === USER_TYPE.COUNTRY || userInfo.roleId === USER_TYPE.COUNTRY_LEADER) && type === 'edit'">
          <span class="cell">{{
              (
                ((scope.row.completeGovInvestmentNow || 0) + (scope.row.completeSocialInvestmentNow || 0) +
                  (scope.row.completeSelfInvestmentNow || 0)) /
                ((scope.row.planGovInvestment || 0) +
                  (scope.row.planSocialInvestment || 0) +
                  (scope.row.planSelfInvestment || 0) || 1) * 100
              ).toFixed(2) + '%' || '--'
          }}</span>
        </div>
        <!-- 省市级用户 -->
        <div v-else>
          <span class="cell">{{ scope.row.rate }}</span>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import { mapGetters } from "vuex";
import { USER_TYPE } from '@/views2/utils/constants';

export default {
  props: {
    form: {
      type: Object,
      default: () => { },
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
      USER_TYPE,
      refill: false,
      isFirstTimeReport: false,
      lastUpdateTime: '',
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  beforeMount() {
    this.init();
  },
  methods: {
    init() {
      console.log(this.data);
      if (this.data && this.data.length > 0) {
        this.isFirstTimeReport = this.data.some(i => {
          return i.completeGovInvestment === null && i.completeSelfInvestment === null && i.completeSocialInvestment === null;
        });
        const firstTimeValue = this.data[0] && this.data[0].gmtModified || '';
        this.lastUpdateTime = firstTimeValue.slice(0, 10);
      }
    },
    removeItem(index) {
      this.$myConfirm({
        content: "确认删除该数据？"
      }).then(() => {
        this.$emit("remove", index);
      })
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
