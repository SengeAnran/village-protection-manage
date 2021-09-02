<template>
  <div>
    <el-form
      ref="form"
      class="form"
      label-position="top"
      :model="form"
      label-width="80px"
    >
      <h3 class="text-gray-800 text-2xl mb-8">一般村申报</h3>
      <div class="mb-8">
        <el-form-item label="村庄地址" prop="villageId" :rules="rule.select">
          <VillageAddressSelect
            v-model="form.villageId"
            @change="changeAddress"
          />
        </el-form-item>
      </div>
      <h4 class="block-tit">一般村古建筑调查表</h4>
      <VillageBaseForm class="input-item-wrp" :form="form" />
      <div class="block-tit">
        古建筑数量（处）
        <div style="display: inline-block">
          <el-popover
            placement="top-start"
            title=""
            width="200"
            trigger="hover"
            content="“处”是指相对独立存在古建筑的数量单位，连为一体的几幢古建筑视为一处（如四合院就为一处），以下填报想总数与其中数之和相等，总数在 10 处以上。">
            <div slot="reference" style="display: inline-block;width: 0.8rem; height: 0.8rem" >
              <img src="../Components/img/u15.png" alt="">
            </div>
          </el-popover>
        </div>
      </div>
      <div class="total-wrp"><span>总数：</span>{{ total }} 个</div>
      <VillageHistoryBuildingForm class="input-item-wrp" :form="form" />
    </el-form>
    <div>
      <el-button @click="$emit('close')">取消</el-button>
      <el-button type="primary" @click="validateForm">提交</el-button>
    </div>
  </div>
</template>
<script>
import rule from "@/mixins/rule";
import VillageAddressSelect from "../Components/VillageAddressSelect";
import VillageBaseForm from "../Components/VillageBaseForm";
import VillageHistoryBuildingForm from "../Components/VillageHistoryBuildingForm";

import { VILLAGE_LIST_ROUTER_NAME, HISTORY_BUILDINGS } from "../constants";

export default {
  mixins: [rule],
  components: {
    VillageAddressSelect,
    VillageBaseForm,
    VillageHistoryBuildingForm,
  },
  props: {
    type: {
      type: String,
      default: "add",
    },
    data: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      form: {
        villageId: "", //村庄地址
        population: "", // 人口数量
        income: "", //当年集体收入（万元）
        villageAge: "", //古建筑村落年代
        isFamous: "", //是否历史文化名村  0：否，1：省级，2：国家级
        isGeneral: "", //是否一般村
        resPopulation: "", // 当年常住人口
        isTradition: "", // 是否传统村 0：否，1：省级，2：国家级

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
        other: "", //其他
      },

      parentRouteName: VILLAGE_LIST_ROUTER_NAME[1001],
    };
  },
  computed: {
    total() {
      return HISTORY_BUILDINGS.reduce((pre, next) => {
        return pre + this.form[next.value];
      }, 0);
    },
  },
  watch: {
    type(val) {
      if (val === "edit") {
        this.form = this.data;
      }
    },
  },
  mounted() {
    if (this.type === "edit") {
      this.form = this.data;
    }
  },
  methods: {
    validateForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.submit(this.form);
        } else {
          return false;
        }
      });
    },

    // 新增申报item
    submit(params) {
      this.$emit("add", params);
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
}
</style>
