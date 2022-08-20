<template>
  <div class="village-manage block">
    <div v-if="$route.name === 'VillageApplyList2'">
      <div class="text-lg mb-4">申报列表</div>
      <Crud
        ref="crud"
        :get-method="getMethod"
        :delete-method="deleteMethod"
        :query.sync="query"
        selection
        id-key="id"
        actionWidth="200px"
        :multiple-delete="userInfo.roleId === 3"
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
          <div class="inline-flex mb-6 pl-0">
            <div class="search-item">
              <span class="label">村（片区）名称：</span>
              <el-input
                style="width: 200px"
                v-model="query.villageName"
                :maxlength="50"
                placeholder="请输入村（片区）名称"
              ></el-input>
            </div>
            <div class="search-item">
              <span class="label">申报批次：</span>
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
            <div class="search-item">
              <span class="label">状态：</span>
              <el-select v-model="query.finalStatus" placeholder="请选择">
                <el-option v-for="item in declareStatusOpt" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
        </template>
        <template v-slot:crudAction>
          <el-button v-if="roleId === 3" type="primary" icon="el-icon-plus" @click="newApplications">
            新建申报</el-button
          >
        </template>
        <template v-slot:export>
          <el-button v-if="roleId !== 1" icon="el-icon-download" type="primary" plain @click="exportDatas"
            >材料打印</el-button
          >
          <el-button v-if="roleId === 3 || roleId === 2" type="primary" @click="UnifiedReport"> 统一上报</el-button>
        </template>
        <template v-slot:tableAction="scope">
          <div style="text-align: left">
            <el-link
              v-if="
                actionControl('排序', scope.data.finalStatus) &&
                (isNaN(scope.data.countrySortNum) || isNaN(scope.data.citySortNum))
              "
              type="primary"
              @click="sort(scope)"
            >
              排序
            </el-link>
            <el-divider v-if="actionControl('排序', scope.data.finalStatus)" direction="vertical"></el-divider>
            <el-link @click="goAuditResult(scope)" v-if="actionControl('详情', scope.data.finalStatus)" type="primary">
              详情
            </el-link>
            <!--            <el-divider v-if="roleId !== 1" direction="vertical"></el-divider>-->
            <el-link @click="goAudit(scope)" v-if="actionControl('审核', scope.data.finalStatus)" type="primary">
              审核
            </el-link>
            <!--            市级审核修改-->
            <el-divider
              v-if="roleId === 2 && scope.data.rejectType === 2 && scope.data.finalStatus === 3"
              direction="vertical"
            ></el-divider>
            <el-link
              @click="goAuditVerify(scope)"
              v-if="roleId === 2 && scope.data.rejectType === 2 && scope.data.finalStatus === 3"
              type="primary"
            >
              修改
            </el-link>
            <el-divider
              v-if="
                actionControl('修改', scope.data.finalStatus) ||
                (roleId === 3 && scope.data.finalStatus === 3 && scope.data.rejectType === 1)
              "
              direction="vertical"
            ></el-divider>
            <div
              style="display: inline-block"
              v-if="
                actionControl('修改', scope.data.finalStatus) ||
                (roleId === 3 && scope.data.finalStatus === 3 && scope.data.rejectType === 1)
              "
            >
              <el-link @click="edit(scope.data)" type="primary"> 修改</el-link>
              <!--              <el-divider direction="vertical"></el-divider>-->
            </div>
            <el-divider v-if="actionControl('删除', scope.data.finalStatus)" direction="vertical"></el-divider>
            <el-link
              @click="deleteItem(scope.data.id)"
              v-if="actionControl('删除', scope.data.finalStatus)"
              type="danger"
            >
              删除
            </el-link>
            <el-divider v-if="roleId === 3 && scope.data.finalStatus === 4" direction="vertical"></el-divider>
            <el-link @click="uploadScan(scope)" v-if="roleId === 3 && scope.data.finalStatus === 4" type="primary">
              扫描件上传
            </el-link>
          </div>
        </template>

        <template v-slot:table>
          <el-table-column label="申报批次" prop="declarationBatch"></el-table-column>
          <el-table-column v-if="roleId === 3" label="推荐次序" align="center" width="100" prop="countrySortNum">
            <template slot-scope="scope">
              <p>{{ scope.row.countrySortNum || '-' }}</p>
            </template>
          </el-table-column>
          <el-table-column v-if="roleId === 2" label="推荐次序" align="center" width="100" prop="citySortNum">
            <template slot-scope="scope">
              <p>{{ scope.row.citySortNum || '-' }}</p>
            </template>
          </el-table-column>
          <el-table-column label="村（片区）名称" prop="villageName">
            <template slot-scope="scope">
              <p>{{ scope.row.villageName }}</p>
            </template>
          </el-table-column>
          <el-table-column v-if="roleId < 3" label="地区" prop="gmtCreate">
            <template slot-scope="scope">
              <p>{{ scope.row.country }}</p>
            </template>
          </el-table-column>
          <el-table-column v-if="roleId < 2" label="申报市" prop="gmtCreate">
            <template slot-scope="scope">
              <p>{{ scope.row.city }}</p>
            </template>
          </el-table-column>
          <el-table-column label="计划总投资（万元）" prop="investNum"></el-table-column>
          <el-table-column label="申报时间" prop="gmtCreate">
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
          <el-button type="primary" @click="onSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="扫描件上传" :visible.sync="ScanDocDialogVisible" width="600px">
      <el-form ref="form" :model="form2" label-width="80px">
        <el-form-item label="" :rules="rule.upload" prop="annexFiles">
          <UploadFile2
            tip="支持格式：.doc, .docx, .pdf"
            accept=".doc,.docx,.pdf"
            :data="form2.annexFiles"
            :limit="1"
            @add="onFileAdd($event, 'annexFiles')"
            @remove="onFileRemove($event, 'annexFiles')"
          />
          <p style="width: 100%; color: #ff6b00" class="py-4 leading-5">
            <i class="el-icon-warning"></i>请上传已盖章完成的《浙江省未来乡村创建申报表》盖章扫描件
          </p>
        </el-form-item>
        <el-form-item>
          <el-button>取消</el-button>
          <el-button type="primary" @click="onSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex';
