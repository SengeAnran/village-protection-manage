<template>
  <div>
    <div class="g-txt">
      <span>{{ name }}</span>
      <span>{{ count }}个</span>
    </div>
    <div class="g-rect-border" :style="{ borderColor: colorRgb(color, 0.25) }">
      <div class="g-rect" :style="{ width: processWidth }">
        <div class="g-rect-fill" :style="{ background: color }"></div>
      </div>
    </div>
    <div class="g-slice-wrp" :style="{ width: processWidth }">
      <div class="g-slice">
        <div class="triangle" :style="{ borderBottomColor: colorRgb(color, 0.8) }"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { colorRgb } from '@/utils/data';
export default {
  name: 'TotalItem',
  props: {
    color: {
      type: String,
      default: '#70abf8',
    },
    name: {
      type: String,
    },
    count: {
      type: [String, Number],
      default: 0,
    },
    total: {
      type: [String, Number],
      default: 1,
    },
  },
  computed: {
    processWidth() {
      const total = !this.total ? 1 : this.total;
      return `${(this.count / total) * 100}%`;
    },
  },
  methods: {
    colorRgb(color, opacity) {
      return colorRgb(color, opacity);
    },
  },
};
</script>
<style lang="scss" scoped>
.g-txt {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  color: #333333;
  line-height: 20px;
  margin-bottom: 2px;
  & span:last-child {
    font-size: 14px;
  }
}
.g-rect-border {
  width: 100%;
  height: 16px;
  padding: 3px;
  background: #ffffff;
  border-radius: 3px;
  border: 1px solid #dcebff;
  .g-rect {
    transition: width 0.6s 0.3s;
    .g-rect-fill {
      width: 0px;
      height: 8px;
      background: #70abf8;
      border-radius: 2px;
      animation: widthAnimate 1s forwards;
    }
  }
}
.g-slice-wrp {
  width: 100%;
  transition: width 0.6s 0.3s;
  padding: 0 3px;
}
.g-slice {
  position: relative;
  animation: widthAnimate 1s forwards;
  .triangle {
    position: absolute;
    display: inline-block;
    border: solid 7px transparent;
    border-left-width: 6px;
    border-right-width: 6px;
    border-bottom-color: #b2ebf2;
    transform: translateY(-6px);
    margin-right: -5px;
    right: 0;
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
