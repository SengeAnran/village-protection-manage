<template>
  <div>
    <transition name="fade-transform" mode="out-in">
      <div v-if="$route.name === 'auditList'" key="list">
        <el-form
          class="form"
          label-position="top"
          ref="form"
          :model="form"
          label-width="80px"
        >
          <h3 class="text-gray-800 text-2xl mb-8">审核详情</h3>
          <div class="item">
            <span class="title">申报类型：</span>
            <span class="con">{{ form.declareType }}申报</span>
          </div>
          <div class="item">
            <span class="title">申报年度：</span>
            <span class="con">{{ form.declareYear }}</span>
          </div>
          <el-form-item label="村庄名单：">
            <VilliageListTable
              :hiddenDetail="true"
              :hiddenEdit="true"
              :hiddenDeclareResult="false"
              :data="form.detail"
            />
          </el-form-item>
        </el-form>
      </div>

      <Detail key="detail" v-if="showDetail" @close="showDetail = false" />
    </transition>
  </div>
</template>
<script>
import rule from "@/mixins/rule";
import VilliageListTable from "../Components/VilliageListTable";
import { getVillageDetail } from "@/api/villageManage";

import Detail from "../Detail";

export default {
  mixins: [rule],
  components: { VilliageListTable, Detail },
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
  created() {
    this.id = this.$route.query.id;
    this.form.declareYear = this.$route.query.declareYear;
    this.form.declareType = this.$route.query.declareType;
    this.getVillageDetail();
  },
  methods: {
    getVillageDetail() {
      getVillageDetail({ id: this.id }).then((res) => {
        this.form.detail = res || [];
      });
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
