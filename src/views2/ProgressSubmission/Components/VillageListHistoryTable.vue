<template>
  <el-table class="table-custom" :data="data" border>
    <el-table-column label="序号" type="index" fixed> </el-table-column>
    <el-table-column prop="projectName" label="项目名称" width="120"> </el-table-column>
    <el-table-column prop="constructUnit" label="建设单位" width="120"> </el-table-column>
    <el-table-column prop="constructAddress" label="建设地点" width="120"> </el-table-column>
    <el-table-column prop="constructDetail" label="建设内容和规模" width="120"> </el-table-column>
    <el-table-column prop="type" label="类型">
      <template slot-scope="scope">
        {{ mapType(scope.row.type) }}
      </template>
    </el-table-column>
    <el-table-column prop="schedule" label="进度安排" width="120"> </el-table-column>
    <el-table-column prop="landUse" label="用地情况" width="120"> </el-table-column>
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
    <template v-for="(item, index) of data[0] && data[0].historyLists">
      <el-table-column :label="'完成投资 ' + item.reportingTime" header-align="center" :key="index">
        <el-table-column label="总投资">
          <template slot-scope="scope">
            <span>{{ formatMoney(scope.row.historyLists[index].completeTotal || 0) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="政府投资">
          <template slot-scope="scope">
            <span>{{ formatMoney(scope.row.historyLists[index].completeGov || 0) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="带动投资">
          <template slot-scope="scope">
            <span>{{ formatMoney(scope.row.historyLists[index].completeDrive || 0) }}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column
        :label="'总体进度（%） ' + item.reportingTime"
        header-align="center"
        width="110"
        :key="index + 'g'"
      >
        <template slot-scope="scope">
          <span>{{ formatScore(scope.row.historyLists[index].overallProgress || 0, 1) }}%</span>
        </template>
      </el-table-column>
    </template>
    <el-table-column prop="rate" label="年度投资完成率（%）">
      <template slot-scope="scope">
        <span class="cell">{{ formatScore(scope.row.yearRate || 0, 1) }}%</span>
      </template>
    </el-table-column>
    <el-table-column prop="rate" label="计划投资完成率（%）">
      <template slot-scope="scope">
        <span class="cell">{{ formatScore(scope.row.planRate || 0, 1) }}%</span>
      </template>
    </el-table-column>
    <el-table-column prop="rate" width="120" :key="100" label="是否开工">
      <template slot-scope="scope">
        <span class="cell">{{ scope.row.isStart ? '是' : '否' }}</span>
      </template>
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
    <el-table-column v-if="type === 'edit'" align="center" label="本月总体进度（%）" width="170">
      <template slot-scope="scope">
        {{
          scope.row.overallProgress || scope.row.overallProgress === 0
            ? scope.row.overallProgress.toFixed(1) + '%'
            : '-'
        }}
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import { types, mapType } from '@/views2/utils/project';
import { formatMoney, formatScore } from '@/views2/utils/formatter';

export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      types,
    };
  },
  computed: {
    firstYear() {
      const data = this.data;
      console.log('data', data);
      if (data && data.length) {
        const tmp = data[0];
        return tmp?.firstYear || 2022;
      }
      return 2022;
    },
  },
  methods: {
    formatMoney,
    formatScore,
    mapType,
  },
};
</script>
<style lang="scss" scoped>
.table-custom {
  display: block !important;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.05);
  width: 100%;

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
