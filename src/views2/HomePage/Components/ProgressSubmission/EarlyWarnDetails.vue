<template>
  <el-dialog
    class="my-el-dialog"
    :visible="dialog"
    append-to-body
    width="760px"
    height="708"
    title="预警详情"
    @close="$emit('closeView')"
  >
    <el-tabs v-model="query.codeType" @tab-click="handleClick">
      <el-tab-pane label="红码" name="红码"></el-tab-pane>
      <el-tab-pane label="黄码" name="黄码"></el-tab-pane>
      <el-tab-pane label="绿码" name="绿码"></el-tab-pane>
    </el-tabs>
    <Crud
      ref="crud"
      :get-method="getMethod"
      :query.sync="query"
      id-key="id"
      hideSearch
      :hideAdd="true"
      :hideEdit="true"
      :hideView="true"
      :hideDelete="true"
      :permission-add="0"
      :permission-edit="0"
      :permission-delete="0"
      :pager-count="5"
    >
      <template v-slot:table>
        <el-table-column label="地区" prop="villageName"></el-table-column>
        <el-table-column label="区县" prop="country" width="100"> </el-table-column>
        <el-table-column label="地市" prop="city"></el-table-column>
      </template>
      <template v-slot:tableAction="scope">
        <el-link @click="goDetail(scope)" type="primary"> 附码记录 </el-link>
      </template>
    </Crud>
  </el-dialog>
</template>

<script>
import { getalertDetails } from '@/api2/homePage';
import { mapGetters } from 'vuex';
import { REPORT_STATUS, REPORT_STATUS_COLOR, getStatusName } from '@/views2/ProgressSubmission/constants';

export default {
  name: 'EarlyWarnDetail',
  props: {
    dialog: {
      type: Boolean,
    },
    defaultType: {
      type: String,
      default: '红码',
    },
  },
  data() {
    return {
      REPORT_STATUS_COLOR,
      query: {
        batch: [],
        city: '',
        county: '',
        province: '',
        codeType: this.defaultType,
      },
      getMethod: getalertDetails,
      reportStateOPt: [],
    };
  },
  computed: {
    ...mapGetters(['area', 'location', 'batch', 'year', 'status']),
  },
  beforeMount() {
    const opts = Object.keys(REPORT_STATUS).map((ele) => {
      return {
        label: REPORT_STATUS[ele],
        value: parseInt(ele),
      };
    });
    opts.unshift({
      label: '全部',
      value: null,
    });
    this.reportStateOPt = opts;
  },
  methods: {
    handleClick() {
      this.$refs.crud.getItems();
      console.log(this.$refs.crud);
    },
    getStatusName,
    beforeGetMethod(params) {
      let query;
      query = {
        ...params,
        ...this.location,
        batch: this.batch,
        year: this.year,
        status: this.status,
      };
      return query;
    },
    goDetail(scope) {
      console.log(scope);
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
