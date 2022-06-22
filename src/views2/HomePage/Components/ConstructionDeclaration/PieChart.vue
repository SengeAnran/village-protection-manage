<template>
  <div class="chart" ref="pieChart"></div>
</template>

<script>
import * as echarts from 'echarts/lib/echarts';

export default {
  props: {
    list: {
      type: Array,
      default: () => [
        { name: '5A', value: 259 },
        { name: '4A', value: 131 },
        { name: '3A', value: 131 },
      ],
    },
    color: {
      type: Array,
      default: () => ['#70ABF8', '#FED887', '#FF9D9D', '#FFD6AF','#FF9E9F'],
    },
    total: {
      type: Number,
    },
    totalUnit: {
      type: String,
    },
    title: {
      type: String,
      default: '',
    },
    showMinTitle: {
      type: Boolean,
      default: false,
    },
    minTitle: {
      type: String,
      default: '',
    },
    center: {
      type: Array,
      default: () => ['20%', 'center'],
    },
    isPercent: {
      type: Boolean,
      default: true,
    },
    unit: {
      type: String,
      default: '',
    },
    itemGap: {
      type: Number,
      default: 20,
    },
    legendLeft: {
      type: String,
      default: '54%'
    }
  },
  watch: {
    list: {
      handler: function (val) {
        this.$nextTick(() => {
          if (typeof val === typeof []) {
            this.initChart();
          }
        });
      },
      immediate: false,
      deep: true,
    },
  },
  data() {
    return {};
  },
  mounted() {
    this.initChart();
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose();
      this.chart = null;
    }
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$refs.pieChart);
      this.chart.setOption(this.getOptions());
    },
    getOptions() {
      return {
        color: this.color,
        legend: {
          icon: 'roundRect',
          itemWidth: 8,
          itemHeight: 8,
          itemStyle: {
            borderWidth: 4,
            borderColor: 'rgba(91, 157, 254, 0.1)',
            // shadowBlur: 4,
          },
          // itemGap: this.itemGap,
          left: this.legendLeft,
          top: 'center',
          orient: 'vertical',
          textStyle: {
            padding: [0, 0, 0, 8],
            rich: {
              name: {
                fontSize: 12,
                fontFamily: 'PingFangSC-Regular, PingFang SC',
                color: '#666666',
                width: 50,
              },
              value: {
                fontSize: 14,
                fontFamily: 'DINPro-Regular, DINPro',
                color: '#333333',
                width: 30,
                align: 'right',
              },
              percent: {
                fontSize: 16,
                fontFamily: 'DINPro',
                fontWeight: 400,
                color: '#fff',
                width: 30,
                align: 'right',
              },
            },
          },
          formatter: (name) => {
            const item = this.list.find((d) => d.name === name);
            if (this.isPercent) {
              return [`{name|${name}}`, `         {percent|${item.percent}}`].join('');
            } else {
              return [`{name|${name}}`, `         {value|${item.value}${this.unit}}`].join('');
            }
          },
        },
        title: {
          show: this.showMinTitle,
          text: `{a|${this.total}}{c|${this.totalUnit}}\n {b|${this.minTitle}}`,
          top: '38%',
          textAlign: 'center',
          left: '18.5%',
          textStyle: {
            rich: {
              a: {
                color: '#1492FF',
                fontSize: 36,
                fontWeight: 'bold',
                fontFamily: 'Microsoft YaHei',
                padding: [0, 0, 0, 5],
              },
              b: {
                color: '#333333',
                fontSize: 12,
                fontFamily: 'Microsoft YaHei',
                // padding: [0, 0, 0, 10],
              },
              c: {
                color: '#1492FF',
                fontSize: 14,
                fontWeight: 'bold',
                fontFamily: 'Microsoft YaHei',
              }
            },
          },
        },
        series: [
          {
            type: 'pie',
            radius: ['44%', '58%'],
            center: this.center,
            label: {
              position: 'center',
              formatter: this.title,
              color: '#FEFEFE',
              fontSize: 14,
              lineHeight: 20,
              verticalAlign: 'bottom',
              fontFamily: 'Microsoft YaHei',
              fontWeight: 'bold',
            },
            data: this.list,
          },
          // {
          //   type: 'pie',
          //   center: this.center,
          //   radius: ['39%', '64%'],
          //   itemStyle: {
          //     color: {
          //       type: 'linear',
          //       x: 0,
          //       y: 0,
          //       x2: 0,
          //       y2: 1,
          //       colorStops: [
          //         {
          //           offset: 0,
          //           color: '#3551A45c',
          //         },
          //         {
          //           offset: 0.5,
          //           color: '#3D8EC45c',
          //         },
          //         {
          //           offset: 1,
          //           color: '#5ECDB05c',
          //         },
          //       ],
          //       global: false,
          //     },
          //   },
          //   scale: false,
          //   label: {
          //     show: false,
          //   },
          //   data: [1],
          //   z: -1,
          // },
        ],
      };
    },
  },
};
</script>
<style lang="scss" scoped>
  .chart{
    width: 100%;
    height: 100%;
    ::v-deep div {
      width: 100% !important;
      height: 100% !important;
    }
    //::v-deep canvas {
    //  width: 100% !important;
    //  height: 100% !important;
    //}
  }
</style>