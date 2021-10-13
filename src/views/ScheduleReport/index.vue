<template>
  <div class="village-manage block">
    <div>
      <div class="text-lg mb-4">进度列表</div>
      <Crud
        ref="crud"
        :get-method="getMethod"
        :query.sync="query"
        selection
        id-key="id"
        actionWidth="200px"
        :multiple-delete="userInfo.roleId === 3"
        :hideAdd="true"
        :hideEdit="true"
        :hideView="true"
        :hideDelete="true"
        :permission-add="0"
        :permission-edit="0"
        :permission-delete="0"
      >
        <template v-slot:search>
          <div class="inline-flex items-center mb-6 pl-0">
            项目所在地：
            <el-input
              v-model="query.address"
              style="width: 200px"
              placeholder="请输入"
              clearable
            ></el-input>
          </div>
        </template>
        <template v-slot:export>
          <el-button class="export-button" @click="clickExport">导出</el-button>
        </template>

        <template v-slot:tableAction="scope">
          <div>
            <el-link type="primary" @click="goProjectDetail(scope)"
              >项目详情</el-link
            >
            <el-divider direction="vertical"></el-divider>
            <el-link
              type="primary"
              @click="goDetail(scope)"
              v-if="userInfo.roleId === 3"
            >
              查看进度
            </el-link>
            <el-link
              type="primary"
              v-if="userInfo.roleId < 3"
              @click="goHistory(scope)"
            >
              历史进度
            </el-link>
<!--            <div-->
<!--              class="inline"-->
<!--              v-if="canRemind(scope.data.percentage)"-->
<!--              v-permission="70002"-->
<!--            >-->
<!--              <el-divider direction="vertical"></el-divider>-->
<!--              <el-link type="primary" @click="remindProgress(scope.data.id)">-->
<!--                催办-->
<!--              </el-link>-->
<!--            </div>-->
          </div>
        </template>

        <template v-slot:crudAction>
          <el-button
            type="primary"
            v-if="userInfo.roleId === 3"
            v-permission="60001"
            @click="$router.push({ name: 'NewSchedule' })"
            >上报
          </el-button>
        </template>

        <template v-slot:table>
          <el-table-column
            min-width="60px"
            label="申报年度"
            prop="years"
          ></el-table-column>
          <el-table-column label="项目所在地" prop="address"> </el-table-column>
          <el-table-column
            label="项目进度"
            prop="percentage"
            v-if="userInfo.roleId < 3"
            min-width="110px"
          >
            <template slot-scope="scope">
              <div
                class="progress-wrp"
                :class="{
                  success: isSuccess(scope.row.percentage),
                  fail: isFailed(scope.row.percentage, scope.row.finishTime),
                }"
              >
                <span class="bg">
                  <i
                    class="value"
                    :style="`width:${scope.row.percentage}%`"
                  ></i>
                </span>
                <span class="value-wrp">
                  <i
                    class="num"
                    v-if="
                      !isSuccess(scope.row.percentage) &&
                      !isFailed(scope.row.percentage, scope.row.finishTime)
                    "
                  >
                    {{ scope.row.percentage.toFixed(1) }}%
                  </i>
                  <i
                    class="el-icon-success"
                    v-if="isSuccess(scope.row.percentage)"
                  ></i>
                  <i
                    class="el-icon-error"
                    v-if="isFailed(scope.row.percentage, scope.row.finishTime)"
                  ></i>
                </span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="资金拨付进度"
            prop="funds"
            v-if="userInfo.roleId < 3"
          >
            <template slot-scope="scope">
              {{ scope.row.funds.toFixed(1) }}%
            </template>
          </el-table-column>
          <el-table-column
            label="项目截止日期"
            prop="finishTime"
            v-if="userInfo.roleId < 3"
            align="center"
          >
            <template slot-scope="scope">
              <div>
                <span>{{ scope.row.finishTime || " -- " }}</span>
                <i
                  @click="openDateDialog(scope.row)"
                  v-permission="70002"
                  class="el-icon-date"
                ></i>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="总投资（万元）"
            prop="declareAmount"
            v-if="userInfo.roleId === 3"
          >
          </el-table-column>
          <el-table-column label="进度上报时间" prop="processTime">
          </el-table-column>
        </template>
      </Crud>
    </div>
    <!-- 修改截止日期 -->
    <el-dialog title="修改项目截止日期" :visible.sync="dateDialog">
      <el-form ref="form" :model="form" label-width="180px">
        <el-form-item label="选择截止日期" prop="deadline" :rules="rule.date">
          <el-date-picker
            v-model="form.deadline"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="setDeadline"> 确 定 </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import rule from "@/mixins/rule.js";
