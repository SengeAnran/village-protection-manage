<template>
  <div class="file-attach-module">
    <el-form-item :label="label" :rules="required ? rule.upload : null" :prop="verifyProp">
      <p style="color: #ff6b00" class="py-4 leading-5">
        <span style="display: block">
          <i class="el-icon-warning"></i>
          {{ desc1 || '县级需上传浙江省未来乡村创建成效自评总结及相关支持材料电子版；' }}
        </span>
        <span v-if="showDesc2" style="display: inline-block; padding-left: 10px">
          {{
            desc2 || '《浙江省未来乡村创建成效评价申请表》《浙江省未来乡村创建成效评分》由市级审核盖章后统一上传扫描件'
          }}
        </span>
      </p>
      <UploadFile2
        tip="支持格式：.doc, .docx, .pdf"
        accept=".doc,.docx,.pdf"
        :data="data"
        :limitSize="100"
        @add="addFile"
        @remove="removeFile"
      />
    </el-form-item>
  </div>
</template>
<script>
import rule from '@/mixins/rule';
export default {
  mixins: [rule],
  props: {
    desc1: String,
    desc2: String,
    showDesc2: {
      type: Boolean,
      default: true,
    },
    label: {
      type: String,
      default: '附件上传',
    },
    verifyProp: {
      type: String,
      default: 'countySaveAnnex',
    },
    data: {
      type: Array,
      default: () => [],
    },
    required: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    addFile(val) {
      this.$emit('addFile', val);
    },
    removeFile(val) {
      this.$emit('removeFile', val);
    },
  },
};
</script>
<style lang="scss" scoped>
.file-attach-module {
  ::v-deep .el-form-item__content {
    .py-4 {
      padding-top: 0 !important;
    }
  }
}
</style>
