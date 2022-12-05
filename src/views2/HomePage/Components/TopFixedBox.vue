<template>
  <div class="box">
    <div class="titles-list">
      <div class="title-list-item" v-for="(item, index) in titleList" :key="index">{{ item }}</div>
    </div>
    <VillageSelectItem checkStrictly v-model="query.areaId" @change="changeArea" />
  </div>
</template>

<script>
export default {
  props: {
    query: {
      type: Object,
      default: () => {},
    },
  },
  name: 'TopFixedBox',
  data() {
    return {
      titleList: ['建设概况', '创建申报', '项目调度', '项目调度'],
    };
  },
  methods: {
    changeArea(val) {
      this.$emit('changeArea', val);
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  width: calc(100% - 30px);
  margin-left: 15px;
  display: flex;
  height: 48px;
  background: #f5faff;
  box-shadow: 0px 2px 6px 0px rgba(0, 62, 115, 0.19);
  .titles-list {
    display: flex;
    .title-list-item {
      font-size: 18px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #333333;
      line-height: 26px;
    }
  }
}
</style>
