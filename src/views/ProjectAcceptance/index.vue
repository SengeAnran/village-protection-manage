<template>
  <div class="block">
    <div class="text-lg mb-4">项目列表</div>
    <div class="mb-4">
      <el-tag
        class="mr-4 cursor-pointer"
        size="large"
        :type="query.declareType === 1002 ? 'primary' : 'info'"
        :effect="query.declareType === 1002 ? 'dark' : 'light'"
        @click="changeType(1002)"
        >重点村项目</el-tag
      >
      <el-tag
        class="cursor-pointer"
        size="large"
        :type="query.declareType === 1001 ? 'primary' : 'info'"
        :effect="query.declareType === 1001 ? 'dark' : 'light'"
        @click="changeType(1001)"
        >一般村项目</el-tag
      >
    </div>
    <Crud
      ref="crud"
      :get-method="getMethod"
      :query.sync="query"
      id-key="id"
      hide-add
      hide-edit
      hide-view
      hide-delete
      :permission-add="0"
      :permission-edit="80002"
      :permission-delete="0"
      action-width="200px"
    >
      <template v-slot:search>
        <el-date-picker
          v-model="query.declareYear"
          type="year"
          value-format="yyyy"
          placeholder="请选择年度"
          clearable
        ></el-date-picker>
        <el-select
          v-model="query.reviewStatus"
          placeholder="请选择状态"
          clearable
        >
          <el-option
            v-for="item in Object.keys(reviewStatusMap)"
            :key="item"
            :value="item"
            :label="reviewStatusMap[item]"
          ></el-option>
        </el-select>
      </template>

      <template v-slot:table>
        <el-table-column label="申报年度" prop="years"></el-table-column>
        <el-table-column label="项目所在地" prop="address"></el-table-column>
        <el-table-column label="申报时间" prop="gmtCreate"></el-table-column>
        <el-table-column label="状态" prop="reviewStatus">
          <template slot-scope="scope">{{
            reviewStatusMap[scope.row.checkStatus]
          }}</template>
        </el-table-column>
      </template>

      <template v-slot:tableAction="scope">
        <!-- <el-link
          v-if="query.declareType === 1001"
          type="primary"
          @click="toVillage(scope)"
          >村庄详情</el-link
        > -->
        <el-link
          v-if="actionControl('项目详情', scope.data.checkStatus)"
          type="primary"
          @click="toProject(scope)"
          >项目详情</el-link
        >
        <el-divider direction="vertical"></el-divider>
        <el-link
          v-if="actionControl('验收', scope.data.checkStatus)"
          v-permission="auditPermission"
          type="primary"
          @click="toAuditSave(scope, 'add')"
          >验收</el-link
        >
        <el-link
          v-if="actionControl('修改', scope.data.checkStatus)"
          v-permission="modifyPermission"
          type="primary"
          @click="toAuditSave(scope, 'edit')"
          >修改</el-link
        >
        <el-link
          type="primary"
          v-if="actionControl('验收详情', scope.data.checkStatus)"
          @click="toVerifyDetail(scope)"
          >验收详情</el-link
        >
        <div
          class="inline"
          v-if="actionControl('整改', scope.data.checkStatus)"
          v-permission="80002"
        >
          <el-divider direction="vertical"></el-divider>
          <el-link type="primary" @click="toAuditSave(scope, 'edit')"
            >整改</el-link
          >
        </div>
      </template>
    </Crud>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getAcceptanceList } from "@/api/projectAcceptance";
import rule from "@/mixins/rule";

