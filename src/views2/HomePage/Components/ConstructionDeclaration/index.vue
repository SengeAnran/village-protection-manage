<template>
  <div class="show-box">
    <div class="left-content">
      <PieChart
        :list="pieDataList"
        :isPercent="false"
        unit="个"
        showMinTitle
        total="378"
        totalUnit="个"
        minTitle="申报总数"
      />
    </div>
    <div class="right-content"></div>
  </div>
</template>

<script>
import PieChart from './PieChart';
export default {
  components: { PieChart },
  data() {
    return {
      pieDataList: [
        { name: '审核通过', value: 300 },
        { name: '待审核', value: 50 },
        { name: '审核未通过', value: 28 },
      ],
    };
  },
}
</script>

<style lang="scss" scoped>
.show-box {
  display: flex;
  justify-content: space-between;
  .left-content {
    //width: 471px;
    flex: 1;
    height: 239px;
    //background-color: pink;
  }
  .right-content {
    flex: 1.4;
    //width: 540px;
    height: 239px;
    //background-color: pink;
  }
}
</style>