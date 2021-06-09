<template>
  <div>
    <el-form ref="form" :model="form" label-width="100px" label-position="top">
      <div class="block">
        <div
          class="text-lg cursor-pointer inline-block"
          @click="$router.back()"
        >
          <i class="el-icon-arrow-left"></i>
          <span> {{ typeMap[type] }}验收</span>
        </div>
        <div class="mt-4">
          <el-form-item class="inline-block" label="申报年度：">
            <p class="input">{{ year }}</p>
          </el-form-item>
          <el-form-item class="inline-block" label="总投资：">
            <p class="input">{{ total }}</p>
          </el-form-item>
          <el-form-item class="inline-block" label="申报日期：">
            <p class="input">{{ date }}</p>
          </el-form-item>
          <el-form-item class="inline-block" label="项目所在地：">
            <p class="input">{{ address }}</p>
          </el-form-item>
          <el-form-item class="inline-block" label="项目类型：">
            <p class="input">{{ declareTypeMap[declareType] }}</p>
          </el-form-item>
          <el-form-item class="inline-block" label="验收详情：">
            <el-button type="primary" @click="toVerifyDetail"
              >查看验收详情</el-button
            >
          </el-form-item>
          <p class="ml-4 mb-2 mt-4">验收</p>
          <el-form-item
            v-if="type === 'add'"
            class="inline-block"
            label="验收结果："
            :rules="rule.select"
            prop="status"
          >
            <el-radio-group v-model="form.status">
              <el-radio :label="1">通过</el-radio>
              <el-radio :label="0">不通过</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="验收意见：" :rules="rule.input" prop="remark">
            <el-input
              v-model="form.remark"
              type="textarea"
              :rows="5"
              placeholder="请输入"
            />
          </el-form-item>
          <el-form-item
            label="上传附件："
            :rules="rule.upload"
            prop="processFilesArr"
          >
            <UploadFile
              tip="支持格式：.doc, .docx, .ppt"
              accept=".doc,.docx,.ppt"
              :data="form.processFilesArr"
              @add="onFileAdd($event, 'processFilesArr')"
              @remove="onFileRemove($event, 'processFilesArr')"
            />
          </el-form-item>
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
import {
  getAcceptanceDetail,
  verify,
  verifyByCounty,
} from "@/api/projectAcceptance";

export default {
  mixins: [rule],
  data() {
    return {
      id: "",
      type: "",
      typeMap: {
        add: "新增",
        edit: "编辑",
        view: "查看",
      },
      form: {
        declareType: 0,
        id: "",
        processFilesArr: [],
        remark: "",
        status: "",
      },
      declareTypeMap: {
        1001: "一般村项目",
        1002: "重点村项目",
      },
      detail: {},
      year: "",
      total: "",
      date: "",
      address: "",
      declareType: "",
    };
  },
  created() {
    this.type = this.$route.query.type;
    this.id = this.$route.query.id;
    this.year = this.$route.query.year;
    this.total = this.$route.query.total;
    this.date = this.$route.query.date;
    this.address = this.$route.query.address;
    this.declareType = this.$route.query.declareType;
    this.form.declareType = this.declareType;
    this.getDetail();
  },
  methods: {
    async getDetail() {
      if (this.type === "add") {
        return;
      }
      this.detail = (await getAcceptanceDetail(this.id))[0] || {};
      this.form = _.cloneDeep(this.detail);
      this.form.processFilesArr = _.cloneDeep(this.detail.processFilesList);
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
    toVerifyDetail() {
      this.$router.push(`/projectAcceptance/verify/detail?id=${this.id}`);
    },
    async submit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.$myConfirm({
            content: "是否确认提交",
          }).then(async () => {
            const form = _.cloneDeep(this.form);
            form.id = this.id;
            form.declareType = this.declareType;
            // 图片数组处理
            const keyArray = ["processFilesArr"];
            keyArray.forEach((key) => {
              form[key] = form[key].map((item) => item.fileId);
            });
            try {
              if (this.type === "add") {
                await verify(form);
              } else {
                await verifyByCounty(form);
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
