<template>
  <el-dialog
    :title="title"
    :visible="visible"
    width="40%"
    @close="
      resetForm();
      $emit('close');
    "
  >
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="auth-ruleForm"
    >
      <!-- 用户名 -->
      <el-form-item label="用户名" prop="nickNameCn">
        <el-input v-model="ruleForm.nickNameCn" readonly disabled></el-input>
      </el-form-item>
      <!-- 角色名称 -->
      <el-form-item label="角色名称" prop="roleId">
        <el-select
          v-model="ruleForm.roleId"
          placeholder="请选择所属区域 (市/县)"
          @change="handleRoleIdchange"
        >
          <el-option
            v-for="item in roleList"
            :key="item.value"
            :label="item.roleName"
            :value="item.roleId"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <!-- 所属区域 -->
      <el-form-item label="所属区域" prop="areaId">
        <el-cascader
          :key="cascaderKeyId"
          :class="{ darkColor: cascaderStyle }"
          v-model="ruleForm.areaId"
          :props="props"
          :placeholder="placeAreaName"
          @change="handleAreaIdChange"
        ></el-cascader>
      </el-form-item>
    </el-form>

    <!-- actions -->
    <span slot="footer" class="dialog-footer">
      <el-button
        @click="
          resetForm();
          $emit('close');
        "
      >
        取 消
      </el-button>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { mapState } from "vuex";
import { getAreaListById, postAuth, editUser } from "@/api/user";

const FORM_RULE = {
  name: [{ required: true, message: "请输入", trigger: "blur" }],
  roleId: [{ required: true, message: "请选择", trigger: "change" }],
  areaId: [{ required: true, message: "请选择", trigger: "change" }],
};

export default {
  name: "AuthDialog",
  inject: ["reload"],
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default: () => ({}),
    },
    edit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      ruleForm: {},
      rules: FORM_RULE,
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
          // if (node.isDisabled) {
          //   return resolve([]);
          // }
          this.getAreaData(node.data.areaId).then((data) => {
            setTimeout(() => {
              resolve(data);
            }, 150);
          });
        },
      },
      cascaderKeyId: 0, // 用于清空级联选择器缓存

      placeAreaName: "请选择", // 数据回填，展示当前列表数据
      cascaderStyle: false, //placeholder 样式
    };
  },

  watch: {
    data() {
      this.ruleForm = this.data;
    },
    visible(val) {
      if (val && this.data && this.data.areaId) {
        const { areaName } = this.data;
        this.setCascaderValue(areaName);
      }
    },
  },
  computed: {
    ...mapState("user", ["roleList"]),
    title() {
      return (this.edit && "修改权限") || "授权";
    },
  },
  methods: {
    getAreaData(areaId = undefined) {
      return getAreaListById({ areaId }).then((data) => {
        const roleId = this.ruleForm.roleId || 0;
        const level = (data.length && data[0].level) || 0;
        const disabled = this.checkAreaAuth(roleId, level);

        return (data || []).map((item) => ({
          ...item,
          disabled,
          leaf: +item.level === 5 || disabled ? true : false,
        }));
      });
    },
    handleSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (this.ruleForm.areaId.length === 8) {
            this.$message.warning("用户所属区域请选择至 市/县");
            return;
          }
          if (!this.edit) this.handleAuth();
          else this.modifyAuth();
        } else {
          return false;
        }
      });
    },
    // 授权
    handleAuth() {
      const { areaId, roleId } = this.ruleForm;
      postAuth({ areaId, roleId, userId: this.data.userId }).then(() => {
        this.$message({
          type: "success",
          message: "授权成功!",
        });
        this.$emit("close");
        this.reload();
      });
    },
    //修改权限
    modifyAuth() {
      const params = {
        areaId: this.ruleForm.areaId,
        roleId: this.ruleForm.roleId,
        userId: this.data.userId,
      };
      console.log(params);
      editUser(params).then(() => {
        this.$message({
          type: "success",
          message: "修改成功!",
        });
        this.$emit("close");
        this.reload();
      });
    },

    // 修改角色权限
    handleRoleIdchange(val) {
      this.cascaderKeyId++;
      this.ruleForm.areaId = "";
      this.ruleForm.areaName = "";
      this.clearCascaderValue();
      // console.log(val)
      if (val === 31 || val > 100) {
        this.ruleForm.areaId = "33";
        this.ruleForm.areaName = "浙江省";
        this.setCascaderValue("浙江省");
      }
    },

    // 级联选择
    handleAreaIdChange() {
      // this.setRoleId(val);
    },
    resetForm() {
      if (!this.$refs.ruleForm) {
        return;
      }
      this.ruleForm = {};
      this.clearCascaderValue();
      this.$refs.ruleForm.resetFields();
    },

    /**
     * @desc  根据区域id赋值角色
     */
    setRoleId(areaId) {
      if (!areaId || areaId.length === 8) {
        this.ruleForm.roleId = "";
      } else if (areaId.length === 10) {
        this.ruleForm.roleId = 4;
      } else {
        this.ruleForm.roleId = areaId.length / 2;
      }
    },

    /**
     * @desc 判断角色的区域权限
     * @param {String} roleId 角色 31,32,33,34, 310, 311  省市县村
     * @param {String} roleId 角色 1,2,3,4  省市县村
     * @param {Number} level 级联层级  2,3,4,5  市县镇村
     */
    checkAreaAuth(roleId, level) {
      if (roleId <= 33) {
        return !((roleId + 1) % 10 > level);
      } else if (roleId > 300) {
        return true;
      }
      return false;
    },

    clearCascaderValue() {
      this.placeAreaName = "请选择";
      this.cascaderStyle = false;
    },
    setCascaderValue(val) {
      this.placeAreaName = val;
      this.cascaderStyle = true;
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
  .darkColor {
    ::v-deep .el-input {
      input:-moz-placeholder,
      textarea:-moz-placeholder {
        color: #606266;
      }
      input:-ms-input-placeholder,
      textarea:-ms-input-placeholder {
        color: #606266;
      }
      input::-webkit-input-placeholder,
      textarea::-webkit-input-placeholder {
        color: #606266;
      }
    }
  }
}
</style>
