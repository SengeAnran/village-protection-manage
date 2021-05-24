<template>
  <div class="header-wrp">
    <h2 class="title">历史文化村落保护管理系统</h2>
    <div class="right-menu">
      <Notify style="margin-right: 20px" />
      <el-dropdown
        class="avatar-container right-menu-item hover-effect"
        trigger="click"
      >
        <div class="avatar-wrapper">
          <img
            class="user-avatar"
            :src="require('@/assets/imgs/avatar.jpeg')"
          />
          <span class="user-name">管理员</span>
        </div>

        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="logout"> 退出登录 </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import Notify from "@/components/Notify";
export default {
  name: "Header",
  components: { Notify },
};
</script>
<style lang="scss" scoped>
.header-wrp {
  width: 100%;
  height: 72px;
  padding-left: 20px;
  background-color: $menuBg;
  box-shadow: 0px 1px 4px 0px #172439;
  position: fixed;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .title {
    height: 72px;
    line-height: 72px;
    font-size: 24px;
    font-family: PingFangSC-Medium, PingFang SC;
    color: #ffffff;
  }

  .right-menu {
    height: 100%;
    display: flex;
    align-items: center;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 42px;

      .avatar-wrapper {
        position: relative;
        height: 100%;
        display: flex;
        align-items: center;

        .user-avatar {
          max-width: unset;
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 100%;
          object-fit: cover;
          margin-right: 10px;
        }
        .user-name {
          font-size: 16px;
          font-family: PingFangSC-Regular, PingFang SC;
          color: #ffffff;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
