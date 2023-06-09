<template>
  <div class="block">
    <el-form ref="form" class="form" label-position="top" :model="form" label-width="80px">
      <h3 class="text-gray-800 text-2xl mb-8">未来乡村项目进度报送</h3>
      <div class="detail-top">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item v-if="form.name" label="创建村/片区名称" prop="area">
              <el-input v-model="form.name" placeholder="请输入创建村/片区名称" disabled></el-input>
            </el-form-item>
            <el-form-item v-else label="创建村/片区名称" prop="villageName">
              <el-input v-model="form.villageName" placeholder="请输入创建村/片区名称" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="创建批次" prop="declarationBatch">
              <el-input v-model="form.declarationBatch" placeholder="请输入创建批次" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="总投资（万元）" prop="investNum">
              <el-input-number
                v-model="form.investNum"
                :precision="2"
                :controls="false"
                placeholder="请输入总投资（万元）"
                disabled
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="领办领导" prop="leader">
              <el-input v-model="form.leader" placeholder="请输入领办领导" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系人" prop="contactPerson">
              <el-input v-model="form.contactPerson" placeholder="请输入联系人" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系方式" prop="phone">
              <el-input v-model="form.phone" placeholder="请输入联系方式" maxlength="8" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="mb-8">
        <el-form-item class="list-table" label="" prop="detailLists" :rules="listRules">
          <!--          <div class="import">-->
          <!--            <el-button type="primary" @click="lookHistory">历史数据</el-button>-->
          <!--          </div>-->
          <el-tabs v-model="activeName">
            <el-tab-pane label="报送中" name="first">
              <VilliageListTable key="报送中" v-if="showTable" type="edit" useAction :data="form.detailLists">
                <template v-slot:action="scope">
                  <el-link
                    v-if="
                      scope.data.completeDrive === null &&
                      scope.data.completeGov === null &&
                      scope.data.completeTotal === null
                    "
                    @click="fillIn(scope)"
                    type="primary"
                  >
                    填报
                  </el-link>
                  <span v-else>
                    <el-link v-if="scope.data.showDetail" @click="goDetail(scope)" type="primary"> 详情 </el-link>
                    <el-divider v-if="scope.data.showDetail" direction="vertical"></el-divider>
                    <el-link @click="goModify(scope)" type="primary"> 修改 </el-link>
                  </span>
                </template>
              </VilliageListTable>
            </el-tab-pane>
            <el-tab-pane label="已竣工" name="second">
              <VilliageListTable key="已竣工" v-if="showTable" is-end use-action type="edit" :data="form.endLists">
                <template v-slot:action="scope">
                  <el-link @click="goDetail(scope)" v-if="scope.data.showDetail" type="primary"> 详情 </el-link>
                  <el-divider v-if="scope.data.showDetail" direction="vertical"></el-divider>
                  <el-link v-if="scope.data.canEdit" @click="goCompletedModify(scope)" type="primary"> 修改 </el-link>
                </template>
              </VilliageListTable>
            </el-tab-pane>
          </el-tabs>
        </el-form-item>
      </div>
    </el-form>
    <div>
      <el-button @click="$router.back()">返回</el-button>
      <!--      改为单个提交隐藏总体提交-->
      <el-button v-if="!$route.query.modify" type="primary" @click="onSubmit">提交</el-button>
    </div>
    <el-dialog title="详情" :visible.sync="dialogVisible" width="90%">
      <VillageListHistoryTable :data="historyList" />
    </el-dialog>
    <el-dialog class="new-dialog" title="详情" :visible.sync="detailDialogVisible" width="90%">
      <AddFillInDetail
        v-if="detailDialogVisible"
        v-model="detailDialogVisible"
        :id="detailId"
        type="detail"
        :detailData="detailData"
      />
    </el-dialog>

    <el-dialog class="new-dialog" title="填报" center :visible.sync="fillInDialogVisible" width="90%">
      <AddFillIn
        v-if="fillInDialogVisible"
        v-model="fillInDialogVisible"
        :id="projectId"
        :modifyData="modifyData"
        :type="dialogType"
        @saveItem="saveItem"
        @refresh="getDetail"
      />
    </el-dialog>
  </div>
</template>

<script>
import VilliageListTable from '../Components/VilliageListTable';
import VillageListHistoryTable from '../Components/VillageListHistoryTable';
import AddFillInDetail from '../Components/AddFillInDetail';
import AddFillIn from '../Components/AddFillIn';

