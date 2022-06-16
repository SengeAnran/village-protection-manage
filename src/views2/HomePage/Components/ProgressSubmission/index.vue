<template>
  <div class="show-box">
    <div class="left-content">
    </div>
    <div class="right-content">
      <FinanceIncome v-if="false"/>
    </div>
  </div>
</template>

<script>
import FinanceIncome from "@/views2/HomePage/Components/ProgressSubmission/FinanceIncome";
export default {
  components: { FinanceIncome }
}
</script>

<style lang="scss" scoped>
.show-box {
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
</style>