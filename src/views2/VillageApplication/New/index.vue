<template>
  <div class="block" v-loading="initLoading">
    <el-form ref="form" class="form" label-position="top" :model="form" label-width="80px">
      <h3 class="text-gray-800 text-2xl mb-3">{{ type === 'add' ? '新建申报' : '修改申报' }}</h3>
      <div class="detail-top">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="申报类型" prop="decType" :rules="rule.select">
              <!--                <el-radio v-model="form.decType" :label="1">创建村申报</el-radio>-->
              <!--                <el-radio v-model="form.decType" :label="2">片区申报</el-radio>-->
              <el-radio-group v-model="form.decType" @change="changeDecType">
                <el-radio :label="1">创建村申报</el-radio>
                <el-radio :label="2">片区申报</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item v-if="form.decType === 1" label="创建村名称" prop="villageName" :rules="rule.select">
              <PlainText v-model="form.villageName" />
            </el-form-item>
            <el-form-item v-if="showdecType2" label="片区申报" prop="villageName" :rules="rule.select">
              <el-input
                v-model="form.area"
                placeholder="请输入片区名称"
                maxlength="20"
                style="margin-right: 16px"
              ></el-input>
              <PlainText v-model="form.villageName" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="创建批次" prop="declarationBatch" :rules="rule.input">
              <el-select v-model="form.declarationBatch" placeholder="请选择">
                <el-option v-for="(item, index) in batchOptions" :key="index" :label="item.label" :value="item.label">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="创建周期" prop="startTime" :rules="rule.date">
              计划从
              <el-date-picker
                v-model="form.startTime"
                type="month"
                placeholder="选择月"
                value-format="yyyy-MM-DD HH:mm:ss"
              >
              </el-date-picker>
              至
              <el-date-picker
                v-model="form.endTime"
                type="month"
                placeholder="选择月"
                value-format="yyyy-MM-DD HH:mm:ss"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="领办领导" prop="leader" :rules="rule.input">
              <el-input v-model="form.leader" placeholder="请输入" maxlength="20"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="建设单位" prop="construct" :rules="rule.input">
              <el-input v-model="form.construct" placeholder="请输入" maxlength="20"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="联系人" prop="contactPerson" :rules="rule.input">
              <el-input v-model="form.contactPerson" placeholder="请输入" maxlength="20"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系方式" prop="phone" :rules="rule.mobile">
              <el-input v-model.number="form.phone" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="户籍人口数（万人）" prop="huNum" :rules="rule.inputNumber">
              <el-input-number v-model="form.huNum" placeholder="请输入" maxlength="8"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="常住人口数（万人）" prop="personNum" :rules="rule.inputNumber">
              <el-input-number v-model="form.personNum" placeholder="请输入" maxlength="8"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="计划总投资（万元）" prop="investNum" :rules="rule.inputNumber">
              <el-input-number
                v-model="form.investNum"
                :precision="2"
                :controls="false"
                placeholder="请输入"
                maxlength="8"
              ></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="村级集体经济年经营性收入（万元）" prop="incomeNum" :rules="rule.inputNumber">
              <el-input-number
                v-model="form.incomeNum"
                :precision="2"
                :controls="false"
                placeholder="请输入"
                maxlength="8"
              ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <el-form-item label="村庄属性（可多选）：" prop="villageProperty" :rules="rule.select">
        <VillageProperty v-model="form.villageProperty" />
      </el-form-item>
      <div>
        <el-form-item label="基本情况" prop="basicText" :rules="rule.input">
          <el-input
            style="width: 42%"
            type="textarea"
            :rows="5"
            placeholder="请输入创建村基本情况"
            maxlength="350"
            show-word-limit
            v-model="form.basicText"
          >
          </el-input>
          <p style="width: 42%; color: #ff6b00" class="py-4 leading-5">
            <i class="el-icon-warning"></i>
            要求：简述创建村基本情况、优劣势、必要性和创建目标定位等情况，要求300字以内。
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
            placeholder="xx村于xx年xx月xx日召开村民代表大会，应到xx人，实到xx人，对于未来乡村建设创建方案全票通过"
            maxlength="300"
            show-word-limit
            v-model="form.meetingText"
          >
          </el-input>
          <p style="width: 42%; color: #ff6b00" class="py-4 leading-5">
            <i class="el-icon-warning"></i> 请根据输入框内格式修改创建方案决议情况，并上传村民大会纪要。
          </p>
        </el-form-item>
        <el-form-item label="" prop="meetingPic" :rules="rule.upload">
          <UploadImg2 :defaultData="oldMeetingPic" v-model="form.meetingPic" :limit="3" />
        </el-form-item>
        <el-form-item label="乡、镇（街道）人民政府（办事处）意见" prop="townText" :rules="rule.input">
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

        <el-form-item label="县（市、区）部门审核意见" prop="departmentText" :rules="rule.input">
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

        <el-form-item label="县（市、区）人民政府意见" prop="governmentText" :rules="rule.input">
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

        <h4 class="block-tit">浙江省未来乡村创建方案</h4>
        <div class="detail-top">
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="浙江省未来乡村创建方案" prop="createScenarioFile" :rules="rule.upload">
                <UploadFile23
                  v-model="form.createScenarioFile"
                  tip="支持拓展名：.doc, .docx, .pdf"
                  accept=".doc,.docx,.pdf"
                  :limitSize="200"
                />
                <p style="width: 42%; color: #ff6b00" class="py-4 leading-5">
                  <i class="el-icon-warning"></i> 请上传《浙江省未来乡村创建方案》
                </p>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <h4 class="block-tit small">未来乡村创建项目备案表</h4>
        <div class="detail-top">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="填表人" prop="projectFilingPerson" :rules="rule.input">
                <el-input v-model="form.projectFilingPerson" placeholder="请输入填表人" maxlength="20"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系电话" prop="projectFilingPhone" :rules="rule.mobile">
                <el-input v-model.number="form.projectFilingPhone" placeholder="请输入联系电话"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="审核人" prop="projectFilingAudit" :rules="rule.input">
                <el-input v-model="form.projectFilingAudit" placeholder="请输入审核人" maxlength="20"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <el-form-item class="list-table" label="" prop="projects" :rules="listRules">
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
        <el-button class="add-wrp" plain size="small" @click="handleAddRow">
          <i class="el-icon-plus"></i> 添加
        </el-button>
      </div>
    </el-form>
    <div>
      <el-button @click="$router.back()">取消</el-button>
      <el-button type="primary" @click="validateForm(0)">提交</el-button>
      <el-button type="primary" v-if="showSaveBtn" @click="validateForm(1)">保存待发</el-button>
    </div>
    <CreateProjectDialog
      v-model="dialogVisible"
      :editData="editProjectForm"
      :dateRange="[form.startTime, form.endTime]"
      @change="handleAdd"
      @closed="handleAddClose"
    />
  </div>
