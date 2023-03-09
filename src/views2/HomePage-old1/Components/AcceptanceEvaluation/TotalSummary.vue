<template>
  <div class="module-wrp">
    <TotalTitle
      name="验收评价申报数"
      unit="个"
      :count="data.declarationTotalCount"
      :icon="require('../../img/acceptance-icon.png')"
    />
    <div style="height: 14px"></div>
    <TotalItem name="审核通过" color="#70ABF8" :count="data.passTotalCount" :total="data.declarationTotalCount" />
    <div class="gap"></div>
    <TotalItem name="待上报" color="#FEC447" :count="data.readyPassTotalCount" :total="data.declarationTotalCount" />
    <div class="gap"></div>
    <TotalItem name="审核未通过" color="#FF9D9D" :count="data.noPassTotalCount" :total="data.declarationTotalCount" />
  </div>
</template>
<script>
import TotalTitle from '../ProgressSubmission/TotalTitle.vue';
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
