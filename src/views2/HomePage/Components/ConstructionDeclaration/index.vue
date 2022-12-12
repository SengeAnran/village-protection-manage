<template>
  <base-box-item name="申报总数" :count="total" unit="个" :icon="iconUrl">
    <div class="left-content">
      <PieChart v-if="showBar" :list="pieDataList" :isPercent="false" unit="个" totalUnit="个" minTitle="申报总数" />
    </div>
    <div class="right-content">
      <BaseBarChart v-if="showBar" key="1" :chart-data="chartData" />
    </div>
  </base-box-item>
</template>

<script>
import { mapGetters } from 'vuex';
import PieChart from './PieChart';
import { getCountVillage } from '@/api2/homePage';
export default {
  components: { PieChart },
  data() {
    return {
      pieDataList: [
        { name: '省级审核通过', value: 0 },
        { name: '市、县待上报', value: 0 },
        { name: '省级审核未通过', value: 0 },
      ],
      total: 0,
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
      iconUrl: require('./icon.png'),
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
        this.pieDataList[0].value = res.passTotalCount;
        this.pieDataList[1].value = res.readyPassTotalCount;
        this.pieDataList[2].value = res.noPassTotalCount;
        this.total = res.passTotalCount + res.readyPassTotalCount + res.noPassTotalCount;
      });
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
</style>
