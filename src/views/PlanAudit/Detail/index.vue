<template>
  <div>
    <el-form ref="form" :model="form" label-width="150px" label-position="left">
      <div class="block">
        <div
          class="text-lg cursor-pointer inline-block"
          @click="$router.back()"
        >
          <i class="el-icon-arrow-left"></i>
          <span> 查看农家乐</span>
        </div>

<!--        <div class="mt-4">-->
<!--          <el-form-item-->
<!--            label="农家乐名称："-->
<!--            prop="agritainmentName"-->
<!--            :rules="rule.input"-->
<!--          >-->
<!--            <p>{{ form.agritainmentName }}</p>-->
<!--          </el-form-item>-->
<!--          <el-form-item-->
<!--            label="统一社会信用代码："-->
<!--            prop="creditCode"-->
<!--            :rules="rule.input"-->
<!--          >-->
<!--            <span>{{ form.creditCode }}</span>-->
<!--            <i v-if="showCodeLoading" class="ml-2 el-icon-loading"></i>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="法定代表人：">-->
<!--            <p>{{ codeInfo.legalPerson }}</p>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="所属地区：">-->
<!--            <p>{{ codeInfo.agritainmentArea }}</p>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="详细地址：">-->
<!--            <p>{{ codeInfo.agritainmentAddress }}</p>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="星级：">-->
<!--            <p>{{ codeInfo.agritainmentLevel }}</p>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="评定年度：">-->
<!--            <p>{{ codeInfo.agritainmentYear }}</p>-->
<!--          </el-form-item>-->
<!--          <el-form-item-->
<!--            label="简介："-->
<!--            prop="agritainmentIntroduction"-->
<!--            :rules="rule.input"-->
<!--          >-->
<!--            <p class="border border-gray-300 border-solid py-1 px-2 rounded">-->
<!--              {{ form.agritainmentIntroduction }}-->
<!--            </p>-->
<!--          </el-form-item>-->
<!--        </div>-->
<!--      </div>-->

<!--      <div class="block">-->
<!--        <el-form-item-->
<!--          label="农家乐风采："-->
<!--          prop="showImageIdList"-->
<!--          :rules="rule.upload"-->
<!--        >-->
<!--          <ViewImg :data="detail.showImages" />-->
<!--        </el-form-item>-->
<!--      </div>-->
<!--      <div class="block">-->
<!--        <el-form-item label="住宿环境：">-->
<!--          <ViewImg :data="detail.hotelImages" />-->
<!--        </el-form-item>-->
<!--      </div>-->
<!--      <div class="block">-->
<!--        <el-form-item label="用餐环境：">-->
<!--          <ViewImg :data="detail.diningImages" />-->
<!--        </el-form-item>-->
<!--      </div>-->
<!--      <div class="block">-->
<!--        <el-form-item label="美食展示：">-->
<!--          <ViewImg :data="detail.cateImages" />-->
<!--        </el-form-item>-->
<!--      </div>-->
<!--      <div class="block">-->
<!--        <el-form-item label="商品展示：">-->
<!--          <ViewImg :data="detail.goodsImages" />-->
<!--        </el-form-item>-->
<!--      </div>-->
<!--      <div class="block">-->
<!--        <el-form-item label="娱乐活动：">-->
<!--          <p>{{ form.agritainmentActivty }}</p>-->
<!--        </el-form-item>-->
      </div>
    </el-form>
  </div>
</template>

<!--<script>-->
<!--import rule from "@/mixins/rule";-->
<!--import _ from "lodash";-->
<!--import { getCodeInfo, getAgritainmentDetail } from "@/api/agritainment";-->

<!--export default {-->
<!--  mixins: [rule],-->
<!--  data() {-->
<!--    return {-->
<!--      id: "",-->
<!--      form: {-->
<!--        agritainmentActivty: "",-->
<!--        agritainmentIntroduction: "",-->
<!--        agritainmentName: "",-->
<!--        cateImageIdList: [],-->
<!--        creditCode: "923330942MW24KG239J",-->
<!--        diningImageIdList: [],-->
<!--        goodsImageIdList: [],-->
<!--        hotelImageIdList: [],-->
<!--        id: "",-->
<!--        showImageIdList: [],-->
<!--      },-->
<!--      detail: {},-->
<!--      codeInfo: {},-->
<!--      showCodeLoading: false,-->
<!--    };-->
<!--  },-->
<!--  created() {-->
<!--    this.type = this.$route.query.type;-->
<!--    this.id = this.$route.query.id;-->
<!--    this.getDetail();-->
<!--  },-->
<!--  methods: {-->
<!--    async getDetail() {-->
<!--      if (this.type === "add") {-->
<!--        return;-->
<!--      }-->
<!--      this.detail = await getAgritainmentDetail({ id: this.id });-->
<!--      this.form.id = this.detail.id;-->
<!--      this.form.agritainmentName = this.detail.agritainmentName;-->
<!--      this.form.creditCode = this.detail.creditCode;-->
<!--      this.form.agritainmentIntroduction = this.detail.agritainmentIntroduction;-->
<!--      this.form.agritainmentActivty = this.detail.agritainmentActivty;-->
<!--      this.form.showImageIdList = _.cloneDeep(this.detail.showImages);-->
<!--      this.form.hotelImageIdList = _.cloneDeep(this.detail.hotelImages);-->
<!--      this.form.diningImageIdList = _.cloneDeep(this.detail.diningImages);-->
<!--      this.form.cateImageIdList = _.cloneDeep(this.detail.cateImages);-->
<!--      this.form.goodsImageIdList = _.cloneDeep(this.detail.goodsImages);-->
<!--      this.getCodeInfo();-->
<!--    },-->
<!--    async getCodeInfo() {-->
<!--      try {-->
<!--        this.showCodeLoading = true;-->
<!--        this.codeInfo = (await getCodeInfo(this.form.creditCode)) || {};-->
<!--      } finally {-->
<!--        setTimeout(() => {-->
<!--          this.showCodeLoading = false;-->
<!--        }, 200);-->
<!--      }-->
<!--    },-->
<!--  },-->
<!--};-->
<!--</script>-->

<style lang="scss" scoped>
.input {
  width: 300px;
}
.el-form-item {
  margin-left: 15px;
}
</style>
