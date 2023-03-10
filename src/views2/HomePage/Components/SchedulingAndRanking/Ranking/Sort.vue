<template>
  <div class="sort">
    <base-min-title class="min-title">{{ name }}</base-min-title>
    <SortList :listData="listData" :bar-color="barColor" @goDetail="(val) => $emit('goDetail', val)"></SortList>
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
    // 条形图颜色
    barColor: {
      type: String,
      default: '#70ABF8',
    },
  },
  components: { SortList },
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
      outline: none;
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
  .min-title {
    display: block;
    margin-bottom: 21px;
  }
}
</style>
