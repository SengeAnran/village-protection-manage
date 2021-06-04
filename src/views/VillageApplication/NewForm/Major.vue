<template>
  <div>
    <el-form
      ref="form"
      class="form"
      label-position="top"
      :model="form"
      label-width="80px"
    >
      <h3 class="text-gray-800 text-2xl mb-8">重点村申报</h3>

      <el-form-item label="村庄地址" prop="villageId" :rules="rule.select">
        <VillageAddressSelect
          v-model="form.villageId"
          @change="changeAddress"
        />
      </el-form-item>

      <h4 class="block-tit">重点村古建筑调查表</h4>
      <VillageBaseForm class="input-item-wrp" :form="form" />

      <h4 class="block-tit">古建筑数量</h4>
      <div class="total-wrp"><span>总数：</span>1234个</div>
      <VillageHistoryBuildingForm class="input-item-wrp" :form="form" />

      <h4 class="block-tit">推荐村简介</h4>

      <VillageUpgradeForm :form="form" />
    </el-form>

    <div>
      <el-button @click="$router.back()">取消</el-button>
      <el-button type="primary" @click="validateForm">提交</el-button>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import rule from "@/mixins/rule";
import VillageAddressSelect from "../Components/VillageAddressSelect";
import VillageBaseForm from "../Components/VillageBaseForm";
import VillageHistoryBuildingForm from "../Components/VillageHistoryBuildingForm";
import VillageUpgradeForm from "../Components/VillageUpgradeForm";

import { VILLAGE_LIST_ROUTER_NAME } from "../constants";

export default {
  mixins: [rule],
  components: {
    VillageAddressSelect,
    VillageBaseForm,
    VillageHistoryBuildingForm,
    VillageUpgradeForm,
  },
  data() {
    return {
      form: {
        villageId: "", //村庄地址
        population: "", // 人口数量
        income: "", //当年集体收入（万元）
        villageAge: "", //古建筑村落年代
        isFamous: "", //是否历史文化名村
        isGeneral: "", //是否一般村

        houseNum: "", //古民宅数量
        hallNum: "", //古祠堂数量
        stageNum: "", //古戏台数量
        archNum: "", //古牌坊数量
        bridgeNum: "", //古桥数量
        roadNum: "", //古道数量
        canalNum: "", //古渠数量
        barrageNum: "", //古堰坝数量
        wellNum: "", //古井泉数量
        streetNum: "", // 古街巷数量
        guildNum: "", //古会馆数量
        castleNum: "", //古城堡数量
        towerNum: "", //古塔数量
        templeNum: "", //古寺数量
        modernBuildingNum: "", //近现代建筑数量
        featureNum: "", //特色建材数量

        introduction: "", //introduction
        villagePicturesArr: [], //图片数组
      },

      parentRouteName: VILLAGE_LIST_ROUTER_NAME[1002],
    };
  },

  methods: {
    ...mapMutations("villageMange", ["addApplyVillageList"]),
    validateForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          // this.$myConfirm({
          //   content: "是否确认提交",
          // }).then(() => {

          // });
          this.submit(this.form);
        } else {
          return false;
        }
      });
    },

    // 新增申报item
    submit(params) {
      this.addApplyVillageList(params);
      this.$router.replace({ name: this.parentRouteName });
    },

    // 选择村庄地址
    changeAddress(val) {
      const { village, parent } = val;
      this.form.villageName = village.areaName;
      this.form.address = parent.areaName;
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  max-width: 1600px;
  padding-left: 8px;
  .block-tit {
    margin-top: 14px;
    margin-bottom: 2px;
  }

  .input {
    width: 31%;
    flex-shrink: 0;
  }
  .total-wrp {
    color: #333333;
    & span {
      color: #606266;
      line-height: 40px;
      padding: 0 2px 0 0;
    }
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
}
</style>
