<template>
  <div class="page">
    <CountyNew v-if="false" />
    <CityNew />
  </div>
</template>

<script>
import CountyNew from './CountyNew.vue';
import CityNew from './CityNew.vue';

export default {
  name: 'index',
  components: {
    CountyNew,
    CityNew,
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
