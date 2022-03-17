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
            <el-form-item label="推荐次序" prop="countrySortNum" :rules="rule.inputNumber">
              <el-input
                v-model.number="form.countrySortNum"
                placeholder="请输入推荐次序"
                maxlength="8"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="申报批次" prop="declarationBatch" :rules="rule.input">
              <el-input
                v-model="form.declarationBatch"
                placeholder="请输入"
                maxlength="20"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="创建周期" prop="startTime" :rules="rule.date">
              计划从
              <el-date-picker
                v-model="form.startTime"
                type="month"
                placeholder="选择月"
                value-format="yyyy-MM-DD HH:mm:ss">
              </el-date-picker>
              至
              <el-date-picker
                v-model="form.endTime"
                type="month"
                placeholder="选择月"
                value-format="yyyy-MM-DD HH:mm:ss">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="领办领导" prop="leader" :rules="rule.input">
              <el-input
                v-model="form.leader"
                placeholder="请输入"
                maxlength="20"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="建设单位" prop="construct" :rules="rule.input">
              <el-input
                v-model="form.construct"
                placeholder="请输入"
                maxlength="20"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="联系人" prop="contactPerson" :rules="rule.input">
              <el-input
                v-model="form.contactPerson"
                placeholder="请输入"
                maxlength="20"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系方式" prop="phone" :rules="rule.mobile">
              <el-input
                v-model.number="form.phone"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="户籍人口数（万人）" prop="huNum" :rules="rule.inputNumber">
              <el-input
                v-model="form.huNum"
                placeholder="请输入"
                maxlength="8"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="常住人口数（万人）" prop="personNum" :rules="rule.inputNumber">
              <el-input
                v-model="form.personNum"
                placeholder="请输入"
                maxlength="8"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="计划总投资（万元）" prop="investNum" :rules="rule.inputNumber">
              <el-input
                v-model="form.investNum"
                placeholder="请输入"
                maxlength="8"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="村级集体经济年经营性收入（万元）" prop="incomeNum" :rules="rule.inputNumber">
              <el-input
                v-model="form.incomeNum"
                placeholder="请输入"
                maxlength="8"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <el-form-item label="村庄属性（可多选）：" prop="villageId">
        <el-checkbox-group v-model="form.villageProperty">
          <el-checkbox label="县域风貌样板区内"></el-checkbox>
          <el-checkbox label="3A级景区村庄"></el-checkbox>
          <el-checkbox label="驻乡镇村规划师规划村庄"></el-checkbox>
          <el-checkbox label="下山移民新村"></el-checkbox>>
        </el-checkbox-group>
      </el-form-item>
      <div>
        <el-form-item
          label="基本情况"
          prop="basicText"
          :rules="rule.input"
        >
          <el-input
            style="width: 42%"
            type="textarea"
            :rows="5"
            placeholder="请输入创建村基本情况"
            maxlength="300"
            show-word-limit
            v-model="form.basicText"
          >
          </el-input>
          <p style="width: 42%; color: #FF6B00" class="py-4 leading-5">
            <i class="el-icon-warning"></i>要求：简述创建村基本情况、优劣势、必要性和创建目标定位等情况，要求300字以内。
          </p>
        </el-form-item>
        <el-form-item
          label="村民代表会议（村民会议）关于未来乡村建设方案决议情况"
          prop="meetingText"
          :rules="rule.input"
        >
          <el-input
            style="width: 42%"
            type="textarea"
            :rows="5"
            placeholder="请输入村民代表会议（村民会议）关于未来乡村建设方案决议情况"
            maxlength="300"
            show-word-limit
            v-model="form.meetingText"
          >
          </el-input>
        </el-form-item>
        <el-form-item
          label="乡、镇（街道）人民政府（办事处）意见"
          prop="townText"
          :rules="rule.input"
        >
          <el-input
            style="width: 42%"
            type="textarea"
            :rows="5"
            placeholder="请输入乡、镇（街道）人民政府（办事处）意见"
            maxlength="300"
            show-word-limit
            v-model="form.townText"
          >
          </el-input>
        </el-form-item>
        <el-form-item
          label="县（市、区）部门审核意见"
          prop="departmentText"
          :rules="rule.input"
        >
          <el-input
            style="width: 42%"
            type="textarea"
            :rows="5"
            placeholder="请输入乡、镇（街道）人民政府（办事处）意见"
            maxlength="300"
            show-word-limit
            v-model="form.departmentText"
          >
          </el-input>
        </el-form-item>

        <el-form-item
          label="县（市、区）人民政府意见"
          prop="governmentText"
          :rules="rule.input"
        >
          <el-input
            style="width: 42%"
            type="textarea"
            :rows="5"
            placeholder="请输入乡、镇（街道）人民政府（办事处）意见"
            maxlength="300"
            show-word-limit
            v-model="form.governmentText"
          >
          </el-input>
        </el-form-item>
        <el-form-item
          label="上传附件："
          :rules="rule.upload"
          prop="annexFiles"
        >
          <p style="width: 42%; color: #FF6B00" class="py-4 leading-5">
            <i class="el-icon-warning"></i>请上传以上内容的盖章扫描件
          </p>
          <UploadFile2
            tip="支持格式：.doc, .docx, .pdf"
            accept=".doc,.docx,.pdf"
            :data="form.annexFiles"
            @add="onFileAdd($event, 'annexFiles')"
            @remove="onFileRemove($event, 'annexFiles')"
          />
        </el-form-item>

        <h4 class="block-tit">未来乡村创建项目备案表</h4>
        <div class="detail-top">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="填表人" prop="projectFilingPerson" :rules="rule.input">
                <el-input
                  v-model="form.projectFilingPerson"
                  placeholder="请输入填表人"
                  maxlength="20"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系电话" prop="projectFilingPhone" :rules="rule.mobile">
                <el-input
                  v-model.number="form.projectFilingPhone"
                  placeholder="请输入联系电话"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="审核人" prop="projectFilingAudit" :rules="rule.input">
                <el-input
                  v-model="form.projectFilingAudit"
                  placeholder="请输入审核人"
                  maxlength="20"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <el-form-item label="" prop="projects" :rules="listRules">
          <VilliageListTable
            :data="form.projects"
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
      <el-button @click="$router.back()">取消</el-button>
      <el-button type="primary" @click="validateForm">提交</el-button>
    </div>
    <el-dialog
      title="添加"
      :visible.sync="dialogVisible"
      width="600px"
      @close="resetForm">
      <el-form ref="projectForm" :model="projectForm" label-width="140px">
        <el-form-item label="项目名称：">
          <el-input v-model="projectForm.projectName" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="建设单位：">
          <el-input v-model="projectForm.constructUnit" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="建设地点：">
          <el-input v-model="projectForm.constructAddress" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="建设内容和规模：">
          <el-input v-model="projectForm.constructDetail" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="进度安排：">
          <el-input v-model="projectForm.schedule" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="用地情况：">
          <el-input v-model="projectForm.landUse" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="投资额（万元）：">
          <el-input v-model="projectForm.investmentAmount" maxlength="8"></el-input>
        </el-form-item>
        <el-form-item label="运行维护管理安排：">
          <el-input v-model="projectForm.arrangements" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input v-model="projectForm.remark" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" @click="onSubmit">确定</el-button>
          <el-button @click="resetForm">取消</el-button>
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
import { villageDeclaration, getVillageItemDetail } from '@/api2/villageManage'
import {updateVillageItem} from "../../../api2/villageManage";
const imgs = (rule, value, callback) => {
  if (value.length < 1) {
    callback(new Error("需要上传1张以上图片"));
  } else {
    callback();
  }
};
const tableList = (rule, value, callback) => {
  if (value.length) {
    callback();
  } else {
    callback(new Error("请添加项目"));
  }
};
export default {
  mixins: [rule],
  components: {
    VilliageListTable,
    VillageAddressSelect,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
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
      type: "add",
      dialogVisible: false,
      projectForm: { // 项目表单
        projectName: "", // 项目名称
        constructUnit: "", // 建设单位
        constructAddress: "", // 建设地点
        constructDetail: "", // 建设内容和规模
        schedule: "", // 进度安排
        landUse: "", // 用地情况
        investmentAmount: "", // 投资额（万元）
        arrangements: "", // 运行维护管理安排
        remark: "", // 备注
      },
      editIndex: "",
      editProjectForm: false, // 编辑表格
      listRules: { required: true, validator: tableList, trigger: "blur" },

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
  },
  mounted() {
    // if (this.type === "edit") {
    //   this.form = this.data;
    //   this.imageList = [...this.data.villagePicturesFiles];
    // }
    this.getDetail();
  },
  methods: {
    getDetail() {
      const { id } = this.$route.query;
      if (!id) return;
      this.type = "edit";
      getVillageItemDetail({ id }).then((res) => {
        this.form = res;
        // this.form.annexFiles = [];
        this.finalStatus = res.finalStatus;
        console.log(res);
        this.total = this.countTotal();
        if (goVerify) {
          // setTimeout(() => {
          //   this.$el.querySelector("#verify").scrollIntoView();
          // },10)
        }
      });
    },
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
    // 添加 项目
    onSubmit() {
      if (!this.editProjectForm) {
        this.form.projects.push(this.projectForm);
      } else {
        this.editProjectForm = false;
      }
      this.resetForm();
    },
    resetForm() {
      this.projectForm = { // 项目表单
        projectName: "", // 项目名称
        construct: "", // 建设单位
        constructAddress: "", // 建设地点
        constructDetail: "", // 建设内容和规模
        schedule: "", // 进度安排
        landUse: "", // 用地情况
        investmentAmount: "", // 投资额（万元）
        arrangements: "", // 运行维护管理安排
        remark: "", // 备注
      };
      this.$refs.projectForm.resetFields();
      this.dialogVisible = false;
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
      this.form.projects.splice(index, 1);
    },

    editListItem({ data, index }) {
      this.editProjectForm = true;
      this.editIndex = index;
      this.projectForm = data;
      this.dialogVisible = true;
    },
    moveUpItem({ data, index }) {
      // console.log(index);
      this.form.projects.splice(index, 1);
      this.form.projects.splice(index - 1, 0, data);
      // console.log(this.form.detail);

    },
    moveDownItem({ data, index }) {
      this.form.projects.splice(index, 1);
      this.form.projects.splice(index + 1, 0, data);
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
          this.form.annexIds = this.form.annexFiles.map(i => i.fileId).toString();
          console.log(this.form.annexIds);
          if (this.type === "edit") {
            // this.form.id = this.$route.query.id;
            this.update(this.form);
          } else {
            this.submit(this.form);
          }
        } else {
          return false;
        }
      });
    },

    // 新增申报item
    async submit(params) {
      console.log(params);
      await villageDeclaration(params);
      this.$message({
        message: '添加成功！',
        type: 'success'
      });
      this.$router.back();

    },
    // 修改item
    async update(params) {
      console.log(params);
      await updateVillageItem(params);
      this.$message({
        message: '修改成功！',
        type: 'success'
      });
      this.$router.back();

    },

    // 选择村庄地址
    changeAddress(val) {
      const { village, parent } = val;
      console.log(village, parent);
      this.form.villageName = village.areaName;
      this.form.town = parent.areaName;
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
    font-size: 18px;
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
