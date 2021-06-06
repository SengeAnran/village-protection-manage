<template>
  <div class="block">
    <div class="text-lg mb-4">项目列表</div>
    <Crud
        ref="crud"
        :get-method="getMethod"
        :query.sync="query"
        id-key="id"
        add-path="/projectApplication/save?type=add"
        edit-path="/projectApplication/save?type=edit"
        view-path="/projectApplication/detail"
        :permission-add="100"
        :permission-edit="100"
        :permission-delete="100"
    >
      <template v-slot:search>
        <el-input
            style="width: 200px"
          v-model="query.address"
          placeholder="请输入项目所在地"
        ></el-input>
        <el-select
            v-model="query.projectType"
            placeholder="请选择项目类型"
            clearable
        ></el-select>
        <el-select
            v-model="query.projectStatus"
            placeholder="请选择状态"
            clearable
        ></el-select>
      </template>

      <template v-slot:table>
        <el-table-column
            label="申报年度"
            prop="years"
        ></el-table-column>
        <el-table-column label="项目所在地" prop="address"></el-table-column>
        <el-table-column
            label="总投资(万元)"
            prop="totalFee"
        ></el-table-column>
        <el-table-column
            label="申报时间"
            prop="gmtCreate"
        ></el-table-column>
        <el-table-column
            label="状态"
            prop="projectStatus"
        ></el-table-column>
      </template>
    </Crud>
  </div>
</template>

<script>
import { getProjectList } from "@/api/projectDeclare";

export default {
  data() {
    return {
      query: {
        address: "",
        projectType: "",
        projectStatus: "",
      },
      getMethod: getProjectList,
    };
  },
};
</script>
