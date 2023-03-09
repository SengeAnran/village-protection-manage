<template>
  <div class="content">
    <div class="left-content">
      <Map v-if="showBar"></Map>
    </div>
    <div class="right-content">
      <top-data />
      <Sort />
    </div>
  </div>
</template>

<script>
import Map from './Map/index';
import TopData from './TopData';
import Sort from './Sort';
export default {
  name: 'index',
  components: {
    Map,
    TopData,
    Sort,
  },
  data() {
    return {
      showBar: true,
      flag: true,
    };
  },
  mounted() {
    window.addEventListener('resize', () => {
      if (this.flag) {
        this.flag = false;
        this.showBar = false;
        setTimeout(() => {
          this.flag = true;
          this.showBar = true;
        }, 200);
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  & > div {
    flex: 1;
  }
}
</style>
