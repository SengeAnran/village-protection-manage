<template>
  <div>
    <div class="clearfix export">
      <el-button class="export-button" @click="clickExport">导出</el-button>
    </div>
    <div class="block">
      <RouterBack>详情</RouterBack>
      <el-form
        style="padding-left: 14px"
        ref="form"
        class="form"
        label-position="top"
        :model="form"
        label-width="80px"
      >
        <el-form-item label="村庄地址" prop="villageId">
          <p class="content">{{ form.address }}{{ form.villageName }}</p>
        </el-form-item>

        <h4 class="block-tit">重点村古建筑调查表</h4>
        <div class="input-item-wrp">
          <el-form-item label="当年户籍人口（人）" prop="population">
            <p class="content">{{ form.population }}</p>
          </el-form-item>
          <el-form-item label="当年村集体经济收入（万元）" prop="income">
            <p class="content">{{ form.income }}</p>
          </el-form-item>
          <el-form-item label="古建筑村落年代" prop="villageAge">
            <p class="content">{{ form.villageAge }}</p>
          </el-form-item>
          <el-form-item label="当年常住人口（人）" prop="resPopulation">
            <p class="content">{{ form.resPopulation }}</p>
          </el-form-item>
          <el-form-item label="是否历史文化名村">
            <p class="content">{{ conversionLeve(form.isFamous) }}</p>
          </el-form-item>
          <el-form-item label="是否一般村">
            <p class="content">{{ (form.isGeneral && "是") || "否" }}</p>
          </el-form-item>
          <el-form-item label="是否传统村">
            <p class="content">{{ conversionLeve(form.isTradition)}}</p>
          </el-form-item>
        </div>

        <h4 class="block-tit">古建筑数量</h4>
        <div class="total-wrp"><span>总数：</span>{{ total }} 个</div>
        <div class="input-item-wrp">
          <el-form-item
            :label="item.label"
            v-for="(item, i) in historyBuildings"
            :key="i"
          >
            <p class="content">{{ form[item.value] }}</p>
          </el-form-item>
        </div>

        <div v-if="form.declareType !== 1001">
          <h4 class="block-tit">推荐村简介</h4>
          <div class="input-item-wrp">
            <el-form-item label="推荐村简介" prop="introduction">
              <p class="content">{{ form.introduction }}</p>
            </el-form-item>
          </div>
          <h4 class="block-tit">村庄图片</h4>
          <el-form-item label="村庄图片" prop="villagePicturesArr">
            <ViewImg :data="form.villagePicturesFiles" />
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import rule from "@/mixins/rule";
import { HISTORY_BUILDINGS } from "../constants";
import { getVillageItemDetail, getvillageDetailExport } from "@/api/villageManage";
import { downloadFile } from "@/utils/data"

export default {
  mixins: [rule],
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
        isFamous: "", //是否历史文化名村 0：否，1：省级，2：国家级
        // famousGrade: "", // 历史文化名村级别
        isGeneral: "", //是否一般村
        resPopulation: "", // 当年常住人口
        isTradition: "", // 是否传统村 0：否，1：省级，2：国家级
        // traditionGrade: "", // 传统村级别

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
        villagePicturesFiles: [], // 编辑表单时图片回显
      },

      total: 0,
    };
  },
  watch: {
    type(val) {
      if (val === "edit") {
        this.form = this.data;
      }
    },
  },
  created() {
    this.historyBuildings = HISTORY_BUILDINGS;
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const { id } = this.$route.query;
      if (!id) return;
      getVillageItemDetail({ id }).then((res) => {
        this.form = res;

        this.total = this.countTotal();
      });
    },
    async clickExport() {
      const { id } = this.$route.query;
      const res = await getvillageDetailExport({id})
      downloadFile(res,'古建筑村落调查表')
    },
    countTotal() {
      return HISTORY_BUILDINGS.reduce((pre, next) => {
        return pre + this.form[next.value];
      }, 0);
    },
    conversionLeve(index) {
      switch (index) {
        case 0 : return '否';
        case 1 : return '是，省级';
        case 2 : return '是，国家级';
        default: return ''
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.export {
  margin-bottom: 25px;
  .export-button{
    float: right;
  }
}
.form {
  max-width: 1600px;
  padding-left: 8px;
  .block-tit {
    margin-top: 18px;
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
    margin-bottom: 18px;

    ::v-deep .el-form-item {
      width: 31%;
      flex-shrink: 0;
      margin-right: 20px;
      .el-form-item__label {
        color: #999;
        font-size: 16px;
      }
    }
  }
  .content {
    font-size: 16px;
    color: #333333;
    line-height: 22px;
  }
}
</style>
