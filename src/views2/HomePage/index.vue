<template>
  <div class="page">
    <top-fixed-box v-model="activeIndex" @toBox="toBox" />
    <div class="content-box">
      <BaseBox>
        <!--        建设概况-->
        <ConstructionOverview />
      </BaseBox>
      <BaseBox>
        <!--        创建申报-->
        <ConstructionDeclaration />
      </BaseBox>
      <BaseBox>
        <!--        项目调度-->
        <ProjectScheduling />
      </BaseBox>
      <BaseBox>
        <!--        验收评价-->
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
import AcceptanceEvaluation from './Components/AcceptanceEvaluation';
import { mapMutations } from 'vuex';
// import ExcellentCases from './Components/ExcellentCases';
export default {
  name: 'index',
  components: {
    TopFixedBox,
    ConstructionOverview,
    ConstructionDeclaration,
    AcceptanceEvaluation,
    // ExcellentCases,
    BaseBox,
    ProjectScheduling,
  },
  data() {
    return {
      activeIndex: 0,
      contentTopList: [], // 各模块的位置
      isClick: false,
    };
  },
  watch: {
    // activeIndex(val) {
    //   this.toBox(val);
    // },
  },
  mounted() {
    document.querySelector('.content-box').addEventListener('scroll', this.initScroll);
  },
  destroyed() {
    document.querySelector('.content-box').removeEventListener('scroll', this.initScroll);
  },
  beforeDestroy() {
    this['home/RESET_DATA']();
  },
  methods: {
    ...mapMutations(['home/RESET_DATA']),
    toBox(index) {
      this.isClick = true;
      const dom = document.querySelectorAll('.base-box')[index];
      const box = document.querySelector('.content-box');
      const offsetTop = dom.offsetTop - 58;
      box.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
      setTimeout(() => {
        this.isClick = false;
      });
    },
    initScroll() {
      const dom = document.querySelector('.content-box');
      const scrollTop = dom.scrollTop;
      const divs = [...document.querySelectorAll('.base-box')];
      divs.forEach((item, index) => {
        this.contentTopList[index] = item.offsetTop - 58;
      });
      // 判断当前是否是点击定位的，如果不是，才有滚动定位的效果
      if (!this.isClick) {
        let navIndex = 0;
        this.contentTopList.forEach((i, index) => {
          if (scrollTop >= i) {
            navIndex = index;
          }
        });
        this.activeIndex = navIndex;
      }
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
