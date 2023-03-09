<template>
  <div class="sort-list" ref="sortList">
    <div
      class="item"
      v-for="(item, index) in listData"
      :data-index="index"
      :key="index"
      @click="$emit('goDetail', item)"
    >
      <div class="name">{{ item.name }}</div>
      <div class="bar">
        <div class="bar-inter" :style="{ backgroundColor: barColor }"></div>
      </div>
      <div class="num">
        {{ item.value }}<span v-if="item.unit">{{ item.unit }}</span>
      </div>
      <div class="tip" v-if="item.tapList && item.tapList.length > 0">
        <div class="tip-item" v-for="(item2, index2) in item.tapList" :key="index2">
          <div class="tip-name">{{ item2.name }}</div>
          <div class="tip-value">{{ item2.value + item2.unit }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3';
export default {
  name: 'SortList',
  props: {
    listData: {
      type: Array,
      default: () => {
        return [
          {
            name: '杭州',
            value: 37,
            unit: '个',
          },
          {
            name: '湖州',
            value: 33,
            unit: '个',
          },
          {
            name: '杭州',
            value: 15,
            unit: '个',
          },
          {
            name: '杭州',
            value: 37,
            unit: '个',
          },
          {
            name: '湖州',
            value: 33,
            unit: '个',
          },
        ];
      },
    },
    // 条形图颜色
    barColor: {
      type: String,
      default: '#70ABF8',
    },
    // 是否展示标签
    showTooltip: {
      type: Boolean,
      default: false,
    },
    // 动画过渡时间
    transitionTime: {
      type: [String, Number],
      default: 1000,
    },
  },
  computed: {
    max() {
      const data = this.listData || [];
      const max = data.reduce((prev, cur) => (prev > cur.value ? prev : cur.value), 0);
      return max;
    },
  },
  watch: {
    listData() {
      this.$nextTick(() => {
        this.updateData(true);
      });
    },
  },
  mounted() {
    this.updateData(true);
  },
  methods: {
    updateData(animation) {
      const that = this;
      d3.select(this.$refs.sortList)
        .selectAll('.item')
        .each(function () {
          const slide = this;
          const index = parseInt(slide.getAttribute('data-index'), 10);
          const item = that.listData[index];
          const widthContainer = that.max === 0 ? '0%' : (item.value / (that.max * 1.1)) * 100 + '%';
          // console.log(widthContainer);
          const slideSelector = d3.select(slide);
          let blockSelector = slideSelector.select('.bar-inter');
          if (animation) {
            blockSelector = blockSelector.style('width', '40%').transition().duration(that.transitionTime);
          }
          blockSelector.style('width', widthContainer);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.sort-list {
  .item {
    cursor: pointer;
    margin: 6px 0;
    display: flex;
    position: relative;
    align-items: center;
    .name {
      min-width: 50px;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.45);
      line-height: 17px;
    }
    .bar {
      flex: 1;
      height: 10px;
      .bar-inter {
        border-radius: 2px;
        height: 100%;
      }
    }
    .num {
      margin-left: 10px;
      width: 40px;
      font-size: 12px;
      font-family: DINPro-Medium, DINPro;
      font-weight: 500;
      color: #333333;
      line-height: 15px;
    }
    .tip {
      z-index: 2;
      display: none;
      color: white;
      position: absolute;
      left: 50%;
      top: -150%;
      padding: 15px 9px;
      background: rgba(0, 0, 0, 0.6);
      box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.15);
      border-radius: 4px;
      .tip-item {
        min-width: 158px;
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        line-height: 22px;
        &:first-child {
          font-size: 16px;
          font-weight: 500;
          line-height: 22px;
        }
      }
    }
    &:hover .tip {
      display: inline-block;
    }
  }
}
</style>