</template>
<script>
// import VillageSelect from '../Components/VillageSelect.vue';
import VilliageListTable from '../Components/VilliageListTable.vue';
import VillageProperty from '../Components/VillageProperty.vue';
import rule from '@/mixins/rule';
import { getActiveSetList } from '@/api2/declarationBatch';
import { villageDeclaration, getVillageItemDetail, updateVillageItem, getGeneration } from '@/api2/villageManage';
import { mapGetters } from 'vuex';

import { types } from '@/views2/utils/project';
import CreateProjectDialog from './CreateProjectDialog.vue';

const tableList = (rule, value, callback) => {
  if (value.length) {
    callback();
  } else {
    callback(new Error('请添加项目'));
  }
};

export default {
  mixins: [rule],
  components: {
    VilliageListTable,
    CreateProjectDialog,
    VillageProperty,
  },
  data() {
    return {
      types,
      showdecType2: false, // 展示区域选择
      form: {
        decType: 1, // 申报类型
        // todo: be remove
        annexFiles: [], // 附件
        villageName: '', //村庄地址
        areaId: '', //村庄地址
        town: '', //村庄地址
        villageId: '', //村庄地址
        // todo: be remove
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
        createScenario: '', // 未来乡村创建方案
        createScenarioFile: {},
      },
      type: 'add',
      dialogVisible: false,

      editIndex: '',
      editProjectForm: null, // 编辑表格
      listRules: { required: true, validator: tableList, trigger: 'blur' },
      batchOptions: [],
      oldMeetingPic: [],

      initLoading: true,
    };
  },
  computed: {
    ...mapGetters(['userInfo']),
    showSaveBtn() {
      return this.type === 'add';
    },
  },
  watch: {},
  mounted() {
    // if (this.type === "edit") {
    //   this.form = this.data;
    //   this.imageList = [...this.data.villagePicturesFiles];
    // }
    this.getBatchList();
    this.getDetail();
  },
  methods: {
    handleAddRow() {
      if (!this.form.startTime || !this.form.endTime) {
        this.$notify.error('请先选择创建周期');
        return;
      }
      this.dialogVisible = true;
    },
    changeDecType() {
      // console.log('changeDecType', this.form.decType);
      if (this.form.decType === 1) {
        this.showdecType2 = false;
      } else {
        this.showdecType2 = true;
      }
    },
    async getDetail() {
      const { id } = this.$route.query;
      let res;
      if (!id) {
        this.form.villageName = this.userInfo.areaName;
        res = await getGeneration(); // 获取保存待发数据
      } else {
        this.type = 'edit';
        res = await getVillageItemDetail({ id });
      }
      if (res) {
        const data = {
          ...res,
        };
        if (res.decType === 2) {
          this.showdecType2 = true;
        }
        const meetingPic = res.meetingPic || '';
        this.oldMeetingPic = meetingPic
          .split(',')
          .filter((ele) => Boolean(ele))
          .map((ele) => ({ filePath: ele }));

        data.meetingPic = [];
        if (!res.createScenarioFile) {
          data.createScenarioFile = {};
        }
        this.form = data;
        // this.form.annexFiles = [];
        this.finalStatus = res.finalStatus;
      }
      this.initLoading = false;
    },
    // 获取批次列表
    getBatchList() {
      getActiveSetList().then((res) => {
        this.batchOptions = res.map((c) => {
          return {
            label: c.batch,
            value: c.id,
          };
        });
      });
    },
    // 添加 项目
    handleAdd(value) {
      if (this.editProjectForm) {
        this.form.projects.splice(this.editIndex, 1, value);
      } else {
        this.form.projects.push(value);
      }
    },
    handleAddClose() {
      this.editProjectForm = null;
      this.editIndex = null;
    },
    // addListItem(params) {
    //   if (this.editType === 'add') {
    //     this.form.detail.push(params);
    //     this.showForm = false;
    //   } else if (this.editType === 'edit') {
    //     this.form.detail.splice(this.editIndex, 1, params);
    //     this.showForm = false;
    //   }
    // },
    removeListItem(index) {
      this.form.projects.splice(index, 1);
    },
    editListItem({ data, index }) {
      this.editProjectForm = data;
      this.editIndex = index;
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

    validateForm(save) {
      // console.log('xxxxxx _.', this.form);
      if (save) {
        // 保存待发
        const annexIds = this.form.annexFiles.map((i) => i.fileId).toString();
        const createScenario = this.form.createScenarioFile.fileId;

        const meetingPic = this.form.meetingPic.map((ele) => ele.filePath).join(',');
        const params = {
          ...this.form,
          annexIds,
          meetingPic,
          createScenario,
          saveToGo: save,
        };
        // console.log('validateForm', params);
        if (this.type === 'edit' || params.id) {
          // this.form.id = this.$route.query.id;
          this.update(params);
        } else {
          this.submit(params);
        }
        return;
      }
      this.$refs['form'].validate((valid) => {
        if (valid) {
          // 校验总额是否相等
          if (!this.verificationTotal(this.form.projects, this.form.investNum)) {
            return this.$message({
              message: '项目计划投资金额合计必须等于计划总投资！',
              type: 'warning',
            });
          }
          // 校验时间填写是否合规
          if (!this.verificationTime(this.form.projects, [this.form.startTime, this.form.endTime])) {
            return this.$message({
              message: '项目进度安排周期不可超出创建周期范围！',
              type: 'warning',
            });
          }
          const annexIds = this.form.annexFiles.map((i) => i.fileId).toString();
          const createScenario = this.form.createScenarioFile.fileId;

          const meetingPic = this.form.meetingPic.map((ele) => ele.filePath).join(',');
          const params = {
            ...this.form,
            annexIds,
            meetingPic,
            createScenario,
            saveToGo: save,
          };
          // console.log('validateForm', params);
          if (this.type === 'edit' || params.id) {
            // this.form.id = this.$route.query.id;
            this.update(params);
          } else {
            this.submit(params);
          }
        } else {
          return false;
        }
      });
    },
    // 校验总额是否相等
    verificationTotal(arr, allNum) {
      let projectAllNum = 0;
      arr.forEach((i) => {
        projectAllNum +=
          (i.planFirstDrive || 0) + (i.planFirstGov || 0) + (i.planSecondDrive || 0) + (i.planSecondGov || 0);
      });
      return projectAllNum === allNum;
    },
    // 校验时间填写是否规范
    verificationTime(arr, time = []) {
      const res = arr.every((i) => {
        // console.log(i.schedule, time[0], i.scheduleEnd, time[1]);
        // console.log(
        //   Date.parse(new Date(i.schedule)),
        //   Date.parse(new Date(time[0])),
        //   Date.parse(new Date(i.scheduleEnd)),
        //   Date.parse(new Date(time[1])),
        // );
        return (
          Date.parse(new Date(i.schedule)) > Date.parse(new Date(time[0])) &&
          Date.parse(new Date(i.scheduleEnd)) < Date.parse(new Date(time[1]))
        );
      });
      return res;
    },
    // 新增申报或保存待发item
    submit(params) {
      villageDeclaration(params).then(() => {
        this.$message({
          message: '添加成功！',
          type: 'success',
        });
        this.$router.back();
      });
    },
    // 修改item
    update(params) {
      updateVillageItem(params).then(() => {
        this.$message({
          message: params.saveToGo ? '保存成功！' : this.type === 'edit' ? '修改成功！' : '添加成功！',
          type: 'success',
        });
        this.$router.back();
      });
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

    &.small {
      margin-top: 4px;
    }
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
  .list-table {
    .import {
      width: 90%;
      display: flex;
      justify-content: space-between;
      flex-direction: row-reverse;
      margin-bottom: 12px;
    }
  }
}
.block {
  .import-dialog {
    &::v-deep .upload-img-wrp {
      text-align: center;
    }
    ::v-deep .el-dialog__footer {
      padding: 0;
    }
  }
}
</style>
