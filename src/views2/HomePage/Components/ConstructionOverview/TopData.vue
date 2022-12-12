<template>
  <div class="items">
    <el-row :gutter="20">
      <el-col :span="8" v-for="(item, index) in dataList" :key="index" style="text-align: center">
        <div class="item" :style="{ background: `url(${item.backgroundImg}) 100% 100% no-repeat` }">
          <img :src="item.iconImg" alt="" />
          <label-info
            :direction="labelInfoSet.direction"
            :color="item.color"
            :label="item.label"
            :num="item.num"
            :unit="item.unit"
          ></label-info>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getConstructionOverview } from '@/api2/homePage';
import { mapGetters } from 'vuex';

export default {
  name: 'TopData',
  data() {
    return {
      dataList: [
        {
          label: '创建总数',
          num: 33,
          unit: '个',
          color: '#5F59FF',
          backgroundImg: require('./img/bg_01.png'),
          iconImg: require('./img/icon_01.png'),
        },
        {
          label: '在建数',
          num: 20,
          unit: '个',
          color: '#FEC447',
          backgroundImg: require('./img/bg_02.png'),
          iconImg: require('./img/icon_02.png'),
        },
        {
          label: '验收数',
          num: 44,
          unit: '个',
          color: '#3DC899',
          backgroundImg: require('./img/bg_03.png'),
          iconImg: require('./img/icon_03.png'),
        },
      ],
      labelInfoSet: {
        direction: 'bottom',
        labelSize: 14,
        valueSize: 36,
        unitSize: 12,
      },
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
  },
  methods: {
    getData() {
      const data = {
        batch: this.batch,
        ...this.location,
      };
      getConstructionOverview(data).then((res) => {
        this.dataList[0].num = res.totalNumberCreated;
        this.dataList[1].num = res.numberUnderConstruction;
        this.dataList[2].num = res.acceptanceNumber;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.items {
  background-color: white;
  width: 100%;
  //display: flex;
  //justify-content: space-between;
  //justify-content: space-between;
  //flex-wrap: wrap;
  margin-bottom: 20px;
  .item {
    margin: 0 auto;
    max-width: 350px;
    height: 94px;
    display: flex;
    align-items: center;
    background-size: 100% 100% !important;
    img {
      margin-left: 16px;
      margin-right: 12px;
      width: 48px;
      height: 48px;
    }
    &::v-deep .label {
      margin-top: 3px;
    }
  }
  .el-col:first-child .item {
    margin: 0 auto 0 0;
  }
  .el-col:last-child .item {
    margin: 0 0 0 auto;
  }
}
</style>
