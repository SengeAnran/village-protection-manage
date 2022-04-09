<template>
  <div class="block">
    <RouterBack>详情</RouterBack>
    <el-form
      style="padding-left: 14px"
      ref="form"
      class="form"
      label-position="top"
      :model="form"
      label-width="80px"
    >
      <div class="input-item-wrp">
        <el-form-item label="地址" prop="villageId">
          <p class="content">{{ form.town }}{{ form.villageName }}</p>
        </el-form-item>
        <el-form-item label="场馆名称" prop="countrySortNum">
          <p class="content">{{ form.countrySortNum }}</p>
        </el-form-item>
        <el-form-item label="开放时间" prop="resPopulation">
          <p class="content">{{ form.startTime.slice(0,7) }} 至 {{ form.endTime.slice(0,7) }}</p>
        </el-form-item>
        <el-form-item label="联系电话" prop="resPopulation">
          <p class="content">{{ form.phone }}</p>
        </el-form-item>
      </div>
      <div>
        <div class="input-item-wrp">
          <el-form-item label="场馆介绍" prop="introduction">
            <p class="content">{{ form.basicText }}</p>
          </el-form-item>
        </div>
        <div class="input-item-wrp">
          <el-form-item label="照片：" prop="introduction">
            <div v-if="form.annexFiles && form.annexFiles.length > 0">
              <p class="content fu-file" v-for="(item, index) in form.annexFiles" :key="index">
                <a :href="item.filePath">
                  <i class="el-icon-link"></i>
                  <span>
                    {{ item.fileName }}
                  </span>
                </a>
              </p>
            </div>

          </el-form-item>
        </div>
      </div>
    </el-form>
    <div class="bottom-btns">
      <el-button @click="$router.back()">返回</el-button>
      <el-button type="primary" @click="edit">编辑</el-button>
    </div>
  </div>
</template>

<script>

import { getVillageItemDetail } from "@/api2/villageManage";
import { mapGetters } from "vuex";

export default {
  components: {
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
  },
  computed: {
    ...mapGetters(["userInfo", "declareType"]),
    roleId() {
      return this.userInfo.roleId;
    },
  },
  created() {
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const { id  } = this.$route.query;
      if (!id) return;
      getVillageItemDetail({ id }).then((res) => {
        this.form = res;
        this.finalStatus = res.finalStatus;
        console.log(res);
      });
    },
    edit() {
      const { id  } = this.$route.query;
      if (!id) return;
      this.$router.push({
        path: "/venueReservation/new",
        query: {
          id: id,
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
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

}
.bottom-btns {
 text-align: center;
}

</style>