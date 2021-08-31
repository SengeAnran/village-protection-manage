<template>
  <div class="village-manage block">
<!--    <div v-if="$route.name === 'Statistics'">-->
    <div>
      <div class="text-lg mb-4">数据统计</div>
      <Crud
        ref="crud"
        :get-method="getMethod"
        :query.sync="query"
        id-key="id"
        :hideAdd="true"
        :hideEdit="true"
        :hideView="true"
        :hideTableAction="true"
        :hideDelete="true"
        :permission-add="0"
        :permission-edit="0"
        :permission-delete="0"
      >
        <template v-slot:search>
          <div class="inline-flex mb-6 pl-0">
            <div class="search-item">
              <span class="label">申报类型：</span>
              <el-select v-model="query.declareType" placeholder="请选择">
                <el-option
                  v-for="item in declareTypeOpt"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div class="search-item">
              <span class="label">申报年度：</span>
              <el-date-picker
                v-model="query.declareYear"
                type="year"
                placeholder="选择年"
                value-format="yyyy"
              >
              </el-date-picker>
            </div>
          </div>
        </template>

        <template v-slot:crudAction>
          <el-button type="primary" size="small" icon="el-icon-upload2" @click="exportData"> 导出数据 </el-button>
        </template>

        <template v-slot:insert>
          <bar :query="query"></bar>
        </template>

        <template v-slot:table>
          <el-table-column
            label="村名"
            prop="villageName"
          ></el-table-column>
          <el-table-column label="类型" prop="declareType">
<!--            <template slot-scope="scope">-->
<!--              <p>{{ declareType[scope.row.declareType] }}</p>-->
<!--            </template>-->
          </el-table-column>
          <el-table-column label="申报年度" prop="gmtCreate">
<!--            <template slot-scope="scope">-->
<!--              <p>{{ scope.row.gmtCreate.slice(0, 11) }}</p>-->
<!--            </template>-->
          </el-table-column>
          <el-table-column label="所属市" prop="city">
          </el-table-column>
          <el-table-column label="县(市、区)" prop="county">
          </el-table-column>
        </template>
      </Crud>
    </div>
  </div>
</template>
<script>
// import { mapMutations, mapGetters } from "vuex";
import { getVillageList } from "@/api/villageManage";
import { exportData } from "@/api/statistics";
import { downloadFile } from "@/utils/data"
import bar from "./Bar"

export default {
  components: {
    bar,
  },
  data() {
    return {
      query: {
        declareType: 1001,
        declareYear: new Date().getFullYear().toString(),
      },
      declareTypeOpt: [
        {
          value: 1001 ,
          label: '一般村',
        },
        {
          value: 1002,
          label: '重点村',
        },
      ],
      barDate: [],
      getMethod: getVillageList,
    };
  },
  computed: {
  },
  beforeMount() {
  },
  mounted() {
  },
  methods: {
    async exportData() {
      const data = {
        declareType: this.query.declareType,
        declareYear: Number(this.query.declareYear),
      }
      const res = await exportData(data)
      const fileName = this.query.declareYear +'年度历史文化（传统）村落保护利用'+ (this.query.declareType === 1001? '一般村':'中带农村')+'备案名单';
      downloadFile(res, fileName )
    },
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
