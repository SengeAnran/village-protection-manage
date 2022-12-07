<template>
  <div class="box">
    <div class="titles-list">
      <div
        class="title-list-item"
        :class="{ active: activeIndex === index }"
        v-for="(item, index) in titleList"
        :key="index"
      >
        {{ item }}
      </div>
    </div>
    <VillageSelectItem checkStrictly v-model="query.areaId" @change="changeArea" placeholder="浙江省" />
    <el-select v-model="query.declarationBatch" placeholder="请选择">
      <el-option v-for="item in batchOpt" :key="item.value" :label="item.label" :value="item.value"> </el-option>
    </el-select>
  </div>
</template>

<script>
import { getSetList } from '@/api2/declarationBatch';

export default {
  props: {
    query: {
      type: Object,
      default: () => {},
    },
  },
  name: 'TopFixedBox',
  data() {
    return {
      titleList: ['建设概况', '创建申报', '项目调度', '项目调度'],
      activeIndex: 0,
      batchOpt: [
        {
          label: '全部批次',
          value: '',
        },
      ],
    };
  },
  methods: {
    changeArea(val) {
      this.$emit('changeArea', val);
    },
    setBatchOpt() {
      getSetList({ type: 2, pageNum: 1, pageSize: 50 }).then((res) => {
        this.batchOpt.concat(...res.content.map((c) => ({ label: c.batch, value: c.batch })));
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  width: calc(100% - 34px);
  margin-left: 15px;
  display: flex;
  height: 48px;
  background: #f5faff;
  box-shadow: 0px 2px 6px 0px rgba(0, 62, 115, 0.19);
  & > div {
    display: flex;
    align-items: center;
  }
  .titles-list {
    display: flex;
    margin-left: 10px;
    .title-list-item {
      //display: flex;
      //align-items: center;
      margin: 0 10px;
      font-size: 18px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 400;
      color: #8f9194;
      line-height: 26px;
    }
    .active {
      font-weight: 500;
      color: #333333;
    }
  }
}
</style>
