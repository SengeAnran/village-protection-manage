<template>
  <div class="block">
    <div>
      <div class="text-lg mb-4">报送列表</div>
      <Crud
        ref="crud"
        :get-method="getMethod"
        :delete-method="deleteMethod"
        :query.sync="query"
        :showOrder="false"
        id-key="id"
        actionWidth="180px"
        :multiple-delete="COUNTRY"
        :hideAdd="true"
        :hideEdit="true"
        :hideView="true"
        :hideDelete="true"
        :permission-add="0"
        :permission-edit="0"
        :permission-delete="10004"
        :tableRowClassName="tableRowClassName"
        @selectionChange="selectionChange"
      >
        <template v-slot:search>
          <div
            v-if="VILLAGE || COUNTRY || COUNTRY_LEADER || CITY_LEADER || CITY"
            class="inline-flex mb-2 pl-0"
            style="flex-wrap: wrap"
          >
            <div class="search-item mb-4">
              <span class="label">报送时间：</span>
              <el-date-picker v-model="query.time" type="month" placeholder="请选择" value-format="yyyy-MM">
              </el-date-picker>
            </div>
            <div class="search-item" v-if="CITY || CITY_LEADER">
              <span class="label">地区：</span>
              <VillageSelectItem checkStrictly v-model="query.areaId" @change="changeArea" />
            </div>
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
            <!--            <div v-if="!COUNTRY" class="search-item mb-4">-->
            <!--              <span class="label">地区：</span>-->
            <!--              <VillageSelectItem checkStrictly v-model="query.areaId" @change="changeArea" />-->
            <!--              &lt;!&ndash;              <el-select v-model="query.declarationBatch" placeholder="请选择">&ndash;&gt;-->
            <!--              &lt;!&ndash;                <el-option&ndash;&gt;-->
            <!--              &lt;!&ndash;                  v-for="item in queryDeclareTypeOpt"&ndash;&gt;-->
            <!--              &lt;!&ndash;                  :key="item.value"&ndash;&gt;-->
            <!--              &lt;!&ndash;                  :label="item.label"&ndash;&gt;-->
            <!--              &lt;!&ndash;                  :value="item.value"&ndash;&gt;-->
            <!--              &lt;!&ndash;                >&ndash;&gt;-->
            <!--              &lt;!&ndash;                </el-option>&ndash;&gt;-->
            <!--              &lt;!&ndash;              </el-select>&ndash;&gt;-->
            <!--            </div>-->

            <div v-if="VILLAGE" class="search-item mb-4">
              <span class="label">状态：</span>
              <el-select v-model="query.projectStatus" placeholder="请选择">
                <el-option v-for="(item, index) of reportStateOPt" :key="index" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
        </template>
        <template v-slot:export>
          <el-button v-if="VILLAGE" icon="el-icon-download" type="primary" plain @click="exportMethod">
            导出信息汇总表
          </el-button>
          <!--          <el-button icon="el-icon-download" type="primary" plain @click="exportMethod2"> 导出项目进度表 </el-button>-->
        </template>
        <template v-slot:tableAction="scope">
          <div style="text-align: left">
            <el-link v-if="canVerify(scope.data)" @click="goDetail(scope)" type="primary"> 审核 </el-link>
            <!--          市级审核  -->
            <el-link v-if="canCityVerify(scope.data)" @click="cityVerity(scope)" type="primary"> 审核 </el-link>
            <el-divider v-if="canVerify(scope.data)" direction="vertical"></el-divider>
            <el-link v-if="canDetail(scope.data)" @click="goDetail(scope)" type="primary"> 详情 </el-link>
            <el-link v-if="canSecondReport(scope.data)" @click="goEdit(scope.data)" type="primary"> 更新报送 </el-link>

            <div style="display: inline-block">
              <el-link v-if="canReport(scope.data)" @click="edit(scope.data)" type="primary">报送 </el-link>
            </div>
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
          <el-table-column label="报送时间" prop="villageUpTime" fixed></el-table-column>
          <el-table-column label="村（片区）名称" prop="village"></el-table-column>
          <el-table-column label="创建批次" prop="declarationBatch"></el-table-column>
          <el-table-column label="项目数" prop="projectNum"></el-table-column>
          <el-table-column label="已开工项目数" prop="startNum"></el-table-column>
          <el-table-column label="项目开工比例" prop="startRate">
            <template slot-scope="scope"> {{ formatScore(scope.row.startRate * 100 || 0) }}% </template>
          </el-table-column>
          <el-table-column label="计划投资（万元）" prop="investNum">
            <template slot-scope="scope">
              {{ formatMoney(scope.row.investNum || 0) }}
            </template>
          </el-table-column>
          <el-table-column label="本月完成投资(万元)" prop="completeTotalInvestment">
            <template slot-scope="scope">
              {{
                scope.row.completeTotalInvestment || scope.row.completeTotalInvestment === 0
                  ? formatMoney(scope.row.completeTotalInvestment)
                  : '-'
              }}
            </template>
          </el-table-column>
          <el-table-column label="本月投资完成率" sortable prop="rate">
            <template slot-scope="scope">
              {{
                Number(scope.row.rate) || Number(scope.row.rate) === 0
                  ? formatScore(scope.row.rate * 100 || 0) + '%'
                  : '-'
              }}
            </template>
          </el-table-column>
          <el-table-column label="总体进度" sortable prop="overallProgress">
            <template v-slot="scope">
              {{ scope.row.overallProgress ? formatScore(scope.row.overallProgress || 0) + '%' : '-' }}
            </template>
          </el-table-column>
          <el-table-column label="状态" prop="status">
            <template slot-scope="scope">
              <p :style="{ color: REPORT_STATUS_COLOR[scope.row.projectStatus] }">
                {{ getStatusName(scope.row.projectStatus) }}
              </p>
            </template>
          </el-table-column>
        </template>
      </Crud>
    </div>
    <el-dialog title="审核" :visible.sync="cityRDialogVisible" width="90%">
      <city-review v-if="cityRDialogVisible" :id="showId" :reportingTime="showReportingTime" @closeView="closeView" />
    </el-dialog>
  </div>
