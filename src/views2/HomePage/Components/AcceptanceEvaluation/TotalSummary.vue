<template>
  <div class="module-wrp">
    <TotalTitle name="投资完成率" unit="%" :count="88" :icon="require('../../img/acceptance-icon.png')" />
    <div class="gap"></div>
    <TotalTitle name="计划投资" unit="万元" countSize="24" :icon="false" :count="29413" />
    <TotalItem />
    <div class="gap"></div>
    <TotalTitle name="完成投资" unit="万元" countSize="24" :icon="false" :count="20400" />
    <TotalItem />
  </div>
</template>
<script>
import TotalTitle from '../ProgressSubmission/TotalTitle.vue';
import TotalItem from './TotalItem.vue';
export default {
  name: 'TotalSummary',
  components: { TotalItem, TotalTitle },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.module-wrp {
  padding-left: 20px;
  padding-top: 8px;
  .gap {
    height: 14px;
  }
}
</style>
