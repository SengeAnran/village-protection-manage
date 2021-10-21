<template>
  <div>
    <div class="clearfix export">
      <el-button class="export-button" @click="clickExport">导出</el-button>
    </div>
    <div class="block">
      <div class="text-lg cursor-pointer inline-block" @click="$router.back()">
        <i class="el-icon-arrow-left"></i>
        <span> 查看项目信息</span>
      </div>
      <div class="mt-4">
        <div class="ml-4 mb-4">
          <el-tag
            v-for="(item, index) in ['基本信息', '可行性摘要', '建设项目清单']"
            :key="index"
            :type="index === active ? 'primary' : 'info'"
            :effect="index === active ? 'dark' : 'light'"
            size="large"
            class="mr-4 cursor-pointer"
            @click="active = index"
            >{{ item }}</el-tag
          >
        </div>

        <el-form
          v-show="active === 0"
          ref="form1"
          :model="form1"
          label-width="100px"
          label-position="top"
        >
          <p class="ml-4 my-2">基本信息</p>
          <div>
            <el-form-item
              class="inline-block"
              label="申报年度："
              :rules="rule.select"
              prop="years"
            >
              <p class="input">{{ form1.years }}</p>
            </el-form-item>
            <el-form-item
              class="inline-block"
              label="项目类型："
              :rules="rule.select"
              prop="projectType"
            >
              <p class="input">{{ projectTypeMap[form1.projectType] }}</p>
            </el-form-item>
            <el-form-item
              class="inline-block"
              label="项目所在地："
              :rules="rule.select"
              prop="villageDetailId"
            >
              <p class="input">{{ form1.address }}</p>
