<template>
  <div class="block">
    <RouterBack>进度填写</RouterBack>
    <el-form
      ref="form"
      class="form"
      label-position="top"
      :model="form"
      label-width="80px"
    >
      <h3 class="text-gray-800 text-2xl mb-8">项目基本信息</h3>
      <div class="input-item-wrp">
        <el-form-item label="项目年度" :rules="rule.select">
          <el-date-picker v-model="form.year" type="year" placeholder="选择年">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="项目所在地" :rules="rule.select">
          <el-select v-model="form.projectId" placeholder="请选择">
            <el-option
              v-for="item in projectInfo"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <h4 class="block-tit">基本情况</h4>
      <div class="input-item-wrp">
        <el-form-item label="在建省重点村、一般村（个）" :rules="rule.input">
          <el-input
            v-model="form.villageNum"
            placeholder="请输入数字，如：10"
          ></el-input>
        </el-form-item>
        <el-form-item label="古建筑数量（幢）" :rules="rule.input">
          <el-input
            v-model="form.oldBuildingNum"
            placeholder="请输入数字，如：10"
          ></el-input>
        </el-form-item>
      </div>
      <h4 class="block-tit">当季度进展情况</h4>
      <div class="input-item-wrp">
        <el-form-item label="村内古道修复改造（公里）" :rules="rule.input">
          <el-input
            v-model="form.roadRepairNum"
            placeholder="请输入数字，如：10"
          ></el-input>
        </el-form-item>
        <el-form-item label="新增利用业态项目（个）" :rules="rule.input">
          <el-input
            v-model="form.addNum"
            placeholder="请输入数字，如：10"
          ></el-input>
        </el-form-item>
      </div>
      <h4 class="block-tit">古建筑修复项目</h4>
      <div class="input-item-wrp">
        <el-form-item label="顶瓦修补面积（㎡）" :rules="rule.input">
          <el-input
            v-model="form.tileRepairArea"
            placeholder="请输入数字，如：10"
          ></el-input>
        </el-form-item>
        <el-form-item label="墙体加固面积（㎡）" :rules="rule.input">
          <el-input
            v-model="form.wallRepairArea"
            placeholder="请输入数字，如：10"
          ></el-input>
        </el-form-item>
        <el-form-item label="立面改造面积（㎡）" :rules="rule.input">
          <el-input
            v-model="form.faceReformArea"
            placeholder="请输入数字，如：10"
          ></el-input>
        </el-form-item>
        <el-form-item label="构建修复（个）" :rules="rule.input">
          <el-input
            v-model="form.componentRepairNum"
            placeholder="请输入数字，如：10"
          ></el-input>
        </el-form-item>
        <el-form-item label="异地迁入面积（㎡）" :rules="rule.input">
          <el-input
            v-model="form.moveInArea"
            placeholder="请输入数字，如：10"
          ></el-input>
        </el-form-item>
      </div>
      <h4 class="block-tit">与历史风貌有冲突的建(构)物整修改造项目</h4>
      <div class="input-item-wrp">
        <el-form-item label="立面改造面积（㎡）" :rules="rule.input">
          <el-input
            v-model="form.clashFaceReformArea"
            placeholder="请输入数字，如：10"
          ></el-input>
        </el-form-item>
        <el-form-item label="结构降层面积（㎡）" :rules="rule.input">
          <el-input
            v-model="form.structureArea"
            placeholder="请输入数字，如：10"
          ></el-input>
        </el-form-item>
        <el-form-item label="整体拆除面积（㎡）" :rules="rule.input">
          <el-input
            v-model="form.demolishArea"
            placeholder="请输入数字，如：10"
          ></el-input>
        </el-form-item>
      </div>
      <h4 class="block-tit">搬迁安置区建设</h4>
      <div class="input-item-wrp">
        <el-form-item label="用地面积（亩）" :rules="rule.input">
          <el-input
            v-model="form.landUseArea"
            placeholder="请输入数字，如：10"
          ></el-input>
        </el-form-item>
        <el-form-item label="安置户数（户）" :rules="rule.input">
          <el-input
            v-model="form.placementFamilyNum"
            placeholder="请输入数字，如：10"
          ></el-input>
        </el-form-item>
      </div>
      <h4 class="block-tit">建设资金拨付进度</h4>
      <div class="input-item-wrp">
        <el-form-item label="省级资金（万元）" :rules="rule.input">
          <el-input
            v-model="form.provinceFee"
            placeholder="请输入数字，如：10"
          ></el-input>
        </el-form-item>
        <el-form-item label="市级资金（万元）" :rules="rule.input">
          <el-input
            v-model="form.cityFee"
            placeholder="请输入数字，如：10"
          ></el-input>
        </el-form-item>
        <el-form-item label="乡镇、村集体资金（万元）" :rules="rule.input">
          <el-input
            v-model="form.countryFee"
            placeholder="请输入数字，如：10"
          ></el-input>
        </el-form-item>
        <el-form-item label="乡镇、村集体资金（万元）" :rules="rule.input">
          <el-input
            v-model="form.communityFee"
            placeholder="请输入数字，如：10"
          ></el-input>
        </el-form-item>
      </div>

      <div class="total-wrp"><span>合计（万元）：</span>{{ "- -" }}</div>
    </el-form>
    <div>
      <el-button @click="$router.back()">取消</el-button>
      <el-button type="primary" @click="validateForm">提交</el-button>
    </div>
  </div>
</template>
<script>
import rule from "@/mixins/rule";
export default {
  mixins: [rule],
  data() {
    return {
      projectInfo: [],
      form: {
        year: "",
        projectId: "",

        roadRepairNum: "", //村内古道修复改造（公里）
        addNum: "", //新增利用业态项目（个）
        tileRepairArea: "", //顶瓦修补面积（㎡）
        wallRepairArea: "", //墙体加固面积（㎡）
        faceReformArea: "", //立面改造面积（㎡
        componentRepairNum: "", //构建修复（个）
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

  methods: {
    validateForm() {},
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
