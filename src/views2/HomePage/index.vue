<template>
  <div class="page">
    <top-fixed-box :query="query" @changeArea="changeArea" />
    <div class="content-box">
      <BaseBox>
        <!--        建设概况-->
        <ConstructionOverview></ConstructionOverview>
      </BaseBox>
      <BaseBox>
        <ConstructionDeclaration />
      </BaseBox>
      <BaseBox>
        <div class="box-title">项目进度报送</div>
        <ProgressSubmission />
      </BaseBox>
      <BaseBox>
        <div class="box-title">验收评价</div>
        <AcceptanceEvaluation />
      </BaseBox>

      <div class="box-title">优秀案例</div>
      <ExcellentCases v-if="false" />
      <div class="box-title">未来乡村建设申报</div>
      <ConstructionDeclaration />
      <div class="box-title">项目进度报送</div>
      <ProgressSubmission />
      <div class="box-title">验收评价</div>
      <AcceptanceEvaluation />
      <div class="box-title">优秀案例</div>
      <ExcellentCases v-if="false" />
    </div>
  </div>
</template>

<script>
import ConstructionOverview from './Components/ConstructionOverview';
import BaseBox from './Components/BaseBox';
import TopFixedBox from './Components/TopFixedBox.vue';
import ConstructionDeclaration from './Components/ConstructionDeclaration';
import ProgressSubmission from './Components/ProgressSubmission';
import AcceptanceEvaluation from './Components/AcceptanceEvaluation';
import ExcellentCases from './Components/ExcellentCases';
export default {
  name: 'index',
  components: {
    TopFixedBox,
    ConstructionOverview,
    ConstructionDeclaration,
    ProgressSubmission,
    AcceptanceEvaluation,
    ExcellentCases,
    BaseBox,
  },
  data() {
    return {
      query: {
        areaId: '33',
        declarationBatch: '',
      },
    };
  },
  methods: {
    changeArea(val) {
      this.query.areaId = val.areaId;
      console.log(val);
    },
  },
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
