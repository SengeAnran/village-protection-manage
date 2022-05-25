<template>
  <div  class="block">
    <div class="block">
      <RouterBack>详情</RouterBack>
      <div class="box-title">未来乡村项目进度报送</div>
      <el-form
        style="padding-left: 14px"
        ref="form"
        class="form"
        label-position="top"
        :model="form"
        label-width="80px"
      >
        <div class="input-item-wrp">
          <el-form-item label="创建村/片区名称" prop="villageId">
            <p class="content">{{ form.town }}{{ form.villageName }}</p>
          </el-form-item>
          <el-form-item label="创建批次" prop="declarationBatch">
            <p class="content">{{ form.declarationBatch }}</p>
          </el-form-item>
          <el-form-item label="总投资（万元）" prop="investNum">
            <p class="content">{{ form.investNum }}</p>
          </el-form-item>
          <el-form-item label="请输入总投资（万元）" prop="resPopulation">
            <p class="content">{{ form.startTime.slice(0,7) }} 至 {{ form.endTime.slice(0,7) }}</p>
          </el-form-item>
          <el-form-item label="领办领导">
            <p class="content">{{ form.leader }}</p>
          </el-form-item>
          <el-form-item label="联系人">
            <p class="content">{{ form.contactPerson }}</p>
          </el-form-item>
          <el-form-item label="联系方式" prop="resPopulation">
            <p class="content">{{ form.phone }}</p>
          </el-form-item>
        </div>
        <el-form-item>
          <div class="import">
            <el-button type="primary" @click="dialogVisible = true" >历史数据</el-button>
          </div>
          <VilliageListTable
            :data="form.projects"
            :hiddenEdit="false"
            :hiddenDetail="true"
            hiddenOperation
          />
        </el-form-item>
        <div id="verify"></div>
        <el-button @click="$router.back()">返回</el-button>
      </el-form>
    </div>
    <el-dialog
      title="详情"
      :visible.sync="dialogVisible"
      width="90%"
    >
      <VilliageListTable
        :data="form.projects"
        :hiddenEdit="true"
        :hiddenDetail="true"
        @remove="removeListItem"
        @editForm="editListItem"
        @moveUp="moveUpItem"
        @moveDown="moveDownItem"
      />
    </el-dialog>
  </div>
</template>
<script>
import VilliageListTable from "../Components/VilliageListTable";
import rule from "@/mixins/rule";
import { HISTORY_BUILDINGS } from "../constants";
import { getVillageItemDetail, getvillageDetailExport,
   verify,
} from "@/api2/villageManage";
import { downloadFile } from "@/utils/data"
import { mapGetters } from "vuex";

export default {
  mixins: [rule],
  components: {
    VilliageListTable,
  },
  data() {
    return {
      form: {
        annexFiles: [], // 附件
        cityAuditFile: [], // 附件
        provinceAuditFile: [], // 附件
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
      reviewForm: {
        status: null,
        opinion: '',
        processFilesArr: [],
      },
      finalStatus: null,
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
      return this.userInfo.roleId;
    },
  },
  created() {
    this.historyBuildings = HISTORY_BUILDINGS;
  },
  mounted() {
    this.init();
    //console.log(this.declareType);
  },
  methods: {
    onFileAdd(file, key) {
      this.reviewForm[key].push(file);
    },
    onFileRemove(file, key) {
      const index = this.reviewForm[key].findIndex((item) => {
        return item.uid === file.uid || item.filePath === file.url;
      });
      if (index !== -1) {
        this.reviewForm[key].splice(index, 1);
      }
    },
    validateForm() {
      this.$refs["reviewForm"].validate((valid) => {
        if (valid) {
          this.submit();
        } else {
          return false;
        }
      });
    },


    init() {
      const { id, verifyKey, verifyDetail } = this.$route.query;
      if (verifyKey) {
        this.verifyKey = verifyKey;
      }
      if (verifyDetail) {
        //console.log(verifyDetail);
        this.textarea = verifyDetail.opinion;
        this.status = verifyDetail.status;
        //console.log(this.textarea);
      }
      if (!id) return;
      getVillageItemDetail({ id }).then((res) => {
        this.form = res;
        this.finalStatus = res.finalStatus;
        //console.log(res);
      });
    },
    async clickExport() {
      const { id } = this.$route.query;
      const res = await getvillageDetailExport({id})
      downloadFile(res, "浙江省未来乡村创建申报表", "application/msword")
    },
    countTotal() {
      return HISTORY_BUILDINGS.reduce((pre, next) => {
        return pre + this.form[next.value];
      }, 0);
    },
    verifyRes(index) {
      switch (index) {
        case 0 : return '不通过';
        case 1 : return '通过';
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
      //console.log(this.reviewForm.processFilesArr);
      const { id } = this.$route.query;
      await verify({
        id: id, // 村庄id
        fileId: this.reviewForm.processFilesArr.map(i => i.fileId).toString(), // 审核意见附件id
        status: this.reviewForm.status, // 审核状态 通过:1 不通过:0
        opinion: this.reviewForm.opinion, // 审核意见
        verifyType: this.roleId === 2 ? 1 : 2, //1:市级审核，2：省级审核
      });
      this.$notify.success("操作成功");
      this.$router.back();
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
.import {
  width: 90%;
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
  margin-bottom: 12px;
}
</style>
