<template>
  <el-dialog
    class="my-el-dialog"
    :visible="dialog"
    append-to-body
    width="760"
    height="708"
    title="报送详情"
    @close="$emit('closeView')"
  >
    <Crud
      ref="crud"
      :get-method="getMethod"
      :before-get-method="beforeGetMethod"
      :query.sync="query"
      tableHeight="400"
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
      <template v-slot:export>
        <el-button icon="el-icon-download" type="primary" plain @click="exportMethod"> 导出信息汇总表 </el-button>
        <!--          <el-button icon="el-icon-download" type="primary" plain @click="exportMethod2"> 导出项目进度表 </el-button>-->
      </template>
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
import { REPORT_STATUS_COLOR, getStatusName } from '@/views2/ProgressSubmission/constants';
import { REPORT_STATUS, REPORT_STATUS2 } from './constants';
import { getInforExport } from '@/api2/progressSubmission';
import moment from 'moment';
import { downloadFile } from '@/utils/data';

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
        projectStatus: '',
        areaId: '',
        village: '',
        batch: [],
        city: '',
        county: '',
        province: '',
      },
      getMethod: getSubmitEarlyWarningDetail,
      reportStateOPt: [],
    };
  },
  computed: {
    ...mapGetters(['area', 'location', 'batch', 'year', 'status']),
  },
  beforeMount() {
    const opts = Object.keys(this.status ? REPORT_STATUS2 : REPORT_STATUS).map((ele) => {
      return {
        label: REPORT_STATUS[ele],
        value: parseInt(ele),
      };
    });
    opts.unshift({
      label: '全部',
      value: '',
    });
    this.reportStateOPt = opts;
  },
  methods: {
    getStatusName,
    // 地区
    changeArea(val) {
      if (val.areaId.length === 2) {
        this.query.city = '';
        this.query.county = '';
        this.query.province = val.areaName;
      } else if (val.areaId.length === 4) {
        this.query.city = val.areaName;
        this.query.county = '';
        this.query.province = '';
      } else if (val.areaId.length === 6) {
        this.query.city = '';
        this.query.county = val.areaName;
        this.query.province = '';
      }
      this.query.areaId = val.areaId;
    },
    beforeGetMethod(params) {
      let query;
      if (!params.areaId) {
        query = {
          ...params,
          ...this.location,
          batch: this.batch,
          year: this.year,
          status: this.status,
        };
      } else {
        query = {
          ...params,
          batch: this.batch,
          year: this.year,
          status: this.status,
        };
      }
      return query;
    },
    // 导出信息汇总表
    async exportMethod() {
      // if (this.selections.length === 0) {
      //   this.$notify.error('请选择需要导出的数据');
      //   return;
      // }
      this.$confirm('是否导出数据？', '提示', {
        type: 'warning',
      }).then(async () => {
        // const pageNum = this.$refs.crud.page;
        // const pageSize = this.$refs.crud.size;
        // const pageSize
        const data = {
          // ids: this.selections.map((item) => item.id),
          ...this.query,
          // pageNum,
          // pageSize,
        };
        // console.log(data);
        const res = await getInforExport(data);
        const time = moment().format('YYYY-MM-DD HH_mm_ss');
        const fileName = `信息汇总表${time}.xlsx`;
        downloadFile(res, fileName);
        this.$notify.success('导出成功');
      });
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
