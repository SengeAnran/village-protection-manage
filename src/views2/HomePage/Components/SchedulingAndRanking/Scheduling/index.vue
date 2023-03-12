<template>
  <base-box-item-new class="rete-content" name="各地区项目调度情况" :icon="iconUrl" hideNum>
    <!--    <BarChart v-if="showBar" key="1" :chart-data="chartData" hideLegend @goDetail="goDetail" />-->
    <base-bar-chart-more v-if="showBar" key="1" showName :chart-data="chartData" @goDetail="goDetail" />
  </base-box-item-new>
</template>

<script>
import { mapGetters } from 'vuex';
import { getProgressReport, getProjectRate } from '@/api2/homePage';
// import BarChart from './BarChart';

export default {
  // components: { BarChart },
  data() {
    return {
      total: 0,
      showBar: true,
      flag: true,
      iconUrl: require('./icon.png'),
      chartData: {
        name: '',
        name1: '投资完成率',
        name2: '项目开工率',
        unit: '%',
        xAxisData: [],
        dataList1: [],
        dataList2: [],
      },
    };
  },
  computed: {
    ...mapGetters(['area', 'location', 'batch', 'status']),
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
    async getData() {
      this.showBar = false;
      const data = {
        batch: this.batch,
        year: this.year,
        status: this.status,
        ...this.location,
      };
      //项目开工率
      const res = await getProjectRate(data);
      const { projectCommencementRates } = res;
      if (projectCommencementRates) {
        this.listData = projectCommencementRates;
        this.chartData.xAxisData = projectCommencementRates.map((i) => {
          return i.name;
        });
        this.chartData.dataList1 = projectCommencementRates.map((i) => {
          return (i.rate * 100).toFixed(1) || 0;
        });
      }
      const res2 = await getProgressReport(data);
      res2.forEach((i) => {
        const index = this.chartData.xAxisData.findIndex((j) => j === i.name);
        if (index !== -1) {
          this.chartData.dataList2[index] = (i.rate * 100).toFixed(1) || 0;
        }
      });
      // 避免数据不能一次性赋值导致的问题
      this.showBar = true;
      // this.chartData.dataList2 = res.map((i) => {
      //   return (i.rate * 100).toFixed(1) || 0;
      // });
    },
    goDetail(name) {
      const index = this.listData.findIndex((i) => i.name === name);
      if (
        (this.listData[index].id || this.listData[index].id === 0) &&
        !this.isGoing &&
        this.listData[index].reportingTime
      ) {
        // isGoing防止多次路由
        this.isGoing = true;
        this.$router.push({
          name: 'ProgressSubmissionDetails',
          query: {
            id: this.listData[index].id,
            reportingTime: this.listData[index].reportingTime,
          },
        });
      }
      // console.log(this.listData[index]);
    },
  },
};
</script>

<style lang="scss" scoped>
.rete-content {
  position: relative;
  height: 100%;
}
</style>
