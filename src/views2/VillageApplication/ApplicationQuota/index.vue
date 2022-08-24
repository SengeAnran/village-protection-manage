<template>
  <div class="bolck">
    <span class="text-lg mb-4">
      {{ $route.meta.title }}
    </span>
    <div>
      <template>
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
      </template>
    </div>
    <el-dialog :title="title" label-position="top" :visible.sync="dialogFormVisible" width="30%">
      <el-form ref="form">
        <el-form-item label="地区">{{ city }}</el-form-item>
        <div v-for="(item, index) in detailList" :key="item.batch">
          <el-form-item :label="`第${index + 1}批申报名额配置:`"> </el-form-item>
          <el-form-item>
            <el-col :span="10">
              <el-form-item>
                <el-input
                  :disabled="disabled"
                  placeholder="请输入最低名额"
                  type="number"
                  v-model.number="item.minimumQuota"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2"> ---- </el-col>

            <el-col :span="10">
              <el-form-item>
                <el-input
                  :disabled="disabled"
                  placeholder="请输入最高名额"
                  type="number"
                  v-model.number="item.highestQuota"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item :label="`第${index + 1}批验收名额配置:`"> </el-form-item>
          <el-form-item>
            <el-col :span="10">
              <el-form-item>
                <el-input
                  :disabled="disabled"
                  placeholder="请输入最低名额"
                  type="number"
                  v-model.number="detailList1[index].minimumQuota"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2"> ---- </el-col>

            <el-col :span="10">
              <el-form-item :rules="[{ type: 'number', message: '最高名额必须为数字值' }]">
                <el-input
                  :disabled="disabled"
                  placeholder="请输入最高名额"
                  type="number"
                  v-model.number="detailList1[index].highestQuota"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveItem">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getQuotaList, getdetail, getadd } from '@/api2/applicationQuota';
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
      detailList1: [],
      disabled: false,
      title: '编辑',
    };
  },
  mounted() {
    this.getQuotaListData();
  },
  methods: {
    /**
     * 获取配置名额列表
     * @param {getQuotaList} item
     */
    getQuotaListData() {
      getQuotaList(this.list).then((res) => {
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
      getdetail(item.city).then((res) => {
        console.log(res);
        this.detailList = res.filter((res) => {
          res.city = item.city;
          return res.type == '0';
        });
        this.detailList1 = res.filter((res) => {
          res.city = item.city;
          return res.type == '1';
        });
        this.dialogFormVisible = true;
      });
    },
    /**
     * 编辑确认按钮
     */
    saveItem() {
      const list = [...this.detailList, ...this.detailList1];
      getadd(list).then((res) => {
        this.$notify({
          title: '成功',
          type: 'success',
        });
        console.log(res);
        this.dialogFormVisible = false;
      });
    },
    /**
     * 详情按钮
     *
     */
    detaliClick(item) {
      getdetail(item.city).then((res) => {
        console.log(res);
        this.detailList = res.filter((res) => {
          res.city = item.city;
          return res.type == '0';
        });
        this.detailList1 = res.filter((res) => {
          res.city = item.city;
          return res.type == '1';
        });
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
.bolck {
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 8px;
  background-color: #fff;
  position: relative;
}

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

.mb-4 {
  display: block;
  margin-bottom: 1rem !important;
}
</style>
