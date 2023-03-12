<template>
  <base-box-item-new class="rete-content" name="各地区项目调度情况" :icon="iconUrl" hideNum>
    <!--    <BarChart v-if="showBar" key="1" :chart-data="chartData" hideLegend @goDetail="goDetail" />-->
    <base-bar-chart
      v-if="showBar && (type === '创建申报' || type === '验收评价' || type === '评价等次')"
      key="1"
      showName
      :chart-data="chartData"
      @goDetail="goDetail"
    />
    <base-bar-chart-more
      v-if="showBar && type === '成效评分'"
      key="2"
      showName
      left
      :chart-data="chartData2"
      @goDetail="goDetail"
    />
    <el-select class="select" v-model="type" placeholder="请选择" @change="getData">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
    </el-select>
  </base-box-item-new>
</template>

<script>
import { mapGetters } from 'vuex';
import { getAcceptanceStatistics, getCountVillage, getEvaluationGradeCount } from '@/api2/homePage';
// import BarChart from './BarChart';

export default {
  // components: { BarChart },
  data() {
    return {
      total: 0,
      showBar: true,
      flag: true,
      iconUrl: require('./icon.png'),
      chartData: {
        name: '',
        xAxisData: [],
        dataList1: [],
        dataList2: [],
        dataList3: [],
        name1: '审核通过',
        name2: '市、县带上报',
        name3: '审核未通过',
        unit: '个',
      },
      chartData2: {
        name: '',
        name1: '县自评得分',
        name2: '市评价得分',
        unit: '分',
        xAxisData: [],
        dataList1: [],
        dataList2: [],
      },
      type: '创建申报',
      options: [
        {
          value: '创建申报',
          label: '创建申报',
        },
        {
          value: '验收评价',
          label: '验收评价',
        },
        {
          value: '评价等次',
          label: '评价等次',
        },
        {
          value: '成效评分',
          label: '成效评分',
        },
      ],
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
    async getData() {
      this.showBar = false;
      switch (this.type) {
        case '创建申报':
          {
            this.getDate1();
          }
          break;
        case '验收评价':
          {
            this.getDate2();
          }
          break;
        case '评价等次':
          {
            this.getDate3();
          }
          break;
        case '成效评分':
          {
            this.getDate4();
          }
          break;
      }
    },
    //创建申报
    getDate1() {
      this.chartData.name1 = '审核通过';
      this.chartData.name2 = '市、县带上报';
      this.chartData.name3 = '审核未通过';
      this.chartData.unit = '个';
      const data = {
        batch: this.batch,
        year: this.year,
        status: this.status,
        ...this.location,
      };
      getCountVillage(data).then((res) => {
        const { cityCountVOList } = res;
        if (cityCountVOList && cityCountVOList.length > 0) {
          this.chartData.xAxisData = cityCountVOList.map((i) => {
            return i.name;
          });
          this.chartData.dataList1 = cityCountVOList.map((i) => {
            return i.passTotalCount;
          });
          this.chartData.dataList2 = cityCountVOList.map((i) => {
            return i.readyPassTotalCount;
          });
          this.chartData.dataList3 = cityCountVOList.map((i) => {
            return i.noPassTotalCount;
          });
        } else {
          this.chartData.xAxisData = [];
          this.chartData.dataList1 = [];
          this.chartData.dataList2 = [];
          this.chartData.dataList3 = [];
        }
        this.showBar = true;
      });
    },
    //验收评价
    getDate2() {
      this.chartData.name1 = '审核通过';
      this.chartData.name2 = '市、县带上报';
      this.chartData.name3 = '审核未通过';
      this.chartData.unit = '个';
      const data = {
        batch: this.batch,
        year: this.year,
        status: this.status,
        ...this.location,
      };
      getAcceptanceStatistics(data).then((res) => {
        const cityCountVOList = res?.cityCountVOList || [];
        if (cityCountVOList && cityCountVOList.length > 0) {
          this.chartData.xAxisData = cityCountVOList.map((i) => {
            return i.name;
          });
          this.chartData.dataList1 = cityCountVOList.map((i) => {
            return i.passTotalCount;
          });
          this.chartData.dataList2 = cityCountVOList.map((i) => {
            return i.readyPassTotalCount;
          });
          this.chartData.dataList3 = cityCountVOList.map((i) => {
            return i.noPassTotalCount;
          });
        } else {
          this.chartData.xAxisData = [];
          this.chartData.dataList1 = [];
          this.chartData.dataList2 = [];
          this.chartData.dataList3 = [];
        }
        this.showBar = true;
      });
    },
    // 评价等次
    getDate3() {
      this.chartData.name1 = '优秀';
      this.chartData.name2 = '良好';
      this.chartData.name3 = '合格';
      this.chartData.unit = '个';
      const data = {
        batch: this.batch,
        year: this.year,
        status: this.status,
        ...this.location,
      };
      getEvaluationGradeCount(data).then((res) => {
        const cityCountVOList = res?.gradeVOS || [];
        if (cityCountVOList && cityCountVOList.length > 0) {
          this.chartData.xAxisData = cityCountVOList.map((i) => {
            return i.name;
          });
          this.chartData.dataList1 = cityCountVOList.map((i) => {
            return i.excellent;
          });
          this.chartData.dataList2 = cityCountVOList.map((i) => {
            return i.good;
          });
          this.chartData.dataList3 = cityCountVOList.map((i) => {
            return i.qualified;
          });
        } else {
          this.chartData.xAxisData = [];
          this.chartData.dataList1 = [];
          this.chartData.dataList2 = [];
          this.chartData.dataList3 = [];
        }
        this.showBar = true;
      });
    },
    // 成效评分
    getDate4() {
      const data = {
        batch: this.batch,
        year: this.year,
        status: this.status,
        ...this.location,
      };
      getEvaluationGradeCount(data).then((res) => {
        const cityCountVOList = res?.gradeVOS || [];
        if (cityCountVOList && cityCountVOList.length > 0) {
          this.chartData2.xAxisData = cityCountVOList.map((i) => {
            return i.name;
          });
          this.chartData2.dataList1 = cityCountVOList.map((i) => {
            return i.totalCity;
          });
          this.chartData2.dataList2 = cityCountVOList.map((i) => {
            return i.totalCounty;
          });
        } else {
          this.chartData2.xAxisData = [];
          this.chartData2.dataList1 = [];
          this.chartData2.dataList2 = [];
        }
        this.showBar = true;
      });
    },
    goDetail(name) {
      // 创建申报
      const index = this.listData.findIndex((i) => i.name === name);
      if ((this.listData[index].id || this.listData[index].id === 0) && !this.isGoing) {
        // isGoing防止多次路由
        this.isGoing = true;
        this.$router.push({
          name: 'villageDetails',
          query: {
            id: this.listData[index].id,
          },
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.rete-content {
  position: relative;
  height: 100%;
}
.select {
  position: absolute;
  top: -28px;
  right: 0;
}
</style>
