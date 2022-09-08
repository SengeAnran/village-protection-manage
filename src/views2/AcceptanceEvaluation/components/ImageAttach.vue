<template>
  <div class="file-attach-module">
    <el-form-item :label="label" :rules="required ? rule.upload : null" :prop="verifyProp">
      <p style="color: #ff6b00" class="py-4 leading-5" v-if="tip">
        <span style="display: block">
          <i class="el-icon-warning"></i>
          {{ tip }}
        </span>
      </p>
      <UploadVideo2 v-if="isVideo" :data="data" :limit="limit" :size="size" :multiple="multiple" @add="addFile" @remove="removeFile" />
      <UploadImg2 v-else :data="data" :limit="limit" :size="size" :multiple="multiple" @add="addFile" @remove="removeFile" />
    </el-form-item>
  </div>
</template>
<script>
import rule from '@/mixins/rule';
export default {
  mixins: [rule],
  props: {
    isVideo: {
      type: Boolean,
      default: false,
    },
    label: {
      type:String,
      default: '',
    },
    tip: String,
    limit: {
      type: Number,
      default: 6,
    },
    size: {
      type: Number,
      default: 10,
    },
    multiple: {
      type: Boolean,
      default: true,
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
