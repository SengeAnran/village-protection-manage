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
      <div class="detail-top">
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="mb-8">
              <el-form-item label="创建村名称" prop="villageId" :rules="rule.select">
                <VillageAddressSelect
                  v-model="form.villageId"
                  @change="changeAddress"
                />
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <el-form-item label="推荐次序" prop="villageId" :rules="rule.inputNumber">
              <el-input
                v-model.number="form.population"
                placeholder="请输入推荐次序"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="申报批次" prop="villageId" :rules="rule.inputNumber">
              <el-input
                v-model.number="form.population"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="创建周期" prop="villageId" :rules="rule.inputNumber">
              计划从
              <el-date-picker
                v-model="form.population"
                type="month"
                placeholder="选择月">
              </el-date-picker>
              至
              <el-date-picker
                v-model="form.population"
                type="month"
                placeholder="选择月">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="领办领导" prop="villageId" :rules="rule.inputNumber">
              <el-input
                v-model.number="form.population"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="建设单位" prop="villageId" :rules="rule.inputNumber">
              <el-input
                v-model.number="form.population"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="联系人" prop="villageId" :rules="rule.inputNumber">
              <el-input
                v-model.number="form.population"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系方式" prop="villageId" :rules="rule.inputNumber">
              <el-input
                v-model.number="form.population"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="户籍人口数（万人）" prop="villageId" :rules="rule.inputNumber">
              <el-input
                v-model.number="form.population"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="常住人口数（万人）" prop="villageId" :rules="rule.inputNumber">
              <el-input
                v-model.number="form.population"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="计划总投资（万元）" prop="villageId" :rules="rule.inputNumber">
              <el-input
                v-model.number="form.population"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="村级集体经济年经营性收入（万元）" prop="villageId" :rules="rule.inputNumber">
              <el-input
                v-model.number="form.population"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <el-form-item label="村庄属性（可多选）：" prop="villageId">
        <el-checkbox-group v-model="form.checkList">
          <el-checkbox label="县域风貌样板区内"></el-checkbox>
          <el-checkbox label="3A级景区村庄"></el-checkbox>
          <el-checkbox label="驻乡镇村规划师规划村庄"></el-checkbox>
          <el-checkbox label="下山移民新村"></el-checkbox>>
        </el-checkbox-group>
      </el-form-item>
      <div>
        <el-form-item
          label="基本情况"
          prop="introduction"
          :rules="rule.input"
        >
          <el-input
            style="width: 42%"
            type="textarea"
            :rows="5"
            placeholder="请输入创建村基本情况"
            maxlength="300"
            show-word-limit
            v-model="form.introduction"
          >
          </el-input>
          <p style="width: 42%; color: #FF6B00" class="py-4 leading-5">
            <i class="el-icon-warning"></i>要求：简述创建村基本情况、优劣势、必要性和创建目标定位等情况，要求300字以内。
          </p>
        </el-form-item>
        <el-form-item
          label="村民代表会议（村民会议）关于未来乡村建设方案决议情况"
          prop="introduction"
          :rules="rule.input"
        >
          <el-input
            style="width: 42%"
            type="textarea"
            :rows="5"
            placeholder="请输入村民代表会议（村民会议）关于未来乡村建设方案决议情况"
            maxlength="300"
            show-word-limit
            v-model="form.introduction"
          >
          </el-input>
        </el-form-item>
        <el-form-item
          label="乡、镇（街道）人民政府（办事处）意见"
          prop="introduction"
          :rules="rule.input"
        >
          <el-input
            style="width: 42%"
            type="textarea"
            :rows="5"
            placeholder="请输入乡、镇（街道）人民政府（办事处）意见"
            maxlength="300"
            show-word-limit
            v-model="form.introduction"
          >
          </el-input>
        </el-form-item>
        <el-form-item
          label="县（市、区）部门审核意见"
          prop="introduction"
          :rules="rule.input"
        >
          <el-input
            style="width: 42%"
            type="textarea"
            :rows="5"
            placeholder="请输入乡、镇（街道）人民政府（办事处）意见"
            maxlength="300"
            show-word-limit
            v-model="form.introduction"
          >
          </el-input>
        </el-form-item>

        <el-form-item
          label="县（市、区）人民政府意见"
          prop="introduction"
          :rules="rule.input"
        >
          <el-input
            style="width: 42%"
            type="textarea"
            :rows="5"
            placeholder="请输入乡、镇（街道）人民政府（办事处）意见"
            maxlength="300"
            show-word-limit
            v-model="form.introduction"
          >
          </el-input>
        </el-form-item>
        <el-form-item
          label="上传附件："
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

        <h4 class="block-tit">未来乡村创建项目备案表</h4>
        <div class="detail-top">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="填表人" prop="villageId" :rules="rule.inputNumber">
                <el-input
                  v-model.number="form.population"
                  placeholder="请输入填表人"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系电话" prop="villageId" :rules="rule.inputNumber">
                <el-input
                  v-model.number="form.population"
                  placeholder="请输入联系电话"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="审核人" prop="villageId" :rules="rule.inputNumber">
                <el-input
                  v-model.number="form.population"
                  placeholder="请输入审核人"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <el-form-item label="" prop="detail" :rules="listRules">
          <VilliageListTable
            :data="form.detail"
            :hiddenEdit="false"
            :hiddenDetail="true"
            @remove="removeListItem"
            @editForm="editListItem"
            @moveUp="moveUpItem"
            @moveDown="moveDownItem"
          />
        </el-form-item>
        <el-button
          class="add-wrp"
          plain
          size="small"
          @click="dialogVisible = true"
        >
          <i class="el-icon-plus"></i> 添加
        </el-button>
      </div>
    </el-form>
    <div>
      <el-button @click="$emit('close')">取消</el-button>
      <el-button type="primary" @click="validateForm">提交</el-button>
    </div>
    <el-dialog
      title="添加"
      :visible.sync="dialogVisible"
      width="600px"
      :before-close="handleClose">
      <el-form ref="form" :model="projectForm" label-width="140px">
        <el-form-item label="项目名称：">
          <el-input v-model="projectForm.name"></el-input>
        </el-form-item>
        <el-form-item label="建设单位：">
          <el-input v-model="projectForm.name"></el-input>
        </el-form-item>
        <el-form-item label="建设地点：">
          <el-input v-model="projectForm.name"></el-input>
        </el-form-item>
        <el-form-item label="建设内容和规模：">
          <el-input v-model="projectForm.name"></el-input>
        </el-form-item>
        <el-form-item label="进度安排：">
          <el-input v-model="projectForm.name"></el-input>
        </el-form-item>
        <el-form-item label="用地情况：">
          <el-input v-model="projectForm.name"></el-input>
        </el-form-item>
        <el-form-item label="投资额（万元）：">
          <el-input v-model="projectForm.name"></el-input>
        </el-form-item>
        <el-form-item label="运行维护管理安排：">
          <el-input v-model="projectForm.name"></el-input>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input v-model="projectForm.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">确定</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import VilliageListTable from "../Components/VilliageListTable";


