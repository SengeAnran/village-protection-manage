<template>
  <div>
    <el-form
      ref="form"
      class="form"
      label-position="top"
      :model="form"
      label-width="80px"
    >
      <h3 class="text-gray-800 text-2xl mb-8">新建申报</h3>

      <el-form-item label="村庄地址" prop="villageId" :rules="rule.select">
        <el-select
          v-model="form.villageId"
          placeholder="请选择"
          @change="changeAddress"
        >
          <el-option
            v-for="item in villageList"
            :key="item.villageId"
            :label="item.villageName"
            :value="item.villageId"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <h4 class="block-tit">重点村古建筑调查表</h4>
      <VillageBaseForm class="input-item-wrp" :form="form" disabled />

      <div class="block-tit">
        古建筑数量（处）
        <div style="display: inline-block">
          <el-popover
            placement="top-start"
            title=""
            width="200"
            trigger="hover"
            content="“处”是指相对独立存在古建筑的数量单位，连为一体的几幢古建筑视为一处（如四合院就为一处），以下填报想总数与其中数之和相等，总数在 10 处以上。">
            <div slot="reference" style="display: inline-block;width: 0.8rem; height: 0.8rem" >
              <img src="../Components/img/u15.png" alt="">
            </div>
          </el-popover>
        </div>
      </div>
      <div class="total-wrp"><span>总数：</span>{{ total }} 个</div>
      <VillageHistoryBuildingForm
        class="input-item-wrp"
        :form="form"
        disabled
      />

      <h4 class="block-tit">推荐村简介</h4>
      <div>
        <el-form-item
          label="推荐村简介"
          prop="introduction"
          :rules="rule.input"
        >
          <el-input
            style="width: 42%"
            type="textarea"
            :rows="5"
            placeholder="请输入"
            maxlength="500"
            show-word-limit
            v-model="form.introduction"
          >
          </el-input>
          <p style="width: 42%; color: #999" class="py-4 leading-5">
            要求：1、标题简炼，特色鲜明；2、简介内容包含村庄基本概况、古建状况、人文底蕴；3、文字精炼、彰显其历史文化价值和保护利用价值这两个价值的必要性。
          </p>
        </el-form-item>
        <h4 class="block-tit">村庄图片</h4>
        <el-form-item prop="villagePicturesArr" :rules="imgRule">
          <p style="color: #ff6b00" class="py-3">
            <i class="el-icon-warning"></i>
            需要上传5张以上图片，包括村庄全景图、重要古建筑全景图及珍贵构件细节图，否则将影响申报结果。
          </p>
          <UploadImg
            :data="imageList"
            @add="onImageAdd"
            @remove="onImageRemove"
          />
        </el-form-item>

        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </div>
    </el-form>

    <div>
      <el-button @click="$emit('close')">取消</el-button>
      <el-button type="primary" @click="validateForm">提交</el-button>
    </div>
  </div>
</template>
<script>
import rule from "@/mixins/rule";
import VillageBaseForm from "../Components/VillageBaseForm";
import VillageHistoryBuildingForm from "../Components/VillageHistoryBuildingForm";

import { VILLAGE_LIST_ROUTER_NAME, HISTORY_BUILDINGS } from "../constants";
import { getCanPromoteList } from "@/api/villageManage";

const imgs = (rule, value, callback) => {
  if (value.length < 5) {
    callback(new Error("需要上传5张以上图片"));
  } else {
    callback();
  }
};

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
    // VillageAddressSelect,
    VillageBaseForm,
    VillageHistoryBuildingForm,
  },
  data() {
    return {
      form: {
        villageId: "", //村庄地址
        population: "", // 人口数量
        income: "", //当年集体收入（万元）
        villageAge: "", //古建筑村落年代
        isFamous: "", //是否历史文化名村
        isGeneral: "", //是否一般村
        resPopulation: "", // 当年常住人口
        isTradition: "", // 是否传统村 0：否，1：省级，2：国家级

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
        other: "", //其他

        introduction: "", //introduction
        villagePicturesArr: [], //图片数组
        villagePicturesFiles: [],
      },

      parentRouteName: VILLAGE_LIST_ROUTER_NAME[1003],

      dialogImageUrl: "",
      dialogVisible: false,
      imageList: [], // 回显图片
      imgRule: { required: true, validator: imgs, trigger: "change" },

      villageList: [], // 可提升村庄列表
    };
  },

  computed: {
    total() {
      return HISTORY_BUILDINGS.reduce((pre, next) => {
        return pre + this.form[next.value];
      }, 0);
    },
  },
  watch: {
    type(val) {
      if (val === "edit") {
        this.form = this.data;
        this.imageList = [...this.data.villagePicturesFiles];
      }
    },
  },
  mounted() {
    if (this.type === "edit") {
      this.form = this.data;
      this.imageList = [...this.data.villagePicturesFiles];
    }
  },
  created() {
    this.getVillageList();
  },
  methods: {
    getVillageList() {
      getCanPromoteList().then((res) => {
        this.villageList = res;
      });
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

    // 新增申报item
    submit(params) {
      this.$emit("add", params);
    },

    // 选择村庄地址
    changeAddress(val) {
      const info = this.villageList.find((item) => item.villageId === val);
      const form = this.form;
      Object.keys(form).forEach((key) => {
        form[key] = info[key];
      });
      const { villageName, address } = info;
      this.form.villageName = villageName;
      this.form.address = address;
    },

    onImageAdd(res) {
      if (!this.form.villagePicturesArr) {
        this.form.villagePicturesArr = [];
      }
      if (!this.form.villagePicturesFiles) {
        this.form.villagePicturesFiles = [];
      }

      this.form.villagePicturesArr.push(res.fileId);
      this.form.villagePicturesFiles.push(res);

      this.$refs.form.validateField("villagePicturesArr");
    },
    onImageRemove(res) {
      const index = this.form.villagePicturesFiles.findIndex((list) => {
        return list.uid === res.uid || list.filePath === res.url;
      });

      if (index !== -1) {
        this.form.villagePicturesArr.splice(index, 1);
        this.form.villagePicturesFiles.splice(index, 1);
      }
      this.$refs.form.validateField("villagePicturesArr");
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  max-width: 1600px;
  padding-left: 8px;
  .block-tit {
    margin-top: 32px;
    margin-bottom: 20px;
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

    ::v-deep .el-form-item {
      width: 31%;
      flex-shrink: 0;
      margin-right: 20px;
      .el-form-item__label {
        font-size: 16px;
      }
    }
  }
}
</style>
