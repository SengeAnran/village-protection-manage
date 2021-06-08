<template>
  <div class="block">
    <div class="text-lg mb-4">评审列表</div>
    <Crud
      ref="crud"
      :get-method="getMethod"
      :query.sync="query"
      id-key="id"
      add-path="/planAudit/save?type=add"
      edit-path="/planAudit/save?type=edit"
      view-path="/planAudit/detail"
      hide-add
      :permission-add="100"
      :permission-edit="100"
      :permission-delete="100"
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
        <el-table-column label="申报年度" prop="declareYear"></el-table-column>
        <el-table-column
          label="重点村庄名称"
          prop="villageName"
        ></el-table-column>
        <el-table-column
          label="评审规划时间"
          prop="gmtCreate"
        ></el-table-column>
        <el-table-column label="状态" prop="reviewStatus">
          <template slot-scope="scope">{{
            reviewStatusMap[scope.row.reviewStatus]
          }}</template>
        </el-table-column>
      </template>
    </Crud>
  </div>
</template>

<script>
import { getPlanList } from "@/api/planningReview";

export default {
  data() {
    return {
      query: {
        declareYear: "",
        reviewStatus: "",
      },
      getMethod: getPlanList,
      // 未填报:2000（此状态县级可进行填报） 待市级审核：2001（此状态县级可修改评审） 市级审核不通过:2002 省级审核不通过: 2003 市级审核通过 待省级审核:2004 验收通过:2999
      reviewStatusMap: {
        2000: "未填报",
        2001: "待市级审核",
        2002: "市级审核不通过",
        2003: "省级审核不通过",
        2004: "市级审核通过，待省级审核",
        2999: "验收通过",
      },
    };
  },
};
</script>
