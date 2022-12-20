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
            <!--          是否配备物业-->
            <span v-if="row.secondColumn === 'isAllocated'">
              {{ form.isAllocated ? '是' : '否' }}
            </span>
            <!--            一般情况-->
            <span v-else>{{ form[row.secondColumn] }} </span>
          </span>
          <span v-else-if="item.prop === 'fourthColumn'" style="color: #333333">
            {{ form[row.fourthColumn] }}
          </span>
          <span v-else-if="item.prop === 'firstColumn'" style="color: #666666">{{ row.firstColumn }}</span>
          <span v-else style="color: #666666">{{ row.thirdColumn }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { PROPERTY_TABLE_DATA } from './data';
import { formatMoney } from '@/views2/utils/formatter';
import { FINAL_STATUS } from '@/views2/utils/constants';

export default {
  name: 'DeclarationForm',
  props: {
    form: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    saveVO() {
      return this.form.saveVO || {};
    },
    villageType() {
      return this.saveVO.decType;
    },
  },
  data() {
    return {
      tableData: PROPERTY_TABLE_DATA.slice(0), // 浅拷贝
      TABLE_TITLE: [
        { prop: 'firstColumn', width: 240 },
        { prop: 'secondColumn' },
        { prop: 'thirdColumn' },
        { prop: 'fourthColumn' },
      ],
    };
  },
  beforeMount() {},
  methods: {
    formatMoney,
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      //里面包含当前行row、当前列column、当前行号rowIndex、当前列号columnIndex四个属性
      //返回一个键名为rowspan和colspan的对象。
      if (rowIndex === 1) {
        if (columnIndex === 1) {
          return [1, 3];
        }
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
