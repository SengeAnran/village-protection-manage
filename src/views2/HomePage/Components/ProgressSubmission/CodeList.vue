<template>
  <div class="code-list">
    <div
      class="code-item"
      v-for="(item, index) in codeDataList"
      @click="$emit('showCode', { type: item.label, index })"
      :key="index"
    >
      <img :src="item.imgUrl" alt="" />
      <label-info :label="item.label" :num="item.value" color="black" direction="top" unit="次" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CodeList',
  props: {
    codeDataList: {
      type: Array,
      default: () => {
        [
          {
            label: '未报送',
            value: 0,
            unit: '次',
            imgUrl: require('./red_code.png'),
          },
          {
            label: '报送超时',
            value: 0,
            unit: '次',
            imgUrl: require('./yellow_code.png'),
          },
          {
            label: '正常报送',
            value: 0,
            unit: '次',
            imgUrl: require('./green_code.png'),
          },
        ];
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.code-list {
  margin-top: 60px;
  display: flex;
  justify-content: space-around;
  text-align: center;
  .code-item {
    cursor: pointer;
    img {
      margin-bottom: 16px;
    }
    &::v-deep .label {
      margin-bottom: 5px;
    }
  }
}
</style>
