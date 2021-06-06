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
            class="mr-4"
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
            >
              <el-date-picker
                v-model="form1.years"
                type="year"
                value-format="yyyy"
                placeholder="请选择"
              ></el-date-picker>
            </el-form-item>
            <el-form-item
              class="inline-block"
              label="项目类型："
              :rules="rule.select"
            >
              <el-select
                v-model="form1.projectType"
                placeholder="请选择"
              ></el-select>
            </el-form-item>
            <el-form-item
              class="inline-block"
              label="项目所在地："
              :rules="rule.select"
            >
              <el-select
                v-model="form1.address"
                placeholder="请选择"
              ></el-select>
            </el-form-item>
          </div>

          <div>
            <p class="ml-4 my-2">管理信息</p>
            <el-form-item
              class="inline-block"
              label="项目负责人："
              :rules="rule.input"
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
              :rules="rule.input"
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
              :rules="rule.input"
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
              :rules="rule.input"
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
              :rules="rule.input"
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
              >
                <el-input-number
                  class="input"
                  v-model="form1.otherFee"
                  placeholder="请输入"
                  :controls="false"
                  :min="0"
                />
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
            <el-form-item :rules="rule.upload">
              <UploadImg @add="onFileAdd" @remove="onFileRemove" />
            </el-form-item>
          </div>
          <div class="text-right">
            <el-button plain @click="$router.back()">取消</el-button>
            <el-button type="primary" @click="submit">下一表</el-button>
          </div>
        </el-form>

        <el-form
          v-show="active === 1"
          ref="form2"
          :model="form2"
          label-width="100px"
          label-position="top"
        >
          <el-form-item label="项目村概况：" :rules="rule.input">
            <el-input
              v-model="form2.v"
              type="textarea"
              placeholder="请输入"
              :rows="5"
            />
          </el-form-item>
          <el-form-item label="投资必要性分析：" :rules="rule.input">
            <el-input
              v-model="form2.v"
              type="textarea"
              placeholder="请输入"
              :rows="5"
            />
          </el-form-item>
          <el-form-item label="建设项目：" :rules="rule.input">
            <el-input
              v-model="form2.v"
              type="textarea"
              placeholder="请输入"
              :rows="5"
            />
          </el-form-item>
          <el-form-item label="建设方案：" :rules="rule.input">
            <el-input
              v-model="form2.v"
              type="textarea"
              placeholder="请输入"
              :rows="5"
            />
          </el-form-item>
          <el-form-item label="政府补助资金支持环节：" :rules="rule.input">
            <el-input
              v-model="form2.v"
              type="textarea"
              placeholder="请输入"
              :rows="5"
            />
          </el-form-item>
          <el-form-item label="社会效益分析：" :rules="rule.input">
            <el-input
              v-model="form2.v"
              type="textarea"
              placeholder="请输入"
              :rows="5"
            />
          </el-form-item>
          <div class="text-right">
            <el-button plain @click="active = 0">上一表</el-button>
            <el-button type="primary" @click="submit">下一表</el-button>
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
            >
              <el-input-number
                class="input"
                v-model="form3.v"
                placeholder="请输入"
                :controls="false"
                :min="0"
              />
            </el-form-item>
            <el-form-item
              class="inline-block"
              label="顶瓦修补面积（200-1000㎡）："
              :rules="rule.input"
            >
              <el-input-number
                class="input"
                v-model="form3.v"
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
            >
              <el-input-number
                class="input"
                v-model="form3.v"
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
            >
              <el-input-number
                class="input"
                v-model="form3.v"
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
            >
              <el-input-number
                class="input"
                v-model="form3.v"
                placeholder="请输入"
                :controls="false"
                :min="0"
              />
            </el-form-item>
            <el-form-item
              class="inline-block"
              label="立面改造面积（200-1500㎡）："
              :rules="rule.input"
            >
              <el-input-number
                class="input"
                v-model="form3.v"
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
            >
              <el-input-number
                class="input"
                v-model="form3.v"
                placeholder="请输入"
                :controls="false"
                :min="0"
              />
            </el-form-item>
            <el-form-item
              class="inline-block"
              label="构件修复个数（0-50个）："
              :rules="rule.input"
            >
              <el-input-number
                class="input"
                v-model="form3.v"
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
            >
              <el-input-number
                class="input"
                v-model="form3.v"
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
            >
              <el-input-number
                class="input"
                v-model="form3.v"
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
            >
              <el-input-number
                class="input"
                v-model="form3.v"
                placeholder="请输入"
                :controls="false"
                :min="0"
              />
            </el-form-item>
            <el-form-item
              class="inline-block"
              label="立面改造面积（0-4000㎡）："
              :rules="rule.input"
            >
              <el-input-number
                class="input"
                v-model="form3.v"
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
            >
              <el-input-number
                class="input"
                v-model="form3.v"
                placeholder="请输入"
                :controls="false"
                :min="0"
              />
            </el-form-item>
          </div>
          <div>
            <el-form-item
              class="inline-block"
              label="结构降层复个数（0-2000㎡）："
              :rules="rule.input"
            >
              <el-input-number
                class="input"
                v-model="form3.v"
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
            >
              <el-input-number
                class="input"
                v-model="form3.v"
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
            >
              <el-input-number
                class="input"
                v-model="form3.v"
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
            >
              <el-input-number
                class="input"
                v-model="form3.v"
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
            >
              <el-input-number
                class="input"
                v-model="form3.v"
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
            >
              <el-input-number
                class="input"
                v-model="form3.v"
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
            >
              <el-input-number
                class="input"
                v-model="form3.v"
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
            >
              <el-input-number
                class="input"
                v-model="form3.v"
                placeholder="请输入"
                :controls="false"
                :min="0"
                :max="5"
              />
            </el-form-item>
          </div>
          <div class="text-right">
            <el-button plain @click="active = 0">上一表</el-button>
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
      // 基本信息
      form1: {
        years: "",
        projectType: "",
        address: "",
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
      },
      // 可行性摘要
      form2: {
        v: "",
      },
      // 建设项目清单
      form3: {
        v: undefined,
      },
      detail: {},
      active: 0,
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
::v-deep .el-input-number .el-input__inner {
  text-align: left;
}
</style>
