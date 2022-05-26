<template>
  <div class="village-manage block">
    <div v-if="$route.name === 'VillageApplyList2'">
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
        showExport
        :export-method="exportMethod"
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
              <span class="label">申报批次：</span>
              <el-select v-model="query.declarationBatch" placeholder="请选择">
                <el-option
                  v-for="item in queryDeclareTypeOpt"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div class="search-item">
              <span class="label">状态：</span>
              <el-select v-model="query.finalStatus" placeholder="请选择">
                <el-option
                  v-for="item in declareStatusOpt"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div class="search-item">
              <span class="label">村（片区）名称：</span>
              <el-input
                style="width: 200px"
                v-model="query.villageName"
                :maxlength="50"
                placeholder="请输入村（片区）名称"
              ></el-input>
            </div>
          </div>
        </template>
        <template v-slot:tableAction="scope">
          <div style="text-align: left">
            <!--            <el-link v-if="roleId !== 1" type="primary" @click="goDeclareRouter(scope)" >-->
            <!--&lt;!&ndash;              申报详情&ndash;&gt;-->
            <!--              详情-->
            <!--            </el-link>-->
            <!--            <el-divider v-if="roleId !== 1" direction="vertical"></el-divider>-->
            <el-link
              @click="goAuditResult(scope)"
              v-if="actionControl('详情', scope.data.finalStatus)"
              type="primary"
            >
              详情
            </el-link>
            <!--            <el-divider v-if="roleId !== 1" direction="vertical"></el-divider>-->
            <el-link
              @click="goAudit(scope)"
              v-if="actionControl('审核', scope.data.finalStatus)"
              type="primary"
            >
              审核
            </el-link>
            <el-divider v-if="actionControl('修改', scope.data.finalStatus)" direction="vertical"></el-divider>
            <div
              style="display: inline-block"
              v-if="actionControl('修改', scope.data.finalStatus)"
            >
              <el-link @click="edit(scope.data)" type="primary"> 修改</el-link>
              <!--              <el-divider direction="vertical"></el-divider>-->
            </div>
            <el-divider v-if="actionControl('删除', scope.data.finalStatus)" direction="vertical"></el-divider>
            <el-link
              @click="deleteItem(scope.data.id)"
              v-if="actionControl('删除', scope.data.finalStatus)"
              type="danger"
            >
              删除
            </el-link>
          </div>
        </template>

        <template v-slot:crudAction>
          <el-button v-if="roleId === 3" type="primary" icon="el-icon-plus" @click="newApplications"> 新建申报</el-button>
        </template>

        <template v-slot:table>
          <el-table-column
            label="申报批次"
            prop="declarationBatch"
          ></el-table-column>
          <el-table-column label="推荐次序" align="center" width="100" prop="countrySortNum">
            <template slot-scope="scope">
              <p>{{ scope.row.countrySortNum }}</p>
            </template>
          </el-table-column>
          <el-table-column label="村（片区）名称" prop="villageName">
            <template slot-scope="scope">
              <p>{{ scope.row.villageName }}</p>
            </template>
          </el-table-column>
          <el-table-column v-if="roleId < 3" label="申报县" prop="gmtCreate">
            <template slot-scope="scope">
              <p>{{ scope.row.country }}</p>
            </template>
          </el-table-column>
          <el-table-column v-if="roleId < 2" label="申报市" prop="gmtCreate">
            <template slot-scope="scope">
              <p>{{ scope.row.city }}</p>
            </template>
          </el-table-column>
          <el-table-column
            label="计划总投资（万元）"
            prop="investNum"
          ></el-table-column>
          <el-table-column label="申报时间" prop="gmtCreate">
            <template slot-scope="scope">
              <p>{{ scope.row.gmtCreate }}</p>
            </template>
          </el-table-column>
          <el-table-column label="状态" prop="finalStatus">
            <!--            0:市级未审核、1:市级已驳回、2:省级未审核、3:省级已驳回、4:审核通过-->
            <template slot-scope="scope">
              <p>
                <i
                  class="status"
                  :class="{ active: scope.row.finalStatus === 4 }"
                ></i>
                {{ declareStatus[scope.row.finalStatus] }}
              </p>
            </template>
          </el-table-column>
        </template>
      </Crud>
    </div>
  </div>
</template>
<script>
import {mapMutations, mapGetters} from "vuex";
import {
  queryBatchInfo,
  getVillageList,
  deleteVillageItem
} from "@/api2/villageManage";
import {
  DECLEAR_STATUS,
} from "./constants";
import {recVerify} from '../../api/villageManage';
import {getvillagesExport} from "../../api2/villageManage";

