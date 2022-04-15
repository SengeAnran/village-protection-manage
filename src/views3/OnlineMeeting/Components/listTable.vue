<template>
  <el-table class="table" :data="data" style="width: 90%">
    <el-table-column label="序号" type="index"> </el-table-column>
    <el-table-column prop="voteContent" label="选项内容"> </el-table-column>
    <el-table-column label="照片">
      <template slot-scope="scope">
        <el-avatar shape="square" :size="50" :src="scope.row.votePic"></el-avatar>
<!--        <img style="width: 50px; height: 50px; object-fit: cover" :src="scope.row.picturesFiles[0]" alt="">-->
      </template>
    </el-table-column>
    <el-table-column v-if="showVoteSum" prop="voteSum" label="票数"> </el-table-column>
    <el-table-column v-if="!hiddenOperation" label="操作" min-width="150px">
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
          <el-divider v-if="!hiddenEdit" direction="vertical"></el-divider>
          <el-link
            v-if="!hiddenEdit"
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
    hiddenOperation: { // 隐藏操作栏
      type: Boolean,
      default: false,
    },
    showVoteSum: { // 展示票数
      type: Boolean,
      default: false,
    },
    hiddenEdit: {
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
