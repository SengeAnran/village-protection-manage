<template>
  <el-table class="table" :data="data" style="width: 45%">
    <el-table-column label="序号" type="index"> </el-table-column>
    <el-table-column prop="address" label="村庄所在乡镇"> </el-table-column>
    <el-table-column prop="villageName" label="村庄名称"> </el-table-column>
    <el-table-column
      v-if="!hiddenDeclareResult"
      label="市级审核结果"
      align="center"
    >
      <template slot-scope="scope">
        <el-link v-if="scope.row.cityVerify" :underline="false" type="success"
          >通过</el-link
        >
        <el-link
          v-if="
            !scope.row.cityVerify && typeof scope.row.cityVerify === 'number'
          "
          :underline="false"
          type="danger"
          >不通过</el-link
        >
        <el-link
          v-if="
            !scope.row.cityVerify && typeof scope.row.cityVerify !== 'number'
          "
          :underline="false"
          type="warning"
          >未审核</el-link
        >
      </template>
    </el-table-column>
    <el-table-column
      v-if="!hiddenDeclareResult"
      label="省级审核结果"
      align="center"
    >
      <template slot-scope="scope">
        <el-link
          link
          v-if="scope.row.provinceVerify"
          :underline="false"
          type="success"
          >通过</el-link
        >
        <el-link
          v-if="
            !scope.row.provinceVerify &&
            typeof scope.row.provinceVerify === 'number'
          "
          :underline="false"
          type="danger"
          >不通过</el-link
        >
        <el-link
          v-if="
            !scope.row.provinceVerify &&
            typeof scope.row.provinceVerify !== 'number'
          "
          :underline="false"
          type="warning"
          >未审核</el-link
        >
      </template>
    </el-table-column>
    <el-table-column label="操作" v-if="!(hiddenEdit && hiddenDetail)">
      <template slot-scope="scope">
        <div v-if="!hiddenEdit">
          <el-link type="primary" @click="$emit('editForm', scope.row)">
            申报详情
          </el-link>
          <el-divider direction="vertical"></el-divider>
          <el-link type="danger" @click="removeItem(scope.$index, scope.row)"
            >删除</el-link
          >
        </div>
        <div v-if="!hiddenDetail">
          <el-link type="primary" @click="$emit('goDetail', scope.row)"
            >详情</el-link
          >
        </div>
      </template>
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
  methods: {
    removeItem(index) {
      this.$emit("remove", index);
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
