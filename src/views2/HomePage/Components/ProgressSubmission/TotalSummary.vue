<template>
  <div class="module-wrp">
    <TotalTitle name="投资完成率" unit="%" :count="rate" />
    <div class="gap"></div>
    <TotalTitle name="计划投资" unit="万元" countSize="24" :icon="false" :count="Number(totalPlan)" />
    <TotalItem :social="data.totalPlanSocialInvestment" :government="data.totalPlanGovInvestment" />
    <div class="gap"></div>
    <TotalTitle name="完成投资" unit="万元" countSize="24" :icon="false" :count="Number(totalComplete)" />
    <TotalItem :social="data.totalCompleteSocialInvestment" :government="data.totalCompleteGovInvestment" />
  </div>
</template>
<script>
import TotalTitle from './TotalTitle.vue';
import TotalItem from './TotalItem.vue';
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
      return (this.data.rate && Number(this.data.rate.replace('%', ''))) || 0;
    },
    totalComplete() {
      const { totalCompleteGovInvestment, totalCompleteSocialInvestment } = this.data;
      return (totalCompleteGovInvestment + totalCompleteSocialInvestment || 0).toFixed(2);
    },
    totalPlan() {
      const { totalPlanGovInvestment, totalPlanSocialInvestment } = this.data;
      return totalPlanGovInvestment + totalPlanSocialInvestment || 0;
    },
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
