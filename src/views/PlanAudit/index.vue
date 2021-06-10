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
      :permission-edit="3002"
      :permission-delete="0"
      action-width="200px"
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
            v-for="item in Object.keys(reviewStatusMap)"
            :key="item"
            :value="item"
            :label="reviewStatusMap[item]"
          ></el-option>
        </el-select>
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
        <el-link type="primary" @click="toVillage(scope)">村庄详情</el-link>
        <el-link
          v-permission="30002"
          type="primary"
          @click="toAuditSave(scope, 'add')"
          v-if="scope.data.reviewStatus === 2000"
          >评审</el-link
        >
        <el-link
          v-permission="30002"
          type="primary"
          v-if="userInfo.roleId === 3 && scope.data.reviewStatus === 2001"
          @click="toAuditSave(scope, 'edit')"
          >修改</el-link
        >
        <el-link
          type="primary"
          v-if="
            scope.data.reviewStatus !== 2001 && scope.data.reviewStatus !== 2000
          "
          @click="toAuditDetail(scope)"
          >评审详情</el-link
        >
        <el-link
          v-if="showVerify(scope.data.reviewStatus)"
          type="primary"
          @click="openDialog(scope)"
          >审核</el-link
        >
        <el-link
          type="primary"
          v-if="scope.data.reviewStatus > 2001"
          @click="toVerifyDetail(scope)"
          >审核详情</el-link
        >
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
import { getPlanList, verifyPlan } from "@/api/planningReview";
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
  },
  methods: {
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
  },
};
</script>

<style lang="scss" scoped>
::v-deep .table-action {
  > * {
    margin: 2px;
  }
}
</style>
