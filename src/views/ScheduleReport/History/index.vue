<template>
  <div class="block">
    <RouterBack>项目进度列表</RouterBack>
    <div class="table-wrp">
      <el-table
        class="table"
        :data="tableData"
        style="width: 100%"
        v-loading="loading"
      >
        <el-table-column label="序号" width="80" align="center" fixed="left">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="申报年度" prop="years"></el-table-column>
        <el-table-column label="项目所在地" prop="address"> </el-table-column>
        <el-table-column label="总投资（万元）" prop="declareAmount">
        </el-table-column>
        <el-table-column label="进度上报时间" prop="gmtCreate">
          <template slot-scope="scope">
            {{ scope.row.gmtCreate.slice(0, 10) }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div style="text-align: left">
              <el-link type="primary">项目详情</el-link>
              <el-divider direction="vertical"></el-divider>
              <el-link type="primary" @click="goDetail(scope.row)">
                查看进度
              </el-link>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { getHistoryProgress } from "@/api/scheduleManage";

export default {
  data() {
    return {
      query: {
        projectId: "",
      },
      tableData: [],

      page: 1,
      // size: 2,
      // sizes: [2, 20, 50, 100],
      // total: 0,
      loading: false,
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  created() {
    const id = this.$route.query.id;
    if (id) {
      this.query.projectId = id;
      this.getItems();
    }
  },
  methods: {
    getItems() {
      const { page, size, query } = this;
      const params = {
        pageNum: page,
        pageSize: size,
        ...query,
      };
      this.loading = true;
      getHistoryProgress(params)
        .then((res) => {
          this.tableData = res;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    goDetail(row) {
      const { id } = row;
      if (id) this.$router.push({ name: "ScheduleDetail", query: { id } });
    },
  },
};
</script>
<style lang="scss" scoped>
.table-wrp {
  padding: 0 14px;
  .table {
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.05);
    ::v-deep tr th {
      background-color: #f3f3f3;
      color: #222;
    }
  }
}
</style>
