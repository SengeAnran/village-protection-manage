<template>
  <el-dialog
    class="my-el-dialog"
    :visible="dialog"
    append-to-body
    :width="760"
    :height="708"
    title="报送详情"
    @close="$emit('closeView')"
  >
    <Crud
      ref="crud"
      :get-method="getMethod"
      :query.sync="query"
      :tableHeight="400"
      id-key="id"
      hideTableAction
      hidePagination
      :hideAdd="true"
      :hideEdit="true"
      :hideView="true"
      :hideDelete="true"
      :permission-add="0"
      :permission-edit="0"
      :permission-delete="0"
    >
      <template v-slot:search>
        <div class="search-content inline-flex mb-6 pl-0">
          <div class="search-item">
            <div class="search-item">
              <span class="label">村庄名称：</span>
              <el-input style="width: 150px" v-model="query.village" :maxlength="50" placeholder="请输入"></el-input>
            </div>
          </div>
          <div class="search-item mb-4">
            <span class="label">地区：</span>
            <VillageSelectItem checkStrictly v-model="query.areaId" @change="changeArea" />
          </div>
          <div class="search-item">
            <span class="label">状态：</span>
            <el-select v-model="query.projectStatus" placeholder="请选择">
              <el-option v-for="(item, index) of reportStateOPt" :key="index" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
      </template>

      <template v-slot:table>
        <el-table-column label="地区" prop="villageName"></el-table-column>
        <el-table-column label="区县" prop="country" width="100"> </el-table-column>
        <el-table-column label="地市" prop="city"></el-table-column>
        <!--        <el-table-column label="状态" prop="finalStatus">-->
        <!--          <template slot-scope="scope">-->
        <!--            <p :style="{ color: REPORT_STATUS_COLOR[scope.row.finalStatus] }">-->
        <!--              {{ getStatusName(scope.row.finalStatus) }}-->
        <!--            </p>-->
        <!--          </template>-->
        <!--        </el-table-column>-->
        <el-table-column label="状态" prop="finalStatus"> </el-table-column>
      </template>
    </Crud>
  </el-dialog>
</template>

<script>
import { getSubmitEarlyWarningDetail } from '@/api2/homePage';
import { mapGetters } from 'vuex';
import { REPORT_STATUS, REPORT_STATUS_COLOR, getStatusName } from '@/views2/ProgressSubmission/constants';

export default {
  name: 'EarlyWarnDetail',
  props: {
    dialog: {
      type: Boolean,
    },
  },
  data() {
    return {
      REPORT_STATUS_COLOR,
      query: {
        address: {
          city: '',
          county: '',
        },
        projectStatus: '',
        areaId: '',
        village: undefined,
        batch: [],
      },
      getMethod: getSubmitEarlyWarningDetail,
      reportStateOPt: [],
    };
  },
  computed: {
    ...mapGetters(['area', 'location', 'batch']),
  },
  beforeMount() {
    const opts = Object.keys(REPORT_STATUS).map((ele) => {
      return {
        label: REPORT_STATUS[ele],
        value: parseInt(ele),
      };
    });
    opts.unshift({
      label: '全部',
      value: null,
    });
    this.reportStateOPt = opts;
  },
  methods: {
    getStatusName,
    // 地区
    changeArea(val) {
      this.query.areaId = val.areaId;
    },
  },
};
</script>

<style lang="scss" scoped>
.my-el-dialog ::v-deep .el-dialog__header {
  text-align: center;
}
.my-el-dialog ::v-deep .el-dialog__body {
  padding-top: 0;
}
.table1 ::v-deep tr th {
  background-color: rgba(0, 0, 0, 0.2);
  color: #333333;
  > .cell {
    font-weight: 500;
  }
}
</style>
