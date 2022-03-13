<template>
  <div>
    <div class="clearfix export">
      <el-button class="export-button" @click="clickExport">导出</el-button>
    </div>
    <div class="block">
      <RouterBack>详情</RouterBack>
      <div class="box-title">申报详情</div>
      <div class="examine-result">
        <img src="../imgs/pass.png" alt="">
      </div>
      <el-form
        style="padding-left: 14px"
        ref="form"
        class="form"
        label-position="top"
        :model="form"
        label-width="80px"
      >
        <div class="input-item-wrp">
          <el-form-item label="创建村名称" prop="villageId">
            <p class="content">{{ form.villageId }}</p>
          </el-form-item>
          <el-form-item label="推荐次序" prop="countrySortNum">
            <p class="content">{{ form.countrySortNum }}</p>
          </el-form-item>
          <el-form-item label="申报批次" prop="declarationBatch">
            <p class="content">{{ form.declarationBatch }}</p>
          </el-form-item>
          <el-form-item label="创建周期" prop="resPopulation">
            <p class="content">{{ form.startTime.slice(0,7) }} 至 {{ form.endTime.slice(0,7) }}</p>
          </el-form-item>
          <el-form-item label="领办领导">
            <p class="content">{{ form.leader }}</p>
          </el-form-item>
          <el-form-item label="建设单位">
            <p class="content">{{ form.construct }}</p>
          </el-form-item>
          <el-form-item label="联系人">
            <p class="content">{{ form.contactPerson }}</p>
          </el-form-item>
          <el-form-item label="联系方式" prop="resPopulation">
            <p class="content">{{ form.phone }}</p>
          </el-form-item>
          <el-form-item label="户籍人口数（万人）" prop="resPopulation">
            <p class="content">{{ form.huNum }}</p>
          </el-form-item>
          <el-form-item label="常住人口数（万人）" prop="resPopulation">
            <p class="content">{{ form.personNum }}</p>
          </el-form-item>
          <el-form-item label="计划总投资（万元）" prop="resPopulation">
            <p class="content">{{ form.investNum }}</p>
          </el-form-item>
          <el-form-item label="村级集体经济年经营性收入（万元）" prop="resPopulation">
            <p class="content">{{ form.incomeNum }}</p>
          </el-form-item>
          <el-form-item label="村庄属性：" prop="resPopulation">
            <p class="content">{{ form.villageProperty.toString() }}</p>
          </el-form-item>
        </div>
        <div>
          <div class="input-item-wrp">
            <el-form-item label="基本情况" prop="introduction">
              <p class="content">{{ form.basicText }}</p>
            </el-form-item>
          </div>
          <div class="input-item-wrp">
            <el-form-item label="村民代表会议（村民会议）关于未来乡村建设方案决议情况" prop="introduction">
              <p class="content">{{ form.meetingText }}</p>
            </el-form-item>
          </div>
          <div class="input-item-wrp">
            <el-form-item label="村民代表会议（村民会议）关于未来乡村建设方案决议情况" prop="introduction">
              <p class="content">{{ form.townText }}</p>
            </el-form-item>
          </div>
          <div class="input-item-wrp">
            <el-form-item label="乡、镇（街道）人民政府（办事处）意见" prop="introduction">
              <p class="content">{{ form.departmentText }}</p>
            </el-form-item>
          </div>
          <div class="input-item-wrp">
            <el-form-item label="县（市、区）部门审核意见" prop="introduction">
              <p class="content">{{ form.departmentText }}</p>
            </el-form-item>
          </div>
          <div class="input-item-wrp">
            <el-form-item label="县（市、区）人民政府意见" prop="introduction">
              <p class="content">{{ form.governmentText }}</p>
            </el-form-item>
          </div>
          <div class="input-item-wrp">
            <el-form-item label="附件：" prop="introduction">
              <p class="content fu-file">
                <a href="#">
                  <i class="el-icon-link"></i>
                  <span>
                    {{ form.introduction }}
                  </span>
                </a>
              </p>
              <p class="content fu-file">
              <a href="#">
                <i class="el-icon-link"></i>
                <span>
                    {{ form.introduction }}
                  </span>
              </a>
            </p>
            </el-form-item>
          </div>
        </div>
        <h4 class="block-tit">未来乡村创建项目备案表</h4>
        <div class="input-item-wrp">
          <el-form-item label="负责人" prop="resPopulation">
            <p class="content">{{ form.projectFilingPerson }}</p>
          </el-form-item>
          <el-form-item label="联系电话" prop="resPopulation">
            <p class="content">{{ form.projectFilingPhone }}</p>
          </el-form-item>
          <el-form-item label="审核人" prop="resPopulation">
            <p class="content">{{ form.projectFilingAudit }}</p>
          </el-form-item>
        </div>
        <el-form-item>
          <VilliageListTable
            :data="form.projects"
            :hiddenEdit="false"
            :hiddenDetail="true"
            hiddenOperation
          />
        </el-form-item>

