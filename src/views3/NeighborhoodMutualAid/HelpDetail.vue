<template>
  <el-dialog
    class="page-help-detail"
    title="详情"
    :visible="visible"
    width="504px"
    @close="$emit('update:visible', false)"
    v-loading="loading"
  >
    <section class="base-info">
      <div v-for="(item, i) in baseInfoLabels" :key="i">
        <p class="row" v-if="isShow(item)">
          <span class="label">{{ item.label }}:</span>
          <span
            class="value"
            v-if="item.prop === 'mutualAidStatus'"
            :style="`color:${TYPE_TAG_MAP_COLORS[data[item.prop]]}`"
          >
            {{ TYPE_TAG_MAP[data[item.prop]] }}
          </span>
          <span class="value" v-else>
            {{ data[item.prop] || "--" }}
          </span>
        </p>
      </div>
    </section>
    <section class="claim-info" v-if="hasClaim">
      <div v-for="(item, i) in claimInfoLabels" :key="i">
        <p class="row" v-if="isShow(item)">
          <span class="label">{{ item.label }}:</span>
          <span class="value">{{ data[item.prop] || "--" }}</span>
        </p>
      </div>
    </section>

    <span slot="footer" class="dialog-footer" v-if="canAudit">
      <el-button @click="onHandleNoPass">不通过</el-button>
      <el-button type="primary" @click="onHandlePass" plain>通过</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { TYPE_TAG_MAP, TYPE_TAG_MAP_COLORS } from "./constants";

export default {
  name: "HelpDetail",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default: () => ({}),
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      innerVisible: false,
      reviewNotes: "", //审核备注

      baseInfoLabels: [
        { label: "所在村", prop: "address" },
        { label: "互助事项", prop: "matterName" },
        { label: "事项描述", prop: "matterDescription" },
        { label: "申请人", prop: "applicant" },
        { label: "联系方式", prop: "applicantPhone" },
        { label: "发起时间", prop: "gmtCreate" },
        { label: "截止时间", prop: "deadline" },
        { label: "所需人数", prop: "peopleNumber" },
        { label: "状态", prop: "mutualAidStatus" },
        { label: "原因", prop: "reviewNotes" }, // 未通过时展示
      ],
      claimInfoLabels: [
        //认领时展示
        { label: "认领人", prop: "claimant" },
        { label: "认领时间", prop: "claimTime" },
        { label: "联系方式", prop: "claimantPhone" },
        { label: "完成时间", prop: "completeTime" }, // 完成时展示
      ],

      TYPE_TAG_MAP,
      TYPE_TAG_MAP_COLORS,
    };
  },

  computed: {
    canAudit() {
      return this.data.mutualAidStatus === -1;
    },
    hasClaim() {
      return [2, 3, 4, 6].includes(this.data.mutualAidStatus);
    },
  },

  methods: {
    isShow(item) {
      //  是否展示原因
      if (item.prop === "reviewNotes" && this.data.mutualAidStatus !== 0) {
        return false;
      }
      // 是否展示完成时间
      if (item.prop === "completeTime" && this.data.mutualAidStatus !== 6) {
        return false;
      }
      return true;
    },
    onHandleNoPass() {
      this.$emit("update:visible", false);
      setTimeout(() => {
        this.$emit("noPass");
      }, 250);
    },
    onHandlePass() {
      this.$emit("pass");
    },
  },
};
</script>
<style lang="scss" scoped>
.page-help-detail {
  ::v-deep .el-dialog {
    border-radius: 8px;
  }
  ::v-deep .el-dialog__header {
    text-align: center;
    border-bottom: 1px solid #e6e9f0;
  }
  ::v-deep .el-dialog__body {
    padding: 0 50px;
  }
  ::v-deep .el-dialog__footer {
    text-align: center;
  }
  .base-info,
  .claim-info {
    padding: 20px;
  }
  .claim-info {
    border-top: 1px solid #e6e9f0;
  }
  .dialog-footer {
    & button {
      font-size: 14px;
      width: 80px;
      &:last-child {
        background-color: #fff;
        &:hover,
        &:active,
        &:focus {
          color: #409eff;
        }
      }
    }
  }
  .row {
    display: flex;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    line-height: 16px;
    padding: 10px 0;
    .label {
      display: block;
      width: 84px;
      color: #666666;
      flex-shrink: 0;
    }
    .value {
      display: block;
      color: #333333;
    }
  }
}
</style>
