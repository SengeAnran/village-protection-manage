<template>
  <section class="">
    <base-box-item name="申报总数" :count="total" unit="个" :icon="iconUrl">
      <div class="left-content">
        <PieChart v-if="showBar" :list="pieDataList" :isPercent="false" unit="个" totalUnit="个" minTitle="申报总数" />
      </div>
      <div class="right-content">
        <BaseBarChart v-if="showBar" key="xmdd" :chart-data="chartData" @goDetail="goDetail" />
      </div>
    </base-box-item>
    <base-box-item name="评价等次总数" style="margin-top: 30px" :count="total2" unit="个" :icon="iconUrl2">
      <div class="left-content">
        <PieChart
          v-if="showBar"
          :list="pieDataList2"
          :color="chartData2.colors"
          :isPercent="false"
          unit="个"
          totalUnit="个"
          minTitle="申报总数"
        />
      </div>
      <div class="right-content">
        <BaseBarChart v-if="showBar" key="sbzs" :chart-data="chartData2" @goDetail="goDetail" />
      </div>
    </base-box-item>
    <base-box-item name="成效评分" style="margin-top: 30px" :icon="iconUrl3" hideNum>
      <div class="all-content">
        <el-select v-model="fraction" placeholder="请选择" @change="batchChange">
          <el-option v-for="item in batchOpt" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
        <BarChart v-if="showBar" key="2" :chart-data="chartData3" @goDetail="goDetail" />
      </div>
    </base-box-item>
    <base-box-item name="“一老一小”服务场景建设情况" style="margin-top: 30px" :icon="iconUrl4" hideNum>
      <div class="all-content">
        <label-info style="margin-top: 24px; margin-left: 20px" label="服务场景建设数" :num="total4" unit="个" />
        <BarChart v-if="showBar" key="3" :chart-data="chartData4" @goDetail="goDetail" hideLegend />
      </div>
    </base-box-item>
  </section>
</template>