<!--        <div v-if="form.cityVerify === 1 || form.cityVerify === 0" >-->
<!--          <h4 class="block-tit" style="margin-bottom: 20px">市级审核详情</h4>-->
<!--          <div-->
<!--            class="status"-->
<!--            :style="{ color: form.cityVerify === 1 ? '#15BE50' : '#D40000' }"-->
<!--            v-html="form.cityVerify === 1 ? '通过' : '不通过'"-->
<!--          ></div>-->
<!--          <div class="opinion">审核意见</div>-->
<!--          <p class="opinion-content">{{ form.cityOpinion }}</p>-->
<!--        </div>-->
<!--        <div v-if="form.provinceVerify === 1 || form.provinceVerify === 0">-->
<!--          <h4 class="block-tit" style="margin-bottom: 20px">省级审核详情</h4>-->
<!--          <div-->
<!--            class="status"-->
<!--            :style="{ color: form.provinceVerify === 1 ? '#15BE50' : '#D40000' }"-->
<!--            v-html="form.provinceVerify === 1 ? '通过' : '不通过'"-->
<!--          ></div>-->
<!--          <div class="opinion">审核意见</div>-->
<!--          <p>{{ form.provinceOpinion }}</p>-->
<!--        </div>-->
<!--        <div v-if="roleId < 3 && verifyKey">-->
<!--          <h4 class="block-tit" style="margin-bottom: 20px" v-html="roleId === 2 ? '审核' : '省级审核'"></h4>-->
<!--          <el-form>-->
<!--            <el-form-item label="">-->
<!--              <el-radio v-model="status" label="1">通过</el-radio>-->
<!--              <el-radio v-model="status" label="0">不通过</el-radio>-->
<!--            </el-form-item>-->
<!--          </el-form>-->
<!--          &lt;!&ndash;      <div style="margin-bottom: 24px">{{ tips }}</div>&ndash;&gt;-->
<!--          <div class="opinion">请填写审核意见</div>-->
<!--          <el-input-->
<!--            type="textarea"-->
<!--            :rows="8"-->
<!--            placeholder="请输入"-->
<!--            v-model="textarea">-->
<!--          </el-input>-->
<!--          <div class="bottom-button">-->
<!--            <el-button-->
<!--              @click="$router.back()"-->
<!--            >-->
<!--              取消-->
<!--            </el-button>-->
<!--            <el-button type="primary" @click="onConfirm()" v-html="roleId === 2 ? '确定' : '提交'"></el-button>-->
<!--          </div>-->
<!--        </div>-->
        <div id="verify"></div>
      </el-form>
      <!--        审核详情-->
      <div>
        <div class="box-title">审核详情</div>
        <el-form
          style="padding-left: 14px"
          ref="form"
          class="form"
          label-position="top"
          :model="form"
          label-width="80px"
        >
<!--          市级审核结果-->
          <div class="examine-item">
            <div class="examine-title">设市区比选意见</div>
            <div class="input-item-wrp">
              <el-form-item label="审核结果" prop="introduction">
                <p class="content">{{ form.introduction }}</p>
              </el-form-item>
            </div>
            <div class="input-item-wrp">
              <el-form-item label="审核意见" prop="introduction">
                <p class="content">{{ form.introduction }}</p>
              </el-form-item>
            </div>
            <div class="input-item-wrp">
              <el-form-item label="审核意见附件" prop="introduction">
                <p class="content fu-file">
                  <a href="#">
                    <i class="el-icon-link"></i>
                    <span>
                    {{ form.introduction }}
                  </span>
                  </a>
                </p>
              </el-form-item>
            </div>
            <div class="input-item-wrp">
              <el-form-item label="审核时间" prop="introduction">
                <p class="content">{{ form.introduction }}</p>
              </el-form-item>
            </div>
          </div>
<!--          省级审核结果-->
          <div class="examine-item">
            <div class="examine-title">省级审核详情</div>
            <div class="input-item-wrp">
              <el-form-item label="审核结果" prop="introduction">
                <p class="content">{{ form.introduction }}</p>
              </el-form-item>
            </div>
            <div class="input-item-wrp">
              <el-form-item label="审核意见" prop="introduction">
                <p class="content">{{ form.introduction }}</p>
              </el-form-item>
            </div>
            <div class="input-item-wrp">
              <el-form-item label="审核意见附件" prop="introduction">
                <p class="content fu-file">
                  <a href="#">
                    <i class="el-icon-link"></i>
                    <span>
                    {{ form.introduction }}
                  </span>
                  </a>
                </p>
              </el-form-item>
            </div>
            <div class="input-item-wrp">
              <el-form-item label="审核时间" prop="introduction">
                <p class="content">{{ form.introduction }}</p>
              </el-form-item>
            </div>
          </div>
        </el-form>
      </div>
      <div v-if="userInfo.roleId !== 3">
