<template>
  <div class="block">
    <div class="text-lg mb-4">评审列表</div>
    <Crud
      ref="crud"
      :get-method="getMethod"
      :query.sync="query"
      id-key="id"
      hide-add
      hide-edit
      hide-view
      hide-delete
      :permission-add="0"
      :permission-edit="30002"
      :permission-delete="0"
      :action-width="`${userInfo.roleId === 3 ? '240px' : '200px'}`"
    >
      <template v-slot:search>
        <el-date-picker
          v-model="query.declareYear"
          type="year"
          value-format="yyyy"
          placeholder="请选择年度"
          clearable
        ></el-date-picker>
        <el-select
          v-model="query.reviewStatus"
          placeholder="请选择状态"
          clearable
        >
          <el-option
            v-for="item in Object.keys(formatReviewStatus)"
            :key="item"
            :value="item"
            :label="formatReviewStatus[item]"
          ></el-option>
        </el-select>
      </template>

      <template v-slot:export>
        <el-button class="export-button" @click="clickExport">导出</el-button>
      </template>

      <template v-slot:table>
        <el-table-column label="申报年度" prop="declareYear"></el-table-column>
        <el-table-column
          label="重点村庄名称"
          prop="villageName"
        ></el-table-column>
        <el-table-column
          label="评审规划时间"
          prop="gmtCreate"
        ></el-table-column>
        <el-table-column label="状态" prop="reviewStatus">
          <template slot-scope="scope">{{
            reviewStatusMap[scope.row.reviewStatus]
          }}</template>
        </el-table-column>
      </template>

      <template v-slot:tableAction="scope">
        <div style="text-align: left">
          <div
            class="inline"
            v-if="actionControl('村庄详情', scope.data.reviewStatus)"
          >
            <el-link type="primary" @click="toVillage(scope)">村庄详情</el-link>
            <el-divider direction="vertical"></el-divider>
          </div>
          <el-link
            v-permission="30002"
            type="primary"
            @click="toAuditSave(scope, 'add')"
            v-if="actionControl('评审', scope.data.reviewStatus)"
            >评审</el-link
          >
          <el-link
            v-permission="30002"
            type="primary"
            v-if="actionControl('修改', scope.data.reviewStatus)"
            @click="toAuditSave(scope, 'edit')"
            >修改</el-link
          >
          <el-link
            type="primary"
            v-if="actionControl('评审详情', scope.data.reviewStatus)"
            @click="toAuditDetail(scope)"
            >评审详情</el-link
          >
          <div
            class="inline"
            v-if="actionControl('审核', scope.data.reviewStatus)"
            v-permission="30002"
          >
            <el-divider direction="vertical"></el-divider>
            <el-link type="primary" @click="openDialog(scope)">审核</el-link>
          </div>
          <div
            class="inline"
            v-if="actionControl('审核详情', scope.data.reviewStatus)"
          >
            <el-divider direction="vertical"></el-divider>
            <el-link type="primary" @click="toVerifyDetail(scope)"
              >审核详情</el-link
            >
          </div>
        </div>
      </template>
    </Crud>
    <el-dialog
      :visible.sync="showDialog"
      title="审核"
      width="500px"
      @close="resetForm"
    >
      <el-form ref="form" :model="form" label-position="top">
        <el-form-item
          label="是否通过该重点村规划评审："
          :rules="rule.select"
          prop="status"
        >
          <el-radio-group v-model="form.status">
            <el-radio :label="1">通过</el-radio>
            <el-radio :label="0">不通过</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="审核意见：">
          <el-input
            v-model="form.remark"
            type="textarea"
            :rows="5"
            placeholder="请输入"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <div>
          <el-button @click="resetForm">取消</el-button>
          <el-button type="primary" @click="submit">确定</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getPlanList, exportList, verifyPlan } from "@/api/planningReview";
import rule from "@/mixins/rule";
import { mapGetters } from "vuex";

