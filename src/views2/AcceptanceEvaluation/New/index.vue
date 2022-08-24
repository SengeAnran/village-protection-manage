<template>
  <div class="page">
    <CountyNew v-if="roleId === USER_TYPE.COUNTRY || roleId === USER_TYPE.COUNTRY_LEADER" />
    <CityNew v-else-if="roleId === USER_TYPE.CITY || roleId === USER_TYPE.CITY_LEADER" />
    <ProvinceNew v-else />
  </div>
</template>

<script>
import CountyNew from './CountyNew.vue';
import CityNew from './CityNew.vue';
import ProvinceNew from './ProvinceNew.vue';
import { USER_TYPE } from '@/views2/utils/constants';

export default {
  name: 'index',
  components: {
    CountyNew,
    CityNew,
    ProvinceNew,
  },
  computed: {
    roleId() {
      return this.$store.getters.userInfo && this.$store.getters.userInfo.roleId;
    },
  },
  data() {
    return {
      USER_TYPE,
      form: {},
    };
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
