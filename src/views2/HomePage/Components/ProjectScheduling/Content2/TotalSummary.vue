<template>
  <div class="module-wrp">
    <div class="gap"></div>
    <TotalTitle name="计划投资" unit="万元" countSize="24" :icon="false" :count="Number(formatMoney(totalPlan))" />
    <TotalItem :social="data.planDrive" :government="data.planGov" />
    <!--    <TotalItem background-color="#70abf8" />-->
    <div class="gap"></div>
    <TotalTitle name="完成投资" unit="万元" countSize="24" :icon="false" :count="Number(formatMoney(totalComplete))" />
    <!--    <TotalItem background-color="#fed887" />-->
    <TotalItem :social="data.completeDrive" :government="data.completeGov" />
  </div>
</template>
<script>
import TotalItem from './TotalItem.vue';
import TotalTitle from './TotalTitle.vue';
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
    totalPlan() {
      const { plan } = this.data;
      return (plan || 0).toFixed(2);
    },
    totalComplete() {
      const { complete } = this.data;
      return complete || 0;
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
