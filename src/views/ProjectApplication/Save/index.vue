<template>
  <div>
    <div class="block">
      <div class="text-lg cursor-pointer inline-block" @click="$router.back()">
        <i class="el-icon-arrow-left"></i>
        <span> {{ typeMap[type] }}项目</span>
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
          <div>
            <p class="ml-4 my-2">基本信息</p>
            <el-form-item
              class="inline-block"
              label="申报年度："
              :rules="rule.select"
              prop="years"
            >
              <el-date-picker
                v-model="form1.years"
                type="year"
                value-format="yyyy"
                placeholder="请选择"
                style="width: 300px"
              ></el-date-picker>
            </el-form-item>
            <el-form-item
              class="inline-block"
              label="项目类型："
              :rules="rule.select"
              prop="projectType"
            >
              <el-select
                v-model="form1.projectType"
                placeholder="请选择"
                style="width: 300px"
              >
                <el-option
                  v-for="item in projectTypeList"
                  :key="item.value"
                  :value="item.value"
                  :label="item.label"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              class="inline-block"
              label="项目所在地："
              :rules="rule.select"
              prop="villageDetailId"
            >
              <el-select
                v-model="form1.villageDetailId"
                placeholder="请选择"
                style="width: 300px"
              >
                <el-option
                  v-for="item in projectAddressList"
                  :key="item.villageDetailId"
                  :value="item.villageDetailId"
                  :label="item.address"
                ></el-option>
              </el-select>
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
              <el-input
                class="input"
                v-model="form1.projectManager"
                placeholder="请输入"
              />
            </el-form-item>
            <el-form-item
              class="inline-block"
              label="负责人联系电话："
              :rules="rule.mobile"
              prop="managerMobile"
            >
              <el-input
                class="input"
                v-model="form1.managerMobile"
                placeholder="请输入"
              />
            </el-form-item>
            <el-form-item
              class="inline-block"
              label="项目主管部门："
              :rules="rule.input"
              prop="departmentName"
            >
              <el-input
                class="input"
                v-model="form1.departmentName"
                placeholder="请输入"
              />
            </el-form-item>
          </div>
          <div>
            <el-form-item
              class="inline-block"
              label="主管部门联系人："
              :rules="rule.input"
              prop="departmentManagerName"
            >
              <el-input
                class="input"
                v-model="form1.departmentManagerName"
                placeholder="请输入"
              />
            </el-form-item>
            <el-form-item
              class="inline-block"
              label="主管部门联系电话："
              :rules="rule.mobile"
              prop="departmentMobile"
            >
              <el-input
                class="input"
                v-model="form1.departmentMobile"
                placeholder="请输入"
              />
            </el-form-item>
            <el-form-item
              class="inline-block"
              label="项目施工单位："
            >
              <el-input
                class="input"
                v-model="form1.constructionCompanyName"
                placeholder="请输入"
              />
            </el-form-item>
          </div>
          <div>
            <el-form-item
              class="inline-block"
              label="施工单位联系电话："
            >
              <el-input
                class="input"
                v-model="form1.companyMobile"
                placeholder="请输入"
              />
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
                <el-input-number
                  class="input"
                  v-model="form1.provinceFee"
                  placeholder="请输入"
                  :controls="false"
                  :min="0"
                />
              </el-form-item>
              <el-form-item
                class="inline-block"
                label="申请市级财政（万元）："
                :rules="rule.input"
                prop="cityFee"
              >
                <el-input-number
                  class="input"
                  v-model="form1.cityFee"
                  placeholder="请输入"
                  :controls="false"
                  :min="0"
                />
              </el-form-item>
              <el-form-item
                class="inline-block"
                label="申请县级及县以下财政（万元）："
                :rules="rule.input"
                prop="countryFee"
              >
                <el-input-number
                  class="input"
                  v-model="form1.countryFee"
                  placeholder="请输入"
                  :controls="false"
                  :min="0"
                />
              </el-form-item>
            </div>
            <div>
              <el-form-item
                class="inline-block"
                label="村自筹资金（万元）："
                :rules="rule.input"
                prop="villageFee"
              >
                <el-input-number
                  class="input"
                  v-model="form1.villageFee"
                  placeholder="请输入"
                  :controls="false"
                  :min="0"
                />
              </el-form-item>
              <el-form-item
                class="inline-block"
                label="银行贷款（万元）："
                :rules="rule.input"
                prop="bankFee"
              >
                <el-input-number
                  class="input"
                  v-model="form1.bankFee"
                  placeholder="请输入"
                  :controls="false"
                  :min="0"
                />
              </el-form-item>
              <el-form-item
                class="inline-block"
                label="其他投入（万元）："
                :rules="rule.input"
                prop="otherFee"
              >
                <el-input-number
                  class="input"
                  v-model="form1.otherFee"
                  placeholder="请输入"
                  :controls="false"
                  :min="0"
                />
              </el-form-item>
              <el-form-item
                class="inline-flex"
                label="总投资（万元）："
                prop="otherFee"
              >
                <span class="input">{{ totalFee }}万元</span>
              </el-form-item>
            </div>
          </div>
          <div>
            <p class="ml-4 my-2">原风貌图片</p>
            <el-alert
              style="background-color: transparent; margin-bottom: 10px"
              title="需要上传5张以上图片，否则将无法提交项目申请。"
              type="warning"
              show-icon
            >
            </el-alert>
            <el-form-item :rules="rule.upload" prop="imagesArr">
              <UploadImg
                :data="imageList"
                @add="onImageAdd"
                @remove="onImageRemove"
              />
            </el-form-item>
          </div>
          <div class="text-right">
            <el-button plain @click="$router.back()">取消</el-button>
            <el-button type="primary" @click="toForm2">下一步</el-button>
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
            />
          </el-form-item>
          <div class="text-right">
            <el-button plain @click="active = 0">上一步</el-button>
            <el-button type="primary" @click="toForm3">下一步</el-button>
          </div>
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
              <el-input-number
                class="input"
                v-model="form3.tileRepairNum"
                placeholder="请输入"
                :controls="false"
                :min="0"
              />
            </el-form-item>
            <el-form-item
              class="inline-block"
              label="顶瓦修补面积（200-1000㎡）："
              :rules="rule.input"
              prop="tileRepairArea"
            >
              <el-input-number
                class="input"
                v-model="form3.tileRepairArea"
                placeholder="请输入"
                :controls="false"
                :min="200"
                :max="1000"
              />
            </el-form-item>
            <el-form-item
              class="inline-block"
              label="墙体加固幢数："
              :rules="rule.input"
              prop="wallRepairNum"
            >
              <el-input-number
                class="input"
                v-model="form3.wallRepairNum"
                placeholder="请输入"
                :controls="false"
                :min="0"
              />
            </el-form-item>
          </div>
          <div>
            <el-form-item
              class="inline-block"
              label="墙体加固面积（200-1000㎡）："
              :rules="rule.input"
              prop="wallRepairArea"
            >
              <el-input-number
                class="input"
                v-model="form3.wallRepairArea"
                placeholder="请输入"
                :controls="false"
                :min="200"
                :max="1000"
              />
            </el-form-item>
            <el-form-item
              class="inline-block"
              label="立面改造幢数："
              :rules="rule.input"
              prop="faceReformNum"
            >
              <el-input-number
                class="input"
                v-model="form3.faceReformNum"
                placeholder="请输入"
                :controls="false"
                :min="0"
              />
            </el-form-item>
            <el-form-item
              class="inline-block"
              label="立面改造面积（200-1500㎡）："
              :rules="rule.input"
              prop="faceReformArea"
            >
              <el-input-number
                class="input"
                v-model="form3.faceReformArea"
                placeholder="请输入"
                :controls="false"
                :min="200"
                :max="1500"
              />
            </el-form-item>
          </div>
          <div>
            <el-form-item
              class="inline-block"
              label="构件修复幢数："
              :rules="rule.input"
              prop="componentRepairNum"
            >
              <el-input-number
                class="input"
                v-model="form3.componentRepairNum"
                placeholder="请输入"
                :controls="false"
                :min="0"
              />
            </el-form-item>
            <el-form-item
              class="inline-block"
              label="构件修复个数（0-50个）："
              :rules="rule.input"
              prop="componentRepairQuantity"
            >
              <el-input-number
                class="input"
                v-model="form3.componentRepairQuantity"
                placeholder="请输入"
                :controls="false"
                :min="0"
                :max="50"
              />
            </el-form-item>
            <el-form-item
              class="inline-block"
              label="异地迁入幢数："
              :rules="rule.input"
              prop="moveInNum"
            >
              <el-input-number
                class="input"
                v-model="form3.moveInNum"
                placeholder="请输入"
                :controls="false"
                :min="0"
              />
            </el-form-item>
          </div>
          <div>
            <el-form-item
              class="inline-block"
              label="异地迁入面积："
              :rules="rule.input"
              prop="moveInArea"
            >
              <el-input-number
                class="input"
                v-model="form3.moveInArea"
                placeholder="请输入"
                :controls="false"
                :min="0"
              />
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
              <el-input-number
                class="input"
                v-model="form3.clashFaceReformNum"
                placeholder="请输入"
                :controls="false"
                :min="0"
              />
            </el-form-item>
            <el-form-item
              class="inline-block"
              label="立面改造面积（0-4000㎡）："
              :rules="rule.input"
              prop="clashFaceReformArea"
            >
              <el-input-number
                class="input"
                v-model="form3.clashFaceReformArea"
                placeholder="请输入"
                :controls="false"
                :min="0"
                :max="4000"
              />
            </el-form-item>
            <el-form-item
              class="inline-block"
              label="结构降层幢数："
              :rules="rule.input"
              prop="structureNum"
            >
              <el-input-number
                class="input"
                v-model="form3.structureNum"
                placeholder="请输入"
                :controls="false"
                :min="0"
              />
            </el-form-item>
          </div>
          <div>
            <el-form-item
              class="inline-block"
              label="结构降层面积（0-2000㎡）："
              :rules="rule.input"
              prop="structureArea"
            >
              <el-input-number
                class="input"
                v-model="form3.structureArea"
                placeholder="请输入"
                :controls="false"
                :min="0"
                :max="2000"
              />
            </el-form-item>
            <el-form-item
              class="inline-block"
              label="整体拆除面积（0-2000㎡）："
              :rules="rule.input"
              prop="demolishArea"
            >
              <el-input-number
                class="input"
                v-model="form3.demolishArea"
                placeholder="请输入"
                :controls="false"
                :min="0"
                :max="2000"
              />
            </el-form-item>
            <el-form-item
              class="inline-block"
              label="异地搬迁户数："
              :rules="rule.input"
              prop="moveFamilyNum"
            >
              <el-input-number
                class="input"
                v-model="form3.moveFamilyNum"
                placeholder="请输入"
                :controls="false"
                :min="0"
              />
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
              <el-input-number
                class="input"
                v-model="form3.landUseArea"
                placeholder="请输入"
                :controls="false"
                :min="0"
                :max="15"
              />
            </el-form-item>
            <el-form-item
              class="inline-block"
              label="安置户数（0-100户）："
              :rules="rule.input"
              prop="placementFamilyNum"
            >
              <el-input-number
                class="input"
                v-model="form3.placementFamilyNum"
                placeholder="请输入"
                :controls="false"
                :min="0"
                :max="100"
              />
            </el-form-item>
            <el-form-item
              class="inline-block"
              label="基本公建设施投资总额（1-5万/户）："
              :rules="rule.input"
              prop="totalInvestment"
            >
              <el-input-number
                class="input"
                v-model="form3.totalInvestment"
                placeholder="请输入"
                :controls="false"
                :min="1"
                :max="50000"
              />
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
              <el-input-number
                class="input"
                v-model="form3.oldWayArea"
                placeholder="请输入"
                :controls="false"
                :min="0"
                :max="50000"
              />
            </el-form-item>
            <el-form-item
              class="inline-block"
              label="古道里程（0-5公里）："
              :rules="rule.input"
              prop="oldWayMileage"
            >
              <el-input-number
                class="input"
                v-model="form3.oldWayMileage"
                placeholder="请输入"
                :controls="false"
                :min="0"
                :max="5"
              />
            </el-form-item>
          </div>
          <div class="text-right">
            <el-button plain @click="active = 1">上一步</el-button>
            <el-button type="primary" @click="submit">提交</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import rule from "@/mixins/rule";