</template>
<script>
import { mapMutations } from 'vuex';
import { queryBatchInfo, queryTypeDeclaration, getRecVillages, deleteVillageItem } from '@/api2/villageManage';
import {
  DECLEAR_TYPE,
  DECLEAR_STATUS,
  getStatusName,
  REPORT_STATUS_COLOR,
  REPORT_STATUS,
  PROJECT_STATUS,
  // PRO_DECLEAR_STATUS,
} from './constants';
import { recVerify } from '../../api/villageManage';
import { downloadFile } from '@/utils/data';
import role from '@/views2/mixins/role';

import { exportDetail, getInforExport, getList } from '@/api2/progressSubmission';
import { formatMoney, formatScore } from '@/views2/utils/formatter';
import moment from 'moment';
// import qs from "qs";
import CityReview from './Components/CityReview';
export default {
  components: { CityReview },
  mixins: [role],
  data() {
    // const date = new Date();
    // const year = date.getFullYear().toString();

    return {
      REPORT_STATUS_COLOR,
      PROJECT_STATUS,
      query: {
        declarationBatch: [],
        finalStatus: '',
        name: '',
        time: '', // 报送时间
        date: '',
        areaId: '',
        projectStatus: null,
        isAudit: undefined,
        city: '', // 市
        county: '', //县
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
      cityRDialogVisible: false,
      showId: undefined,
      showReportingTime: undefined,
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
      this.query.isAudit = 1;
    }
    if (this.CITY || this.CITY_LEADER) {
      this.query.isAudit = 7;
    }
    this.getBatchInfo();
  },
  mounted() {
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
    formatMoney,
    formatScore,
    getStatusName,
    // 县级审核
    canVerify(data) {
      const hasPerm = this.COUNTRY || this.COUNTRY_LEADER;
      if (data.projectStatus !== this.PROJECT_STATUS.COUNTY_VERIFY_PENDING) {
        return false;
      }
      return hasPerm;
    },
    // 市级审核
    canCityVerify(data) {
      // console.log(data);
      // return true;
      const hasPerm = this.CITY || this.CITY_LEADER;
      if (data.projectStatus !== this.PROJECT_STATUS.CITY_VERIFY_PENDING) {
        return false;
      }
      return hasPerm;
    },
    canDetail(data) {
      // 县级：展示所以详情
      if (this.COUNTRY || this.COUNTRY_LEADER) {
        return true;
      }
      const hasPerm = this.VILLAGE;
      if (
        data.projectStatus === this.PROJECT_STATUS.TO_BE_FIRST_REPORT ||
        data.projectStatus === this.PROJECT_STATUS.TO_BE_REPORT ||
        data.projectStatus === this.PROJECT_STATUS.TO_BE_LATTER_REPORT
      ) {
        return false;
      }
      return hasPerm;
    },
    canReport(data) {
      const hasPerm = this.VILLAGE;
      if (
        data.projectStatus !== this.PROJECT_STATUS.TO_BE_FIRST_REPORT &&
        data.projectStatus !== this.PROJECT_STATUS.TO_BE_REPORT
      ) {
        // 已报送则不可在报送
        return false;
      }
      if (!hasPerm) {
        return false;
      }
      // const day = new Date().getDate();
      // if (day > 18) {
      //   return false;
      // }
      return true;
    },
    canSecondReport(data) {
      const hasPerm = this.VILLAGE;
      if (data.projectStatus !== this.PROJECT_STATUS.TO_BE_LATTER_REPORT) {
        // 已报送则不可在报送
        return false;
      }
      return hasPerm;
    },
    // 地区
    changeArea(val) {
      console.log(val);
      if (val.areaId.length === 6) {
        this.query.county = val.areaName;
        this.query.city = '';
      }
      if (val.areaId.length === 4) {
        this.query.county = '';
        this.query.city = val.areaName;
      }
      this.query.areaId = val.areaId;
    },
    tableRowClassName({ row }) {
      return row.completeTotalInvestment > row.investNum ? 'row-danger' : '';
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
    // 导出信息汇总表
    async exportMethod() {
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
        const res = await getInforExport(data);
        const time = moment().format('YYYY-MM-DD HH_mm_ss');
        const fileName = `信息汇总表${time}.xlsx`;
        downloadFile(res, fileName);
        // this.$notify.success('导出成功');
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
        const time = moment().format('YYYY-MM-DD HH_mm_ss');
        const fileName = `浙江省未来乡村项目进度表${time}.xlsx`;
        downloadFile(res, fileName);
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
    // 市级审核
    cityVerity(scope) {
      console.log('市级审核', scope);
      const { id = undefined, reportingTime = '' } = scope.data;
      this.showReportingTime = reportingTime;
      this.showId = id;
      this.cityRDialogVisible = true;
      //
    },
    // 详情
    goDetail(scope) {
      const { id, reportingTime, projectStatus } = scope.data;
      if (projectStatus === this.PROJECT_STATUS.COMPLETED || projectStatus === this.PROJECT_STATUS.NEW_COMPLETED) {
        return this.$router.push({
          name: 'ProgressSubmissionDetails',
          query: { id: id, reportingTime, showComplete: true },
        });
      }
      this.$router.push({ name: 'ProgressSubmissionDetails', query: { id: id, reportingTime } });
    },
    // 报送
    edit(data) {
      const { id, reportingTime } = data;
      // getProgressReportCheck({ id, reportingTime }).then(() => {
      //
      // });
      this.$router.push({
        name: 'NewProgressSubmission',
        query: { id, reportingTime },
      });
    },
    // 更新报送
    goEdit(data) {
      const { id, reportingTime } = data;
      // getProgressReportCheck({ id, reportingTime }).then(() => {
      //
      // });
      this.$router.push({
        name: 'NewProgressSubmission',
        query: { id, reportingTime, secondUpdate: true },
      });
    },
    // 删除
    deleteItem(id) {
      this.$confirm('是否删除该条数据？', '提示', {
        type: 'warning',
      }).then(async () => {
        deleteVillageItem([id]).then(() => {
          this.$notify.success('删除成功');
          this.$refs.crud.getItems();
        });
      });
    },

    /**
     * @desc 判断action按钮是否显示
     * @param {String} actionName 按钮名称
     * @param {Number} declareStatus 审核状态码
     */
    actionControl(actionName, declareStatus) {
      if (this.COUNTRY) {
        // 县级
        return this.XIANJI_ACTION[actionName] && this.XIANJI_ACTION[actionName](declareStatus);
      } else if (this.CITY) {
        return (
          // 市级
          this.SHIJI_ACTION[actionName] && this.SHIJI_ACTION[actionName](declareStatus)
        );
      } else if (this.PROVINCE) {
        return (
          // 省
          this.ADMIN_ACTION[actionName] && this.ADMIN_ACTION[actionName](declareStatus)
        );
      }
      return false;
    },
    closeView(val) {
      if (val) {
        this.$refs.crud.getItems();
      }
      this.cityRDialogVisible = false;
    },
  },
};
</script>
<style lang="scss" scoped>
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
