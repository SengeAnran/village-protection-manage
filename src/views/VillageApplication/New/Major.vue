<template>
  <div>
    <div v-if="$route.name === routeName">
      <el-form
        class="form"
        label-position="top"
        ref="form"
        :model="form"
        label-width="80px"
      >
        <h3 class="text-gray-800 text-2xl mb-8">重点村申报</h3>
        <el-form-item label="申报年度" prop="declareYear" :rules="rule.input">
          <el-date-picker
            v-model="form.declareYear"
            type="year"
            placeholder="请选择年度"
            class="input"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="村庄名单：">
          <VilliageListTable />
        </el-form-item>
        <el-button
          class="add-wrp"
          plain
          size="small"
          @click="$router.push({ name: `${routeName}Form` })"
        >
          <i class="el-icon-plus"></i>
        </el-button>
      </el-form>
      <div>
        <el-button>取消</el-button>
        <el-button type="primary">提交</el-button>
      </div>
    </div>

    <router-view />
  </div>
</template>
<script>
import rule from "@/mixins/rule";
import VilliageListTable from "../Components/VilliageListTable";
import { VILLAGE_LIST_ROUTER_NAME } from "../constants";

export default {
  mixins: [rule],
  components: { VilliageListTable },
  data() {
    return {
      form: {
        declareYear: "",
      },

      routeName: VILLAGE_LIST_ROUTER_NAME[1002],
    };
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
