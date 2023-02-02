<template>
  <el-dialog
    :visible.sync="dialog"
    width="600"
    title="预警详情"
    :modal-append-to-body="false"
    :modal="false"
    @close="$emit('closeView')"
  >
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="本月未报送" name="first"> </el-tab-pane>
      <el-tab-pane label="本月报送超时" name="second"></el-tab-pane>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="地市" width="180"> </el-table-column>
        <el-table-column prop="name" label="区县" width="180"> </el-table-column>
        <el-table-column prop="address" label="村庄"> </el-table-column>
      </el-table>
    </el-tabs>
  </el-dialog>
</template>

<script>
export default {
  name: 'EarlyWarnDetail',
  props: {
    dialog: {
      type: Boolean,
    },
  },
  data() {
    return {
      activeName: 'first',
    };
  },
  methods: {
    handleClick(val) {
      console.log(val);
    },
  },
};
</script>

<style scoped></style>
