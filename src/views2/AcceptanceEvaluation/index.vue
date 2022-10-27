<template>
  <div class="village-manage block">
    <div v-loading="loading">
      <div class="text-lg mb-4">申报列表</div>
      <Crud
        ref="crud"
        :get-method="getMethod"
        :delete-method="deleteMethod"
        :query.sync="query"
        :showOrder="false"
        selection
        id-key="id"
        actionWidth="180px"
        :multiple-delete="COUNTRY || COUNTRY_LEADER"
        :hideAdd="true"
        :hideEdit="true"
        :hideView="true"
        :hideDelete="true"
        :permission-add="0"
        :permission-edit="0"
        :permission-delete="10004"
        @selectionChange="selectionChange"
      >
        <template v-slot:search>
          <list-search @changeArea="changeArea" :query="query"></list-search>
        </template>

        <template v-slot:crudAction>
          <el-button v-if="COUNTRY" type="primary" icon="el-icon-plus" @click="newApplications"> 新建申报 </el-button>
        </template>

        <template v-slot:export>
          <el-button
            v-if="CITY || CITY_LEADER || PROVINCE"
            icon="el-icon-download"
            type="primary"
            plain
            @click="exportList"
          >
            导出信息汇总表
          </el-button>
          <el-button v-if="COUNTRY || COUNTRY_LEADER" icon="el-icon-download" type="primary" plain @click="printFile">
            材料打印
          </el-button>
          <el-button v-if="CITY_LEADER || COUNTRY_LEADER" type="primary" @click="UnifiedReport"> 统一上报</el-button>
          <!-- 
          <el-button icon="el-icon-download" v-if="!isCounty" type="primary" plain @click="exportEnclosure">
            导出附件
          </el-button> -->
        </template>

        <template v-slot:tableAction="scope">
          <el-link class="link" @click="goDetail(scope)" type="primary" v-if="showDetail(scope.data)"> 详情 </el-link>
          <el-link class="link" @click="goAudit(scope)" type="primary" v-if="showAudit(scope.data)">
            {{ PROVINCE ? '复核' : '审核' }}
          </el-link>
          <el-link class="link" @click="edit(scope.data)" type="primary" v-if="showModify(scope.data)"> 修改</el-link>
          <el-link class="link" @click="deleteItem(scope.data.id)" type="danger" v-if="showDelete(scope.data)">
            删除
          </el-link>
          <!--          <el-link-->
          <!--            class="link"-->
          <!--            @click="(form2.id = scope.data.id) && (ScanDocDialogVisible = true)"-->
          <!--            type="primary"-->
          <!--            v-if="showUploadScanFile(scope.data)"-->
          <!--          >-->
          <!--            扫描件上传-->
          <!--          </el-link>-->
        </template>

        <template v-slot:table>
          <el-table-column label="地区" prop="areaPosition" v-if="!isCounty"></el-table-column>
          <el-table-column label="村(片区)名称" prop="name"></el-table-column>
          <el-table-column label="创建批次" prop="declarationBatch"></el-table-column>
          <el-table-column label="总投资（万元）" prop="investNum">
            <template slot-scope="scope">
              {{ formatMoney(scope.row.investNum) }}
            </template>
          </el-table-column>
          <el-table-column label="县自评得分" prop="totalCounty"></el-table-column>
          <el-table-column label="市评价得分" prop="totalCity" v-if="!isCounty"></el-table-column>
          <el-table-column label="评价等次" prop="cityLevelRating" v-if="!isCounty">
            <template slot-scope="scope">
              <p>
                {{ CITY_LEVEL_RATING[scope.row.cityLevelRating] || '-' }}
              </p>
            </template>
          </el-table-column>
          <el-table-column label="全市排名" prop="cityRanking" v-if="!isCounty" width="100">
            <template slot-scope="scope">
              <p v-if="scope.row.cityRanking">
                {{ scope.row.cityAcceptTime && scope.row.cityAcceptTime.replace('-', '') }} -
                {{ scope.row.cityRanking }}
              </p>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column label="验收时间段" prop="acceptTime" width="180">
            <!--            <template v-slot="scope">{{ scope.row.cityAcceptTime + '至' }}</template>-->
          </el-table-column>
          <!--          <el-table-column label="县申请时间" prop="gmtModified" v-if="!isCounty"> </el-table-column>-->
          <!--          <el-table-column label="申请时间" prop="gmtModified" v-else></el-table-column>-->
          <!--          <el-table-column label="市审核时间" prop="cityReviewTime" v-if="!isCounty"> </el-table-column>-->
          <el-table-column label="状态" prop="finalStatus">
            <!--  0:市级未审核、1:市级已驳回、2:省级未审核、3:省级已驳回、4:审核通过-->
            <template slot-scope="scope">
              <div :style="{ backgroundColor: textColor[scope.row.finalStatus] }" class="tip-point">
                <!--                <i class="status" :class="{ active: scope.row.finalStatus === 4 }"></i>-->
              </div>
              {{ DECLARE_STATUS[scope.row.finalStatus] || '--' }}
            </template>
          </el-table-column>
        </template>
      </Crud>
    </div>
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
            <i class="el-icon-warning"></i>请上传已盖章完成的《浙江省未来乡村创建成效申请表》盖章扫描件
          </p>
        </el-form-item>
        <el-form-item>
          <el-button>取消</el-button>
          <el-button type="primary" @click="onSubmitUploadScan">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { mapMutations } from 'vuex';
