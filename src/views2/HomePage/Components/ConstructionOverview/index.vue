<template>
  <div class="content">
    <Map></Map>
    <div class="right-content">
      <top-data />
      <Sort />
    </div>
  </div>
</template>

<script>
import Map from './Map';
import TopData from './TopData';
import Sort from './Sort';
export default {
  name: 'index',
  components: {
    Map,
    TopData,
    Sort,
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
