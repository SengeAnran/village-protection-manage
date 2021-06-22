<template>
  <div>
    <el-form ref="form" :model="form" label-width="100px" label-position="top">
      <div class="block">
        <div
          class="text-lg cursor-pointer inline-block"
          @click="$router.back()"
        >
          <i class="el-icon-arrow-left"></i>
          <span> 审核详情</span>
        </div>
        <div class="mt-4">
          <div>
            <el-form-item class="inline-block" label="重点村名称：">
              <p class="input">{{ villageName }}</p>
            </el-form-item>
            <el-form-item class="inline-block" label="年度：">
              <p class="input">{{ declareYear }}</p>
            </el-form-item>
          </div>
          <div>
            <el-form-item class="inline-block" label="审核状态：">
              <p class="input">{{ reviewStatusMap[reviewStatus] }}</p>
            </el-form-item>
          </div>
          <p class="ml-4 mb-2 mt-4">审核详情</p>
          <el-timeline class="mt-8 ml-14" v-if="processList.length">
            <el-timeline-item v-for="item in processList" :key="item.id">
              <div class="relative">
                <div class="role">{{ roleMap[item.role] }}</div>
                <div class="mb-4">
                  <el-tag>{{ reviewStatusMap[item.lastStatus] }}</el-tag>
                </div>
                <div class="mb-4">{{ item.gmtCreate }}</div>
                <div class="text-gray-400 mb-4">验收意见</div>
                <div>{{ item.remark }}</div>
              </div>
            </el-timeline-item>
          </el-timeline>
          <p v-else class="pl-4 text-sm pt-2">--</p>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import rule from "@/mixins/rule";
import { getProcess } from "@/api/planningReview";

export default {
  mixins: [rule],
  data() {
    return {
      id: "",
      villageName: "",
      reviewStatus: "",
      declareYear: "",
      reviewStatusMap: {
        2000: "未填报",
        2001: "待市级审核",
        2002: "市级审核不通过",
        2003: "省级审核不通过",
        2004: "市级审核通过，待省级审核",
        2999: "验收通过",
      },
      form: {},
      processList: [],
      //县级:6001 市级:6002 省级:6003
      roleMap: {
        6001: "县级",
        6002: "市级",
        6003: "省级",
      },
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.villageName = this.$route.query.villageName;
    this.reviewStatus = this.$route.query.reviewStatus;
    this.declareYear = this.$route.query.declareYear;
    this.getProcess();
  },
  methods: {
    async getProcess() {
      this.processList = await getProcess(this.id);
    },
  },
};
</script>

<style lang="scss" scoped>
.input {
  width: 300px;
}
.el-form-item {
  margin-left: 15px;
}
.role {
  position: absolute;
  top: 2px;
  left: -66px;
}
</style>
