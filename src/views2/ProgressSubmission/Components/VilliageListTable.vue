<template>
  <el-table class="table" :data="data" border style="width: 90%">
    <el-table-column label="序号" type="index" fixed> </el-table-column>
    <el-table-column prop="projectName" label="项目名称" width="120"> </el-table-column>
    <el-table-column prop="constructUnit" label="建设单位" width="120"> </el-table-column>
    <el-table-column prop="constructAddress" label="建设地点" width="120"> </el-table-column>
    <el-table-column prop="constructDetail" label="建设内容和规模" width="120"> </el-table-column>
    <el-table-column prop="schedule" label="进度安排" width="120"> </el-table-column>
    <el-table-column prop="landUse" label="用地情况" width="120"> </el-table-column>
    <el-table-column label="计划投资" width="350">
      <el-table-column prop="investmentAmount" label="总投资（万元）" width="120"> </el-table-column>
      <el-table-column prop="planGovInvestment" label="政府投资（万元）" width="150">
        <template slot-scope="scope">
<!--          <el-button @click="onClick(scope)">sss</el-button>-->
          <!-- 县级用户 -->
          <div v-if="userInfo.roleId === 3">
            <el-form-item
              v-if="showFirst"
              label=""
              :show-message="false"
            >
              <el-input-number
                v-model="form.detailLists[scope.$index].planGovInvestment"
                :controls="false"
                size="mini"
                maxlength="20"
                placeholder="请输入"
              />
            </el-form-item>
            <span v-else class="cell">{{ scope.row.planGovInvestment }}</span>
          </div>
          <!-- 省市级用户 -->
          <div v-else>
            <span class="cell">{{ scope.row.planGovInvestment }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="planSocialInvestment" label="社会投资（万元）" width="150">
        <template slot-scope="scope">
          <!-- 县级用户 -->
          <div v-if="userInfo.roleId === 3">
            <el-form-item
              v-if="showFirst"
              label=""
              :show-message="false"
            >
              <el-input-number
                v-model="form.detailLists[scope.$index].planSocialInvestment"
                :controls="false"
                size="mini"
                maxlength="20"
                placeholder="请输入"
              />
            </el-form-item>
            <span v-else class="cell">{{ scope.row.planSocialInvestment }}</span>
          </div>
          <!-- 省市级用户 -->
          <div v-else>
            <span class="cell">{{ scope.row.planSocialInvestment }}</span>
          </div>
        </template>
      </el-table-column>
    </el-table-column>

    <el-table-column v-if="!showFirst && !history && data[0] && data[0].gmtModified" :label="'完成投资 ' + data[0].gmtModified.slice(0, 10)" width="250">
      <el-table-column prop="completeTotalInvestment" label="总投资（万元）" width="120"></el-table-column>
      <el-table-column prop="completeGovInvestment" label="其中政府投资（万元）" width="120"></el-table-column>
      <el-table-column prop="completeSocialInvestment" label="其中社会投资（万元）" width="120"></el-table-column>
    </el-table-column>
    <span v-if="history && data[0] && data[0].historyLists && data[0].historyLists.length > 0">
      <el-table-column v-for="(item, index) in data[0].historyLists" :key=index :label="'完成投资 ' + data[0].historyLists && data[0].historyLists.length >0 && item.gmtModified && item.gmtModified.slice(0, 10)" width="250">
      <el-table-column label="总投资（万元）" width="120">
        <template slot-scope="scope">
          <span>{{scope.row.historyLists[index].completeTotalInvestment}}</span>
        </template>
      </el-table-column>
      <el-table-column label="其中政府投资（万元）" width="120">
        <template slot-scope="scope">
          <span>{{scope.row.historyLists[index].completeGovInvestment}}</span>
        </template>
      </el-table-column>
      <el-table-column label="其中社会投资（万元）" width="120">
        <template slot-scope="scope">
          <span>{{scope.row.historyLists[index].completeGovInvestment}}</span>
        </template>
      </el-table-column>
    </el-table-column>
    </span>

    <el-table-column v-if="type === 'edit' && !history" label="完成投资" width="250">
      <el-table-column prop="completeTotalInvestmentNow" label="总投资（万元）" width="150">
        <template slot-scope="scope">
          <!-- 县级用户 -->
          <div>
            <el-form-item
              label=""
              :show-message="false"
            >
              <el-input-number
                v-model="form.detailLists[scope.$index].completeTotalInvestmentNow"
                :controls="false"
                size="mini"
                maxlength="20"
                placeholder="请输入"
              />
            </el-form-item>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="completeGovInvestmentNow" label="其中政府投资（万元）" width="150">
        <template slot-scope="scope">
          <!-- 县级用户 -->
          <div>
            <el-form-item
              label=""
              :show-message="false"
            >
              <el-input-number
                v-model="form.detailLists[scope.$index].completeGovInvestmentNow"
                :controls="false"
                size="mini"
                maxlength="20"
                placeholder="请输入"
              />
            </el-form-item>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="completeSocialInvestmentNow" label="其中社会投资（万元）" width="150">
        <template slot-scope="scope">
          <!-- 县级用户 -->
          <div>
            <el-form-item
              label=""
              :show-message="false"
            >
              <el-input-number
                v-model="form.detailLists[scope.$index].completeSocialInvestmentNow"
                :controls="false"
                size="mini"
                maxlength="20"
                placeholder="请输入"
              />
            </el-form-item>
          </div>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column prop="rate" width="120" label="完成率">
      <template slot-scope="scope">
        <!-- 县级用户 -->
        <div v-if="userInfo.roleId === 3 && !history && type !== 'look'">
          <span class="cell">{{ (form.detailLists[scope.$index].completeTotalInvestmentNow / form.detailLists[scope.$index].investmentAmount) * 100 +'%'||'--'}}</span>
        </div>
        <!-- 省市级用户 -->
        <div v-else>
          <span class="cell">{{ scope.row.rate * 100 + '%' }}</span>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import { mapGetters } from "vuex";
import rule from "@/mixins/rule";
export default {
  mixins: [rule],
  props: {
    form: {
      type: Object,
      default: () => {},
    },
    data: {
      type: Array,
      default: () => [],
    },
    history: { // 查看历史
      type: Boolean,
      default: false,
    },
    hiddenOperation: { // 隐藏操作栏
      type: Boolean,
      default: false,
    },
    hiddenDetail: {
      type: Boolean,
      default: false,
    },
    declareYear: {
      type: Number,
      default: null,
    },
    hiddenEdit: {
      type: Boolean,
      default: true,
    },
    hiddenDeclareResult: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      type: 'edit',
      refill: false,
      showFirst: false,
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  beforeMount() {
    this.init();
  },
  methods: {
    init() {
      if (!this.history) {
        if (this.$route.query.type === 'look') {
          this.type = 'look';
        }
        console.log(this.data && this.data.length > 0);
        console.log(this.data);
        if (this.data && this.data.length > 0) {
          this.showFirst = this.data.every(i => {
            return i.planGovInvestment === null
          });
          console.log(this.showFirst);
        }
      }
      console.log(this.showFirst);
    },
    removeItem(index) {
      this.$myConfirm({
        content: "确认删除该数据？"
      }).then(() => {
        this.$emit("remove", index);
      })
    },
    onClick(scope) {
      console.log(scope);
      console.log(scope.$index);
    },
  },
};
</script>
<style lang="scss" scoped>
.table {
  display: block !important;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.05);
  ::v-deep tr th {
    background-color: #f3f3f3;
    color: #222;
  }
  &::v-deep .el-table__body-wrapper{
    //width: 10px;
    //height: 10px;
    //background-color: #1e8dff;
    //padding-bottom: 10px;
    &::-webkit-scrollbar{
      z-index: 10;
      width: 10px;
      height: 10px;
    }
  }
  &::v-deep .el-table__fixed {
    border-bottom: 5px solid rgba(238, 35, 35, 0);
  }
}

</style>