import rule from "@/mixins/rule";
import VillageAddressSelect from "../Components/VillageAddressSelect";

import { VILLAGE_LIST_ROUTER_NAME, HISTORY_BUILDINGS } from "../constants";
const imgs = (rule, value, callback) => {
  if (value.length < 1) {
    callback(new Error("需要上传1张以上图片"));
  } else {
    callback();
  }
};
export default {
  mixins: [rule],
  components: {
    VilliageListTable,
    VillageAddressSelect,
  },
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
        checkList: [],
        processFilesArr: [], // 附件
        detail: [],

        villageId: "", //村庄地址
        population: "", // 人口数量
        income: "", //当年集体收入（万元）
        villageAge: "", //古建筑村落年代
        isFamous: "", //是否历史文化名村  0：否，1：省级，2：国家级
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
        villagePicturesFiles: [], // 编辑表单时图片回显
      },
      dialogVisible: false,
      projectForm: {
        name: "",
      },
      parentRouteName: VILLAGE_LIST_ROUTER_NAME[1001],
      imgRule: { required: true, validator: imgs, trigger: "change" },
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
    addListItem(params) {
      if (this.editType === "add") {
        this.form.detail.push(params);
        this.showForm = false;
      } else if (this.editType === "edit") {
        this.form.detail.splice(this.editIndex, 1, params);
        this.showForm = false;
      }
    },

    removeListItem(index) {
      this.form.detail.splice(index, 1);
    },

    editListItem({ data, index }) {
      this.editType = "edit";
      this.editIndex = index;
      this.editData = data;
      this.showForm = true;
    },
    moveUpItem({ data, index }) {
      // console.log(index);
      this.form.detail.splice(index, 1);
      this.form.detail.splice(index - 1, 0, data);
      // console.log(this.form.detail);

    },
    moveDownItem({ data, index }) {
      this.form.detail.splice(index, 1);
      this.form.detail.splice(index + 1, 0, data);
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(() => {
          done();
        })
        .catch(() => {});
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
      const { village, parent } = val;
      this.form.villageName = village.areaName;
      this.form.address = parent.areaName;
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
  .detail-top {
    .el-input {
      max-width: 240px;
    }
  }
  .add-wrp {
    width: 90%;
    margin-bottom: 150px;
    .el-icon-plus {
      font-size: 16px;
    }
  }


  .block-tit {
    margin-top: 32px;
    margin-bottom: 20px;
  }
  .total-wrp {
    color: #333333;
    & span {
      color: #606266;
      line-height: 40px;
      padding: 0 2px 0 0;
    }
  }
  .input {
    width: 31%;
    flex-shrink: 0;
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
