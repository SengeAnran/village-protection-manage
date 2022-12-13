<template>
  <div class="content">
    <base-box-item name="项目开工率" :count="total" unit="%" :icon="iconUrl" :fixed="1">
      <div class="left-content">
        <Sort :list-data="dataList1" name="县（市、区）开工率排名" @changeType="changeType1" />
      </div>
      <div class="right-content">
        <Sort name="村庄开工率排名" />
      </div>
    </base-box-item>
    <base-box-item name="投资完成率" style="margin-top: 30px" :count="total2" unit="%" :icon="iconUrl2" :fixed="1">
      <div class="left-content">
        <Sort name="县（市、区）投资完成率排名" />
      </div>
      <div class="right-content">
        <Sort />
      </div>
    </base-box-item>

    <base-box-item name="总体进度" style="margin-top: 30px" :count="total3" unit="%" :icon="iconUrl3" :fixed="1">
      <div class="left-content">
        <Sort />
      </div>
      <div class="right-content">
        <Sort />
      </div>
    </base-box-item>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Sort from './Sort';
import {
  getProgressReport,
  getProgressReportTotal,
  getProjectCommencementRate5thPro,
  getProjectRate,
} from '@/api2/homePage';
export default {
  components: { Sort },
  data() {
    return {
      total: 0,
      total2: 0,
      total3: 0,
      iconUrl: require('./icon.png'),
      iconUrl2: require('./icon2.png'),
      iconUrl3: require('./icon3.png'),
      dataList1: [],
      dataList2: [],
      dataList3: [],
      dataList4: [],
      dataList5: [],
      dataList6: [],
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
      //项目开工率
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
          return (i.rate * 100).toFixed(1) || 0;
        });
        this.chartData.dataList2 = res.projectCommencementRates.map((i) => {
          return i.startNum;
        });
        this.chartData.dataList3 = res.projectCommencementRates.map((i) => {
          return i.notStartNum;
        });
      });
      //投资完成率
      getProgressReportTotal(data).then((res) => {
        // 投资完成率
        this.total2 = res.rate * 100;
        this.data = res;
      });
      getProgressReport(data).then((res) => {
        // 投资完成率
        this.chartData2.xAxisData = res.map((i) => {
          return i.name;
        });
        this.chartData3.xAxisData = this.chartData2.xAxisData;
        this.chartData2.dataList1 = res.map((i) => {
          return (i.rate * 100).toFixed(1) || 0;
        });
        this.chartData3.dataList1 = res.map((i) => {
          return (i.overallProgress * 1).toFixed(2);
        });
        this.chartData2.dataList2 = res.map((i) => {
          return (i.investNum * 1).toFixed(2);
        });
        this.chartData2.dataList3 = res.map((i) => {
          return (i.completeTotal * 1).toFixed(2);
        });
      });
      //
    },
    changeType1(val = true) {
      const data = {
        batch: this.batch,
        ...this.location,
        order: val ? 0 : 1,
      };
      getProjectCommencementRate5thPro(data).then((res) => {
        this.dataList1 = res.map((i) => {
          return {
            name: i.name,
            value: i.rate || 0,
            unit: '%',
            tapList: [
              {
                name: '项目开工率',
                value: i.rate || 0,
                unit: '%',
              },
              {
                name: '已开工项目数',
                value: i.startNum || 0,
                unit: '个',
              },
              {
                name: '未开工项目数',
                value: i.notNum || 0,
                unit: '个',
              },
            ],
          };
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
      background: url('../change_icon.png') no-repeat;
      background-size: 100% 100%;
    }
  }
  .left-content {
    //width: 471px;
    position: relative;
    flex: 1;
    height: 239px;
    //background-color: pink;
    margin-right: 32px;
  }
  .right-content {
    flex: 1;
    //width: 540px;
    height: 239px;
    //background-color: pink;
  }
  .all-content {
    flex: 1;
    height: 219px;
  }
}
</style>
