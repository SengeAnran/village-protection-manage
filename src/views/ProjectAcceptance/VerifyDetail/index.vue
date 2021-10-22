<template>
  <div>
    <el-form ref="form" :model="form" label-width="100px" label-position="top">
      <div class="block">
        <div
          class="text-lg cursor-pointer inline-block"
          @click="$router.back()"
        >
          <i class="el-icon-arrow-left"></i>
          <span> 验收详情</span>
        </div>
        <div class="mt-4">
          <el-timeline class="mt-8 ml-14">
            <el-timeline-item
              v-for="item in processList"
              :key="item.id"
              :icon="reviewStatusMap[item.lastStatus] === '通过' || item.score >= 60? 'el-icon-check':'el-icon-close'"
              :type="reviewStatusMap[item.lastStatus] === '通过' || item.score >= 60? 'success':'danger'"
              size="large"
            >
              <div class="relative">
                <div class="role">{{ roleMap[item.role] }}</div>
                <div class="mb-4">
                  <el-tag :type="reviewStatusMap[item.lastStatus] === '通过' || item.score >= 60? 'success' : 'danger'">{{ item.grade || reviewStatusMap[item.lastStatus]}}</el-tag>
                </div>
                <div class="mb-4">{{ item.gmtCreate }}</div>
                <div class="text-gray-400 mb-2">验收意见</div>
                <div class="mb-4">{{ item.remark }}</div>
                <div class="text-gray-400 mb-2">附件</div>
                <div class="mb-4">
                  <ViewFile
                    :data="item.processFilesList"
                    v-if="item.processFilesList && item.processFilesList.length"
                  />
                  <p v-else>--</p>
                </div>
              </div>
            </el-timeline-item>
          </el-timeline>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import rule from "@/mixins/rule";
import { getAcceptanceDetail } from "@/api/projectAcceptance";

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
        // 2001: "待市级审核",
        // 2002: "市级审核不通过",
        // 2003: "省级审核不通过",
        // 2004: "市级审核通过，待省级审核",
        // 2999: "验收通过",
        2001: "通过",
        2002: "不通过",
        2003: "不通过",
        2004: "通过",
        2005: "不合格",
        2999: "通过",
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
      this.processList = await getAcceptanceDetail(this.id);
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