<!--              <p class="input">{{ form1.address }}{{ form1.villageName }}</p>-->
            </el-form-item>
          </div>
          <div>
            <el-form-item
              class="inline-block"
              label="申报时间："
              :rules="rule.select"
              prop="years"
            >
              <p class="input">{{ form1.gmtCreate }}</p>
            </el-form-item>
            <el-form-item
              class="inline-block"
              label="状态："
              :rules="rule.select"
              prop="projectType"
            >
              <div class="input">
                <el-tag>{{ projectStatusMap[form1.projectStatus] }}</el-tag>
              </div>
            </el-form-item>
          </div>

          <div>
            <p class="ml-4 my-2">管理信息</p>
            <el-form-item
              class="inline-block"
              label="项目负责人："
              :rules="rule.input"
              prop="projectManager"
            >
              <p class="input">{{ form1.projectManager }}</p>
            </el-form-item>
            <el-form-item
              class="inline-block"
              label="负责人联系电话："
              :rules="rule.input"
              prop="managerMobile"
            >
              <p class="input">{{ form1.managerMobile }}</p>
            </el-form-item>
            <el-form-item
              class="inline-block"
              label="项目主管部门："
              :rules="rule.input"
              prop="departmentName"
            >
              <p class="input">{{ form1.departmentName }}</p>
            </el-form-item>
          </div>
          <div>
            <el-form-item
              class="inline-block"
              label="主管部门联系人："
              :rules="rule.input"
              prop="departmentManagerName"
            >
              <p class="input">{{ form1.departmentManagerName }}</p>
            </el-form-item>
            <el-form-item
              class="inline-block"
              label="主管部门联系电话："
              :rules="rule.input"
              prop="departmentMobile"
            >
              <p class="input">{{ form1.departmentMobile }}</p>
            </el-form-item>
            <el-form-item
              class="inline-block"
              label="项目施工单位："
              :rules="rule.input"
              prop="constructionCompanyName"
            >
              <p class="input">{{ form1.constructionCompanyName }}</p>
            </el-form-item>
          </div>
          <div>
            <el-form-item
              class="inline-block"
              label="施工单位联系电话："
              :rules="rule.input"
              prop="companyMobile"
            >
              <p class="input">{{ form1.companyMobile }}</p>
            </el-form-item>
          </div>
          <div>
            <p class="ml-4 my-2">投资构成</p>
            <div>
              <el-form-item
                class="inline-block"
                label="申请省级财政（万元）："
                :rules="rule.input"
                prop="provinceFee"
              >
                <p class="input">{{ form1.provinceFee }}万元</p>
              </el-form-item>
              <el-form-item
                class="inline-block"
                label="申请市级财政（万元）："
                :rules="rule.input"
                prop="cityFee"
              >
                <p class="input">{{ form1.cityFee }}万元</p>
              </el-form-item>
              <el-form-item
                class="inline-block"
                label="申请县级及县以下财政（万元）："
                :rules="rule.input"
                prop="countryFee"
              >
                <p class="input">{{ form1.countryFee }}万元</p>
              </el-form-item>
            </div>
            <div>
              <el-form-item
                class="inline-block"
                label="村自筹资金（万元）："
                :rules="rule.input"
                prop="villageFee"
              >
                <p class="input">{{ form1.villageFee }}万元</p>
              </el-form-item>
              <el-form-item
                class="inline-block"
                label="银行贷款（万元）："
                :rules="rule.input"
                prop="bankFee"
              >
                <p class="input">{{ form1.bankFee }}万元</p>
              </el-form-item>
              <el-form-item
                class="inline-block"
                label="其他投入（万元）："
                :rules="rule.input"
                prop="otherFee"
              >
                <p class="input">{{ form1.otherFee }}万元</p>
              </el-form-item>
            </div>
          </div>
          <div>
            <p class="ml-4 my-2">原风貌图片</p>
            <el-form-item :rules="rule.upload" prop="imagesArr">
              <ViewImg :data="form1.imagesArr" />
            </el-form-item>
          </div>
        </el-form>

        <el-form
          v-show="active === 1"
          ref="form2"
          :model="form2"
          label-width="100px"
          label-position="top"
        >
          <el-form-item
            label="项目村概况："
            :rules="rule.input"
            prop="villageOverview"
          >
            <el-input
              v-model="form2.villageOverview"
              type="textarea"
              placeholder="请输入"
              :rows="5"
              readonly
            />
          </el-form-item>
          <el-form-item
            label="投资必要性分析："
            :rules="rule.input"
            prop="investAnalysis"
          >
            <el-input
              v-model="form2.investAnalysis"
              type="textarea"
              placeholder="请输入"
              :rows="5"
              readonly
            />
          </el-form-item>
          <el-form-item
            label="建设项目："
            :rules="rule.input"
            prop="projectDetails"
          >
            <el-input
              v-model="form2.projectDetails"
              type="textarea"
              placeholder="请输入"
              :rows="5"
              readonly
            />
          </el-form-item>
          <el-form-item
            label="建设方案："
            :rules="rule.input"
            prop="projectPlan"
          >
            <el-input
              v-model="form2.projectPlan"
              type="textarea"
              placeholder="请输入"
              :rows="5"
              readonly
            />
          </el-form-item>
          <el-form-item
            label="财政补助资金支持环节："
            :rules="rule.input"
            prop="financialSupport"
          >
            <el-input
              v-model="form2.financialSupport"
              type="textarea"
              placeholder="请输入"
              :rows="5"
              readonly
            />
          </el-form-item>
          <el-form-item
            label="社会效益分析："
            :rules="rule.input"
            prop="benefitAnalysis"
          >
            <el-input
              v-model="form2.benefitAnalysis"
              type="textarea"
              placeholder="请输入"
              :rows="5"
              readonly
            />
          </el-form-item>
        </el-form>

        <el-form
          v-show="active === 2"
          ref="form3"
          :model="form3"
          label-width="100px"
          label-position="top"
        >
          <p class="ml-4 my-2">古建筑修复项目（幢、平方米）</p>
          <div>
            <el-form-item
              class="inline-block"
              label="顶瓦修复幢数："
              :rules="rule.input"
              prop="tileRepairNum"
            >
              <p class="input">{{ form3.tileRepairNum }}</p>
            </el-form-item>
            <el-form-item
              class="inline-block"
              label="顶瓦修补面积（0-100000㎡）："
              :rules="rule.input"
              prop="tileRepairArea"
            >
              <p class="input">{{ form3.tileRepairArea }}</p>
            </el-form-item>
            <el-form-item
              class="inline-block"
              label="墙体加固幢数："
              :rules="rule.input"
              prop="wallRepairNum"
            >
              <p class="input">{{ form3.wallRepairNum }}</p>
            </el-form-item>
          </div>
          <div>
            <el-form-item
              class="inline-block"
              label="墙体加固面积（0-100000㎡）："
              :rules="rule.input"
              prop="wallRepairArea"
            >
              <p class="input">{{ form3.wallRepairArea }}</p>
            </el-form-item>
            <el-form-item
              class="inline-block"
              label="立面改造幢数："
              :rules="rule.input"
              prop="faceReformNum"
            >
              <p class="input">{{ form3.faceReformNum }}</p>
            </el-form-item>
            <el-form-item
              class="inline-block"
              label="立面改造面积（0-150000㎡）："
              :rules="rule.input"
              prop="faceReformArea"
            >
              <p class="input">{{ form3.faceReformArea }}</p>
            </el-form-item>
          </div>
          <div>
            <el-form-item
              class="inline-block"
              label="构件修复幢数："
              :rules="rule.input"
              prop="componentRepairNum"
            >
              <p class="input">{{ form3.componentRepairNum }}</p>
            </el-form-item>
            <el-form-item
              class="inline-block"
              label="构件修复个数（0-1000个）："
              :rules="rule.input"
              prop="componentRepairQuantity"
            >
              <p class="input">{{ form3.componentRepairQuantity }}</p>
            </el-form-item>
            <el-form-item
              class="inline-block"
              label="异地迁入幢数："
              :rules="rule.input"
              prop="moveInNum"
            >
              <p class="input">{{ form3.moveInNum }}</p>
            </el-form-item>
          </div>
          <div>
            <el-form-item
              class="inline-block"
              label="异地迁入面积："
              :rules="rule.input"
              prop="moveInArea"
            >
              <p class="input">{{ form3.moveInArea }}</p>
            </el-form-item>
          </div>
          <p class="ml-4 my-2">与历史风貌有冲突的建（构）物修整改造项目</p>
          <div>
            <el-form-item
              class="inline-block"
              label="立面改造幢数："
              :rules="rule.input"
              prop="clashFaceReformNum"
            >
              <p class="input">{{ form3.clashFaceReformNum }}</p>
            </el-form-item>
            <el-form-item
              class="inline-block"
              label="立面改造面积（0-150000㎡）："
              :rules="rule.input"
              prop="clashFaceReformArea"
            >
              <p class="input">{{ form3.clashFaceReformArea }}</p>
            </el-form-item>
            <el-form-item
              class="inline-block"
              label="结构降层幢数："
              :rules="rule.input"
              prop="structureNum"
            >
              <p class="input">{{ form3.structureNum }}</p>
            </el-form-item>
          </div>
          <div>
            <el-form-item
              class="inline-block"
              label="结构降层面积（0-100000㎡）："
              :rules="rule.input"
              prop="structureArea"
            >
              <p class="input">{{ form3.structureArea }}</p>
            </el-form-item>
            <el-form-item
              class="inline-block"
              label="整体拆除面积（0-100000㎡）："
              :rules="rule.input"
              prop="demolishArea"
            >
              <p class="input">{{ form3.demolishArea }}</p>
            </el-form-item>
            <el-form-item
              class="inline-block"
              label="异地搬迁户数："
              :rules="rule.input"
              prop="moveFamilyNum"
            >
              <p class="input">{{ form3.moveFamilyNum }}</p>
            </el-form-item>
          </div>
          <p class="ml-4 my-2">搬迁安置区基本公建设施项目（亩、万元）</p>
          <div>
            <el-form-item
              class="inline-block"
              label="用地面积（0-15亩）："
              :rules="rule.input"
              prop="landUseArea"
            >
              <p class="input">{{ form3.landUseArea }}</p>
            </el-form-item>
            <el-form-item
              class="inline-block"
              label="安置户数（0-100户）："
              :rules="rule.input"
              prop="placementFamilyNum"
            >
              <p class="input">{{ form3.placementFamilyNum }}</p>
            </el-form-item>
            <el-form-item
              class="inline-block"
              label="基本公建设施投资总额（0-5万/户）："
              :rules="rule.input"
              prop="totalInvestment"
            >
              <p class="input">{{ form3.totalInvestment }}</p>
            </el-form-item>
          </div>
          <p class="ml-4 my-2">村内古道修复与改造（平方米、公里）</p>
          <div>
            <el-form-item
              class="inline-block"
              label="面积（0-50000㎡）："
              :rules="rule.input"
              prop="oldWayArea"
            >
              <p class="input">{{ form3.oldWayArea }}</p>
            </el-form-item>
            <el-form-item
              class="inline-block"
              label="古道里程（0-5公里）："
              :rules="rule.input"
              prop="oldWayMileage"
            >
              <p class="input">{{ form3.oldWayMileage }}</p>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import rule from "@/mixins/rule";
