<template>
  <div class="base-box-item">
    <TotalTitle style="margin-left: 20px" v-bind="$attrs" />
    <div class="bottom-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import TotalTitle from './TotalTitle';
export default {
  name: 'index',
  components: { TotalTitle },
};
</script>

<style lang="scss" scoped>
.base-box-item {
  width: 100%;
  .bottom-content {
    position: relative;
    display: flex;
    justify-content: space-between;
  }
}
</style>
