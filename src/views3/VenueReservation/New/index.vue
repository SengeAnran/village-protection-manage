<template>
  <div class="block">
    <el-form
      ref="form"
      class="form"
      label-position="top"
      :model="form"
      label-width="80px"
    >
      <h3 class="text-gray-800 text-2xl mb-8">{{ pageType }}</h3>
      <div class="detail-top">
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="mb-8">
              <el-form-item label="地址" prop="address" :rules="rule.select">
                <VillageAddressSelect
                  v-model="form.address"
                  :placeholder="placeholder"
                  @change="changeAddress"
                />
              </el-form-item>
<!--              <el-form-item label="地址" prop="address" :rules="rule.input">-->
<!--                <el-input-->
<!--                  v-model="form.address"-->
<!--                  placeholder="请输入"-->
<!--                  maxlength="30"-->
<!--                ></el-input>-->
<!--              </el-form-item>-->
            </div>
          </el-col>
          <el-col :span="12">
            <el-form-item label="场馆名称" prop="auditoriumName" :rules="rule.input">
              <el-input
                v-model="form.auditoriumName"
                placeholder="请输入"
                maxlength="20"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="开放时间" prop="openTime" :rules="rule.input">
              <el-input
                v-model="form.openTime"
                placeholder="请输入"
                maxlength="20"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话" prop="contactNumber" :rules="rule.mobile">
              <el-input
                v-model.number="form.contactNumber"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div>
        <el-form-item
          label="场馆介绍"
          prop="introduce"
          :rules="rule.input"
        >
          <el-input
            style="width: 72%"
            type="textarea"
            :rows="5"
            placeholder="请输入"
            maxlength="300"
            show-word-limit
            v-model="form.introduce"
          >
          </el-input>
<!--          <p style="width: 42%; color: #FF6B00" class="py-4 leading-5">-->
<!--            <i class="el-icon-warning"></i>要求：简述创建村基本情况、优劣势、必要性和创建目标定位等情况，要求300字以内。-->
<!--          </p>-->
        </el-form-item>

        <el-form-item label="村庄图片" prop="picturesFiles" :rules="imgRule">
          <p style="color: #ff6b00" class="py-3">
            <i class="el-icon-warning"></i>
            照片至多可上传4张，大小不可超过2MB
          </p>
          <UploadImg3
            :limit="4"
            :data="imageList"
            @add="onImageAdd"
            @remove="onImageRemove"
          />
        </el-form-item>
      </div>
    </el-form>
    <div>
      <el-button @click="$router.back()">取消</el-button>
      <el-button type="primary" @click="validateForm">提交</el-button>
    </div>
  </div>
</template>
<script>
// import VilliageListTable from "../Components/VilliageListTable";


import rule from "@/mixins/rule";
import VillageAddressSelect from "../Components/VillageAddressSelect";

import { addVenue, getVenueDetail, modifyVenueDetail } from '@/api3/venueReservation'
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
// const tableList = (rule, value, callback) => {
//   if (value.length) {
//     callback();
//   } else {
//     callback(new Error("请添加项目"));
//   }
// };
export default {
  mixins: [rule],
  components: {
    VillageAddressSelect,
  },
  data() {
    return {
      form: {
        // annexFiles: [], // 附件
        // villageName: "", //村庄地址
        // town: "", //村庄地址
        // villageId: "", //地址
        address: "", //地址
        auditoriumName: "", //场馆名称
        openTime: "", //开放时间
        contactNumber: "", //联系电话
        introduce: "", //场馆介绍
        // picturesArr: [],
        picturesFiles: [],
        photoId: "",
      },
      placeholder: "请选择",
      type: "add",
      pageType: "新建",
      imageList: [], // 回显图片
      imgRule: { required: true, validator: imgs, trigger: "change" },
    };
  },
  computed: {
  },
  watch: {
  },
  mounted() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      const { id } = this.$route.query;
      if (!id) return;
      this.type = "edit";
      this.pageType = "编辑";
      getVenueDetail({ id }).then((res) => {
        this.form = res;
        // this.form.annexFiles = [];
        this.imageList = this.form.photoId.split(",").map(i=> {
          return {
            fileName: "",
            filePath: i,
          }
        });
        this.form.picturesFiles = this.imageList;
        this.placeholder = this.form.address;
        this.finalStatus = res.finalStatus;
        console.log(res);
        this.total = this.countTotal();
      });
    },

    validateForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          // this.form.annexIds = this.form.annexFiles.map(i => i.fileId).toString();
          console.log(this.form.picturesFiles);
          this.form.photoId = this.form.picturesFiles.map(i=> i.filePath).toString();
          console.log(this.form);
          if (this.type === "edit") {
            this.form.id = this.$route.query.id;
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
      await addVenue(params);
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
      // if (!this.form.picturesArr) {
      //   this.form.picturesArr = [];
      // }
      if (!this.form.picturesFiles) {
        this.form.picturesFiles = [];
      }
      // this.form.picturesArr.push(res.fileId);
      this.form.picturesFiles.push(res);

      this.$refs.form.validateField("picturesFiles");
    },
    onImageRemove(res) {
      const index = this.form.picturesFiles.findIndex((list) => {
        return list.uid === res.uid || list.filePath === res.url;
      });

      if (index !== -1) {
        // this.form.picturesArr.splice(index, 1);
        this.form.picturesFiles.splice(index, 1);
      }
      this.$refs.form.validateField("picturesFiles");
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
