<template>
  <div class="block">
    <RouterBack>申报详情</RouterBack>
    <div>
      <el-form
        style="padding-left: 14px"
        class="form"
        label-position="top"
        ref="form"
        :model="form"
        label-width="80px"
      >
        <div class="item">
          <span class="title">申报类型：</span>
          <span class="con">{{ form.declareType }}申报</span>
        </div>
        <div class="item">
          <span class="title">申报年度：</span>
          <span class="con">{{ form.declareYear }}</span>
        </div>
        <el-form-item label="村庄名单：">
          <VilliageListTable :data="form.detail" @goDetail="goDetail" />
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import rule from "@/mixins/rule";
import VilliageListTable from "../Components/VilliageListTable";
import { getVillageDetail } from "@/api/villageManage";

import { DECLEAR_TYPE } from "../constants";
export default {
  mixins: [rule],
  components: { VilliageListTable },
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
    if (this.$route.name === "declareList") {
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
        this.form.detail = res || [];
      });
    },

    goDetail(row) {
      this.$router.push({ name: "villageDetail", query: { id: row.id } });
    },
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
</style>
