<template>
  <div class="permission-wrapper block">
    <div class="main-title">用户管理</div>
    <div class="permission-content">
      <OrgTree class="left-module" @deauthorize="handleDeauth" />
      <UserList class="right-module" @deauthorize="handleDeauth" />
    </div>
  </div>
</template>
<script>
import { getRoleList, postUnAuth } from "@/api/user";
import { mapMutations } from "vuex";

export default {
  inject: ["reload"],
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
  },
  components: {
    OrgTree: () => import("./OrgTree"),
    UserList: () => import("./UserList"),
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
