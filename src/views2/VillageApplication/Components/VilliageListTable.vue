<template>
  <el-table class="table" :data="data" style="width: 90%">
    <el-table-column label="序号" type="index"> </el-table-column>
    <el-table-column prop="address" label="项目名称"> </el-table-column>
    <el-table-column prop="address" label="建设单位"> </el-table-column>
    <el-table-column prop="address" label="建设地点"> </el-table-column>
    <el-table-column prop="address" label="建设内容和规模"> </el-table-column>
    <el-table-column prop="address" label="进度安排"> </el-table-column>
    <el-table-column prop="address" label="用地情况"> </el-table-column>
    <el-table-column prop="address" label="投资额（万元）"> </el-table-column>
    <el-table-column prop="villageName" label="运行维护管理安排"> </el-table-column>
    <el-table-column prop="villageName" label="备注"> </el-table-column>
    <el-table-column prop="villageName" label="运行维护管理安排"> </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <div>
          <el-link
            type="primary"
            @click="$emit('moveUp', { data: scope.row, index: scope.$index })"
          >上移</el-link
          >
          <el-divider direction="vertical"></el-divider>
          <el-link
            type="primary"
            @click="$emit('moveDown', { data: scope.row, index: scope.$index });"
          >下移</el-link
          >
          <el-divider direction="vertical"></el-divider>
          <el-link
            type="primary"
            @click="$emit('editForm', { data: scope.row, index: scope.$index })"
          >
            编辑
          </el-link>
          <el-divider direction="vertical"></el-divider>
          <el-link type="danger" @click="removeItem(scope.$index, scope.row)"
            >删除</el-link
          >
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import { mapGetters } from "vuex";
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
    declareYear: {
      type: Number,
      default: null,
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
  data() {
    return {
      refill: false,
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    removeItem(index) {
      this.$myConfirm({
        content: "确认删除该数据？"
      }).then(() => {
        this.$emit("remove", index);
      })
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
