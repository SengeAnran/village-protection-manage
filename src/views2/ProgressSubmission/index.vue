<template>
  <div class="block">
    <div>
      <div class="text-lg mb-4">报送列表</div>
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
        showExport2
        :export-method="exportMethod"
        export-name="导出信息汇总表"
        export-name2="导出项目进度表"
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
              <span class="label">村（片区）名称：</span>
              <el-input
                style="width: 200px"
                v-model="query.villageName"
                :maxlength="50"
                placeholder="请输入村庄名称"
              ></el-input>
            </div>
            <div class="search-item">
              <span class="label">申报更新时间：</span>
              <el-date-picker
                v-model="query.declarationBatch"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </div>

          </div>
        </template>
        <template v-slot:tableAction="scope">
          <div style="text-align: left">
            <el-link
              @click="goAuditResult(scope)"
              type="primary"
            >
              详情
            </el-link>
            <el-divider v-if="roleId === 3" direction="vertical"></el-divider>
            <div
              style="display: inline-block"
            >
              <el-link @click="edit(scope.data)" type="primary"> 进度报送</el-link>
              <!--              <el-divider direction="vertical"></el-divider>-->
            </div>
          </div>
        </template>

<!--        <template v-slot:export>-->
<!--          <el-button-->
<!--            icon="el-icon-download"-->
<!--            v-if="roleId !== 3"-->
<!--            type="primary"-->
<!--            plain-->
<!--            @click="exportEnclosure"-->
<!--          >导出附件</el-button-->
<!--          >-->
<!--        </template>-->

        <template v-slot:table>
          <el-table-column
            label="村（片区）名称"
            prop="villageName"
          ></el-table-column>
          <el-table-column
            label="创建批次"
            prop="declarationBatch"
          ></el-table-column>
          <el-table-column
            label="项目数"
            prop="declarationBatch"
          ></el-table-column>
          <el-table-column
            label="计划投资（万元）"
            prop="declarationBatch"
          ></el-table-column>
          <el-table-column
            label="完成投资(万元)"
            prop="declarationBatch"
          ></el-table-column>
          <el-table-column
            label="投资完成率"
            prop="declarationBatch"
          ></el-table-column>
          <el-table-column label="申报更新时间" prop="gmtCreate">
            <template slot-scope="scope">
              <p>{{ scope.row.gmtCreate }}</p>
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
      this.$router.push({name: "ProgressSubmissionDetails", query: {id: id}})
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
        name: "NewProgressSubmission",
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
