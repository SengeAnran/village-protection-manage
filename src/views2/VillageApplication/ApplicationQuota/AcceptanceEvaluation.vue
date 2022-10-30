<template>
  <div>
    <el-table
      class="table"
      :header-row-style="{
        fontSize: '14px',
        fontFamily: 'PingFangSC-Medium, PingFang SC',
        fontWeight: 500,
        color: ' #333333',
        lineHeight: '22px',
      }"
      v-loading="loading"
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column type="index" width="50" label="序号"> </el-table-column>
      <el-table-column prop="city" label="地区" width="180"> </el-table-column>
      <el-table-column prop="gmtModified" label="编辑时间"> </el-table-column>
      <el-table-column align="center">
        <template slot="header"> 操作 </template>
        <template slot-scope="scope">
          <el-link size="mini" type="primary" @click="editClick(scope.row)">编辑 &nbsp;&nbsp;</el-link>
          <el-link size="mini" type="danger" @click="detaliClick(scope.row)">详情</el-link>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="title" label-position="top" center :visible.sync="dialogFormVisible" width="600px">
      <el-form label-position="right" label-width="100px" ref="form">
        <el-form-item :label="`地区: ${city}`"></el-form-item>
        <!--        <div >-->
        <span v-for="item in detailList" :key="item.id">
          <el-form-item label="验收时间段:"> {{ item.acceptance || '--' }} </el-form-item>
          <el-form-item :label="`验收申报名额:`">
            <el-input
              :disabled="disabled"
              placeholder="请输入最低名额"
              type="number"
              v-model.number="item.minimumQuota"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item :label="`验收固定基数:`">
            <el-input
              :disabled="disabled"
              placeholder="请输入"
              type="number"
              v-model.number="item.fixedBase"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </span>

        <!--        </div>-->
      </el-form>
      <div v-if="!disabled" slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveItem">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getCreateDeclarationList, getCreateDeclarationDetail, getCreateDeclarationAdd } from '@/api2/applicationQuota';
export default {
  data() {
    return {
      tableData: [],
      dialogFormVisible: false,
      loading: true,
      city: '',
      list: {
        pageNum: 1,
        pageSize: 20,
      },
      detailList: [],
      disabled: false,
      title: '编辑',
    };
  },
  mounted() {
    this.getCreateDeclarationListData();
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    /**
     * 获取配置名额列表
     * @param {getCreateDeclarationList} item
     */
    getCreateDeclarationListData() {
      getCreateDeclarationList(this.list).then((res) => {
        this.tableData = res?.content;
        this.loading = false;
        console.log(res);
      });
    },
    /**
     * 编辑按钮
     * @param {*} item
     */
    editClick(item) {
      this.title = '编辑';
      this.disabled = false;
      this.city = item.city;
      getCreateDeclarationDetail(item.city).then((res) => {
        console.log(res);
        this.detailList = res;
        this.dialogFormVisible = true;
      });
    },
    /**
     * 编辑确认按钮
     */
    saveItem() {
      const list = [...this.detailList];
      getCreateDeclarationAdd(list).then(() => {
        this.$notify({
          title: '编辑成功',
          type: 'success',
        });
        this.getCreateDeclarationListData();
        this.dialogFormVisible = false;
      });
    },
    /**
     * 详情按钮
     *
     */
    detaliClick(item) {
      getCreateDeclarationDetail(item.city).then((res) => {
        console.log(res);
        this.detailList = res;
      });
      this.dialogFormVisible = true;
      this.title = '详情';
      this.disabled = true;
      this.city = item.city;
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

.table-action {
  > * {
    margin: 0 4px;
  }
}
.el-form {
  width: max-content;
  margin-left: auto;
  margin-right: auto;
}
.el-form-item {
  width: max-content;
}
.el-input {
  width: 300px;
}
.mb-4 {
  display: block;
  margin-bottom: 1rem !important;
}
</style>
