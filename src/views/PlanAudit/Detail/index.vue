<template>
  <div>
    <el-form ref="form" :model="form" label-width="100px" label-position="top">
      <div class="block">
        <div
          class="text-lg cursor-pointer inline-block"
          @click="$router.back()"
        >
          <i class="el-icon-arrow-left"></i>
          <span> 查看评审</span>
        </div>
        <div class="mt-4">
          <p class="ml-4 mb-2">报送规划设计公司</p>
          <el-form-item
            class="inline-block"
            label="设计公司名称："
            prop="companyName"
          >
            <p class="input">{{ form.companyName }}</p>
          </el-form-item>
          <el-form-item
            class="inline-block"
            label="单位资质："
            prop="qualification"
          >
            <p class="input">{{ form.qualification }}</p>
          </el-form-item>
          <el-form-item
            class="inline-block"
            label="项目负责人："
            prop="projectManager"
          >
            <p class="input">{{ form.projectManager }}</p>
          </el-form-item>
          <el-form-item
            class="inline-block"
            label="县级负责人："
            prop="countyManager"
          >
            <p class="input">{{ form.countyManager }}</p>
          </el-form-item>
<!--          <el-form-item-->
<!--            class="inline-block"-->
<!--            label="分数："-->
<!--            prop="score"-->
<!--          >-->
<!--            <p class="input">{{ form.score }}</p>-->
<!--          </el-form-item>-->
<!--          <el-form-item-->
<!--            class="inline-block"-->
<!--            label="评审等次："-->
<!--            prop="grade"-->
<!--          >-->
<!--            <p class="input">{{ form.grade }}</p>-->
<!--          </el-form-item>-->
          <el-form-item label="规划文本（仅限PPT格式）：" prop="planFilesArr">
            <ViewFile
              :data="form.planFilesArr"
              v-if="form.suggestionFilesArr.length"
            />
            <span v-else>--</span>
          </el-form-item>
          <p class="ml-4 mb-2">县级规划评审情况</p>
          <el-form-item label="县级规划评审意见：" prop="suggestion">
            <el-input
              v-model="form.suggestion"
              type="textarea"
              :rows="5"
              placeholder="请输入"
              readonly
            />
          </el-form-item>
          <el-form-item label="上传附件：" prop="suggestionFilesArr">
            <ViewFile
              :data="form.suggestionFilesArr"
              v-if="form.suggestionFilesArr.length"
            />
            <span v-else>--</span>
          </el-form-item>
          <p class="ml-4 mb-2">政府批复附件</p>
          <el-form-item label="上传政府批复附件：" prop="approvalFilesArr">
            <ViewFile
              :data="form.approvalFilesArr"
              v-if="form.approvalFilesArr.length"
            />
            <span v-else>--</span>
          </el-form-item>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import rule from "@/mixins/rule";
import _ from "lodash";
import { getPlanDetail } from "@/api/planningReview";

export default {
  mixins: [rule],
  data() {
    return {
      id: "",
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
        qualification: "",
        // score: "", // 分数
        // grade: "", // 等级
      },
      detail: {},
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.getDetail();
  },
  methods: {
    async getDetail() {
      this.detail = await getPlanDetail(this.id);
      this.form = _.cloneDeep(this.detail);
      this.form.planFilesArr = _.cloneDeep(this.detail.planFilesList);
      this.form.suggestionFilesArr = _.cloneDeep(
        this.detail.suggestionFilesList
      );
      this.form.approvalFilesArr = _.cloneDeep(this.detail.approvalFilesList);
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
  ::v-deep .el-form-item__label {
    color: #999;
  }
}
</style>
