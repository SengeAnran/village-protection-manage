<template>
  <div class="list-search-module inline-flex pl-0">
    <div class="search-item" v-if="!(COUNTRY || COUNTRY_LEADER)">
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
    <div class="search-item" v-if="!(COUNTRY || COUNTRY_LEADER)">
      <span class="label">创建批次：</span>
      <el-select v-model="query.declarationBatch" placeholder="请选择">
        <el-option v-for="item in batchOpt" :key="item.value" :label="item.label" :value="item.value"> </el-option>
      </el-select>
    </div>
    <div class="search-item" v-if="!(COUNTRY || COUNTRY_LEADER)">
      <span class="label">评价等次：</span>
      <el-select v-model="query.cityLevelRating" placeholder="请选择">
        <el-option v-for="item in cityLevelOpt" :key="item.value" :label="item.label" :value="item.value"> </el-option>
      </el-select>
    </div>
    <div class="search-item">
      <span class="label">验收时间段：</span>
      <el-select v-model="query.acceptTimeId" placeholder="请选择">
        <el-option v-for="item in acceptTimeOpt" :key="item.value" :label="item.label" :value="item.value"> </el-option>
      </el-select>
    </div>
    <!--    <div class="search-item">-->
    <!--      <span class="label">验收时间段：</span>-->
    <!--      <el-select v-model="query.finalStatus" placeholder="请选择">-->
    <!--        <el-option v-for="item in finalStatusOpt" :key="item.value" :label="item.label" :value="item.value">-->
    <!--        </el-option>-->
    <!--      </el-select>-->
    <!--    </div>-->
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
import { DECLARE_STATUS, FINAL_STATUS } from '@/views2/utils/constants';
import role from '@/views2/mixins/role';

export default {
  mixins: [role],
  props: {
    query: {
      type: Object,
      default: () => ({
        areaId: undefined,
        villageName: '',
        declarationBatch: '',
        cityLevelRating: '',
        acceptTimeId: '',
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
  mounted() {
    this.setBatchOpt();
    this.setCityLevelOpt();
    this.setAcceptTimeOpt();
    this.setFinalStatusOpt();
  },
  methods: {
    setBatchOpt() {
      const baseItem = [
        {
          label: '全部',
          value: '',
        },
      ];
      getSetList({ type: 2, pageNum: 1, pageSize: 50 }).then((res) => {
        this.batchOpt = baseItem.concat(...res.content.map((c) => ({ label: c.batch, value: c.batch })));
      });
    },
    setCityLevelOpt() {
      const level = ['合格', '良好', '优秀'];
      const baseItem = [
        {
          label: '全部',
          value: '',
        },
      ];
      this.cityLevelOpt = baseItem.concat(
        ...level.map((c, index) => {
          return {
            label: c,
            value: index,
          };
        }),
      );
    },
    setAcceptTimeOpt() {
      const baseItem = [
        {
          label: '全部',
          value: '',
        },
      ];
      getSetListTime({ type: 1, pageNum: 1, pageSize: 50 }).then((res) => {
        this.acceptTimeOpt = baseItem.concat(
          ...res.content.map((c) => ({
            label: c.acceptanceStartTime + '至' + c.acceptanceEndTime,
            value: c.id,
          })),
        );
      });
    },
    setFinalStatusOpt() {
      const baseItem = [
        {
          label: '全部',
          value: '',
        },
      ];
      this.finalStatusOpt = baseItem.concat(
        ...Object.keys(DECLARE_STATUS).map((c) => {
          return {
            label: DECLARE_STATUS[c],
            value: c,
          };
        }),
      );
      if (this.CITY || this.CITY_LEADER) {
        const index = this.finalStatusOpt.findIndex((i) => {
          return i.value === FINAL_STATUS.COUNTRY_REPORT_PENDING;
        });
        if (index === -1) {
          return;
        }
        this.finalStatusOpt.splice(index, 1); // 市级必选去除县级待上报；
      }
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
