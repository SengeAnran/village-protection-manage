<template>
  <div>
    <el-form ref="form" :model="form" label-width="100px" label-position="top">
      <div class="block">
        <div
          class="text-lg cursor-pointer inline-block"
          @click="$router.back()"
        >
          <i class="el-icon-arrow-left"></i>
          <span>评审</span>
        </div>
        <div style="margin-top: 32px; margin-left: 10px" >审核打分</div>
        <div class="mt-4">
          <el-form-item
            class="inline-block"
            label="分数:"
            :rules="rule.input"
            prop="score"
          >
            <el-input
              class="input"
              type="number"
              v-model="form.score"
              placeholder="请输入评审分数"
              @change="computeGrade"
            />
          </el-form-item>
          <el-form-item
            class="inline-block"
            label="评审等次:"
            prop="grade"
          >
            <el-input
              class="input"
              v-model="form.grade"
              disabled
              placeholder="自动计算"
            />
          </el-form-item>
          <el-form-item
            label="规划评审意见："
            :rules="rule.input"
            prop="suggestion"
          >
            <el-input
              v-model="form.suggestion"
              type="textarea"
              :rows="5"
              placeholder="请输入"
            />
          </el-form-item>
          <el-form-item
            label="上传附件："
            :rules="rule.upload"
            prop="suggestionFilesArr"
          >
            <UploadFile
              tip="支持格式：.doc, .docx,.pdf"
              accept=".doc,.docx,.pdf"
              :data="form.suggestionFilesArr"
              @add="onFileAdd($event, 'suggestionFilesArr')"
              @remove="onFileRemove($event, 'suggestionFilesArr')"
            />
          </el-form-item>
<!--          <p class="ml-4 mb-2">政府批复附件</p>-->
<!--          <el-form-item-->
<!--            label="上传政府批复附件："-->
<!--            :rules="rule.upload"-->
<!--            prop="approvalFilesArr"-->
<!--          >-->
<!--            <UploadFile-->
<!--              tip="支持格式：.doc, .docx,.pdf"-->
<!--              accept=".doc,.docx,.pdf"-->
<!--              :data="form.approvalFilesArr"-->
<!--              @add="onFileAdd($event, 'approvalFilesArr')"-->
<!--              @remove="onFileRemove($event, 'approvalFilesArr')"-->
<!--            />-->
<!--          </el-form-item>-->
          <div class="text-center">
            <el-button plain @click="$router.back()">取消</el-button>
            <el-button type="primary" @click="submit">提交</el-button>
          </div>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import rule from "@/mixins/rule";
import _ from "lodash";
import { getPlanDetail, verifyPlan, modifyPlan } from "@/api/planningReview";

export default {
  mixins: [rule],
  data() {
    return {
      id: "",
      type: "",
      // typeMap: {
      //   add: "新增",
      //   edit: "编辑",
      //   view: "查看",
      // },
      form: {
        approvalFilesArr: [],
        id: "",
        suggestion: "",
        suggestionFilesArr: [],
        villageDetailId: "",
        score: "", // 分数
        grade: "", // 等级
      },
      detail: {},
    };
  },
  created() {
    // this.type = this.$route.query.type;
    this.type = "add";
    this.id = this.$route.query.id;
    this.form.id = this.$route.query.id;
    // this.getDetail();
  },
  methods: {
    // 计算等级
    computeGrade() {
      switch (true) {
        case this.form.score < 60: this.form.grade = '不合格'; break;
        case this.form.score < 70: this.form.grade = '合格'; break;
        case this.form.score < 85: this.form.grade = '良好'; break;
        default: this.form.grade = '优秀';
      }
    },
    async getDetail() {
      if (this.type === "add") {
        return;
      }
      this.detail = await getPlanDetail(this.id);
      this.form = _.cloneDeep(this.detail);
      this.form.planFilesArr = _.cloneDeep(this.detail.planFilesList);
      this.form.suggestionFiles = _.cloneDeep(this.detail.suggestionFilesList);
      this.form.approvalFilesArr = _.cloneDeep(this.detail.approvalFilesList);
    },
    onFileAdd(file, key) {
      this.form[key].push(file);
    },
    onFileRemove(file, key) {
      const index = this.form[key].findIndex((item) => {
        return item.uid === file.uid || item.filePath === file.url;
      });
      if (index !== -1) {
        this.form[key].splice(index, 1);
      }
    },
    async submit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.$myConfirm({
            content: "是否确认提交",
          }).then(async () => {
            const form = _.cloneDeep(this.form);
            form.id = this.id;
            // 图片数组处理
            const keyArray = [
              // "planFilesArr",
              "suggestionFilesArr",
              "approvalFilesArr",
            ];
            keyArray.forEach((key) => {
              form[key] = form[key].map((item) => item.fileId);
            });
            try {
              if (this.type === "add") {
                await verifyPlan(form);
              } else {
                await modifyPlan(form);
              }
              this.$notify.success("提交成功");
              this.$router.back();
            } catch (err) {
              console.log(err);
            }
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.input {
  width: 300px;
}
.el-form-item {
  margin-left: 15px;
}
</style>
