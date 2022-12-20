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
            <span v-if="row.secondColumn === 'startTime'"
              >计划从 {{ (form[row.secondColumn] || '').slice(0, 7) }} 至
              {{ (form['endTime'] || '').slice(0, 7) }}</span
            >
            <!--          计划总投资-->
            <span v-else-if="row.secondColumn === 'investNum'">
              {{ formatMoney(form.investNum) }}
            </span>
            <!--          村民代表会议（村民会议）关于未来乡村建设方案决议情况-->
            <div v-else-if="row.secondColumn === 'meetingText'">
              <p class="content">{{ form.meetingText }}</p>
              <p class="mt-2">
                <ViewImg v-if="form.meetingPic && form.meetingPic.length" :data="form.meetingPic"></ViewImg>
              </p>
            </div>
            <!--          设区市比选意见-->
            <div v-else-if="row.secondColumn === 'cityVerify'">
              <p class="content">{{ verifyRes(form.cityVerify) }}{{ form.cityOpinion }}</p>
              <p class="mt-2">
                <ViewFileSingle v-if="form.stampedFile" :data="form.stampedFile" />
              </p>
              <!--              <p class="content">比选时间:{{ form.cityAuditTime }}</p>-->
            </div>
            <!--          村庄属性-->
            <span v-else-if="row.secondColumn === 'villageProperty'">
              {{ form.villageProperty.toString() }}
            </span>
            <!--            一般情况-->
            <span v-else>{{ form[row.secondColumn] }} </span>
          </span>
          <span v-else-if="item.prop === 'fourthColumn'" style="color: #333333">
            <!--          村级集体经济年经营性收入-->
            <span v-if="row.fourthColumn === 'incomeNum'">
              {{ formatMoney(form.incomeNum) }}
            </span>
            <span v-else>{{ form[row.fourthColumn] }} </span>
          </span>
          <span v-else-if="item.prop === 'firstColumn'" style="color: #666666">{{ row.firstColumn }}</span>
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

export default {
  name: 'DeclarationForm',
  props: {
    form: {
      type: Object,
      default: () => {
        return {
          annexFiles: [], // 附件
          cityAuditFile: [], // 附件
          stampedFile: [], // 附件
          provinceAuditFile: [], // 附件
          villageName: '', //村庄地址
          town: '', //村庄地址
          villageId: '', //村庄地址
          countrySortNum: '', //推荐次序
          declarationBatch: '', //申报批次
          startTime: '', //创建周期 开始
          endTime: '', //创建周期 结束
          leader: '', //领办领导
          construct: '', //建设单位
          contactPerson: '', // 联系人
          phone: '', //联系方式
          huNum: '', //户籍人口数（万人）
          personNum: '', //常住人口数（万人）
          investNum: '', //计划总投资（万元）
          incomeNum: '', //村级集体经济年经营性收入（万元）
          finalStatus: null, //状态

          villageProperty: [], //村庄属性（可多选）

          basicText: '', //基本情况
          meetingText: '', //村民代表会议（村民会议）关于未来乡村建设方案决议情况
          meetingPic: [],
          townText: '', //乡、镇（街道）人民政府（办事处）意见
          departmentText: '', //县（市、区）部门审核意见
          governmentText: '', //县（市、区）人民政府意见
          projectFilingPerson: '', //填表人
          projectFilingPhone: '', //联系电话
          projectFilingAudit: '', //审核人
          projects: [], //项目列表
          richText: '23333', //
        };
      },
    },
  },
  data() {
    return {
      tableData: TABLE_DATA.slice(0), // 浅拷贝
      TABLE_TITLE: [
        { prop: 'firstColumn', width: 240 },
        { prop: 'secondColumn' },
        { prop: 'thirdColumn' },
        { prop: 'fourthColumn' },
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
      if (rowIndex < 2 || rowIndex > 5) {
        if (columnIndex === 1) {
          return [1, 3];
        }
      }
    },
    initData() {
      if (
        this.form.finalStatus !== FINAL_STATUS.COUNTRY_REPORT_PENDING &&
        this.form.finalStatus !== FINAL_STATUS.CITY_VERIFY_PENDING
      ) {
        this.tableData.push({
          firstColumn: `设区市比选意见`,
          secondColumn: 'cityVerify',
          thirdColumn: '',
          fourthColumn: '',
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
  margin-bottom: 41px;
  padding: 0 20px;
  width: 100%;
}
</style>
