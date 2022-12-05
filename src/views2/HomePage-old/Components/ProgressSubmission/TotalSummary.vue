<template>
  <div class="module-wrp">
    <TotalTitle name="投资完成率" unit="%" :count="rate" />
    <div class="gap"></div>
    <TotalTitle name="计划投资" unit="万元" countSize="24" :icon="false" :count="Number(formatMoney(totalPlan))" />
    <!--    <TotalItem :social="data.totalPlanSocialInvestment" :government="data.totalPlanGovInvestment" : />-->
    <TotalItem background-color="#70abf8" />
    <div class="gap"></div>
    <TotalTitle name="完成投资" unit="万元" countSize="24" :icon="false" :count="Number(formatMoney(totalComplete))" />
    <TotalItem background-color="#fed887" />
  </div>
</template>
<script>
import TotalTitle from './TotalTitle.vue';
import TotalItem from './TotalItem.vue';
import { formatMoney } from '@/views2/utils/formatter';
export default {
  name: 'TotalSummary',
  components: { TotalItem, TotalTitle },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    rate() {
      return parseFloat((this.data.totalwctzbl * 100).toFixed(1), 10);
    },
    totalPlan() {
      const { totalsbztt } = this.data;
      return (totalsbztt || 0).toFixed(2);
    },
    totalComplete() {
      const { totalywcztz } = this.data;
      return totalywcztz || 0;
    },
  },
  methods: {
    formatMoney,
  },
};
</script>

<style lang="scss" scoped>
.module-wrp {
  padding-left: 20px;
  padding-top: 16px;
  .gap {
    height: 14px;
  }
}
</style>
