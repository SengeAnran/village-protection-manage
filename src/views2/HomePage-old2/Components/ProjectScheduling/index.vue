<template>
  <div class="project-scheduling">
    <button class="change-button" @click="activeIndex = !activeIndex">
      <span>{{ activeIndex ? '首末排名' : '关键指标' }}</span>
    </button>
    <Content1 v-if="activeIndex"></Content1>
    <Content2 class="content2" v-if="!activeIndex"></Content2>
    <!-- 报送预警   -->
    <SubmitEarlyWarn />
  </div>
</template>

<script>
import Content1 from '@/views2/HomePage/Components/ProjectScheduling/Content1/index';
import Content2 from '@/views2/HomePage/Components/ProjectScheduling/Content2/index';
import SubmitEarlyWarn from './SubmitEarlyWarn/index';
export default {
  components: { Content1, Content2, SubmitEarlyWarn },
  data() {
    return {
      activeIndex: true,
    };
  },
};
</script>

<style lang="scss" scoped>
.project-scheduling {
  position: relative;
  padding-top: 40px;
  .change-button {
    outline: none;
    position: absolute;
    top: 0;
    right: 20px;
    width: 110px;
    height: 32px;
    background: #ffffff;
    border-radius: 4px;
    border: 1px solid #1492ff;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #1492ff;
    line-height: 22px;
    span::before {
      content: '';
      display: inline-block;
      margin-right: 8px;
      width: 14px;
      height: 11px;
      background: url('./change_icon.png') no-repeat;
      background-size: 100% 100%;
    }
  }
  .left-content {
    //width: 471px;
    position: relative;
    flex: 1;
    height: 239px;
    //background-color: pink;
    .rall-num {
      position: absolute;
      top: 50px;
      left: 51.5%;
    }
  }
  .right-content {
    flex: 1;
    //width: 540px;
    height: 239px;
    //background-color: pink;
  }
  .content2 {
    padding: 0 20px;
  }
}
</style>
