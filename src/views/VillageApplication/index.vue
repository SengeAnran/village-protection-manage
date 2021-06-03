<template>
  <div class="block">
    <div class="text-lg mb-4">特色活动</div>
    <Crud
      :get-method="getMethod"
      :delete-method="deleteMethod"
      :query.sync="query"
      add-path="/activity/save?type=add"
      edit-path="/activity/save?type=edit"
      view-path="/activity/detail"
      selection
      id-key="id"
      multiple-delete
    >
      <template v-slot:search>
        <el-input
          v-model="query.name"
          style="width: 200px"
          placeholder="请输入关键字"
          clearable
        ></el-input>
      </template>

      <template v-slot:table>
        <el-table-column label="申报年度" prop="activityName"></el-table-column>
        <el-table-column label="申报类型" prop="time"></el-table-column>
        <el-table-column
          label="申报时间"
          prop="activityAddress"
        ></el-table-column>
        <el-table-column label="状态" prop="isRecommend">
          <template slot-scope="scope">
            <p>{{ scope.row }}</p>
          </template>
        </el-table-column>
      </template>
    </Crud>
  </div>
</template>
<script>
import { getVillageList } from "@/api/villageManage";
export default {
  data() {
    return {
      query: {
        name: "",
        areaId: "",
      },
      getMethod: getVillageList,
      deleteMethod: () => {},
    };
  },
  methods: {},
};
</script>
