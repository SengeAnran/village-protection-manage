<template>
  <div class="block">
    <RouterBack>查看进度</RouterBack>
    <el-form
      ref="form"
      class="form"
      label-position="top"
      :model="form"
      label-width="80px"
    >
      <h3 class="text-gray-800 text-2xl mb-8">项目基本信息</h3>
      <div class="input-item-wrp">
        <el-form-item label="项目年度">
          <p>古建筑数量（幢）</p>
        </el-form-item>
        <el-form-item label="项目所在地">
          <p>古建筑数量（幢）</p>
        </el-form-item>
        <el-form-item label="总投资：">
          <p>古建筑数量（幢）</p>
        </el-form-item>
        <el-form-item label="申报日期：">
          <p>古建筑数量（幢）</p>
        </el-form-item>
      </div>
      <h4 class="block-tit">基本情况</h4>
      <div class="input-item-wrp">
        <el-form-item label="在建省重点村、一般村（个）">
          <p>古建筑数量（幢）</p>
        </el-form-item>
        <el-form-item label="古建筑数量（幢）">
          <p>古建筑数量（幢）</p>
        </el-form-item>
      </div>
      <h4 class="block-tit">当季度进展情况</h4>
      <div class="input-item-wrp">
        <el-form-item label="村内古道修复改造（公里）">
          <p>古建筑数量（幢）</p>
        </el-form-item>
        <el-form-item label="新增利用业态项目（个）">
          <p>古建筑数量（幢）</p>
        </el-form-item>
      </div>
      <h4 class="block-tit">古建筑修复项目</h4>
      <div class="input-item-wrp">
        <el-form-item label="顶瓦修补面积（㎡）">
          <p>古建筑数量（幢）</p>
        </el-form-item>
        <el-form-item label="墙体加固面积（㎡）">
          <p>古建筑数量（幢）</p>
        </el-form-item>
        <el-form-item label="立面改造面积（㎡）">
          <p>古建筑数量（幢）</p>
        </el-form-item>
        <el-form-item label="构建修复（个）">
          <p>古建筑数量（幢）</p>
        </el-form-item>
        <el-form-item label="异地迁入面积（㎡）">
          <p>古建筑数量（幢）</p>
        </el-form-item>
      </div>
      <h4 class="block-tit">与历史风貌有冲突的建(构)物整修改造项目</h4>
      <div class="input-item-wrp">
        <el-form-item label="立面改造面积（㎡）">
          <p>古建筑数量（幢）</p>
        </el-form-item>
        <el-form-item label="结构降层面积（㎡）">
          <p>古建筑数量（幢）</p>
        </el-form-item>
        <el-form-item label="整体拆除面积（㎡）">
          <p>古建筑数量（幢）</p>
        </el-form-item>
      </div>
      <h4 class="block-tit">搬迁安置区建设</h4>
      <div class="input-item-wrp">
        <el-form-item label="用地面积（亩）">
          <p>古建筑数量（幢）</p>
        </el-form-item>
        <el-form-item label="安置户数（户）">
          <p>古建筑数量（幢）</p>
        </el-form-item>
      </div>
      <h4 class="block-tit">建设资金拨付进度</h4>
      <div class="input-item-wrp">
        <el-form-item label="省级资金（万元）">
          <p>古建筑数量（幢）</p>
        </el-form-item>
        <el-form-item label="市级资金（万元）">
          <p>古建筑数量（幢）</p>
        </el-form-item>
        <el-form-item label="乡镇、村集体资金（万元）">
          <p>古建筑数量（幢）</p>
        </el-form-item>
        <el-form-item label="乡镇、村集体资金（万元）">
          <p>古建筑数量（幢）</p>
        </el-form-item>
      </div>

      <div class="total-wrp"><span>合计（万元）：</span>{{ "- -" }}</div>
    </el-form>
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

  methods: {},
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
      color: #999;
      font-size: 16px;
    }
    p {
      font-size: 16px;
      color: #333;
      line-height: 22px;
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
