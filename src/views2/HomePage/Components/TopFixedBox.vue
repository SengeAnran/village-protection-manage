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
      <el-select
        v-model="query.status"
        placeholder="全部"
        :disabled="disabled"
        @change="statusChange"
        style="width: 200px; margin-right: 10px"
      >
        <el-option v-for="item in statusOpt" :key="item.value" :label="item.label" :value="item.value"> </el-option>
      </el-select>
      <VillageSelectItem
        class="location-select"
        checkStrictly
        v-model="query.areaValue"
        @change="changeArea"
        :placeholder="area || userInfo.areaName"
      />
      <el-select
        v-model="query.declarationBatch"
        multiple
        placeholder="全部批次"
        @change="batchChange"
        style="width: 200px; margin-right: 10px"
      >
        <el-option v-for="item in batchOpt" :key="item.value" :label="item.label" :value="item.value"> </el-option>
      </el-select>
      <el-select :disabled="disabled" v-model="query.year" placeholder="全部" @change="yearChange" style="width: 200px">
        <el-option v-for="item in yearsOpt" :key="item.value" :label="item.label" :value="item.value"> </el-option>
      </el-select>
      <el-button
        style="margin-left: 10px"
        :icon="showAllPage ? 'el-icon-close' : 'el-icon-full-screen'"
        @click="showAll(!showAllPage)"
      >
      </el-button>
    </div>
  </div>
</template>

<script>
import { getSetList } from '@/api2/declarationBatch';
import { mapGetters, mapMutations } from 'vuex';
import { getYears } from '@/api2/homePage';
import role from '@/views2/mixins/role';

export default {
  mixins: [role],
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
        areaValue: [],
        declarationBatch: [],
        year: '',
        status: 1,
      },
      titleList: ['项目调度', '创建验收'],
      activeIndex: 0,
      disabled: false,
      batchOpt: [
        // {
        //   label: '全部批次',
        //   value: '全部批次',
        // },
      ],
      yearsOpt: [
        {
          label: '全部',
          value: '',
        },
      ],
      statusOpt: [
        {
          label: '全部',
          value: 0,
        },
        {
          label: '在建村',
          value: 1,
        },
      ],
      showAllPage: false,
    };
  },
  computed: {
    ...mapGetters(['userInfo', 'areaArr', 'area']),
  },
  watch: {
    areaArr(val) {
      if (val) {
        this.query.areaValue = val;
      }
    },
  },
  beforeMount() {
    this.initArea();
    this.setBatchOpt();
    this.setYearOpt();
  },
  methods: {
    ...mapMutations('home', [
      'SET_AREA_COUNTY',
      'SET_AREA_CITY',
      'SET_AREA_PROVINCE',
      'SET_BATCH',
      'SET_YEAR',
      'SET_STATUS',
    ]),
    ...mapMutations(['app/SET_ONLY_SHOW_DETAIL']),
    // 全屏展示
    showAll(value) {
      this.showAllPage = value;
      this['app/SET_ONLY_SHOW_DETAIL'](value);
    },
    initArea() {
      if (this.CITY || this.CITY_LEADER) {
        return this.SET_AREA_CITY(this.userInfo.areaName);
      }
      if (this.PROVINCE) {
        return this.SET_AREA_PROVINCE(this.userInfo.areaName);
      }
      return this.SET_AREA_COUNTY(this.userInfo.areaName);
    },
    changeArea(val) {
      // this.query.areaId = val.areaId;
      if (val.level === '2' || val.areaId.length === 4) {
        return this.SET_AREA_CITY(val.areaName);
      }
      if (val.level === '3' || val.areaId.length === 6) {
        return this.SET_AREA_COUNTY(val.areaName);
      }
      this.SET_AREA_PROVINCE(val.areaName);
    },
    setBatchOpt() {
      getSetList({ type: 2, pageNum: 1, pageSize: 50 }).then((res) => {
        this.batchOpt = this.batchOpt.concat(...res.content.map((c) => ({ label: c.batch, value: c.batch })));
      });
    },
    setYearOpt() {
      getYears().then((res) => {
        this.yearsOpt = this.yearsOpt.concat(...res.map((c) => ({ label: c, value: c })));
      });
    },
    batchChange(val) {
      this.SET_BATCH(val);
    },
    yearChange(val) {
      this.SET_YEAR(val);
    },
    statusChange(val) {
      this.SET_STATUS(val);
    },
    // 切换模块
    changeActive(index) {
      this.$emit('update', index);
      index ? this.resetValue(0) : this.resetValue(1);
      this.disabled = index === 1;
      // this.$emit('toBox', index);
    },
    resetValue(value) {
      this.query = {
        areaValue: [],
        declarationBatch: [],
        year: '',
        status: value,
      };
      this.SET_BATCH([]);
      this.SET_YEAR('全部');
      this.SET_STATUS(value);
      this.initArea();
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
  .el-select {
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
