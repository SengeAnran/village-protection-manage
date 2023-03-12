<template>
  <base-box-item-new class="rete-content" name="验收评价" :icon="iconUrl" :count="total" unit="个">
    <div class="pie-chart">
      <PieChart v-if="showBar" :list="pieDataList" :isPercent="false" unit="个" totalUnit="个" minTitle="申报总数" />
    </div>
  </base-box-item-new>
</template>

<script>
import { mapGetters } from 'vuex';
import { getAcceptanceStatistics } from '@/api2/homePage';

import PieChart from '../../PieChart';

export default {
  components: { PieChart },
  data() {
    return {
      showBar: true,
      flag: true,
      iconUrl: require('./icon.png'),
      pieDataList: [
        { name: '省级审核通过', value: 0 },
        { name: '市、县待上报', value: 0 },
        { name: '省级审核未通过', value: 0 },
      ],
      total: 0,
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
      getAcceptanceStatistics(data).then((res) => {
        this.pieDataList[0].value = res.passTotalCount || 0;
        this.pieDataList[1].value = res.readyPassTotalCount || 0;
        this.pieDataList[2].value = res.noPassTotalCount || 0;
        this.total = res?.declarationTotalCount || 0;
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
