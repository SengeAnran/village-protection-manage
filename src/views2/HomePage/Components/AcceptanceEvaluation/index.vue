<template>
  <div class="show-box">
    <div class="select-batch">
      <SelectBatch @changeSelect="changeSelect" />
    </div>
    <div class="left-content">
      <TotalSummary :data="data" />
    </div>
    <div class="right-content">
      <BarChart v-if="showBar" :chart-data="chartData" />
    </div>
  </div>
</template>

<script>
import SelectBatch from '@/views2/HomePage/Components/SelectBatch';
import TotalSummary from './TotalSummary.vue';
import BarChart from './BarChart';
import { getAcceptanceStatistics } from '@/api2/homePage';

export default {
  components: { BarChart, SelectBatch, TotalSummary },
  data() {
    return {
      batch: '',
      data: {},
      showBar: true,
      flag: true,
      chartData: {
        xAxisData: [],
        dataList1: [],
        dataList2: [],
        dataList3: [],
      },
    };
  },
  mounted() {
    // this.getData();
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
    changeSelect(val) {
      this.batch = val;
      this.getData();
    },
    getData() {
      getAcceptanceStatistics({ declarationBatch: this.batch }).then((res) => {
        this.data = res || {};
        this.chartData.xAxisData = res.cityCountVOList.map((i) => {
          return i.cityName;
        });
        this.chartData.dataList1 = res.cityCountVOList.map((i) => {
          return i.passTotalCount;
        });
        this.chartData.dataList2 = res.cityCountVOList.map((i) => {
          return i.readyPassTotalCount;
        });
        this.chartData.dataList3 = res.cityCountVOList.map((i) => {
          return i.noPassTotalCount;
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.show-box {
  position: relative;
  height: 274px;
  display: flex;
  justify-content: space-between;
  .left-content {
    //width: 471px;
    flex: 1;
    height: 100%;
    //background-color: pink;
  }
  .right-content {
    flex: 1.4;
    //width: 540px;
    height: 100%;
    //background-color: pink;
  }
}
.select-batch {
  position: absolute;
  right: 20px;
  top: 20px;
  z-index: 10;
}
</style>
