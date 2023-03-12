<template>
  <base-box-item-new class="rete-content" name="评价等次" :icon="iconUrl" hideNum :fixed="1">
    <!--    <BarChart v-if="showBar" key="1" :chart-data="chartData" hideLegend @goDetail="goDetail" />-->
    <!--    <TotalTitle class="rall-num" name="调度村总数" :count="otherNumber" unit="个" />-->
    <div class="pie-chart">
      <PieChart v-if="showBar" :list="pieDataList" :isPercent="false" unit="个" totalUnit="个" minTitle="申报总数" />
    </div>
  </base-box-item-new>
</template>

<script>
import { mapGetters } from 'vuex';
import { getEvaluationGradeCount } from '@/api2/homePage';

import PieChart from '../../PieChart';

export default {
  components: { PieChart },
  data() {
    return {
      showBar: true,
      flag: true,
      iconUrl: require('./icon.png'),
      pieDataList: [
        { name: '优秀', value: 0 },
        { name: '良好', value: 0 },
        { name: '合格', value: 0 },
      ],
      otherNumber: 0,
      dialogVisible: false,
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
      getEvaluationGradeCount(data).then((res) => {
        this.pieDataList[0].value = res.excellent || 0;
        this.pieDataList[1].value = res.good || 0;
        this.pieDataList[2].value = res.qualified || 0;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.rete-content {
  position: relative;
  height: 100%;
  .rall-num {
    margin-top: 17px;
    margin-bottom: 10px;
  }
  .pie-chart {
    height: 140px;
    margin-top: 5px;
  }
}
</style>