import _ from "lodash";
import {
  getProjectDetail,
  createProject,
  modifyProject,
  getAddress,
} from "@/api/projectDeclare";

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
      imageList: [], // 回显图片
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
      projectTypeList: [
        { value: 30001, label: "修缮" },
        { value: 30002, label: "扩建" },
        { value: 30003, label: "开发利用" },
      ],
      projectAddressList: [],
    };
  },
  computed: {
    totalFee() {
      const countFee = [
        "provinceFee",
        "cityFee",
        "countryFee",
        "villageFee",
        "bankFee",
        "otherFee",
      ];
      const total = countFee.reduce((pre, next) => {
        return Number(pre || 0) + Number(this.form1[next] || 0);
      }, 0);
      return isNaN(total) ? "--" : total;
    },
  },
  created() {
    this.type = this.$route.query.type;
    this.id = this.$route.query.id;
    this.getAddress();
    this.getDetail();
  },
  methods: {
    async getAddress() {
      this.projectAddressList = await getAddress();
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
      this.imageList = _.cloneDeep(this.detail.baseInfo.imagesFilesList);
    },
    onImageAdd(file) {
      this.form1.imagesArr.push(file);
    },
    onImageRemove(file) {
      const index = this.form1.imagesArr.findIndex((item) => {
        return item.uid === file.uid || item.filePath === file.url;
      });
      if (index !== -1) {
        this.form1.imagesArr.splice(index, 1);
      }
    },
    toForm2() {
      this.$refs.form1.validate(async (valid) => {
        if (valid) {
          this.active = 1;
        } else {
          this.$message.warning("请完善表单数据");
        }
      });
    },
    toForm3() {
      this.$refs.form2.validate(async (valid) => {
        if (valid) {
          this.active = 2;
        } else {
          this.$message.warning("请完善表单数据");
        }
      });
    },
    async submit() {
      this.$refs.form3.validate(async (valid) => {
        if (valid) {
          this.$myConfirm({
            content: "是否确认提交",
          }).then(async () => {
            const form = {
              baseInfo: _.cloneDeep(this.form1),
              feasibleInfo: _.cloneDeep(this.form2),
              checkListInfo: _.cloneDeep(this.form3),
            };
            // 图片数组处理
            form.baseInfo.imagesArr = form.baseInfo.imagesArr.map(
              (item) => item.fileId
            );
            try {
              if (this.type === "add") {
                await createProject(form);
              } else {
                form.id = this.id;
                await modifyProject(form);
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
::v-deep .el-input-number .el-input__inner {
  text-align: left;
}
</style>
