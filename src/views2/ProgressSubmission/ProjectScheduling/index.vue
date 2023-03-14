<template>
  <div class="block">
    <div>
      <Crud
        ref="crud"
        :get-method="getMethod"
        :delete-method="deleteMethod"
        :query.sync="query"
        :showOrder="false"
        id-key="id"
        actionWidth="100px"
        use-table-left
        :multiple-delete="COUNTRY"
        :hideAdd="true"
        :hideEdit="true"
        :hideView="true"
        :hideTableAction="hideTableAction"
        :hideDelete="true"
        :permission-add="0"
        :permission-edit="0"
        :permission-delete="10004"
        :tableRowClassName="tableRowClassName"
        :default-size="20"
        @selectionChange="selectionChange"
      >
        <template v-slot:search>
          <div class="text-lg mb-4">调度列表</div>
          <div class="inline-flex mb-2 pl-0" style="flex-wrap: wrap">
            <div v-if="!VILLAGE" class="search-item mb-4">
              <span class="label">村（片区）名称：</span>
              <el-input
                style="width: 200px"
                v-model="query.name"
                :maxlength="50"
                placeholder="请输入村（片区）名称"
              ></el-input>
            </div>
            <div class="search-item mb-4">
              <span class="label">创建批次：</span>
              <el-select multiple v-model="query.declarationBatch" placeholder="请选择">
                <el-option
                  v-for="item in queryDeclareTypeOpt"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div class="search-item mb-4">
              <span class="label">报送时间：</span>
              <el-select v-model="query.time" placeholder="请选择">
                <el-option v-for="item in queryTimeOpt" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="search-item mb-4">
              <span class="label">状态：</span>
              <el-select v-model="query.status" placeholder="请选择">
                <el-option v-for="item in statusOpt" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
        </template>
        <template v-slot:insert>
          <el-button icon="el-icon-download" style="margin-bottom: 20px" type="primary" plain @click="exportMethod">
            导出信息汇总表
          </el-button>
          <!--          <el-button icon="el-icon-download" type="primary" plain @click="exportMethod2"> 导出项目进度表 </el-button>-->
        </template>
        <template v-slot:tableLeft>
          <AreaTree @changeArea="changeArea" />
        </template>
        <template v-slot:tableAction="scope">
          <div style="text-align: center">
            <el-link v-if="canDetail(scope.data)" @click="goDetail(scope)" type="primary"> 详情 </el-link>
          </div>
        </template>

        <!--        <template v-slot:export>-->
        <!--          <el-button-->
        <!--            icon="el-icon-download"-->
        <!--            v-if="roleId !== 3"-->
        <!--            type="primary"-->
        <!--            plain-->
        <!--            @click="exportEnclosure"-->
        <!--          >导出附件</el-button-->
        <!--          >-->
        <!--        </template>-->

        <template v-slot:table>
          <el-table-column v-if="level === 4" label="报送时间" prop="reportingTime"></el-table-column>
          <el-table-column v-if="level === 4 || level === 3" label="村（片区）名称" prop="name"></el-table-column>
          <el-table-column v-if="level === 4 || level === 3" label="创建批次" prop="declarationBatch"></el-table-column>
          <el-table-column v-if="level === 2 || level === 1" label="地区" prop="name"></el-table-column>
          <el-table-column v-if="level === 2 || level === 1" label="创建村数" prop="nums"></el-table-column>
          <el-table-column v-if="level === 2 || level === 1" label="本月已报送" prop="monthNums"></el-table-column>
          <el-table-column label="项目数" prop="projectNum" key="projectNum"></el-table-column>
          <el-table-column label="已开工项目数" prop="startNum" key="startNum"></el-table-column>
          <el-table-column label="项目开工比例" prop="startRate" key="startRate">
            <template slot-scope="scope"> {{ formatScore(scope.row.startRate * 100 || 0) }}% </template>
          </el-table-column>
          <el-table-column label="计划投资（万元）" prop="investNum" key="investNum">
            <template slot-scope="scope">
              {{ formatMoney(scope.row.investNum || 0) }}
            </template>
          </el-table-column>
          <el-table-column label="完成投资(万元)" prop="completeTotalInvestment" key="completeTotalInvestment">
            <template slot-scope="scope">
              {{ formatMoney(scope.row.completeTotalInvestment || 0) }}
            </template>
          </el-table-column>
          <el-table-column label="投资完成率" sortable prop="rate" key="rate">
            <template slot-scope="scope"> {{ formatScore(scope.row.rate * 100 || 0) }}% </template>
          </el-table-column>
          <el-table-column label="总体进度" sortable prop="overallProgress" key="overallProgress">
            <template v-slot="scope"> {{ formatScore(scope.row.overallProgress || 0) }}% </template>
          </el-table-column>
          <el-table-column v-if="level === 4 || level === 3" label="状态" prop="status" key="status">
            <template slot-scope="scope">
              <p :style="{ color: REPORT_STATUS_COLOR[scope.row.projectStatus] }">
                {{ getStatusName(scope.row.projectStatus) }}
              </p>
            </template>
          </el-table-column>
        </template>
      </Crud>
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex';