<script>
import { selectOpt } from './data';
import { mapGetters } from 'vuex';
import PieChart from './PieChart';
import BarChart from './BarChart';
import { getAcceptanceStatistics, getEvaluationGradeCount } from '@/api2/homePage';
export default {
  components: { PieChart, BarChart },
  data() {
    return {
      pieDataList: [
        { name: '省级审核通过', value: 0 },
        { name: '市、县待上报', value: 0 },
        { name: '省级审核未通过', value: 0 },
      ],
      pieDataList2: [
        { name: '优秀', value: 0 },
        { name: '良好', value: 0 },
        { name: '合格', value: 0 },
      ],
      total: 0,
      total2: 0,
      total4: 0,
      showBar: true,
      flag: true,
      chartData: {
        name: '各地市创建申报情况',
        xAxisData: [],
        dataList1: [],
        dataList2: [],
        dataList3: [],
        name1: '审核通过',
        name2: '待上报',
        name3: '审核未通过',
        unit: '个',
      },
      chartData2: {
        name: '各地市评价等次情况',
        xAxisData: [],
        dataList1: [],
        dataList2: [],
        dataList3: [],
        name1: '优秀',
        name2: '良好',
        name3: '合格',
        colors: ['#70CD91', '#70ABF8', '#FED887'],
        unit: '个',
      },
      chartData3: {
        name: '',
        name1: '县自评得分',
        name2: '市评价得分',
        unit: '分',
        xAxisData: [],
        dataList1: [],
      },
      chartData4: {
        name: '各地市“一老一小”建设服务情况',
        name1: '服务场景建设数',
        unit: '个',
        xAxisData: [],
        dataList1: [],
      },
      listData: [],
      listData2: [],
      listData3: [],
      listData4: [],
      iconUrl: require('./icon.png'),
      iconUrl2: require('./icon2.png'),
      iconUrl3: require('./icon3.png'),
      iconUrl4: require('./icon4.png'),
      fraction: 0, //分数统计规则
      batchOpt: selectOpt,
      isGoing: false,
    };
  },
  computed: {
    ...mapGetters(['area', 'location', 'batch']),
  },
  watch: {
    area() {
      this.getData();
    },
    batch() {
      this.getData();
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
      this.fraction = 0;
      const data = {
        batch: this.batch,
        ...this.location,
      };
      getAcceptanceStatistics(data).then((res) => {
        const cityCountVOList = res?.cityCountVOList || [];
        this.listData = cityCountVOList;
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
        this.pieDataList[0].value = res.passTotalCount;
        this.pieDataList[1].value = res.readyPassTotalCount;
        this.pieDataList[2].value = res.noPassTotalCount;
        this.total = res?.declarationTotalCount || 0;
      });
      getEvaluationGradeCount(data).then((res) => {
        let gradeVOS = res?.gradeVOS || [];
        this.listData2 = gradeVOS;
        this.chartData2.xAxisData = gradeVOS.map((i) => {
          return i.name;
        });
        this.chartData4.xAxisData = this.chartData2.xAxisData;
        this.chartData3.xAxisData = this.chartData2.xAxisData;
        this.chartData4.dataList1 = gradeVOS.map((i) => {
          return i.oldSmallReportNum;
        });
        this.chartData3.dataList1 = gradeVOS.map((i) => {
          return i.totalCounty;
        });
        this.chartData3.dataList2 = gradeVOS.map((i) => {
          return i.totalCity;
        });
        this.chartData2.dataList1 = gradeVOS.map((i) => {
          return i.excellent;
        });
        this.chartData2.dataList2 = gradeVOS.map((i) => {
          return i.good;
        });
        this.chartData2.dataList3 = gradeVOS.map((i) => {
          return i.qualified;
        });
        this.pieDataList2[0].value = res.excellent;
        this.pieDataList2[1].value = res.good;
        this.pieDataList2[2].value = res.qualified;
        this.total2 = res.excellent + res.good + res.qualified;
        this.total4 = Number(res.oldSmallReportNum);
      });
    },
    goDetail(name) {
      const index = this.listData.findIndex((i) => i.name === name);
      if ((this.listData[index].id || this.listData[index].id === 0) && !this.isGoing) {
        // isGoing防止多次路由
        this.isGoing = true;
        this.$router.push({
          name: 'AcceptanceEvaluationDetails',
          query: {
            id: this.listData[index].id,
          },
        });
      }
    },
    getEffectivenessData(val) {
      const data = {
        batch: this.batch,
        fraction: val,
        ...this.location,
      };
      getEvaluationGradeCount(data).then((res) => {
        const { gradeVOS } = res;
        if (gradeVOS) {
          this.listData2 = gradeVOS;
          this.chartData3.xAxisData = gradeVOS.map((i) => {
            return i.name;
          });
          this.chartData3.dataList1 = gradeVOS.map((i) => {
            return i.totalCounty;
          });
          this.chartData3.dataList2 = gradeVOS.map((i) => {
            return i.totalCity;
          });
        }
        this.pieDataList2[0].value = res.excellent;
        this.pieDataList2[1].value = res.good;
        this.pieDataList2[2].value = res.qualified;
        this.total2 = res.excellent + res.good + res.qualified;
        this.total4 = Number(res.oldSmallReportNum);
      });
    },
    batchChange(val) {
      this.getEffectivenessData(val);
    },
  },
};
</script>

<style lang="scss" scoped>
.left-content {
  //width: 471px;
  flex: 1;
  height: 239px;
  //background-color: pink;
}
.right-content {
  flex: 1;
  //width: 540px;
  height: 239px;
  //background-color: pink;
}
.all-content {
  flex: 1;
  min-height: 219px;
  position: relative;
  .el-select {
    position: absolute;
    top: -20px;
    right: 5px;
  }
}
</style>
