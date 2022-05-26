<template>
  <div class="block">
    <el-form
      ref="form"
      class="form"
      label-position="top"
      :model="form"
      label-width="80px"
    >
      <h3 class="text-gray-800 text-2xl mb-8">新建申报</h3>
      <div class="detail-top">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="创建村/片区名称" prop="villageId">
              <el-input
                v-model="form.countrySortNum"
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
        <el-form-item class="list-table" label="" prop="projects" :rules="listRules">
          <div class="import">
            <el-button type="primary" @click="dialogVisible = true">历史数据</el-button>
          </div>

          <VilliageListTable
            :data="form.projects"
            :hiddenEdit="true"
            :hiddenDetail="true"
            @remove="removeListItem"
            @editForm="editListItem"
            @moveUp="moveUpItem"
            @moveDown="moveDownItem"
          />
        </el-form-item>
      </div>
    </el-form>
    <div>
      <el-button @click="$router.back()">返回</el-button>
      <el-button type="primary" @click="validateForm">提交</el-button>
    </div>
    <el-dialog
      title="详情"
      :visible.sync="dialogVisible"
      width="90%"
    >
      <VilliageListTable
        :data="form.projects"
        :hiddenEdit="true"
        :hiddenDetail="true"
        @remove="removeListItem"
        @editForm="editListItem"
        @moveUp="moveUpItem"
        @moveDown="moveDownItem"
      />
    </el-dialog>
  </div>
</template>

<script>
import VilliageListTable from "../Components/VilliageListTable";

import rule from "@/mixins/rule";
const tableList = (rule, value, callback) => {
  if (value.length) {
    callback();
  } else {
    callback(new Error("请添加项目"));
  }
};
export default {
  mixins: [rule],
  components: {
    VilliageListTable,
  },
  data() {
    return {
      form: {
        type: 1, // 申报类型
        annexFiles: [], // 附件
        villageName: "", //村庄地址
        town: "", //村庄地址
        villageId: "", //村庄地址
        countrySortNum: "", //推荐次序
        declarationBatch: "", //申报批次
        startTime: "", //创建周期 开始
        endTime: "", //创建周期 结束
        leader: "", //领办领导
        construct: "", //建设单位
        contactPerson: "", // 联系人
        phone: "", //联系方式
        huNum: "", //户籍人口数（万人）
        personNum: "", //常住人口数（万人）
        investNum: "", //计划总投资（万元）
        incomeNum: "", //村级集体经济年经营性收入（万元）

        villageProperty: [], //村庄属性（可多选）

        basicText: "", //基本情况
        meetingText: "", //村民代表会议（村民会议）关于未来乡村建设方案决议情况
        townText: "", //乡、镇（街道）人民政府（办事处）意见
        departmentText: "", //县（市、区）部门审核意见
        governmentText: "", //县（市、区）人民政府意见
        projectFilingPerson: "", //填表人
        projectFilingPhone: "", //联系电话
        projectFilingAudit: "", //审核人
        projects: [], //项目列表
      },
      type: "add",
      dialogVisible: false,
      importDialogVisible: false,
      projectForm: { // 项目表单
        projectName: "", // 项目名称
        constructUnit: "", // 建设单位
        constructAddress: "", // 建设地点
        constructDetail: "", // 建设内容和规模
        schedule: "", // 进度安排
        landUse: "", // 用地情况
        investmentAmount: "", // 投资额（万元）
        arrangements: "", // 运行维护管理安排
        remark: "", // 备注
      },
      editIndex: "",
      editProjectForm: false, // 编辑表格
      listRules: { required: true, validator: tableList, trigger: "blur" },
    };
  },
  mounted() {
  },
  methods: {
    getDetail() {
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