export default {
  mixins: [rule],
  data() {
    return {
      query: {
        // 一般村:1001 重点村:1002 提升村:1003
        declareType: 1002,
        checkStatus: "",
      },
      getMethod: getAcceptanceList,
      // 验收状态 待县级填报: 2000 待市级审核：2001 市级审核驳回:2002 省级审核驳回: 2003 市级审核通过 待省级审核:2004 验收通过:2999
      reviewStatusMap: {
        2000: "待县级填报",
        2001: "待市级审核",
        2002: "市级审核驳回",
        2003: "省级审核驳回",
        2004: "市级审核通过，待省级审核",
        2999: "验收通过",
      },
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
    modifyPermission() {
      const roleId = this.userInfo.roleId;
      return roleId === 3 ? 80002 : roleId === 2 ? 10202 : 0;
    },
    auditPermission() {
      const roleId = this.userInfo.roleId;
      if (![1, 2, 3].includes(roleId)) return 0;
      return roleId === 3 ? 80002 : roleId === 2 ? 10202 : 10302;
    },
  },
  beforeMount() {
    this.XIANJI_ACTION = {
      项目详情: () => true,
      验收: (declareStatus) => this._canAudit(declareStatus, 3),
      验收详情: (declareStatus) => this._canViewAudit(declareStatus, 3),
      修改: (declareStatus) => this._canModify(declareStatus, 3),
      整改: (declareStatus) => this._canReview(declareStatus, 3),
    };
    this.SHIJI_ACTION = {
      项目详情: () => true,
      验收: (declareStatus) => this._canAudit(declareStatus, 2), // 未验收时显示验收，验收后显示修改
      修改: (declareStatus) => this._canViewAudit(declareStatus, 2),
    };
    this.ADMIN_ACTION = {
      项目详情: () => true,
      验收: (declareStatus) => this._canAudit(declareStatus, 1),
      验收详情: (declareStatus) => this._canViewAudit(declareStatus, 1),
    };
  },
  methods: {
    changeType(code) {
      this.query.declareType = code;
      this.$refs.crud.search();
    },
    toVillage(scope) {
      this.$router.push(
        `/villageApplication/villageDetail?id=${scope.data.id}`
      );
    },
    toProject(scope) {
      this.$router.push(`/projectApplication/detail?id=${scope.data.id}`);
    },
    toAuditSave(scope, type) {
      this.$router.push(
        `/projectAcceptance/save?type=${type}&id=${scope.data.id}&year=${scope.data.years}&total=${scope.data.totalFee}&date=${scope.data.gmtCreate}&address=${scope.data.address}&declareType=${this.query.declareType}`
      );
    },
    toVerifyDetail(scope) {
      this.$router.push(`/projectAcceptance/verify/detail?id=${scope.data.id}`);
    },

    /**
     * @desc 判断action按钮是否显示
     * @param {String} actionName 按钮名称
     * @param {Number} declareStatus 审核状态码
     */
    actionControl(actionName, declareStatus) {
      const { roleId } = this.userInfo;
      if (roleId === 3) {
        return (
          this.XIANJI_ACTION[actionName] &&
          this.XIANJI_ACTION[actionName](declareStatus)
        );
      } else if (roleId === 2) {
        return (
          this.SHIJI_ACTION[actionName] &&
          this.SHIJI_ACTION[actionName](declareStatus)
        );
      } else if (roleId === 1) {
        return (
          this.ADMIN_ACTION[actionName] &&
          this.ADMIN_ACTION[actionName](declareStatus)
        );
      }
      return false;
    },

    // 验收
    _canAudit(status, roleId) {
      return (
        (roleId === 3 && status === 2000) ||
        (roleId === 2 && status === 2001) ||
        (roleId === 1 && status === 2004)
      );
    },
    // 验收详情
    _canViewAudit(status, roleId) {
      return (
        (roleId === 3 && status > 2001) ||
        (roleId === 2 && status > 2001) ||
        (roleId === 1 && (status === 2003 || status === 2999))
      );
    },
    // 整改
    _canReview(status, roleId) {
      return roleId === 3 && (status === 2002 || status === 2003);
    },
    // 修改
    _canModify(status, roleId) {
      return (
        (roleId === 3 && status === 2001) || (roleId === 2 && status === 2004)
      );
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .table-action {
  > * {
    margin: 2px;
  }
}
</style>
