<template>
  <base-box-item-new class="rete-content" name="项目开工率" :count="total" unit="%" :icon="iconUrl" :fixed="1">
    <TotalTitle class="rall-num" name="项目总数" :count="otherNumber" unit="个" />
    <PieChart
      v-if="showBar"
      :list="pieDataList"
      legendLeft="38%"
      :isPercent="false"
      unit="个"
      totalUnit="个"
      minTitle="申报总数"
      style="margin-top: 15px"
    />
  </base-box-item-new>
</template>

<script>
import { mapGetters } from 'vuex';
import PieChart from './PieChart';
import TotalTitle from './TotalTitle';
import { getProjectRate } from '@/api2/homePage';
export default {
  components: { PieChart, TotalTitle },
  data() {
    return {
      pieDataList: [
        { name: '已开工项目', value: 0, percent: 0 },
        { name: '未开工项目', value: 0, percent: 0 },
      ],
      data: {},
      otherNumber: 0,
      total: 0,
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
      listData: [],
      iconUrl: require('./icon.png'),
    };
  },
  computed: {
    ...mapGetters(['area', 'location', 'batch', 'year', 'status']),
    query() {
      return {
        area: this.area,
        year: this.year,
        batch: this.batch,
        status: this.status,
      };
    },
  },
  watch: {
    query: {
      handler: function () {
        this.getData();
      },
      deep: true,
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
        year: this.year,
        status: this.status,
      };
      //项目开工率
      getProjectRate(data).then((res) => {
        this.pieDataList[0].value = res.startNum;
        this.pieDataList[0].percent = (res.startRate * 100).toFixed(1);
        this.pieDataList[1].percent = (res.notStartRate * 100).toFixed(1);
        this.pieDataList[1].value = res.notStartNum;
        this.total = res.startRate * 100;
        this.otherNumber = res?.projectNum || 0;
        const { projectCommencementRates } = res;
        if (projectCommencementRates) {
          this.listData = projectCommencementRates;
          this.chartData.xAxisData = projectCommencementRates.map((i) => {
            return i.name;
          });
          this.chartData.dataList1 = projectCommencementRates.map((i) => {
            return (i.rate * 100).toFixed(1) || 0;
          });
          this.chartData.dataList2 = projectCommencementRates.map((i) => {
            return i.startNum;
          });
          this.chartData.dataList3 = projectCommencementRates.map((i) => {
            return i.notStartNum;
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.rete-content {
  //width: 471px;
  position: relative;
  height: 100%;
  //background-color: pink;
  .rall-num {
    position: absolute;
    top: 0px;
    left: 43.5%;
  }
}
</style>
