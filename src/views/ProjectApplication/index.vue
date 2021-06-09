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
      :permission-add="40001"
      :permission-edit="40003"
      :permission-delete="40004"
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
        >
          <el-option
            v-for="item in Object.keys(projectTypeMap)"
            :key="item"
            :value="item"
            :label="projectTypeMap[item]"
          ></el-option>
        </el-select>
        <el-select
          v-model="query.projectStatus"
          placeholder="请选择状态"
          clearable
        >
          <el-option
            v-for="item in Object.keys(projectStatusMap)"
            :key="item"
            :value="item"
            :label="projectStatusMap[item]"
          ></el-option>
        </el-select>
      </template>

      <template v-slot:table>
        <el-table-column label="申报年度" prop="years"></el-table-column>
        <el-table-column label="项目所在地" prop="address"></el-table-column>
        <el-table-column label="总投资(万元)" prop="totalFee"></el-table-column>
        <el-table-column label="申报时间" prop="gmtCreate"></el-table-column>
        <el-table-column label="状态" prop="projectStatus">
          <template slot-scope="scope">{{
            projectStatusMap[scope.row.projectStatus]
          }}</template>
        </el-table-column>
      </template>

      <template v-slot:tableAction="scope">
        <el-link v-permission="50002" type="primary" @click="verify(scope)">审核</el-link>
      </template>
    </Crud>
  </div>
</template>

<script>
import { getProjectList, verifyProject } from "@/api/projectDeclare";

export default {
  data() {
    return {
      query: {
        address: "",
        projectType: "",
        projectStatus: "",
      },
      getMethod: getProjectList,
      projectStatusMap: {
        2001: "待市级审核",
        2002: "市级审核不通过",
        2003: "省级审核不通过",
        2004: "市级审核通过，待省级审核",
        2999: "审核通过",
      },
      projectTypeMap: {
        30001: "修缮",
        30002: "扩建",
        30003: "开发利用",
      },
    };
  },
  methods: {
    verify(scope) {
      this.$confirm(
        "是否通过该项目审核，若审核通过则项目提交至省级。",
        "审核",
        {
          confirmButtonText: "通过",
          cancelButtonText: "不通过",
          distinguishCancelAndClose: true,
        }
      )
        .then(async (action) => {
          this.submit(action, scope);
        })
        .catch(async (action) => {
          if (action === "cancel") {
            this.submit(action, scope);
          }
        });
    },
    async submit(action, scope) {
      let status = action === "confirm" ? 1 : 0;
      await verifyProject({
        id: scope.data.id,
        status,
      });
      this.$notify.success("操作成功");
      this.$refs.crud.getItems();
    },
  },
};
</script>
