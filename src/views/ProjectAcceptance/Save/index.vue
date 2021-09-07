<template>
  <div>
    <el-form ref="form" :model="form" label-width="100px" label-position="top">
      <div class="block">
        <div
          class="text-lg cursor-pointer inline-block"
          @click="$router.back()"
        >
          <i class="el-icon-arrow-left"></i>
          <span> {{ typeMap[type] }}</span>
        </div>
        <div class="mt-4">
          <el-form-item class="inline-block" label="申报年度：">
            <p class="input">{{ year }}</p>
          </el-form-item>
          <el-form-item
            class="inline-block"
            label="总投资："
            v-if="Number(declareType) === 1002"
          >
            <p class="input">{{ total }}万元</p>
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
          <el-form-item
            class="inline-block"
            label="验收详情："
            v-if="userInfo.roleId !== 3 || type === 'rectify'"
          >
            <el-button type="primary" @click="toVerifyDetail"
              >查看验收详情</el-button
            >
          </el-form-item>
          <p class="ml-4 mb-2 mt-4">{{ descName.slice(0, 2) }}</p>
          <el-form-item
            v-if="type === 'add' && roleId === 2"
            class="inline-block"
            label="验收结果："
            :rules="rule.select"
            prop="status"
          >
            <el-radio-group v-model="form.status">
              <el-radio :label="1">合格</el-radio>
              <el-radio :label="0">不合格</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-row :gutter="40" v-if="type === 'add' && declareType === '1002' && roleId === 1">
            <el-col :span="6">
              <el-form-item label="分数:" :rules="rule.input" prop="score">
                <el-input
                  v-model.lazy="form.score"
                  type="number"
                  placeholder="请输入评价分数"
                  @change="computeGrade"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="等级:" prop="grade">
                <el-input
                  v-model="form.grade"
                  type="text"
                  disabled
                  placeholder="自动计算"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item :label="descName" :rules="rule.input" prop="remark">
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
import { mapGetters } from "vuex";
import rule from "@/mixins/rule";
import _ from "lodash";
import {
  // getAcceptanceDetail,
  verify,
  verifyByCounty,
  getRectificationInfo,
  // getAcceptanceInfo,
} from "@/api/projectAcceptance";

export default {
  mixins: [rule],
  data() {
    return {
      id: "",
      type: "",
      typeMap: {
        add: "新增",
        edit: "修改",
        view: "查看",
        rectify: "整改",
      },
      form: {
        declareType: 0,
        id: "",
        processFilesArr: [],
        remark: "",
        status: "",
        score: "", // 分数
        grade: "", // 等级
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
      roleId: "",
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
    descName() {
      return this.type === "edit"
        ? "修改描述"
        : this.type === "rectify"
        ? "整改描述"
        : "验收意见";
    },
  },

  created() {
    console.log(this.$route.query)
    this.id = this.$route.query.id;
    this.type = this.$route.query.type;
    this.declareType = this.$route.query.declareType;
    this.form.declareType = this.declareType;
    this.year = this.$route.query.year;
    this.total = this.$route.query.total;
    this.date = this.$route.query.date;
    this.address = this.$route.query.address;
    this.roleId = this.$store.state.user.userInfo.roleId
    this.getDetail();
  },
  methods: {
    async getDetail() {
      if (this.type === "add") {
        return;
      }
      await this.getEditInfo(this.id);
      this.form = _.cloneDeep(this.detail);

      this.form.processFilesArr = _.cloneDeep(this.detail.processFilesList);
    },
    // 计算等级
    computeGrade() {
      switch (true) {
        case this.form.score < 60: this.form.grade = '不合格'; break;
        case this.form.score < 70: this.form.grade = '合格'; break;
        case this.form.score < 85: this.form.grade = '良好'; break;
        default: this.form.grade = '优秀';
      }
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

    // edit 情况获取详情
    getEditInfo(id) {
      return new Promise((resolve, reject) => {
        getRectificationInfo({ id, declareType: this.declareType })
          .then((res) => {
            this.detail = res && res.processLogDOList[0];
            resolve();
          })
          .catch(() => {
            reject();
          });
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
  ::v-deep .el-form-item__label {
    color: #999;
  }
}
</style>
