<template>
  <base-box-item-new class="rete-content" name="总体进度" :count="total" unit="%" :icon="iconUrl" :fixed="1">
    <BarChart v-if="showBar" key="1" :chart-data="chartData" :hideLegend="hideLegend" @goDetail="goDetail" />
  </base-box-item-new>
</template>

<script>
import { mapGetters } from 'vuex';
import { getOverallProgressRate5thPro, getProgressReport } from '@/api2/homePage';
import BarChart from './BarChart';

export default {
  components: { BarChart },
  data() {
    return {
      total: 0,
      showBar: true,
      flag: true,
      iconUrl: require('./icon.png'),
      chartData: {
        name: '',
        name1: '总体进度',
        xAxisData: [],
        dataList1: [],
      },
      chartData1: {
        name: '',
        name1: '总体进度',
        xAxisData: [],
        dataList1: [],
      },
      chartData2: {
        name: '',
        name1: '前三',
        name2: '后三',
        xAxisData: [],
        dataList1: [],
        dataList2: [],
      },
      hideLegend: true,
    };
  },
  computed: {
    ...mapGetters(['area', 'location', 'batch', 'status', 'onlyShowDetail']),
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
    onlyShowDetail() {
      this.reloadShow();
    },
  },
  mounted() {
    this.getData();
    window.addEventListener('resize', () => {
      this.reloadShow();
    });
  },
  methods: {
    reloadShow() {
      if (this.flag) {
        this.flag = false;
        this.showBar = false;
        setTimeout(() => {
          this.flag = true;
          this.showBar = true;
        }, 200);
      }
    },
    async getData() {
      const data = {
        batch: this.batch,
        year: this.year,
        status: this.status,
        ...this.location,
      };
      if (!this.location.county) {
        // 省市级
        //项目开工率
        const res = await getProgressReport(data);
        // 投资完成率
        this.chartData1.xAxisData = res.map((i) => {
          return i.name;
        });
        this.chartData1.dataList1 = res.map((i) => {
          return (i.overallProgress * 1).toFixed(2);
        });

        if (res.length > 0) {
          const total =
            res.reduce((prev, cur) => {
              return prev + cur.overallProgress * 1;
            }, 0) / res.length;
          this.total = total.toFixed(1) * 1;
        } else {
          this.total = 0;
        }
        this.chartData = this.chartData1;
        this.hideLegend = true;
        return;
      }
      data.order = 0;
      let res1 = await getOverallProgressRate5thPro(data);
      data.order = 1;
      let res2 = await getOverallProgressRate5thPro(data);
      res1 = res1.length > 3 ? res1.slice(0, 3) : res1;
      res2 = res2.length > 3 ? res2.slice(0, 3) : res2;
      this.chartData2.xAxisData = [];
      this.chartData2.dataList1 = [];
      this.chartData2.dataList2 = [];
      res1.forEach((i) => {
        this.chartData2.xAxisData.push(i.name);
        this.chartData2.dataList1.push(i.rate.toFixed(1) || 0);
        this.chartData2.dataList2.push(0);
      });
      res2.forEach((i) => {
        this.chartData2.xAxisData.push(i.name);
        this.chartData2.dataList1.push(0);
        this.chartData2.dataList2.push(i.rate.toFixed(1) || 0);
      });
      this.chartData = this.chartData2;
      this.hideLegend = false;
      const res3 = await getProgressReport(data);
      if (res3.length > 0) {
        const total =
          res3.reduce((prev, cur) => {
            return prev + cur.overallProgress * 1;
          }, 0) / res3.length;
        this.total = total.toFixed(1) * 1;
      } else {
        this.total = 0;
      }
      // 投资完成率
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
