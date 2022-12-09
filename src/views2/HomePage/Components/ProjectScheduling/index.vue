<template>
  <div class="project-scheduling">
    <button class="change-button"><span>首末排名</span></button>
    <div v-if="activeIndex">
      <base-box-item name="项目开工率" :count="total" unit="%" :icon="iconUrl" :fixed="1">
        <div class="left-content">
          <TotalTitle class="rall-num" name="项目总数" :count="otherNumber" unit="个" />
          <PieChart
            v-if="showBar"
            :list="pieDataList"
            :isPercent="false"
            unit="个"
            totalUnit="个"
            minTitle="申报总数"
          />
        </div>
        <div class="right-content">
          <BarChart v-if="showBar" key="1" :chart-data="chartData" />
        </div>
      </base-box-item>
      <base-box-item name="投资完成率" :count="total" unit="%" :icon="iconUrl2" :fixed="1">
        <div class="left-content">
          <!--          <TotalSummary :data="data" />-->
        </div>
        <div class="right-content">
          <BarChart v-if="showBar" key="1" :chart-data="chartData" />
        </div>
      </base-box-item>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import PieChart from './PieChart';
import BarChart from './BarChart';
import TotalTitle from './TotalTitle';
import { getCountVillage, getProjectRate } from '@/api2/homePage';
export default {
  components: { PieChart, BarChart, TotalTitle },
  data() {
    return {
      pieDataList: [
        { name: '已开工项目', value: 0, percent: 0 },
        { name: '未开工项目', value: 0, percent: 0 },
      ],
      otherNumber: 0,
      total: 0,
      showBar: true,
      flag: true,
      chartData: {
        name: '各地市项目开工情况',
        xAxisData: [],
        dataList1: [],
        dataList2: [],
      },
      iconUrl: require('./icon.png'),
      iconUrl2: require('./icon2.png'),
      activeIndex: true,
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
      const data = {
        batch: this.batch,
        ...this.location,
      };
      getProjectRate(data).then((res) => {
        this.pieDataList[0].value = res.startNum;
        this.pieDataList[0].percent = (res.startRate * 100).toFixed(1);
        this.pieDataList[1].percent = (res.notStartRate * 100).toFixed(1);
        this.pieDataList[1].value = res.notStartNum;
        this.total = res.startRate * 100;
        this.otherNumber = res.projectNum;
        this.chartData.xAxisData = res.projectCommencementRates.map((i) => {
          return i.name;
        });
        this.chartData.dataList1 = res.projectCommencementRates.map((i) => {
          return i.startNum;
        });
        this.chartData.dataList2 = res.projectCommencementRates.map((i) => {
          return i.notStartNum;
        });
      });
      getCountVillage(data).then((res) => {
        this.chartData.xAxisData = res.cityCountVOList.map((i) => {
          return i.name;
        });
        this.chartData.dataList1 = res.cityCountVOList.map((i) => {
          return i.passTotalCount;
        });
        this.chartData.dataList2 = res.cityCountVOList.map((i) => {
          return i.readyPassTotalCount;
        });
        this.chartData.dataList3 = res.cityCountVOList.map((i) => {
          return i.noPassTotalCount;
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.project-scheduling {
  position: relative;
  padding-top: 40px;
  .change-button {
    position: absolute;
    top: 0;
    right: 20px;
    width: 110px;
    height: 32px;
    background: #ffffff;
    border-radius: 4px;
    border: 1px solid #1492ff;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #1492ff;
    line-height: 22px;
    span::before {
      content: '';
      display: inline-block;
      width: 14px;
      height: 11px;
      background: url('./change_icon.png') no-repeat;
      background-size: 100% 100%;
    }
  }
  .left-content {
    //width: 471px;
    position: relative;
    flex: 1;
    height: 239px;
    //background-color: pink;
    .rall-num {
      position: absolute;
      top: 50px;
      left: 51.5%;
    }
  }
  .right-content {
    flex: 1;
    //width: 540px;
    height: 239px;
    //background-color: pink;
  }
}
</style>
