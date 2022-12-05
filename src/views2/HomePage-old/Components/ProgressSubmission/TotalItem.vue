<template>
  <div>
    <div class="g-wrp">
      <div class="g-rect" :style="{ width: '100%', backgroundColor: backgroundColor }">
        <!--      <div class="g-rect" :style="{ width: socialWidth }">-->
        <div class="g-rect-fill"></div>
      </div>
      <!--      <div class="g-rect" :style="{ width: governmentWidth }">-->
      <!--        <div class="g-rect-fill"></div>-->
      <!--      </div>-->
    </div>
    <!--    <div class="g-legend">-->
    <!--      <div class="g-legend-item">-->
    <!--        <span class="g-legend-icon"></span>-->
    <!--        社会投资-->
    <!--      </div>-->
    <!--      <div class="g-legend-item">-->
    <!--        <span class="g-legend-icon"></span>-->
    <!--        政府投资-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
</template>
<script>
export default {
  name: 'TotalItem',
  props: {
    social: [Number, String],
    government: [Number, String],
    backgroundColor: [Number, String],
  },
  computed: {
    total() {
      return +this.social + this.government || 1;
    },
    socialWidth() {
      return `${(this.social / this.total) * 100}%`;
    },
    governmentWidth() {
      return `${(this.government / this.total) * 100}%`;
    },
  },
};
</script>
<style lang="scss" scoped>
.g-wrp {
  width: 100%;
  height: 16px;
  border-radius: 2px;
  border: 1px solid #f2f2f2;
  padding: 3px;
  display: flex;
  margin-bottom: 2px;
  overflow: hidden;
  .g-rect {
    width: 0;
    height: 8px;
    transition: width 0.6s 0.3s;
    border-radius: 2px 0px 0px 2px;
    overflow: hidden;
    .g-rect-fill {
      width: 100%;
      height: 100%;
      //background: #70abf8;
      animation: widthAnimate 1s forwards;
    }
    &:nth-child(2) {
      border-radius: 0px 2px 2px 0px;
      overflow: hidden;
      .g-rect-fill {
        width: 100%;
        height: 100%;
        background: #fed887;
      }
    }
  }
}
.g-legend {
  display: flex;
  .g-legend-item {
    width: 50%;
    line-height: 24px;
    // transition: width 0.6s 0.3s;
  }
  .g-legend-icon {
    display: inline-block;
    width: 10px;
    height: 10px;
    background: #70abf8;
    border-radius: 2px;
    margin-right: 4px;
  }
  .g-legend-item:nth-child(2) {
    .g-legend-icon {
      background: #fed887;
    }
  }
}
@keyframes widthAnimate {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}
</style>
