<template>
  <div class="items" >
    <div class="item" v-for="(item, index) in dataList" :key="index" :style="{background: `url(${item.backgroundImg}) no-repeat`}">
      <img :src="item.iconImg" alt="">
      <label-info
        :direction="labelInfoSet.direction"
        :color="item.color"
        :label="item.label"
        :num="item.num"
        :unit="item.unit"
      ></label-info>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopData',
  data() {
    return {
      dataList: [
        {
          label: '未来乡村创建总数',
          num: 1281,
          unit: '个',
          color: '#5F59FF',
          backgroundImg: require('../img/bg_02.png'),
          iconImg: require('../img/icon_01.png'),
        },
        {
          label: '在建数',
          num: 12531,
          unit: '人',
          color: '#FEC447',
          backgroundImg: require('../img/bg_01.png'),
          iconImg: require('../img/icon_02.png'),
        },
        {
          label: '验收数',
          num: 42434,
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
}
</script>

<style lang="scss" scoped>
.items {
  width: 100%;
  display: flex;
  //justify-content: space-between;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 32px;
  .item {
    width: 350px;
    height: 102px;
    display: flex;
    //margin: 15px 0;
    align-items: center;
    img {
      margin-left: 30px;
      margin-right: 16px;
      width: 48px;
      height: 48px;
    }
    &::v-deep .label {
      margin-top: 3px
    }
  }
}
</style>