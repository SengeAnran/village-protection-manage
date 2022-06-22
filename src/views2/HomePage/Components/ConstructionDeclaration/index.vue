<template>
  <div class="show-box">
    <div class="select-batch">
      <SelectBatch @changeSelect="changeSelect"/>
    </div>
    <div class="left-content">
      <PieChart
        v-if="showBar"
        :list="pieDataList"
        :isPercent="false"
        unit="个"
        showMinTitle
        :total="total"
        totalUnit="个"
        minTitle="申报总数"
      />
    </div>
    <div class="right-content">
      <BarChart v-if="showBar" key="1" :chart-data="chartData"/>
    </div>
  </div>
</template>

<script>
import PieChart from './PieChart';
import SelectBatch from '@/views2/HomePage/Components/SelectBatch';
import BarChart from './BarChart';
import { getCountVillage } from '@/api2/homePage';
export default {
  components: { PieChart, SelectBatch, BarChart },
  data() {
    return {
      pieDataList: [
        { name: '审核通过', value: 300 },
        { name: '待审核', value: 50 },
        { name: '审核未通过', value: 28 },
      ],
      total: 0,
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
    this.getData('');
    window.addEventListener('resize', () => {
      if (this.flag) {
        this.flag = false;
        this.showBar = false;
        setTimeout(() => {
          this.flag = true;
          this.showBar = true;
        },200);
      }
    });
  },
  methods: {
    changeSelect(val) {
      this.getData(val);
    },
    getData(val) {
      getCountVillage({ declarationBatch: val }).then((res) => {
        this.chartData.xAxisData = res.cityCountVOList.map((i) => {return i.cityName});
        this.chartData.dataList1 = res.cityCountVOList.map((i) => {return i.passTotalCount});
        this.chartData.dataList2 = res.cityCountVOList.map((i) => {return i.readyPassTotalCount});
        this.chartData.dataList3 = res.cityCountVOList.map((i) => {return i.noPassTotalCount});
        this.pieDataList[0].value = res.passTotalCount;
        this.pieDataList[1].value = res.readyPassTotalCount;
        this.pieDataList[2].value = res.passTotalCount;
        console.log(this.chartData);
        this.total = res.passTotalCount + res.readyPassTotalCount + res.passTotalCount;
      });
    },
  },
}
</script>

<style lang="scss" scoped>
.show-box {
  position: relative;
  display: flex;
  justify-content: space-between;
  .left-content {
    //width: 471px;
    flex: 1;
    height: 239px;
    //background-color: pink;
  }
  .right-content {
    flex: 1.4;
    //width: 540px;
    height: 239px;
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