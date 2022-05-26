<template>
  <div class="input-module">
    <sub-tit> 省级复核 </sub-tit>
    <div class="input-content">
      <el-row :gutter="20">
        <el-form-item prop="provinceVerify" label="复核意见" :rules="rule.select">
          <el-radio v-model="form.provinceVerify" :label="1">通过</el-radio>
          <el-radio v-model="form.provinceVerify" :label="0">驳回市级重填</el-radio>
        </el-form-item>
      </el-row>
      <section v-if="!form.provinceVerify">
        <el-form-item label="驳回说明" prop="provinceOpinion" :rules="rule.input">
          <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入"
            maxlength="800"
            show-word-limit
            v-model="form.provinceOpinion"
          />
        </el-form-item>
      </section>
    </div>
  </div>
</template>
<script>
import rule from '@/mixins/rule';

import SubTit from '../components/SubTit.vue';

export default {
  name: 'ProvinceInput',
  mixins: [rule],
  components: { SubTit },
  props: {
    form: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
<style lang="scss" scoped>
.input-module {
  .input-content {
    padding: 20px 40px;
  }
}
</style>
