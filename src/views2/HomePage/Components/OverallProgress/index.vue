<template>
  <base-box-item-new class="rete-content" name="总体进度" :count="total" unit="%" :icon="iconUrl" :fixed="1">
    <BarChart v-if="showBar" key="1" :chart-data="chartData" hideLegend @goDetail="goDetail" />
  </base-box-item-new>
</template>

<script>
import { mapGetters } from 'vuex';
import { getProgressReport } from '@/api2/homePage';
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
    getData() {
      const data = {
        batch: this.batch,
        year: this.year,
        status: this.status,
        ...this.location,
      };
      //项目开工率
      getProgressReport(data).then((res) => {
        // 投资完成率
        this.chartData.xAxisData = res.map((i) => {
          return i.name;
        });
        this.chartData.dataList1 = res.map((i) => {
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
      });
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
