<template>
  <div class="city-info-module">
    <sub-tit> 设区市比选意见 </sub-tit>
    <section class="info-content" v-if="form.cityVerify === 1">
      <el-row>
        <el-form-item label="审核比选等次"> {{ CITY_LEVEL_RATING[form.cityLevelRating] }} </el-form-item>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="审核比选时间"> {{ form.cityAcceptTime }} </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="本次审核比选排名"> {{ form.cityRanking || '--' }} </el-form-item>
        </el-col>
      </el-row>
      <!-- <el-form-item label="附件">
        <div v-if="form.citySaveAnnexFiles && form.citySaveAnnexFiles.length">
          <view-file v-for="(item, i) in form.citySaveAnnexFiles" :key="i" :data="item"></view-file>
        </div>
        <div v-else>--</div>
      </el-form-item> -->
    </section>
    <section class="info-content" v-else>
      <el-row>
        <el-form-item label="比选意见"> 驳回县级重填 </el-form-item>
      </el-row>
      <el-form-item label="驳回说明"> {{ form.cityOpinion || '--' }} </el-form-item>
    </section>
  </div>
</template>
<script>
import SubTit from '../components/SubTit.vue';
import ViewFile from './ViewFile.vue';

import { CITY_LEVEL_RATING } from '../constants';

export default {
  components: { ViewFile, SubTit },
  props: {
    form: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return { CITY_LEVEL_RATING };
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