import { queryBatchInfo, queryTypeDeclaration, getRecVillages, deleteVillageItem, getTime } from '@/api2/villageManage';
import {
  DECLEAR_TYPE,
  DECLEAR_STATUS,
  getStatusName,
  REPORT_STATUS_COLOR,
  REPORT_STATUS,
  PROJECT_STATUS,
  // PRO_DECLEAR_STATUS,
} from '../constants';
import { recVerify } from '@/api/villageManage';
import { downloadFile } from '@/utils/data';
import role from '@/views2/mixins/role';
import AreaTree from '@/views2/ProgressSubmission/Components/AreaTree';
import { exportDetail, getInforExport, getList } from '@/api2/progressSubmission';
import { formatMoney, formatScore } from '@/views2/utils/formatter';
// import qs from "qs";
export default {
  mixins: [role],
  components: { AreaTree },
  data() {
    // const date = new Date();
    // const year = date.getFullYear().toString();

    return {
      level: '',
      REPORT_STATUS_COLOR,
      PROJECT_STATUS,
      hideTableAction: true,
      query: {
        declarationBatch: [],
        finalStatus: '',
        time: '', // 报送时间
        name: '',
        date: '',
        areaId: '',
        city: '',
        county: '',
        province: '',
        // village: '',
        createBy: '',
        projectStatus: null,
        status: 0,
      },
      declareYearOpt: [
        {
          value: '',
          label: '2021',
        },
      ],
      queryDeclareTypeOpt: [
        // {
        //   label: '全部',
        //   value: '',
        // },
      ],
      queryTimeOpt: [
        {
          label: '全部',
          value: '',
        },
      ],
      dialogDeclareYearOpt: [
        // {
        //   value: "",
        //   label: "2021",
        // }
      ],
      dialogDeclareTypeOpt2: [],
      declareStatusOpt: [
        {
          label: '全部',
          value: '',
        },
      ],
      reportStateOPt: [],
      // getMethod: '',
      getMethod: getList,
      deleteMethod: deleteVillageItem,
      dialogVisible: false,
      submitSortMethod: recVerify,
      batchInfo: {},
      dialogQuery: {
        declareType: '',
        declareYear: '',
      },
      selections: [],
      statusOpt: [
        {
          label: '全部',
          value: 0,
        },
        {
          label: '调度中',
          value: 1,
        },
      ],
    };
  },
  beforeMount() {
    this.declareType = DECLEAR_TYPE;
    this.declareStatus = DECLEAR_STATUS;
    this.declareTypeOpt = this.normalizeSelectOptions(DECLEAR_TYPE);
    // this.queryDeclareTypeOpt = this.queryDeclareTypeOpt.concat(this.normalizeSelectOptions(DECLEAR_TYPE));
    this.declareStatusOpt = this.declareStatusOpt.concat(this.normalizeSelectOptions(DECLEAR_STATUS));
    // if (this.roleId !== 1) {
    //   this.declareStatusOpt = this.declareStatusOpt.concat(this.normalizeSelectOptions(DECLEAR_STATUS));
    // } else {
    //   this.declareStatusOpt = this.declareStatusOpt.concat(this.normalizeSelectOptions(PRO_DECLEAR_STATUS));
    // }
    if (this.COUNTRY || this.COUNTRY_LEADER) {
      this.query.isAudit = 0;
    }
    this.getBatchInfo();
    this.getTimeInfo();
    if (this.VILLAGE) {
      this.hideTableAction = false;
    }
    if (this.VILLAGE) {
      this.level = 4;
    } else if (this.COUNTRY || this.COUNTRY_LEADER) {
      this.level = 3;
    } else if (this.CITY || this.COUNTRY_LEADER) {
      this.level = 2;
    } else {
      this.level = 1;
    }
  },
  mounted() {
    const opts = Object.keys(REPORT_STATUS).map((ele) => {
      // console.log(ele);
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
    formatScore,
    formatMoney,
    getStatusName,
    canDetail(data) {
      const hasPerm = this.level === 4;
      if (
        data.projectStatus === this.PROJECT_STATUS.TO_BE_FIRST_REPORT ||
        data.projectStatus === this.PROJECT_STATUS.TO_BE_REPORT ||
        data.projectStatus === this.PROJECT_STATUS.TO_BE_LATTER_REPORT
      ) {
        return false;
      }
      return hasPerm;
    },
    // 改变地区
    changeArea(val) {
      this.level = val.level;
      if (val.level === 4) {
        this.hideTableAction = false;
        this.query.createBy = val.createBy;
        this.query.city = '';
        this.query.county = '';
        this.query.province = '';
      } else if (val.level === 3) {
        this.hideTableAction = true;
        this.query.createBy = '';
        this.query.city = '';
        this.query.county = val.area;
        this.query.province = '';
      } else if (val.level === 2) {
        this.hideTableAction = true;
        this.query.createBy = '';
        this.query.city = val.area;
        this.query.county = '';
        this.query.province = '';
      } else if (val.level === 1) {
        this.hideTableAction = true;
        this.query.createBy = '';
        this.query.city = '';
        this.query.county = '';
        this.query.province = val.area;
      }
      this.$refs.crud.search();
      // this.query.areaId = val.areaId;
    },
    ...mapMutations('villageMange', ['changeDeclareList']),
    normalizeSelectOptions(obj) {
      if (!Object.prototype.toString.call(obj).slice(8, -1) === 'Object') return [];
      return Object.keys(obj).map((key) => {
        return {
          label: obj[key],
          value: key,
        };
      });
    },
    selectionChange(val) {
      this.selections = val;
    },
    tableRowClassName({ row }) {
      return row.completeTotalInvestment > row.investNum ? 'row-danger' : '';
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
        const pageNum = this.$refs.crud.page;
        const pageSize = this.$refs.crud.size;
        // const pageSize
        const data = {
          // ids: this.selections.map((item) => item.id),
          ...this.query,
          pageNum,
          pageSize,
        };
        // console.log(data);
        const res = await getInforExport(data);
        downloadFile(res, '信息汇总表.xlsx');
        this.$notify.success('导出成功');
      });
    },
    // 导出项目进度表
    async exportMethod2() {
      if (this.selections.length === 0) {
        this.$notify.error('请选择需要导出的数据');
        return;
      }
      this.$confirm('是否批量导出所选数据？', '提示', {
        type: 'warning',
      }).then(async () => {
        this.loading = true;
        const data = {
          ids: this.selections.map((item) => item.id),
        };
        const res = await exportDetail(data);
        downloadFile(res, '浙江省未来乡村项目进度表.xlsx');
        this.$notify.success('导出成功');
      });
    },
    // newApplications(val) {
    //   const routerName = VILLAGE_LIST_ROUTER_NAME[Number(val)];
    //   routerName && this.$router.push({ name: routerName });
    // },
    newApplications() {
      this.$router.push({ name: 'NewAcceptanceEvaluation' });
    },
    lookUp() {
      if (this.CITY) {
        this.getTypeDeclaration();
        this.queryBatchInfo();
      }
    },
    // 批次
    async getBatchInfo() {
      const res = await queryBatchInfo();
      const opt = (res?.content || []).map((i) => {
        return {
          label: i.batch,
          value: i.batch,
        };
      });
      this.queryDeclareTypeOpt = this.queryDeclareTypeOpt.concat(opt);
    },
    // 报送时间
    async getTimeInfo() {
      const res = await getTime();
      const opt = (res || []).map((i) => {
        return {
          label: i,
          value: i,
        };
      });
      this.queryTimeOpt = this.queryTimeOpt.concat(opt);
    },
    // 查询申报批次和类型
    async getTypeDeclaration() {
      const res = await queryTypeDeclaration();
      if (res.type) {
        this.dialogDeclareTypeOpt2 = res.type.map((item) => {
          if (item === '1002') {
            return {
              label: '重点村',
              value: '1002',
            };
          } else {
            return { label: '一般村', value: '1001' };
          }
        });
        this.dialogQuery.declareType = this.dialogDeclareTypeOpt2[0].value;
      } else {
        this.dialogQuery.declareType = '';
      }
      if (res.years) {
        this.dialogDeclareYearOpt = res.years.map((item) => {
          return {
            label: item + '年度',
            value: item,
          };
        });
        this.dialogQuery.declareYear = this.dialogDeclareYearOpt[0].value;
      } else {
        this.dialogQuery.declareYear = '';
      }
    },
    // 市级汇总申报排序提示
    async queryBatchInfo() {
      const res = await queryBatchInfo();
      if (res && res.pici) {
        this.batchInfo = res;
        this.$confirm('审核已完成！\n' + '您需要分批次排序后提交至省级审核。', '提示', {
          confirmButtonText: '前往排序',
          cancelButtonText: '暂不排序',
          type: 'warning',
        })
          .then(() => {
            this.showDialog();
          })
          .catch(() => {});
      } else {
        this.batchInfo = {};
      }
    },
    showDialog() {
      this.dialogVisible = true;
    },
    onSubmit() {
      this.$refs.dialogCrud.submitSort();
      this.dialogVisible = false;
    },
    async getDialogDataList(params) {
      const res = await getRecVillages(params);
      return res;
    },
    // 详情
    goDetail(scope) {
      const { id, reportingTime, projectStatus } = scope.data;
      if (projectStatus === this.PROJECT_STATUS.COMPLETED || projectStatus === this.PROJECT_STATUS.NEW_COMPLETED) {
        return this.$router.push({
          name: 'ProgressSubmissionDetails',
          query: { id: id, reportingTime, detail: true, showComplete: true },
        });
      }
      this.$router.push({ name: 'ProgressSubmissionDetails', query: { id: id, reportingTime, detail: true } });
    },
  },
};
</script>
<style lang="scss" scoped>
.block {
  background-color: unset;
  &::v-deep .search {
    background-color: white;
    padding: 20px 16px;
    border-radius: 4px;
  }
  &::v-deep .table-box {
    padding: 20px 0 0;
    background-color: rgb(246 246 246);
    .table-right {
      border-radius: 4px;
      padding: 12px 25px;
      background-color: white;
    }
    .table-left {
      width: fit-content;
      padding: 15px 2px;
      margin-right: 20px;
      background-color: white;
      border-radius: 4px;
    }
  }
}
.search-item {
  margin-right: 20px;
  white-space: nowrap;

  .label {
    font-weight: 400;
    color: #333333;
  }
}

.status {
  display: inline-block;
  margin-right: 6px;
  width: 8px;
  height: 8px;
  border-radius: 100%;
  background: #ccc;

  &.active {
    background: #15be50;
  }
}

.cell-warn {
  color: rgb(245, 108, 108);
}

.tip {
  background: #edf4ff;
  border: 1px solid #99cbf9;
  border-radius: 4px;
  padding: 12px 16px;
  margin-bottom: 20px;
  display: flex;

  .tip-left {
    img {
      width: 16px;
      height: 16px;
      //background: #1492FF;
    }

    margin-right: 12px;
  }

  .tip-right {
    .tip-title {
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #000000;
      line-height: 22px;
      margin-bottom: 8px;
    }

    .tip-content {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #666666;
      line-height: 22px;
      margin-bottom: 8px;

      span {
        color: #1492ff;
      }
    }

    .tip-button {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #1492ff;
      line-height: 22px;
    }
  }
}

::v-deep .row-danger {
  background-color: #f39e9e;

  &.hover-row {
    background-color: rgb(244, 121, 121);
    td.el-table__cell {
      background-color: rgb(244, 121, 121);
    }
  }
}
</style>
