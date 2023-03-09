<template>
  <div class="page-content">
    <section class="left-content">
      <div class="left-top">
        <BaseBox class="left-top-left">
          <Map v-if="showBar"></Map>
        </BaseBox>
        <div class="left-top-right">
          <BaseBox class="height-184">
            <ProjectCommencementRate></ProjectCommencementRate>
          </BaseBox>
          <BaseBox class="height-184">
            <OverallProgress></OverallProgress>
          </BaseBox>
        </div>
      </div>
      <div class="left-bottom"></div>
    </section>
    <section class="right-content">
      <div class="right-top">
        <BaseBox class="height-184">
          <InvestmentCompletionRate></InvestmentCompletionRate>
        </BaseBox>
      </div>
      <div class="right-bottom"></div>
    </section>
  </div>
</template>

<script>
import Map from '../Map';
import BaseBox from '@/views2/HomePage/Components/BaseBox';
import ProjectCommencementRate from '@/views2/HomePage/Components/ProjectCommencementRate';
import InvestmentCompletionRate from '@/views2/HomePage/Components/InvestmentCompletionRate';
import OverallProgress from '@/views2/HomePage/Components/OverallProgress';
export default {
  name: 'index',
  components: {
    Map,
    BaseBox,
    ProjectCommencementRate,
    InvestmentCompletionRate,
    OverallProgress,
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
.page-content {
  height: 649px;
  display: flex;
  .left-content {
    flex: 2;
    background-color: #1e8dff;
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
    background-color: pink;
    flex: 1;
  }
}
</style>
