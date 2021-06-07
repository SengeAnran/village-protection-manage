<template>
  <el-table class="table" :data="data" style="width: 45%">
    <el-table-column label="序号" type="index"> </el-table-column>
    <el-table-column prop="address" label="村庄所在乡镇"> </el-table-column>
    <el-table-column prop="villageName" label="村庄名称"> </el-table-column>
    <el-table-column
      v-if="!hiddenDeclareResult"
      prop="villageName"
      label="市级审核结果"
    >
    </el-table-column>
    <el-table-column
      v-if="!hiddenDeclareResult"
      prop="villageName"
      label="省级审核结果"
    >
    </el-table-column>
    <el-table-column label="操作">
      <div v-if="!hiddenEdit">
        <el-link type="primary">申报详情</el-link>
        <el-divider direction="vertical"></el-divider>
        <el-link type="danger">删除</el-link>
      </div>
      <div v-if="!hiddenDetail"><el-link type="primary">详情</el-link></div>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    hiddenDetail: {
      type: Boolean,
      default: false,
    },
    hiddenEdit: {
      type: Boolean,
      default: true,
    },
    hiddenDeclareResult: {
      type: Boolean,
      default: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.table {
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.05);
  ::v-deep tr th {
    background-color: #f3f3f3;
    color: #222;
  }
}
</style>
