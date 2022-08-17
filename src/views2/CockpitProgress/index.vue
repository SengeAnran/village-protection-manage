<template>
  <div class="village-manage block">
    <div>
      <div class="text-lg mb-4">村庄列表</div>
      <Crud
        ref="crud"
        :get-method="getMethod"
        :query.sync="query"
        id-key="id"
        actionWidth="140px"
        :hideAdd="true"
        :hideEdit="true"
        :hideView="true"
        :hideDelete="true"
        :permission-add="0"
        :permission-edit="0"
        :permission-delete="0"
        @resetForm="resetFormCallback"
      >
        <template v-slot:search>
          <div class="search-content inline-flex mb-6 pl-0">
            <div class="search-item" v-if="roleId === 1">
              <span class="label">地区：</span>
              <el-cascader ref="cascader" :show-all-levels="false" :props="cascaderProps" @change="changeArea">
              </el-cascader>
            </div>
            <div class="search-item">
              <span class="label">村庄名称：</span>
              <el-input style="width: 150px" v-model="query.village" :maxlength="50" placeholder="请输入"></el-input>
            </div>
            <div class="search-item">
              <span class="label">指标完成率：</span>
              <el-input style="width: 72px" v-model="query.completionRateMin" placeholder="请输入"></el-input>
              <span style="margin: 0 10px">-</span>
              <el-input style="width: 72px" v-model="query.completionRateMax" placeholder="请输入"></el-input>
            </div>
            <div class="search-item">
              <span class="label">状态：</span>
              <el-select style="width: 150px" v-model="query.finalStatus" placeholder="请选择">
                <el-option v-for="item in declareStatusOpt" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
        </template>
        <template v-slot:tableAction="scope">
          <div style="text-align: center; display: flex; justify-content: space-around">
            <el-link @click="handleClick(scope)" type="primary">
              {{ computedActionName(scope.data.finalStatus) }}
            </el-link>
            <el-link v-if="scope.data.finalStatus === 0" @click="showRejectReason(scope)" type="primary">
              退回原因
            </el-link>
          </div>
        </template>

        <template v-slot:table>
          <el-table-column label="地区" prop="fullName"></el-table-column>
          <el-table-column label="村庄名称" prop="village" width="100"> </el-table-column>
          <el-table-column label="指标完成率" prop="completionRate">
            <template slot-scope="scope">
              {{ (scope.row.completionRate && `${scope.row.completionRate}%`) || '--' }}
            </template>
          </el-table-column>
          <el-table-column label="动态指标完成率" prop="dynamicCompletionRate">
            <template slot-scope="scope">
              {{ (scope.row.dynamicCompletionRate && `${scope.row.dynamicCompletionRate}%`) || '--' }}
            </template>
          </el-table-column>
          <el-table-column label="状态" prop="finalStatus">
            <template slot-scope="scope">
              <p
                class="status"
                :class="{
                  disabled: scope.row.finalStatus === -1,
                  success: scope.row.finalStatus === 3,
                  danger: scope.row.finalStatus === 0,
                }"
              >
                {{ declareStatus[scope.row.finalStatus] }}
              </p>
            </template>
          </el-table-column>
        </template>
      </Crud>
    </div>
    <AuditPopup
      :visible.sync="auditPopupVisible"
      :cockpitUrl="cockpitUrl"
      :status="auditStatus"
      :id="auditId"
      @confirm="onAuditConfirm"
    />
    <ReasonPopup :visible.sync="reasonPopupVisible" :rejection="rejection" />
  </div>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex';
import { DECLARE_STATUS, CASCADER_PROPS } from './constants';
import { goCockpitEditUrl } from './utils';

import { pageQuery } from '@/api2/cockpitProgress';

import AuditPopup from './AuditPopup.vue';
import ReasonPopup from './ReasonPopup.vue';

export default {
  components: { AuditPopup, ReasonPopup },
  data() {
    return {
      declareStatusOpt: [
        {
          label: '全部',
          value: '',
        },
      ],
      query: {
        address: {
          city: '',
          county: '',
        },
        completionRateMin: undefined,
        completionRateMax: undefined,
        finalStatus: undefined,
        village: undefined,
      },
      cascaderProps: CASCADER_PROPS, // 级联选择prop

      auditPopupVisible: false, // 审核弹窗
      cockpitUrl: '',
      auditStatus: '',
      auditId: 0,

      reasonPopupVisible: false, // 审核弹窗
      rejection: '',

      getMethod: pageQuery,
    };
  },
  computed: {
    ...mapGetters(['userInfo']),
    roleId() {
      return this.userInfo.roleId;
    },
  },
  beforeMount() {
    this.declareStatus = DECLARE_STATUS;
    this.declareStatusOpt = this.declareStatusOpt.concat(this.normalizeSelectOptions(DECLARE_STATUS));
  },
  mounted() {},
  methods: {
    ...mapMutations('villageMange', ['changeDeclareList']),

    newApplications() {
      this.$router.push({ name: 'newApplication' });
    },
    changeArea(val) {
      this.query.address.city = (val && val[0]) || '';
      this.query.address.county = (val && val[1]) || '';
    },
    resetFormCallback() {
      this.roleId === 1 && this.$refs.cascader.panel.clearCheckedNodes();
    },
    handleClick(scope) {
      const { data } = scope;
      const actionName = this.computedActionName(data.finalStatus);
      if (actionName === '查看') {
        // window.location.href = data.stationUrl;
        // window.location.href = getCockpitEditUrl(data.stationUrl);
        goCockpitEditUrl(data.stationUrl);
      } else if (actionName === '审核') {
        this.cockpitUrl = scope.data.stationUrl;
        this.auditPopupVisible = true;
        this.auditStatus = data.finalStatus;
        this.auditId = data.id;
      }
    },
    showRejectReason(scope) {
      const { data } = scope;
      this.reasonPopupVisible = true;
      this.rejection = data.rejection;
    },
    onAuditConfirm() {
      this.$refs.crud.getItems();
    },
    computedActionName(status) {
      if (this.roleId === 3) {
        return [0, 1].includes(status) ? '审核' : '查看';
      } else if (this.roleId === 1) {
        return [2, 3].includes(status) ? '审核' : '查看';
      }
      return '--';
    },

    normalizeSelectOptions(obj) {
      if (!Object.prototype.toString.call(obj).slice(8, -1) === 'Object') return [];
      return Object.keys(obj).map((key) => {
        return {
          label: obj[key],
          value: key,
        };
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.search-content {
  flex-wrap: wrap;
}
.search-item {
  padding-bottom: 10px;
  margin-right: 20px;
  display: flex;
  align-items: center;
  .label {
    font-weight: 400;
    color: #333333;
    white-space: nowrap;
  }
}
.status {
  color: #ffc107;
  &.disabled {
    color: #aaa;
  }
  &.success {
    color: #4caf50;
  }
  &.danger {
    color: #d50808;
  }
}
</style>
