<template>
  <el-dialog class="import-dialog" title="批量导入" :visible.sync="importDialogVisible" width="504px" center>
    <UploadFile2 tip="支持格式：.xlsx" accept=".xlsx,.xlw" :data="importFiles" :upload-method="uploadMethod" returnData
      @returnData="returnDatas($event)" />
    <div style="margin: 0 auto; text-align: center">
      <el-button icon="el-icon-download" type="primary" plain @click="downLoad" style="margin: 32px 0 8px">模板下载
      </el-button>
      <div>请根据模板进行信息填写</div>
    </div>
    <span slot="footer" class="dialog-footer">
      <!-- <el-button @click="importDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="importDialogVisible = false">确 定</el-button> -->
    </span>
  </el-dialog>
</template>

<script>
import { importBatch, getTemplate } from '@/api2/villageManage';
import { downloadFile } from '@/utils/data';

export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      uploadMethod: importBatch,
      importFiles: [],
    }
  },
  computed: {
    importDialogVisible: {
      set: function (val) {
        this.$emit('input', val);
      },
      get: function () {
        return this.value;
      }
    },
  },
  watch: {
    value(next) {
      if (!next) {
        this.importFiles = [];
      }
    },
  },
  methods: {
    // 下载模版
    async downLoad() {
      const res = await getTemplate();
      downloadFile(res, '批量导入模版');
      this.$notify.success('下载成功！');
    },
    returnDatas(data) {
      console.log(data);
      this.$emit('add', data);
      this.importDialogVisible = false;
      this.importFiles = [];
    },
  }
}
</script>
