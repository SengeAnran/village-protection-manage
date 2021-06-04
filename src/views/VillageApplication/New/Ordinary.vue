<template>
  <div>
    <div v-if="$route.name === 'newOrdinaryApplication'">
      <el-form
        class="form"
        label-position="top"
        ref="form"
        :model="form"
        label-width="80px"
      >
        <h3 class="text-gray-800 text-2xl mb-8">一般村申报</h3>
        <el-form-item label="申报年度">
          <el-date-picker
            v-model="form.declareYear"
            type="year"
            placeholder="请选择年度"
            class="input"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="村庄名单：">
          <el-table class="table" :data="tableData" style="width: 45%">
            <el-table-column label="序号" type="index"> </el-table-column>
            <el-table-column prop="name" label="村庄所在乡镇">
            </el-table-column>
            <el-table-column prop="address" label="村庄名称"> </el-table-column>
            <el-table-column label="操作">
              <el-link type="primary">申报详情</el-link>
              <el-divider direction="vertical"></el-divider>
              <el-link type="danger">删除</el-link>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-button
          class="add-wrp"
          plain
          size="small"
          @click="$router.push({ name: 'newOrdinaryApplicationForm' })"
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
export default {
  data() {
    return {
      form: {
        declareYear: "",
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
.input {
  width: 315px;
}
.table {
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.05);
  ::v-deep tr th {
    background-color: #f3f3f3;
    color: #222;
  }
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
