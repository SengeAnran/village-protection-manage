<template>
  <div class="block">
    <RouterBack>查看进度</RouterBack>
    <el-form
      style="padding-left: 14px"
      ref="form"
      class="form"
      label-position="top"
      :model="form"
      label-width="80px"
    >
      <h4 class="block-tit">项目基本信息</h4>
      <div class="input-item-wrp">
        <el-form-item label="项目年度">
          <p>{{ form.years }}</p>
        </el-form-item>
        <el-form-item label="项目所在地">
          <p>{{ form.address }}</p>
        </el-form-item>
        <el-form-item label="总投资：">
          <p>{{ form.declareAmount }} 万元</p>
        </el-form-item>
        <el-form-item label="申报日期：">
          <p>{{ form.declareTime.slice(0, 10) }}</p>
        </el-form-item>
      </div>
      <h4 class="block-tit">基本情况</h4>
      <div class="input-item-wrp">
        <el-form-item label="在建省重点村、一般村（个）">
          <p>{{ form.villageNum }}</p>
        </el-form-item>
        <el-form-item label="古建筑数量（幢）">
          <p>{{ form.oldBuildingNum }}</p>
        </el-form-item>
      </div>
      <h4 class="block-tit">当季度进展情况</h4>
      <div class="input-item-wrp">
        <el-form-item label="村内古道修复改造（公里）">
          <p>{{ form.roadRepairNum }}</p>
        </el-form-item>
        <el-form-item label="新增利用业态项目（个）">
          <p>{{ form.addNum }}</p>
        </el-form-item>
      </div>
      <h4 class="block-tit">古建筑修复项目</h4>
      <div class="input-item-wrp">
        <el-form-item label="顶瓦修补面积（㎡）">
          <p>{{ form.tileRepairArea }}</p>
        </el-form-item>
        <el-form-item label="墙体加固面积（㎡）">
          <p>{{ form.wallRepairArea }}</p>
        </el-form-item>
        <el-form-item label="立面改造面积（㎡）">
          <p>{{ form.faceReformArea }}</p>
        </el-form-item>
        <el-form-item label="构建修复（个）">
          <p>{{ form.componentRepairQuantity }}</p>
        </el-form-item>
        <el-form-item label="异地迁入面积（㎡）">
          <p>{{ form.moveInArea }}</p>
        </el-form-item>
      </div>
      <h4 class="block-tit">与历史风貌有冲突的建(构)物整修改造项目</h4>
      <div class="input-item-wrp">
        <el-form-item label="立面改造面积（㎡）">
          <p>{{ form.clashFaceReformArea }}</p>
        </el-form-item>
        <el-form-item label="结构降层面积（㎡）">
          <p>{{ form.structureArea }}</p>
        </el-form-item>
        <el-form-item label="整体拆除面积（㎡）">
          <p>{{ form.demolishArea }}</p>
        </el-form-item>
      </div>
      <h4 class="block-tit">搬迁安置区建设</h4>
      <div class="input-item-wrp">
        <el-form-item label="用地面积（亩）">
          <p>{{ form.landUseArea }}</p>
        </el-form-item>
        <el-form-item label="安置户数（户）">
          <p>{{ form.placementFamilyNum }}</p>
        </el-form-item>
      </div>
      <h4 class="block-tit">建设资金拨付进度</h4>
      <div class="input-item-wrp">
        <el-form-item label="省级资金（万元）">
          <p>{{ form.provinceFee }}</p>
        </el-form-item>
        <el-form-item label="市级资金（万元）">
          <p>{{ form.cityFee }}</p>
        </el-form-item>
        <el-form-item label="乡镇、村集体资金（万元）">
          <p>{{ form.countryFee }}</p>
        </el-form-item>
        <el-form-item label="社会资金（万元）">
          <p>{{ form.communityFee }}</p>
        </el-form-item>
      </div>

      <div class="input-item-wrp">
        <el-form-item label="合计（万元）：">
          <p>{{ total }}</p>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<script>
import rule from "@/mixins/rule";
import { getScheduleDetail } from "@/api/scheduleManage";
export default {
  mixins: [rule],
  data() {
    return {
      projectInfo: [],
      form: {
        years: "",
        projectId: "",
        address: "",

        declareAmount: "", // 总投资金（万元）
        declareTime: "", // 申报日期

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
      return (
        Number(provinceFee) +
        Number(cityFee) +
        Number(countryFee) +
        Number(communityFee)
      );
    },
  },
  created() {
    const id = this.$route.query.id;
    if (id) this.getDetail(id);
  },
  methods: {
    getDetail(id) {
      getScheduleDetail({ id }).then((res) => {
        Object.keys(this.form).forEach((key) => {
          this.form[key] = res[key];
        });
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
      color: #999;
      font-size: 16px;
    }
    p {
      font-size: 16px;
      color: #333;
      line-height: 22px;
      font-family: PingFangSC-Regular, PingFang SC;
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
    color: #999;
  }
}
</style>
