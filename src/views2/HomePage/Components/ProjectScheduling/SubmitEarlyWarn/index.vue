<template>
  <base-box-item name="本月报送预警" hideNum style="margin-top: 30px" :icon="iconUrl">
    <el-button class="detail-btn" @click="dialogVisible = true">预警详情</el-button>
    <div class="left-content">
      <div class="code-list">
        <div class="code-item" v-for="(item, index) in codeDataList" :key="index">
          <img :src="item.imgUrl" alt="" />
          <label-info :label="item.label" :num="item.value" color="black" direction="top" unit="次" />
        </div>
      </div>
    </div>
    <div class="right-content">
      <base-bar-chart v-if="showBar" key="1" :chart-data="chartData" @goDetail="goDetail" />
    </div>
    <early-warn-detail :dialog="dialogVisible" @closeView="dialogVisible = false" />
  </base-box-item>
</template>

<script>
import EarlyWarnDetail from '@/views2/HomePage/Components/ProjectScheduling/SubmitEarlyWarn/EarlyWarnDetail';
import { mapGetters } from 'vuex';
// import BarChart from './BarChart';
import { getSubmitEarlyWarning } from '@/api2/homePage';
export default {
  components: { EarlyWarnDetail },
  data() {
    return {
      total: 0,
      showBar: true,
      flag: true,
      chartData: {
        name: '各地市本月报送预警情况',
        name1: '正常报送',
        name2: '报送超时',
        name3: '未报送',
        unit: '次',
        xAxisData: [],
        dataList1: [],
        dataList2: [],
        dataList3: [],
      },
      codeDataList: [
        {
          label: '未报送',
          value: 0,
          unit: '次',
          imgUrl: require('./red_code.png'),
        },
        {
          label: '报送超时',
          value: 0,
          unit: '次',
          imgUrl: require('./yellow_code.png'),
        },
        {
          label: '正常报送',
          value: 0,
          unit: '次',
          imgUrl: require('./green_code.png'),
        },
      ],
      listData: [],
      iconUrl: require('./icon.png'),
      isGoing: false,
      dialogVisible: false,
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
      getSubmitEarlyWarning(data).then((res) => {
        this.codeDataList[0].value = res?.notSubmitted || 0;
        this.codeDataList[1].value = res?.submissionTimeout || 0;
        this.codeDataList[2].value = res?.normalSubmission || 0;
        const warningVOList = res.warningVOList || [];
        this.listData = warningVOList;
        this.chartData.xAxisData = warningVOList.map((i) => {
          return i.name;
        });
        this.chartData.dataList1 = warningVOList.map((i) => {
          return i.normalSubmission;
        });
        this.chartData.dataList2 = warningVOList.map((i) => {
          return i.submissionTimeout;
        });
        this.chartData.dataList3 = warningVOList.map((i) => {
          return i.notSubmitted;
        });
        if (warningVOList) {
        }
        console.log(this.chartData.xAxisData);
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
.detail-btn {
  position: absolute;
  right: 10px;
  top: -40px;
}
.left-content {
  //width: 471px;
  flex: 1;
  height: 239px;
  //background-color: pink;
  .code-list {
    margin-top: 60px;
    display: flex;
    justify-content: space-around;
    text-align: center;
    .code-item {
      img {
        margin-bottom: 16px;
      }
      &::v-deep .label {
        margin-bottom: 5px;
      }
    }
  }
}
.right-content {
  flex: 1;
  //width: 540px;
  height: 239px;
  //background-color: pink;
}
</style>
