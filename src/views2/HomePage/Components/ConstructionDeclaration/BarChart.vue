<template>
  <div class="bar-chart">
    <div class="line_charts" ref="charts"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

// import { getFinancePublicTrend } from '@/api/Overview/CityEvolution/api';
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
          xAxisData: [],
          dataList1: [],
          dataList2: [],
          dataList3: [],
        };
      },
    },
  },
  name: 'CityEvolution',
  data() {
    return {
      charts: null,
      xAxisData: [],
      dataList1: [],
      dataList2: [],
      dataList3: [],
      dataList4: [],
      data: [],
      timmerOneAnim: null,
      unit: '个',
    };
  },
  watch: {
    chartData: {
      handler: function (val) {
        this.$nextTick(() => {
          if (val.xAxisData && val.xAxisData.length > 0) {
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
    // this.$nextTick(() => {
    //   this.loadData();
    // });

    // var count = 0;
    // if (this.timmerOneAnim) {
    //   clearInterval(this.timmerOneAnim);
    // }
    // this.timmerOneAnim = setInterval(() => {
    //   this.charts.dispatchAction({
    //     type: 'showTip',
    //     seriesIndex: 0,
    //     dataIndex: count % this.dataList1.length,
    //   });
    //   count++;
    // }, 4500);
  },
  methods: {
    setData() {
      this.charts.clear();
      this.charts.setOption(this.getOptions());
    },
    getOptions() {
      const option = {
        grid: {
          top: '28%',
          left: '10%',
          right: '10%',
          bottom: '15%',
        },
        legend: {
          show: true,
          data: ['审核通过', '待审核', '审核未通过'],
          left: 60,
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
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器配置项。
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
            let str = params[0].name + '<br />';
            str += `&nbsp; &nbsp;  <em>申报总数</em>: ${params[0].value + params[1].value + params[2].value}${this.unit}<br/>`;
            params.forEach((item) => {
              str += `<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;left:5px;background-color: ${item.color}
                                    "></span>
                                        ${item.seriesName}
                                        :
                                      ${item.value}${this.unit}
                                        <br/>`;
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
            name: '审核通过',
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
          {
            stack: 'AA',
            type: 'bar',
            name: '待审核',
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
          },
          {
            stack: 'AA',
            z: 1,
            name: '审核未通过',
            data: this.dataList3,
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
              color: '#FF9D9D',
              borderRadius: [2, 2, 0, 0],
            },
            label: {
              show: false,
              position: 'top',
              distance: 10,
              color: '#fff',
            },
          },
        ],
      };
      return option;
    },
    loadData() {
      const { xAxisData, dataList1, dataList2, dataList3, dataList4 } = this.chartData;
      this.xAxisData = xAxisData;
      this.dataList1 = dataList1;
      this.dataList2 = dataList2;
      this.dataList3 = dataList3;
      this.dataList4 = dataList4;
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
  padding-left: 20px;
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