export default {
  data() {
    return {
      query: {
        declarationBatch: "",
        finalStatus: "",
        villageName: "",
      },
      queryDeclareTypeOpt: [
        {
          label: "全部",
          value: ""
        }
      ],
      dialogDeclareYearOpt: [],
      dialogDeclareTypeOpt2: [],
      declareStatusOpt: [
        {
          label: "全部",
          value: ""
        },
      ],
      getMethod: getVillageList,
      deleteMethod: deleteVillageItem,
      exportMethod: getvillagesExport,
      submitSortMethod: recVerify,
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
    roleId() {
      return this.userInfo.roleId;
    },
  },
  beforeMount() {
    this.declareStatus = DECLEAR_STATUS;
    this.declareStatusOpt = this.declareStatusOpt.concat(this.normalizeSelectOptions(DECLEAR_STATUS));
    this.getBatchInfo();


    this.XIANJI_ACTION = {
      修改: (declareStatus) => this._canModify(declareStatus, 3),
      删除: (declareStatus) => this._canModify(declareStatus, 3),
      详情: (declareStatus) => this._canViewDeclare(declareStatus, 3),
    };
    this.SHIJI_ACTION = {
      审核: (declareStatus) => this._canDeclare(declareStatus, 2),
      详情: (declareStatus) => this._canViewDeclare(declareStatus, 2),
    };
    this.ADMIN_ACTION = {
      审核: (declareStatus) => this._canDeclare(declareStatus, 1),
      详情: (declareStatus) => this._canViewDeclare(declareStatus, 1),
    };
  },
  mounted() {
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
    newApplications() {
      this.$router.push({name: "newApplication"});
    },
    // 批次
    async getBatchInfo() {
      const res = await queryBatchInfo();
      const opt = res.map(i => {
        return {
          label: i,
          value: i,
        }
      });
      this.queryDeclareTypeOpt = this.queryDeclareTypeOpt.concat(opt);
    },
    // 审核详情
    goAuditResult(scope) {
      const {id} = scope.data;
      this.$router.push({name: "villageDetails", query: {id: id}})
    },
    // 审核
    goAudit(scope) {
      const {id} = scope.data;
      this.$router.push({name: "villageDetails", query: {id: id}})
    },


    // 修改
    edit(data) {
      console.log(data);
      const {id} = data;
      this.$router.push({
        name: "newApplication",
        query: {id},
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
      if (this.roleId === 3) { // 县级
        return (
          this.XIANJI_ACTION[actionName] &&
          this.XIANJI_ACTION[actionName](declareStatus)
        );
      } else if (this.roleId === 2) {
        return ( // 市级
          this.SHIJI_ACTION[actionName] &&
          this.SHIJI_ACTION[actionName](declareStatus)
        );
      } else if (this.roleId === 1) {
        return ( // 省
          this.ADMIN_ACTION[actionName] &&
          this.ADMIN_ACTION[actionName](declareStatus)
        );
      }
      return false;
    },

    // 修改、删除 *******
    _canModify(declareStatus, roleId) {
      return roleId === 3 && (declareStatus === 0 || declareStatus === 1 || declareStatus === 3);
    },
    // 审核详情
    _canViewDeclare(declareStatus, roleId) {
      if (roleId === 3) {
        return true;
      } else if (roleId === 2) {
        return declareStatus !== 0;
      } else if (roleId === 1) {
        return declareStatus !== 2;
      }
      return false;
    },
    // 审核
    _canDeclare(declareStatus, roleId) {
      if (roleId === 2) {
        return (declareStatus === 0);
      } else if (roleId === 1) {
        return (declareStatus === 2);
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

.tip {
  background: #EDF4FF;
  border: 1px solid #99CBF9;
  border-radius: 4px;
  padding: 12px 16px;
  margin-bottom: 20px;
  display: flex;

  .tip-left {
    img {
      width: 16px;
      height: 16px;
      //background: #1492FF;
    }

    margin-right: 12px;
  }

  .tip-right {
    .tip-title {
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #000000;
      line-height: 22px;
      margin-bottom: 8px;
    }

    .tip-content {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #666666;
      line-height: 22px;
      margin-bottom: 8px;

      span {
        color: #1492FF;
      }
    }

    .tip-button {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #1492FF;
      line-height: 22px;
    }
  }
}
</style>
