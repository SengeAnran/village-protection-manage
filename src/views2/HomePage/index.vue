<template>
  <div class="page">
    <!--    <top-fixed-box v-model="activeIndex" @toBox="toBox" />-->

    <top-fixed-box v-model="activeIndex" />
    <div class="content-box" :style="{ height: onlyShowDetail ? '100%' : 'calc(100vh - 282px)' }">
      <!--      项目调度-->
      <ProjectSchedul v-if="activeIndex === 0"></ProjectSchedul>
      <!--     验收评价 -->
      <AcceptanceEvaluationPage v-else></AcceptanceEvaluationPage>
      <!--      <BaseBox>-->
      <!--        &lt;!&ndash;        建设概况&ndash;&gt;-->
      <!--        <ConstructionOverview />-->
      <!--      </BaseBox>-->
      <!--      <BaseBox>-->
      <!--        &lt;!&ndash;        创建申报&ndash;&gt;-->
      <!--        <ConstructionDeclaration />-->
      <!--      </BaseBox>-->
      <!--      <BaseBox>-->
      <!--        &lt;!&ndash;        项目调度&ndash;&gt;-->
      <!--        <ProjectScheduling />-->
      <!--      </BaseBox>-->
      <!--      <BaseBox>-->
      <!--        &lt;!&ndash;        验收评价&ndash;&gt;-->
      <!--        <AcceptanceEvaluation />-->
      <!--      </BaseBox>-->
    </div>
  </div>
</template>

<script>
import ProjectSchedul from './Components/ProjectSchedul';
import AcceptanceEvaluationPage from './Components/AcceptanceEvaluationPage';
// import ConstructionOverview from './Components/ConstructionOverview';
// import ProjectScheduling from './Components/ProjectScheduling';
// import BaseBox from './Components/BaseBox';
import TopFixedBox from './Components/TopFixedBox.vue';
// import ConstructionDeclaration from './Components/ConstructionDeclaration';
// import AcceptanceEvaluation from './Components/AcceptanceEvaluation';
import { mapMutations, mapState } from 'vuex';
// import ExcellentCases from './Components/ExcellentCases';
export default {
  name: 'index',
  components: {
    ProjectSchedul,
    AcceptanceEvaluationPage,
    TopFixedBox,
    // ConstructionOverview,
    // ConstructionDeclaration,
    // AcceptanceEvaluation,
    // ExcellentCases,
    // BaseBox,
    // ProjectScheduling,
  },
  data() {
    return {
      activeIndex: 0,
      contentTopList: [], // 各模块的位置
      isClick: false,
    };
  },
  computed: {
    ...mapState({
      onlyShowDetail: (state) => state.app.onlyShowDetail,
    }),
  },
  watch: {
    // activeIndex(val) {
    //   this.toBox(val);
    // },
  },
  // mounted() {
  //   document.querySelector('.content-box').addEventListener('scroll', this.initScroll);
  // },
  // destroyed() {
  //   document.querySelector('.content-box').removeEventListener('scroll', this.initScroll);
  // },
  beforeDestroy() {
    this['home/RESET_DATA']();
  },
  methods: {
    ...mapMutations(['home/RESET_DATA']),
    // 点击到达模块
    // toBox(index) {
    //   this.isClick = true;
    //   const dom = document.querySelectorAll('.base-box')[index];
    //   const box = document.querySelector('.content-box');
    //   const offsetTop = dom.offsetTop - 57;
    //   box.scrollTo({
    //     top: offsetTop,
    //     behavior: 'smooth',
    //   });
    //   setTimeout(() => {
    //     this.isClick = false;
    //   });
    // },

    // 当到达某一模块展示对应的高亮
    // initScroll() {
    //   const dom = document.querySelector('.content-box');
    //   const scrollTop = dom.scrollTop;
    //   const divs = [...document.querySelectorAll('.base-box')];
    //   divs.forEach((item, index) => {
    //     this.contentTopList[index] = item.offsetTop - 58;
    //   });
    //   // 判断当前是否是点击定位的，如果不是，才有滚动定位的效果
    //   if (!this.isClick) {
    //     let navIndex = 0;
    //     this.contentTopList.forEach((i, index) => {
    //       if (scrollTop >= i) {
    //         navIndex = index;
    //       }
    //     });
    //     this.activeIndex = navIndex;
    //   }
    // },
  },
};
</script>

<style lang="scss" scoped>
.page {
  position: relative;
  width: calc(100% + 30px);
  transform: translateX(-15px);
  //margin-top: 58px;
  .all-page {
    position: absolute;
    right: 0;
    top: 0;
  }
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
