<template>
  <div class="city-info-module">
    <sub-tit> 设区市比选意见 </sub-tit>
    <section class="info-content">
      <el-row>
        <el-form-item label="评价等次"> 123123 </el-form-item>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="验收时间"> 12313123123 </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="本次验收全市排名"> 123123123 </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="附件">
        <view-file></view-file>
      </el-form-item>
    </section>
    <section class="info-content">
      <el-form-item label="驳回说明"> 131231232 </el-form-item>
    </section>
  </div>
</template>
<script>
import SubTit from '../components/SubTit.vue';
import ViewFile from './ViewFile.vue';

export default {
  components: { ViewFile, SubTit },
  props: {
    form: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
<style lang="scss" scoped>
.city-info-module {
  padding: 0 20px;
  .info-content {
    padding: 20px;
  }
}
</style>
