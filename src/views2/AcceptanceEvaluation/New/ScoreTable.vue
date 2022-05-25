<template>
  <div class="score-table-module">
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      :span-method="arraySpanMethod"
      header-row-class-name="table-header"
    >
      <el-table-column label="评价内容" prop="title" align="center"></el-table-column>
      <el-table-column
        v-for="(item, i) in TABLE_TITLE"
        :key="i"
        :prop="item.prop"
        :label="item.label"
        :width="item.width || ''"
        :align="item.align || 'center'"
      >
        <template slot-scope="{ row }">
          <!-- 县级用户 -->
          <div v-if="userInfo.roleId === 3">
            <span v-if="item.prop === 'countyScore' && row.title === '合计'">{{ form[row.countyScoreProp] }}</span>
            <el-input
              v-if="item.prop === 'countyScore' && row.title !== '合计'"
              v-model="form[row.countyScoreProp]"
              size="mini"
              placeholder="请输入"
              @change="setTotalScore('countyScoreProp')"
            />
            <span v-else-if="item.prop === 'cityScore'">--</span>
            <span v-else class="cell">{{ row[item.prop] }}</span>
          </div>
          <!-- 市级用户 -->
          <div v-else-if="userInfo.roleId === 2">
            <span v-if="item.prop === 'cityScore' && row.title === '合计'">{{ form[row.cityScoreProp] }}</span>
            <el-input
              v-if="item.prop === 'cityScore' && row.title !== '合计'"
              v-model="form[row.cityScoreProp]"
              size="mini"
              placeholder="请输入"
              @change="setTotalScore('cityScoreProp')"
            />
            <span v-else class="cell">{{ row[item.prop] }}</span>
          </div>
          <!-- 省级用户 -->
          <div v-else>
            <span class="cell">{{ row[item.prop] }}</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { TABLE_SCORE_DATA } from './data';
export default {
  data() {
    return {
      TABLE_TITLE: [
        { prop: 'content', label: '评价内容' },
        { prop: 'standard', label: '评价标准', width: 440, align: 'left' },
        { prop: 'totalScore', label: '分值', width: 80 },
        { prop: 'accordance', label: '评价依据' },
        { prop: 'countyScore', label: '县自评得分' },
        { prop: 'cityScore', label: '市自评得分' },
      ],
      tableData: TABLE_SCORE_DATA,

      // form: {
      //   areaId: '',
      //   batch: '',
      //   buildPutInCity: 0,
      //   buildPutInCounty: 0,
      //   buildSupportCity: 0,
      //   buildSupportCounty: 0,
      //   buildUseCity: 0,
      //   buildUseCounty: 0,
      //   carryOutConstructionCity: 0,
      //   carryOutConstructionCounty: 0,
      //   carryOutCreateCity: 0,
      //   carryOutCreateCounty: 0,
      //   completionStatement: '',
      //   conclusion: '',
      //   contactPerson: '',
      //   countySaveAnnex: '',
      //   digitalScenesCity: 0,
      //   digitalScenesCounty: 0,
      //   digitalSocietyCity: 0,
      //   digitalSocietyCounty: 0,
      //   featureCity: 0,
      //   featureCounty: 0,
      //   indicatorsCommonalityCity: 0,
      //   indicatorsCommonalityCounty: 0,
      //   indicatorsPersonalityCity: 0,
      //   indicatorsPersonalityCounty: 0,
      //   leader: '',
      //   negativeCity: 0,
      //   negativeCounty: 0,
      //   phone: '',
      //   saveToGo: 0,
      //   scenesBasicCity: 0,
      //   scenesBasicCounty: 0,
      //   scenesBuildCity: 0,
      //   scenesBuildCounty: 0,
      //   scenesEmphasisCity: 0,
      //   scenesEmphasisCounty: 0,
      //   totalCity: 0,
      //   totalCounty: 0,
      //   totalInvestment: 0,
      //   villageName: '',
      //   workBoardCity: 0,
      //   workBoardCounty: 0,
      //   workGuideCity: 0,
      //   workGuideCounty: 0,
      //   workMechanismCity: 0,
      //   workMechanismCounty: 0,
      // },

      form: {
        buildPutInCity: '',
        buildPutInCounty: '',
        buildSupportCity: '',
        buildSupportCounty: '',
        buildUseCity: '',
        buildUseCounty: '',
        carryOutConstructionCity: '',
        carryOutConstructionCounty: '',
        carryOutCreateCity: '',
        carryOutCreateCounty: '',
        digitalScenesCity: '',
        digitalScenesCounty: '',
        digitalSocietyCity: '',
        digitalSocietyCounty: '',
        featureCity: '',
        featureCounty: '',
        indicatorsCommonalityCity: '',
        indicatorsCommonalityCounty: '',
        indicatorsPersonalityCity: '',
        indicatorsPersonalityCounty: '',
        negativeCity: '',
        negativeCounty: '',
        scenesBasicCity: '',
        scenesBasicCounty: '',
        scenesBuildCity: '',
        scenesBuildCounty: '',
        scenesEmphasisCity: '',
        scenesEmphasisCounty: '',
        totalCity: '',
        totalCounty: '',
        workBoardCity: '',
        workBoardCounty: '',
        workGuideCity: '',
        workGuideCounty: '',
        workMechanismCity: '',
        workMechanismCounty: '',
      },
    };
  },
  computed: {
    userInfo() {
      return this.$store.getters.userInfo;
    },
  },
  methods: {
    arraySpanMethod({ rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 2 === 0 && rowIndex < 6) {
          return {
            rowspan: 2,
            colspan: 1,
          };
        } else if (rowIndex % 3 === 0 && rowIndex >= 6 && rowIndex < 15) {
          return {
            rowspan: 3,
            colspan: 1,
          };
        } else if (rowIndex >= 15) {
          return {
            rowspan: 1,
            colspan: 1,
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
      }
    },
    setColSpan() {
      const x = document.getElementsByClassName('el-table__header')[0].rows[0].cells;
      x[0].colSpan = 2;
      x[1].style.display = 'none';
    },

    setTotalScore(val) {
      if (val === 'countyScoreProp') {
        this.form.totalCounty = this.countScore('countyScoreProp');
      } else if (val === 'cityScoreProp') {
        this.form.totalCity = this.countScore('cityScoreProp');
      }
    },
    countScore(prop) {
      const { form } = this;
      let sums = this.tableData.slice(0, -1).reduce((prev, curr) => {
        const value = Number(form[curr[prop]]);
        if (!isNaN(value)) {
          return prev + value;
        } else {
          return prev;
        }
      }, 0);
      return sums;
    },
  },
  mounted() {
    // 注意一定要保证DOM渲染完成后在进行合并操作，否则会找不到元素
    this.$nextTick(function () {
      this.setColSpan();
    });
  },
};
</script>
<style lang="scss" scoped>
.score-table-module {
  padding: 20px;
  ::v-deep .table-header {
    height: 56px;
    background: #f7f8fa;
    th {
      background: transparent;
    }
  }
  ::v-deep .el-table .cell {
    white-space: pre-line;
  }
}
</style>
