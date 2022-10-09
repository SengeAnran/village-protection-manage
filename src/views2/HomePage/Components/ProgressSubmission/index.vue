<template>
  <div class="show-box">
    <div class="select-batch">
      <SelectBatch @changeSelect="changeSelect" />
    </div>
    <div class="left-content">
      <TotalSummary :data="data" />
    </div>
    <div class="right-content">
      <FinanceIncome v-if="showBar" :chartData="chartData" />
    </div>
  </div>
</template>

<script>
import FinanceIncome from '@/views2/HomePage/Components/ProgressSubmission/FinanceIncome';
import SelectBatch from '@/views2/HomePage/Components/SelectBatch';
import TotalSummary from './TotalSummary.vue';
import { getProjectProgressReportNew } from '@/api2/homePage';
export default {
  components: { FinanceIncome, SelectBatch, TotalSummary },
  data() {
    return {
      showBar: true,
      flag: true,
      data: {},
      chartData: {
        xAxisData: [],
        dataList1: [],
        dataList2: [],
      },
    };
  },
  mounted() {
    this.getData('');
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
      this.getData(val);
    },
    async getData(batch) {
      const res = await getProjectProgressReportNew({ batch });
      this.data = res;
      this.chartData.xAxisData = res.staticProgressDOS.map((i) => {
        return i.city;
      });
      this.chartData.dataList1 = res.staticProgressDOS.map((i) => {
        return i.sbztt;
      });
      this.chartData.dataList2 = res.staticProgressDOS.map((i) => {
        return i.ywcztz;
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
