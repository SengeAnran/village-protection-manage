<template>
  <el-dialog
    class="my-el-dialog"
    :visible="dialog"
    append-to-body
    width="600"
    title="预警详情"
    @close="$emit('closeView')"
  >
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="本月未报送" name="3"> </el-tab-pane>
      <el-tab-pane label="本月报送超时" name="4"></el-tab-pane>
      <el-table class="table1" :data="tableData" style="width: 100%" height="400">
        <el-table-column prop="city" label="地市" align="center"> </el-table-column>
        <el-table-column prop="country" label="区县" align="center"> </el-table-column>
        <el-table-column prop="villageName" label="村庄" align="center"> </el-table-column>
      </el-table>
    </el-tabs>
  </el-dialog>
</template>

<script>
import { getEarlyWarningDetail } from '@/api2/homePage';
import { mapGetters } from 'vuex';

export default {
  name: 'EarlyWarnDetail',
  props: {
    dialog: {
      type: Boolean,
    },
  },
  data() {
    return {
      activeName: '3',
      tableData: [],
    };
  },
  computed: {
    ...mapGetters(['area', 'location', 'batch']),
  },
  watch: {
    dialog(val) {
      if (val) {
        this.getData();
      }
    },
  },
  methods: {
    handleClick() {
      this.getData();
    },
    getData() {
      const data = {
        batch: this.batch,
        projectStatus: parseInt(this.activeName, 10),
        ...this.location,
      };
      getEarlyWarningDetail(data).then((res) => {
        this.tableData = res || [];
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.my-el-dialog ::v-deep .el-dialog__header {
  text-align: center;
}
.my-el-dialog ::v-deep .el-dialog__body {
  padding-top: 0;
}
.table1 ::v-deep tr th {
  background-color: rgba(0, 0, 0, 0.2);
  color: #333333;
  > .cell {
    font-weight: 500;
  }
}
</style>
