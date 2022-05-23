<template>
  <div class="village-manage block">
    <div>
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
            <div v-if="roleId !== 3" class="search-item">
              <span class="label">地区：</span>
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
              <span class="label">村庄名称：</span>
              <el-input
                style="width: 200px"
                v-model="query.villageName"
                :maxlength="50"
                placeholder="请输入村庄名称"
              ></el-input>
            </div>
            <div v-if="roleId !== 3" class="search-item">
              <span class="label">创建批次：</span>
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
            <div v-if="roleId !== 3" class="search-item">
              <span class="label">评价等次：</span>
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
            <div v-if="roleId !== 3" class="search-item">
              <span class="label">验收时间：</span>
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
                <span>{{ batchInfo.import || 0 }}</span>个重点村、
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

        <template v-slot:export>
          <el-button
            icon="el-icon-download"
            v-if="roleId !== 3"
            type="primary"
            plain
            @click="exportEnclosure"
          >导出附件</el-button
          >
        </template>

        <template v-slot:table>
          <el-table-column
            label="村庄名称"
            prop="villageName"
          ></el-table-column>
          <el-table-column
            label="创建批次"
            prop="declarationBatch"
          ></el-table-column>
          <el-table-column
            label="总投资（万元）"
            prop="declarationBatch"
          ></el-table-column>
          <el-table-column
            label="县自评得分"
            prop="declarationBatch"
          ></el-table-column>
          <el-table-column
            v-if="roleId !== 3"
            label="市评价得分"
            prop="declarationBatch"
          ></el-table-column>
          <el-table-column
            v-if="roleId !== 3"
            label="评价等次"
            prop="declarationBatch"
          ></el-table-column>
          <el-table-column
            v-if="roleId !== 3"
            label="全市排名"
            prop="declarationBatch"
          ></el-table-column>
          <el-table-column v-if="roleId === 3" label="申请时间" prop="gmtCreate">
            <template slot-scope="scope">
              <p>{{ scope.row.gmtCreate }}</p>
            </template>
          </el-table-column>
          <el-table-column v-else label="县申请时间" prop="gmtCreate">
            <template slot-scope="scope">
              <p>{{ scope.row.gmtCreate }}</p>
            </template>
          </el-table-column>
          <el-table-column v-if="roleId !== 3" label="市审核时间" prop="gmtCreate">
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
import {mapMutations, mapGetters} from "vuex";
import {
  queryBatchInfo,
  queryTypeDeclaration,
  getRecVillages,
  getVillageList,
  deleteVillageItem
} from "@/api2/villageManage";
import {
  DECLEAR_TYPE,
  DECLEAR_STATUS,
  // PRO_DECLEAR_STATUS,
} from "./constants";
import {recVerify} from '../../api/villageManage';
import {getvillagesExport} from "../../api2/villageManage";

export default {
  data() {
    // const date = new Date();
    // const year = date.getFullYear().toString();
    //console.log(year);

    return {
      query: {
        declarationBatch: "",
        finalStatus: "",
        villageName: "",
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
      dialogDeclareTypeOpt2: [],
      declareStatusOpt: [
        {
          label: "全部",
          value: ""
        }
      ],
      getMethod: getVillageList,
      deleteMethod: deleteVillageItem,
      exportMethod: getvillagesExport,

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
    // this.queryDeclareTypeOpt = this.queryDeclareTypeOpt.concat(this.normalizeSelectOptions(DECLEAR_TYPE));
    this.declareStatusOpt = this.declareStatusOpt.concat(this.normalizeSelectOptions(DECLEAR_STATUS));
    // if (this.roleId !== 1) {
    //   this.declareStatusOpt = this.declareStatusOpt.concat(this.normalizeSelectOptions(DECLEAR_STATUS));
    // } else {
    //   this.declareStatusOpt = this.declareStatusOpt.concat(this.normalizeSelectOptions(PRO_DECLEAR_STATUS));
    // }
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
    // this.lookUp();

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
    // 导出附件
    exportEnclosure() {
      console.log('导出附件');
    },
    // newApplications(val) {
    //   const routerName = VILLAGE_LIST_ROUTER_NAME[Number(val)];
    //   routerName && this.$router.push({ name: routerName });
    // },
    newApplications() {
      this.$router.push({ name: 'NewAcceptanceEvaluation' });
    },
    lookUp() {
      if (this.roleId === 2) {
        this.getTypeDeclaration();
        this.queryBatchInfo();
      }
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
            return {label: "一般村", value: "1001"};
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
        this.$confirm('审核已完成！\n' +
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
    // // 申报详情
    // goDeclareRouter(scope) {
    //   const { id, declareYear, finalStatus } = scope.data;
    //
    //   this.changeDeclareList({ id, declareYear, finalStatus });
    //   this.$router.push({
    //     name: "villageDetails",
    //     query: { id: id, goVerify: false }
    //   });
    // },
    // 审核详情
    goAuditResult(scope) {
      const {id} = scope.data;
      // if (this.roleId === 2) {
      //   this.$router.push({
      //     name: "villageDetails",
      //     query: { id, declareYear, finalStatus: DECLEAR_TYPE[finalStatus] },
      //   });
      // } else {
      //   this.$router.push({ name: "villageDetails", query: { id: detailId, goVerify: true } });
      // }
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
