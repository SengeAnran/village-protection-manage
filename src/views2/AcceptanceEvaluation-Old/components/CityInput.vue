<template>
  <div class="city-input-module">
    <sub-tit> 设区市比选意见 </sub-tit>
    <div class="city-input-content">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item prop="cityVerify" label="比选意见" :rules="rule.select">
            <el-radio v-model="form.cityVerify" :label="1">通过</el-radio>
            <el-radio v-model="form.cityVerify" :label="0">驳回县级</el-radio>
          </el-form-item>
        </el-col>
      </el-row>
      <section v-if="form.cityVerify === 1">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item prop="cityLevelRating" label="评价等次" :rules="rule.select">
              <el-radio v-model="form.cityLevelRating" :label="2">优秀</el-radio>
              <el-radio v-model="form.cityLevelRating" :label="1">良好</el-radio>
              <el-radio v-model="form.cityLevelRating" :label="0">合格</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item prop="cityAcceptTime" label="审核比选时间" :rules="rule.select">
              <!--              <el-select v-model="form.cityAcceptTime" disabled placeholder="请选择">-->
              <!--                <el-option v-for="item in timeOptions" :key="item.value" :label="item.label" :value="item.value">-->
              <!--                </el-option>-->
              <!--              </el-select>-->
              <el-input style="width: 200px" v-model="form.cityAcceptTime" disabled placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="本次审核比选排名">
              <el-input style="width: 180px" disabled v-model="form.cityRanking" placeholder="-"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="附件上传" prop="citySaveAnnex" :rules="fileUpload">
              <UploadFile23
                tip="支持格式：.doc, .docx, .pdf"
                accept=".doc,.docx,.pdf"
                :limitSize="100"
                v-model="form.citySaveAnnex"
              />
              <p style="width: 100%; color: #ff6b00" class="py-4 leading-5">
                <i class="el-icon-warning"></i>请上传《未来乡村创建成效评价申请表》盖章扫描件
              </p>
            </el-form-item>
          </el-col>
        </el-row>

        <!--        <file-attach-->
        <!--          desc1="请上传《未来乡村创建成效评价申请表》盖章扫描件"-->
        <!--          verifyProp="citySaveAnnex"-->
        <!--          :data="form.citySaveAnnex"-->
        <!--          @addFile="onFileAdd"-->
        <!--          @removeFile="onFileRemove"-->
        <!--        ></file-attach>-->
      </section>
      <section v-if="form.cityVerify === 0">
        <el-form-item label="驳回说明" prop="cityOpinion" :rules="rule.input">
          <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入"
            maxlength="800"
            show-word-limit
            v-model="form.cityOpinion"
          />
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
// import { getAllSetList } from '@/api2/acceptanceTime';
const fileUp = (rule, value, callback) => {
  if (!value.fileId) {
    return callback(new Error('请上传'));
  }
  callback();
};
export default {
  name: 'CityInput',
  mixins: [rule],
  components: { SubTit },
  props: {
    form: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      // timeOptions: [],
      fileUpload: { required: true, validator: fileUp, trigger: 'change' },
    };
  },
  watch: {
    // 'form.cityLevelRating'() {
    //   this.$emit('evaluateChange'); // 触发排名变动
    // },
    'form.cityAcceptTime'() {
      this.$emit('evaluateChange'); // 触发排名变动
    },
    'form.cityVerify'(val) {
      if (val) {
        this.form.cityOpinion = '';
      } else {
        this.form.cityLevelRating = undefined;
        this.form.citySaveAnnex = {};
      }
    },
  },
  mounted() {
    // this.setAcceptTimeOpt();
  },
  methods: {
    // // 县级附件上传
    // onFileAdd(file) {
    //   this.form['citySaveAnnex'].push(file);
    // },
    // onFileRemove(file) {
    //   const index = this.form['citySaveAnnex'].findIndex((item) => {
    //     return item.uid === file.uid || item.filePath === file.url;
    //   });
    //   if (index !== -1) {
    //     this.form['citySaveAnnex'].splice(index, 1);
    //   }
    // },
    // setAcceptTimeOpt() {
    //   getAllSetList().then((res) => {
    //     this.timeOptions = res.map((c) => {
    //       const v = c.acceptanceTimeStart + ' 至 ' + c.acceptanceTimeEnd;
    //       return { label: v, value: c.id };
    //     });
    //   });
    // },
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
