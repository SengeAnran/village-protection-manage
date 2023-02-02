<template>
  <div class="content">
    <base-box-item name="项目开工率" :count="total" unit="%" :icon="iconUrl" :fixed="1">
      <div class="left-content">
        <Sort :list-data="dataList1" name="县（市、区）开工率排名" @changeType="changeType1" @goDetail="goDetail" />
      </div>
      <div class="right-content">
        <Sort :list-data="dataList2" name="村庄开工率排名" @changeType="changeType2" @goDetail="goDetail" />
      </div>
    </base-box-item>
    <base-box-item name="投资完成率" style="margin-top: 30px" :count="total2" unit="%" :icon="iconUrl2" :fixed="1">
      <div class="left-content">
        <Sort
          :list-data="dataList3"
          bar-color="#817CFB"
          name="县（市、区）投资完成率排名"
          @changeType="changeType3"
          @goDetail="goDetail"
        />
      </div>
      <div class="right-content">
        <Sort
          :list-data="dataList4"
          bar-color="#817CFB"
          name="村庄投资完成率排名"
          @changeType="changeType4"
          @goDetail="goDetail"
        />
      </div>
    </base-box-item>

    <base-box-item name="总体进度" style="margin-top: 30px" :count="total3" unit="%" :icon="iconUrl3" :fixed="1">
      <div class="left-content">
        <Sort
          :list-data="dataList5"
          bar-color="#44CA9C"
          name="县（市、区）总体进度排名"
          @changeType="changeType5"
          @goDetail="goDetail"
        />
      </div>
      <div class="right-content">
        <Sort
          :list-data="dataList6"
          bar-color="#44CA9C"
          name="村庄总体进度排名"
          @changeType="changeType6"
          @goDetail="goDetail"
        />
      </div>
    </base-box-item>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Sort from './Sort';
import {
  getInvestmentCompletedRate5thPro,
  getInvestmentCompletedRate5thVillage,
  getOverallProgressRate5thPro,
  getOverallProgressRate5thVillage,
  getProgressReport,
  getProgressReportTotal,
  getProjectCommencementRate5thPro,
  getProjectCommencementRate5thVillage,
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
      this.changeType1();
      this.changeType2();
      this.changeType3();
      this.changeType4();
      this.changeType5();
      this.changeType6();
      //项目开工率
      getProjectRate(data).then((res) => {
        this.total = res.startRate * 100;
      });
      //投资完成率
      getProgressReportTotal(data).then((res) => {
        // 投资完成率
        this.total2 = res.rate * 100;
      });
      getProgressReport(data).then((res) => {
        if (res.length > 0) {
          const total =
            res.reduce((prev, cur) => {
              return prev + cur.overallProgress * 1;
            }, 0) / res.length;
          this.total3 = total.toFixed(1) * 1;
        } else {
          this.total3 = 0;
        }
      });
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
            value: i.rate * 100 || 0,
            unit: '%',
            tapList: [
              {
                name: '项目开工率',
                value: i.rate * 100 || 0,
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
            ...i,
          };
        });
      });
    },
    changeType2(val = true) {
      const data = {
        batch: this.batch,
        ...this.location,
        order: val ? 0 : 1,
      };
      getProjectCommencementRate5thVillage(data).then((res) => {
        this.dataList2 = res.map((i) => {
          return {
            name: i.name,
            value: i.rate * 100 || 0,
            unit: '%',
            tapList: [
              {
                name: '项目开工率',
                value: i.rate * 100 || 0,
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
            ...i,
          };
        });
      });
    },
    changeType3(val = true) {
      const data = {
        batch: this.batch,
        ...this.location,
        order: val ? 0 : 1,
      };
      getInvestmentCompletedRate5thPro(data).then((res) => {
        this.dataList3 = res.map((i) => {
          return {
            name: i.name,
            value: i.rate * 100 || 0,
            unit: '%',
            tapList: [
              {
                name: '投资完成率',
                value: i.rate * 100 || 0,
                unit: '%',
              },
              {
                name: '计划投资',
                value: i.investNum || 0,
                unit: '万',
              },
              {
                name: '完成投资',
                value: i.completeTotal || 0,
                unit: '万',
              },
            ],
            ...i,
          };
        });
      });
    },
    changeType4(val = true) {
      const data = {
        batch: this.batch,
        ...this.location,
        order: val ? 0 : 1,
      };
      getInvestmentCompletedRate5thVillage(data).then((res) => {
        this.dataList4 = res.map((i) => {
          return {
            name: i.name,
            value: i.rate * 100 || 0,
            unit: '%',
            tapList: [
              {
                name: '投资完成率',
                value: i.rate * 100 || 0,
                unit: '%',
              },
              {
                name: '计划投资',
                value: i.investNum || 0,
                unit: '万',
              },
              {
                name: '完成投资',
                value: i.completeTotal || 0,
                unit: '万',
              },
            ],
            ...i,
          };
        });
      });
    },
    changeType5(val = true) {
      const data = {
        batch: this.batch,
        ...this.location,
        order: val ? 0 : 1,
      };
      getOverallProgressRate5thPro(data).then((res) => {
        this.dataList5 = res.map((i) => {
          return {
            name: i.name,
            value: i.rate || 0,
            unit: '%',
            ...i,
            // tapList: [
            //   {
            //     name: '项目开工率',
            //     value: i.rate * 100 || 0,
            //     unit: '%',
            //   },
            //   {
            //     name: '已开工项目数',
            //     value: i.startNum || 0,
            //     unit: '个',
            //   },
            //   {
            //     name: '未开工项目数',
            //     value: i.notNum || 0,
            //     unit: '个',
            //   },
            // ],
          };
        });
      });
    },
    changeType6(val = true) {
      const data = {
        batch: this.batch,
        ...this.location,
        order: val ? 0 : 1,
      };
      getOverallProgressRate5thVillage(data).then((res) => {
        this.dataList6 = res.map((i) => {
          return {
            name: i.name,
            value: i.rate || 0,
            unit: '%',
            ...i,
          };
        });
      });
    },
    goDetail(val) {
      if ((val.id || val.id === 0) && !this.isGoing && val.reportingTime) {
        // isGoing防止多次路由
        this.isGoing = true;
        this.$router.push({
          name: 'ProgressSubmissionDetails',
          query: {
            id: val.id,
            reportingTime: val.reportingTime,
          },
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  &::v-deep .total-title-wrp {
    margin-left: 0 !important;
  }
}
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
    height: 210px;
    //background-color: pink;
    margin-right: 32px;
  }
  .right-content {
    flex: 1;
    //width: 540px;
    height: 210px;
    //background-color: pink;
  }
  .all-content {
    flex: 1;
    height: 219px;
  }
}
</style>
