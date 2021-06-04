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
          <el-select
            class="input"
            v-model="form.villageId"
            placeholder="请选择镇/村"
          >
            <el-option
              v-for="item in villageInfoOpt"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <h4 class="block-tit">重点村古建筑调查表</h4>
      <div class="input-item-wrp">
        <el-form-item
          label="当年户籍人口（人）"
          prop="population"
          :rules="rule.input"
        >
          <el-input
            v-model.number="form.population"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="当年村集体经济收入（万元）"
          prop="income"
          :rules="rule.input"
        >
          <el-input
            v-model.number="form.income"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="古建筑村落年代"
          prop="villageAge"
          :rules="rule.select"
        >
          <el-select
            style="width: 100%"
            v-model="form.villageAge"
            placeholder="请选择"
          >
            <el-option
              v-for="item in villageAgeOpt"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否历史文化名村">
          <el-radio v-model="form.isFamous" :label="true">是</el-radio>
          <el-radio v-model="form.isFamous" :label="false">否</el-radio>
        </el-form-item>
        <el-form-item label="是否一般村">
          <el-radio v-model="form.isGeneral" :label="true">是</el-radio>
          <el-radio v-model="form.isGeneral" :label="false">否</el-radio>
        </el-form-item>
      </div>
      <h4 class="block-tit">古建筑数量</h4>
      <div class="total-wrp">
        <span>总数：</span>{{ totalHistoryBuilding }}个
      </div>
      <div class="input-item-wrp">
        <el-form-item
          :label="item.label"
          v-for="(item, i) in historyBuildings"
          :key="i"
        >
          <el-input
            v-model.number="form[item.value]"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
      </div>
      <h4 class="block-tit">推荐村简介</h4>
      <div>
        <el-form-item label="推荐村简介">
          <el-input
            style="width: 42%"
            type="textarea"
            :rows="5"
            placeholder="请输入"
            maxlength="500"
            show-word-limit
            v-model="textarea"
          >
          </el-input>
        </el-form-item>
      </div>
    </el-form>
    <div>
      <el-button @click="$router.back()">取消</el-button>
      <el-button type="primary" @click="validateForm">提交</el-button>
    </div>
  </div>
</template>
<script>
import { getVillageInfo } from "@/api/infoSetting";
import { mapMutations } from "vuex";
import rule from "@/mixins/rule";
const HISTORY_BUILDINGS = [
  { label: "古民宅", value: "houseNum" },
  { label: "古祠堂", value: "hallNum" },
  { label: "古戏台", value: "stageNum" },
  { label: "古牌坊", value: "archNum" },
  { label: "古桥", value: "bridgeNum" },
  { label: "古道", value: "roadNum" },
  { label: "古渠", value: "canalNum" },
  { label: "古堰坝", value: "barrageNum" },
  { label: "古井泉", value: "wellNum" },
  { label: "古街巷", value: "streetNum" },
  { label: "古会馆", value: "guildNum" },
  { label: "古城堡", value: "castleNum" },
  { label: "古塔", value: "towerNum" },
  { label: "古寺庙", value: "templeNum" },
  { label: "近现代建筑", value: "modernBuildingNum" },
  { label: "特色建材", value: "featureNum" },
];

const VILLAGE_AGE = [
  "明代以前",
  "明代",
  "清代",
  "1912年-1949年",
  "1950年-1980年",
];

export default {
  mixins: [rule],
  props: {
    title: {
      type: String,
      required: true,
    },
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
      },
      input: "",

      villageInfoOpt: [],
    };
  },
  computed: {
    totalHistoryBuilding() {
      return HISTORY_BUILDINGS.reduce((pre, next) => {
        return pre + Number(this.form[next.value]) || 0;
      }, 0);
    },
  },
  created() {
    this.historyBuildings = HISTORY_BUILDINGS;
    this.villageAgeOpt = this._arrToSelectOptions(VILLAGE_AGE);

    this.initAllVillageInfo();
  },
  methods: {
    ...mapMutations("villageMange", ["addApplyVillageList"]),
    initAllVillageInfo() {
      getVillageInfo().then((res) => {
        this.villageInfoOpt = res.map((item) => {
          return {
            label: item.address,
            value: item.id,
          };
        });
      });
    },

    validateForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.$myConfirm({
            content: "是否确认发布",
          }).then(() => {
            this.submit(this.form);
          });
        } else {
          return false;
        }
      });
    },

    // 新增申报item
    submit(params) {
      this.addApplyVillageList(params);
    },
    /**
     * @desc arr 转化为 selected 选项
     */
    _arrToSelectOptions(arr) {
      return arr.map((item) => {
        return {
          label: item,
          value: item,
        };
      });
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
      &:nth-child(3n) {
        margin-right: 3%;
      }
      .el-form-item__label {
        font-size: 16px;
      }
    }
  }
}
</style>
