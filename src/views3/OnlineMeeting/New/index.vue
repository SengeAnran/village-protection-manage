<template>
  <div>
    <el-form
      ref="form"
      class="form"
      label-position="top"
      :model="form"
      label-width="80px"
    >
      <div class="block">
        <h4>基础配置</h4>
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="mb-8">
              <el-form-item label="地区" prop="address" :rules="rule.select">
                <VillageAddressSelect
                  v-model="form.address"
                  :placeholder="placeholder"
                  @change="changeAddress"
                />
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <el-form-item label="议事主题" prop="topic" :rules="rule.input">
              <el-input
                v-model="form.topic"
                placeholder="请输入"
                maxlength="20"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div>
          <el-form-item
            label="议事内容"
            prop="content"
            :rules="rule.input"
          >
            <el-input
              style="width: 72%"
              type="textarea"
              :rows="5"
              placeholder="请输入"
              maxlength="300"
              show-word-limit
              v-model="form.content"
            >
            </el-input>
            <!--          <p style="width: 42%; color: #FF6B00" class="py-4 leading-5">-->
            <!--            <i class="el-icon-warning"></i>要求：简述创建村基本情况、优劣势、必要性和创建目标定位等情况，要求300字以内。-->
            <!--          </p>-->
          </el-form-item>
          <el-form-item label="照片" prop="picturesFiles">
            <p style="color: #ff6b00" class="py-3">
              <i class="el-icon-warning"></i>
              照片至多可上传4张，大小不可超过2MB
            </p>
            <UploadImg3
              :limit="4"
              @add="onImageAdd2"
              @remove="onImageRemove2"
            />
          </el-form-item>
        </div>
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="mb-8">
              <el-form-item label="发起人" prop="initiatorUserName">
                <el-input
                  v-model="form.initiatorUserName"
                  placeholder="请输入"
                  maxlength="20"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="mb-8">
              <el-form-item label="结束时间" prop="endDate" :rules="rule.select">
                <el-date-picker
                  v-model="form.endDate"
                  type="datetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="请选择"
                  >
                </el-date-picker>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <el-form-item label="参加人员" prop="participantUser" :rules="listRules">
              <el-tag
                v-for="(tag, index) in form.participantUser"
                :key="index"
                closable
              >
                {{ tag.userNickname }}
              </el-tag>
              <el-button
                plain
                size="small"
                @click="PartDiaVisible = true"
              >
                <i class="el-icon-plus"></i> 添加
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="block">
        <h4>票选配置</h4>
        <div class="detail-top">
          <el-form-item label="投票选项：" prop="onlineNegotiateVoteOptionDTOList" :rules="listRules">
            <listTable
              :data="form.onlineNegotiateVoteOptionDTOList"
              :hiddenEdit="true"
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
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="是否多选" prop="multipleChoice" :rules="rule.select">
                <el-radio v-model="form.multipleChoice" :label="1">是</el-radio>
                <el-radio v-model="form.multipleChoice" :label="0">否</el-radio>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div>
          <el-button @click="$router.back()">取消</el-button>
          <el-button type="primary" @click="validateForm">提交</el-button>
        </div>
      </div>
    </el-form>
    <el-dialog
      title="添加"
      class="page-help-detail"
      :visible.sync="dialogVisible"
      width="600px"
      @close="resetForm">
      <el-form v-if="dialogVisible" ref="projectForm" :model="projectForm" label-width="140px">
        <el-form-item label="选项内容:">
          <el-input v-model="projectForm.voteContent" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="照片:" prop="picturesFiles">
          <p style="color: #ff6b00" class="py-3">
            <i class="el-icon-warning"></i>
            照片至多可上传1张，大小不可超过2MB
          </p>
          <UploadImg3
            :limit="1"
            :data="imageList"
            @add="onImageAdd"
            @remove="onImageRemove"
          />
        </el-form-item>
        <el-form-item >
          <el-button type="primary" @click="onSubmit">确定</el-button>
          <el-button @click="resetForm">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <Participants
      :visible.sync="PartDiaVisible"
      @onSubmit="submitNames"
    />
  </div>
</template>
<script>
import listTable from "../Components/listTable";
import Participants from "../Components/Participants";

import rule from "@/mixins/rule";
import VillageAddressSelect from "../Components/VillageAddressSelect";
import { addOne } from "@/api3/OnlineMeeting.js";

