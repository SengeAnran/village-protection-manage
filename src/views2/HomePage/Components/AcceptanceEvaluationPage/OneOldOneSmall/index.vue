<template>
  <base-box-item-new class="rete-content" name="“一老一小”服务场景建设情况" :count="total" unit="个" :icon="iconUrl">
    <!--    <swiper :slides-per-view="3" :space-between="50" @swiper="onSwiper" @slideChange="onSlideChange">-->
    <!--      <swiper-slide>Slide 1</swiper-slide>-->
    <!--      <swiper-slide>Slide 2</swiper-slide>-->
    <!--      <swiper-slide>Slide 3</swiper-slide>-->
    <!--      ...-->
    <!--    </swiper>-->
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide class="swiper-item" v-for="(item, index) in swiperList" :key="index">
        <video :src="item.filePath" />
        <div class="name">{{ item.fileName }}</div>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </base-box-item-new>
</template>

<script>
import { mapGetters } from 'vuex';
import { getEvaluationGradeCount, getOldSmallVideo } from '@/api2/homePage';

import { swiper, swiperSlide } from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';

// import PieChart from '../../PieChart';

export default {
  components: { swiper, swiperSlide },
  data() {
    return {
      showBar: true,
      flag: true,
      iconUrl: require('./icon.png'),
      chartData: {
        name: '各地市“一老一小”服务场景建设情况',
        name1: '服务场景建设数',
        unit: '个',
        xAxisData: [],
        dataList1: [],
      },
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
  mounted() {
    this.getData();
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
    getData() {
      const data = {
        batch: this.batch,
        year: this.year,
        status: this.status,
        ...this.location,
      };
      getEvaluationGradeCount(data).then((res) => {
        this.total = Number(res.oldSmallReportNum);
      });
      getOldSmallVideo(data).then((res) => {
        if (res.length > 10) {
          this.swiperList = res.slice(0, 10);
          return;
        }
        this.swiperList = res;
      });
    },
    onSwiper(swiper) {
      console.log(swiper);
    },
    onSlideChange() {
      console.log('slide change');
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
      //width: 145px !important;
      height: 100px;
      background-color: pink;
      transform: scale(0.8);
    }
    .swiper-slide-active,
    .swiper-slide-duplicate-active {
      transform: scale(1);
    }
  }
}
</style>
