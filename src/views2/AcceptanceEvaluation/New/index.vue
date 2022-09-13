<template>
  <div class="page-new">
    <CountyNew v-if="COUNTRY || COUNTRY_LEADER" />
    <CityNew v-else-if="CITY || CITY_LEADER" />
    <ProvinceNew v-else />
  </div>
</template>

<script>
import CountyNew from './CountyNew.vue';
import CityNew from './CityNew.vue';
import ProvinceNew from './ProvinceNew.vue';
import role from '@/views2/mixins/role';

export default {
  name: 'index',
  mixins: [role],
  components: {
    CountyNew,
    CityNew,
    ProvinceNew,
  },
  data() {
    return {
      form: {},
    };
  },
};
</script>

<style scoped lang="scss">
.page-new {
  padding: 20px;
  background-color: #fff;

  .action-wrp {
    margin-top: 50px;
  }
}
</style>
