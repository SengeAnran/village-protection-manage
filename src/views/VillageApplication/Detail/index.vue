<template>
  <div>
    <div class="clearfix export">
      <el-button class="export-button" @click="clickExport">导出</el-button>
    </div>
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
        <el-form-item style="margin-bottom: 32px" class="villageAdress" label="村庄地址" prop="villageId">
          <p class="content" style="height: 22px;font-size: 16px;font-weight: 400;color: #333333;line-height: 22px;">
            {{ form.address }}
          </p>
<!--          <p class="content">{{ form.address }}{{ form.villageName }}</p>-->
        </el-form-item>

        <h4 class="block-tit" style="margin-bottom: 20px">重点村古建筑调查表</h4>
        <div class="input-item-wrp">
          <el-form-item label="当年户籍人口（人）" prop="population">
            <p class="content">{{ form.population }}</p>
          </el-form-item>
          <el-form-item label="当年村集体经济收入（万元）" prop="income">
            <p class="content">{{ form.income }}</p>
          </el-form-item>
          <el-form-item label="古建筑村落年代" prop="villageAge">
            <p class="content">{{ form.villageAge }}</p>
          </el-form-item>
          <el-form-item label="当年常住人口（人）" prop="resPopulation">
            <p class="content">{{ form.resPopulation }}</p>
          </el-form-item>
          <el-form-item label="是否历史文化名村">
            <p class="content">{{ conversionLeve(form.isFamous) }}</p>
          </el-form-item>
          <el-form-item label="是否一般村">
            <p class="content">{{ (form.isGeneral && "是") || "否" }}</p>
          </el-form-item>
          <el-form-item label="是否传统村">
            <p class="content">{{ conversionLeve(form.isTradition)}}</p>
          </el-form-item>
        </div>

        <h4 class="block-tit" style="margin-bottom: 20px">古建筑数量</h4>
        <div class="total-wrp"><span>总数：</span>{{ total }} 个</div>
        <div class="input-item-wrp">
          <el-form-item
            :label="item.label"
            v-for="(item, i) in historyBuildings"
            :key="i"
          >
            <p class="content">{{ form[item.value] }}</p>
          </el-form-item>
        </div>

<!--        <div v-if="form.declareType !== 1001">-->
        <div>
          <h4 class="block-tit" style="margin-bottom: 20px">推荐村简介</h4>
          <div class="input-item-wrp">
            <el-form-item label="推荐村简介" prop="introduction">
              <p class="content">{{ form.introduction }}</p>
            </el-form-item>
          </div>
          <h4 class="block-tit" style="margin-bottom: 20px">村庄图片</h4>
          <el-form-item label="村庄图片" prop="villagePicturesArr">
            <ViewImg :data="form.villagePicturesFiles" />
          </el-form-item>
        </div>
        <div v-if="!verifyKey">
          <h4 class="block-tit" style="margin-bottom: 20px">市级审核详情</h4>
          <div class="status">通过</div>
          <div class="opinion">请填写审核意见</div>
          <p></p>
        </div>
        <div v-if="roleId < 3 && verifyKey">
          <h4 class="block-tit" style="margin-bottom: 20px" v-html="roleId === 2 ? '审核' : '省级审核'"></h4>
          <el-form>
            <el-form-item label="">
              <el-radio v-model="status" label="1">通过</el-radio>
              <el-radio v-model="status" label="0">不通过</el-radio>
            </el-form-item>
          </el-form>
          <!--      <div style="margin-bottom: 24px">{{ tips }}</div>-->
          <div class="opinion">请填写审核意见</div>
          <el-input
            type="textarea"
            :rows="8"
            placeholder="请输入"
            v-model="textarea">
          </el-input>
          <div class="bottom-button">
            <el-button
              @click="$router.back()"
            >
              取消
            </el-button>
            <el-button type="primary" @click="onConfirm()" v-html="roleId === 2 ? '确定' : '提交'"></el-button>
          </div>
        </div>
      </el-form>
<!--      <div class="bottom-button">-->
<!--        <el-button-->
<!--          @click="$router.back()"-->
<!--        >-->
<!--            返回-->
<!--        </el-button>-->
<!--        <el-button-->
<!--          v-if="verifyKey"-->
<!--          type="primary"-->
<!--          @click="verify()"-->
<!--        >-->
<!--          审核-->
<!--        </el-button>-->
<!--      </div>-->
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
import rule from "@/mixins/rule";
import { HISTORY_BUILDINGS } from "../constants";
import { getVillageItemDetail, getvillageDetailExport,
  // verify,
} from "@/api/villageManage";
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
  data() {
    return {
      form: {
        villageId: "", //村庄地址
        population: "", // 人口数量
        income: "", //当年集体收入（万元）
        villageAge: "", //古建筑村落年代
        isFamous: "", //是否历史文化名村 0：否，1：省级，2：国家级
        // famousGrade: "", // 历史文化名村级别
        isGeneral: "", //是否一般村
        resPopulation: "", // 当年常住人口
        isTradition: "", // 是否传统村 0：否，1：省级，2：国家级
        // traditionGrade: "", // 传统村级别

        houseNum: "", //古民宅数量
        hallNum: "", //古祠堂数量
        stageNum: "", //古戏台数量
        archNum: "", //古牌坊数量
        bridgeNum: "", //古桥数量
        roadNum: "", //古道数量
        canalNum: "", //古渠数量
        barrageNum: "", //古堰坝数量
        wellNum: "", //古井泉数量
        streetNum: "", // 古街巷数量
        guildNum: "", //古会馆数量
        castleNum: "", //古城堡数量
        towerNum: "", //古塔数量
        templeNum: "", //古寺数量
        modernBuildingNum: "", //近现代建筑数量
        featureNum: "", //特色建材数量

        introduction: "", //introduction
        villagePicturesArr: [], //图片数组
        villagePicturesFiles: [], // 编辑表单时图片回显
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
    ...mapGetters(["userInfo"]),
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
  },
  methods: {
    init() {
      const { id, verifyKey, verifyDetail } = this.$route.query;
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

        this.total = this.countTotal();
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
        await verify({
          id: this.dialogId,
          status,
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
  .input-item-wrp {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 18px;

    ::v-deep .el-form-item {
      width: 31%;
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
    color: #333333;
    line-height: 22px;
  }
  .opinion {
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
    line-height: 22px;
    margin-bottom: 16px;
  }
  .bottom-button {
    padding: 32px 0px 20px;
    text-align: right;
  }
}

</style>
