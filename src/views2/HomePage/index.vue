<template>
<div class="block">
  <top-data/>
  <div class="box-title">未来乡村建设申报</div>
  <ConstructionDeclaration/>
  <div class="box-title">项目进度报送</div>
  <ProgressSubmission/>
  <div class="box-title">验收评价</div>
  <AcceptanceEvaluation/>
  <div class="box-title">优秀案例</div>
  <ExcellentCases/>
</div>
</template>

<script>
import TopData from "./Components/TopData.vue";
import ConstructionDeclaration from './Components/ConstructionDeclaration';
import ProgressSubmission from './Components/ProgressSubmission';
import AcceptanceEvaluation from './Components/AcceptanceEvaluation';
import ExcellentCases from './Components/ExcellentCases';
export default {
  name: 'index',
  components: {TopData, ConstructionDeclaration, ProgressSubmission, AcceptanceEvaluation, ExcellentCases},
  data() {
    return {
    }
  },
}
</script>

<style lang="scss" scoped>
.box-title {
  height: 40px;
  background: #F5FAFF;
  line-height: 40px;
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
  padding-left: 20px;
  margin-bottom: 13px;
}
</style>