import rule from '@/mixins/rule';
import { addData, getDetail, getHistory } from '@/api2/progressSubmission';
import { formatMoney } from '@/views2/utils/formatter';
import { PROJECT_STATUS } from '@/views2/ProgressSubmission/constants';
const tableList = (rule, value, callback) => {
  if (value.length) {
    const notNum = value.some((i) => {
      return isNaN(i.completeDriveNow) || isNaN(i.completeGovNow);
    });
    if (notNum) {
      callback(new Error('请填写的数据都为数字'));
      return;
    }
    // const notNum = value.some((i) => {
    //   return isNaN(i.completeSelfInvestmentNow) || isNaN(i.completeSocialInvestmentNow) || isNaN(i.completeTotalInvestmentNow)
    // });
    callback();
  } else {
    callback(new Error('无上报数据'));
  }
};
export default {
  mixins: [rule],
  components: {
    VilliageListTable,
    VillageListHistoryTable,
    AddFillIn,
    AddFillInDetail,
  },
  data() {
    return {
      PROJECT_STATUS,
      projectId: null,
      modifyData: {},
      activeName: 'first',
      showTable: false,
      form: {
        area: '',
        villageName: '',
        declarationBatch: '',
        investNum: '',
        leader: '',
        contactPerson: '',
        phone: '',
        detailLists: [],
        endLists: [],
      },
      historyList: [],
      fillInDataList: [],
      type: 'add',
      firstTime: false, // 是否是第一次填报进度
      dialogVisible: false,
      fillInDialogVisible: false, // 填报弹窗
      detailDialogVisible: false, // 填报详情弹窗
      importDialogVisible: false,
      editIndex: '',
      editProjectForm: false, // 编辑表格
      listRules: { required: true, validator: tableList, trigger: 'blur' },
      firstYear: 2022,
      dialogType: 'add',
      detailData: {}, // 详情数据
      detailId: '', // 详情弹窗id
    };
  },
  beforeMount() {
    this.getDetail();
  },
  methods: {
    formatMoney,
    getDetail() {
      const params = {
        id: this.$route.query.id,
        reportingTime: this.$route.query.reportingTime,
      };
      getDetail(params).then((res) => {
        this.form = res;
        this.form.detailLists = this.form.detailLists.map((i) => {
          return {
            ...i,
            state: Boolean(i.isStart),
            lastState: Boolean(i.isStart),
            completeDriveNow: 0,
            completeGovNow: 0,
            overallProgressNow: 0,
          };
        });
        this.form.endLists = this.form.endLists.map((i) => {
          return {
            ...i,
            state: Boolean(i.isStart),
            lastState: Boolean(i.isStart),
            completeDriveNow: 0,
            completeGovNow: 0,
            overallProgressNow: 0,
          };
        });
        this.firstTime = this.form.detailLists.every((i) => {
          return i.planGovInvestment === null;
        });
        this.showTable = true;
        // 上报（上半月和下半月）情况下进行所有数据推入
        if (!this.$route.query.modify) {
          this.form.detailLists.forEach((i) => {
            const {
              completeDrive,
              completeGov,
              completeTotal,
              overallProgress,
              id,
              isStart,
              monthPic,
              isEnd,
              planRate,
              yearRate,
            } = i;
            const dataFrom = {
              completeDrive,
              completeGov,
              completeTotal,
              overallProgress,
              id,
              isStart,
              monthPic,
              isEnd,
              planRate,
              yearRate,
            };
            this.saveItem(dataFrom);
          });
        }
        // // 上半月已报送
        // // 当进下半月报送时且上半月已报送的报送进行数据推入
        // if (this.$route.query.secondUpdate && this.form.upStatus !== this.PROJECT_STATUS.FIRST_UNREPORTED) {
        //   this.form.detailLists.forEach((i) => {
        //     const {
        //       completeDrive,
        //       completeGov,
        //       completeTotal,
        //       overallProgress,
        //       id,
        //       isStart,
        //       monthPic,
        //       isEnd,
        //       planRate,
        //       yearRate,
        //     } = i;
        //     const dataFrom = {
        //       completeDrive,
        //       completeGov,
        //       completeTotal,
        //       overallProgress,
        //       id,
        //       isStart,
        //       monthPic,
        //       isEnd,
        //       planRate,
        //       yearRate,
        //     };
        //     this.saveItem(dataFrom);
        //   });
        // }
      });
    },
    // 填报
    fillIn(scope) {
      this.modifyData = _.cloneDeep(scope.data);
      this.projectId = scope.data.id;
      this.dialogType = 'add';
      this.fillInDialogVisible = true;
    },
    // 未竣工修改
    goModify(scope) {
      this.modifyData = _.cloneDeep(scope.data);
      this.projectId = scope.data.id;
      this.dialogType = 'modify';
      this.fillInDialogVisible = true;
    },
    // 已竣工修改
    goCompletedModify(scope) {
      this.modifyData = _.cloneDeep(scope.data);
      this.projectId = scope.data.id;
      this.dialogType = 'completedModify';
      this.fillInDialogVisible = true;
    },
    // 详情
    goDetail(scope) {
      this.detailData = _.cloneDeep(scope.data);
      this.detailId = scope.data.id;
      this.detailDialogVisible = true;
    },
    saveItem(data) {
      // this.getDetail();
      const index = this.fillInDataList.findIndex((i) => i.id === data.id);
      if (index === -1) {
        this.fillInDataList.push(data); // 新增
      } else {
        this.fillInDataList.splice(index, 1, data); // 修改
      }
      // const addIndex = index === -1 ? this.fillInDataList.length - 1 : index;
      // 更新列表的数据
      const dataListIndex = this.form.detailLists.findIndex((i) => i.id === data.id);
      const row = this.form.detailLists[dataListIndex];
      row.completeDrive = data.completeDrive;
      row.completeGov = data.completeGov;
      row.completeTotal = data.completeTotal;
      row.overallProgress = data.overallProgress;
      row.isEnd = data.isEnd;
      row.isStart = data.isStart;
      row.isEnd = data.isEnd;
      row.monthPic = data.monthPic;
      row.planRate = data.planRate;
      row.yearRate = data.yearRate;
      // this.calcRateTotal(row, this.fillInDataList[addIndex]);
      // this.calcRateCurrentYear(row, this.fillInDataList[addIndex]);
    },
    saveItemOld(data) {
      const index = this.fillInDataList.findIndex((i) => i.id === data.id);
      if (index === -1) {
        this.fillInDataList.push(data); // 新增
      } else {
        this.fillInDataList.splice(index, 1, data); // 修改
      }
      const addIndex = index === -1 ? this.fillInDataList.length - 1 : index;
      const dataListIndex = this.form.detailLists.findIndex((i) => i.id === data.id);
      const row = this.form.detailLists[dataListIndex];
      row.completeDrive = data.completeDrive;
      row.completeGov = data.completeGov;
      row.completeTotal = data.completeTotal;
      row.overallProgress = data.overallProgress;
      row.isEnd = data.isEnd;
      row.isStart = data.isStart;
      row.isEnd = data.isEnd;
      row.monthPic = data.monthPic;
      this.calcRateTotal(row, this.fillInDataList[addIndex]);
      this.calcRateCurrentYear(row, this.fillInDataList[addIndex]);
    },
    // 添加 项目
    onSubmit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          if (this.testAllData()) {
            return this.$notify.error('含有未完成填报的项目，请检查每月进度照片是否上传');
          }
          // // 上报且（在第一次上报不足||上半月未满报送）
          // if (
          //   !this.$route.query.modify &&
          //   ((!this.$route.query.secondUpdate && this.fillInDataList.length !== this.form.detailLists.length) ||
          //     (this.form.upStatus === this.PROJECT_STATUS.FIRST_UNREPORTED &&
          //       this.fillInDataList.length !== this.form.detailLists.length))
          // ) {
          //   return this.$notify.error('含有未完成填报的项目，请检查每月进度照片是否上传');
          // }
          let totalValue = 0;
          const compareValue = this.form.investNum * 1.1;
          this.form.detailLists.forEach((i) => (totalValue += Number(i.completeTotal)));
          this.$confirm(
            `${totalValue > compareValue ? '填报的完成投资金额已超过计划投资金额的10%，是否确认提交?' : '确认提交？'}`,
            {
              showClose: false,
            },
          )
            .then(async () => {
              const data = this.form.detailLists.map((item) => {
                return {
                  completeDrive: Number(item.completeDrive),
                  completeGov: Number(item.completeGov),
                  completeTotal: Number(item.completeTotal),
                  overallProgress: Number(item.overallProgress),
                  planRate: Number(item.planRate),
                  yearRate: Number(item.yearRate),
                  id: item.id,
                  isStart: item.isStart,
                  isEnd: item.isEnd,
                  monthPic: item.monthPic,
                };
              });
              // console.log(data);
              await addData(data);
              this.$notify.success({
                title: '提交成功！',
              });
              this.$router.back();
            })
            .catch(() => {});
        }
      });
    },
    //  校验填报的所有数据
    testAllData() {
      // 找到不合理的项目
      return this.fillInDataList.some((item) => {
        //“其中政府投资、其中完成投资、总体进度、是否开工、项自进度情况照片”
        return (
          item.completeGov === null ||
          item.completeDrive === null ||
          item.completeTotal === null ||
          (item.isStart && (item.monthPic === null || item.monthPic === ''))
        );
      });
    },
    // 添加 项目
    onSecondSubmit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          if (
            !this.$route.query.modify &&
            this.form.upStatus === this.PROJECT_STATUS.FIRST_UNREPORTED &&
            this.fillInDataList.length !== this.form.detailLists.length
          ) {
            return this.$notify.error('含有未完成填报的项目，请检查每月进度照片是否上传');
          }
          let totalValue = 0;
          const compareValue = this.form.investNum * 1.1;
          this.form.detailLists.forEach((i) => (totalValue += Number(i.completeTotal)));
          this.$confirm(
            `${totalValue > compareValue ? '填报的完成投资金额已超过计划投资金额的10%，是否确认提交?' : '确认提交？'}`,
            {
              showClose: false,
            },
          )
            .then(async () => {
              const data = this.form.detailLists.map((item) => {
                return {
                  completeDrive: Number(item.completeDrive),
                  completeGov: Number(item.completeGov),
                  completeTotal: Number(item.completeTotal),
                  overallProgress: Number(item.overallProgress),
                  planRate: Number(item.planRate),
                  yearRate: Number(item.yearRate),
                  id: item.id,
                  isStart: item.isStart,
                  isEnd: item.isEnd,
                  monthPic: item.monthPic,
                };
              });
              // console.log(data);
              await addData(data);
              this.$notify.success({
                title: '提交成功！',
              });
              this.$router.back();
            })
            .catch(() => {});
        }
      });
    },
    async lookHistory() {
      const res = await getHistory({ id: this.$route.query.id });
      this.historyList = res;
      this.dialogVisible = true;
    },
    //  计划投资完成率（%）
    calcRateTotal(scope, formData) {
      const data = scope;
      const form = formData;
      const { planFirstDrive, planFirstGov, planSecondDrive, planSecondGov } = data;
      const plantTotal =
        Number(planFirstDrive) + Number(planFirstGov) + Number(planSecondDrive) + Number(planSecondGov) || 1;
      const currentTotal = Number(form.completeGov || 0) + Number(form.completeDrive || 0);
      const result = ((currentTotal / plantTotal) * 100 || 0).toFixed(1);
      data.planRate = result;
      form.yearRate = result;
      // console.log('xxxx total', currentTotal, plantTotal, result);

      return result ? result + '%' : '0%';
    },
    // 年度投资完成率（%）
    calcRateCurrentYear(scope, formData) {
      // console.log(scope);
      const data = scope;
      const form = formData;
      const { planFirstDrive, planFirstGov, planSecondDrive, planSecondGov } = data;
      const isFirstYear = this.firstYear === new Date().getFullYear();
      const plantTotal = isFirstYear
        ? Number(planFirstDrive) + Number(planFirstGov) || 1
        : Number(planSecondDrive) + Number(planSecondGov) || 1;
      const currentTotal = Number(form.completeGov || 0) + Number(form.completeDrive || 0);
      const result = ((currentTotal / plantTotal) * 100 || 0).toFixed(1);
      data.yearRate = result;
      form.yearRate = result;
      // console.log('xxxx total', currentTotal, plantTotal, result);
      return result ? result + '%' : '0%';
    },
  },
};
</script>

