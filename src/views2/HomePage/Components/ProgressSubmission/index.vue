<template>
  <base-box-item-new class="rete-content" name="报送进度" :icon="iconUrl" hideNum :fixed="1">
    <div class="detail" @click="dialogVisible = !dialogVisible">详情</div>
    <!--    <BarChart v-if="showBar" key="1" :chart-data="chartData" hideLegend @goDetail="goDetail" />-->
    <TotalTitle class="rall-num" :name="totalName" :count="otherNumber" unit="个" />
    <div class="pie-chart">
      <div class="chart-box">
        <PieChart
          v-if="showBar"
          :list="pieDataList"
          :isPercent="false"
          unit="个"
          totalUnit="个"
          :color="colors"
          minTitle="申报总数"
        />
      </div>
      <div v-if="showBar" class="tip-list" :style="{ paddingTop: status ? '34px' : '20px' }">
        <div class="tip-list-item" v-for="(item, index) in tipList" :key="index">
          <img src="./imgs/tip-icon.svg" alt="" />
          <div class="tip-content">{{ item }}</div>
        </div>
      </div>
    </div>

    <CodeList :code-data-list="codeDataList" @showCode="showCode"></CodeList>
    <SubmissionDetails v-if="dialogVisible" :dialog="dialogVisible" @closeView="dialogVisible = false" />
    <EarlyWarnDetails
      v-if="EarlyWarnVisible"
      :dialog="EarlyWarnVisible"
      :defaultType="defaultType"
      @closeView="EarlyWarnVisible = false"
    />
  </base-box-item-new>
</template>

<script>
import { mapGetters } from 'vuex';
import { getSubmitEarlyWarning } from '@/api2/homePage';

import PieChart from './PieChart';
import TotalTitle from '../TotalTitle';
import CodeList from './CodeList';
import SubmissionDetails from './SubmissionDetails';
import EarlyWarnDetails from './EarlyWarnDetails';

export default {
  components: { TotalTitle, PieChart, CodeList, SubmissionDetails, EarlyWarnDetails },
  data() {
    return {
      showBar: true,
      flag: true,
      iconUrl: require('./icon.png'),
      // pieDataList: [
      //   { name: '待报送', value: 0 },
      //   { name: '已报送', value: 0 },
      //   { name: '未报送', value: 0 },
      //   { name: '已评价', value: 0 },
      // ],
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
      colors: ['#ea9b3b', '#77b726', '#cd2334', '#4da2ef'],
      dialogVisible: false,
      EarlyWarnVisible: false,
      defaultType: '',
      // tipList: [
      //   '在本月报送时间内还未报送的村庄数',
      //   '已完成本次项目进度报送的村庄数（包含已竣工、报送结束）',
      //   '在本次报送时间内未完成报送的村庄数',
      //   '已经完成验收评价的村庄数',
      // ],
    };
  },
  computed: {
    ...mapGetters(['area', 'location', 'batch', 'status']),
    pieDataList() {
      return this.status
        ? [
            { name: '待报送', value: 0 },
            { name: '已报送', value: 0 },
            { name: '未报送', value: 0 },
          ]
        : [
            { name: '待报送', value: 0 },
            { name: '已报送', value: 0 },
            { name: '未报送', value: 0 },
            { name: '已评价', value: 0 },
          ];
    },
    tipList() {
      return this.status
        ? [
            '在本月报送时间内还未报送的村庄数',
            '已完成本次项目进度报送的村庄数（包含已竣工、报送结束）',
            '在本次报送时间内未完成报送的村庄数',
          ]
        : [
            '在本月报送时间内还未报送的村庄数',
            '已完成本次项目进度报送的村庄数（包含已竣工、报送结束）',
            '在本次报送时间内未完成报送的村庄数',
            '已经完成验收评价的村庄数',
          ];
    },
    query() {
      return {
        area: this.area,
        year: this.year,
        batch: this.batch,
        status: this.status,
      };
    },
    totalName() {
      return this.status ? '在建村数' : '创建村数';
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
      this.reShow();
    });
  },
  methods: {
    reShow() {
      if (this.flag) {
        this.flag = false;
        this.showBar = false;
        setTimeout(() => {
          this.flag = true;
          this.showBar = true;
        }, 200);
      }
    },
    getData() {
      this.reShow();
      const data = {
        batch: this.batch,
        year: this.year,
        status: this.status,
        ...this.location,
      };
      console.log(this.pieDataList);
      //项目开工率
      getSubmitEarlyWarning(data).then((res) => {
        this.pieDataList[0].value = res.toSubmit || 0;
        this.pieDataList[1].value = res.normalSubmission || 0;
        // this.pieDataList[2].value = res.completed || 0;
        this.pieDataList[2].value = res.notSubmitted || 0;
        if (!this.status) {
          this.pieDataList[3].value = res.completed || 0;
        }
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
    showCode(data) {
      this.defaultType = data.type.slice(0, 2);
      console.log(this.defaultType);
      this.EarlyWarnVisible = true;
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
    display: flex;
    .chart-box {
      height: 100%;
      width: calc(100% - 30px);
    }
    .tip-list {
      flex: 1;
      //padding: 20px 0;
      .tip-list-item {
        cursor: pointer;
        padding: 6px 0;
        position: relative;
        &:hover .tip-content {
          display: block;
        }
        .tip-content {
          z-index: 10;
          display: none;
          position: absolute;
          right: 33px;
          top: -40px;
          //text-overflow: ;
          white-space: nowrap;
          padding: 15px 9px;
          background: rgba(0, 0, 0, 0.6);
          box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.15);
          border-radius: 4px;
          font-size: 14px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 400;
          color: #ffffff;
        }
      }
    }
  }
}
</style>
