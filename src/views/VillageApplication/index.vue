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
                  v-for="item in queryDeclareTypeOpt"
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
            <div class="search-item">
              <span class="label">村庄名称：</span>
              <el-input
                style="width: 200px"
                v-model="query.createBy"
                :maxlength="50"
                placeholder="请输入村庄名称"
              ></el-input>
            </div>
          </div>
        </template>
        <template v-slot:insert>
          <div class="tip" v-if="roleId === 2 && batchInfo.pici">
            <div class="tip-left">
              <img src="@/assets/imgs/u15.png" alt="">
            </div>
            <div class="tip-right">
              <div class="tip-title">排序提示</div>
              <div class="tip-content">当前正在申报的
                <span>{{ batchInfo.pici }}</span>个批次中，有
                <span>{{ batchInfo.import || 0}}</span>个重点村、
                <span>{{ batchInfo.general || 0 }}</span>
                个一般村申报已审核通过，您需要分批次排序后提交至省级审核。
              </div>
              <div class="tip-button">
                <el-link type="primary" :underline="false" @click="showDialog()">前往排序</el-link>
              </div>
            </div>
          </div>
        </template>
        <template v-slot:tableAction="scope">
          <div style="text-align: left">
            <el-link v-if="roleId !== 1" type="primary" @click="goDeclareRouter(scope)" >
              申报详情
            </el-link>
            <el-divider v-if="roleId !== 1" direction="vertical"></el-divider>
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
              v-permission="320002"
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
<!--              <el-divider direction="vertical"></el-divider>-->
            </div>
<!--            <el-link-->
<!--              @click="deleteItem(scope.data.id)"-->
<!--              v-if="actionControl('删除', scope.data.declareStatus)"-->
<!--              type="danger"-->
<!--              v-permission="10003"-->
<!--            >-->
<!--              删除-->
<!--            </el-link>-->
          </div>
        </template>

        <template v-slot:crudAction>
          <el-dropdown
            v-permission="310001"
            class="mr-3"
            @command="newApplications"
          >
            <el-button type="primary" icon="el-icon-plus"> 新建申报 </el-button>
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
          <el-table-column label="村庄名称" prop="villageName">
            <template slot-scope="scope">
              <p>{{ scope.row.villageName }}</p>
            </template>
          </el-table-column>
          <el-table-column v-if="roleId ===1" label="推荐次序" align="center" width="100" prop="citySortNum">
            <template slot-scope="scope">
              <p>{{ scope.row.citySortNum }}</p>
            </template>
          </el-table-column>
          <el-table-column v-if="roleId < 3" label="申报县" prop="gmtCreate">
            <template slot-scope="scope">
              <p>{{ scope.row.county }}</p>
            </template>
          </el-table-column>
          <el-table-column v-if="roleId < 2" label="申报市" prop="gmtCreate">
            <template slot-scope="scope">
              <p>{{ scope.row.city }}</p>
            </template>
          </el-table-column>
          <el-table-column v-if="roleId > 1" label="推荐次序" align="center" width="100" prop="countrySortNum">
            <template slot-scope="scope">
              <p>{{ scope.row.countrySortNum }}</p>
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
    <el-dialog
      title="村庄推荐排序"
      :visible.sync="dialogVisible"
      width="800px"
    >
      <Crud
        ref="dialogCrud"
        :custom-get-method="getDialogDataList"
        :submit-sort-method="submitSortMethod"
        :query.sync="dialogQuery"
        id-key="id"
        actionWidth="210px"
        tableHeight="300"
        order
        moveUp
        moveDown
        moveTop
        virtualDelete
        :hideAdd="true"
        :hideEdit="true"
        :hideView="true"
        :hideDelete="true"
        :hidePagination="true"
        :permission-add="0"
        :permission-edit="0"
        :permission-delete="0"
        @submitSuccess="lookUp"
      >
        <template v-slot:search>
          <div class="inline-flex mb-6 pl-0">
<!--            <div class="search-item">-->
<!--              <span class="label">申报批次：</span>-->
<!--              <el-date-picker-->
<!--                v-model="dialogQuery.declareYear"-->
<!--                type="year"-->
<!--                placeholder="选择年"-->
<!--                value-format="yyyy"-->
<!--              >-->
<!--              </el-date-picker>-->
<!--            </div>-->
            <div class="search-item">
              <span class="label">申报批次：</span>
              <el-select v-model="dialogQuery.declareYear" placeholder="请选择">
                <el-option
                  v-for="item in dialogDeclareYearOpt"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div class="search-item">
              <span class="label">申报类型：</span>
              <el-select v-model="dialogQuery.declareType" placeholder="请选择">
                <el-option
                  v-for="item in dialogDeclareTypeOpt2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </template>
        <template v-slot:table>
          <el-table-column label="村庄名称" prop="villageName">
            <template slot-scope="scope">
              <p>{{ scope.row.villageName }}</p>
            </template>
          </el-table-column>
          <el-table-column v-if="roleId < 3" label="申报县" prop="gmtCreate">
            <template slot-scope="scope">
              <p>{{ scope.row.countyName }}</p>
            </template>
          </el-table-column>
        </template>
      </Crud>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapMutations, mapGetters } from "vuex";
