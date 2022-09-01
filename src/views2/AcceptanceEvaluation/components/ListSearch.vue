<template>
  <div class="list-search-module inline-flex pl-0">
    <div class="search-item" v-if="!isCounty">
      <span class="label">地区：</span>
      <VillageSelectItem checkStrictly v-model="query.areaId" @change="changeArea" />
    </div>
    <div class="search-item">
      <span class="label">村（片区）名称：</span>
      <el-input
        style="width: 200px"
        v-model="query.villageName"
        :maxlength="50"
        placeholder="请输入村庄名称"
      ></el-input>
    </div>
    <div class="search-item" v-if="!isCounty">
      <span class="label">创建批次：</span>
      <el-select v-model="query.declarationBatch" placeholder="请选择">
        <el-option v-for="item in batchOpt" :key="item.value" :label="item.label" :value="item.value"> </el-option>
      </el-select>
    </div>
    <div class="search-item" v-if="!isCounty">
      <span class="label">评价等次：</span>
      <el-select v-model="query.cityLevelRating" placeholder="请选择">
        <el-option v-for="item in cityLevelOpt" :key="item.value" :label="item.label" :value="item.value"> </el-option>
      </el-select>
    </div>
    <div class="search-item" v-if="!isCounty">
      <span class="label">审核比选时间：</span>
      <el-select v-model="query.cityAcceptTime" placeholder="请选择">
        <el-option v-for="item in acceptTimeOpt" :key="item.value" :label="item.label" :value="item.value"> </el-option>
      </el-select>
    </div>
    <div class="search-item">
      <span class="label">状态：</span>
      <el-select v-model="query.finalStatus" placeholder="请选择">
        <el-option v-for="item in finalStatusOpt" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </div>
  </div>
</template>
<script>
// import { getSetList } from '@/api2/villageManage';
import { getSetList } from '@/api2/declarationBatch';
// eslint-disable-next-line no-unused-vars
import { getSetList as getSetListTime } from '@/api2/acceptanceTime';
import { DECLARE_STATUS } from '@/views2/utils/constants';
export default {
  props: {
    query: {
      type: Object,
      default: () => ({
        villageName: '',
        declarationBatch: '',
        cityLevelRating: '',
        cityAcceptTime: '',
        finalStatus: '',
      }),
    },
  },
  data() {
    return {
      batchOpt: [],
      cityLevelOpt: [],
      acceptTimeOpt: [],
      finalStatusOpt: [],
    };
  },
  computed: {
    isCounty() {
      return this.$store.getters.userInfo && this.$store.getters.userInfo.roleId === 3;
    },
  },

  mounted() {
    this.setBatchOpt();
    this.setCityLevelOpt();
    this.setAcceptTimeOpt();
    this.setFinalStatusOpt();
  },
  methods: {
    setBatchOpt() {
      getSetList({ type: 2, pageNum: 1, pageSize: 50 }).then((res) => {
        this.batchOpt = res.content.map((c) => ({ label: c.batch, value: c.id }));
      });
    },
    setCityLevelOpt() {
      const level = ['合格', '良好', '优秀'];
      this.cityLevelOpt = level.map((c, index) => {
        return {
          label: c,
          value: index,
        };
      });
    },
    setAcceptTimeOpt() {
      getSetListTime({ type: 1, pageNum: 1, pageSize: 50 }).then((res) => {
        this.acceptTimeOpt = res.content.map((c) => ({ label: c.acceptanceTime, value: c.acceptanceTime }));
      });
    },
    setFinalStatusOpt() {
      this.finalStatusOpt = Object.keys(DECLARE_STATUS).map((c) => {
        return {
          label: DECLARE_STATUS[c],
          value: c,
        };
      });
    },

    changeArea(val) {
      // this.query.areaId = val.areaId;
      this.$emit('changeArea', val);
    },
  },
};
</script>
<style lang="scss" scoped>
.list-search-module {
  flex-wrap: wrap;
  .search-item {
    padding-right: 20px;
    padding-bottom: 20px;
    .label {
      font-weight: 400;
      color: #333333;
    }
  }
}
</style>
