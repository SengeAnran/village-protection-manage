<template>
  <div class="village-manage block">
    <div v-if="$route.name === 'ScheduleReportList'">
      <div class="text-lg mb-4">进度列表</div>
      <Crud
        ref="crud"
        :get-method="getMethod"
        :query.sync="query"
        selection
        id-key="id"
        actionWidth="180px"
        :multiple-delete="userInfo.roleId === 3"
        :hideAdd="true"
        :hideEdit="true"
        :hideView="true"
        :hideDelete="true"
        :permission-add="30012"
        :permission-edit="30013"
        :permission-delete="30014"
      >
        <template v-slot:search>
          <div class="inline-flex items-center mb-6 pl-0">
            项目所在地：
            <el-input
              v-model="query.name"
              style="width: 200px"
              placeholder="请输入关键字"
              clearable
            ></el-input>
          </div>
        </template>

        <template v-slot:tableAction="scope">
          <div style="text-align: left">
            <el-link type="primary" @click="goDeclareRouter(scope)"
              >项目详情</el-link
            >
            <el-divider direction="vertical"></el-divider>
            <el-link type="primary"> 查看进度 </el-link>
            <el-link type="primary"> 历史进度 </el-link>
            <el-link type="primary"> 催办 </el-link>
            <el-link type="danger"> 删除 </el-link>
          </div>
        </template>

        <template v-slot:crudAction>
          <el-button
            type="primary"
            @click="$router.push({ name: 'newSchedule' })"
            >上报
          </el-button>
        </template>

        <template v-slot:table>
          <el-table-column
            label="申报年度"
            prop="declareYear"
          ></el-table-column>
          <el-table-column label="项目所在地" prop="declareType">
            <template slot-scope="scope">
              <p>{{ declareType[scope.row.declareType] }}</p>
            </template>
          </el-table-column>
          <el-table-column label="总投资（万元）" prop="gmtCreate">
            <template slot-scope="scope">
              <p>{{ scope.row.gmtCreate.slice(0, 11) }}</p>
            </template>
          </el-table-column>
          <el-table-column label="进度上报时间" prop="declareStatus">
            <template slot-scope="scope">
              <p>
                <i
                  class="status"
                  :class="{ active: scope.row.declareStatus === 2999 }"
                ></i>
                {{ declareStatus[scope.row.declareStatus] }}
              </p>
            </template>
          </el-table-column>
        </template>
      </Crud>
    </div>

    <router-view />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { getProjectProgress } from "@/api/scheduleManage";

export default {
  data() {
    return {
      query: {
        address: "",
      },
      getMethod: getProjectProgress,
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.search-item {
  margin-right: 20px;
  .label {
    font-weight: 400;
    color: #333333;
  }
}
</style>
