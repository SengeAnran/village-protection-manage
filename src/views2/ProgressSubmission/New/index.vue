<template>
  <div class="block">
    <el-form
      ref="form"
      class="form"
      label-position="top"
      :model="form"
      label-width="80px"
    >
      <h3 class="text-gray-800 text-2xl mb-8">未来乡村项目进度报送</h3>
      <div class="detail-top">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item v-if="form.area" label="创建村/片区名称" prop="area">
              <el-input
                v-model="form.area"
                placeholder="请输入创建村/片区名称"
                disabled
              ></el-input>
            </el-form-item>
            <el-form-item v-else label="创建村/片区名称" prop="villageName">
              <el-input
                v-model="form.villageName"
                placeholder="请输入创建村/片区名称"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="创建批次" prop="declarationBatch">
              <el-input
                v-model="form.declarationBatch"
                placeholder="请输入创建批次"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="总投资（万元）" prop="investNum">
              <el-input
                v-model="form.investNum"
                placeholder="请输入总投资（万元）"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="领办领导" prop="leader">
              <el-input
                v-model="form.leader"
                placeholder="请输入领办领导"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系人" prop="contactPerson">
              <el-input
                v-model="form.contactPerson"
                placeholder="请输入联系人"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系方式" prop="phone">
              <el-input
                v-model="form.phone"
                placeholder="请输入联系方式"
                maxlength="8"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div>
        <el-form-item class="list-table" label="" prop="detailLists" :rules="listRules">
          <div class="import">
            <el-button type="primary" @click="lookHistory">历史数据</el-button>
          </div>
          <VilliageListTable
            v-if="showTable"
            :form="form"
            :data="form.detailLists"
            :hiddenEdit="true"
            :hiddenDetail="true"
          />
        </el-form-item>
      </div>
    </el-form>
    <div>
      <el-button @click="$router.back()">返回</el-button>
      <el-button type="primary" @click="onSubmit">提交</el-button>
    </div>
    <el-dialog
      title="详情"
      :visible.sync="dialogVisible"
      width="90%"
    >
      <VilliageListTable
        :data="historyList"
        :hiddenEdit="true"
        :hiddenDetail="true"
        :history="true"
        key="history"
      />
    </el-dialog>
  </div>
</template>

<script>
import VilliageListTable from "../Components/VilliageListTable";

import rule from "@/mixins/rule";
import {addData, getDetail, getHistory} from "@/api2/progressSubmission";
const tableList = (rule, value, callback) => {
  console.log(value);
  if (value.length) {
    const res = value.every((i) => {
      return i.planGovInvestment !== null && i.planSocialInvestment !== null && i.completeGovInvestmentNow !== null && i.completeSocialInvestmentNow !== null && i.completeTotalInvestmentNow !== null
    });
    if (res) {
      const notNum = value.some((i) => {
        return isNaN(i.planGovInvestment) || isNaN(i.planSocialInvestment)  && isNaN(i.completeGovInvestmentNow)  && isNaN(i.completeSocialInvestmentNow)  && isNaN(i.completeTotalInvestmentNow)
      });
      if (notNum) {
        callback(new Error("请填写的数据都为数字"));
      } else {
        callback();
      }

    } else {
      callback(new Error("请填写完数据"));
    }
  } else {
    callback();

  }
};
export default {
  mixins: [rule],
  components: {
    VilliageListTable,
  },
  data() {
    return {
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
      },
      historyList: [],
      type: "add",
      firstTime: false, // 是否是第一次填报进度
      dialogVisible: false,
      importDialogVisible: false,
      editIndex: "",
      editProjectForm: false, // 编辑表格
      listRules: { required: true, validator: tableList, trigger: "blur" },
    };
  },
  beforeMount() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      getDetail({ id: this.$route.query.id }).then((res) => {
        this.form = res;
        this.form.detailLists = this.form.detailLists.map((i) => {
          return {
            ...i,
            completeTotalInvestmentNow: null,
            completeGovInvestmentNow: null,
            completeSocialInvestmentNow: null,
          };
        });
        this.firstTime = this.form.detailLists.every(i => {
          return i.planGovInvestment === null;
        });
        this.showTable = true;
      });
    },
    // 添加 项目
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          console.log(valid);
          console.log(this.form);
          let time = 0;
          this.form.detailLists.forEach(async (item) => {
            let data = {};
            if (this.firstTime) {
              data = {
                completeGovInvestment: Number(item.completeGovInvestmentNow),
                completeSocialInvestment: Number(item.completeSocialInvestmentNow),
                completeTotalInvestment: Number(item.completeTotalInvestmentNow),
                planGovInvestment: Number(item.planGovInvestment),
                planSocialInvestment: Number(item.planSocialInvestment),
                projectId: Number(item.projectId),
                rate: item.completeTotalInvestmentNow / item.investmentAmount,
              };
            } else {
              data = {
                completeGovInvestment: Number(item.completeGovInvestmentNow),
                completeSocialInvestment: Number(item.completeSocialInvestmentNow),
                completeTotalInvestment: Number(item.completeTotalInvestmentNow),
                projectId: Number(item.projectId),
                rate: item.completeTotalInvestmentNow / item.investmentAmount,
              };
            }
            await addData(data);
            ++time;
            if (time === this.form.detailLists.length) {
              this.$notify.success({
                title: '进度上报成功！',
              });
              this.$router.back();
              return;
            }
          });
        }
      });
    },
    async lookHistory() {

      const res = await getHistory({ id: this.$route.query.id })
      this.historyList = res;
      this.dialogVisible = true;
    }
  }
}
</script>

<style lang="scss" scoped>
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
