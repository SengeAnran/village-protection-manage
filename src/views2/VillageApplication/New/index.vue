<template>
  <div class="block" v-loading="initLoading">
    <el-form ref="form" class="form" label-position="top" :model="form" label-width="80px">
      <h3 class="text-gray-800 text-2xl mb-3"> {{ type === 'add' ? '新建申报' : '修改申报' }}</h3>
      <div class="detail-top" >
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
          <el-col :span="12" v-if="!initLoading">
            <el-form-item v-if="form.decType === 1" label="创建村名称" prop="villageName" :rules="rule.select">
              <!--                <VillageSelect v-model="form.villageName" @change="changeAddress('villageName', $event)" />-->
              <!-- <el-select v-model="form.villageName" placeholder="请选择">
                <el-option v-for="item in villageOptions1" :key="item.value" :label="item.label" :value="item.label">
                </el-option>
              </el-select> -->
              <el-cascader
                ref="cascader"
                :props="villageProp"
                :show-all-levels="false"
                collapse-tags 
                :options="villageOPtions"
                v-model="villageName"
                @change="handleChange"
                placeholder="请选择"
              ></el-cascader>
            </el-form-item>
            <el-form-item v-if="showdecType2" label="片区申报" prop="villageName" :rules="rule.select">
              <el-input
                v-model="form.area"
                placeholder="请输入片区名称"
                maxlength="20"
                style="margin-right: 16px"
              ></el-input>
              <!-- <el-select v-model="form.villageName" :multiple="true" placeholder="请选择片区内村庄">
                <el-option v-for="(item, index) in villageOptions" :key="index" :label="item.label" :value="item.label">
                </el-option>
              </el-select> -->
              <el-cascader
                ref="cascader"
                :props="village2Prop"
                :show-all-levels="false"
                collapse-tags
                :options="villageOPtions"
                v-model="villageName"
                @change="handleChange"
                placeholder="请选择片区内村庄">
              </el-cascader>
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
              <el-input-number v-model="form.investNum" :precision="2" :controls="false" placeholder="请输入" maxlength="8"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="村级集体经济年经营性收入（万元）" prop="incomeNum" :rules="rule.inputNumber">
              <el-input-number v-model="form.incomeNum" :precision="2" :controls="false" placeholder="请输入" maxlength="8"></el-input-number>
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
            maxlength="300"
            show-word-limit
            v-model="form.basicText"
          >
          </el-input>
          <p style="width: 42%; color: #ff6b00" class="py-4 leading-5">
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
              <el-form-item label="浙江省未来乡村创建方案" prop="createScenario" :rules="rule.richText">
                <el-input
                  style="min-width: 42%; max-width: 90%;"
                  type="textarea"
                  :rows="5"
                  :autosize="{ minRows: 10 }"
                  :placeholder="`一、基本情况
