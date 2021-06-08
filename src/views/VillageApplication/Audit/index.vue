<template>
  <div>
    <div v-if="$route.name !== 'declareDetail'" key="list">
      <el-form
        class="form"
        label-position="top"
        ref="form"
        :model="form"
        label-width="80px"
      >
        <h3 class="text-gray-800 text-2xl mb-8">申报详情</h3>
        <div class="item">
          <span class="title">申报类型：</span>
          <span class="con">{{ form.declareType }}申报</span>
        </div>
        <div class="item">
          <span class="title">申报年度：</span>
          <span class="con">{{ form.declareYear }}</span>
        </div>
        <el-form-item label="村庄名单：">
          <el-table class="table" :data="form.detail" style="width: 70%">
            <el-table-column label="序号" type="index"> </el-table-column>
            <el-table-column prop="address" label="村庄所在乡镇">
            </el-table-column>
            <el-table-column prop="villageName" label="村庄名称">
            </el-table-column>
            <el-table-column label="详情">
              <template slot-scope="scope">
                <el-link type="primary" @click="goDetail(scope.row)">
                  详情
                </el-link>
              </template>
            </el-table-column>
            <el-table-column label="排序">
              <template slot-scope="scope">
                <el-input-number
                  style="width: 70px"
                  v-model="scope.row.sortNum"
                  controls-position="right"
                  :min="1"
                  :step="1"
                ></el-input-number>
              </template>
            </el-table-column>
            <el-table-column label="审核" width="186">
              <template slot-scope="scope">
                <el-radio v-model="scope.row.status" label="1">通过</el-radio>
                <el-radio v-model="scope.row.status" label="2">不通过</el-radio>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <div class="btn-wrp">
          <el-button @click="$router.push({ name: 'VillageApplyList' })"
            >取消</el-button
          >
          <el-button type="primary" @click="validateForm">提交</el-button>
        </div>
      </el-form>
    </div>
    <router-view />
  </div>
</template>
<script>
import { mapState } from "vuex";
import rule from "@/mixins/rule";
import { getVillageDetail, verify } from "@/api/villageManage";

import { DECLEAR_TYPE } from "../constants";
export default {
  mixins: [rule],
  data() {
    return {
      id: 0,
      form: {
        declareYear: "",
        declareType: "",
        detail: [],
      },

      showDetail: false,
    };
  },
  computed: {
    ...mapState("villageMange", ["declareList"]),
  },
  mounted() {
    if (this.$route.name === "audit") {
      const { id, declareYear, declareType } = this.declareList;
      this.id = id;
      this.form.declareYear = declareYear;
      this.form.declareType = DECLEAR_TYPE[declareType];

      if (!id) {
        this.$router.replace({ name: "VillageApplyList" });
        return;
      }

      this.getVillageDetail();
    }
  },
  methods: {
    getVillageDetail() {
      getVillageDetail({ id: this.id }).then((res) => {
        this.form.detail =
          res.map((item, i) => {
            return {
              ...item,
              sortNum: i + 1,
              status: "",
            };
          }) || [];
      });
    },

    goDetail(row) {
      this.$router.push({ name: "auditDetail", query: { id: row.id } });
    },

    validateForm() {
      // 判断审核
      const isAudit = this.checkAudit();
      // 判断排序
      const isSort = this.checkSort();
      // 提交
      if (isAudit && isSort) {
        this.$myConfirm({
          content: "是否确认提交",
        }).then(() => {
          const params = this.form.detail.map((item) => {
            return {
              id: item.id,
              status: item.status,
              sortNum: item.sortNum,
            };
          });

          verify(params).then((res) => {
            console.log(res);
          });
        });
      }
    },

    checkAudit() {
      const rst = this.form.detail.findIndex((item) => {
        return item.status === "";
      });
      if (rst !== -1) {
        this.$message.error("请审核完成后再提交");
        return false;
      }
      return true;
    },
    checkSort() {
      let rst = true;
      const map = {};
      for (let i = 0; i < this.form.detail.length; i += 1) {
        const item = this.form.detail[i];
        if (!map[item.sortNum]) {
          map[item.sortNum] = 1;
        } else {
          rst = false;
        }
      }
      if (!rst) {
        this.$message.error("排序错误，请仔细核查后提交");
      }
      return rst;
    },
    submit() {},
  },
};
</script>
<style lang="scss" scoped>
.input {
  width: 315px;
}
.add-wrp {
  width: 45%;
  margin-bottom: 150px;
  .el-icon-plus {
    font-size: 16px;
  }
}
.item {
  line-height: 42px;
  .title {
    font-size: 16px;
    color: #666666;
    margin-right: 20px;
  }
  .con {
    font-size: 16px;
    font-weight: 500;
    color: #333333;
  }
}
.form {
  ::v-deep .el-form-item__label {
    font-size: 16px;
    color: #666666;
    margin-bottom: 10px;
  }
}
.table {
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.05);
  ::v-deep tr th {
    background-color: #f3f3f3;
    color: #222;
  }
  ::v-deep .el-input__inner {
    padding: 0;
    text-align: left;
    padding-left: 10px;
  }
}
.btn-wrp {
  // width: 70%;
  // display: flex;
  // justify-content: flex-end;
  // margin-top: 50px;
  // padding-right: 10%;
}
</style>
