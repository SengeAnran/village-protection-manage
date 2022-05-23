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
          <p class="content">{{ form.address }}{{ form.town }}{{ form.villageName }}</p>
        </el-form-item>
        <el-form-item label="场馆名称" prop="countrySortNum">
          <p class="content">{{ form.auditoriumName }}</p>
        </el-form-item>
        <el-form-item label="开放时间" prop="resPopulation">
          <p class="content">{{ form.openTime }}</p>
        </el-form-item>
        <el-form-item label="联系电话" prop="resPopulation">
          <p class="content">{{ form.contactNumber }}</p>
        </el-form-item>
      </div>
      <div>
        <div class="input-item-wrp2">
          <el-form-item label="场馆介绍" prop="introduction">
            <p class="content">{{ form.introduce }}</p>
          </el-form-item>
        </div>
        <div class="input-item-wrp2">
          <el-form-item label="照片:" prop="villagePicturesArr">
            <ViewImg :data="villagePicturesFiles" />
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

import { getVenueDetail } from "@/api3/venueReservation";
import { mapGetters } from "vuex";

export default {
  components: {
  },
  data() {
    return {
      form: {
        address: "", //地址
        auditoriumName: "", //场馆名称
        openTime: "", //开放时间
        contactNumber: "", //联系电话
        introduce: "", //场馆介绍
        picturesArr: [],
        picturesFiles: [],
        photoId: "",
      },
      villagePicturesFiles: [],
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
      getVenueDetail({ id }).then((res) => {
        this.form = res;
        this.villagePicturesFiles = res.photoId.split(",").map(i => {
          return {
            filePath: i,
          }
        })
        //console.log(res);
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
  .input-item-wrp2 {
    display: flex;
    flex-wrap: wrap;
    //margin-bottom: 18px;

    ::v-deep .el-form-item {
      width: 80%;
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