import _ from "lodash";
import { getProjectDetail, pogressExport } from "@/api/projectDeclare";
import { downloadWordFile } from "@/utils/data"

export default {
  mixins: [rule],
  data() {
    return {
      id: "",
      // 基本信息
      form1: {
        years: "",
        projectType: "",
        villageDetailId: "",
        projectManager: "",
        managerMobile: "",
        departmentName: "",
        departmentManagerName: "",
        departmentMobile: "",
        constructionCompanyName: "",
        companyMobile: "",
        provinceFee: undefined,
        cityFee: undefined,
        countryFee: undefined,
        villageFee: undefined,
        bankFee: undefined,
        otherFee: undefined,
        imagesArr: [],
      },
      // 可行性摘要
      form2: {
        villageOverview: "",
        investAnalysis: "",
        projectDetails: "",
        projectPlan: "",
        financialSupport: "",
        benefitAnalysis: "",
      },
      // 建设项目清单
      form3: {
        tileRepairNum: undefined,
        tileRepairArea: undefined,
        wallRepairNum: undefined,
        wallRepairArea: undefined,
        faceReformNum: undefined,
        faceReformArea: undefined,
        componentRepairNum: undefined,
        componentRepairQuantity: undefined,
        moveInNum: undefined,
        moveInArea: undefined,
        clashFaceReformNum: undefined,
        clashFaceReformArea: undefined,
        structureNum: undefined,
        structureArea: undefined,
        demolishArea: undefined,
        moveFamilyNum: undefined,
        landUseArea: undefined,
        placementFamilyNum: undefined,
        totalInvestment: undefined,
        oldWayArea: undefined,
        oldWayMileage: undefined,
      },
      detail: {},
      active: 0,
      //待市级审核：2001 市级审核不通过:2002 省级审核不通过: 2003 市级审核通过 待省级审核:2004 审核通过:2999
      projectTypeMap: {
        30001: "修缮",
        30002: "扩建",
        30003: "开发利用",
      },
      projectStatusMap: {
        2001: "待市级审核",
        2002: "市级审核不通过",
        2003: "省级审核不通过",
        2004: "市级审核通过，待省级审核",
        2999: "审核通过",
      },
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.getDetail();
  },
  methods: {
    //导出
    clickExport() {
      const { id } = this.$route.query;
      const fileName = '项目申报文本'
      pogressExport({id}).then(res => {
        console.log(res)
        downloadWordFile(res,fileName)
      })
    },
    async getDetail() {
      if (this.type === "add") {
        return;
      }
      this.detail = await getProjectDetail(this.id);
      this.form1 = _.cloneDeep(this.detail.baseInfo);
      this.form2 = _.cloneDeep(this.detail.feasibleInfo);
      this.form3 = _.cloneDeep(this.detail.checkListInfo);
      this.form1.years = this.form1.years.toString();
      this.form1.imagesArr = _.cloneDeep(this.detail.baseInfo.imagesFilesList);
    },
  },
};
</script>

<style lang="scss" scoped>
.export {
  margin-bottom: 25px;
  .export-button{
    float: right;
  }
}
.input {
  width: 300px;
}
.el-form-item {
  margin-left: 15px;
}
::v-deep .el-input-number .el-input__inner {
  text-align: left;
}
</style>
