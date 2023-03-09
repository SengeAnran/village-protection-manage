<template>
  <base-box-item-new class="rete-content" name="投资完成率" :count="total" unit="%" :icon="iconUrl" :fixed="1">
    <TotalSummary :data="data" />
  </base-box-item-new>
</template>

<script>
import { mapGetters } from 'vuex';
import TotalSummary from './TotalSummary.vue';
import { getProgressReportTotal } from '@/api2/homePage';

export default {
  components: { TotalSummary },
  data() {
    return {
      data: {},
      total: 0,
      showBar: true,
      flag: true,
      iconUrl: require('./icon.png'),
    };
  },
  computed: {
    ...mapGetters(['area', 'location', 'batch', 'year']),
  },
  watch: {
    area() {
      this.getData();
    },
    batch() {
      this.getData();
    },
    year() {
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
        year: this.year,
      };
      //投资完成率
      getProgressReportTotal(data).then((res) => {
        // 投资完成率
        const rate = res ? res.rate || 0 : 0;
        this.total = rate * 100;
        this.data = res;
        console.log(this.data);
      });
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
