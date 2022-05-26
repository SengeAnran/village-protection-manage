<template>
  <div class="page">
    <CountyNew v-if="false" />
    <CityNew v-if="false" />
    <ProvinceNew />
  </div>
</template>

<script>
import CountyNew from './CountyNew.vue';
import CityNew from './CityNew.vue';
import ProvinceNew from './ProvinceNew.vue';

export default {
  name: 'index',
  components: {
    CountyNew,
    CityNew,
    ProvinceNew,
  },
};
</script>

<style scoped lang="scss">
.page {
  padding: 20px;
  background-color: #fff;

  .action-wrp {
    margin-top: 50px;
  }
}
</style>