<!--      <div>-->
        <div class="box-title" v-text="userInfo.roleId === 1? '设市区比选意见':'审核'"></div>
        <el-form
          style="padding-left: 14px"
          ref="form"
          class="form"
          label-position="top"
          :model="form"
          label-width="80px"
        >
          <el-form-item label="审核结果" prop="population" :rules="rule.inputNumber">
            <el-radio-group v-model="form.population">
              <el-radio :label="3">通过</el-radio>
              <el-radio :label="6">不通过</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="请填写审核意见"
            prop="introduction"
            :rules="rule.input"
          >
            <el-input
              style="width: 42%"
              type="textarea"
              :rows="5"
              placeholder="请输入审核意见"
              v-model="form.introduction"
            >
            </el-input>
          </el-form-item>
          <el-form-item
            label="审核意见附件"
            :rules="rule.upload"
            prop="processFilesArr"
          >
            <UploadFile
              tip="支持格式：.doc, .docx, .pdf"
              accept=".doc,.docx,.pdf"
              :data="form.processFilesArr"
              @add="onFileAdd($event, 'processFilesArr')"
              @remove="onFileRemove($event, 'processFilesArr')"
            />
          </el-form-item>
          <el-form-item>
            <el-button  @click="$router.back()">取消</el-button>
            <el-button type="primary"  @click="validateForm">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-dialog
      title="审核"
      :visible.sync="dialogVisible"
      width="600px"
    >
      <el-form>
        <el-form-item label="">
          <el-radio v-model="status" label="1">通过</el-radio>
          <el-radio v-model="status" label="0">不通过</el-radio>
        </el-form-item>
        <el-form-item label="">
          <div class="opinion">请填写审核意见</div>
          <el-input
            type="textarea"
            :rows="8"
            placeholder="请输入内容"
            v-model="textarea">
          </el-input>
        </el-form-item>
      </el-form>
<!--      <div style="margin-bottom: 24px">{{ tips }}</div>-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="onConfirm()">取消</el-button>
        <el-button type="primary" @click="onConfirm()">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import VilliageListTable from "../Components/VilliageListTable";
import rule from "@/mixins/rule";
import { HISTORY_BUILDINGS } from "../constants";
import { getVillageItemDetail, getvillageDetailExport,
  provinceVerify,
} from "@/api2/villageManage";
import { downloadFile } from "@/utils/data"
import {mapGetters} from "vuex";

