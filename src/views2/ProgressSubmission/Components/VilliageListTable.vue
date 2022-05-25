<template>
  <el-table class="table" :data="data" border style="width: 90%">
    <el-table-column label="序号" type="index" fixed> </el-table-column>
    <el-table-column prop="projectName" label="项目名称" width="120"> </el-table-column>
    <el-table-column prop="constructUnit" label="建设单位" width="120"> </el-table-column>
    <el-table-column prop="constructAddress" label="建设地点" width="120"> </el-table-column>
    <el-table-column prop="constructDetail" label="建设内容和规模" width="120"> </el-table-column>
    <el-table-column prop="schedule" label="进度安排" width="120"> </el-table-column>
    <el-table-column prop="landUse" label="用地情况" width="120"> </el-table-column>
    <el-table-column label="计划投资" width="250">
      <el-table-column prop="investmentAmount" label="总投资（万元）" width="80"> </el-table-column>
      <el-table-column prop="investmentAmount" label="政府投资（万元）" width="80"> </el-table-column>
      <el-table-column prop="investmentAmount" label="社会投资（万元）" width="80"> </el-table-column>
    </el-table-column>
    <el-table-column label="完成投资" width="250">
      <el-table-column prop="investmentAmount" label="总投资（万元）" width="80"> </el-table-column>
      <el-table-column prop="investmentAmount" label="其中政府投资（万元）" width="80"> </el-table-column>
      <el-table-column prop="investmentAmount" label="其中社会投资（万元）" width="80"> </el-table-column>
    </el-table-column>
    <el-table-column prop="arrangements" width="120" label="完成率"> </el-table-column>
<!--    <el-table-column v-if="!hiddenOperation" label="操作" min-width="150px">-->
<!--      <template slot-scope="scope">-->
<!--        <div>-->
<!--          <el-link-->
<!--            type="primary"-->
<!--            @click="$emit('moveUp', { data: scope.row, index: scope.$index })"-->
<!--          >上移</el-link-->
<!--          >-->
<!--          <el-divider direction="vertical"></el-divider>-->
<!--          <el-link-->
<!--            type="primary"-->
<!--            @click="$emit('moveDown', { data: scope.row, index: scope.$index });"-->
<!--          >下移</el-link-->
<!--          >-->
<!--          <el-divider direction="vertical"></el-divider>-->
<!--          <el-link-->
<!--            type="primary"-->
<!--            @click="$emit('editForm', { data: scope.row, index: scope.$index })"-->
<!--          >-->
<!--            编辑-->
<!--          </el-link>-->
<!--          <el-divider direction="vertical"></el-divider>-->
<!--          <el-link type="danger" @click="removeItem(scope.$index, scope.row)"-->
<!--            >删除</el-link-->
<!--          >-->
<!--        </div>-->
<!--      </template>-->
<!--    </el-table-column>-->
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
  display: block !important;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.05);
  ::v-deep tr th {
    background-color: #f3f3f3;
    color: #222;
  }
}
</style>
