<template>
  <div class="show-box">
    <div class="select-batch">
      <SelectBatch @changeSelect="changeSelect" />
    </div>
    <div class="left-content">
      <TotalSummary :data="data" />
    </div>
    <div class="right-content"></div>
  </div>
</template>

<script>
import SelectBatch from '@/views2/HomePage/Components/SelectBatch';
import TotalSummary from './TotalSummary.vue';
import { getAcceptanceStatistics } from '@/api2/homePage';

export default {
  components: { SelectBatch, TotalSummary },
  data() {
    return {
      batch: '',
      data: {},
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    changeSelect(val) {
      console.log(val);
    },
    getData() {
      getAcceptanceStatistics({ declarationBatch: this.batch }).then((res) => {
        this.data = res || {};
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.show-box {
  position: relative;
  height: 274px;
  display: flex;
  justify-content: space-between;
  .left-content {
    //width: 471px;
    flex: 1;
    height: 100%;
    //background-color: pink;
  }
  .right-content {
    flex: 1.4;
    //width: 540px;
    height: 100%;
    //background-color: pink;
  }
}
.select-batch {
  position: absolute;
  right: 20px;
  top: 20px;
}
</style>
