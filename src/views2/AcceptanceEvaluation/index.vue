<template>
  <div class="village-manage block">
    <div>
      <div class="text-lg mb-4">申报列表</div>
      <Crud
        ref="crud"
        :get-method="getMethod"
        :delete-method="deleteMethod"
        :query.sync="query"
        selection
        id-key="id"
        actionWidth="180px"
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
      >
        <template v-slot:search>
          <list-search @changeArea="changeArea" :query="query"></list-search>
        </template>

        <template v-slot:tableAction="scope">
          <el-link class="link" @click="goDetail(scope)" type="primary" v-if="showDetail(scope.data)"> 详情 </el-link>
          <el-link class="link" @click="goAudit(scope)" type="primary" v-if="showAudit(scope.data)"> 审核 </el-link>
          <el-link class="link" @click="edit(scope.data)" type="primary" v-if="showModify(scope.data)"> 修改</el-link>
          <el-link class="link" @click="deleteItem(scope.data.id)" type="danger" v-if="showDelete(scope.data)">
            删除
          </el-link>
        </template>

        <template v-slot:crudAction>
          <el-button v-if="roleId === 3" type="primary" icon="el-icon-plus" @click="newApplications">
            新建申报</el-button
          >
        </template>

        <template v-slot:export>
          <el-button icon="el-icon-download" v-if="roleId !== 3" type="primary" plain @click="exportEnclosure"
            >导出附件</el-button
          >
        </template>

        <template v-slot:table>
          <el-table-column label="村(片区)名称" prop="name"></el-table-column>
          <el-table-column label="创建批次" prop="declarationBatch"></el-table-column>
          <el-table-column label="总投资（万元）" prop="investNum"></el-table-column>
          <el-table-column label="县自评得分" prop="totalCounty"></el-table-column>
          <el-table-column label="市评价得分" prop="totalCity" v-if="!isCounty"></el-table-column>
          <el-table-column label="评价等次" prop="cityLevelRating" v-if="!isCounty"></el-table-column>
          <el-table-column label="全市排名" prop="cityRanking" v-if="!isCounty"></el-table-column>
          <el-table-column label="县申请时间" prop="gmtModified" v-if="!isCounty"> </el-table-column>
          <el-table-column label="申请时间" prop="gmtModified"> </el-table-column>
          <el-table-column label="市审核时间" prop="cityReviewTime" v-if="!isCounty"> </el-table-column>
          <el-table-column label="状态" prop="finalStatus">
            <!--  0:市级未审核、1:市级已驳回、2:省级未审核、3:省级已驳回、4:审核通过-->
            <template slot-scope="scope">
              <p>
                <i class="status" :class="{ active: scope.row.finalStatus === 4 }"></i>
                {{ DECLEAR_STATUS[scope.row.finalStatus] }}
              </p>
            </template>
          </el-table-column>
        </template>
      </Crud>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex';

import ListSearch from './components/ListSearch.vue';

import { getRecVillages, deleteVillageItem } from '@/api2/villageManage';
import { getAuditList, getReportList } from '@/api2/acceptanceEvaluation';
import { DECLEAR_STATUS } from './constants';
import { recVerify } from '../../api/villageManage';
import { getvillagesExport } from '../../api2/villageManage';

export default {
  components: { ListSearch },
  data() {
    return {
      query: {
        areaId: '',
        villageName: '',
        declarationBatch: '',
        cityLevelRating: '',
        cityAcceptTime: '',
        finalStatus: '',
      },
      // getMethod: getAuditList,
      deleteMethod: deleteVillageItem,
      exportMethod: getvillagesExport,
      submitSortMethod: recVerify,
      DECLEAR_STATUS,
    };
  },
  computed: {
    ...mapGetters(['userInfo']),
    roleId() {
      console.log(this.userInfo.roleId);
      return this.userInfo.roleId;
    },
    isCounty() {
      return this.userInfo && this.userInfo.roleId === 3;
    },
    getMethod() {
      return this.isCounty ? getReportList : getAuditList;
    },
  },
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
    // 导出附件
    exportEnclosure() {
      console.log('导出附件');
    },
    newApplications() {
      this.$router.push({ name: 'NewAcceptanceEvaluation' });
    },
    async getDialogDataList(params) {
      console.log(params);
      const res = await getRecVillages(params);
      console.log(res);
      return res;
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
      this.$confirm('是否删除该条数据？', '提示', {
        type: 'warning',
      }).then(async () => {
        deleteVillageItem([id]).then(() => {
          this.$notify.success('删除成功');
          this.$refs.crud.getItems();
        });
      });
    },

    changeArea(val) {
      this.query.areaId = val.areaId;
    },
    showDetail(data) {
      return (
        this.roleId === 3 ||
        (this.roleId === 2 && data.finalStatus !== 0) ||
        (this.roleId === 1 && data.finalStatus !== 2)
      );
    },
    showAudit(data) {
      return (this.roleId === 2 && data.finalStatus === 0) || (this.roleId === 1 && data.finalStatus === 2);
    },
    showModify(data) {
      return (this.roleId === 3 && data.finalStatus === 0) || (this.roleId === 2 && data.finalStatus === 2);
    },
    showDelete(data) {
      return this.roleId === 3 && [0, 1].includes(data.finalStatus);
    },
  },
};
</script>
<style lang="scss" scoped>
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
