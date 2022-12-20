<template>
  <div class="table-content">
    <el-table :data="tableData" border :show-header="false" :span-method="arraySpanMethod">
      <el-table-column
        v-for="(item, index) in TABLE_TITLE"
        :key="index"
        :prop="item.prop"
        :width="item.width"
        :align="item.align"
      >
        <template slot-scope="{ row }">
          <span v-if="item.prop === 'secondColumn'" style="color: #333333">
            <span v-if="row.secondColumn === 'type'">{{
              form.type === null ? '--' : PROJECT_TYPE[Number(form.type)]
            }}</span>
            <!--          进度安排-->
            <span v-else-if="row.secondColumn === 'schedule'">
              {{ form.schedule + ' 至 ' + form.scheduleEnd }}
            </span>
            <!--          是否开工-->
            <span v-else-if="row.secondColumn === 'isStart'">
              {{ form.isStart === null ? '--' : form.isStart ? '是' : '否' }}
            </span>
            <!--          是否竣工-->
            <span v-else-if="row.secondColumn === 'isEnd'">
              {{ form.isEnd === null ? '--' : form.isEnd ? '是' : '否' }}
            </span>
            <!--          第一年年计划投资-->
            <span v-else-if="row.secondColumn === 'planFirst'">
              {{ formatMoney(form.planFirst || form.planFirstGov + form.planFirstDrive) }}
            </span>
            <!--          第二年年计划投资-->
            <span v-else-if="row.secondColumn === 'planSecond'">
              {{ formatMoney(form.planSecond || Number(form.planSecondGov) + Number(form.planSecondDrive)) }}
            </span>
            <!--          第一年完成投资-->
            <span v-else-if="row.secondColumn === 'comFirst'">
              {{ formatMoney(form.comFirst || Number(form.comFirstGov) + Number(form.comFirstDrive) || 0) }}
            </span>
            <!--          第二年完成投资-->
            <span v-else-if="row.secondColumn === 'comSecond'">
              {{ formatMoney(form.comSecond || Number(form.comSecondGov) + Number(form.comSecondDrive)) }}
            </span>
            <!--          计划投资完成率（%）-->
            <span v-else-if="row.secondColumn === 'planRate'">
              {{ formatScore(form.planRate) }}
            </span>
            <!--          年度投资完成率（%）-->
            <span v-else-if="row.secondColumn === 'yearRate'">
              {{ formatScore(form.yearRate) }}
            </span>
            <!--          总体进度（%）-->
            <span v-else-if="row.secondColumn === 'overallProgress'">
              {{ formatScore(form.overallProgress) }}
            </span>
            <!--          照片-->
            <span v-else-if="row.secondColumn === 'oldPics'">
              <ViewImg v-if="oldPics && oldPics.length" :data="oldPics" :modal="false"></ViewImg>
            </span>
            <!--            一般情况-->
            <span v-else>{{ form[row.secondColumn] }} </span>
          </span>
          <span v-else-if="item.prop === 'fourthColumn'" style="color: #333333">
            <!--          第一年计划投资 其中政府投资-->
            <span v-if="row.fourthColumn === 'planFirstGov'">
              {{ formatMoney(form.planFirstGov || 0) }}
            </span>
            <!--          第二年计划投资 其中政府投资-->
            <span v-else-if="row.fourthColumn === 'planSecondGov'">
              {{ formatMoney(form.planSecondGov || 0) }}
            </span>
            <!--          第一年完成投资 其中政府投资-->
            <span v-else-if="row.fourthColumn === 'comFirstGov'">
              {{ formatMoney(form.comFirstGov || 0) }}
            </span>
            <!--          第二年完成投资 其中政府投资-->
            <span v-else-if="row.fourthColumn === 'comSecondGov'">
              {{ formatMoney(form.comSecondGov || 0) }}
            </span>
            <span v-else>{{ form[row.fourthColumn] }} </span>
          </span>
          <span v-else-if="item.prop === 'sixth'" style="color: #333333">
            <!--          第一年计划投资 其中带动投资-->
            <span v-if="row.sixth === 'planFirstDrive'">
              {{ formatMoney(form.planFirstDrive || 0) }}
            </span>
            <!--          第二年计划投资 其中带动投资-->
            <span v-else-if="row.sixth === 'planSecondDrive'">
              {{ formatMoney(form.planSecondDrive || 0) }}
            </span>
            <!--          第一年完成投资 其中带动投资-->
            <span v-else-if="row.sixth === 'comFirstDrive'">
              {{ formatMoney(form.comFirstDrive || 0) }}
            </span>
            <!--          第二年完成投资 其中带动投资-->
            <span v-else-if="row.sixth === 'comSecondDrive'">
              {{ formatMoney(form.comSecondDrive || 0) }}
            </span>
            <span v-else>{{ form[row.sixth] }}</span>
          </span>
          <span v-else-if="item.prop === 'firstColumn'" style="color: #666666">
            <!--          第一年计划投资 -->
            <span v-if="row.firstColumn === '2022年计划投资（万元）'">
              {{ form.firstYear + '年计划投资（万元）' }}
            </span>
            <!--          第二年计划投资 -->
            <span v-else-if="row.firstColumn === '2023年计划投资（万元）'">
              {{ form.firstYear + 1 + '年计划投资（万元）' }}
            </span>
            <!--          第一年完成投资 -->
            <span v-else-if="row.firstColumn === '2022年完成投资（万元）'">
              {{ form.firstYear + '年完成投资（万元）' }}
            </span>
            <!--          第二年完成投资 -->
            <span v-else-if="row.firstColumn === '2023年完成投资（万元）'">
              {{ form.firstYear + 1 + '年完成投资（万元）' }}
            </span>
            <span v-else>{{ row.firstColumn }}</span>
          </span>
          <span v-else-if="item.prop === 'fifth'" style="color: #666666">
            {{ row.fifth }}
          </span>
          <span v-else style="color: #666666">{{ row.thirdColumn }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { TABLE_DATA } from './data';
import { PROJECT_TYPE } from './constants';
import { formatMoney, formatScore } from '@/views2/utils/formatter';

export default {
  name: 'DeclarationForm',
  props: {
    form: {
      type: Object,
      default: () => {},
    },
    oldPics: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      tableData: TABLE_DATA.slice(0), // 浅拷贝
      TABLE_TITLE: [
        { prop: 'firstColumn', width: 160 },
        { prop: 'secondColumn' },
        { prop: 'thirdColumn' },
        { prop: 'fourthColumn' },
        { prop: 'fifth' },
        { prop: 'sixth' },
      ],
      PROJECT_TYPE,
    };
  },
  beforeMount() {
    // console.log(this.tableData);
  },
  methods: {
    formatMoney,
    formatScore,
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      //里面包含当前行row、当前列column、当前行号rowIndex、当前列号columnIndex四个属性
      //返回一个键名为rowspan和colspan的对象。
      if (rowIndex < 9 || rowIndex > 12) {
        if (columnIndex === 1) {
          return [1, 5];
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.table-content {
  margin-bottom: 41px;
  //padding: 0 20px;
  width: 100%;
}
</style>
