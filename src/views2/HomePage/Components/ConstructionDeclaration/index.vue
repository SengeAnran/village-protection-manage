<template>
  <div class="show-box">
    <div class="select-batch">
      <SelectBatch @changeSelect="changeSelect"/>
    </div>
    <div class="left-content">
      <PieChart
        :list="pieDataList"
        :isPercent="false"
        unit="个"
        showMinTitle
        :total="378"
        totalUnit="个"
        minTitle="申报总数"
      />
    </div>
    <div class="right-content"></div>
  </div>
</template>

<script>
import PieChart from './PieChart';
import SelectBatch from "@/views2/HomePage/Components/SelectBatch";
export default {
  components: { PieChart, SelectBatch },
  data() {
    return {
      pieDataList: [
        { name: '审核通过', value: 300 },
        { name: '待审核', value: 50 },
        { name: '审核未通过', value: 28 },
      ],
    };
  },
  methods: {
    changeSelect(val) {
      console.log(val);
    },
  },
}
</script>

<style lang="scss" scoped>
.show-box {
  position: relative;
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
.select-batch {
  position: absolute;
  right: 20px;
  top: 20px;
}
</style>