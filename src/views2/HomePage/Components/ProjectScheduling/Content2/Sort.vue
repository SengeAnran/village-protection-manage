<template>
  <div class="sort">
    <div class="btns">
      <button :class="{ active: activeIndex }" @click="changeType(true)">前五名</button>
      <button :class="{ active: !activeIndex }" @click="changeType(false)">后五名</button>
    </div>
    <base-min-title>{{ name }}</base-min-title>
    <SortList :listData="listData"></SortList>
  </div>
</template>

<script>
import SortList from '../../SortList';
export default {
  name: 'Sort',
  props: {
    listData: {
      type: Array,
      default: () => {},
    },
    name: {
      type: String,
      default: '',
    },
  },
  components: { SortList },
  data() {
    return {
      activeIndex: true,
    };
  },
  methods: {
    changeType(val) {
      this.activeIndex = val;
      this.$emit('changeType', val);
    },
  },
};
</script>

<style lang="scss" scoped>
.sort {
  padding-top: 25px;
  position: relative;
  .btns {
    position: absolute;
    top: 10px;
    right: 10px;
    button {
      width: 82px;
      height: 32px;
      border-radius: 19px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      line-height: 22px;
      background: #ffffff;
      color: #333333;
      border: 1px solid #cccccc;
      &:first-child {
        margin-right: 12px;
      }
    }
    .active {
      background: #1492ff;
      color: white;
      border: none;
    }
  }
}
</style>
