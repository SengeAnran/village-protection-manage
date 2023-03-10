<template>
  <div class="sc-and-rand">
    <Scheduling v-if="showScheduling" />
    <Ranking v-else />
    <div class="change-btn" @click="showScheduling = !showScheduling"></div>
  </div>
</template>

<script>
import Scheduling from './Scheduling';
import Ranking from './Ranking';
export default {
  name: 'index',
  components: { Scheduling, Ranking },
  data() {
    return {
      showScheduling: true,
    };
  },
};
</script>

<style lang="scss" scoped>
.sc-and-rand {
  position: relative;
  height: 100%;
  .change-btn {
    cursor: pointer;
    position: absolute;
    left: 237px;
    top: 4px;
    width: 16px;
    height: 16px;
    background: url('./change.png') no-repeat;
    background-size: 100% 100%;
  }
}
</style>
