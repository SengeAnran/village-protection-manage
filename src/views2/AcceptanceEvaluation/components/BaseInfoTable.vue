<template>
  <div class="table-content">
    <el-table :data="tableData" border :show-header="false" style="width: 100%" :span-method="arraySpanMethod">
      <el-table-column
        v-for="(item, index) in TABLE_TITLE"
        :key="index"
        :prop="item.prop"
        :width="item.width"
        :align="item.align"
      >
        <template slot-scope="{ row }">
          <span v-if="item.prop === 'secondColumn'" style="color: #333333">
            <!--          创建村名称-->
            <span v-if="row.secondColumn === 'villageName'">
              {{ saveVO.villageName || form.name }}
            </span>
            <!--          总投资（万元）-->
            <span v-else-if="row.secondColumn === 'investNum'">
              {{ formatMoney(saveVO.investNum) }}
            </span>
            <!--          总投资（万元）-->
            <span v-else-if="row.secondColumn === '评价等次'" style="color: #666666"> 评价等次 </span>
            <!--          设区市比选意见-->
            <div v-else-if="row.secondColumn === 'cityOpinion'">
              <p class="content">驳回县级重填 {{ form.cityOpinion }}</p>

              <!--              <p class="content">比选时间:{{ form.cityAuditTime }}</p>-->
            </div>
            <!--          省级复核评价意见-->
            <div v-else-if="row.secondColumn === 'provinceOpinion'">
              <p class="content">
                {{ form.provinceVerify === 0 ? '驳回市级重填' : form.provinceVerify === 1 ? '通过' : '不通过' }}
                {{ form.provinceOpinion }}
              </p>

              <!--              <p class="content">比选时间:{{ form.cityAuditTime }}</p>-->
            </div>
            <!--            一般情况-->
            <span v-else>{{ form[row.secondColumn] }} </span>
          </span>
          <span v-else-if="item.prop === 'fourthColumn'" style="color: #333333">
            <!--          领办领导-->
            <span v-if="row.fourthColumn === 'leader'">
              {{ saveVO.leader }}
            </span>
            <span v-else-if="row.fourthColumn === 'contactPerson'">
              {{ saveVO.contactPerson }} {{ saveVO.phone }}
            </span>
            <span v-else-if="row.fourthColumn === '全市排名'" style="color: #666666"> 全市排名 </span>
            <span v-else>{{ form[row.fourthColumn] }} </span>
          </span>
          <span v-else-if="item.prop === 'thirdColumn'" style="color: #666666">
            <span v-if="row.thirdColumn === 'cityLevelRating'" style="color: #333333">
              {{ CITY_LEVEL_RATING[form.cityLevelRating] }}
            </span>
            <span v-else> {{ row.thirdColumn }} </span>
          </span>
          <span v-else-if="item.prop === 'firstColumn'" style="color: #666666">
            <!--          设区市比选意见-->
            <div v-if="row.firstColumn === 'citySaveAnnexFiles'">
              <div v-if="form.citySaveAnnexFiles && form.citySaveAnnexFiles.length">
                <ViewFileSingle :data="form.citySaveAnnexFiles[0]" />
              </div>
              <!--              <p class="content">比选时间:{{ form.cityAuditTime }}</p>-->
            </div>
            <span v-else> {{ row.firstColumn }} </span>
          </span>
          <span v-else-if="item.prop === 'fifthColumn'" style="color: #666666">
            <span v-if="row.fifthColumn === 'cityRanking'" style="color: #333333">
              {{ form.cityRanking || '--' }}
            </span>
            <span v-else> {{ row.fifthColumn }} </span>
          </span>
          <span v-else style="color: #666666">{{ row.thirdColumn }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { TABLE_DATA } from './data';
import { formatMoney } from '@/views2/utils/formatter';
import { FINAL_STATUS } from '@/views2/utils/constants';
import { CITY_LEVEL_RATING } from '../constants';

export default {
  name: 'DeclarationForm',
  props: {
    form: {
      type: Object,
      default: () => {},
      require: true,
    },
  },
  computed: {
    saveVO() {
      return this.form.saveVO || {};
    },
    villageType() {
      return this.saveVO.decType;
    },
    showCity() {
      const finalStatus = this.form.finalStatus;
      const canViewStatus =
        finalStatus !== FINAL_STATUS.COUNTRY_REPORT_PENDING && finalStatus != FINAL_STATUS.CITY_VERIFY_PENDING;
      let canViewIdentity = canViewStatus;
      if ((this.COUNTRY || this.COUNTRY_LEADER) && finalStatus !== FINAL_STATUS.CITY_VERIFY_REJECTED) {
        canViewIdentity = false;
      }
      return canViewIdentity;
    },
    showProvince() {
      const finalStatus = this.form.finalStatus;
      const canViewStatus =
        finalStatus === FINAL_STATUS.PROVINCE_VERIFY_REJECTED ||
        finalStatus === FINAL_STATUS.PROVINCE_VERIFY_PASSED ||
        finalStatus === FINAL_STATUS.PROVINCE_VERIFY_REJECTED2;
      let canViewIdentity = canViewStatus;
      if (
        this.COUNTRY ||
        this.COUNTRY_LEADER ||
        ((this.CITY || this.CITY_LEADER) && finalStatus === FINAL_STATUS.PROVINCE_VERIFY_PASSED)
      ) {
        canViewIdentity = false;
      }
      return canViewIdentity;
    },
  },
  data() {
    return {
      CITY_LEVEL_RATING,
      tableData: TABLE_DATA.slice(0), // 浅拷贝
      TABLE_TITLE: [
        { prop: 'firstColumn', width: 240 },
        { prop: 'secondColumn' },
        { prop: 'thirdColumn' },
        { prop: 'fourthColumn' },
        { prop: 'fifthColumn' },
      ],
    };
  },
  beforeMount() {
    this.initData();
  },
  methods: {
    formatMoney,
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      //里面包含当前行row、当前列column、当前行号rowIndex、当前列号columnIndex四个属性
      //返回一个键名为rowspan和colspan的对象。
      if (rowIndex < 2) {
        if (columnIndex === 3) {
          return [1, 2];
        }
      }
      if (rowIndex > 1 && rowIndex < 4) {
        if (columnIndex === 1) {
          return [1, 4];
        }
      }
      if (this.form.finalStatus === FINAL_STATUS.CITY_VERIFY_REJECTED) {
        if (rowIndex === 4) {
          if (columnIndex === 1) {
            return [1, 4];
          }
        }
      }
      if (rowIndex === 4) {
        if (columnIndex === 0) {
          return [2, 1];
        }
      }
      if (rowIndex === 5) {
        if (columnIndex === 0) {
          return [1, 5];
        }
      }
      if (rowIndex === 6) {
        if (columnIndex === 1) {
          return [1, 4];
        }
      }
    },
    initData() {
      if (this.showCity) {
        if (this.form.cityVerify === 1) {
          this.tableData.push({
            firstColumn: `设区市比选意见`,
            secondColumn: '评价等次',
            thirdColumn: 'cityLevelRating',
            fourthColumn: '全市排名',
            fifthColumn: 'cityRanking',
          });
          this.tableData.push({
            firstColumn: `citySaveAnnexFiles`,
            secondColumn: '',
            thirdColumn: '',
            fourthColumn: '',
            fifthColumn: '',
          });
        } else {
          this.tableData.push({
            firstColumn: `设区市比选意见`,
            secondColumn: 'cityOpinion',
            thirdColumn: '',
            fourthColumn: '',
            fifthColumn: '',
          });
        }
      }
      if (this.showProvince) {
        this.tableData.push({
          firstColumn: `省复核意见`,
          secondColumn: 'provinceOpinion',
          thirdColumn: '',
          fourthColumn: '',
          fifthColumn: '',
        });
      }
    },
    verifyRes(index) {
      switch (index) {
        case 0:
          return '不通过';
        case 1:
          return '通过';
        case -1:
          return '不通过';
        default:
          return '';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.table-content {
  margin-top: 20px;
  margin-bottom: 41px;
  padding: 0 20px;
  width: 100%;
  .el-table {
    overflow: hidden;
  }
  ::v-deep .el-table .cell {
    white-space: pre-line;
  }
}
</style>
