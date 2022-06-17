<template>
  <div class="module-wrp">
    <TotalTitle name="投资完成率" unit="个" :count="187" :icon="require('../../img/acceptance-icon.png')" />
    <div style="height: 14px"></div>
    <TotalItem color="#70ABF8" />
    <div class="gap"></div>
    <TotalItem color="#FEC447" />
    <div class="gap"></div>
    <TotalItem color="#FF9D9D" />
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
  padding-top: 20px;
  .gap {
    height: 11px;
  }
}
</style>
