<template>
<div class="bar-chart" ref="barChart">
</div>
</template>

<script>
import * as echarts from "echarts/lib/echarts";
import getOptions from "./options";
import { getEchartData } from "@/api/statistics";

export default {
  name: "bar",
  props: {
    query: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      list: [
        {
          name: '杭州市',
          value: '660',
        },
        {
          name: '宁波市',
          value: '360',
        },
        {
          name: '温州市',
          value: '790',
        },
        {
          name: '湖州市',
          value: '400',
        },
        {
          name: '绍兴市',
          value: '510',
        },
        {
          name: '金华市',
          value: '470',
        },
        {
          name: '衢州市',
          value: '270',
        },
        {
          name: '台州市',
          value: '470',
        },
        {
          name: '丽水市',
          value: '370',
        },
        {
          name: '舟山市',
          value: '700',
        },
        {
          name: '嘉兴市',
          value: '750',
        },
      ]
    }
  },
  watch: {
    query: {
      // immediate: true,
      handler(oldval, newval) {
        //console.log(oldval, newval);
        this.fetchData();
      },
      deep: true,
    },
  },
  mounted() {
    this.initChart()
    this.fetchData()
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$refs.barChart);
      this.chart.setOption(getOptions(this.list));
    },
    async fetchData() {
      const params = {
        declareType: this.query.declareType,
        declareYear: Number(this.query.declareYear),
      }
      const data = await getEchartData(params);
      //console.log(data)
      this.chart.setOption(getOptions(data.distributionList));
    }
  },
}
</script>

<style lang="scss" scoped>
.bar-chart {
  flex: none;
  height: 400px;
  width: 1423px;
  //width: 1123px;
}

</style>
