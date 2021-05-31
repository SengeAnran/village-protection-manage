<template>
  <el-dialog title="授权" :visible="visible" width="40%">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="auth-ruleForm"
    >
      <el-form-item label="用户名" prop="nickNameCn">
        <el-input v-model="ruleForm.nickNameCn" readonly disabled></el-input>
      </el-form-item>
      <el-form-item label="角色名称" prop="roleId">
        <el-select v-model="ruleForm.roleId" placeholder="请选择">
          <el-option
            v-for="item in roleList"
            :key="item.value"
            :label="item.roleName"
            :value="item.roleId"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属区域" prop="areaId">
        <el-cascader v-model="ruleForm.areaId" :props="props"></el-cascader>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button
        @click="
          resetForm();
          $emit('close');
        "
        >取 消</el-button
      >
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { area_list } from "./mock_data.js";
import { mapState } from "vuex";
import { getAreaListById, postAuth } from "@/api/user";

export default {
  name: "AuthDialog",
  inject: ["reload"],
  data() {
    return {
      ruleForm: {},
      rules: {
        name: [{ required: true, message: "请输入", trigger: "blur" }],
        roleId: [{ required: true, message: "请选择", trigger: "change" }],
        area: [{ required: true, message: "请选择", trigger: "change" }],
      },
      areaList: area_list,
      props: {
        label: "areaName",
        value: "areaId",
        emitPath: false,
        checkStrictly: true,
        lazy: true,
        lazyLoad: async (node, resolve) => {
          const { level } = node;
          if (level === 0) {
            return resolve(await this.getAreaData());
          }
          this.getAreaData(node.data.areaId).then((data) => {
            setTimeout(() => {
              resolve(data);
            }, 500);
          });
          // setTimeout(() => {
          //   const nodes = Array.from({ length: level + 1 }).map((item) => ({
          //     value: ++id,
          //     label: `选项${id}`,
          //     leaf: level >= 2,
          //   }));
          //   // 通过调用resolve将子节点数据返回，通知组件数据加载完成
          //   resolve(nodes);
          // }, 1000);
        },
      },
    };
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  watch: {
    data() {
      this.ruleForm = this.data;
    },
  },
  computed: {
    ...mapState("user", ["roleList"]),
  },
  methods: {
    getAreaData(areaId = undefined) {
      return getAreaListById({ areaId }).then((data) => {
        return (data || []).map((item) => ({
          ...item,
          leaf: +item.level === 5 ? true : false,
        }));
      });
    },
    handleSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.handleAuth();
        } else {
          return false;
        }
      });
    },
    // 授权
    handleAuth() {
      const { areaId, employeeCode, roleId } = this.ruleForm;
      postAuth({ areaId, employeeCode, roleId }).then(() => {
        this.$message({
          type: "success",
          message: "授权成功!",
        });
        this.$emit("close");
        this.reload();
      });
    },
    resetForm() {
      if (!this.$refs.ruleForm) {
        return;
      }
      this.ruleForm = {};
      this.$refs.ruleForm.resetFields();
    },
  },
};
</script>
<style lang="scss" scoped>
.auth-ruleForm {
  ::v-deep .el-cascader,
  ::v-deep .el-select {
    width: 100%;
  }
}
</style>