export default {
  mixins: [rule],
  props: {
    type: {
      type: String,
      default: "add",
    },
    data: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    VilliageListTable,
  },
  data() {
    return {
      form: {
        annexFiles: [], // 附件
        villageName: "", //村庄地址
        town: "", //村庄地址
        villageId: "", //村庄地址
        countrySortNum: "", //推荐次序
        declarationBatch: "", //申报批次
        startTime: "", //创建周期 开始
        endTime: "", //创建周期 结束
        leader: "", //领办领导
        construct: "", //建设单位
        contactPerson: "", // 联系人
        phone: "", //联系方式
        huNum: "", //户籍人口数（万人）
        personNum: "", //常住人口数（万人）
        investNum: "", //计划总投资（万元）
        incomeNum: "", //村级集体经济年经营性收入（万元）

        villageProperty: [], //村庄属性（可多选）

        basicText: "", //基本情况
        meetingText: "", //村民代表会议（村民会议）关于未来乡村建设方案决议情况
        townText: "", //乡、镇（街道）人民政府（办事处）意见
        departmentText: "", //县（市、区）部门审核意见
        governmentText: "", //县（市、区）人民政府意见
        projectFilingPerson: "", //填表人
        projectFilingPhone: "", //联系电话
        projectFilingAudit: "", //审核人
        projects: [], //项目列表
      },

      total: 0,

      tips: "",
      dialogVisible: false,
      dialogId: "",
      textarea: "",
      status: null,
      verifyKey: false,
    };
  },
  watch: {
    type(val) {
      if (val === "edit") {
        this.form = this.data;
      }
    },
  },
  computed: {
    ...mapGetters(["userInfo", "declareType"]),
    roleId() {
      console.log(this.userInfo.roleId);
      return this.userInfo.roleId;
    },
  },
  created() {
    this.historyBuildings = HISTORY_BUILDINGS;
  },
  mounted() {
    this.init();
    console.log(this.declareType);
  },
  methods: {
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
    validateForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.submit(this.form);
        } else {
          return false;
        }
      });
    },


    init() {
      const { id, verifyKey, verifyDetail, goVerify } = this.$route.query;
      if (verifyKey) {
        this.verifyKey = verifyKey;
      }
      if (verifyDetail) {
        console.log(verifyDetail);
        this.textarea = verifyDetail.opinion;
        this.status = verifyDetail.status;
        console.log(this.textarea);
      }
      if (!id) return;
      getVillageItemDetail({ id }).then((res) => {
        this.form = res;
        console.log(res);
        this.total = this.countTotal();
        if (goVerify) {
          // setTimeout(() => {
          //   this.$el.querySelector("#verify").scrollIntoView();
          // },10)
        }
      });
    },
    async clickExport() {
      const { id } = this.$route.query;
      const res = await getvillageDetailExport({id})
      downloadFile(res,'古建筑村落调查表')
    },
    countTotal() {
      return HISTORY_BUILDINGS.reduce((pre, next) => {
        return pre + this.form[next.value];
      }, 0);
    },
    conversionLeve(index) {
      switch (index) {
        case 0 : return '否';
        case 1 : return '是，省级';
        case 2 : return '是，国家级';
        default: return ''
      }
    },
    verify() {
      // this.tips = "请填写审核意见";
        // this.userInfo.roleId === 1
        //   ? "是否通过该项目审核？"
        //   : "是否通过该项目审核，若审核通过则项目提交至省级。";
      // this.textarea = "";
      this.dialogId = this.$route.query.id;
      this.dialogVisible = true;

    },
    onConfirm() {
      if (this.status === "0" || this.status === "1") {
        this.dialogId = this.$route.query.id;
        this.submit();
        // this.dialogVisible = false;
      } else {
        this.$notify.error("请选择通过或不通过");
      }
    },
    async submit() {
      // console.log(status);
      // this.$emit('endVerify',{ status: status, id:this.dialogId, opinion: this.textarea })
      // await verify({
      //   id: this.dialogId,
      //   status,
      //   opinion: this.textarea,
      //   // remark: this.textarea,
      // });
      if (this.roleId === 2) {
        this.$notify.success("操作成功");
        // this.$router.back();
        this.$router.push({
          name: "audit",
          query: {
            verifyDetail: {
              status: this.status,
              id: this.dialogId,
              opinion: this.textarea,
            },
          },
        });
      } else {
        await provinceVerify({
          id: this.dialogId,
          status: this.status,
          opinion: this.textarea,
          // remark: this.textarea,
        });
        this.$notify.success("操作成功");
        this.$router.back();
      }
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
.box-title {
  height: 40px;
  background: #F5FAFF;
  line-height: 40px;
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
  padding-left: 20px;
  margin-bottom: 13px;
}
.examine-result {
  position: absolute;
  right: 40px;
  top: 140px;
}
.form {
  max-width: 1600px;
  padding-left: 8px;
  .villageAdress {
    ::v-deep .el-form-item__label {
      color: #999;
      font-size: 16px;
    }

  }
  .block-tit {
    margin-top: 18px;
    margin-bottom: 2px;
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
    line-height: 25px
  }

  .input {
    width: 31%;
    flex-shrink: 0;
  }
  .total-wrp {
    color: #333333;
    & span {
      color: #606266;
      line-height: 40px;
      padding: 0 2px 0 0;
    }
  }
  .examine-item {
    margin-bottom: 14px;
    .examine-title {
      font-size: 18px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #333333;
      line-height: 25px;
      margin-bottom: 20px;
    }
  }
  .input-item-wrp {
    display: flex;
    flex-wrap: wrap;
    //margin-bottom: 18px;

    ::v-deep .el-form-item {
      width: 40%;
      flex-shrink: 0;
      margin-right: 20px;
      .el-form-item__label {
        color: #999;
        font-size: 16px;
      }
    }
  }
  .content {
    font-size: 16px;
    color: #666666;
    font-weight: 400;
    line-height: 22px;
  }
  .fu-file {
    cursor: pointer;
    margin: 8px 0;
    span {
      margin-left: 4px;
    }
  }
  .fu-file:hover {
    color: #1492FF;
  }
  .status {
    margin-bottom: 20px;
  }
  .opinion {
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
    line-height: 22px;
    margin-bottom: 16px;
  }
  .opinion-content {
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    line-height: 22px;
  }
  .bottom-button {
    padding: 32px 0px 20px;
    text-align: right;
  }
}

</style>
