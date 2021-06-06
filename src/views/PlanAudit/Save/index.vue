<template>
  <div>
    <el-form ref="form" :model="form" label-width="100px" label-position="top">
      <div class="block">
        <div
          class="text-lg cursor-pointer inline-block"
          @click="$router.back()"
        >
          <i class="el-icon-arrow-left"></i>
          <span> {{ typeMap[type] }}评审</span>
        </div>
        <div class="mt-4">
          <p class="ml-4 mb-2">报送规划设计公司</p>
          <el-form-item
            class="inline-block"
            label="设计公司名称："
            :rules="rule.input"
          >
            <el-input
              class="input"
              v-model="form.agritainmentActivty"
              placeholder="请输入"
            />
          </el-form-item>
          <el-form-item
            class="inline-block"
            label="项目负责人："
            :rules="rule.input"
          >
            <el-input
              class="input"
              v-model="form.agritainmentActivty"
              placeholder="请输入"
            />
          </el-form-item>
          <el-form-item
            class="inline-block"
            label="县级负责人："
            :rules="rule.input"
          >
            <el-input
              class="input"
              v-model="form.agritainmentActivty"
              placeholder="请输入"
            />
          </el-form-item>
          <el-form-item
              label="规划文本（仅限PPT格式）："
              :rules="rule.upload"
          >
            <UploadFile
                @add="onFileAdd"
                @remove="onFileRemove"
            />
          </el-form-item>
          <p class="ml-4 mb-2">县级规划评审情况</p>
          <el-form-item
              label="县级规划评审意见："
              :rules="rule.input"
          >
            <el-input
                v-model="form.agritainmentActivty"
                type="textarea"
                :rows="5"
                placeholder="请输入"
            />
          </el-form-item>
          <el-form-item
              label="上传附件："
              :rules="rule.upload"
          >
            <UploadFile
                @add="onFileAdd"
                @remove="onFileRemove"
            />
          </el-form-item>
          <p class="ml-4 mb-2">政府批复附件</p>
          <el-form-item
              label="上传政府批复附件："
              :rules="rule.upload"
          >
            <UploadFile
                @add="onFileAdd"
                @remove="onFileRemove"
            />
          </el-form-item>
          <div class="text-center">
            <el-button plain @click="$router.back()">取消</el-button>
            <el-button type="primary" @click="submit">发布</el-button>
          </div>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import rule from "@/mixins/rule";
import _ from "lodash";
import { getPlanDetail, createPlan, modifyPlan } from "@/api/planningReview";
import { uploadFile } from "@/api/common";

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
        approvalFilesArr: [],
        companyName: "",
        countyManager: "",
        id: "",
        planFilesArr: [],
        projectManager: "",
        suggestion: "",
        suggestionFilesArr: [],
        villageDetailId: "",
      },
      detail: {},
    };
  },
  created() {
    this.type = this.$route.query.type;
    this.id = this.$route.query.id;
    this.getDetail();
  },
  methods: {
    async getDetail() {
      if (this.type === "add") {
        return;
      }
      this.detail = await getPlanDetail(this.id);
      this.form.id = this.detail.id;
      this.form.agritainmentName = this.detail.agritainmentName;
      this.form.creditCode = this.detail.creditCode;
      this.form.agritainmentIntroduction = this.detail.agritainmentIntroduction;
      this.form.agritainmentActivty = this.detail.agritainmentActivty;
      this.form.showImageIdList = _.cloneDeep(this.detail.showImages);
      this.form.hotelImageIdList = _.cloneDeep(this.detail.hotelImages);
      this.form.diningImageIdList = _.cloneDeep(this.detail.diningImages);
      this.form.cateImageIdList = _.cloneDeep(this.detail.cateImages);
      this.form.goodsImageIdList = _.cloneDeep(this.detail.goodsImages);
    },
    onFileAdd(data) {
      console.log(data);
    },
    onFileRemove(data) {
      console.log(data);
    },
    async upload(file, key) {
      console.log(file, key);
      const formData = new FormData();
      formData.append("file", file);
      await uploadFile();
    },
    async submit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.$myConfirm({
            content: "是否确认发布",
          }).then(async () => {
            // 图片数组处理
            const imageObj = {};
            const keyArray = [
              "cateImageIdList",
              "diningImageIdList",
              "goodsImageIdList",
              "hotelImageIdList",
              "showImageIdList",
            ];
            keyArray.forEach((key) => {
              imageObj[key] = _.cloneDeep(this.form[key]);
            });
            try {
              keyArray.forEach((key) => {
                this.form[key] = this.form[key].map((item) => item.fileId);
              });
              if (this.type === "add") {
                await createPlan(this.form);
              } else {
                await modifyPlan(this.form);
              }
              this.$notify.success("发布成功");
              this.$router.back();
            } catch (err) {
              keyArray.forEach((key) => {
                this.form[key] = imageObj[key];
              });
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
