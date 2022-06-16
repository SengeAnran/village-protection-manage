<template>
  <div class="community_address">
    <div class="item_wrapper">
      <div class="line_charts" ref="charts"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import {getProjectProgressReport} from "@/api2/homePage";
// import { getFinancePublicTrend } from '@/api/Overview/CityEvolution/api';
export default {
  name: 'CityEvolution',
  data() {
    return {
      charts: null,
      xAxisData: [],
      financeIncome: [],
      publickPre: [],
      data: [],
      timmerOneAnim: null,
    };
  },
  mounted() {
    const charts = this.$refs.charts;
    this.charts = echarts.init(charts);
    this.loadData();
    // var count = 0;
    // if (this.timmerOneAnim) {
    //   clearInterval(this.timmerOneAnim);
    // }
    // this.timmerOneAnim = setInterval(() => {
    //   this.charts.dispatchAction({
    //     type: 'showTip',
    //     seriesIndex: 0,
    //     dataIndex: count % this.financeIncome.length,
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
          top: '15%',
          left: '10%',
          right: '10%',
          bottom: '15%',
        },
        legend: {
          show: false,
          data: ['财政总收入', '公共财政预算收入'],
          right: 30,
          top: 7,
          bottom: 7,
          textStyle: {
            color: '#FFFFFF',
            fontSize: 20,
            fontFamily: 'DIN Alternate',
          },
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
          textStyle: {
            color: '#fff',
            fontSize: 22,
          },
          borderColor: 'rgba(255, 255, 255, 0.4)',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
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
            color: '#FFFFFF',
            textStyle: {
              fontSize: 20,
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
            name: '亿元',
            nameTextStyle: {
              align: 'center',
              color: '#fff',
              fontSize: 20,
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: 'rgba(255,255,255,0.2)',
              },
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#979797',
              },
            },
            axisLabel: {
              color: '#FFFFFF',
              margin: 10,
              textStyle: {
                fontSize: 20,
              },
            },
            axisTick: {
              show: true,
            },
          },
        ],
        series: [
          {
            z: 1,
            name: '财政总收入',
            data: this.financeIncome,
            type: 'bar',
            barMaxWidth: 'auto',
            barWidth: 20,
            itemStyle: {
              color: {
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                type: 'linear',
                global: false,
                colorStops: [
                  {
                    offset: 0,
                    color: '#90E4FA',
                  },
                  {
                    offset: 1,
                    color: '#8CE1F9',
                  },
                ],
              },
            },
            label: {
              show: true,
              position: 'top',
              distance: 10,
              color: '#fff',
            },
          },
          {
            name: '财政总收入',
            type: 'pictorialBar',
            barMaxWidth: '20',
            symbol: 'diamond',
            symbolOffset: ['-100%', '50%'],
            symbolSize: [20, 20],
          },
          {
            name: '财政总收入',
            data: this.financeIncome,
            type: 'pictorialBar',
            barMaxWidth: '20',
            symbolPosition: 'end',
            symbol: 'diamond',
            symbolOffset: ['-60%', '-50%'],
            symbolSize: [20, 15],
            zlevel: 2,
            itemStyle: {
              normal: {
                borderColor: '#8bead4',
                borderWidth: 2,
                color: '#8bead4',
              },
            },
            tooltip: {
              show: false,
            },
          },

          {
            type: 'bar',
            name: '公共财政预算收入',
            barWidth: 20,
            itemStyle: {
              color: '#31EABC',
            },
            label: {
              show: true,
              position: 'top',
              distance: 10,
              color: '#FFFFFF',
              textStyle: {
                fontSize: 22,
              },
            },
            data: this.publickPre,
          },
          {
            type: 'pictorialBar',
            barMaxWidth: '20',
            symbol: 'diamond',
            symbolOffset: [0, '50%'],
            symbolSize: [20, 15],
          },
          {
            data: this.publickPre,
            type: 'pictorialBar',
            barMaxWidth: '20',
            symbolPosition: 'end',
            symbol: 'diamond',
            symbolOffset: ['60%', '-50%'],
            symbolSize: [20, 15],
            zlevel: 2,
            itemStyle: {
              normal: {
                borderColor: '#8bead4',
                borderWidth: 2,
                color: '#8bead4',
              },
            },
            tooltip: {
              show: false,
            },
          },
          {
            type: 'pictorialBar',
            barMaxWidth: '20',
            symbol: 'diamond',
            symbolOffset: [0, '50%'],
            symbolSize: [20, 15],
            zlevel: -2,
          },
        ],
      };
      return option;
    },
    async loadData() {
      const res = await getProjectProgressReport();
      console.log(res);
      const xAxisData = [];
      const financeIncome = [];
      const publickPre = [];
      res
        .reverse()
        .slice(res.length - 6)
        .forEach((item) => {
          xAxisData.push(item.nf);
          financeIncome.push(item.czsr);
          publickPre.push(item.ggys);
        });
      this.xAxisData = xAxisData;
      this.financeIncome = financeIncome;
      this.publickPre = publickPre;
      this.setData();
    },
  },
};
</script>
<style lang="scss" scoped>
.community_address {
  position: absolute;
  width: 840px;
  height: 550px;
  top: 550px;
  // top: 0;
  left: 0;
  padding-top: 20px;
  padding-left: 20px;
  box-sizing: border-box;
  .item_wrapper {
    margin-top: 65px;
    height: 460px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .line_charts {
      height: 460px;
      width: 100%;
      box-sizing: border-box;
    }
  }
}
</style>
