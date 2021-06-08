<template>
  <div class="village-manage block">
    <div v-if="$route.name === 'VillageApplyList'">
      <div class="text-lg mb-4">申报列表</div>
      <Crud
        ref="crud"
        :get-method="getMethod"
        :delete-method="deleteMethod"
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
                value-format="yyyy"
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

        <template v-slot:tableAction="scope">
          <div style="text-align: left">
            <el-link type="primary" @click="goDeclareRouter(scope)"
              >申报详情</el-link
            >
            <el-divider direction="vertical"></el-divider>
            <el-link
              @click="goAuditResult(scope)"
              v-if="
                (userInfo.roleId === 3 && isAudit(scope.data.declareStatus)) ||
                isAdminAudit(scope.data.declareStatus)
              "
              type="primary"
            >
              审核详情
            </el-link>
            <el-link
              @click="goAudit(scope)"
              v-if="
                userInfo.roleId !== 3 && !isAdminAudit(scope.data.declareStatus)
              "
              type="primary"
            >
              审核
            </el-link>
            <el-link
              @click="edit(scope.data)"
              v-if="!isAudit(scope.data.declareStatus) && userInfo.roleId === 3"
              type="primary"
            >
              修改
            </el-link>
            <el-divider
              direction="vertical"
              v-if="!isAudit(scope.data.declareStatus) && userInfo.roleId === 3"
            ></el-divider>
            <el-link
              @click="deleteItem(scope.data.id)"
              v-if="!isAudit(scope.data.declareStatus) && userInfo.roleId === 3"
              type="danger"
            >
              删除
            </el-link>
          </div>
        </template>

        <template v-slot:crudAction>
          <el-dropdown
            v-if="userInfo.roleId === 3"
            class="mr-3"
            @command="newApplications"
          >
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
            prop="declareYear"
          ></el-table-column>
          <el-table-column label="申报类型" prop="declareType">
            <template slot-scope="scope">
              <p>{{ declareType[scope.row.declareType] }}</p>
            </template>
          </el-table-column>
          <el-table-column label="申报时间" prop="gmtCreate">
            <template slot-scope="scope">
              <p>{{ scope.row.gmtCreate.slice(0, 11) }}</p>
            </template>
          </el-table-column>
          <el-table-column label="状态" prop="declareStatus">
            <template slot-scope="scope">
              <p>{{ declareStatus[scope.row.declareStatus] }}</p>
            </template>
          </el-table-column>
        </template>
      </Crud>
    </div>

    <router-view />
  </div>
</template>
<script>
import { mapMutations, mapGetters } from "vuex";
import { getVillageList, deleteVillageItem } from "@/api/villageManage";
import {
  DECLEAR_TYPE,
  DECLEAR_STATUS,
  VILLAGE_LIST_ROUTER_NAME,
} from "./constants";

export default {
  data() {
    return {
      query: {
        declareType: "",
        declareStatus: "",
        declareYear: "",
      },
      getMethod: getVillageList,
      deleteMethod: deleteVillageItem,
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  beforeMount() {
    this.declareType = DECLEAR_TYPE;
    this.declareStatus = DECLEAR_STATUS;
    this.declareTypeOpt = this.normalizeSelectOptions(DECLEAR_TYPE);
    this.declareStatusOpt = this.normalizeSelectOptions(DECLEAR_STATUS);
  },
  methods: {
    ...mapMutations("villageMange", ["changeDeclareList"]),
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
      const routerName = VILLAGE_LIST_ROUTER_NAME[Number(val)];
      routerName && this.$router.push({ name: routerName });
    },
    // 普通用户，是否可修改
    isAudit(status) {
      return status !== 2001;
    },
    // 管理员 -- 是否需要审核
    isAdminAudit(status) {
      if (this.userInfo.roleId === 2) {
        if (status === 2004 || status === 2999) {
          return true;
        } else {
          return false;
        }
      } else if (this.userInfo.roleId === 1) {
        if (status === 2999) {
          return true;
        } else {
          return false;
        }
      }
    },
    // 申报详情
    goDeclareRouter(scope) {
      const { id, declareYear, declareType } = scope.data;

      this.changeDeclareList({ id, declareYear, declareType });
      this.$router.push({
        name: "declareList",
      });
    },
    // 审核详情
    goAuditResult(scope) {
      const { id, declareYear, declareType } = scope.data;
      this.$router.push({
        name: "auditList",
        query: { id, declareYear, declareType: DECLEAR_TYPE[declareType] },
      });
    },
    // 审核
    goAudit(scope) {
      const { id, declareYear, declareType } = scope.data;

      this.changeDeclareList({ id, declareYear, declareType });
      this.$router.push({
        name: "audit",
      });
    },
    // 修改
    edit(data) {
      const { id, declareYear, declareType } = data;
      this.$router.push({
        name: VILLAGE_LIST_ROUTER_NAME[declareType],
        query: { id, declareYear },
      });
    },
    // 删除
    deleteItem(id) {
      this.$confirm("是否删除该条数据？", "提示", {
        type: "warning",
      }).then(async () => {
        deleteVillageItem([id]).then(() => {
          this.$notify.success("删除成功");
          this.$refs.crud.getItems();
        });
      });
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
