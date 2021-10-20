<template>
  <div class="block">
    <transition name="fade-transform" mode="out-in">
      <div v-if="!showForm" key="list">
        <RouterBack>重点村申报</RouterBack>
        <el-form
          style="padding-left: 14px"
          class="form"
          label-position="top"
          ref="form"
          :model="form"
          label-width="80px"
        >
          <el-form-item label="申报年度" prop="declareYear" :rules="rule.input">
            <el-date-picker
              v-model="form.declareYear"
              type="year"
              placeholder="请选择年度"
              class="input"
              value-format="yyyy"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="村庄名单：" prop="detail" :rules="listRules">
            <VilliageListTable
              :data="form.detail"
              :hiddenEdit="false"
              :hiddenDetail="true"
              @remove="removeListItem"
              @editForm="editListItem"
            />
          </el-form-item>
          <el-button
            class="add-wrp"
            plain
            size="small"
            @click="
              editId = 0;
              editData = {};
              editType = 'add';
              showForm = true;
            "
          >
            <i class="el-icon-plus"></i>
          </el-button>
        </el-form>
        <div>
          <el-button @click="onCancel"
            >取消</el-button
          >
          <el-button type="primary" @click="validateForm">提交</el-button>
        </div>
      </div>

      <Major
        key="addItem"
        v-if="showForm"
        :type="editType"
        :data="editData"
        @add="addListItem"
        @close="showForm = false"
      />
    </transition>
  </div>
</template>
<script>
import rule from "@/mixins/rule";
import VilliageListTable from "../Components/VilliageListTable";
import { VILLAGE_LIST_ROUTER_NAME } from "../constants";
import {
  villageDeclaration,
  getVillageDetail,
  updateVillageItem,
} from "@/api/villageManage";

import Major from "../NewForm/Major";

const declareType = 1002; // 重点村

const tableList = (rule, value, callback) => {
  if (value.length) {
    callback();
  } else {
    callback(new Error("请添加村庄"));
  }
};

export default {
  mixins: [rule],
  components: { VilliageListTable, Major },
  data() {
    return {
      routeName: VILLAGE_LIST_ROUTER_NAME[1002],

      id: "",
      form: {
        declareYear: "",
        detail: [],
      },

      editType: "add",
      editIndex: 0,
      editData: {},

      showForm: false,

      listRules: { required: true, validator: tableList, trigger: "blur" },

      pickerOptions: {
        disabledDate(date) {
          return date.getFullYear() > new Date().getFullYear();
        },
      },
    };
  },

  created() {
    const { id, declareYear } = this.$route.query;
    if (id && declareYear) {
      this.id = id;
      this.form.declareYear = String(declareYear);
      this.init();
    }
  },
  methods: {
    init() {
      getVillageDetail({ id: this.id }).then((res) => {
        this.form.detail = res || [];
      });
    },
    validateForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.$myConfirm({
            content: "是否确认提交",
          }).then(() => {
            this.submit();
          });
        } else {
          return false;
        }
      });
    },

    addListItem(params) {
      if (this.editType === "add") {
        this.form.detail.push(params);
        this.showForm = false;
      } else if (this.editType === "edit") {
        this.form.detail.splice(this.editIndex, 1, params);
        this.showForm = false;
      }
    },

    removeListItem(index) {
      this.form.detail.splice(index, 1);
    },

    editListItem({ data, index }) {
      this.editType = "edit";
      this.editIndex = index;
      this.editData = data;
      this.showForm = true;
    },
    onCancel() {
      if (this.form.detail && this.form.detail.length !== 0) {
        this.$myConfirm({
          content: "村庄信息已修改，确认取消?",
        }).then(() => {
          this.$router.push({ name: "VillageApplyList" });
        })
      } else {
        this.$router.push({ name: "VillageApplyList" });
      }
    },
    submit() {
      const params = {
        declareType,
        declareYear: Number(this.form.declareYear),
        detail: this.form.detail,
      };
      if (this.id) {
        params.id = this.id;
        updateVillageItem(params).then(() => {
          this.$notify.success("修改成功");
          this.$router.replace({ name: "VillageApplyList" });
        });
      } else {
        villageDeclaration(params).then(() => {
          this.$notify.success("申报成功");
          this.$router.replace({ name: "VillageApplyList" });
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.input {
  width: 315px;
}
.add-wrp {
  width: 45%;
  margin-bottom: 150px;
  .el-icon-plus {
    font-size: 16px;
  }
}

.form {
  ::v-deep .el-form-item__label {
    font-size: 16px;
    color: #666666;
  }
}
</style>
