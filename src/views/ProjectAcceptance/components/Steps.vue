<template>
  <div class="steps-wrp">
    <StepItem isHead title="县级验收" :status="xianji_status" />
    <StepItem title="市级复核" :status="shiji_status" />
    <StepItem title="省级评价" :status="shengji_status" />
  </div>
</template>
<script>
// 验收状态 待县级填报: 2000 待市级审核：2001 市级审核驳回:2002 省级审核驳回: 2003 市级审核通过 待省级审核:2004 验收通过:2999
import StepItem from "./StepItem.vue";
export default {
  name: "Steps",
  components: { StepItem },
  props: {
    status: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    xianji_status() {
      if (this.status > 2000) {
        return "success";
      }
      return "";
    },
    shiji_status() {
      if (!this.status || this.status === 2001 || this.status === 2000) {
        return "";
      } else if (this.status === 2002) {
        return "error";
      }
      return "success";
    },
    shengji_status() {
      if (this.status === 2999) {
        return "success";
      } else if (this.status === 2003) {
        return "error";
      }
      return "";
    },
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.steps-wrp {
  display: flex;
  justify-content: center;
}
</style>
