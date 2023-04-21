<template>
  <div class="block">
    <div class="nav-root mb-4">
      <RouterBack>详情</RouterBack>
      <!--      <el-button class="export-button" @click="clickExport">导出</el-button>-->
    </div>
    <BaseBoxTitle>浙江省未来乡村创建申报表</BaseBoxTitle>
    <declaration-form :form="form"> </declaration-form>
    <div class="examine-result">
      <img v-if="finalStatus || finalStatus === 0" :src="require(`../imgs/${finalStatus}.png`)" alt="" />
    </div>
    <BaseBoxTitle>浙江省未来乡村创建方案</BaseBoxTitle>
    <p class="content mt-4 mb-10">
      <ViewFileSingle v-if="form.createScenario" :data="form.createScenario" />
      <span v-else>--</span>
    </p>
    <BaseBoxTitle>浙江省未来乡村创建项目备案表</BaseBoxTitle>
    <el-form style="padding-left: 14px" ref="form" class="form" label-position="top" :model="form" label-width="80px">
      <div class="form-base-info">
        <div class="location">{{ form.city + ' ' + form.name }}</div>
        <div class="item">
          <div class="item-label">填表人</div>
          <div class="item-value">{{ form.projectFilingPerson }}</div>
        </div>
        <div class="item">
          <div class="item-label">联系电话</div>
          <div class="item-value">{{ form.projectFilingPhone }}</div>
        </div>
        <div class="item">
          <div class="item-label">审核人</div>
          <div class="item-value">{{ form.projectFilingAudit }}</div>
        </div>
      </div>
      <el-form-item v-if="!loading">
        <VilliageListTable :data="form.projects" :hiddenEdit="false" :hiddenDetail="true" hiddenOperation />
      </el-form-item>
    </el-form>

    <div id="verify"></div>
    <!-- 审核详情 -->
    <!-- 市级审核详情。如果是市级角色，并且处于编辑模式则不展示此结果 -->
    <div
      v-if="
        ((cityVerify && !CITY && !CITY_LEADER && !PROVINCE) || !cityVerify) &&
        (finalStatus === FINAL_STATUS.PROVINCE_VERIFY_REJECTED || finalStatus === FINAL_STATUS.PROVINCE_VERIFY_PASSED)
      "
    >
      <BaseBoxTitle>省级审核</BaseBoxTitle>
      <el-form style="padding-left: 14px" ref="form" class="form" label-position="top" :model="form" label-width="80px">
        <!--          省级审核结果-->
        <div class="examine-item">
          <div class="input-item-wrp">
            <el-form-item label="审核结果" prop="introduction">
              <p class="content">{{ verifyRes(form.provinceVerify) }}</p>
            </el-form-item>
          </div>
          <div class="input-item-wrp" v-if="!form.provinceVerify && form.provinceOpinion">
            <!-- 省级通过时无意见，所以这里不展示。如果provinceOpinion有内容，可能为上次驳回时填写的驳回原因 -->
            <el-form-item label="审核意见" prop="introduction">
              <p class="content">{{ form.provinceOpinion }}</p>
            </el-form-item>
          </div>
          <div class="input-item-wrp">
            <el-form-item label="审核时间" prop="introduction">
              <p class="content">{{ form.provinceAuditTime }}</p>
            </el-form-item>
          </div>
        </div>
      </el-form>
      <div v-if="finalStatus === FINAL_STATUS.PROVINCE_VERIFY_PASSED && form.multipartFileVO" class="mb-2">
        <div class="box-title">扫描件下载</div>
        <div style="padding: 0 10px">
          <view-file :data="[form.multipartFileVO]"></view-file>
        </div>
      </div>
    </div>
    <!-- 表单展示逻辑。市级角色：市级待审核、市级待申报、省级已驳回；省级角色：省级待审核 -->
    <div
      v-if="
        cityVerify &&
        (((CITY || CITY_LEADER) &&
          (finalStatus === FINAL_STATUS.CITY_VERIFY_PENDING ||
            finalStatus === FINAL_STATUS.CITY_REPORT_PENDING ||
            finalStatus === FINAL_STATUS.PROVINCE_VERIFY_REJECTED)) ||
          (PROVINCE && finalStatus === FINAL_STATUS.PROVINCE_VERIFY_PENDING))
      "
    >
      <div class="box-title" v-text="PROVINCE ? '审核' : '设区市比选意见'" ref="review"></div>
      <el-form
        style="padding-left: 14px"
        ref="reviewForm"
        class="form"
        label-position="top"
        :model="reviewForm"
        label-width="80px"
      >
        <el-form-item :label="PROVINCE ? '审核结果' : '比选结果'" prop="status" :rules="rule.select">
          <el-radio-group v-model="reviewForm.status" :disabled="finalStatus === FINAL_STATUS.CITY_REPORT_PENDING">
            <el-radio :label="1">通过</el-radio>
            <el-radio :label="0">{{ PROVINCE ? '不通过' : '驳回' }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          v-if="PROVINCE && reviewForm.status === 0"
          label="不通过类型"
          prop="rejectType"
          :rules="rule.select"
        >
          <el-radio-group v-model="reviewForm.rejectType">
            <el-radio :label="2">驳回市级重填</el-radio>
            <el-radio :label="1">驳回县级重填</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          v-if="CITY || CITY_LEADER || reviewForm.status === 0"
          :label="CITY || CITY_LEADER ? '请填写比选意见' : '请填写审核意见'"
          prop="opinion"
          :rules="rule.input"
        >
          <el-input
            style="width: 42%"
            type="textarea"
            :rows="5"
            :placeholder="CITY || CITY_LEADER ? '请输入比选意见' : '请输入审核意见'"
            maxlength="300"
            show-word-limit
            v-model="reviewForm.opinion"
          >
          </el-input>
        </el-form-item>
        <el-form-item
          v-if="(CITY || CITY_LEADER) && reviewForm.status === 1"
          label="附件上传"
          :rules="rule.upload"
          prop="stampedFiles"
        >
          <UploadFile23
            tip="支持格式：.doc, .docx, .pdf"
            accept=".doc,.docx,.pdf"
            :limitSize="100"
            v-model="reviewForm.stampedFiles"
          />
          <p style="width: 100%; color: #ff6b00" class="py-4 leading-5">
            <i class="el-icon-warning"></i>请上传《未来乡村创建申报表》盖章扫描件
          </p>
        </el-form-item>
        <el-form-item style="text-align: center">
          <el-button @click="$router.back()">取消</el-button>
          <el-button type="primary" @click="validateForm">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-button v-if="showEdit()" class="edit-btn" type="primary" @click="handleEdit(form)">修改</el-button>
    <el-button v-if="showDelete()" class="edit-btn" type="danger" @click="returnCounty(form)">退回县级重填</el-button>
  </div>
</template>
<script>
import VilliageListTable from '../Components/VilliageListTable';
import DeclarationForm from '../Components/DeclarationForm';
import rule from '@/mixins/rule';
import role from '@/views2/mixins/role';
import { getVillageItemDetail, getvillageDetailExport, verify } from '@/api2/villageManage';
import { downloadFile } from '@/utils/data';
import { formatMoney } from '@/views2/utils/formatter';
import { FINAL_STATUS } from '@/views2/utils/constants';
import moment from 'moment';

export default {
  mixins: [rule, role],
  props: {
    type: {
      type: String,
      default: 'add',
    },
    data: {
      type: Object,
      default: () => {},
    },
    cityVerify: {
      // true，编辑模式。FALSE查看模式
      type: [String, Boolean],
      default: false,
    },
  },
  components: {
    VilliageListTable,
    DeclarationForm, // 申报表
  },
  data() {
    return {
      FINAL_STATUS,
      form: {
        annexFiles: [], // 附件
        cityAuditFile: [], // 附件
        stampedFile: null, // 附件
        provinceAuditFile: [], // 附件
        villageName: '', //村庄地址
        town: '', //村庄地址
        villageId: '', //村庄地址
        countrySortNum: '', //推荐次序
        declarationBatch: '', //申报批次
        startTime: '', //创建周期 开始
        endTime: '', //创建周期 结束
        leader: '', //领办领导
        construct: '', //建设单位
        contactPerson: '', // 联系人
        phone: '', //联系方式
        huNum: '', //户籍人口数（万人）
        personNum: '', //常住人口数（万人）
        investNum: '', //计划总投资（万元）
        incomeNum: '', //村级集体经济年经营性收入（万元）

        villageProperty: [], //村庄属性（可多选）

        basicText: '', //基本情况
        meetingText: '', //村民代表会议（村民会议）关于未来乡村建设方案决议情况
        meetingPic: [],
        townText: '', //乡、镇（街道）人民政府（办事处）意见
        departmentText: '', //县（市、区）部门审核意见
        governmentText: '', //县（市、区）人民政府意见
        projectFilingPerson: '', //填表人
        projectFilingPhone: '', //联系电话
        projectFilingAudit: '', //审核人
        projects: [], //项目列表
        richText: '23333', //
      },
      reviewForm: {
        status: null,
        rejectType: null,
        opinion: '',
        stampedFiles: {},
        stampedFile: '',
        // processFilesArr: [],
      },
      // stampedFilesDefault: [],
      finalStatus: null,
      // cityVerify: false,
      total: 0,

      tips: '',
      dialogVisible: false,
      dialogId: '',
      textarea: '',
      status: null,
      loading: true,
    };
  },
  watch: {
    type(val) {
      if (val === 'edit') {
        this.form = this.data;
      }
    },
    cityVerify(val) {
      console.log('cityVerify', val);
      if (val === true) {
        this.$nextTick(() => {
          this.init();
          this.$refs.review.scrollIntoView();
        });
      }
    },
  },
  mounted() {
    // console.log('xxxxxx --->', this.type);
    this.init();
  },
  methods: {
    formatMoney,
    validateForm() {
      this.$refs['reviewForm'].validate((valid) => {
        if (valid) {
          this.submit();
        } else {
          return false;
        }
      });
    },
    init() {
      // console.log('init');
      this.loading = true;
      const { id } = this.$route.query;
      if (!id) return;
      getVillageItemDetail({ id }).then((res) => {
        this.form = res;
        const meetingPic = (res.meetingPic || '')
          .split(',')
          .filter((ele) => Boolean(ele))
          .map((ele) => ({ filePath: ele }));
        this.finalStatus = res.finalStatus;
        if (this.CITY_LEADER || this.CITY) {
          if (this.cityVerify > 0 && res.cityOpinion !== '') {
            this.reviewForm.status = res.cityVerify;
            this.reviewForm.opinion = res.cityOpinion;
          }
        } else if (this.PROVINCE) {
          if (this.cityVerify > 0) {
            // this.reviewForm.status = res.provinceVerify;
            // this.reviewForm.opinion = res.provinceOpinion;
          }
        }
        const stampedFile = res.stampedFile;
        this.form.stampedFile = stampedFile;
        this.form.meetingPic = meetingPic;
        this.form.createScenario = res.createScenarioFile;
        this.reviewForm.stampedFiles = stampedFile ? stampedFile : {};
        this.loading = false;
        // console.log(this.form.stampedFile);
        //console.log(res);
      });
    },
    async clickExport() {
      const { id } = this.$route.query;
      const res = await getvillageDetailExport({ id });
      const time = moment().format('YYYY-MM-DD HH_mm_ss');
      const fileName = `浙江省未来乡村创建申报表${time}`;
      downloadFile(res, fileName, 'application/msword');
    },
    countTotal() {
      return HISTORY_BUILDINGS.reduce((pre, next) => {
        return pre + this.form[next.value];
      }, 0);
    },
    verifyRes(index) {
      switch (index) {
        case 0:
          return '不通过';
        case 1:
          return '通过';
        case -1:
          return '不通过';
        default:
          return '';
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
      if (this.status === '0' || this.status === '1') {
        this.dialogId = this.$route.query.id;
        this.submit();
        // this.dialogVisible = false;
      } else {
        this.$notify.error('请选择通过或不通过');
      }
    },
    async submit() {
      //console.log(this.reviewForm.processFilesArr);
      const { id } = this.$route.query;
      const { stampedFiles, status } = this.reviewForm;
      const stampedFile = (status && stampedFiles) || {};
      const verifyType = this.CITY || this.CITY_LEADER ? 1 : 2; //1:市级审核，2：省级审核
      await verify({
        id: id, // 村庄id
        status: status, // 审核状态 通过:1 不通过:0
        opinion: this.reviewForm.opinion, // 审核意见
        rejectType: this.reviewForm.rejectType, // 审核意见
        verifyType, //1:市级审核，2：省级审核
        stampedFile: stampedFile.fileId || undefined,
      });
      this.$notify.success('操作成功');
      this.$router.back();
    },
    // 市级审核修改
    goAuditVerify(data) {
      const { id } = data;
      this.$router.push({ name: 'villageDetails', query: { id: id, cityVerify: true } });
    },
    // 修改
    edit(data) {
      // console.log(data);
      const { id } = data;
      this.$router.push({
        name: 'newApplication',
        query: { id },
      });
    },
    // 修改
    handleEdit(data) {
      if (this.CITY || this.CITY_LEADER) {
        this.goAuditVerify(data);
      } else {
        this.edit(data);
      }
    },
    // 退回县级重填
    returnCounty(data) {
      console.log(data);
      this.$confirm('是否确认退回该条申报信息，退回后村庄已报\n' + '\n' + '送的项目调度信息将会自动删除，需重新调度', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          const { id } = this.$route.query;
          verify({
            id: id, // 村庄id
            status: 0, // 审核状态 通过:1 不通过:0
            opinion: '', // 审核意见
            rejectType: 1, // 审核意见
            verifyType: 2, //1:市级审核，2：省级审核
          }).then(() => {
            this.$message({
              type: 'success',
              message: '退回成功!',
            });
            this.$router.back();
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退回',
          });
        });
    },
    showEdit() {
      // 可修改逻辑：
      // 村级，县级： 县级待上报 || 市级驳回 || 省级驳回到县级
      // 市级： 省级驳回到市级且该页面为非编辑模式下 或 市级待上报状态
      if (
        ((this.VILLAGE || this.COUNTRY || this.COUNTRY_LEADER) &&
          (this.form.finalStatus === FINAL_STATUS.COUNTRY_REPORT_PENDING ||
            this.form.finalStatus === FINAL_STATUS.CITY_VERIFY_REJECTED ||
            (this.form.finalStatus === FINAL_STATUS.PROVINCE_VERIFY_REJECTED && this.form.rejectType === 1))) ||
        ((this.CITY || this.CITY_LEADER) &&
          ((this.form.finalStatus === FINAL_STATUS.PROVINCE_VERIFY_REJECTED &&
            this.form.rejectType === 2 &&
            !this.cityVerify) ||
            this.form.finalStatus === FINAL_STATUS.CITY_REPORT_PENDING))
      ) {
        return true;
      }
      return false;
    },
    showDelete() {
      // 可退回县级重填逻辑：
      // 省级： 省级审核通过
      if (this.PROVINCE && this.form.finalStatus === FINAL_STATUS.PROVINCE_VERIFY_PASSED) {
        return true;
      }
      return false;
    },
  },
};
</script>

<style lang="scss" scoped>
.edit-btn {
  //z-index: 10;
  //position: fixed;
  //bottom: 100px;
  //right: 70px;
}
.nav-root {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .export-button {
    flex-shrink: 0;
  }

  ::v-deep .router-back {
    margin-bottom: 0 !important;
  }
}
.box-title {
  height: 40px;
  background: #f5faff;
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
  right: 7px;
  top: 38px;
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
    line-height: 25px;
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
    color: #1492ff;
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
  .form-base-info {
    display: flex;
    margin-top: 27px;
    margin-bottom: 20px;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    line-height: 22px;
    .location {
      color: #333333;
    }
    .item {
      display: flex;
      margin-left: 48px;
      .item-label {
        color: #999999;
        margin-right: 24px;
      }
      .item-value {
        color: #333333;
      }
    }
  }
}
</style>