import { queryBatchInfo, queryTypeDeclaration, getRecVillages, getVillageList, deleteVillageItem } from "@/api/villageManage";
import {
  DECLEAR_TYPE,
  DECLEAR_STATUS,
  VILLAGE_LIST_ROUTER_NAME, PRO_DECLEAR_STATUS,
} from "./constants";
import {recVerify} from "../../api/villageManage";

export default {
  data() {
    const date = new Date();
    const year = date.getFullYear().toString();
    console.log(year);

    return {
      query: {
        declareType: "",
        declareStatus: "",
        declareYear: "",
        createBy: "",
      },
      declareYearOpt: [
        {
          value: "",
          label: "2021",
        }
      ],
      queryDeclareTypeOpt: [
        {
          label: "全部",
          value: ""
        }
      ],
      dialogDeclareYearOpt: [
        // {
        //   value: "",
        //   label: "2021",
        // }
      ],
      dialogDeclareTypeOpt2: [
      ],
      declareStatusOpt: [
        {
          label: "全部",
          value: ""
        }
      ],
      getMethod: getVillageList,
      deleteMethod: deleteVillageItem,

      dialogVisible: false,
      submitSortMethod: recVerify,
      batchInfo: {},
      dialogQuery: {
        declareType: "",
        declareYear: "",
      },
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
    roleId() {
      console.log(this.userInfo.roleId);
      return this.userInfo.roleId;
    },
  },
  beforeMount() {
    this.declareType = DECLEAR_TYPE;
    this.declareStatus = DECLEAR_STATUS;
    this.declareTypeOpt = this.normalizeSelectOptions(DECLEAR_TYPE);
    this.queryDeclareTypeOpt = this.queryDeclareTypeOpt.concat(this.normalizeSelectOptions(DECLEAR_TYPE));
    if (this.roleId !== 1) {
      this.declareStatusOpt = this.declareStatusOpt.concat(this.normalizeSelectOptions(DECLEAR_STATUS));
    } else {
      this.declareStatusOpt = this.declareStatusOpt.concat(this.normalizeSelectOptions(PRO_DECLEAR_STATUS));
    }


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
  mounted() {
    this.lookUp();

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
    lookUp() {
      console.log('222222');
      if (this.roleId === 2) {
        this.getTypeDeclaration();
        this.queryBatchInfo();
      }
    },
    // 查询申报批次和类型
    async getTypeDeclaration() {
      const res = await queryTypeDeclaration();
      console.log(res);
      if (res.type) {
        this.dialogDeclareTypeOpt2 = res.type.map((item) => {
          if (item === "1002") {
            return {
              label: "重点村",
              value: "1002",
            };
          } else {
            return { label: "一般村", value: "1001" };
          }
        });
        this.dialogQuery.declareType = this.dialogDeclareTypeOpt2[0].value;
      } else {
        this.dialogQuery.declareType = "";
      }
      if (res.years) {
        this.dialogDeclareYearOpt = res.years.map((item) => {
          return {
            label: item + "年度",
            value: item,
          };
        });
        this.dialogQuery.declareYear = this.dialogDeclareYearOpt[0].value;
      } else {
        this.dialogQuery.declareYear = "";
      }


    },
    // 市级汇总申报排序提示
    async queryBatchInfo() {
      const res = await queryBatchInfo();
      if (res && res.pici) {
        this.batchInfo = res;
        this.$confirm('审核已完成！\n'  +
          '您需要分批次排序后提交至省级审核。', '提示', {
          confirmButtonText: '前往排序',
          cancelButtonText: '暂不排序',
          type: 'warning'
        }).then(() => {
          this.showDialog();
        }).catch(() => {
        });
      } else {
        this.batchInfo = {};
      }
      console.log(res);

    },
    showDialog() {
      this.dialogVisible = true
    },
    onSubmit() {
      this.$refs.dialogCrud.submitSort();
      this.dialogVisible = false;
    },
    async getDialogDataList(params) {
      console.log(params);
      const res = await getRecVillages(params);
      console.log(res);
      return res;

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
      const { id, declareYear, declareType, detailId } = scope.data;
      if (this.roleId !== 1) {
        this.$router.push({
          name: "auditList",
          query: { id, declareYear, declareType: DECLEAR_TYPE[declareType] },
        });
      } else {
        this.$router.push({ name: "villageDetail", query: { id: detailId, goVerify: true } });
      }
    },
    // 审核
    goAudit(scope) {
      const { id, declareYear, declareType, detailId } = scope.data;
      console.log( scope.data);
      // if (this.roleId === 1) {
      //   id = detailId
      // }
      this.changeDeclareList({ id, declareYear, declareType });
      if (this.roleId === 2) {
        this.$router.push({
          name: "audit",
        });
      } else {
        this.$router.push({ name: "villageDetail", query: { id: detailId, verifyKey: true } });
      }
    },
    // 修改
    edit(data) {
      console.log(data);
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

    // 修改、删除 *******
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
