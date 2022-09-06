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
        selection
        id-key="id"
        actionWidth="180px"
        :multiple-delete="userInfo.roleId === 3"
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
          <div class="inline-flex mb-2 pl-0" style="flex-wrap: wrap;">
            <div v-if="roleId !== 3" class="search-item mb-4">
              <span class="label">地区：</span>
              <VillageSelectItem checkStrictly v-model="query.areaId" @change="changeArea" />
              <!--              <el-select v-model="query.declarationBatch" placeholder="请选择">-->
              <!--                <el-option-->
              <!--                  v-for="item in queryDeclareTypeOpt"-->
              <!--                  :key="item.value"-->
              <!--                  :label="item.label"-->
              <!--                  :value="item.value"-->
              <!--                >-->
              <!--                </el-option>-->
              <!--              </el-select>-->
            </div>
            <div class="search-item mb-4">
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
              <el-select v-model="query.declarationBatch" placeholder="请选择">
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
              <span class="label">状态：</span>
              <el-select v-model="query.reportStatus" placeholder="请选择">
                <el-option
                  v-for="(item, index) of reportStateOPt"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </template>
        <template v-slot:export>
          <el-button icon="el-icon-download" type="primary" plain @click="exportMethod"> 导出信息汇总表 </el-button>
          <el-button icon="el-icon-download" type="primary" plain @click="exportMethod2"> 导出项目进度表 </el-button>
        </template>
        <template v-slot:tableAction="scope">
          <div style="text-align: left">
            <el-link @click="goDetail(scope)" type="primary"> 详情 </el-link>
            <el-divider v-if="canReport(scope.data)" direction="vertical"></el-divider>
            <div style="display: inline-block">
              <el-link v-if="canReport(scope.data)" @click="edit(scope.data)" type="primary"> 进度报送</el-link>
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
          <el-table-column label="村（片区）名称" prop="name"></el-table-column>
          <el-table-column label="创建批次" prop="declarationBatch"></el-table-column>
          <el-table-column label="项目数" prop="projectNum"></el-table-column>
          <el-table-column label="已开工项目数" prop="startNum"></el-table-column>
          <el-table-column label="项目开工比例" prop="startRate"></el-table-column>
          <el-table-column label="计划投资（万元）" prop="investNum">
            <template slot-scope="scope">
              {{ formatMoney(scope.row.investNum || 0) }}
            </template>
          </el-table-column>
          <el-table-column label="完成投资(万元)" prop="completeTotalInvestment">
            <template slot-scope="scope">
              {{ formatMoney(scope.row.completeTotalInvestment || 0) }}
            </template>
          </el-table-column>
          <el-table-column label="计划投资完成率" sortable prop="rate"></el-table-column>
          <el-table-column label="状态" prop="status">
            <template slot-scope="scope">
              <p :style="{ color: REPORT_STATUS_COLOR[scope.row.reportStatus]}">{{ getStatusName(scope.row.reportStatus) }}</p>
            </template>
          </el-table-column>
        </template>
      </Crud>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex';
import { queryBatchInfo, queryTypeDeclaration, getRecVillages, deleteVillageItem } from '@/api2/villageManage';
import {
  DECLEAR_TYPE,
  DECLEAR_STATUS,
  getStatusName,
  REPORT_STATUS_COLOR,
  REPORT_STATUS
  // PRO_DECLEAR_STATUS,
} from './constants';
import { recVerify } from '../../api/villageManage';
import { downloadFile } from '@/utils/data';

import { exportDetail, getInforExport, getList } from '@/api2/progressSubmission';
import { USER_TYPE } from '@/views2/utils/constants';
import { formatMoney } from '@/views2/utils/formatter';
// import qs from "qs";
export default {
  data() {
    // const date = new Date();
    // const year = date.getFullYear().toString();
    //console.log(year);

    return {
      USER_TYPE,
      REPORT_STATUS_COLOR,
      query: {
        declarationBatch: '',
        finalStatus: '',
        name: '',
        date: '',
        areaId: '',
        reportStatus: '',
      },
      declareYearOpt: [
        {
          value: '',
          label: '2021',
        },
      ],
      queryDeclareTypeOpt: [
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
      reportStateOPt: [
       
      ],
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
    };
  },
  computed: {
    ...mapGetters(['userInfo']),
    roleId() {
      console.log(this.userInfo.roleId);
      return this.userInfo.roleId;
    },
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
    this.getBatchInfo();
    console.log([12, 13].toString());
  },
  mounted() {
    const opts = Object.values(REPORT_STATUS).map((ele) => {
      return {
        label: ele,
        value: ele,
      };
    });
    opts.unshift({
      label: '全部',
      value: '',
    });
    this.reportStateOPt = opts;
  },
  methods: {
    formatMoney,
    getStatusName,
    canReport(data) {
      const roleId = this.roleId;
      const hasPerm = roleId === USER_TYPE.VILLAGE;
      if (data.reportStatus !== REPORT_STATUS.UNREPORTED) {
        // 已报送则不可在报送
        return false;
      }
      if (!hasPerm) {
        return false;
      }
      const day = new Date().getDate();
      if (day > 18) {
        return false;
      }
      return true;
    },
    // 地区
    changeArea(val) {
      console.log(val);
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
      if (this.selections.length === 0) {
        this.$notify.error('请选择需要导出的数据');
        return;
      }
      this.$confirm('是否批量导出所选数据？', '提示', {
        type: 'warning',
      }).then(async () => {
        const data = {
          ids: this.selections.map((item) => item.id),
        };
        const res = await getInforExport(data);
        downloadFile(res, '浙江省未来乡村申报汇总.xlsx');
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
      if (this.roleId === 2) {
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
      console.log(res);
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
      console.log(res);
    },
    showDialog() {
      this.dialogVisible = true;
    },
    onSubmit() {
      this.$refs.dialogCrud.submitSort();
      this.dialogVisible = false;
    },
    async getDialogDataList(params) {
      console.log(params);
      const res = await getRecVillages(params);
      console.log(res);
      return res;
    },
    // 详情
    goDetail(scope) {
      const { id } = scope.data;
      this.$router.push({ name: 'ProgressSubmissionDetails', query: { id: id } });
    },
    // 修改
    edit(data) {
      const { id } = data;
      this.$router.push({
        name: 'NewProgressSubmission',
        query: { id },
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
      if (this.roleId === 3) {
        // 县级
        return this.XIANJI_ACTION[actionName] && this.XIANJI_ACTION[actionName](declareStatus);
      } else if (this.roleId === 2) {
        return (
          // 市级
          this.SHIJI_ACTION[actionName] && this.SHIJI_ACTION[actionName](declareStatus)
        );
      } else if (this.roleId === 1) {
        return (
          // 省
          this.ADMIN_ACTION[actionName] && this.ADMIN_ACTION[actionName](declareStatus)
        );
      }
      return false;
    },

    // 修改、删除 *******
    _canModify(declareStatus, roleId) {
      return roleId === 3 && (declareStatus === 0 || declareStatus === 1 || declareStatus === 3);
    },
    // 审核详情
    _canViewDeclare(declareStatus, roleId) {
      if (roleId === 3) {
        return true;
      } else if (roleId === 2) {
        return declareStatus !== 0;
      } else if (roleId === 1) {
        return declareStatus !== 2;
      }
      return false;
    },
    // 审核
    _canDeclare(declareStatus, roleId) {
      if (roleId === 2) {
        return declareStatus === 0;
      } else if (roleId === 1) {
        return declareStatus === 2;
      }
      return false;
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
