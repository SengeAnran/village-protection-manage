<template>
  <div>
    <el-form ref="form" :model="form" label-width="100px" label-position="top">
      <div class="block">
        <div
          class="text-lg cursor-pointer inline-block"
          @click="$router.back()"
        >
          <i class="el-icon-arrow-left"></i>
          <span>整改详情</span>
        </div>
        <div class="mt-4">
          <el-form-item class="inline-block" label="申报年度">
            <p class="input">{{ year }}</p>
          </el-form-item>
          <el-form-item
            class="inline-block"
            label="总投资"
            v-if="Number(declareType) === 1002"
          >
            <p class="input">{{ total }}万元</p>
          </el-form-item>
          <div></div>
          <el-form-item class="inline-block" label="申报日期">
            <p class="input">{{ date }}</p>
          </el-form-item>
          <el-form-item
            class="inline-block"
            label="验收详情"
          >
            <el-button type="primary" @click="toVerifyDetail"
            >查看验收详情</el-button
            >
          </el-form-item>
          <div></div>
          <el-form-item class="inline-block" label="项目所在地">
            <p class="input">{{ address }}</p>
          </el-form-item>
          <p class="ml-4 mb-2 mt-4">验收结果</p>
          <el-form-item class="inline-block" label="分数">
            <p class="input">{{ form.score }}</p>
          </el-form-item>
          <el-form-item
            class="inline-block"
            label="等级"
          >
            <p class="input">{{ form.grade }}</p>
          </el-form-item>
          <p class="ml-4 mb-2 mt-4">整改情况</p>
          <el-form-item label="整改描述">
           <p>{{form.remark}}</p>
          </el-form-item>
          <el-form-item
            label="附件"
          >
            <div class="mb-4">
              <ViewFile
                :data="form.processFilesArr"
                v-if="form.processFilesArr && form.processFilesArr.length"
              />
              <p v-else>--</p>
            </div>
          </el-form-item>
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
  getRectifyDetail,
} from "@/api/projectAcceptance";

export default {
  mixins: [rule],
  data() {
    return {
      id: "",
      type: "",
      typeMap: {
        rectifyDetail: "整改详情",
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
  },
  created() {
    // console.log(this.$route.query)
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
      await this.getRectifyDetail(this.id)
      this.form.processFilesArr = _.cloneDeep(this.detail.uploadFileList);
      this.form.remark = _.cloneDeep(this.detail.modifyDescription);
      this.form.score = _.cloneDeep(this.detail.score);
      this.form.grade = _.cloneDeep(this.detail.grade);
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
    toVerifyDetail() {
      this.$router.push(`/projectAcceptance/verify/detail?id=${this.id}`);
    },
    // edit 情况获取整改详情
    getRectifyDetail(id) {
      return new Promise((resolve, reject) => {
        getRectifyDetail({ id })
          .then((res) => {
            this.detail = res;
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
