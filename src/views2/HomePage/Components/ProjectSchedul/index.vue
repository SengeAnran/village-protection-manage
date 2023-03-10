<template>
  <div class="page-content">
    <section class="left-content">
      <div class="left-top">
        <BaseBox class="left-top-left">
          <Map v-if="showBar"></Map>
        </BaseBox>
        <div class="left-top-right">
          <BaseBox class="height-184">
            <!--            项目开工率-->
            <ProjectCommencementRate></ProjectCommencementRate>
          </BaseBox>
          <BaseBox class="height-184">
            <!--            总体进度-->
            <OverallProgress></OverallProgress>
          </BaseBox>
        </div>
      </div>
      <div class="left-bottom">
        <!--        各地区项目调度情况 和首末排名-->
        <BaseBox class="height-298">
          <!--            总体进度-->
          <SchedulingAndRanking></SchedulingAndRanking>
        </BaseBox>
      </div>
    </section>
    <section class="right-content">
      <BaseBox class="height-184">
        <!--          投资完成率-->
        <InvestmentCompletionRate></InvestmentCompletionRate>
      </BaseBox>
      <BaseBox class="height-494">
        <!--          本月进度报送-->
        <ProgressSubmission></ProgressSubmission>
      </BaseBox>
    </section>
  </div>
</template>

<script>
import Map from '../Map';
import BaseBox from '@/views2/HomePage/Components/BaseBox';
import ProjectCommencementRate from '@/views2/HomePage/Components/ProjectCommencementRate';
import InvestmentCompletionRate from '@/views2/HomePage/Components/InvestmentCompletionRate';
import OverallProgress from '@/views2/HomePage/Components/OverallProgress';
import SchedulingAndRanking from '@/views2/HomePage/Components/SchedulingAndRanking';
import ProgressSubmission from '@/views2/HomePage/Components/ProgressSubmission';
export default {
  name: 'index',
  components: {
    Map,
    BaseBox,
    ProjectCommencementRate,
    InvestmentCompletionRate,
    OverallProgress,
    SchedulingAndRanking,
    ProgressSubmission,
  },
  data() {
    return {
      showBar: true,
      flag: true,
    };
  },
  mounted() {
    window.addEventListener('resize', () => {
      if (this.flag) {
        this.flag = false;
        this.showBar = false;
        setTimeout(() => {
          this.flag = true;
          this.showBar = true;
        }, 200);
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.height-184 {
  height: 184px;
}
.height-298 {
  height: 298px;
}
.height-494 {
  height: 494px;
}
.page-content {
  //height: 649px;
  display: flex;
  .left-content {
    flex: 2;
    //background-color: #1e8dff;
    .left-top {
      display: flex;
      .left-top-left {
        height: 380px;
        flex: 1;
      }
      .left-top-right {
        flex: 1;
        margin-left: 12px;
      }
    }
  }
  .right-content {
    margin-left: 12px;
    //background-color: pink;
    flex: 1;
  }
}
</style>
