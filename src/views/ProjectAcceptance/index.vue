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
        <el-link
          v-if="query.declareType === 1001"
          type="primary"
          @click="toVillage(scope)"
          >村庄详情</el-link
        >
        <el-link
          v-if="query.declareType === 1002"
          type="primary"
          @click="toProject(scope)"
          >项目详情</el-link
        >
        <el-link v-if="scope.data.checkFlag" v-permission="80002" type="primary" @click="toAuditSave(scope, 'add')"
          >验收</el-link
        >
        <el-link v-if="scope.data.modifyFlag" v-permission="80002" type="primary" @click="toAuditSave(scope, 'edit')"
          >修改</el-link
        >
        <el-link type="primary" @click="toVerifyDetail(scope)"
          >验收详情</el-link
        >
      </template>
    </Crud>
  </div>
</template>

<script>
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
