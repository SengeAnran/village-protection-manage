<template>
  <div class="score-table-module">
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      :span-method="arraySpanMethod"
      header-row-class-name="table-header"
    >
      <el-table-column label="评价内容" prop="title" align="center"></el-table-column>
      <el-table-column
        v-for="(item, i) in TABLE_TITLE"
        :key="i"
        :prop="item.prop"
        :label="item.label"
        :width="item.width || ''"
        :align="item.align || 'center'"
      >
        <template slot-scope="{ row }">
          <!-- 县级用户 -->
          <div v-if="(COUNTRY || COUNTRY_LEADER) && !disabled">
            <el-form-item
              v-if="item.prop === 'countyScore'"
              :style="{ 'margin-bottom': row.title === '合计' ? 0 : undefined }"
              label=""
              :rules="row.title === '合计' ? rules.maxScore : rule.input"
              :prop="row.countyScoreProp"
              :show-message="row.title === '合计'"
            >
              <template v-if="row.title === '合计'" #error="{ error }">
                <span class="el-form-item__error common-reset-form-error-message">{{ error }}</span>
              </template>
              <plain-text v-if="row.title === '合计'" v-model="form[row.countyScoreProp]" :formatter="displayScore" />
              <el-input-number
                v-else
                v-model="form[row.countyScoreProp]"
                size="mini"
                placeholder="请输入"
                :max="row.max || undefined"
                :precision="2"
                @change="setTotalScore('countyScoreProp', row.countyScoreProp)"
              />
            </el-form-item>
            <span v-else-if="item.prop === 'cityScore'">--</span>
            <span v-else class="cell">
              {{ row[item.prop] }}
            </span>
          </div>
          <!-- 市级用户 -->
          <div v-else-if="(CITY || CITY_LEADER) && !disabled">
            <el-form-item
              v-if="item.prop === 'cityScore'"
              label=""
              :style="{ 'margin-bottom': row.title === '合计' ? 0 : undefined }"
              :rules="row.title === '合计' ? rules.maxScore : rule.input"
              :prop="row.cityScoreProp"
              :show-message="row.title === '合计'"
            >
              <template v-if="row.title === '合计'" #error="{ error }">
                <span class="el-form-item__error common-reset-form-error-message">{{ error }}</span>
              </template>
              <plain-text v-if="row.title === '合计'" v-model="form[row.cityScoreProp]" :formatter="displayScore" />
              <el-input-number
                v-else
                v-model="form[row.cityScoreProp]"
                :max="row.max || undefined"
                :precision="2"
                size="mini"
                placeholder="请输入"
                @change="setTotalScore('cityScoreProp', row.cityScoreProp)"
              />
            </el-form-item>
            <span v-else-if="item.prop === 'countyScore'">{{ displayScore(form[row.countyScoreProp]) }}</span>
            <span v-else class="cell">{{ row[item.prop] }}</span>
          </div>
          <!-- 省级用户 -->
          <div v-else>
            <!-- <span class="cell">{{ row[item.prop] }}</span> -->
            <!-- <div v-if="userInfo.roleId === 1 || !disabled"> -->
            <span v-if="item.prop === 'countyScore'">{{ displayScore(form[row.countyScoreProp]) }}</span>
            <span v-else-if="item.prop === 'cityScore'">{{ displayScore(form[row.cityScoreProp]) }}</span>
            <span v-else class="cell">{{ row[item.prop] }}</span>
            <!-- </div> -->
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import rule from '@/mixins/rule';
import role from '@/views2/mixins/role';
import { TABLE_SCORE_DATA } from '../New/data';

import { USER_TYPE } from '@/views2/utils/constants';

export default {
  mixins: [rule, role],
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    form: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      USER_TYPE,
      TABLE_TITLE: [
        { prop: 'content', label: '评价内容' },
        { prop: 'standard', label: '评价标准', width: 400, align: 'left' },
        { prop: 'totalScore', label: '分值', width: 80 },
        { prop: 'accordance', label: '评价依据' },
        { prop: 'countyScore', label: '县自评得分', width: undefined },
        { prop: 'cityScore', label: '市自评得分', width: undefined },
      ],
      tableData: TABLE_SCORE_DATA,
      rules: {
        maxScore: [
          {
            trigger: 'change',
            validator: (rule, value, callback) => {
              value = Number(value);
              if (value > 97) {
                callback(new Error("分数不得超过97分"));
              } else {
                callback();
              }
            },
          },
        ],
      }
    };
  },
  computed: {
    userInfo() {
      return this.$store.getters.userInfo;
    },
  },
  created() {
    if (this.disabled) {
      return;
    }
    const isCOUNTRY = this.COUNTRY || this.COUNTRY_LEADER;
    const isCITY = this.CITY || this.CITY_LEADER;
    if (isCOUNTRY) {
      this.TABLE_TITLE[4].width = 160;
    } else if (isCITY) {
      this.TABLE_TITLE[5].width = 160;
    }
  },
  mounted() {
    // 注意一定要保证DOM渲染完成后在进行合并操作，否则会找不到元素
    this.$nextTick(function () {
      this.setColSpan();
    });
  },
  methods: {
    displayScore(score) {
      return Number(score || 0).toFixed(2);
    },
    arraySpanMethod({ rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 2 === 0 && rowIndex < 6) {
          return {
            rowspan: 2,
            colspan: 1,
          };
        } else if (rowIndex % 3 === 0 && rowIndex >= 6 && rowIndex < 15) {
          return {
            rowspan: 3,
            colspan: 1,
          };
        } else if (rowIndex >= 15) {
          return {
            rowspan: 1,
            colspan: 1,
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
      }
    },
    setColSpan() {
      const x = document.getElementsByClassName('el-table__header')[0].rows[0].cells;
      x[0].colSpan = 2;
      x[1].style.display = 'none';
    },

    setTotalScore(type, propsName) {
      // 设置输入为数字
      // this.form[propsName] = this.form[propsName];
      // 扣分项转化
      if (propsName.indexOf('negative') !== -1) {
        this.form[propsName] = this.form[propsName] > 0 ? -this.form[propsName] : this.form[propsName];
      }

      // 计算总值
      if (type === 'countyScoreProp') {
        this.form.totalCounty = this.countScore('countyScoreProp');
      } else if (type === 'cityScoreProp') {
        this.form.totalCity = this.countScore('cityScoreProp');

        this.$emit('evaluateChange'); // 触发排名变动
      }
    },
    countScore(prop) {
      const { form } = this;
      let sums = this.tableData.slice(0, -1).reduce((prev, curr) => {
        const value = Number(form[curr[prop]]);
        if (!isNaN(value)) {
          return prev + value;
        } else {
          return prev;
        }
      }, 0);
      return sums;
    },
    // _transNumber(val) {
    //   return val.replace(/^(?:0\d|\D)*(\d*(?:\.\d{0,2})?).*$/g, '$1');
    // },
  },
};
</script>
<style lang="scss" scoped>
.score-table-module {
  padding: 20px;
  ::v-deep .table-header {
    height: 56px;
    background: #f7f8fa;
    th {
      background: transparent;
    }
  }
  ::v-deep .el-table .cell {
    white-space: pre-line;
  }
}
</style>
