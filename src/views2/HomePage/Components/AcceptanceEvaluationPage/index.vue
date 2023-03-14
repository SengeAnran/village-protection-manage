<template>
  <div class="page-content">
    <section class="top-content">
      <BaseBox class="top-left">
        <Map v-if="showBar"></Map>
      </BaseBox>
      <div class="top-center">
        <BaseBox class="height-184">
          <!--            创建申报-->
          <CreateDeclaration></CreateDeclaration>
        </BaseBox>
        <BaseBox class="height-184">
          <!--            “一老一小”服务场景建设情况-->
          <OneOldOneSmall />
        </BaseBox>
      </div>
      <BaseBox class="top-right">
        <!--        验收评价和评价等次-->
        <AcceptanceEvaluation class="height-177" />
        <EvaluationGrade class="height-177" style="margin-top: 21px" />
      </BaseBox>
    </section>
    <section class="bottom-content">
      <BaseBox class="height-294">
        <!--          各地区创建验收情况-->
        <CreateValidation />
      </BaseBox>
    </section>
  </div>
</template>

<script>
import Map from '../Map';
import BaseBox from '@/views2/HomePage/Components/BaseBox';
import CreateDeclaration from '@/views2/HomePage/Components/AcceptanceEvaluationPage/CreateDeclaration';
import AcceptanceEvaluation from '@/views2/HomePage/Components/AcceptanceEvaluationPage/AcceptanceEvaluation';
import EvaluationGrade from '@/views2/HomePage/Components/AcceptanceEvaluationPage/EvaluationGrade';
import CreateValidation from '@/views2/HomePage/Components/AcceptanceEvaluationPage/CreateValidation';
import OneOldOneSmall from '@/views2/HomePage/Components/AcceptanceEvaluationPage/OneOldOneSmall';
import { mapGetters } from 'vuex';
export default {
  name: 'index',
  components: {
    Map,
    BaseBox,
    CreateDeclaration,
    AcceptanceEvaluation,
    EvaluationGrade,
    CreateValidation,
    OneOldOneSmall,
  },
  data() {
    return {
      showBar: true,
      flag: true,
    };
  },
  computed: {
    ...mapGetters(['onlyShowDetail']),
  },
  watch: {
    onlyShowDetail() {
      this.reloadShow();
    },
  },
  mounted() {
    window.addEventListener('resize', () => {
      this.reloadShow();
    });
  },
  methods: {
    reloadShow() {
      if (this.flag) {
        this.flag = false;
        this.showBar = false;
        setTimeout(() => {
          this.flag = true;
          this.showBar = true;
        }, 200);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.height-184 {
  height: 184px;
}
.height-177 {
  height: 168px !important;
}
.height-294 {
  height: 294px;
}
.height-494 {
  height: 491px;
}
.page-content {
  //height: 649px;
  .top-content {
    display: flex;
    //background-color: #1e8dff;
    .top-left {
      height: 380px;
      flex: 1;
    }
    .top-center {
      flex: 1;
      margin-left: 12px;
      margin-right: 12px;
    }
    .top-right {
      flex: 1;
    }
  }
  .bottom-content {
    //background-color: pink;
  }
}
</style>
