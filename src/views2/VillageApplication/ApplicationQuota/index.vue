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
          <el-table-column prop="date" label="序号" width="180"> </el-table-column>
          <el-table-column prop="name" label="地区" width="180"> </el-table-column>
          <el-table-column prop="address" label="编辑时间"> </el-table-column>
          <el-table-column align="center">
            <template slot="header"> 操作 </template>
            <template slot-scope="scope">
              <el-link size="mini" type="primary" @click="editClick(scope)">编辑 &nbsp;&nbsp;</el-link>
              <el-link size="mini" type="danger" @click="deleteClick(scope)">删除</el-link>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <el-dialog title="编辑" label-position="top" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="form">
        <el-form-item label="地区">杭州市</el-form-item>
        <el-form-item label="第一批申报名额配置:"> </el-form-item>
        <el-form-item>
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-input
                v-model="form.name"
                placeholder="请输入最低名额"
                autocomplete="off"
                style="width: 140px"
              ></el-input>
            </el-form-item>
          </el-col>
          ----
          <el-col :span="11">
            <el-form-item>
              <el-input
                v-model="form.name1"
                placeholder="请输入最高名额"
                autocomplete="off"
                style="width: 140px"
              ></el-input> </el-form-item
          ></el-col>
        </el-form-item>
        <el-form-item label="第一批验收名额配置:"> </el-form-item>
        <el-form-item>
          <el-input
            v-model="form.name2"
            placeholder="请输入最低名额"
            autocomplete="off"
            style="width: 140px"
          ></el-input>
          ----
          <el-input
            v-model="form.name3"
            placeholder="请输入最高名额"
            autocomplete="off"
            style="width: 140px"
          ></el-input>
        </el-form-item>

        <el-form-item label="第二批申报名额配置:"> </el-form-item>
        <el-form-item>
          <el-input
            v-model="form.name4"
            placeholder="请输入最低名额"
            autocomplete="off"
            style="width: 140px"
          ></el-input>
          ----
          <el-input
            v-model="form.name5"
            placeholder="请输入最高名额"
            autocomplete="off"
            style="width: 140px"
          ></el-input>
        </el-form-item>
        <el-form-item label="第二批验收名额配置:"> </el-form-item>
        <el-form-item>
          <el-input
            v-model="form.name6"
            placeholder="请输入最低名额"
            autocomplete="off"
            style="width: 140px"
          ></el-input>
          ----
          <el-input
            v-model="form.name7"
            placeholder="请输入最高名额"
            autocomplete="off"
            style="width: 140px"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
        },
      ],
      dialogFormVisible: false,
      loading: false,
      form: {
        name: '',
        name1: '',
        name2: '',
        name3: '',
        name4: '',
        name5: '',
        name6: '',
        name7: '',
      },
    };
  },
  methods: {
    editClick(item) {
      console.log(item);
      this.dialogFormVisible = true;
    },
    /**
     * 校验数字
     */
    checkVal(item) {
      alert(this.form.name);
      console.log(item);
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
