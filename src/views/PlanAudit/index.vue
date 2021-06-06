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
        <el-select
            v-model="query.declareYear"
            placeholder="请选择年度"
            clearable
        ></el-select>
        <el-select
            v-model="query.reviewStatus"
            placeholder="请选择状态"
            clearable
        ></el-select>
      </template>

      <template v-slot:table>
        <el-table-column
            label="申报年度"
            prop="declareYear"
        ></el-table-column>
        <el-table-column label="重点村庄名称" prop="villageName"></el-table-column>
        <el-table-column
            label="评审规划时间"
            prop="gmtCreate"
        ></el-table-column>
        <el-table-column
            label="状态"
            prop="reviewStatus"
        ></el-table-column>
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
    };
  },
};
</script>