import rule from '@/mixins/rule';
import role from '@/views2/mixins/role';
import ListSearch from './components/ListSearch.vue';

import {
  getAuditList,
  getReportList,
  deleteItem,
  exportList,
  exportAnnex,
  unifiedReporting,
  uploadScan,
  materialPrinting,
  createReportsCanSave,
} from '@/api2/acceptanceEvaluation';
import { downloadFile } from '@/utils/data';
import { CITY_LEVEL_RATING } from './constants';
import { FINAL_STATUE_COLOR, DECLARE_STATUS, FINAL_STATUS } from '@/views2/utils/constants';
import { formatMoney } from '@/views2/utils/formatter';

export default {
  components: { ListSearch },
  mixins: [rule, role],
  data() {
    return {
      DECLARE_STATUS,
      CITY_LEVEL_RATING,
      textColor: FINAL_STATUE_COLOR,
      query: {
        areaId: '',
        villageName: '',
        declarationBatch: '',
        cityLevelRating: '',
        cityAcceptTime: '',
        finalStatus: '',
      },
      // getMethod: getAuditList,
      deleteMethod: deleteItem,
      exportMethod: exportList,

      selections: [], // 表格选中数据
      loading: false,
      ScanDocDialogVisible: false, // 扫描件上传
      form2: {
        id: null,
        annexFiles: [],
      },
    };
  },
  computed: {
    isCounty() {
      return this.COUNTRY || this.COUNTRY_LEADER;
    },
    getMethod() {
      return this.isCounty ? getReportList : getAuditList;
    },
  },
  beforeMount() {},
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
    // 提交排序
    onSubmitUploadScan() {
      const data = {
        id: this.form2.id,
        fileId: this.form2.annexFiles[0].fileId,
      };
      uploadScan(data).then(() => {
        this.form2.id = null;
        this.form2.annexFiles = [];
        this.ScanDocDialogVisible = false;
        this.$refs.crud.getItems();
        this.$notify.success('扫描件上传成功！');
      });
    },
    printFile() {
      if (this.selections.length === 0) {
        this.$notify.error('请选择需要打印的数据');
        return;
      }
      // 则判断勾选的信息内是否为县级待上报以后的状态（仅县级待上报状态不可导出）
      if (this.selections.some((i) => i.finalStatus === FINAL_STATUS.COUNTRY_REPORT_PENDING)) {
        this.$notify.error('需先上报后才可进行导出');
        return;
      } else {
        this.$confirm('是否导出所选材料？', '提示', {
          type: 'warning',
        }).then(async () => {
          this.selections.forEach(async (item) => {
            const data = {
              id: item.id,
            };
            const res = await materialPrinting(data);
            downloadFile(res, '浙江省未来乡村创建成效评价申请表', 'application/msword');
            this.$notify.success('导出成功');
          });
        });
      }
    },
    exportList() {
      this._exportFiles(exportList, '信息汇总表.xlsx');
    },
    _exportFiles(exportFunc, fileName = '导出信息汇总表 ') {
      if (!this.selections.length) {
        this.$message.warning('请选择需要导出的数据');
        return;
      }
      this.$confirm('是否批量导出所选数据？', '提示', {
        type: 'warning',
      }).then(async () => {
        this.loading = true;
        try {
          const data = {
            declarationIds: this.selections.map((item) => item.id),
          };
          const res = await exportFunc(data);
          downloadFile(res, fileName);
        } finally {
          this.loading = false;
        }
      });
    },
    // 导出附件
    exportEnclosure() {
      if (!this.selections.length) {
        this.$message.warning('请选择需要导出的数据');
        return;
      }
      this.$confirm('是否批量导出所选数据？', '提示', {
        type: 'warning',
      }).then(async () => {
        this.loading = true;
        try {
          const data = {
            ids: this.selections.map((item) => item.id),
          };
          const res = await exportAnnex(data);
          this._downloadFiles(res);
        } finally {
          this.loading = false;
        }
      });
    },

    _downloadFiles(data) {
      if (!data.length) return;
      for (let i = 0; i < data.length; i++) {
        data[i].citySaveAnnexFiles &&
          data[i].citySaveAnnexFiles.forEach((a) => {
            console.log(111, a.filePath);
            this._downloadLink(a.filePath, a.fileName);
          });
        data[i].countySaveAnnexFiles &&
          data[i].countySaveAnnexFiles.forEach((b) => {
            console.log(111, b.filePath);

            this._downloadLink(b.filePath, b.fileName);
          });
      }
    },

    _downloadLink(url) {
      // const aDom = document.createElement('a');
      // aDom.style.display = 'none';
      // aDom.href = url;
      // aDom.setAttribute('download', fileName);
      // document.body.appendChild(aDom);
      // aDom.click();
      // document.body.removeChild(aDom);
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none'; // 防止影响页面
      iframe.style.height = 0; // 防止影响页面
      iframe.src = url;
      document.body.appendChild(iframe); // 这一行必须，iframe挂在到dom树上才会发请求
      // 5分钟之后删除（onload方法对于下载链接不起作用，就先抠脚一下吧）
      setTimeout(() => {
        iframe.remove();
      }, 5 * 60 * 1000);
    },
    // 统一上报
    async UnifiedReport() {
      if (this.selections.length === 0) {
        this.$notify.error('请选择需要上报的申报信息');
        return;
      }
      if (this.COUNTRY_LEADER || this.COUNTRY) {
        //县级
        if (!this.selections.every((i) => i.finalStatus === FINAL_STATUS.COUNTRY_REPORT_PENDING)) {
          // 5县级待上报
          this.$notify.error('选中的申报信息状态有误');
          return;
        }
      } else if (this.CITY_LEADER || this.CITY) {
        // 市级
        if (!this.selections.every((i) => i.finalStatus === FINAL_STATUS.CITY_REPORT_PENDING)) {
          // 6市级待上报
          this.$notify.error('选中的申报信息状态有误');
          return;
        }
      }
      this.$confirm('是否确认上报选中的申报信息？', '提示', {
        type: 'warning',
      }).then(() => {
        const data = this.selections.map((item) => item.id);
        unifiedReporting(data).then(() => {
          this.$notify.success('上报成功！');
          this.$refs.crud.getItems();
        });
      });
    },

    newApplications() {
      // 判断是否在配置的验收时间段内，是则进入新建申报页面，否责toast提示“不在验收时间内，无法新建申报”
      createReportsCanSave()
        .then(() => {
          this.$router.push({ name: 'NewAcceptanceEvaluation' });
        })
        .catch(() => {
          this.$notify({
            type: 'warning',
            message: '不在验收时间内，无法新建申报',
          });
        });
    },
    // 详情
    goDetail(scope) {
      const { id } = scope.data;
      this.$router.push({ name: 'AcceptanceEvaluationDetails', query: { id } });
    },
    // 审核
    goAudit(scope) {
      const { id } = scope.data;
      this.$router.push({ name: 'NewAcceptanceEvaluation', query: { id } });
    },
    // 修改
    edit(data) {
      const { id } = data;
      this.$router.push({
        name: 'NewAcceptanceEvaluation',
        query: { id, edit: true },
      });
    },
    // 删除
    deleteItem(id) {
      this.$confirm('是否确认删除申报信息？', '提示', {
        type: 'warning',
      }).then(async () => {
        deleteItem({ id }).then(() => {
          this.$notify.success('删除成功');
          this.$refs.crud.getItems();
        });
      });
    },

    changeArea(val) {
      console.log(val);
      this.query.areaId = val.areaId;
    },
    selectionChange(val) {
      this.selections = val;
    },
    showDetail(data) {
      return (
        this.COUNTRY ||
        this.COUNTRY_LEADER ||
        ((this.CITY || this.CITY_LEADER) && data.finalStatus !== 0) ||
        (this.PROVINCE && data.finalStatus !== 2)
      );
    },
    showAudit(data) {
      return ((this.CITY || this.CITY_LEADER) && data.finalStatus === 0) || (this.PROVINCE && data.finalStatus === 2);
    },
    showModify(data) {
      const countryShow =
        (this.COUNTRY || this.COUNTRY_LEADER) &&
        (data.finalStatus === FINAL_STATUS.COUNTRY_REPORT_PENDING ||
          data.finalStatus === FINAL_STATUS.CITY_VERIFY_REJECTED);
      const cityShow =
        (this.CITY || this.CITY_LEADER) &&
        (data.finalStatus === FINAL_STATUS.CITY_REPORT_PENDING ||
          data.finalStatus === FINAL_STATUS.PROVINCE_VERIFY_REJECTED);
      return countryShow || cityShow;
    },
    showDelete(data) {
      return this.COUNTRY && data.finalStatus === FINAL_STATUS.COUNTRY_REPORT_PENDING;
    },
    showUploadScanFile(data) {
      if (data.fileId) {
        return false;
      }
      return (this.COUNTRY || this.COUNTRY_LEADER) && data.finalStatus === FINAL_STATUS.PROVINCE_VERIFY_PASSED;
    },
  },
};
</script>
<style lang="scss" scoped>
.tip-point {
  width: 8px;
  height: 8px;
  display: inline-block;
  border-radius: 4px;
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
.link {
  padding: 0 5px;
}
</style>
