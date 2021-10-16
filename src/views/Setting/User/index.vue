<template>
  <div class="permission-wrapper block">
    <div class="main-title">用户管理</div>
    <div class="permission-content">
      <OrgTree
        class="left-module"
        @deauthorize="handleDeauth"
        @changeArea="changeOrgArea"
      />
      <UserList
        class="right-module"
        :searchAreaId="searchAreaId"
        @deauthorize="handleDeauth"
        @modifyAuth="modifyAuth"
        @bindAuth="bindAuth"
      />
    </div>
    <AuthDialog
      :visible="authVisible"
      :data="authData"
      :edit="authEdit"
      @close="authVisible = false"
    />
  </div>
</template>
<script>
import { getRoleList, postUnAuth } from "@/api/user";
import { mapMutations } from "vuex";

export default {
  inject: ["reload"],
  data() {
    return {
      authVisible: false,
      authEdit: false,
      authData: {},

      searchAreaId: "33",
    }
  },
  mounted() {
    this.getRoleData();
  },
  methods: {
    ...mapMutations("user", ["SET_ROLE_LIST"]),
    getRoleData() {
      getRoleList().then((data) => {
        this.SET_ROLE_LIST(data || []);
      });
    },
    handleDeauth(data) {
      this.$confirm(
        "请确认是否解除该用户授权，授权解除后该用户将无法登录系统！",
        "确认要解除此用户的授权吗？",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          postUnAuth({ userId: data.userId }).then(() => {
            this.$message({
              type: "success",
              message: "解除授权成功!",
            });
            this.reload();
          });
        })
        .catch(() => {});
    },
    // 权限绑定
    bindAuth(val) {
      this.authVisible = true;
      this.authEdit = false;
      this.authData = { ...val, nickNameCn: val.userNickname };
    },
    // 修改权限
    modifyAuth(val) {
      this.authVisible = true;
      this.authEdit = true;
      this.authData = { ...val, nickNameCn: val.userNickname };
    },
    //组织树区域修改
    changeOrgArea(data) {
      this.searchAreaId = data.areaId || "33";
    },
  },
  components: {
    OrgTree: () => import("./OrgTree"),
    UserList: () => import("./UserList"),
    AuthDialog: () => import("./AuthDialog"),
  },
};
</script>
<style lang="scss" scoped>
.permission-wrapper {
  .main-title {
    font-size: 24px;
    font-weight: 500;
    color: #333;
  }

  .permission-content {
    display: flex;
    margin-top: 32px;

    .left-module,
    .right-module {
      border-radius: 8px;
      border: 1px solid #ddd;
    }

    .left-module {
      flex: 1;
      margin-right: 20px;
    }

    .right-module {
      width: 66%;
    }
  }
}
</style>
