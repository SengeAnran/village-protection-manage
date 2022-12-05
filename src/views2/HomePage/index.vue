<template>
  <div class="block">
    <top-fixed-box :query="query" />
    <top-data />
    <!--    <div class="box-title">未来乡村建设申报</div>-->
    <!--    <ConstructionDeclaration />-->
    <!--    <div class="box-title">项目进度报送</div>-->
    <!--    <ProgressSubmission />-->
    <!--    <div class="box-title">验收评价</div>-->
    <!--    <AcceptanceEvaluation />-->
    <!--    &lt;!&ndash;  <div class="box-title">优秀案例</div>&ndash;&gt;-->
    <!--    <ExcellentCases v-if="false" />-->
  </div>
</template>

<script>
import TopData from './Components/TopData.vue';
import TopFixedBox from './Components/TopFixedBox.vue';
import ConstructionDeclaration from './Components/ConstructionDeclaration';
import ProgressSubmission from './Components/ProgressSubmission';
import AcceptanceEvaluation from './Components/AcceptanceEvaluation';
import ExcellentCases from './Components/ExcellentCases';
export default {
  name: 'index',
  components: {
    TopFixedBox,
    TopData,
    ConstructionDeclaration,
    ProgressSubmission,
    AcceptanceEvaluation,
    ExcellentCases,
  },
  data() {
    return {
      query: {
        areaId: '',
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.block {
  position: relative;
  margin-top: 58px;
}
.box-title {
  height: 40px;
  background: #f5faff;
  line-height: 40px;
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
  padding-left: 20px;
  //margin-bottom: 13px;
}
</style>
