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
        <el-form-item label="地区" prop="villageId">
          <p class="content">{{ form.address }}</p>
        </el-form-item>
        <el-form-item label="议事主题" prop="countrySortNum">
          <p class="content">{{ form.content }}</p>
        </el-form-item>
      </div>
      <div>
        <div class="input-item-wrp2">
          <el-form-item label="议事内容" prop="introduction">
            <p class="content">{{ form.content }}</p>
          </el-form-item>
        </div>
        <div class="input-item-wrp2">
          <el-form-item label="照片:" prop="villagePicturesArr">
            <ViewImg :data="villagePicturesFiles" />
          </el-form-item>
        </div>
      </div>
      <div class="input-item-wrp">
        <el-form-item label="议事发起人" prop="resPopulation">
          <p class="content">{{ form.initiatorUserName }}</p>
        </el-form-item>
        <el-form-item label="发起人联系方式" prop="resPopulation">
          <p class="content">{{ form.initiatorPhone || "" }}</p>
        </el-form-item>
        <el-form-item label="开始时间" prop="resPopulation">
          <p class="content">{{ form.startDate }}</p>
        </el-form-item>
        <el-form-item label="结束时间" prop="resPopulation">
          <p class="content">{{ form.endDate }}</p>
        </el-form-item>
        <el-form-item label="参加人数" prop="resPopulation">
          <p class="content">{{ form.participantNum }}</p>
        </el-form-item>
        <el-form-item label="状态" prop="resPopulation">
          <p class="content">
            <span
              class="status-icon"
              :style="`background:${
                TYPE_TAG_MAP_COLORS[form.status]
              }`"
            ></span>
            {{ TYPE_STATUS_MAP[form.status] }}
          </p>
        </el-form-item>
      </div>
      <div>
        <div class="input-item-wrp2">
          <el-form-item label="参加人员" prop="resPopulation">
            <p class="content">{{ form.participantUserNicknameList.join(" ") }}</p>
          </el-form-item>
        </div>
      </div>
      <div>
        <div class="input-item-wrp2">
          <el-form-item label="投票结果：" prop="introduction">
            <listTable
              :data="form.onlineNegotiateVoteOptionVOList"
              :showVoteSum="showVoteSum"
              hiddenOperation
            />
          </el-form-item>
        </div>
      </div>
      <div v-if="form.status === 2">
        <div class="input-item-wrp2">
          <el-form-item label="原因" prop="introduction">
            <p class="content">{{ form.checkRefuseReason }}</p>
          </el-form-item>
        </div>
      </div>
    </el-form>
    <div v-if="form.initiatorPhone && form.status === 1" class="bottom-btns">
      <el-button @click="reject">不通过</el-button>
      <el-button type="primary" @click="pass">通过</el-button>
    </div>
    <div v-else class="bottom-btns">
      <el-button @click="$router.back()">返回</el-button>
<!--      <el-button type="primary" @click="edit">编辑</el-button>-->
    </div>
  </div>
</template>

<script>
import { TYPE_STATUS_MAP, TYPE_TAG_MAP_COLORS } from "../constants";
import listTable from "../Components/listTable";
import { getDetail } from "@/api3/OnlineMeeting";
import { mapGetters } from "vuex";
import { examine} from "../../../api3/OnlineMeeting";

export default {
  components: {
    listTable,
  },
  data() {
    return {
      form: {
        address: "", //地址
        topic: "", //议事主题
        content: "", //议事内容
        endDate: "", //结束时间
        participantUser: [], // 本地自用
        participantUserIds: [], //参加人员
        radio: "", // 是否多选???
        onlineNegotiateVoteOptionDTOList: [],
      },
      showVoteSum: true,
      villagePicturesFiles: [],
      TYPE_STATUS_MAP,
      TYPE_TAG_MAP_COLORS,
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
      const { id } = this.$route.query;
      if (!id) return;
      getDetail({ id }).then((res) => {
        this.form = res;
        if(res.status === 1 || res.status === 2) {
          this.showVoteSum = false;
        }
        console.log(this.form.pics.split(","));
        this.villagePicturesFiles = res.pics.split(",").map(i => {
          return {
            filePath: i,
          }
        });
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
    reject() {
      this.$confirm("是否确认不通过该条议事信息？", "提示", {
        type: "warning",
      }).then(() => {
        this.$prompt('请输入不通过原因', '提示', {
          confirmButtonText: '提交',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          const params = {
            id: this.$route.query.id,
            checkStatus: 2, // 不通过
            checkRefuseReason: value,
          };
          examine(params).then(() => {
            this.$notify.success("不通过成功");
            this.init();
          });
        }).catch(() => {
        });
      });
    },
    pass() {
      this.$confirm("是否确认通过该条议事信息？", "提示", {
        type: "warning",
      }).then(() => {
        const params = {
          id: this.$route.query.id,
          checkStatus: 0,
        };
        examine(params).then(() => {
          this.$notify.success("通过成功");
          this.init();
        });
      });
    }
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
.status-icon {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 100%;
}
</style>