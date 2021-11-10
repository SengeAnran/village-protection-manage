<template>
  <div class="block">
    <RouterBack>进度填写</RouterBack>
    <el-form
      style="padding-left: 14px"
      ref="form"
      class="form"
      label-position="top"
      :model="form"
      label-width="80px"
    >
      <h3 class="text-gray-800 text-2xl mb-8">项目基本信息</h3>
      <div class="input-item-wrp">
        <el-form-item label="项目年度" prop="year" :rules="rule.select">
          <el-select
            v-model="form.year"
            placeholder="请选择"
            @change="changeYear"
          >
            <el-option
              v-for="item in yearsOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目所在地" prop="projectId" :rules="rule.select">
          <el-select
            v-model="form.projectId"
            placeholder="请选择"
            @change="changeAddress"
          >
            <el-option
              v-for="item in projectInfo"
              :key="item.id"
              :label="item.villageName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="input-item-wrp" v-if="declareTime">
        <el-form-item label="总投资">
          <p>{{ declareAmount }} 万元</p>
        </el-form-item>
        <el-form-item label="申报日期">
          <p>{{ declareTime.slice(0, 10) }}</p>
        </el-form-item>
      </div>
      <h4 class="block-tit">基本情况</h4>
      <div class="input-item-wrp">
        <el-form-item
          label="在建省重点村、一般村（个）"
          prop="villageNum"
          :rules="rule.input"
        >
          <el-input
            v-model="form.villageNum"
            placeholder="请输入数字，如：10"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="古建筑数量（幢）"
          prop="oldBuildingNum"
          :rules="rule.input"
        >
          <el-input
            v-model="form.oldBuildingNum"
            placeholder="请输入数字，如：10"
          ></el-input>
        </el-form-item>
      </div>
      <h4 class="block-tit">当季度进展情况</h4>
      <div class="input-item-wrp">
        <el-form-item
          label="村内古道修复改造（公里）"
          prop="roadRepairNum"
          :rules="rule.input"
        >
          <el-input
            v-model="form.roadRepairNum"
            placeholder="请输入数字，如：10"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="新增利用业态项目（个）"
          prop="addNum"
          :rules="rule.input"
        >
          <el-input
            v-model="form.addNum"
            placeholder="请输入数字，如：10"
          ></el-input>
        </el-form-item>
      </div>
      <h4 class="block-tit">古建筑修复项目</h4>
      <div class="input-item-wrp">
        <el-form-item
          label="顶瓦修补面积（㎡）"
          prop="tileRepairArea"
          :rules="rule.input"
        >
          <el-input
            v-model="form.tileRepairArea"
            placeholder="请输入数字，如：10"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="墙体加固面积（㎡）"
          prop="wallRepairArea"
          :rules="rule.input"
        >
          <el-input
            v-model="form.wallRepairArea"
            placeholder="请输入数字，如：10"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="立面改造面积（㎡）"
          prop="faceReformArea"
          :rules="rule.input"
        >
          <el-input
            v-model="form.faceReformArea"
            placeholder="请输入数字，如：10"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="构建修复（个）"
          prop="componentRepairQuantity"
          :rules="rule.input"
        >
          <el-input
            v-model="form.componentRepairQuantity"
            placeholder="请输入数字，如：10"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="异地迁入面积（㎡）"
          prop="moveInArea"
          :rules="rule.input"
        >
          <el-input
            v-model="form.moveInArea"
            placeholder="请输入数字，如：10"
          ></el-input>
        </el-form-item>
      </div>
      <h4 class="block-tit">与历史风貌有冲突的建(构)物整修改造项目</h4>
      <div class="input-item-wrp">
        <el-form-item
          label="立面改造面积（㎡）"
          prop="clashFaceReformArea"
          :rules="rule.input"
        >
          <el-input
            v-model="form.clashFaceReformArea"
            placeholder="请输入数字，如：10"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="结构降层面积（㎡）"
          prop="structureArea"
          :rules="rule.input"
        >
          <el-input
            v-model="form.structureArea"
            placeholder="请输入数字，如：10"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="整体拆除面积（㎡）"
          prop="demolishArea"
          :rules="rule.input"
        >
          <el-input
            v-model="form.demolishArea"
            placeholder="请输入数字，如：10"
          ></el-input>
        </el-form-item>
      </div>
      <h4 class="block-tit">搬迁安置区建设</h4>
      <div class="input-item-wrp">
        <el-form-item
          label="用地面积（亩）"
          prop="landUseArea"
          :rules="rule.input"
        >
          <el-input
            v-model="form.landUseArea"
            placeholder="请输入数字，如：10"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="安置户数（户）"
          prop="placementFamilyNum"
          :rules="rule.input"
        >
          <el-input
            v-model="form.placementFamilyNum"
            placeholder="请输入数字，如：10"
          ></el-input>
        </el-form-item>
      </div>
      <h4 class="block-tit">建设资金拨付进度</h4>
      <div class="input-item-wrp">
        <el-form-item
          label="省级资金（万元）"
          prop="provinceFee"
          :rules="rule.input"
        >
          <el-input
            v-model="form.provinceFee"
            placeholder="请输入数字，如：10"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="市级资金（万元）"
          prop="cityFee"
          :rules="rule.input"
        >
          <el-input
            v-model="form.cityFee"
            placeholder="请输入数字，如：10"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="乡镇、村集体资金（万元）"
          prop="countryFee"
          :rules="rule.input"
        >
          <el-input
            v-model="form.countryFee"
            placeholder="请输入数字，如：10"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="社会资金（万元）"
          prop="communityFee"
          :rules="rule.input"
        >
          <el-input
            v-model="form.communityFee"
            placeholder="请输入数字，如：10"
          ></el-input>
        </el-form-item>
      </div>

      <div class="total-wrp">
        <span>合计（万元）：</span>{{ total || "--" }}
      </div>
    </el-form>
    <div>
      <el-button @click="$router.back()">取消</el-button>
      <el-button type="primary" @click="validateForm">提交</el-button>
    </div>
  </div>
