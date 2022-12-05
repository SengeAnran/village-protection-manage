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
import { getPreviewsNum } from '@/api2/homePage';

export default {
  name: 'TopData',
  data() {
    return {
      dataList: [
        {
          label: '未来乡村创建总数',
          num: 0,
          unit: '个',
          color: '#5F59FF',
          backgroundImg: require('../img/bg_02.png'),
          iconImg: require('../img/icon_01.png'),
        },
        {
          label: '在建数',
          num: 0,
          unit: '个',
          color: '#FEC447',
          backgroundImg: require('../img/bg_01.png'),
          iconImg: require('../img/icon_02.png'),
        },
        {
          label: '验收数',
          num: 0,
          unit: '个',
          color: '#3DC899',
          backgroundImg: require('../img/bg_03.png'),
          iconImg: require('../img/icon_03.png'),
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
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      getPreviewsNum().then((res) => {
        this.dataList[0].num = res.totalNum;
        this.dataList[1].num = res.buildingNum;
        this.dataList[2].num = res.completeNum;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.items {
  width: 100%;
  //display: flex;
  //justify-content: space-between;
  //justify-content: space-between;
  //flex-wrap: wrap;
  margin-bottom: 32px;
  .item {
    margin: 0 auto;
    max-width: 350px;
    height: 102px;
    display: flex;
    align-items: center;
    img {
      margin-left: 30px;
      margin-right: 16px;
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
