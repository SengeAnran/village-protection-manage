<template>
  <base-box-item-new class="rete-content" name="首末排名" :icon="iconUrl" hideNum>
    <div class="btns">
      <button :class="{ active: activeIndex }" @click="changeType(true)">前五名</button>
      <button :class="{ active: !activeIndex }" @click="changeType(false)">后五名</button>
    </div>
    <!--    <el-select class="select" v-model="type" placeholder="请选择" @change="getData">-->
    <!--      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>-->
    <!--    </el-select>-->
    <div class="sort-list">
      <!--      县（市、区）开工率排名-->
      <Sort
        class="sort-item"
        style="margin-right: 15px"
        barColor="rgba(112,171,248,0.85)"
        :list-data="dataList1"
        :name="sortName1"
        @goDetail="goDetail"
      />
      <!--      村庄开工率排名-->
      <Sort
        class="sort-item"
        style="margin-right: 15px"
        barColor="#FED887"
        :list-data="dataList2"
        :name="sortName2"
        @goDetail="goDetail"
      />
      <Sort class="sort-item" :list-data="dataList3" barColor="#59CF82" :name="sortName3" @goDetail="goDetail" />
    </div>
  </base-box-item-new>
</template>

<script>
import { mapGetters } from 'vuex';
import Sort from './Sort';
import {
  getInvestmentCompletedRate5thPro,
  getInvestmentCompletedRate5thVillage,
  getOverallProgressRate5thPro,
  getOverallProgressRate5thVillage,
  getProjectCommencementRate5thPro,
  getProjectCommencementRate5thVillage,
} from '@/api2/homePage';
// import BarChart from './BarChart';

