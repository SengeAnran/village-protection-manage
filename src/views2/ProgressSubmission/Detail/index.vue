<template>
  <div class="block">
    <RouterBack>详情</RouterBack>
    <div class="box-title">未来乡村项目进度报送</div>
    <el-form
      style="padding-left: 14px"
      ref="form"
      class="form"
      label-position="top"
      :model="form"
      label-width="80px"
    >
      <div class="input-item-wrp">
        <el-form-item label="创建村/片区名称" prop="villageId">
          <p class="content">{{ form.name }}</p>
        </el-form-item>
        <el-form-item label="创建批次" prop="declarationBatch">
          <p class="content">{{ form.declarationBatch }}</p>
        </el-form-item>
        <el-form-item label="总投资（万元）" prop="investNum">
          <p class="content">
            {{ formatMoney(form.investNum) }}
          </p>
        </el-form-item>
        <el-form-item label="领办领导">
          <p class="content">{{ form.leader }}</p>
        </el-form-item>
        <el-form-item label="联系人">
          <p class="content">{{ form.contactPerson }}</p>
        </el-form-item>
        <el-form-item label="联系方式" prop="resPopulation">
          <p class="content">{{ form.phone }}</p>
        </el-form-item>
      </div>
      <el-form-item>
        <div class="import">
          <el-button type="primary" @click="lookHistory" >历史数据</el-button>
        </div>
        <VilliageListTable v-if="showTable" type="look" :data="form.detailLists" />
      </el-form-item>
      <div id="verify"></div>
      <el-button @click="$router.back()">返回</el-button>
    </el-form>
    <el-dialog
      title="详情"
      :visible.sync="dialogVisible"
      width="90%"
    >
      <VillageListHistoryTable :data="historyList" />
    </el-dialog>
  </div>
</template>
<script>
import VilliageListTable from "../Components/VilliageListTable";
import VillageListHistoryTable from "../Components/VillageListHistoryTable";
import rule from "@/mixins/rule";
import { HISTORY_BUILDINGS } from "../constants";
import {getDetail, getHistory} from "@/api2/progressSubmission";
import { formatMoney } from '@/views2/utils/formatter';

export default {
  mixins: [rule],
  components: {
    VilliageListTable,
    VillageListHistoryTable,
  },
  data() {
    return {
      form: {
        area: '',
        villageName: '',
        declarationBatch: '',
        investNum: '',
        leader: '',
        contactPerson: '',
        phone: '',
        detailLists: [],
      },
      historyList: [],
      finalStatus: null,
      total: 0,

      tips: "",
      dialogVisible: false,
      dialogId: "",
      textarea: "",
      status: null,
      showTable: false,
    };
  },
  created() {
    this.historyBuildings = HISTORY_BUILDINGS;
  },
  mounted() {
    this.init();
  },
  methods: {
    formatMoney,
    init() {
      const { id } = this.$route.query;
      if (!id) return;
      getDetail({ id }).then((res) => {
        this.form = res;
        this.showTable = true;
      });
    },
    async lookHistory() {
      const res = await getHistory({ id: this.$route.query.id })
      this.historyList = res;
      this.dialogVisible = true;
    }
    // async clickExport() {
    //   const { id } = this.$route.query;
    //   const res = await getvillageDetailExport({id})
    //   downloadFile(res, "浙江省未来乡村创建申报表", "application/msword")
    // },
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
  .bottom-button {
    padding: 32px 0px 20px;
    text-align: right;
  }
}
.import {
  width: 90%;
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
  margin-bottom: 12px;
}
</style>
