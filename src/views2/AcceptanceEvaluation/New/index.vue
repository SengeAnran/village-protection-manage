<template>
  <div class="page">
    <CountyNew v-if="roleId === 3" />
    <CityNew v-else-if="roleId === 2" />
    <ProvinceNew v-else />
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
  computed: {
    roleId() {
      return this.$store.getters.userInfo && this.$store.getters.userInfo.roleId;
    },
  },
  data() {
    return {
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
