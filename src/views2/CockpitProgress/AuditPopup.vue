<template>
  <el-dialog
    class="audit-dialog"
    title="审核"
    :close-on-click-modal="false"
    :visible.sync="_visible"
    width="500px"
    top="22%"
  >
    <div class="audit-content">
      <div class="row">
        <span class="row-name">驾驶舱配置后台链接:</span>
        <span class="url" title="点击跳转" @click="goCockpitEdit(cockpitUrl)">{{ cockpitUrl }}</span>
      </div>
      <div class="row">
        <span class="row-name">审核结果:</span>
        <div class="row-option" v-if="Number(status) === 1">
          <el-radio v-model="result" label="1">通过</el-radio>
        </div>
        <div class="row-option" v-if="Number(status) === 2">
          <el-radio v-model="result" label="1">通过</el-radio>
          <el-radio v-model="result" label="0">不通过</el-radio>
        </div>
        <div class="row-option" v-if="Number(status) === 3">
          <el-radio v-model="result" label="0">上线</el-radio>
        </div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="_visible = false">取 消</el-button>
      <el-button type="primary" @click="onConfirm">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { auditProgress } from '@/api2/cockpitProgress';
import { getCockpitEditUrl } from './utils';

export default {
  props: {
    id: {
      type: Number,
      default: 0,
    },
    visible: {
      type: Boolean,
      default: false,
    },
    confirmFunc: {
      type: Function,
    },
    cockpitUrl: {
      type: String,
      default: '',
    },
    status: {
      type: [Number, String],
    },
  },
  data() {
    return {
      result: undefined,
    };
  },
  watch: {
    visible() {
      this.result = undefined;
    },
  },
  computed: {
    _visible: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit('update:visible', val);
      },
    },
  },
  methods: {
    onConfirm() {
      if (this.result === undefined) {
        this.$message.warning('请选择审核结果');
      } else {
        auditProgress({ id: this.id, status: Number(this.result) }).then(() => {
          this.$message.success('审核成功');
          this._visible = false;
          this.$emit('confirm');
        });
      }
    },
    goCockpitEdit(url) {
      window.location.href = getCockpitEditUrl(url);
    },
  },
};
</script>
<style lang="scss" scoped>
.audit-dialog {
  ::v-deep .el-dialog__body {
    padding-top: 10px;
  }
  .audit-content {
    border-top: 1px solid #ddd;
    padding-top: 20px;
    .row {
      font-size: 14px;
      padding: 8px 0;
      display: flex;
      .row-name {
        margin-right: 14px;
        color: #303133;
        width: 145px;
        text-align: right;
        white-space: nowrap;
      }
      .url {
        color: #2196f3;
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }
}
</style>
