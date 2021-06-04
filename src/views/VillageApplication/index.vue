<template>
  <div class="village-manage block">
    <div v-if="$route.name === 'VillageApplyList'">
      <div class="text-lg mb-4">申报列表</div>
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
        :hideAdd="true"
        :permission-add="30012"
        :permission-edit="30013"
        :permission-delete="30014"
      >
        <template v-slot:search>
          <div class="inline-flex mb-6 pl-0">
            <div class="search-item">
              <span class="label">申请类型：</span>
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
              >
              </el-date-picker>
            </div>
            <div class="search-item">
              <span class="label">状态：</span>
              <el-select v-model="query.declareStatus" placeholder="请选择">
                <el-option
                  v-for="item in declareStatusOpt"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </template>

        <template v-slot:crudAction>
          <el-dropdown class="mr-3" @command="newApplications">
            <el-button type="primary"> 新建申报 </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="(item, i) in declareTypeOpt"
                :key="item.value"
                :divided="i !== 0"
                size="small"
                :command="item.value"
              >
                {{ item.label }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>

        <template v-slot:table>
          <el-table-column
            label="申报年度"
            prop="activityName"
          ></el-table-column>
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

    <router-view />
  </div>
</template>
<script>
import { getVillageList } from "@/api/villageManage";
const DECLEAR_TYPE = {
  1001: "一般村",
  1002: "重点村",
  1003: "提升",
};
const DECLEAR_STATUS = {
  2001: "市级未审核",
  2004: "省级未审核",
  2999: "省级已审核",
};
export default {
  data() {
    return {
      query: {
        declareType: "",
        declareStatus: "",
        declareYear: "",
      },
      getMethod: getVillageList,
      deleteMethod: () => {},
    };
  },
  beforeMount() {
    this.declareTypeOpt = this.normalizeSelectOptions(DECLEAR_TYPE);
    this.declareStatusOpt = this.normalizeSelectOptions(DECLEAR_STATUS);
  },
  methods: {
    normalizeSelectOptions(obj) {
      if (!Object.prototype.toString.call(obj).slice(8, -1) === "Object")
        return [];
      return Object.keys(obj).map((key) => {
        return {
          label: obj[key],
          value: key,
        };
      });
    },

    newApplications(val) {
      let routerName;
      switch (Number(val)) {
        case 1001:
          routerName = "newOrdinaryApplication";
          break;
        case 1002:
          routerName = "newMajorApplication";
          break;
        case 1003:
          routerName = "newPromoteApplication";
          break;
        default:
          break;
      }
      routerName && this.$router.push({ name: routerName });
    },
  },
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