const imgs = (rule, value, callback) => {
  console.log(value);
  if (value.length < 1) {
    callback(new Error("至少需要上传1张以上图片"));
  } else if (value.length > 4) {
    callback(new Error("至多上传4张以上图片"));
  } else {
    callback();
  }
};
const tableList = (rule, value, callback) => {
  if (value.length) {
    callback();
  } else {
    callback(new Error("请添加"));
  }
};
export default {
  mixins: [rule],
  components: {
    VillageAddressSelect,
    listTable,
    Participants,
  },
  data() {
    return {
      form: {
        address: "", //地址
        topic: "", //议事主题
        content: "", //议事内容
        endDate: "", //结束时间
        pics: [], // 照片
        initiatorUserName: "", // 发起人
        participantUser: [], // 本地自用
        participantUserIds: [], //参加人员
        multipleChoice: "", // 是否多选???
        onlineNegotiateVoteOptionDTOList: [],
      },
      // 人员
      PartDiaVisible: false,
      // 投票项
      projectForm: {
        voteContent: "", // 选项内容
        votePic: "", // 照片
      },
      dialogVisible: false,
      editProjectForm: false,  // 是否可添加
      placeholder: "请选择",
      type: "add", // 页面类型
      // pageType: "新建",
      imageList: [], // 回显图片
      listRules: { required: true, validator: tableList, trigger: "blur" },
      imgRule: { required: true, validator: imgs, trigger: "change" },
    };
  },
  computed: {
  },
  watch: {
  },
  mounted() {
    // this.getDetail();
  },
  methods: {
    // getDetail() {
    //   const { id } = this.$route.query;
    //   if (!id) return;
    //   this.type = "edit";
    //   this.pageType = "编辑";
    //   getVenueDetail({ id }).then((res) => {
    //     this.form = res;
    //     // this.form.annexFiles = [];
    //     this.imageList = this.form.photoId.split(",").map(i=> {
    //       return {
    //         fileName: "",
    //         filePath: i,
    //       }
    //     });
    //     this.form.picturesFiles = this.imageList;
    //     this.placeholder = this.form.address;
    //     this.finalStatus = res.finalStatus;
    //     console.log(res);
    //     this.total = this.countTotal();
    //   });
    // },

    // 新增提交
    validateForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.form.pics = this.form.pics.map(i => i.filePath);
          console.log(this.form.picturesFiles);
          this.form.participantUserIds = this.form.participantUser.map(i=> i.userId);
          console.log(this.form);
          if (this.type === "edit") {
            this.form.id = this.$route.query.id;
            // this.update(this.form);
          } else {
            this.submit(this.form);
          }
        } else {
          return false;
        }
      });
    },
    // 提交人员名单
    submitNames(ids) {
      this.form.participantUser = ids;
    },
    // 新增申报item
    async submit(params) {
      console.log(params);
      await addOne(params);
      this.$message({
        message: '添加成功！',
        type: 'success'
      });
      this.$router.back();
    },
    // 修改item
    async update(params) {
      console.log(params);
      await modifyVenueDetail(params);
      this.$message({
        message: '修改成功！',
        type: 'success'
      });
      this.$router.back();
    },

    // 选择村庄地址
    changeAddress(val) {
      const { address } = val;
      // this.form.villageName = village.areaName;
      console.log(address);
      this.form.address = address;
    },

    onImageAdd(res) {
      this.projectForm.votePic = res.filePath;
      // this.$refs.projectForm.validateField("picturesFiles");
    },
    onImageRemove(res) {
      console.log(res);
      // const index = this.projectForm.picturesFiles.findIndex((list) => {
      //   return list.uid === res.uid || list.filePath === res.url;
      // });
      //
      // if (index !== -1) {
      //   // this.form.picturesArr.splice(index, 1);
      //   this.projectForm.picturesFiles.splice(index, 1);
      // }
      // // this.$refs.form.validateField("picturesFiles");
    },
    onImageAdd2(res) {
      if (!this.form.pics) {
        this.form.pics = [];
      }
      this.form.pics.push(res);
    },
    onImageRemove2(res) {
      const index = this.form.pics.findIndex((list) => {
        return list.uid === res.uid || list.filePath === res.url;
      });
      if (index !== -1) {
        this.form.pics.splice(index, 1);
      }
    },
    // 添加 项目
    onSubmit() {
      if (!this.editProjectForm) {
        this.form.onlineNegotiateVoteOptionDTOList.push(this.projectForm);
        this.projectForm = {
          voteContent: "", // 选项内容
          votePic: "", // 照片
        };
        // this.imageList = [];
      } else {
        this.editProjectForm = false;
      }
      this.resetForm();
    },
    resetForm() {
      this.projectForm = { // 项目表单
        voteContent: "", // 选项内容
        votePic: "", // 照片
      };
      this.$refs.projectForm.resetFields();
      this.dialogVisible = false;
    },

    // 处理表格
    removeListItem(index) {
      this.form.onlineNegotiateVoteOptionDTOList.splice(index, 1);
    },
    editListItem({ data, index }) {
      this.editProjectForm = true;
      this.editIndex = index;
      this.projectForm = data;
      this.dialogVisible = true;
    },
    moveUpItem({ data, index }) {
      // console.log(index);
      this.form.onlineNegotiateVoteOptionDTOList.splice(index, 1);
      this.form.onlineNegotiateVoteOptionDTOList.splice(index - 1, 0, data);
      // console.log(this.form.detail);

    },
    moveDownItem({ data, index }) {
      this.form.onlineNegotiateVoteOptionDTOList.splice(index, 1);
      this.form.onlineNegotiateVoteOptionDTOList.splice(index + 1, 0, data);
    },
  },
};
</script>
<style lang="scss" scoped>
.form {
  max-width: 1600px;
  padding-left: 8px;
  h4 {
    height: 40px;
    background: #D0E8FF;
    padding-left: 20px;
    margin-bottom: 16px;
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
    line-height: 40px;
  }
  .el-input {
    max-width: 240px;
  }
  .add-wrp {
    width: 90%;
    margin-bottom: 15px;
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
.page-help-detail {
  ::v-deep .el-dialog {
    border-radius: 8px;
  }
  ::v-deep .el-dialog__header {
    text-align: center;
    //border-bottom: 1px solid #e6e9f0;
  }
}
</style>
