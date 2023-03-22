<template>
  <base-box-item-new class="rete-content" name="本月进度报送" :icon="iconUrl" hideNum :fixed="1">
    <div class="detail" @click="dialogVisible = !dialogVisible">详情</div>
    <!--    <BarChart v-if="showBar" key="1" :chart-data="chartData" hideLegend @goDetail="goDetail" />-->
    <TotalTitle class="rall-num" name="调度村总数" :count="otherNumber" unit="个" />
    <div class="pie-chart">
      <PieChart v-if="showBar" :list="pieDataList" :isPercent="false" unit="个" totalUnit="个" minTitle="申报总数" />
    </div>

    <CodeList :code-data-list="codeDataList"></CodeList>
    <SubmissionDetails :dialog="dialogVisible" @closeView="dialogVisible = false" />
  </base-box-item-new>
</template>

<script>
import { mapGetters } from 'vuex';
import { getSubmitEarlyWarning } from '@/api2/homePage';

import PieChart from '../PieChart';
import TotalTitle from '../TotalTitle';
import CodeList from './CodeList';
import SubmissionDetails from './SubmissionDetails';

export default {
  components: { TotalTitle, PieChart, CodeList, SubmissionDetails },
  data() {
    return {
      showBar: true,
      flag: true,
      iconUrl: require('./icon.png'),
      pieDataList: [
        { name: '已报送', value: 0 },
        { name: '待报送', value: 0 },
        { name: '已竣工', value: 0 },
        { name: '未报送', value: 0 },
        { name: '报送结束', value: 0 },
      ],
      otherNumber: 0,
      codeDataList: [
        {
          label: '红码数',
          value: 0,
          unit: '次',
          imgUrl: require('./red_code.png'),
        },
        {
          label: '黄码数',
          value: 0,
          unit: '次',
          imgUrl: require('./yellow_code.png'),
        },
        {
          label: '绿码数',
          value: 0,
          unit: '次',
          imgUrl: require('./green_code.png'),
        },
      ],
      dialogVisible: false,
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
    getData() {
      const data = {
        batch: this.batch,
        year: this.year,
        status: this.status,
        ...this.location,
      };
      //项目开工率
      getSubmitEarlyWarning(data).then((res) => {
        this.pieDataList[0].value = res.normalSubmission || 0;
        this.pieDataList[1].value = res.toSubmit || 0;
        this.pieDataList[2].value = res.completed || 0;
        this.pieDataList[3].value = res.notSubmitted || 0;
        this.pieDataList[4].value = res.endNum || 0;
        this.otherNumber = res.totalNum;
        this.codeDataList[0].value = res?.red || 0;
        this.codeDataList[1].value = res?.yellow || 0;
        this.codeDataList[2].value = res?.green || 0;
        // if (res.length > 0) {
        //   const total =
        //     res.reduce((prev, cur) => {
        //       return prev + cur.overallProgress * 1;
        //     }, 0) / res.length;
        //   this.total = total.toFixed(1) * 1;
        // } else {
        //   this.total = 0;
        // }
      });
    },
    goDetail(name) {
      const index = this.listData.findIndex((i) => i.name === name);
      if (
        (this.listData[index].id || this.listData[index].id === 0) &&
        !this.isGoing &&
        this.listData[index].reportingTime
      ) {
        // isGoing防止多次路由
        this.isGoing = true;
        this.$router.push({
          name: 'ProgressSubmissionDetails',
          query: {
            id: this.listData[index].id,
            reportingTime: this.listData[index].reportingTime,
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
  .detail {
    cursor: pointer;
    position: absolute;
    right: 0;
    top: -43px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #1492ff;
    line-height: 22px;
  }
  .rall-num {
    margin-top: 17px;
    margin-bottom: 10px;
  }
  .pie-chart {
    height: 140px;
  }
}
</style>