export default {
  components: { Sort },
  data() {
    return {
      total: 0,
      showBar: true,
      flag: true,
      iconUrl: require('./icon.png'),
      dataList1: [],
      dataList2: [],
      dataList3: [],
      activeIndex: true,
      type: '项目开工率',
      options: [
        {
          value: '项目开工率',
          label: '项目开工率',
        },
        {
          value: '投资完成率',
          label: '投资完成率',
        },
        {
          value: '总体进度',
          label: '总体进度',
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
    sortName1() {
      let name;
      if (this.location.province) {
        name = '各地市开工率排名';
      }
      if (this.location.city) {
        name = '县（市、区）开工率排名';
      }
      if (this.location.county) {
        name = '村庄开工率排名';
      }
      return name + (this.activeIndex ? '前五' : '后五');
    },
    sortName2() {
      let name;
      if (this.location.province) {
        name = '各地市投资完成率排名';
      }
      if (this.location.city) {
        name = '县（市、区）完成率排名';
      }
      if (this.location.county) {
        name = '村庄完成率排名';
      }
      return name + (this.activeIndex ? '前五' : '后五');
    },
    sortName3() {
      let name;
      if (this.location.province) {
        name = '各地市投资进度排名';
      }
      if (this.location.city) {
        name = '县（市、区）进度排名';
      }
      if (this.location.county) {
        name = '村庄进度排名';
      }
      return name + (this.activeIndex ? '前五' : '后五');
    },
  },
  watch: {
    query: {
      handler: function () {
        this.type = '项目开工率';
        this.activeIndex = true;
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
      this.changeType1();
      this.changeType3();
      this.changeType5();
    },
    // 项目开工率 县（市、区）开工率排名
    changeType1() {
      const data = {
        batch: this.batch,
        year: this.year,
        status: this.status,
        ...this.location,
        order: this.activeIndex ? 0 : 1,
      };
      getProjectCommencementRate5thPro(data).then((res) => {
        this.dataList1 = res.map((i) => {
          return {
            name: i.name,
            value: (i.rate * 100 || 0).toFixed(1),
            unit: '%',
            tapList: [
              {
                name: '项目开工率',
                value: (i.rate * 100 || 0).toFixed(1),
                unit: '%',
              },
              {
                name: '已开工项目数',
                value: (i.startNum || 0).toFixed(2),
                unit: '个',
              },
              {
                name: '未开工项目数',
                value: (i.notNum || 0).toFixed(2),
                unit: '个',
              },
            ],
            ...i,
          };
        });
      });
    },
    changeType2() {
      const data = {
        batch: this.batch,
        year: this.year,
        status: this.status,
        ...this.location,
        order: this.activeIndex ? 0 : 1,
      };
      getProjectCommencementRate5thVillage(data).then((res) => {
        this.dataList2 = res.map((i) => {
          return {
            name: i.name,
            value: (i.rate * 100 || 0).toFixed(1),
            unit: '%',
            tapList: [
              {
                name: '项目开工率',
                value: (i.rate * 100 || 0).toFixed(1),
                unit: '%',
              },
              {
                name: '已开工项目数',
                value: (i.startNum || 0).toFixed(2),
                unit: '个',
              },
              {
                name: '未开工项目数',
                value: (i.notNum || 0).toFixed(2),
                unit: '个',
              },
            ],
            ...i,
          };
        });
      });
    },
    // 投资完成率
    changeType3() {
      const data = {
        batch: this.batch,
        year: this.year,
        status: this.status,
        ...this.location,
        order: this.activeIndex ? 0 : 1,
      };
      getInvestmentCompletedRate5thPro(data).then((res) => {
        this.dataList2 = res.map((i) => {
          return {
            name: i.name,
            value: (i.rate * 100 || 0).toFixed(1),
            unit: '%',
            tapList: [
              {
                name: '投资完成率',
                value: (i.rate * 100 || 0).toFixed(1),
                unit: '%',
              },
              {
                name: '计划投资',
                value: (i.investNum || 0).toFixed(2),
                unit: '万',
              },
              {
                name: '完成投资',
                value: (i.completeTotal || 0).toFixed(2),
                unit: '万',
              },
            ],
            ...i,
          };
        });
      });
    },
    changeType4() {
      const data = {
        batch: this.batch,
        year: this.year,
        status: this.status,
        ...this.location,
        order: this.activeIndex ? 0 : 1,
      };
      getInvestmentCompletedRate5thVillage(data).then((res) => {
        this.dataList2 = res.map((i) => {
          return {
            name: i.name,
            value: (i.rate * 100 || 0).toFixed(1),
            unit: '%',
            tapList: [
              {
                name: '投资完成率',
                value: (i.rate * 100 || 0).toFixed(1),
                unit: '%',
              },
              {
                name: '计划投资',
                value: (i.investNum || 0).toFixed(2),
                unit: '万',
              },
              {
                name: '完成投资',
                value: (i.completeTotal || 0).toFixed(2),
                unit: '万',
              },
            ],
            ...i,
          };
        });
      });
    },
    // 总体进度
    changeType5() {
      const data = {
        batch: this.batch,
        year: this.year,
        status: this.status,
        ...this.location,
        order: this.activeIndex ? 0 : 1,
      };
      getOverallProgressRate5thPro(data).then((res) => {
        this.dataList3 = res.map((i) => {
          return {
            name: i.name,
            value: (i.rate || 0).toFixed(1),
            unit: '%',
            ...i,
            // tapList: [
            //   {
            //     name: '项目开工率',
            //     value: (i.rate * 100 || 0).toFixed(2),
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
    changeType6() {
      const data = {
        batch: this.batch,
        year: this.year,
        status: this.status,
        ...this.location,
        order: this.activeIndex ? 0 : 1,
      };
      getOverallProgressRate5thVillage(data).then((res) => {
        this.dataList2 = res.map((i) => {
          return {
            name: i.name,
            value: (i.rate || 0).toFixed(1),
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
    changeType(val) {
      this.activeIndex = val;
      this.getData();
    },
  },
};
</script>

<style lang="scss" scoped>
.rete-content {
  position: relative;
  height: 100%;
  .btns {
    position: absolute;
    top: -30px;
    //left: 264px;
    right: 0;
    button {
      width: 82px;
      height: 32px;
      border-radius: 19px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      line-height: 22px;
      background: #ffffff;
      color: #333333;
      border: 1px solid #cccccc;
      outline: none;
      &:first-child {
        margin-right: 12px;
      }
    }
    .active {
      background: #1492ff;
      color: white;
      border: none;
    }
  }
  .select {
    position: absolute;
    top: -28px;
    right: 0;
  }
  .sort-list {
    display: flex;
    .sort-item {
      flex: 1;
    }
  }
}
</style>
