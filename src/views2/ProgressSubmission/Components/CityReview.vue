<template>
  <el-form style="padding-left: 14px" ref="form" class="form" label-position="top" :model="form" label-width="80px">
    <div class="input-item-wrp">
      <el-form-item label="村（片区）名称" prop="villageId">
        <p class="content">{{ form.villageName }}</p>
      </el-form-item>
      <el-form-item label="区县" prop="villageId">
        <p class="content">{{ form.country }}</p>
      </el-form-item>
      <el-form-item label="创建批次" prop="declarationBatch">
        <p class="content">{{ form.declarationBatch }}</p>
      </el-form-item>
      <el-form-item label="项目开工率" prop="investNum">
        <p class="content">
          {{ form.startRate ? formatScore(form.startRate || 0) + '%' : '' }}
        </p>
      </el-form-item>
      <el-form-item label="投资完成率" prop="investNum">
        <p class="content">
          {{ form.rate ? formatScore(form.rate || 0) + '%' : '' }}
        </p>
      </el-form-item>
      <el-form-item label="总体进度" prop="investNum">
        <p class="content">
          {{ form.overallProgress ? formatScore(form.overallProgress || 0) + '%' : '' }}
        </p>
      </el-form-item>
      <el-form-item label="报送时间" prop="villageUpTime">
        <p class="content">
          {{ form.villageUpTime }}
        </p>
      </el-form-item>
    </div>
    <el-form-item>
      <!--        <div class="import">-->
      <!--          <el-button type="primary" @click="lookHistory">历史数据</el-button>-->
      <!--        </div>-->
      <CityRVilliageListTable type="look" :data="form.cityProjects" :defaultFirstYear="defaultFirstYear">
      </CityRVilliageListTable>
      <i style="color: #ff6b00">若填报的数据有误，请联系区县负责人修改</i>
    </el-form-item>
    <div id="verify"></div>
    <el-button @click="$emit('closeView')">返回</el-button>
    <el-button type="primary" @click="pass()">通过</el-button>
  </el-form>
</template>

<script>
import CityRVilliageListTable from './CityRVilliageListTable';
import { cityAudit, getCityDetail } from '@/api2/progressSubmission';
import { formatMoney, formatScore } from '@/views2/utils/formatter';
export default {
  components: { CityRVilliageListTable },
  props: {
    id: Number,
    reportingTime: String,
  },
  data() {
    return {
      defaultFirstYear: undefined,
      form: {
        area: '',
        villageName: '',
        declarationBatch: '',
        investNum: '',
        leader: '',
        contactPerson: '',
        phone: '',
        cityProjects: [],
        reportingTime: '',
      },
    };
  },
  beforeMount() {
    this.init();
  },
  methods: {
    formatMoney,
    formatScore,
    init() {
      const { id, reportingTime } = this;
      if (!id) return;
      // if (showComplete) {
      //   this.activeName = 'second';
      // }
      getCityDetail({ id, reportingTime }).then((res) => {
        this.form = res;
        if (res.cityProjects && res.cityProjects[0] && res.cityProjects[0].firstYear) {
          this.defaultFirstYear = res.cityProjects[0].firstYear;
        }
      });
    },
    // 市级审核通过
    pass() {
      this.$confirm('是否确认填报数据无误', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        const data = {
          ids: this.getProjectIds(),
        };
        cityAudit(data).then(() => {
          this.$message({
            type: 'success',
            message: '提交成功!',
          });
          this.$emit('closeView', true);
        });
      });
    },
    getProjectIds() {
      const ids = this.form.cityProjects.map((i) => {
        return i.id;
      });
      return ids;
    },
  },
};
</script>

<style lang="scss" scoped>
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
    line-height: 25px;
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
      width: 16%;
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
    color: #1492ff;
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
</style>
