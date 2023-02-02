<template>
  <div class="box">
    <div class="titles-list">
      <div
        class="title-list-item"
        :class="{ active: value === index }"
        v-for="(item, index) in titleList"
        :key="index"
        @click="changeActive(index)"
      >
        {{ item }}
      </div>
    </div>
    <div class="box-right">
      <VillageSelectItem
        class="location-select"
        checkStrictly
        v-model="query.areaId"
        @change="changeArea"
        :placeholder="userInfo.areaName"
      />
      <el-select v-model="query.declarationBatch" placeholder="请选择" @change="batchChange">
        <el-option v-for="item in batchOpt" :key="item.value" :label="item.label" :value="item.value"> </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
import { getSetList } from '@/api2/declarationBatch';
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'TopFixedBox',
  props: {
    value: {
      type: Number,
    },
  },
  model: {
    prop: 'value',
    event: 'update',
  },
  data() {
    return {
      query: {
        areaId: '',
        declarationBatch: '全部批次',
      },
      titleList: ['建设概况', '创建申报', '项目调度', '验收评价'],
      activeIndex: 0,
      batchOpt: [
        {
          label: '全部批次',
          value: '全部批次',
        },
      ],
    };
  },
  computed: {
    ...mapGetters(['userInfo']),
  },
  beforeMount() {
    this.initArea();
    this.setBatchOpt();
  },
  methods: {
    ...mapMutations('home', ['SET_AREA_COUNTY', 'SET_AREA_CITY', 'SET_AREA_PROVINCE', 'SET_BATCH']),
    initArea() {
      if (/市$/.test(this.userInfo.areaName)) {
        return this.SET_AREA_CITY(this.userInfo.areaName);
      } else if (this.userInfo.areaName === '浙江省') {
        this.SET_AREA_PROVINCE(this.userInfo.areaName);
      } else {
        return this.SET_AREA_COUNTY(this.userInfo.areaName);
      }
    },
    changeArea(val) {
      if (val.level === '2' || /市$/.test(val.areaName)) {
        return this.SET_AREA_CITY(val.areaName);
      }
      if (val.level === '3') {
        return this.SET_AREA_COUNTY(val.areaName);
      }
      this.SET_AREA_PROVINCE(val.areaName);
    },
    setBatchOpt() {
      getSetList({ type: 2, pageNum: 1, pageSize: 50 }).then((res) => {
        this.batchOpt = this.batchOpt.concat(...res.content.map((c) => ({ label: c.batch, value: c.batch })));
      });
    },
    batchChange(val) {
      // console.log('batchChange');
      this.SET_BATCH(val);
    },
    // 切换模块
    changeActive(index) {
      this.$emit('update', index);
      this.$emit('toBox', index);
    },
  },
};
</script>

<style lang="scss" scoped>
@mixin ArtFont {
  color: black;
  //background: linear-gradient(0deg, black 1.513671875%, black 100%);
  //-webkit-background-clip: text;
  //-webkit-text-fill-color: transparent;
}
.box {
  position: relative;
  z-index: 2;
  width: calc(100% - 34px);
  margin-left: 15px;
  //margin-bottom: 2px;
  display: flex;
  justify-content: space-between;
  height: 48px;
  background: #f5faff;
  padding-right: 20px;
  box-shadow: 0px 2px 6px 0px rgba(0, 62, 115, 0.19);
  & > div {
    display: flex;
    align-items: center;
  }
  .titles-list {
    cursor: pointer;
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
  .location-select {
    margin-right: 12px;
    &::v-deep .el-input__inner::-webkit-input-placeholder {
      color: #606266;
    }
    &::v-deep .el-input__inner::-moz-placeholder {
      /* Mozilla Firefox 19+ */
      color: #606266;
    }
    &::v-deep .el-input__inner::-moz-placeholder {
      /* Mozilla Firefox 4 to 18 */
      color: #606266;
    }
    &::v-deep .el-input__inner::-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      color: #606266;
    }
  }
}
</style>
