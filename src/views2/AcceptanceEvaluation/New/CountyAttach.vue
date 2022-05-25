<template>
  <div>
    <el-form-item label="附件上传" :rules="rule.upload" prop="countySaveAnnex">
      <p style="color: #ff6b00" class="py-4 leading-5">
        <span style="display: block">
          <i class="el-icon-warning"></i> 县级需上传浙江省未来乡村创建成效自评总结及相关支持材料电子版；
        </span>
        <span style="display: inline-block; padding-left: 10px">
          《浙江省未来乡村创建成效评价申请表》《浙江省未来乡村创建成效评分》由市级审核盖章后统一上传扫描件
        </span>
      </p>
      <UploadFile2
        tip="支持格式：.doc, .docx, .pdf"
        accept=".doc,.docx,.pdf"
        :data="data"
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
    data: {
      type: Array,
      default: () => [],
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