<style lang="scss" scoped>
.new-dialog {
  &::v-deep .el-dialog__header::after {
    //border-bottom: #e6e9f0 1px solid;
    margin-top: 16px;
    content: '';
    display: block;
    width: 100%;
    height: 1px;
    background-color: #e6e9f0;
  }
}
.form {
  max-width: 1600px;
  padding-left: 8px;

  .detail-top {
    .el-input {
      max-width: 240px;
    }
  }

  .add-wrp {
    width: 90%;
    margin-bottom: 150px;

    .el-icon-plus {
      font-size: 16px;
    }
  }

  .block-tit {
    margin-top: 32px;
    margin-bottom: 20px;
    font-size: 18px;
  }

  .total-wrp {
    color: #333333;

    & span {
      color: #606266;
      line-height: 40px;
      padding: 0 2px 0 0;
    }
  }

  .input {
    width: 31%;
    flex-shrink: 0;
  }

  .input-item-wrp {
    display: flex;
    flex-wrap: wrap;

    ::v-deep .el-form-item {
      width: 31%;
      flex-shrink: 0;
      margin-right: 20px;

      .el-form-item__label {
        font-size: 16px;
      }
    }
  }

  .list-table {
    .import {
      width: 90%;
      display: flex;
      justify-content: space-between;
      flex-direction: row-reverse;
      margin-bottom: 12px;
    }
  }
}
</style>
