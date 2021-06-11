<template>
  <div
    class="step-item"
    :class="{
      isHead: isHead,
      success: status === 'success',
      error: status === 'error',
    }"
  >
    <div class="desc">
      <p class="icon-wrp">
        <i :class="icon" class="icon"></i>
      </p>
      <p class="title">{{ title || "--" }}</p>
    </div>
    <div class="line"></div>
  </div>
</template>
<script>
export default {
  name: "StepItem",
  props: {
    isHead: Boolean,
    title: String,
    status: String,
  },
  computed: {
    icon() {
      return this.status === "success"
        ? "el-icon-success"
        : this.status === "error"
        ? "el-icon-error"
        : "el-icon-question";
    },
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.step-item {
  position: relative;
  width: 110px;
  flex-shrink: 0;
  .desc {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .icon-wrp {
      width: 30px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      .icon {
        font-size: 14px;
      }
    }
    .title {
      color: #999999;
    }
  }
  .line {
    position: absolute;
    top: 15px;
    right: 50%;
    width: 80px;
    height: 1px;
    background: #cccccc;
    border-radius: 1px;
    margin-right: 15px;
  }

  &.isHead {
    .line {
      display: none;
    }
  }
  &.success {
    .desc {
      .icon-wrp .icon {
        color: #15be50;
      }
      .title {
        color: #15be50;
      }
    }
    .line {
      background: #15be50;
    }
  }
  &.error {
    .desc {
      .icon-wrp .icon {
        color: #d40000;
      }
      .title {
        color: #d40000;
      }
    }
    .line {
      background: #d40000;
    }
  }
}
</style>