import {
  getProjectProgress,
  setProjectDeadline,
  remindProgress,
  exportList,
} from "@/api/scheduleManage";
import { downloadFile } from "@/utils/data"

export default {
  mixins: [rule],
  data() {
    return {
      query: {
        address: "",
      },
      getMethod: getProjectProgress,

      dateDialog: false,
      form: {
        editId: "",
        deadline: "",
      },
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    // 导出
    clickExport() {
      exportList().then(res => {
        downloadFile(res,'重点项目最新进度')
      })
    },
    // 进度详情
    goDetail(row) {
      const { id } = row.data;
      if (id) this.$router.push({ name: "ScheduleDetail", query: { id } });
    },
    // 项目详情
    goProjectDetail(row) {
      const { projectId } = row.data;
      this.$router.push({
        name: "ProjectApplicationDetail",
        query: { id: projectId },
      });
    },
    // 历史详情
    goHistory(row) {
      const { projectId } = row.data;
      if (projectId)
        this.$router.push({
          name: "HistorySchedule",
          query: { id: projectId },
        });
    },
    // 省级可修改项目截止日期
    openDateDialog(row) {
      if (this.userInfo.roleId === 1) {
        this.form.editId = row.projectId;
        this.dateDialog = true;
      }
    },
    // 省市进度催办
    remindProgress(id) {
      this.$confirm("是否催办该项目进度？", "提示", {
        type: "warning",
      }).then(async () => {
        const ids = Array.isArray(id) ? id : [id];
        remindProgress(ids).then(() => {
          this.$notify.success("催办成功");
        });
      });
    },
    closeDialog() {
      this.$refs.form.resetFields();
      this.dateDialog = false;
    },
    setDeadline() {
      if (this.userInfo.roleId !== 1) return;
      this.$refs.form.validate((valid) => {
        if (valid) {
          const params = {
            projectId: this.form.editId,
            finishTime: this.form.deadline,
          };
          setProjectDeadline(params).then(() => {
            this.$notify.success("修改成功");
            this.$refs.crud.getItems();
            this.closeDialog();
          });
        }
      });
    },
    isSuccess(val) {
      return val >= 100;
    },
    isFailed(progress, deadline) {
      if (this.isSuccess(progress)) return false;
      return new Date().getTime() > new Date(`${deadline} 23:59:59`).getTime();
    },
    // 是否催办
    canRemind(percentage) {
      if (this.userInfo.roleId === 3 || percentage >= 100) return false;
      return true;
    },
  },
};
</script>
<style lang="scss" scoped>
.export-button{
  float: right;
}
.search-item {
  margin-right: 20px;
  .label {
    font-weight: 400;
    color: #333333;
  }
}
.el-icon-date {
  color: #409eff;
  cursor: pointer;
  margin-left: 3px;
}
.progress-wrp {
  display: flex;
  align-items: center;
  .bg {
    position: relative;
    display: block;
    width: 80px;
    height: 4px;
    background: #f2f3f5;
    border-radius: 2px;
    margin-right: 8px;
    overflow: hidden;
    .value {
      position: absolute;
      display: block;
      height: 4px;
      top: 0;
      left: 0;
      background: #1492ff;
    }
  }
  .value-wrp {
    .el-icon-success {
      font-size: 16px;
      color: #15be50;
    }
    .el-icon-error {
      font-size: 16px;
      color: #d40000;
    }
  }

  &.success {
    .bg {
      .value {
        background: #15be50;
      }
    }
  }
  &.fail {
    .bg {
      .value {
        background: #d40000;
      }
    }
  }
}
</style>
