<template>
  <div class="village-manage block">
    <div v-if="$route.name === 'VillageApplyList2'">
      <div class="text-lg mb-4">申报列表</div>
      <Crud
        ref="crud"
        :get-method="getMethod"
        :delete-method="deleteMethod"
        :query.sync="query"
        :showOrder="false"
        selection
        id-key="id"
        actionWidth="200px"
        :multiple-delete="COUNTRY"
        showExport
        :export-method="exportMethod"
        :hideAdd="true"
        :hideEdit="true"
        :hideView="true"
        :hideDelete="true"
        :permission-add="0"
        :permission-edit="0"
        :permission-delete="10004"
        :export-file-name="exportFileName"
        exportName="导出信息汇总表"
        @selectionChange="selectionChange"
      >
        <template v-slot:search>
          <div class="inline-flex pl-0" style="flex-wrap: wrap">
            <div class="search-item mb-6">
              <span class="label">村（片区）名称：</span>
              <el-input
                style="width: 200px"
                v-model="query.villageName"
                :maxlength="50"
                placeholder="请输入村（片区）名称"
              >
              </el-input>
            </div>
            <div class="search-item mb-6">
              <span class="label">地区：</span>
              <el-select v-if="CITY" v-model="query.county" placeholder="请选择">
                <el-option v-for="item in queryCityListOpt" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
              <el-select v-if="PROVINCE" v-model="query.city" placeholder="请选择">
                <el-option v-for="item in queryProListOpt" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="search-item mb-6">
              <span class="label">创建批次：</span>
              <el-select v-model="query.declarationBatch" placeholder="请选择">
                <el-option
                  v-for="item in queryDeclareTypeOpt"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div class="search-item mb-6">
              <span class="label">状态：</span>
              <el-select v-model="query.finalStatus" placeholder="请选择">
                <el-option v-for="item in declareStatusOpt" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
        </template>
        <template v-slot:crudAction>
          <el-button v-if="VILLAGE" type="primary" icon="el-icon-plus" @click="newApplications"> 新建申报</el-button>
        </template>
        <template v-slot:export>
          <el-button v-if="COUNTRY || COUNTRY_LEADER" icon="el-icon-download" type="primary" plain @click="exportDatas"
            >材料打印
          </el-button>
          <el-button v-if="COUNTRY_LEADER || CITY_LEADER" type="primary" @click="UnifiedReport"> 统一上报</el-button>
        </template>
        <template v-slot:tableAction="scope">
          <div style="text-align: left">
            <!--            <el-link v-if="actionControl('排序', scope.data)" type="primary" @click="sort(scope)"> 排序 </el-link>-->
            <span v-if="actionControl('详情', scope.data)">
              <!--              <el-divider v-if="actionControl('排序', scope.data)" direction="vertical"></el-divider>-->
              <el-link @click="goDetail(scope)" type="primary"> 详情 </el-link>
            </span>
            <span v-if="actionControl('审核', scope.data)">
              <el-divider
                v-if="actionControl('排序', scope.data) || actionControl('详情', scope.data)"
                direction="vertical"
              ></el-divider>
              <el-link @click="goAudit(scope)" type="primary"> 审核 </el-link>
            </span>

            <!--            &lt;!&ndash;            市级审核修改&ndash;&gt;-->
            <!--            <span v-if="actionControl('修改', scope.data)">-->
            <!--              <el-divider-->
            <!--                v-if="-->
            <!--                  actionControl('排序', scope.data) ||-->
            <!--                  actionControl('详情', scope.data) ||-->
            <!--                  actionControl('审核', scope.data)-->
            <!--                "-->
            <!--                direction="vertical"-->
            <!--              ></el-divider>-->
            <!--              <el-link @click="handleEdit(scope)" type="primary">-->
            <!--                {{ COUNTRY || COUNTRY_LEADER ? '审阅' : '修改' }}-->
            <!--              </el-link>-->
            <!--            </span>-->
            <!--            市级审核修改-->
            <span v-if="actionControl('审阅', scope.data)">
              <el-divider
                v-if="
                  actionControl('排序', scope.data) ||
                  actionControl('详情', scope.data) ||
                  actionControl('审核', scope.data)
                "
                direction="vertical"
              ></el-divider>
              <el-link @click="handleEdit(scope)" type="primary"> 审阅 </el-link>
            </span>

            <span v-if="actionControl('删除', scope.data)">
              <el-divider
                direction="vertical"
                v-if="
                  actionControl('排序', scope.data) ||
                  actionControl('详情', scope.data) ||
                  actionControl('审核', scope.data) ||
                  actionControl('审阅', scope.data)
                "
              ></el-divider>
              <el-link @click="deleteItem(scope.data.id)" type="danger"> 删除 </el-link>
            </span>
          </div>
        </template>

        <template v-slot:table>
          <!--          排序功能去掉-->
          <!--          <el-table-column-->
          <!--            v-if="COUNTRY || COUNTRY_LEADER || CITY || CITY_LEADER"-->
          <!--            :label="COUNTRY || COUNTRY_LEADER ? '推荐次序' : '县推荐次序'"-->
          <!--            align="center"-->
          <!--            width="100"-->
          <!--            prop="countrySortNum"-->
          <!--          >-->
          <!--            <template slot-scope="scope">-->
          <!--              <p>{{ scope.row.countrySortNum || '-' }}</p>-->
          <!--            </template>-->
          <!--          </el-table-column>-->
          <!--          <el-table-column-->
          <!--            v-if="CITY || CITY_LEADER || PROVINCE"-->
          <!--            :label="CITY || CITY_LEADER ? '市推荐次序' : '推荐次序'"-->
          <!--            align="center"-->
          <!--            width="100"-->
          <!--            prop="citySortNum"-->
          <!--          >-->
          <!--            <template slot-scope="scope">-->
          <!--              <p>{{ scope.row.citySortNum && scope.row.citySortNum < 0 ? '-' : scope.row.citySortNum || '-' }}</p>-->
          <!--            </template>-->
          <!--          </el-table-column>-->
          <el-table-column label="创建批次" prop="declarationBatch"></el-table-column>
          <el-table-column label="村（片区）名称" prop="villageName">
            <template slot-scope="scope">
              <p>{{ scope.row.villageName }}</p>
            </template>
          </el-table-column>
          <el-table-column v-if="PROVINCE || CITY || CITY_LEADER" label="地区" prop="gmtCreate">
            <template slot-scope="scope">
              <p>{{ scope.row.country }}</p>
            </template>
          </el-table-column>
          <el-table-column v-if="PROVINCE" label="申报市" prop="gmtCreate">
            <template slot-scope="scope">
              <p>{{ scope.row.city }}</p>
            </template>
          </el-table-column>
          <el-table-column label="计划总投资（万元）" prop="investNum">
            <template slot-scope="scope">
              <p>{{ formatMoney(scope.row.investNum) }}</p>
            </template>
          </el-table-column>
          <el-table-column label="上报时间" prop="gmtCreate">
            <template slot-scope="scope">
              <p>{{ scope.row.gmtCreate }}</p>
            </template>
          </el-table-column>
          <el-table-column label="状态" prop="finalStatus">
            <!--            0:市级未审核、1:市级已驳回、2:省级未审核、3:省级已驳回、4:审核通过-->
            <template slot-scope="scope">
              <p :style="{ color: textColor[scope.row.finalStatus] }">
                <!--                <i class="status" :class="{ active: scope.row.finalStatus === 4 }"></i>-->
                {{ declareStatus[scope.row.finalStatus] }}
              </p>
            </template>
          </el-table-column>
        </template>
      </Crud>
    </div>
    <el-dialog title="排序" :visible.sync="sortDialogVisible" width="30%">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="推荐次序" prop="sort" :rules="sortRule">
          <el-input v-model.number="form.sort"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="sortDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="onSubmit">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { mapMutations } from 'vuex';
