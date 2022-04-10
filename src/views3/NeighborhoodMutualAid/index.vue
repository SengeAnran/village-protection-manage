<template>
  <div class="block">
    <div>
      <div class="text-lg mb-4">邻里互助</div>
      <Crud
        ref="crud"
        idKey="id"
        :get-method="getMethod"
        :query.sync="query"
        actionWidth="100px"
        :hideAdd="true"
        :hideEdit="true"
        :hideView="true"
        :hideDelete="true"
        :hideDialogAction="true"
        :permission-edit="0"
        :permission-add="0"
        :permission-delete="0"
        @resetForm="resetForm"
      >
        <template v-slot:search>
          <div class="inline-flex pl-0 flex-wrap">
            <div class="search-item">
              <span class="label">地区：</span>
              <el-input
                style="width: 200px"
                v-model="query.address"
                :maxlength="50"
                placeholder="请输入所在地"
              ></el-input>
            </div>
            <div class="search-item">
              <span class="label">申请人：</span>
              <el-input
                style="width: 150px"
                v-model="query.applicant"
                :maxlength="50"
                placeholder="请输入申请人"
              ></el-input>
            </div>
            <div class="search-item">
              <span class="label">发起时间：</span>
              <el-date-picker
                v-model="searchDate"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </div>
            <div class="search-item">
              <span class="label">状态：</span>
              <el-select
                v-model="query.mutualAidStatus"
                placeholder="请选择"
                clearable
                style="width: 150px"
              >
                <el-option value="" label="全部"></el-option>
                <el-option
                  v-for="key in Object.keys(TYPE_TAG_MAP)"
                  :key="key"
                  :value="key"
                  :label="TYPE_TAG_MAP[key]"
                ></el-option>
              </el-select>
            </div>
          </div>
        </template>
        <template v-slot:tableAction="scope">
          <div style="text-align: left">
            <el-link @click="goDetail(scope)" type="primary"> 详情 </el-link>
            <el-divider direction="vertical"></el-divider>
            <el-link @click="deleteItem(scope.data.id)" type="danger">
              删除
            </el-link>
          </div>
        </template>

        <template v-slot:table>
          <el-table-column label="地区" prop="address"></el-table-column>
          <el-table-column label="互助事项" prop="matterName"></el-table-column>
          <el-table-column label="申请人" prop="applicant"></el-table-column>
          <el-table-column label="发起时间" prop="gmtCreate"></el-table-column>
          <el-table-column label="截止时间" prop="deadline"></el-table-column>
          <el-table-column label="状态" prop="mutualAidStatus">
            <template slot-scope="scope">
              <span
                class="status-icon"
                :style="`background:${
                  TYPE_TAG_MAP_COLORS[scope.row.mutualAidStatus]
                }`"
              ></span>
              {{ TYPE_TAG_MAP[scope.row.mutualAidStatus] }}
            </template>
          </el-table-column>
        </template>
      </Crud>
    </div>
    <HelpDetail
      :visible.sync="detailVisible"
      :data="detailData"
      @pass="onHandlePass"
      @noPass="noPassVisible = true"
      :loading="detailLoading"
    />
    <NoPassDialog :visible.sync="noPassVisible" @confirm="onHandleNoPass" />
  </div>
</template>

<script>
import {
  getHelpList,
  deleteHelp,
  getHelpDetail,
  changeStatus,
} from "../../api3/neighborhoodMutualAid";
import { TYPE_TAG_MAP, TYPE_TAG_MAP_COLORS } from "./constants";
import HelpDetail from "./HelpDetail.vue";
import NoPassDialog from "./NoPassDialog.vue";
export default {
  name: "index",
  components: { HelpDetail, NoPassDialog },
  data() {
    return {
      query: {
        address: "",
        applicant: "",
        startTime: "",
        endTime: "",
        mutualAidStatus: null,
      },
      searchDate: null,

      // 详情展示
      detailId: 0,
      detailData: {},
      detailFlag: true,
      detailVisible: false,
      detailLoading: false,

      noPassVisible: false,

      getMethod: getHelpList,
      deleteMethod: deleteHelp,
      TYPE_TAG_MAP,
      TYPE_TAG_MAP_COLORS,
    };
  },
  watch: {
    searchDate(val) {
      if (val) {
        this.query.startTime = val[0];
        this.query.endTime = val[1];
      } else {
        this.query.startTime = null;
        this.query.endTime = null;
      }
    },
    detailVisible(val) {
      // 关闭详情弹窗时清空数据
      if (val) {
        this.detailData = {};
      }
    },
  },
  methods: {
    newOne() {
      this.$router.push({
        path: "/venueReservation/new",
      });
    },

    goDetail(scope) {
      const { id } = scope.data;
      if (!id) return;
      if (!this.detailFlag) return;

      this.detailId = id;
      this.detailFlag = false;
      this.detailVisible = true;
      this.detailLoading = true;
      getHelpDetail(id)
        .then((res) => {
          this.detailData = res;
          this.detailFlag = true;
          this.detailLoading = false;
        })
        .catch(() => {
          this.detailFlag = true;
          this.detailLoading = false;
        });
    },
    deleteItem(id) {
      this.$confirm(
        "删除该申请信息将无法恢复，请谨慎删除！",
        "是否确认删除该信息？",
        {
          type: "warning",
        }
      ).then(async () => {
        deleteHelp(id).then(() => {
          this.$notify.success("删除成功");
          this.$refs.crud.getItems();
        });
      });
    },

    onHandlePass() {
      this.$confirm("是否通过审核?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const params = {
            id: this.detailId,
            mutualAidStatus: 1,
          };
          await this.changeStatus(params);
          this.detailVisible = false;
          this.$refs.crud.getItems();
        })
        .catch(() => {});
    },
    async onHandleNoPass(reviewNotes) {
      console.log(reviewNotes);
      const params = {
        id: this.detailId,
        mutualAidStatus: 0,
        reviewNotes,
      };
      await this.changeStatus(params);
      this.noPassVisible = false;
      this.$refs.crud.getItems();
    },

    changeStatus(params) {
      return changeStatus(params)
        .then(() => {
          this.$notify.success("操作成功!");
        })
        .catch(() => {
          this.noPassVisible = false;
          this.detailVisible = true;
        });
    },

    resetForm() {
      this.searchDate = null;
    },
  },
};
</script>

<style lang="scss" scoped>
.search-item {
  margin-right: 20px;
  margin-bottom: 20px;
  .label {
    font-weight: 400;
    color: #333333;
  }
}
.status {
  display: inline-block;
  margin-right: 6px;
  width: 8px;
  height: 8px;
  border-radius: 100%;
  background: #ccc;
  &.active {
    background: #15be50;
  }
}
.status-icon {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 100%;
}
</style>
