<template>
  <div class="city-input-module">
    <sub-tit> 设区市比选意见 </sub-tit>
    <div class="city-input-content">
      <el-row :gutter="20">
        <el-form-item prop="cityVerify" label="比选意见" :rules="rule.select">
          <el-radio v-model="form.cityVerify" :label="1">通过</el-radio>
          <el-radio v-model="form.cityVerify" :label="0">驳回县级</el-radio>
        </el-form-item>
      </el-row>
      <section v-if="form.cityVerify === 1">
        <el-row :gutter="20">
          <el-form-item prop="cityLevelRating" label="评价等次" :rules="rule.select">
            <el-radio v-model="form.cityLevelRating" :label="2">优秀</el-radio>
            <el-radio v-model="form.cityLevelRating" :label="1">良好</el-radio>
            <el-radio v-model="form.cityLevelRating" :label="0">合格</el-radio>
          </el-form-item>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item prop="cityAcceptTime" label="审核比选时间" :rules="rule.select">
              <el-select v-model="form.cityAcceptTime" placeholder="请选择">
                <el-option v-for="item in timeOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="本次审核比选排名">
              <el-input style="width: 180px" disabled v-model="form.cityRanking" placeholder="自动排序"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <file-attach desc1="《浙江省未来乡村创建成效评价申请表》" desc2="《浙江省未来乡村创建成效评分》市级审核盖章扫描件" verifyProp="citySaveAnnex" :data="form.citySaveAnnex" @addFile="onFileAdd" @removeFile="onFileRemove"></file-attach> -->
      </section>
      <section v-if="form.cityVerify === 0">
        <el-form-item label="驳回说明" prop="cityOpinion" :rules="rule.input">
          <el-input type="textarea" :rows="5" placeholder="请输入" maxlength="800" show-word-limit v-model="form.cityOpinion" />
        </el-form-item>
      </section>
    </div>
  </div>
</template>
<script>
import rule from '@/mixins/rule';

// import FileAttach from '../components/FileAttach.vue'; // 附件上传
import SubTit from '../components/SubTit.vue';

// import { getSetList } from '@/api2/villageManage';
import { getSetList } from '@/api2/acceptanceTime';
export default {
  name: 'CityInput',
  mixins: [rule],
  components: { SubTit },
  props: {
    form: {
      type: Object,
      default: () => { },
    },
  },
  data() {
    return {
      timeOptions: [],
    };
  },
  watch: {
    // 'form.cityLevelRating'() {
    //   this.$emit('evaluateChange'); // 触发排名变动
    // },
    'form.cityAcceptTime'() {
      this.$emit('evaluateChange'); // 触发排名变动
    },
  },
  mounted() {
    this.setAcceptTimeOpt();
  },
  methods: {
    // 县级附件上传
    onFileAdd(file) {
      this.form['citySaveAnnex'].push(file);
    },
    onFileRemove(file) {
      const index = this.form['citySaveAnnex'].findIndex((item) => {
        return item.uid === file.uid || item.filePath === file.url;
      });
      if (index !== -1) {
        this.form['citySaveAnnex'].splice(index, 1);
      }
    },

    setAcceptTimeOpt() {
      getSetList({ type: 1, pageNum: 1, pageSize: 50 }).then((res) => {
        this.timeOptions = res.content.map((c) => ({ label: c.acceptanceTime, value: c.acceptanceTime }));
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.city-input-module {
  .city-input-content {
    padding: 20px 40px;
  }
}
</style>