export default {
  mixins: [rule],
  data() {
    return {
      query: {
        declareYear: "",
        reviewStatus: "",
      },
      getMethod: getPlanList,
      // 未填报:2000（此状态县级可进行填报） 待市级审核：2001（此状态县级可修改评审） 市级审核不通过:2002 省级审核不通过: 2003 市级审核通过 待省级审核:2004 验收通过:2999
      reviewStatusMap: {
        2000: "未填报",
        2001: "待市级审核",
        2002: "市级审核不通过",
        2003: "省级审核不通过",
        2004: "市级审核通过，待省级审核",
        2999: "验收通过",
      },
      showDialog: false,
      form: {
        id: "",
        remark: "",
        status: "",
      },
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
    formatReviewStatus() {
      if (this.userInfo.roleId !== 3) {
        delete this.reviewStatusMap[2000];
      }
      return this.reviewStatusMap;
    },
  },
  beforeMount() {
    this.XIANJI_ACTION = {
      村庄详情: () => true,
      评审: (reviewStatus) => this._canReview(reviewStatus, 3),
      修改: (reviewStatus) => this._canModify(reviewStatus, 3),
      评审详情: (reviewStatus) => this._canViewReview(reviewStatus, 3),
      审核详情: (reviewStatus) => this._canViewDeclare(reviewStatus, 3),
    };
    this.SHIJI_ACTION = {
      审核: (reviewStatus) => this._canDeclare(reviewStatus, 2),
      评审详情: (reviewStatus) => this._canViewReview(reviewStatus, 2),
      审核详情: (reviewStatus) => this._canViewDeclare(reviewStatus, 2),
    };
    this.ADMIN_ACTION = {
      审核: (reviewStatus) => this._canDeclare(reviewStatus, 1),
      评审详情: (reviewStatus) => this._canViewReview(reviewStatus, 1),
      审核详情: (reviewStatus) => this._canViewDeclare(reviewStatus, 1),
    };
  },
  methods: {
    clickExport() {
      exportList().then(res => {
        console.log(res)
      })
    },
    showVerify(status) {
      if (this.userInfo.roleId === 3) {
        return false;
      }
      if (this.userInfo.roleId === 2) {
        if (status === 2001) {
          return true;
        } else {
          return false;
        }
      }
      if (this.userInfo.roleId === 1) {
        if (status === 2004) {
          return true;
        } else {
          return false;
        }
      }
    },
    toVillage(scope) {
      this.$router.push(
        `/villageApplication/villageDetail?id=${scope.data.id}`
      );
    },
    toAuditSave(scope, type) {
      this.$router.push(`/planAudit/save?type=${type}&id=${scope.data.id}`);
    },
    toAuditDetail(scope) {
      this.$router.push(`/planAudit/detail?id=${scope.data.id}`);
    },
    toVerifyDetail(scope) {
      this.$router.push(
        `/planAudit/verify/detail?id=${scope.data.id}&villageName=${scope.data.villageName}&reviewStatus=${scope.data.reviewStatus}&declareYear=${scope.data.declareYear}`
      );
    },
    openDialog(scope) {
      this.form.id = scope.data.id;
      this.showDialog = true;
    },
    resetForm() {
      this.showDialog = false;
      this.form = {
        id: "",
        remark: "",
        status: "",
      };
      this.$refs.form.resetFields();
    },
    async submit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          await verifyPlan(this.form);
          this.$notify.success("提交成功");
          this.resetForm();
          this.$refs.crud.getItems();
        }
      });
    },

    /**
     * @desc 判断action按钮是否显示
     * @param {String} actionName 按钮名称
     * @param {Number} reviewStatus 审核状态码
     */
    actionControl(actionName, reviewStatus) {
      const { roleId } = this.userInfo;
      if (roleId === 3) {
        return (
          this.XIANJI_ACTION[actionName] &&
          this.XIANJI_ACTION[actionName](reviewStatus)
        );
      } else if (roleId === 2) {
        return (
          this.SHIJI_ACTION[actionName] &&
          this.SHIJI_ACTION[actionName](reviewStatus)
        );
      } else if (roleId === 1) {
        return (
          this.ADMIN_ACTION[actionName] &&
          this.ADMIN_ACTION[actionName](reviewStatus)
        );
      }
      return false;
    },

    // 评审
    _canReview(reviewStatus, roleId) {
      return roleId === 3 && reviewStatus === 2000;
    },
    // 修改
    _canModify(reviewStatus, roleId) {
      return roleId === 3 && [2001, 2002, 2003].includes(reviewStatus);
    },
    // 评审详情
    _canViewReview(reviewStatus, roleId) {
      if (roleId === 3) {
        return (
          reviewStatus > 2001 && reviewStatus !== 2002 && reviewStatus !== 2003
        ); // 2001 可修改，此时不展示详情，可从修改里看
      } else if (roleId < 3) {
        return reviewStatus > 2000; // 县级提交后就可以看评审详情
      }
    },
    // 审核
    _canDeclare(reviewStatus, roleId) {
      if (roleId === 2) {
        return !(reviewStatus > 2001);
      } else if (roleId === 1) {
        return reviewStatus === 2004;
      }
      return false;
    },
    // 审核详情
    _canViewDeclare(reviewStatus, roleId) {
      if (roleId === 3) {
        return (
          reviewStatus > 2001 && reviewStatus !== 2002 && reviewStatus !== 2003
        );
      } else if (roleId === 2) {
        return reviewStatus > 2001;
      } else if (roleId === 1) {
        return reviewStatus !== 2004;
      }
      return false;
    },
  },
};
</script>

<style lang="scss" scoped>
.export-button{
  float: right;
}
::v-deep .table-action {
  > * {
    margin: 2px;
  }
}
</style>