</template>
<script>
import rule from "@/mixins/rule";
import {
  getProjectProgressYears,
  getProjectProgressAddress,
  getProjectInfo,
  addProjectProgress,
} from "@/api/scheduleManage";
export default {
  mixins: [rule],
  data() {
    return {
      projectInfo: [],
      yearsOption: [],

      declareAmount: "", // 总投资
      declareTime: "", // 申报日期
      form: {
        year: "",
        projectId: "",

        roadRepairNum: "", //村内古道修复改造（公里）
        addNum: "", //新增利用业态项目（个）
        tileRepairArea: "", //顶瓦修补面积（㎡）
        wallRepairArea: "", //墙体加固面积（㎡）
        faceReformArea: "", //立面改造面积（㎡
        componentRepairQuantity: "", //构建修复（个）
        moveInArea: "", //异地迁入面积

        clashFaceReformArea: "", // 有冲突的立面改造面积（㎡)
        structureArea: "", //结构降层面积
        demolishArea: "", //整体拆除建筑面积（㎡）

        landUseArea: "", //用地面积
        placementFamilyNum: "", //安置户数
        provinceFee: "", // 省级资金（万元）
        cityFee: "", // 市级资金（万元）
        countryFee: "", // 乡镇、村集体资金（万元）
        communityFee: "", //社会资金（万元）

        villageNum: "", // 在建省重点村、一般村（个）
        oldBuildingNum: "", // 古建筑数量
      },
    };
  },
  computed: {
    total() {
      const { provinceFee, cityFee, countryFee, communityFee } = this.form;
      let sq1,sq2,sq3,sq4,m;
      try {
        sq1 = provinceFee.toString().split(".")[1].length;
      } catch (e) {
        sq1 = 0;
      }
      try {
        sq2 = cityFee.toString().split(".")[1].length;
      } catch (e) {
        sq2 = 0;
      }
      try {
        sq3= countryFee.toString().split(".")[1].length;
      } catch (e) {
        sq3 = 0;
      }
      try {
        sq4 = communityFee.toString().split(".")[1].length;
      } catch (e) {
        sq4 = 0;
      }
      m = Math.pow(10, Math.max(sq1, sq2, sq3, sq4))
      return (
        (Number(provinceFee) * m +
        Number(cityFee) * m +
        Number(countryFee) * m +
        Number(communityFee) * m) /m
      );
    },
  },
  created() {
    this.getCanReportYears();
  },
  methods: {
    changeYear(val) {
      this.getCanReportAddress(val);
    },
    changeAddress() {
      this.getBaseInfo();
    },

    validateForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.$myConfirm({
            content: "是否确认提交",
          }).then(() => {
            this.submit(this.form);
          });
        } else {
          return false;
        }
      });
    },
    submit(params) {
      addProjectProgress(params).then(() => {
        this.$notify.success("上报成功");
        this.$router.replace({ name: "ScheduleReportList" });
      });
    },

    // 可申报年度
    getCanReportYears() {
      getProjectProgressYears().then((res) => {
        this.yearsOption = res.map((item) => {
          return {
            label: item,
            value: item,
          };
        });
      });
    },
    // 根据年度获取可申报地址
    getCanReportAddress(year) {
      getProjectProgressAddress({ years: year }).then((res) => {
        this.projectInfo = res;
      });
    },
    // 获取项目基本信息
    getBaseInfo() {
      getProjectInfo({ id: this.form.projectId }).then((res) => {
        this.declareAmount = res.declareAmount;
        this.declareTime = res.declareTime;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.block-tit {
  font-size: 18px;
  margin: 17px 0 10px;
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
    p {
      color: #333;
      font-size: 16px;
      padding-left: 12px;
    }
  }
  ::v-deep .el-date-editor.el-input__inner {
    width: 100%;
  }
  ::v-deep .el-select {
    width: 100%;
  }
}
.total-wrp {
  margin: 17px 0 37px;
  font-size: 16px;
  color: #333333;
  & span {
    color: #666666;
  }
}
</style>
