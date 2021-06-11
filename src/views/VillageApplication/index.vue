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
        :permission-add="0"
        :permission-edit="0"
        :permission-delete="10004"
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
            <el-link type="primary" @click="goDeclareRouter(scope)">
              申报详情
            </el-link>
            <el-divider direction="vertical"></el-divider>
            <el-link
              @click="goAuditResult(scope)"
              v-if="actionControl('审核详情', scope.data.declareStatus)"
              type="primary"
            >
              审核详情
            </el-link>
            <el-link
              @click="goAudit(scope)"
              v-if="actionControl('审核', scope.data.declareStatus)"
              v-permission="20002"
              type="primary"
            >
              审核
            </el-link>
            <div
              style="display: inline-block"
              v-if="actionControl('修改', scope.data.declareStatus)"
              v-permission="10003"
            >
              <el-link @click="edit(scope.data)" type="primary"> 修改 </el-link>
              <el-divider direction="vertical"></el-divider>
            </div>
            <el-link
              @click="deleteItem(scope.data.id)"
              v-if="actionControl('删除', scope.data.declareStatus)"
              type="danger"
              v-permission="10003"
            >
              删除
            </el-link>
          </div>
        </template>

        <template v-slot:crudAction>
          <el-dropdown
            v-permission="10001"
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
    roleId() {
      return this.userInfo.roleId;
    },
  },
  beforeMount() {
    this.declareType = DECLEAR_TYPE;
    this.declareStatus = DECLEAR_STATUS;
    this.declareTypeOpt = this.normalizeSelectOptions(DECLEAR_TYPE);
    this.declareStatusOpt = this.normalizeSelectOptions(DECLEAR_STATUS);

    this.XIANJI_ACTION = {
      申报详情: () => true,
      修改: (declareStatus) => this._canModify(declareStatus, 3),
      删除: (declareStatus) => this._canModify(declareStatus, 3),
      审核详情: (declareStatus) => this._canViewDeclare(declareStatus, 3),
    };
    this.SHIJI_ACTION = {
      申报详情: () => true,
      审核: (declareStatus) => this._canDeclare(declareStatus, 2),
      审核详情: (declareStatus) => this._canViewDeclare(declareStatus, 3),
    };
    this.ADMIN_ACTION = {
      申报详情: () => true,
      审核: (declareStatus) => this._canDeclare(declareStatus, 1),
      审核详情: (declareStatus) => this._canViewDeclare(declareStatus, 1),
    };
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

    /**
     * @desc 判断action按钮是否显示
     * @param {String} actionName 按钮名称
     * @param {Number} declareStatus 审核状态码
     */
    actionControl(actionName, declareStatus) {
      if (this.roleId === 3) {
        return (
          this.XIANJI_ACTION[actionName] &&
          this.XIANJI_ACTION[actionName](declareStatus)
        );
      } else if (this.roleId === 2) {
        return (
          this.SHIJI_ACTION[actionName] &&
          this.SHIJI_ACTION[actionName](declareStatus)
        );
      } else if (this.roleId === 1) {
        return (
          this.ADMIN_ACTION[actionName] &&
          this.ADMIN_ACTION[actionName](declareStatus)
        );
      }
      return false;
    },

    // 修改、删除
    _canModify(declareStatus, roleId) {
      return roleId === 3 && declareStatus === 2001;
    },
    // 审核详情
    _canViewDeclare(declareStatus, roleId) {
      if (roleId === 3) {
        return declareStatus !== 2001;
      } else if (roleId === 2) {
        return declareStatus === 2004 || declareStatus === 2999;
      } else if (roleId === 1) {
        return declareStatus === 2999;
      }
      return false;
    },
    // 审核
    _canDeclare(declareStatus, roleId) {
      if (roleId === 2) {
        return !(declareStatus === 2004 || declareStatus === 2999);
      } else if (roleId === 1) {
        return !(declareStatus === 2999);
      }
      return false;
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
