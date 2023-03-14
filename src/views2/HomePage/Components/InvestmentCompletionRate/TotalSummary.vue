<template>
  <div class="module-wrp">
    <div class="gap"></div>
    <div class="box-item">
      <TotalTitle name="计划投资" unit="万元" countSize="24" :icon="false" :count="Number(formatMoney(totalPlan))" />
      <TotalItem :social="data?.planDrive || 0" :government="data?.planGov || 0" />
      <div class="tip">
        <div class="tip-title">计划投资</div>
        <div class="tip-item">
          <div class="tip-name">政府投资</div>
          <div class="tip-value">{{ (data?.planGov || 0).toFixed(2) }}万元</div>
        </div>
        <div class="tip-item">
          <div class="tip-name">带动投资</div>
          <div class="tip-value">{{ (data?.planDrive || 0).toFixed(2) }}万元</div>
        </div>
      </div>
    </div>

    <!--    <TotalItem background-color="#70abf8" />-->
    <div class="box-item">
      <TotalTitle
        name="完成投资"
        unit="万元"
        countSize="24"
        :icon="false"
        :count="Number(formatMoney(totalComplete))"
      />
      <!--    <TotalItem background-color="#fed887" />-->
      <TotalItem :social="data?.completeDrive || 0" :government="data?.completeGov || 0" />
      <div class="tip">
        <div class="tip-title">完成投资</div>
        <div class="tip-item">
          <div class="tip-name">政府投资</div>
          <div class="tip-value">{{ (data?.completeGov || 0).toFixed(2) }}万元</div>
        </div>
        <div class="tip-item">
          <div class="tip-name">带动投资</div>
          <div class="tip-value">{{ (data?.completeDrive || 0).toFixed(2) }}万元</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TotalItem from './TotalItem.vue';
import TotalTitle from './TotalTitle.vue';
import { formatMoney } from '@/views2/utils/formatter';
export default {
  name: 'TotalSummary',
  components: { TotalItem, TotalTitle },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    totalPlan() {
      const plan = this.data ? this.data.plan : 0;
      return (plan || 0).toFixed(2);
    },
    totalComplete() {
      const complete = this.data ? this.data.complete : 0;
      return complete || 0;
    },
  },
  methods: {
    formatMoney,
  },
};
</script>

<style lang="scss" scoped>
.module-wrp {
  //padding-left: 20px;
  //padding-top: 16px;
  .gap {
    height: 14px;
  }
  .box-item {
    position: relative;
    .tip {
      z-index: 2;
      display: none;
      color: white;
      position: absolute;
      left: 50%;
      top: -100%;
      padding: 15px 9px;
      background: rgba(0, 0, 0, 0.6);
      box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.15);
      border-radius: 4px;
      .tip-title {
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #ffffff;
        line-height: 22px;
      }
      .tip-item {
        min-width: 158px;
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        line-height: 22px;
        &:first-child {
          font-size: 16px;
          font-weight: 500;
          line-height: 22px;
        }
      }
    }
    &:hover .tip {
      display: inline-block;
    }
  }
}
</style>
