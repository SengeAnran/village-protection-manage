<template>
  <div class="block">
    <div>
      <div class="text-lg mb-4">项目调度配置</div>
      <Crud
        ref="crud"
        :get-method="getMethod"
        :update-method="updateMethod"
        :before-edit-method="beforeEditMethod"
        :before-save-method="beforeSaveMethod"
        :query.sync="query"
        :form.sync="form"
        id-key="id"
        actionWidth="180px"
        :multiple-delete="userInfo.roleId === 3"
        hideSearch
        hideAdd
        hideDelete
        :multipleDelete="false"
        :selection="false"
        :hideView="true"
        :permission-add="4100"
        :permission-edit="4100"
        :permission-delete="4100"
        labelWidth="150px"
        dialogWidth="530px"
      >
        <template v-slot:form>
          <!--          <el-form-item label="创建批次：" prop="batch" :rules="rule.input">-->
          <!--            <el-input v-model="form.batch" maxlength="20"></el-input>-->
          <!--          </el-form-item>-->

          <!--          <el-form-item label="创建时间：" prop="declareTime" :rules="rule.multiSelect">-->
          <!--            <el-date-picker-->
          <!--              v-model="form.declareTime"-->
          <!--              value-format="yyyy-MM-dd"-->
          <!--              type="daterange"-->
          <!--              range-separator="至"-->
          <!--              start-placeholder="开始日期"-->
          <!--              end-placeholder="结束日期"-->
          <!--            >-->
          <!--            </el-date-picker>-->
          <!--          </el-form-item>-->
          <el-form-item label="项目调度时间：" prop="schedule" :rules="rules.multiSelect">
            <el-date-picker
              v-model="form.schedule"
              value-format="yyyy-MM"
              type="monthrange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-form-item>
          <!--          <el-form-item label="每月超时报送时间：" prop="schedule" :rules="rules.multiSelect">-->
          <!--            <el-date-picker-->
          <!--              v-model="form.schedule"-->
          <!--              value-format="yyyy-MM"-->
          <!--              type="monthrange"-->
          <!--              range-separator="至"-->
          <!--              start-placeholder="开始日期"-->
          <!--              end-placeholder="结束日期"-->
          <!--            >-->
          <!--            </el-date-picker>-->
          <!--          </el-form-item>-->
          <!--          <el-form-item label="每月允许报送时间：">-->
          <!--            <el-col :span="11">-->
          <!--              &lt;!&ndash; <el-date-picker type="date" placeholder="选择日期" v-model="form.startTime"> </el-date-picker> &ndash;&gt;-->
          <!--              <el-date-picker-->
          <!--                type="date"-->
          <!--                placeholder="选择日期"-->
          <!--                v-model="form.startTime"-->
          <!--                style="width: 100%"-->
          <!--                value-format="yyyy-MM-dd"-->
          <!--              ></el-date-picker>-->
          <!--            </el-col>-->
          <!--            <el-col class="line" :span="2">至</el-col>-->
          <!--            <el-col :span="11">-->
          <!--              <el-date-picker-->
          <!--                type="date"-->
          <!--                placeholder="选择日期"-->
          <!--                v-model="form.endTime"-->
          <!--                style="width: 100%"-->
          <!--                value-format="yyyy-MM-dd"-->
          <!--              ></el-date-picker>-->
          <!--            </el-col>-->
          <!--          </el-form-item>-->
        </template>
        <!--        <template v-slot:tableAction="scope">-->
        <!--          <div style="text-align: left">-->
        <!--            <div-->
        <!--              style="display: inline-block"-->
        <!--            >-->
        <!--              <el-link @click="edit(scope.data)" type="primary"> 修改</el-link>-->
        <!--              &lt;!&ndash;              <el-divider direction="vertical"></el-divider>&ndash;&gt;-->
        <!--            </div>-->
        <!--            <el-divider direction="vertical"></el-divider>-->
        <!--          </div>-->
        <!--        </template>-->

        <template v-slot:crudAction>
          <!--          <el-button v-if="roleId === 3" type="primary" icon="el-icon-plus" @click="newApplications"> 新建</el-button>-->
        </template>

        <template v-slot:table>
          <el-table-column label="创建批次" prop="batch"></el-table-column>
          <el-table-column label="项目调度时间">
            <template slot-scope="scope">
              <p>
                {{ scope.row.scheduleStartTime ? scope.row.scheduleStartTime.slice(0, 10) : '' }}——{{
                  scope.row.scheduleEndTime ? scope.row.scheduleEndTime.slice(0, 10) : ''
                }}
              </p>
            </template>
          </el-table-column>
        </template>
      </Crud>
    </div>
  </div>
</template>

<script>
const rangeTime = (rule, value, callback) => {
  if (!value || value.length !== 2) {
    callback(new Error('请选择'));
  } else if (getRangeMonth(value) <= 12 || getRangeMonth(value) > 24) {
    callback(new Error('请选择一到两年内的时间范围'));
  }
  callback();
};
function getRangeMonth(value) {
  const year = [Number.parseInt(value[0].slice(0, 4)), Number.parseInt(value[1].slice(0, 4))];
  const month = [Number.parseInt(value[0].slice(5, 7)), Number.parseInt(value[1].slice(5, 7))];
  const rangeMonth = (year[1] - year[0]) * 12 + month[1] - month[0];
  return rangeMonth;
}
import { mapMutations, mapGetters } from 'vuex';
import { getSetList, ProjectSchedulUpdate } from '@/api2/declarationBatch';
import rule from '@/mixins/rule';
const type = 2; //type 1：验收时间，2：申报批次
export default {
  mixins: [rule],
  data() {
    return {
      query: {
        type: type,
      },
      form: {
        // type: type, //type 1：验收时间，2：申报批次
        batch: '',
        // declareTime: [],
        schedule: [],
        // endTime: '',
        // startTime: '',
      },
      updateMethod: ProjectSchedulUpdate,
      getMethod: getSetList,
      value1: '',
      dialogVisible: false,
      rules: {
        multiSelect: [
          {
            type: 'array',
            required: true,
            validator: rangeTime,
            trigger: 'change',
          },
        ],
      },
    };
  },
  computed: {
    ...mapGetters(['userInfo']),
    roleId() {
      // console.log(this.userInfo.roleId);
      return this.userInfo.roleId;
    },
  },
  mounted() {},
  methods: {
    ...mapMutations('villageMange', ['changeDeclareList']),

    beforeSaveMethod() {
      // const [startTime, endTime] = this.form.declareTime;
      const [scheduleStartTime, scheduleEndTime] = this.form.schedule;
      return {
        ...this.form,
        // startTime,
        // endTime,
        scheduleStartTime,
        scheduleEndTime,
      };
    },
    beforeEditMethod(item) {
      // console.log(item, 11111);
      this.form.batch = item.batch;
      if (item.scheduleStartTime && item.scheduleStartTime) {
        this.form.schedule = [item.scheduleStartTime, item.scheduleEndTime];
      } else {
        this.form.schedule = [];
      }

      // this.form.startTime = ;
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
  background: #edf4ff;
  border: 1px solid #99cbf9;
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
        color: #1492ff;
      }
    }

    .tip-button {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #1492ff;
      line-height: 22px;
    }
  }
}
</style>
