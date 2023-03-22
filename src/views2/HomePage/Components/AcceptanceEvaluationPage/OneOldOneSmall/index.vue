<template>
  <base-box-item-new
    class="rete-content"
    name="“一老一小”服务场景建设完成情况"
    :count="total"
    unit="个"
    :icon="iconUrl"
  >
    <!--    <swiper :slides-per-view="3" :space-between="50" @swiper="onSwiper" @slideChange="onSlideChange">-->
    <!--      <swiper-slide>Slide 1</swiper-slide>-->
    <!--      <swiper-slide>Slide 2</swiper-slide>-->
    <!--      <swiper-slide>Slide 3</swiper-slide>-->
    <!--      ...-->
    <!--    </swiper>-->
    <swiper v-if="showSwiper" class="swiper" id="mySwiper" :options="swiperOption">
      <swiper-slide class="swiper-item" v-for="(item, index) in swiperList" :key="index">
        <video class="video-style" :src="item.filePath" />
        <div class="name">{{ item.fileId }}</div>
        <div class="paly" @click="palyVideo(item)"></div>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <ViewVideo :path="palyPath" :title="title" :dialog="showDialog" @closeView="showDialog = false" />
  </base-box-item-new>
</template>

<script>
import { mapGetters } from 'vuex';
import { getEvaluationGradeCount, getOldSmallVideo } from '@/api2/homePage';

import { swiper, swiperSlide } from 'vue-awesome-swiper';
import ViewVideo from './ViewVideo';
import 'swiper/dist/css/swiper.css';

// import PieChart from '../../PieChart';

export default {
  components: { swiper, swiperSlide, ViewVideo },
  data() {
    return {
      showBar: true,
      flag: true,
      iconUrl: require('./icon.png'),
      swiperOption: {
        loop: true,
        autoplay: {
          delay: 3000,
        },
        slidesPerView: 3,
        spaceBetween: -10,
        centeredSlides: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      },
      swiperList: [],
      total: 0,
      showSwiper: false,
      palyPath: '',
      title: '',
      showDialog: false,
    };
  },
  computed: {
    ...mapGetters(['area', 'location', 'batch', 'status']),
    query() {
      return {
        area: this.area,
        year: this.year,
        batch: this.batch,
        status: this.status,
      };
    },
  },
  watch: {
    query: {
      handler: function () {
        this.getData();
      },
      deep: true,
    },
  },
  created() {
    this.getData();
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
  methods: {
    async getData() {
      const data = {
        batch: this.batch,
        year: this.year,
        status: this.status,
        ...this.location,
      };
      const res = await getEvaluationGradeCount(data);
      this.total = Number(res.oldSmallReportNum);
      const res2 = await getOldSmallVideo(data);
      if (res2.length > 10) {
        this.swiperList = res2.slice(0, 10);
      } else {
        this.swiperList = res2;
      }

      this.showSwiper = true;
    },
    onSwiper(swiper) {
      console.log(swiper);
    },
    onSlideChange() {
      console.log('slide change');
    },
    palyVideo(item) {
      this.palyPath = item.filePath;
      this.title = item.fileId + '“一老一小服务场景“视频';
      this.showDialog = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.rete-content {
  position: relative;
  height: 100%;

  .swiper {
    margin-top: 15px;
    width: 365px;
    height: 100%;
    .swiper-item {
      position: relative;
      //width: 145px !important;
      height: 100px;
      //background-color: pink;
      transform: scale(0.8);
      .video-style {
        width: 145px;
        height: 82px;
        border-radius: 7px;
      }
      .name {
        text-align: center;
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
        line-height: 17px;
      }
      .paly {
        cursor: pointer;
        position: absolute;
        left: 50%;
        top: calc(50% - 10px);
        transform: translate(-50%, -50%);
        width: 24px;
        height: 24px;
        background: url('./play.png') no-repeat;
      }
    }
    .swiper-slide-active,
    .swiper-slide-duplicate-active {
      transform: scale(1);
    }
  }
}
</style>
