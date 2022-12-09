<template>
  <div class="page">
    <top-fixed-box />
    <div class="content-box">
      <BaseBox>
        <!--        建设概况-->
        <ConstructionOverview />
      </BaseBox>
      <BaseBox>
        <ConstructionDeclaration />
      </BaseBox>
      <BaseBox>
        <!--        项目调度-->
        <ProjectScheduling />
        <ProgressSubmission />
      </BaseBox>
      <BaseBox>
        <div class="box-title">验收评价</div>
        <AcceptanceEvaluation />
      </BaseBox>
    </div>
  </div>
</template>

<script>
import ConstructionOverview from './Components/ConstructionOverview';
import ProjectScheduling from './Components/ProjectScheduling';
import BaseBox from './Components/BaseBox';
import TopFixedBox from './Components/TopFixedBox.vue';
import ConstructionDeclaration from './Components/ConstructionDeclaration';
import ProgressSubmission from './Components/ProgressSubmission';
import AcceptanceEvaluation from './Components/AcceptanceEvaluation';
// import ExcellentCases from './Components/ExcellentCases';
export default {
  name: 'index',
  components: {
    TopFixedBox,
    ConstructionOverview,
    ConstructionDeclaration,
    ProgressSubmission,
    AcceptanceEvaluation,
    // ExcellentCases,
    BaseBox,
    ProjectScheduling,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.page {
  position: relative;
  width: calc(100% + 30px);
  transform: translateX(-15px);
  //margin-top: 58px;
}
.content-box {
  height: calc(100vh - 282px);
  padding: 10px 15px 0;
  overflow-y: scroll;
  overflow-x: hidden;
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