import {
  queryBatchInfo,
  getVillageList,
  deleteVillageItem,
  materialPrinting,
  sortList,
  unifiedReporting,
  getCityList,
  getProList,
} from '@/api2/villageManage';
import { recVerify } from '@/api/villageManage';
import { getvillagesExport } from '@/api2/villageManage';
import { downloadFile } from '@/utils/data';
import rule from '@/mixins/rule';
import role from '@/views2/mixins/role';

import { FINAL_STATUS, FINAL_STATUE_COLOR, DECLARE_STATUS } from '@/views2/utils/constants';
import {
  XIANJI_ACTION,
  SHIJI_ACTION,
  ADMIN_ACTION,
  CUNJI_ACTION,
  checkCountryUnifiedReport,
  checkCityUnifiedReport,
} from './utils';

import { formatMoney } from '@/views2/utils/formatter';

const sort = (rule, value, callback) => {
  if (!value) {
    callback(new Error('填写不能为空'));
    // }else if((typeof value === String && value.indexOf(".") !== -1 && value.split('.').length > 2) || !parseFloat(value) || parseFloat(value).toString() !== value){
  } else if (isNaN(value)) {
    callback(new Error('输入格式有误，仅支持数字格式')); //防止输入多个小数点
  } else {
    callback();
  }
};
export default {
  mixins: [rule, role],
  data() {
    return {
      FINAL_STATUS,
      exportFileName: '创建申报信息汇总表',
      selections: [],
      query: {
        declarationBatch: '',
        finalStatus: '',
        villageName: '',
        city: '', // 市中文名称
        county: '', //县中文名称
      },
      queryDeclareTypeOpt: [
        {
          label: '全部',
          value: '',
        },
      ],
      queryCityListOpt: [
        {
          label: '全部',
          value: '',
        },
      ],
      queryProListOpt: [
        {
          label: '全部',
          value: '',
        },
      ],
      form: {
        id: null,
        sort: null,
      },
      dialogDeclareYearOpt: [],
      dialogDeclareTypeOpt2: [],
      declareStatusOpt: [
        {
          label: '全部',
          value: '',
        },
      ],
      // 最终审核状态（0:市级未审核、1:市级已驳回、2:省级未审核、3:省级已驳回、4:审核通过 5县级待上报 6市级待上报
      // 0:市级未审核、1:市级已驳回、2:省级未审核、3:省级已驳回、4:审核通过
      textColor: FINAL_STATUE_COLOR,
      sortDialogVisible: false, // 排序框
      sortRule: { required: true, validator: sort, trigger: 'blur' },
      getMethod: getVillageList,
      deleteMethod: deleteVillageItem,
      exportMethod: getvillagesExport,
      submitSortMethod: recVerify,
    };
  },
  beforeMount() {
    this.declareStatus = DECLARE_STATUS;
    this.declareStatusOpt = this.declareStatusOpt.concat(this.normalizeSelectOptions(DECLARE_STATUS));
    this.getBatchInfo();
    if (this.CITY) {
      this.getCityList();
    }
    if (this.PROVINCE) {
      this.getProList();
    }
  },
  mounted() {},
  methods: {
    formatMoney,
    ...mapMutations('villageMange', ['changeDeclareList']),
    normalizeSelectOptions(obj) {
      if (!Object.prototype.toString.call(obj).slice(8, -1) === 'Object') return [];
      return Object.keys(obj).map((key) => {
        return {
          label: obj[key],
          value: key,
        };
      });
    },
    newApplications() {
      this.$router.push({ name: 'newApplication' });
    },
    // 批次
    async getBatchInfo() {
      const res = await queryBatchInfo();
      const opt = (res?.content || []).map((ele) => {
        return {
          label: ele.batch,
          value: ele.batch,
        };
      });
      this.queryDeclareTypeOpt = this.queryDeclareTypeOpt.concat(opt);
    },
    // 市的县下拉列表
    async getCityList() {
      const res = await getCityList();
      const opt = (res || []).map((ele) => {
        return {
          label: ele.name,
          value: ele.name,
        };
      });
      this.queryCityListOpt = this.queryCityListOpt.concat(opt);
    },
    // 市的县下拉列表
    async getProList() {
      const res = await getProList();
      const opt = (res || []).map((ele) => {
        return {
          label: ele.name,
          value: ele.name,
        };
      });
      this.queryProListOpt = this.queryProListOpt.concat(opt);
    },
    selectionChange(val) {
      this.selections = val;
    },
    // 打印材料
    async exportDatas() {
      if (this.selections.length === 0) {
        this.$notify.error('请选择需要打印的数据');
        return;
      }
      if (this.selections.some((i) => i.finalStatus === FINAL_STATUS.COUNTRY_REPORT_PENDING)) {
        this.$notify.error('需先上报后才可进行导出');
        return;
      } else {
        this.$confirm('是否批量导出所选数据？', '提示', {
          type: 'warning',
        }).then(async () => {
          const data = this.selections.map((ele) => ele.id);
          const res = await materialPrinting(data);
          downloadFile(res, '未来乡村创建申报材料打印.zip', 'application/gzip');
          // this.$notify.success('导出成功');
        });
      }
    },
    // 统一上报
    async UnifiedReport() {
      if (this.selections.length === 0) {
        this.$notify.error('请选择需要上报的申报信息');
        return;
      }
      if (this.COUNTRY_LEADER) {
        //县级
        if (!this.selections.every((i) => i.finalStatus === FINAL_STATUS.COUNTRY_REPORT_PENDING)) {
          // 5县级待上报
          this.$notify.error('选中的申报信息状态有误');
          return;
        } else if (!checkCountryUnifiedReport(this.selections)) {
          this.$notify.error('请先对选中的申报信息进行推荐次序排序');
          return;
        }
      } else if (this.CITY_LEADER) {
        // 市级
        if (!this.selections.every((i) => i.finalStatus === FINAL_STATUS.CITY_REPORT_PENDING)) {
          // 6市级待上报
          this.$notify.error('选中的申报信息状态有误');
          return;
        } else if (!this.selections.every((i) => !isNaN(i.citySortNum)) || !checkCityUnifiedReport(this.selections)) {
          this.$notify.error('请先对选中的申报信息进行推荐次序排序');
          return;
        }
      }
      this.$confirm('是否确认上报选中的申报信息？', '提示', {
        type: 'warning',
      }).then(() => {
        const data = this.selections.map((item) => item.id);
        unifiedReporting(data).then(() => {
          this.$notify.success('统一上报成功！');
          this.$refs.crud.getItems();
        });
      });
    },
    // 排序
    sort(scope) {
      this.form.sort = null;
      this.form.id = scope.data.id;
      this.sortDialogVisible = true;
    },
    // 提交排序
    onSubmit() {
      const data = {
        id: this.form.id,
        sortNum: this.form.sort,
      };
      sortList(data).then(() => {
        this.form.id = null;
        this.form.sort = null;
        this.sortDialogVisible = false;
        this.$refs.crud.getItems();
        this.$notify.success('提交排序成功！');
      });
    },
    // 审核详情
    goDetail(scope) {
      const { id } = scope.data;
      this.$router.push({ name: 'villageDetails', query: { id: id } });
    },
    // 审核
    goAudit(scope) {
      const { id } = scope.data;
      this.$router.push({ name: 'villageDetails', query: { id: id, cityVerify: true } });
    },
    // 市级审核修改
    goAuditVerify(scope) {
      const { id } = scope.data;
      this.$router.push({ name: 'villageDetails', query: { id: id, cityVerify: true } });
    },

    // 修改
    edit(data) {
      console.log(data);
      const { id } = data;
      this.$router.push({
        name: 'newApplication',
        query: { id },
      });
    },
    handleEdit(scope) {
      if (this.CITY || this.CITY_LEADER) {
        this.goAuditVerify(scope);
      } else {
        this.edit(scope.data);
      }
    },
    // 删除
    deleteItem(id) {
      this.$confirm('是否确认删除该条申报信息？', '提示', {
        type: 'warning',
      }).then(async () => {
        deleteVillageItem([id]).then(() => {
          this.$notify.success('删除成功');
          this.$refs.crud.getItems();
        });
      });
    },

    /**
     * @desc 判断action按钮是否显示
     * @param {String} actionName 按钮名称
     * @param {Object} data 数据
     */
    actionControl(actionName, data) {
      if (this.VILLAGE) {
        // 村级
        return CUNJI_ACTION[actionName] && CUNJI_ACTION[actionName](data);
      } else if (this.COUNTRY || this.COUNTRY_LEADER) {
        // 县级
        return XIANJI_ACTION[actionName] && XIANJI_ACTION[actionName](data);
      } else if (this.CITY || this.CITY_LEADER) {
        // 市级
        return SHIJI_ACTION[actionName] && SHIJI_ACTION[actionName](data);
      } else if (this.PROVINCE) {
        // 省
        return ADMIN_ACTION[actionName] && ADMIN_ACTION[actionName](data);
      }
      return false;
    },
  },
};
</script>
<style lang="scss" scoped>
.search-item {
  margin-right: 20px;
  white-space: nowrap;

  .label {
    font-weight: 400;
    color: #333333;
  }

  > div {
    display: inline-block;
  }
}

.status {
  display: inline-block;
  margin-right: 6px;
  width: 8px;
  height: 8px;
  border-radius: 100%;
  background: #ccc;

  &.active {
    background: #15be50;
  }
}

.tip {
  background: #edf4ff;
  border: 1px solid #99cbf9;
  border-radius: 4px;
  padding: 12px 16px;
  margin-bottom: 20px;
  display: flex;

  .tip-left {
    img {
      width: 16px;
      height: 16px;
      //background: #1492FF;
    }

    margin-right: 12px;
  }

  .tip-right {
    .tip-title {
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #000000;
      line-height: 22px;
      margin-bottom: 8px;
    }

    .tip-content {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #666666;
      line-height: 22px;
      margin-bottom: 8px;

      span {
        color: #1492ff;
      }
    }

    .tip-button {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #1492ff;
      line-height: 22px;
    }
  }
}
</style>
