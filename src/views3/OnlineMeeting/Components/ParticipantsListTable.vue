<template>
  <el-table
    class="table"
    :data="data"
    style="width: 90%"
    max-height="300"
    @selection-change="handleSelectionChange"
  >
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
<!--    <el-table-column label="序号" type="index"> </el-table-column>-->
    <el-table-column prop="userNickname" label="姓名"> </el-table-column>
    <el-table-column prop="userPhone" label="联系方式"> </el-table-column>
    <el-table-column prop="address" label="地区"> </el-table-column>
<!--    <el-table-column label="操作" min-width="150px">-->
<!--      <template slot-scope="scope">-->
<!--        <div>-->
<!--          <el-link type="danger" @click="addItem(scope.$index, scope.row)"-->
<!--          >添加</el-link-->
<!--          >-->
<!--        </div>-->
<!--      </template>-->
<!--    </el-table-column>-->
  </el-table>
</template>
<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    selectNumber: {
      type: Number,
      default: 0,
    },
    hiddenOperation: { // 隐藏操作栏
      type: Boolean,
      default: false,
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
  },
  methods: {
    handleSelectionChange(val) {
      this.$emit("changeSelect", val);
    },
    // addItem(index) {
    //   this.$emit("add", val);
    // },
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
