<template>
  <el-table class="table-custom" :data="data" border>
    <el-table-column label="序号" type="index" fixed> </el-table-column>
    <el-table-column prop="projectName" label="项目名称" width="120"> </el-table-column>
    <el-table-column prop="constructUnit" label="建设单位" width="120"> </el-table-column>
    <el-table-column prop="constructAddress" label="建设地点" width="120"> </el-table-column>
    <el-table-column prop="constructDetail" label="建设内容和规模" width="120"> </el-table-column>
    <el-table-column prop="schedule" label="进度安排" width="120"> </el-table-column>
    <el-table-column prop="landUse" label="用地情况" width="120"> </el-table-column>
    <el-table-column label="计划投资" header-align="center">
      <el-table-column prop="investmentAmount" label="总投资（万元）" width="120">
        <template slot-scope="scope">
          <span>{{ (scope.row.planGovInvestment || 0) + (scope.row.planSocialInvestment || 0) +
              (scope.row.planSelfInvestment || 0)
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="planGovInvestment" label="政府投资（万元）" width="150"> </el-table-column>
      <el-table-column prop="planSocialInvestment" label="社会投资（万元）" width="150"> </el-table-column>
      <el-table-column prop="planSelfInvestment" label="自筹投资（万元）" width="120"> </el-table-column>
    </el-table-column>
    <el-table-column label="完成投资" width="250">
      <el-table-column label="总投资（万元）" width="120">
        <template slot-scope="scope">
          <span>{{
                (scope.row.completeGovInvestment || 0) +
                (scope.row.completeSocialInvestment || 0) +
                (scope.row.completeSelfInvestment || 0)
            }}</span>
        </template>
      </el-table-column>
      <el-table-column label="其中政府投资（万元）" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.completeGovInvestment || 0 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="其中社会投资（万元）" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.completeSocialInvestment || 0 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="其中自筹投资（万元）" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.completeSelfInvestment || 0 }}</span>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column prop="rate" width="120" :key="100" label="是否开工">
      <template slot-scope="scope">
        <span class="cell">{{ scope.row.isStart ? '是' : '否' }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="rate" width="120" :key="101" label="完成率"></el-table-column>
  </el-table>
</template>
<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => [],
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
}
</style>
