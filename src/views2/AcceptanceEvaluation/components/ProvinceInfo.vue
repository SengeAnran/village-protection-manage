<template>
  <div class="input-module">
    <sub-tit> 省级复核 </sub-tit>
    <div class="input-content">
      <el-form-item label="复核意见">
        {{ form.provinceVerify === 0 ? '驳回市级重填' : form.provinceVerify === 1 ? '通过' : '--' }}
      </el-form-item>
      <el-form-item label="驳回说明" v-if="form.provinceVerify === 0"> {{ form.provinceOpinion }} </el-form-item>
    </div>
  </div>
</template>
<script>
import SubTit from './SubTit.vue';

export default {
  name: 'ProvinceInput',
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
  padding: 0 20px;
  .input-content {
    padding: 20px;
  }
}
</style>