import {
  queryBatchInfo,
  getVillageList,
  deleteVillageItem,
  materialPrinting,
  sortList,
  unifiedReporting,
} from '@/api2/villageManage';
import { DECLEAR_STATUS } from './constants';
import { recVerify } from '../../api/villageManage';
import { getvillagesExport } from '../../api2/villageManage';
import { downloadWordFile } from '@/utils/data';
import rule from '@/mixins/rule';
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
  mixins: [rule],
  data() {
    return {
      exportFileName: '创建申报信息汇总表',
      exportFileName2: '浙江省未来乡村创建申报表',
      selections: [],
      query: {
        declarationBatch: '',
        finalStatus: '',
        villageName: '',
      },
      queryDeclareTypeOpt: [
        {
          label: '全部',
          value: '',
        },
      ],
      form: {
        id: null,
        sort: null,
      },
      form2: {
        annexFiles: [],
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
      textColor: ['#E6A23C', '#F56C6C', '#E6A23C', '#F56C6C', '#67C23A', '#E6A23C', '#E6A23C'],
      sortDialogVisible: false, // 排序框
      ScanDocDialogVisible: false, // 扫描件上传
      sortRule: { required: true, validator: sort, trigger: 'blur' },
      getMethod: getVillageList,
      deleteMethod: deleteVillageItem,
      exportMethod: getvillagesExport,
      submitSortMethod: recVerify,
    };
  },
  computed: {
    ...mapGetters(['userInfo']),
    roleId() {
      return this.userInfo.roleId;
    },
  },
  beforeMount() {
    this.declareStatus = DECLEAR_STATUS;
    this.declareStatusOpt = this.declareStatusOpt.concat(this.normalizeSelectOptions(DECLEAR_STATUS));
    this.getBatchInfo();

    this.XIANJI_ACTION = {
      修改: (declareStatus) => this._canModify(declareStatus, 3),
      删除: (declareStatus) => this._canModify(declareStatus, 3),
      详情: (declareStatus) => this._canViewDeclare(declareStatus, 3),
      排序: (declareStatus) => this._canSort(declareStatus, 3),
    };
    this.SHIJI_ACTION = {
      修改: (declareStatus) => this._canModify(declareStatus, 2),
      审核: (declareStatus) => this._canDeclare(declareStatus, 2),
      详情: (declareStatus) => this._canViewDeclare(declareStatus, 2),
      排序: (declareStatus) => this._canSort(declareStatus, 2),
    };
    this.ADMIN_ACTION = {
      审核: (declareStatus) => this._canDeclare(declareStatus, 1),
      详情: (declareStatus) => this._canSort(declareStatus, 1),
    };
  },
  mounted() {},
  methods: {
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
      const opt = res.map((i) => {
        return {
          label: i,
          value: i,
        };
      });
      this.queryDeclareTypeOpt = this.queryDeclareTypeOpt.concat(opt);
    },
    selectionChange(val) {
      this.selections = val;
    },
    // 打印材料
    async exportDatas() {
      if (this.selections.length === 0) {
        this.$notify.error('请选择需要导出的数据');
        return;
      }
      if (!this.selections.every((i) => i.finalStatus === 4)) {
        this.$notify.error('该条示范带信息市级还未通过审核，无法导出打印');
        return;
      } else {
        this.$confirm('是否批量导出所选数据？', '提示', {
          type: 'warning',
        }).then(async () => {
          this.selections.forEach(async (item) => {
            const data = {
              id: item.id,
            };
            const res = await materialPrinting(data);
            downloadWordFile(res, this.exportFileName2);
            this.$notify.success('导出成功');
          });
        });
      }
    },
    // 统一上报
    async UnifiedReport() {
      if (this.selections.length === 0) {
        this.$notify.error('请选择需要上报的申报信息');
        return;
      }
      if (this.roleId === 3) {
        //县级
        if (!this.selections.every((i) => i.finalStatus === 0)) {
          // 5县级待上报
          this.$notify.error('选中的申报信息状态有误');
          return;
        } else if (!this.selections.every((i) => !isNaN(i.countrySortNum)) || this.sortNum('countrySortNum')) {
          this.$notify.error('请先对选中的申报信息进行推荐次序排序');
          return;
        }
      } else if (this.roleId === 2) {
        // 市级
        if (!this.selections.every((i) => i.finalStatus === 6)) {
          // 6市级待上报
          this.$notify.error('选中的申报信息状态有误');
          return;
        } else if (!this.selections.every((i) => !isNaN(i.citySortNum)) || this.sortNum('citySortNum')) {
          this.$notify.error('请先对选中的申报信息进行推荐次序排序');
          return;
        }
      }
      this.$confirm('是否确认上报选中的申报信息？', '提示', {
        type: 'warning',
      }).then(() => {
        const data = {
          ids: this.selections.map((item) => item.id),
        };
        unifiedReporting(data).then(() => {
          this.$notify.success('统一上报成功！');
        });
      });
    },
    sortNum(key) {
      // 判断排序是否合理
      const sortNums = this.selections.map((i) => i[key]).sort();
      return !sortNums.every((i, index) => i === index + 1);
    },
    onFileAdd(file, key) {
      this.form2[key].push(file);
    },
    onFileRemove(file, key) {
      const index = this.form2[key].findIndex((item) => {
        return item.uid === file.uid || item.filePath === file.url;
      });
      if (index !== -1) {
        this.form2[key].splice(index, 1);
      }
    },
    // 上传扫描件
    uploadScan(scope) {
      console.log(scope);
      this.ScanDocDialogVisible = true;
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
    goAuditResult(scope) {
      const { id } = scope.data;
      this.$router.push({ name: 'villageDetails', query: { id: id } });
    },
    // 审核
    goAudit(scope) {
      const { id } = scope.data;
      this.$router.push({ name: 'villageDetails', query: { id: id } });
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
     * @param {Number} declareStatus 审核状态码
     */
    actionControl(actionName, declareStatus) {
      if (this.roleId === 3) {
        // 县级
        return this.XIANJI_ACTION[actionName] && this.XIANJI_ACTION[actionName](declareStatus);
      } else if (this.roleId === 2) {
        return (
          // 市级
          this.SHIJI_ACTION[actionName] && this.SHIJI_ACTION[actionName](declareStatus)
        );
      } else if (this.roleId === 1) {
        return (
          // 省
          this.ADMIN_ACTION[actionName] && this.ADMIN_ACTION[actionName](declareStatus)
        );
      }
      return false;
    },

    // 排序
    _canSort(declareStatus, roleId) {
      if ((roleId === 3 && declareStatus === 5) || (roleId === 2 && declareStatus === 6)) {
        return true;
      }
      return false;
    },

    // 修改、删除 *******
    _canModify(declareStatus, roleId) {
      return roleId === 3 && (declareStatus === 0 || declareStatus === 1);
    },
    // 审核详情
    _canViewDeclare(declareStatus, roleId) {
      if (roleId === 3) {
        return true;
      } else if (roleId === 2) {
        return declareStatus !== 0;
      } else if (roleId === 1) {
        return declareStatus !== 2;
      }
      return false;
    },
    // 审核
    _canDeclare(declareStatus, roleId) {
      if (roleId === 2) {
        return declareStatus === 0;
      } else if (roleId === 1) {
        return declareStatus === 2;
      }
      return false;
    },
  },
};
</script>
<style lang="scss" scoped>
.search-item {
  margin-right: 20px;

  .label {
    font-weight: 400;
    color: #333333;
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
