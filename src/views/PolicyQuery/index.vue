<template>
  <div class="village-manage block">
    <!--    <div v-if="$route.name === 'Statistics'">-->
    <div>
      <div class="text-lg mb-4">政策列表</div>
      <Crud
        ref="crud"
        :get-method="getMethod"
        :query.sync="query"
        id-key="id"
        :hideAdd="true"
        :hideEdit="true"
        :hideView="true"
        :hideDelete="true"
        :permission-add="0"
        :permission-edit="0"
        :permission-delete="0"
      >
        <template v-slot:search>
          <div class="inline-flex items-center mb-6 pl-0">
            政策名称：
            <el-input
              v-model="query.policyName"
              style="width: 200px"
              placeholder="请输入"
              clearable
            ></el-input>
          </div>
        </template>

        <template v-slot:table>
          <el-table-column
            label="政策名称"
            prop="policyName"
            width="500"
          ></el-table-column>
          <el-table-column label="上传时间" prop="gmtCreate">
            <!--            <template slot-scope="scope">-->
            <!--              <p>{{ declareType[scope.row.declareType] }}</p>-->
            <!--            </template>-->
          </el-table-column>
        </template>
        <template v-slot:tableEdit="scope">
          <el-link
            type="danger"
            @click.native="download(scope)"
          >下载</el-link
          >
        </template>
      </Crud>
    </div>
  </div>
</template>
<script>
// import { mapMutations, mapGetters } from "vuex";
import { getList } from "@/api/policy";
import { downloadFileByI } from '@/utils/data'

export default {
  data() {
    return {
      query: {
        policyName: '',
      },
      getMethod: getList,
    };
  },
  computed: {
  },
  beforeMount() {
  },
  mounted() {
  },
  methods: {
    download(row) {
      row.data.filePathList.forEach(item =>{
        downloadFileByI(item);
      });
    }
  }
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
.status {
  display: inline-block;
  margin-right: 6px;
  width: 8px;
  height: 8px;
  border-radius: 100%;
  background: #ccc;
  &.active {
    background: #15be50;
  }
}
</style>