二、创建方案的实施情况
三、数字化建设与应用情况
四、场景特别是“一老一小”场景建设情况
五、建设投入情况
六、工作推进情况
七、特色和创新情况
八、相关附件
报告中涉及到的支撑材料可作为附件单独提供，并需提供附件清单方便查阅。`"
                  show-word-limit
                  v-model="form.createScenario"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <h4 class="block-tit">未来乡村创建项目备案表</h4>
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
      <el-button type="primary" @click="validateForm">保存</el-button>
    </div>
    <CreateProjectDialog v-model="dialogVisible" :editData="editProjectForm" :dateRange="[form.startTime, form.endTime]" @change="handleAdd" @closed="handleAddClose" />
  </div>
</template>
<script>
// import VillageSelect from '../Components/VillageSelect.vue';
import VilliageListTable from '../Components/VilliageListTable.vue';
import VillageProperty from '../Components/VillageProperty.vue';
import rule from '@/mixins/rule';
import { getActiveSetList } from '@/api2/declarationBatch';
import { villageDeclaration, getVillageItemDetail, updateVillageItem } from '@/api2/villageManage';
import { getCountyVillages } from '@/api2/acceptanceEvaluation';
import { mapGetters } from 'vuex';

import { types } from '@/views2/utils/project';
import CreateProjectDialog from './CreateProjectDialog.vue';

const imgs = (rule, value, callback) => {
  if (value.length < 1) {
    callback(new Error('需要上传1张以上图片'));
  } else {
    callback();
  }
};
const tableList = (rule, value, callback) => {
  if (value.length) {
    callback();
  } else {
    callback(new Error('请添加项目'));
  }
};
const villageSelect = (rule, value, callback) => {
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
        villageName: [], //村庄地址
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
        townText: '', //乡、镇（街道）人民政府（办事处）意见
        departmentText: '', //县（市、区）部门审核意见
        governmentText: '', //县（市、区）人民政府意见
        projectFilingPerson: '', //填表人
        projectFilingPhone: '', //联系电话
        projectFilingAudit: '', //审核人
        projects: [], //项目列表
        createScenario: '', // 未来乡村创建方案
      },
      villageName: [],
      type: 'add',
      dialogVisible: false,
      
      editIndex: '',
      editProjectForm: null, // 编辑表格
      listRules: { required: true, validator: tableList, trigger: 'blur' },
      villageSelects: { required: true, validator: villageSelect, trigger: 'blur' },

      imgRule: { required: true, validator: imgs, trigger: 'change' },
      batchOptions: [],

      villageOPtions: [],
      villageProp: {
        emitPath: false,
        value: 'name',
        label: 'name',
        children: 'child',
      },
      village2Prop: {
        multiple: true,
        emitPath: false,
        value: 'name',
        label: 'name',
        children: 'child',
      },
      initLoading: true,
    };
  },
  computed: {
    ...mapGetters(['userInfo']),
  },
  watch: {},
  mounted() {
    // if (this.type === "edit") {
    //   this.form = this.data;
    //   this.imageList = [...this.data.villagePicturesFiles];
    // }
    this.getVillageList();
    this.getBatchList();
  },
  methods: {
    handleAddRow() {
      if (!this.form.startTime || !this.form.endTime) {
        this.$notify.error('请先选择创建周期');
        return;
      }
      this.dialogVisible = true;
    },
    handleChange(value) {
      this.form.villageName = value;
      console.log('handleChange', this.form.villageName, value);
    },
    changeDecType() {
      console.log('changeDecType', this.form.decType);
      this.form.villageName = [];
      this.villageName = [];
      if (this.form.decType === 1) {
        this.showdecType2 = false;
      } else {
        this.showdecType2 = true;
      }
    },
    getVillageList() {
      getCountyVillages({ county: this.userInfo.areaName }).then((res) => {
        this.villageOPtions = res;
        this.getDetail();
      });
    },
    getDetail() {
      const { id } = this.$route.query;
      if (!id) {
        this.initLoading = false;
        return;
      };
      this.type = 'edit';
      getVillageItemDetail({ id }).then((res) => {
        const data = {
          ...res,
        };
        if (res.decType === 2) {
          this.showdecType2 = true;
        }
        const villageNameOrigin = (res.villageName || '').split(',');
        const villageOPtions = this.villageOPtions;
        let villageName = [];
        if (villageOPtions && villageOPtions.length) {
          // 在这里将真个下拉菜单初始化。主要是为了在编辑的时候能够回显上一次的选中内容
          const mapCode = new Map();
          const mapValue = new Map();
          villageOPtions.forEach((ele) => {
            const child = ele.child || [];
            child.forEach((el) => {
              mapCode.set(el.code, el);
              mapValue.set(el.name, el);
            });
            mapCode.set(ele.code, ele);
            mapValue.set(ele.name, ele);
          });

          villageName = villageNameOrigin.map((ele) => {
            const tmp = mapValue.get(ele);
            if (!tmp) {
              return null;
            }
            const parent = mapCode.get(tmp.pcode);
            if (!parent) {
              return null;
            }
            return [parent?.name, tmp?.name];
          }).flat(2);
          const empty = villageName.some((ele) => !ele);
          if (!empty) {
            this.villageName = villageName;
          }
        }

        this.form = data;
        data.villageName = villageNameOrigin;
        console.log('village name', res.villageName, villageNameOrigin, villageName);
        // this.form.annexFiles = [];
        this.finalStatus = res.finalStatus;
      }).finally(() => {
        this.initLoading = false;
      });
    },
    // 获取批次列表
    getBatchList() {
      getActiveSetList().then((res) => {
        console.log(res);
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

    validateForm() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          const annexIds = this.form.annexFiles.map((i) => i.fileId).toString();
          const villageName = this.form.villageName.toString();
          const params = {
            ...this.form,
            annexIds,
            villageName,
          };
          console.log(this.form.villageName);
          console.log(params);
          // if (this.form.villageName) {
          //   return;
          // }
          if (this.type === 'edit') {
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

    // 新增申报item
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
          message: '修改成功！',
          type: 'success',
        });
        this.$router.back();
      });
    },

    // 选择村庄地址
    // changeAddress(val) {
    //   const { village, parent } = val;
    //   console.log(village, parent);
    //   this.form.villageName = village.areaName;
    //   this.form.town = parent.areaName;
    // },
    changeAddress(type, val) {
      console.log(type, val);
      this.form[type] = val.areaName;
      // const { village, parent } = val;
      // console.log(village, parent, 'village, parent');
      // this.form.villageName = village.areaName;
      // this.form.town = parent.areaName;
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

      this.$refs.form.validateField('villagePicturesArr');
    },
    onImageRemove(res) {
      const index = this.form.villagePicturesFiles.findIndex((list) => {
        return list.uid === res.uid || list.filePath === res.url;
      });

      if (index !== -1) {
        this.form.villagePicturesArr.splice(index, 1);
        this.form.villagePicturesFiles.splice(index, 1);
      }
      this.$refs.form.validateField('villagePicturesArr');
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
