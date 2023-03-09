<template>
  <div class="bar-chart">
    <div
      class="line_charts"
      ref="charts"
      :style="{ zoom: zoom, transform: `scale(${1 / zoom}, ${1 / zoom})`, transformOrigin: '0 0' }"
    ></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  props: {
    batch: {
      type: String,
      default: '',
    },
    chartData: {
      type: Object,
      default: () => {
        return {
          name: '',
          name1: '',
          name2: '',
          name3: '',
          unit: '',
          xAxisData: [],
          dataList1: [],
          dataList2: [],
          dataList3: [],
          otherUnit: '',
        };
      },
    },
    hideTooltip: {
      type: Boolean,
      default: false,
    },
    hideLegend: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      charts: null,
      xAxisData: [],
      dataList1: [],
      dataList2: [],
      dataList3: [],
      dataList4: [],
      name1: '',
      name2: '',
      name3: '',
      data: [],
      timmerOneAnim: null,
      unit: '%',
      otherUnit: '个',
      zoom: 1,
    };
  },
  watch: {
    chartData: {
      handler: function (val) {
        this.$nextTick(() => {
          if (val.xAxisData) {
            this.loadData();
          }
        });
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {
    const charts = this.$refs.charts;
    this.charts = echarts.init(charts);
    // 消除zoom缩放导致鼠标偏移
    this.zoom = 1 / document.body.style.zoom;
  },
  methods: {
    setData() {
      if (!this.charts) return;
      this.charts.clear();
      this.charts.setOption(this.getOptions());
      this.charts.on('click', (params) => {
        if (params.name) {
          this.$emit('goDetail', params.name);
        }
      });
    },
    getOptions() {
      const option = {
        title: {
          text: this.chartData.name,
          textStyle: {
            fontSize: 16,
            fontFamily: 'PingFangSC-Regular, PingFang SC',
            color: ' #333333',
            fontWeight: 400,
          },
        },
        grid: {
          top: '28%',
          left: '10%',
          right: '10%',
          bottom: '15%',
        },
        legend: {
          show: !this.hideLegend,
          data: [this.name1], // 顶部样例
          right: 0,
          top: 0,
          textStyle: {
            color: 'rgba(0, 0, 0, 0.85)',
            fontSize: 12,
            fontFamily: 'PingFangSC-Regular, PingFang SC',
          },
          itemWidth: 10,
          itemHeight: 10,
        },
        tooltip: {
          // 标签
          show: !this.hideTooltip,
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器配置项。
            type: 'shadow',
          },
          textStyle: {
            color: '#fff',
            fontSize: 14,
          },
          borderColor: 'rgba(255, 255, 255, 0.4)',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          formatter: (params) => {
            //             let str = `
            // <div style="">
            //   <div style="">${params[0].name}</div>
            //   <div style="display: flex;"></div>
            // </div>`
            // let str = params[0].name + '<br />';
            let str = '';
            params.forEach((item) => {
              str += `<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;left:5px;background-color: ${item.color}
                                    "></span>
                                        ${item.seriesName}
                                        :
                                      ${item.value}${this.unit}
                                        <br/>`;
              // str += `<span style="font-size:16px;">&nbsp; &nbsp;${item.seriesName}:  &nbsp;&nbsp;${item.value}${this.unit}</span>
              //                           <br/>`;
            });
            return str;
          },
        },
        xAxis: {
          data: this.xAxisData,
          type: 'category',
          axisLine: {
            lineStyle: {
              color: 'rgba(255,255,255,0.5)',
            },
          },
          axisTick: {
            show: false,
            alignWithLabel: true,
          },
          splitArea: {
            color: '#f00',
            lineStyle: {
              color: '#f00',
            },
          },
          axisLabel: {
            color: '#666666',
            textStyle: {
              fontSize: 12,
            },
          },
          splitLine: {
            show: false,
          },
          boundaryGap: true,
        },
        yAxis: [
          {
            type: 'value',
            name: `(${this.unit})`,
            nameTextStyle: {
              align: 'center',
              color: '#8C8C8C',
              fontSize: 12,
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#F2F2F2',
                type: 'dashed',
              },
            },
            axisLine: {
              show: false,
              lineStyle: {
                // color: '#979797',
              },
            },
            axisLabel: {
              color: 'rgba(0, 0, 0, 0.45)',
              margin: 10,
              textStyle: {
                fontSize: 12,
              },
            },
            axisTick: {
              show: false,
            },
          },
        ],
        series: [
          {
            stack: 'AA',
            z: 1,
            name: this.name1,
            data: this.dataList1,
            type: 'bar',
            barMaxWidth: 'auto',
            barWidth: 10,
            itemStyle: {
              // color: {
              //   x: 0,
              //   y: 0,
              //   x2: 0,
              //   y2: 1,
              //   type: 'linear',
              //   global: false,
              //   colorStops: [
              //     {
              //       offset: 0,
              //       color: '#90E4FA',
              //     },
              //     {
              //       offset: 1,
              //       color: '#8CE1F9',
              //     },
              //   ],
              // },
              color: '#1492FF',
              borderRadius: [2, 2, 0, 0],
            },
            label: {
              show: false,
              position: 'top',
              distance: 10,
              color: '#fff',
            },
            // emphasis: {
            //   focus: 'series',
            //   tooltip: {
            //     textStyle: {
            //       color: '#fff',
            //       fontSize: 14,
            //     },
            //     borderColor: 'rgba(255, 255, 255, 0.4)',
            //     backgroundColor: 'rgba(0, 0, 0, 0.3)',
            //     formatter: (params) => {
            //       console.log(params);
            //     }
            //   },
            // },
          },
        ],
      };
      if (this.dataList2 && this.dataList2.length > 0) {
        option.series.push({
          stack: 'BB',
          show: false,
          type: 'bar',
          name: this.name2,
          barWidth: 10,
          itemStyle: {
            color: '#FED887',
            borderRadius: [2, 2, 0, 0],
          },
          label: {
            show: false,
            position: 'top',
            distance: 10,
            color: '#FFFFFF',
            textStyle: {
              fontSize: 22,
            },
          },
          data: this.dataList2,
        });
        option.legend.data.push(this.name2);
      }
      return option;
    },
    loadData() {
      const { xAxisData, dataList1, dataList2, dataList3, name1, name2, name3, otherUnit, unit } = this.chartData;
      this.xAxisData = xAxisData;
      this.dataList1 = dataList1;
      this.dataList2 = dataList2;
      this.dataList3 = dataList3;
      this.name1 = name1;
      this.name2 = name2;
      this.name3 = name3;
      if (otherUnit) {
        this.otherUnit = otherUnit;
      }
      if (unit) {
        this.unit = unit;
      }

      this.setData();
    },
  },
};
</script>
<style lang="scss" scoped>
.bar-chart {
  //background-color: pink;
  width: 100%;
  height: 100%;
  padding-top: 20px;
  padding-left: 12px;
  box-sizing: border-box;
  .line_charts {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
  }
}
.content {
  font-size: 1050px;
  color: #1e8dff;
}
</style>
