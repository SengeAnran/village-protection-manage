<template>
  <div class="content">
    <base-box-item name="项目开工率" :count="total" unit="%" :icon="iconUrl" :fixed="1">
      <div class="left-content">
        <TotalTitle class="rall-num" name="项目总数" :count="otherNumber" unit="个" />
        <PieChart v-if="showBar" :list="pieDataList" :isPercent="false" unit="个" totalUnit="个" minTitle="申报总数" />
      </div>
      <div class="right-content">
        <BarChart v-if="showBar" key="1" :chart-data="chartData" />
      </div>
    </base-box-item>
    <base-box-item name="投资完成率" style="margin-top: 30px" :count="total2" unit="%" :icon="iconUrl2" :fixed="1">
      <div class="left-content">
        <TotalSummary :data="data" />
      </div>
      <div class="right-content">
        <BarChart v-if="showBar" key="1" :chart-data="chartData2" />
      </div>
    </base-box-item>

    <base-box-item name="总体进度" style="margin-top: 30px" :count="total3" unit="%" :icon="iconUrl3" :fixed="1">
      <div class="all-content">
        <BarChart v-if="showBar" key="1" :chart-data="chartData3" hideTooltip hideLegend />
      </div>
    </base-box-item>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import PieChart from './PieChart';
import BarChart from './BarChart';
import TotalTitle from './TotalTitle';
import TotalSummary from './TotalSummary.vue';
import { getProgressReport, getProgressReportTotal, getProjectRate } from '@/api2/homePage';
export default {
  components: { PieChart, BarChart, TotalTitle, TotalSummary },
  data() {
    return {
      pieDataList: [
        { name: '已开工项目', value: 0, percent: 0 },
        { name: '未开工项目', value: 0, percent: 0 },
      ],
      data: {},
      otherNumber: 0,
      total: 0,
      total2: 0,
      total3: 0,
      showBar: true,
      flag: true,
      chartData: {
        name: '各地市项目开工情况',
        xAxisData: [],
        name1: '项目开工率',
        name2: '已开工项目数',
        name3: '未开工项目数',
        dataList1: [],
        dataList2: [],
        dataList3: [],
      },
      chartData2: {
        name: '各地市项目投资完成情况',
        name1: '投资完成率',
        name2: '计划投资',
        name3: '完成投资',
        otherUnit: '万元',
        xAxisData: [],
        dataList1: [],
        dataList2: [],
        dataList3: [],
      },
      chartData3: {
        name: '各地市总体进度情况',
        name1: '投资完成率',
        xAxisData: [],
        dataList1: [],
      },
      iconUrl: require('./icon.png'),
      iconUrl2: require('./icon2.png'),
      iconUrl3: require('./icon3.png'),
    };
  },
  computed: {
    ...mapGetters(['area', 'location', 'batch']),
  },
  watch: {
    area() {
      this.getData();
    },
    batch() {
      this.getData();
    },
  },
  mounted() {
    this.getData();
    window.addEventListener('resize', () => {
      if (this.flag) {
        this.flag = false;
        this.showBar = false;
        setTimeout(() => {
          this.flag = true;
          this.showBar = true;
        }, 200);
      }
    });
  },
  methods: {
    getData() {
      const data = {
        batch: this.batch,
        ...this.location,
      };
      //项目开工率
      getProjectRate(data).then((res) => {
        this.pieDataList[0].value = res.startNum;
        this.pieDataList[0].percent = (res.startRate * 100).toFixed(1);
        this.pieDataList[1].percent = (res.notStartRate * 100).toFixed(1);
        this.pieDataList[1].value = res.notStartNum;
        this.total = res.startRate * 100;
        this.otherNumber = res.projectNum;
        this.chartData.xAxisData = res.projectCommencementRates.map((i) => {
          return i.name;
        });
        this.chartData.dataList1 = res.projectCommencementRates.map((i) => {
          return (i.rate * 100).toFixed(1) || 0;
        });
        this.chartData.dataList2 = res.projectCommencementRates.map((i) => {
          return i.startNum;
        });
        this.chartData.dataList3 = res.projectCommencementRates.map((i) => {
          return i.notStartNum;
        });
      });
      //投资完成率
      getProgressReportTotal(data).then((res) => {
        // 投资完成率
        this.total2 = res.rate * 100;
        this.data = res;
      });
      getProgressReport(data).then((res) => {
        // 投资完成率
        this.chartData2.xAxisData = res.map((i) => {
          return i.name;
        });
        this.chartData3.xAxisData = this.chartData2.xAxisData;
        this.chartData2.dataList1 = res.map((i) => {
          return (i.rate * 100).toFixed(1) || 0;
        });
        this.chartData3.dataList1 = res.map((i) => {
          return (i.overallProgress * 1).toFixed(2);
        });
        this.chartData2.dataList2 = res.map((i) => {
          return (i.investNum * 1).toFixed(2);
        });
        this.chartData2.dataList3 = res.map((i) => {
          return (i.completeTotal * 1).toFixed(2);
        });
      });

      // getCountVillage(data).then((res) => {
      //   this.chartData.xAxisData = res.cityCountVOList.map((i) => {
      //     return i.name;
      //   });
      //   this.chartData.dataList1 = res.cityCountVOList.map((i) => {
      //     return i.passTotalCount;
      //   });
      //   this.chartData.dataList2 = res.cityCountVOList.map((i) => {
      //     return i.readyPassTotalCount;
      //   });
      //   this.chartData.dataList3 = res.cityCountVOList.map((i) => {
      //     return i.noPassTotalCount;
      //   });
      // });
    },
  },
};
</script>

<style lang="scss" scoped>
.project-scheduling {
  position: relative;
  padding-top: 40px;
  .change-button {
    position: absolute;
    top: 0;
    right: 20px;
    width: 110px;
    height: 32px;
    background: #ffffff;
    border-radius: 4px;
    border: 1px solid #1492ff;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #1492ff;
    line-height: 22px;
    span::before {
      content: '';
      display: inline-block;
      width: 14px;
      height: 11px;
      background: url('../change_icon.png') no-repeat;
      background-size: 100% 100%;
    }
  }
  .left-content {
    //width: 471px;
    position: relative;
    flex: 1;
    height: 239px;
    //background-color: pink;
    .rall-num {
      position: absolute;
      top: 50px;
      left: 51.5%;
    }
  }
  .right-content {
    flex: 1;
    //width: 540px;
    height: 239px;
    //background-color: pink;
  }
  .all-content {
    flex: 1;
    height: 219px;
  }
}
</style>
