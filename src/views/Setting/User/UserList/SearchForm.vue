<template>
  <div class="search-form">
    <div class="search-item">
      <span>角色名称：</span>
      <el-select v-model="form.roleId" placeholder="请选择">
        <el-option
          v-for="item in roleList"
          :key="item.value"
          :label="item.roleName"
          :value="item.roleId"
        >
        </el-option>
      </el-select>
    </div>
    <div class="search-item">
      <span>用户名：</span>
      <el-input v-model="form.userNickname" placeholder="请输入"></el-input>
    </div>
    <div class="button-group">
      <el-button @click="resetForm">重置</el-button>
      <el-button type="primary" @click="submitForm">查询</el-button>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      form: {},
    };
  },
  computed: {
    ...mapState("user", ["roleList"]),
  },
  methods: {
    submitForm() {
      this.$emit("search", this.form);
    },
    resetForm() {
      this.form = {};
      this.$emit("search", this.form);
    },
  },
};
</script>
<style lang="scss" scoped>
.search-form {
  display: flex;
  width: 100%;
  margin: 20px 0;

  .search-item {
    display: flex;
    align-items: center;
    margin-right: 20px;

    ::v-deep .el-select,
    ::v-deep .el-input {
      width: 160px;
    }
  }
}
</style>
