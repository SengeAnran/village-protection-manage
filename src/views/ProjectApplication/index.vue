<template>
  <div class="block">
    <div class="text-lg mb-4">项目列表</div>
    <Crud
      ref="crud"
      :get-method="getMethod"
      :query.sync="query"
      id-key="id"
      hide-view
      hide-edit
      hide-delete
      add-path="/projectApplication/save?type=add"
      edit-path="/projectApplication/save?type=edit"
      view-path="/projectApplication/detail"
      :permission-add="0"
      :permission-edit="0"
      :permission-delete="0"
    >
      <template v-slot:search>
        <div class="inline-flex mb-6 pl-0">
          <div class="search-item">
            <span class="label">项目所在地：</span>
            <el-input
              style="width: 200px"
              v-model="query.address"
              placeholder="请输入项目所在地"
            ></el-input>
          </div>
          <div class="search-item">
            <span class="label">申报年度：</span>
            <el-date-picker
              v-model="query.years"
              type="year"
              value-format="yyyy"
              placeholder="请选择年度"
              clearable
            ></el-date-picker>
          </div>
          <div class="search-item">
            <span class="label">项目类型：</span>
            <el-select
              v-model="query.projectType"
              placeholder="请选择项目类型"
              clearable
            >
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="search-item">
            <span class="label">状态：</span>
            <el-select
              v-model="query.projectStatus"
              placeholder="请选择状态"
              clearable
            >
              <el-option
                value=""
                label="全部"
              ></el-option>
              <el-option
                v-for="item in Object.keys(projectStatusMap)"
                :key="item"
                :value="item"
                :label="projectStatusMap[item]"
              ></el-option>
            </el-select>
          </div>
        </div>
      </template>

      <template v-slot:crudAction v-if="userInfo.roleId === 3">
        <el-button type="primary" v-permission="40001" @click="goAdd"
          >新建申报
        </el-button>
      </template>

      <template v-slot:table>
        <el-table-column label="申报年度" prop="years"></el-table-column>
        <el-table-column label="项目所在地" prop="address"></el-table-column>
        <el-table-column label="总投资(万元)" prop="totalFee"></el-table-column>
        <el-table-column label="申报时间" prop="gmtCreate"></el-table-column>
        <el-table-column label="状态" prop="projectStatus">
          <template slot-scope="scope">{{
            projectStatusMap[scope.row.projectStatus]
          }}</template>
        </el-table-column>
      </template>

      <template v-slot:tableAction="scope">
        <el-link type="primary" @click="goDetail(scope.data.id)">
          详情
        </el-link>
        <div
          class="inline"
          v-if="actionControl('修改', scope.data.projectStatus)"
        >
          <el-divider direction="vertical"></el-divider>
          <el-link type="primary" @click="goModify(scope.data.id)">
            修改
          </el-link>
        </div>
        <div
          class="inline"
          v-if="actionControl('删除', scope.data.projectStatus)"
        >
          <el-divider direction="vertical"></el-divider>
          <el-link type="primary" @click="goDelete(scope.data.id)">
            删除
          </el-link>
        </div>
        <div
          class="inline"
          v-if="actionControl('审核', scope.data.projectStatus)"
          v-permission="50002"
        >
          <el-divider direction="vertical"></el-divider>
          <el-link type="primary" @click="verify(scope)"> 审核 </el-link>
        </div>
      </template>
    </Crud>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  getProjectList,
  verifyProject,
  deleteProject,
} from "@/api/projectDeclare";

export default {
  data() {
    return {
      query: {
        address: "",
        years: "",
        projectType: "",
        projectStatus: "",
      },
      getMethod: getProjectList,
      basicOption: [
        {
          label: "全部",
          value: ""
        }
      ],
      statusOptions: [],
      projectStatusMap: {
        2001: "待市级审核",
        2002: "市级审核不通过",
        2003: "省级审核不通过",
        2004: "市级审核通过，待省级审核",
        2999: "审核通过",
      },
      projectTypeMap: {
        30001: "修缮",
        30002: "扩建",
        30003: "开发利用",
      },
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },

  beforeMount() {
    this.statusOptions = this.basicOption.concat(this.normalizeSelectOptions(this.projectTypeMap));
    console.log( this.statusOptions)
    this.XIANJI_ACTION = {
      详情: () => true,
      修改: (status) => this._canModify(status, 3),
      删除: (status) => this._canDelete(status, 3), // 没有删除接口
      审核详情: (status) => this._canViewDeclare(status, 3),
    };
    this.SHIJI_ACTION = {
      详情: () => true,
      审核: (status) => this._canDeclare(status, 2),
    };
    this.ADMIN_ACTION = {
      详情: () => true,
      审核: (status) => this._canDeclare(status, 1),
    };
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
    goAdd() {
      this.$router.push({
        path: "/projectApplication/save?type=add",
      });
    },
    goDetail(id) {
      this.$router.push({
        name: "ProjectApplicationDetail",
        query: { id },
      });
    },
    goModify(id) {
      this.$router.push({
        path: "/projectApplication/save?type=edit",
        query: { id },
      });
    },
    // 删除
    goDelete(id) {
      this.$confirm("是否删除该条数据？", "提示", {
        type: "warning",
      }).then(async () => {
        const deleteId = Array.isArray(id) ? id : [id];
        deleteProject(deleteId).then(() => {
          this.$notify.success("删除成功");
          this.$refs.crud.getItems();
        });
      });
    },
    verify(scope) {
      const tips =
        this.userInfo.roleId === 1
          ? "是否通过该项目审核？"
          : "是否通过该项目审核，若审核通过则项目提交至省级。";
      this.$confirm(tips, "审核", {
        confirmButtonText: "通过",
        cancelButtonText: "不通过",
        distinguishCancelAndClose: true,
      })
        .then(async (action) => {
          this.submit(action, scope);
        })
        .catch(async (action) => {
          if (action === "cancel") {
            this.submit(action, scope);
          }
        });
    },
    async submit(action, scope) {
      let status = action === "confirm" ? 1 : 0;
      await verifyProject({
        id: scope.data.id,
        status,
      });
      this.$notify.success("操作成功");
      this.$refs.crud.getItems();
    },

    /**
     * @desc 判断action按钮是否显示
     * @param {String} actionName 按钮名称
     * @param {Number} declareStatus 审核状态码
     */
    actionControl(actionName, declareStatus) {
      if (this.userInfo.roleId === 3) {
        return (
          this.XIANJI_ACTION[actionName] &&
          this.XIANJI_ACTION[actionName](declareStatus)
        );
      } else if (this.userInfo.roleId === 2) {
        return (
          this.SHIJI_ACTION[actionName] &&
          this.SHIJI_ACTION[actionName](declareStatus)
        );
      } else if (this.userInfo.roleId === 1) {
        return (
          this.ADMIN_ACTION[actionName] &&
          this.ADMIN_ACTION[actionName](declareStatus)
        );
      }
      return false;
    },
    // 可修改
    _canModify(status, roleId) {
      return roleId === 3 && status === 2001;
    },
    // 可删除
    _canDelete(status, roleId) {
      return (
        roleId === 3 && (status === 2001 || status === 2002 || status === 2003)
      );
    },
    // 审核详情
    _canViewDeclare(status, roleId) {
      return roleId === 3 && status > 2001;
    },
    // 可审核
    _canDeclare(status, roleId) {
      if (roleId === 2) {
        return status === 2001;
      } else if (roleId === 1) {
        return status === 2004;
      }
      return;
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
