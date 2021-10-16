<template>
  <div class="user-list">
    <el-table
      :data="list"
      :header-cell-style="{
        'background-color': '#F7F8FA',
        color: '#333',
        'font-size': '14px',
        'font-weight': '500',
      }"
      :row-style="{
        'font-size': '14px',
      }"
    >
      <el-table-column
        label="序号"
        type="index"
        width="80"
        :index="
          (index) =>
            index + 1 + pagination.pageSize * (pagination.currentPage - 1)
        "
      ></el-table-column>
      <el-table-column
        prop="userNickname"
        label="用户名"
        width="160"
      ></el-table-column>
      <el-table-column
        prop="roleName"
        label="角色名称"
        width="160"
      ></el-table-column>
      <el-table-column prop="areaName" label="所属区域"></el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
<!--          <el-button @click="handleClick(scope.row)" type="text" size="medium"-->
<!--            >解除授权</el-button-->
<!--          >-->
          <span v-if="scope.row.roleId">
            <el-button
              type="text"
              size="medium"
              @click="handleModifyClick(scope.row)"
            >
              修改权限
            </el-button>
            <el-button
              type="text"
              size="medium"
              @click="handleClick(scope.row)"
            >
              解除授权
            </el-button>
          </span>
          <span v-else>
            <el-button
              type="text"
              size="medium"
              @click="handleAuthClick(scope.row)"
            >
              授权
            </el-button>
          </span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-bind="pagination"
      background
      :current-page.sync="pagination.currentPage"
      class="pagination"
      @current-change="initTableData"
    >
    </el-pagination>
  </div>
</template>
<script>
import { getUserList } from "@/api/user";
export default {
  props: {
    form: {
      type: Object,
      default: () => ({}),
    },
    searchAreaId: String,
  },
  data() {
    return {
      list: [],
      pagination: {
        // layout: "total, sizes, prev, pager, next, jumper",
        layout: "total, prev, pager, next",
        total: 0,
        pageSize: 10,
        currentPage: 1,
        hideOnSinglePage: true,
      },
    };
  },
  watch: {
    form: {
      handler() {
        this.pagination.total = 0;
        this.pagination.currentPage = 1;
        this.initTableData();
      },
      deep: true,
    },
    searchAreaId() {
      this.pagination.total = 0;
      this.pagination.currentPage = 1;
      this.initTableData();
    },
  },
  mounted() {
    this.initTableData();
  },
  methods: {
    initTableData() {
      getUserList({
        ...this.form,
        pageNo: this.pagination.currentPage,
        pageSize: this.pagination.pageSize,
        areaId: this.searchAreaId,
      }).then((res) => {
        const { content, totalSize } = res;
        this.pagination.total = totalSize;
        this.list = content || [];
      });
    },
    handleClick(row) {
      this.$emit("deauthorize", row);
    },
    handleModifyClick(row) {
      this.$emit("modifyAuth", row);
    },
    handleAuthClick(row) {
      this.$emit("bindAuth", row);
    },
  },
};
</script>
<style lang="scss" scoped>
.user-list {
  .pagination {
    text-align: right;
    margin-top: 40px;
  }
}
</style>
