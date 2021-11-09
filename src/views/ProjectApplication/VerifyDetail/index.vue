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
            <el-form-item class="inline-block" label="项目所在地">
              <p class="input">{{ address }}</p>
            </el-form-item>
            <el-form-item class="inline-block" label="项目类型">
              <p class="input">{{ projectTypeMap[projectType] }}</p>
            </el-form-item>
          </div>
          <div>
            <el-form-item class="inline-block" label="申报年度">
              <p class="input">{{ declareYear }}</p>
            </el-form-item>
            <el-form-item class="inline-block" label="审核状态">
              <p class="input">{{ projectStatusMap[projectStatus] }}</p>
            </el-form-item>
          </div>
          <p class="ml-4 mb-2 mt-4">审核详情</p>
          <el-timeline class="mt-8 ml-14" v-if="processList.length">
            <el-timeline-item
              v-for="item in processList"
              :key="item.id"
              :icon="projectStatusMap[item.lastStatus] === '通过'? 'el-icon-check':'el-icon-close'"
              :type="projectStatusMap[item.lastStatus] === '通过'? 'success':'danger'"
              size="large"
            >
              <div class="relative">
                <div class="role">{{ roleMap[item.role] }}</div>
                <div class="mb-4">
                  <el-tag :type="projectStatusMap[item.lastStatus] === '通过'? 'success' : 'danger'">{{ projectStatusMap[item.lastStatus] || item.grade }}</el-tag>
                </div>
                <div class="mb-4">{{ item.gmtCreate }}</div>
                <div class="text-gray-400 mb-4">审核意见</div>
                <div class="mb-4">{{ item.remark || item.suggestion }}</div>
<!--                <div v-if="item.score >= 0">-->
<!--                  <div class="text-gray-400 mb-2">审核附件</div>-->
<!--                  <div class="mb-4">-->
<!--                    <ViewFile-->
<!--                      :data="item.approvalFilesList"-->
<!--                      v-if="item.approvalFilesList && item.approvalFilesList.length"-->
<!--                    />-->
<!--                    <p v-else>&#45;&#45;</p>-->
<!--                  </div>-->
<!--                  <div class="text-gray-400 mb-2">政府批复附件</div>-->
<!--                  <div class="mb-4">-->
<!--                    <ViewFile-->
<!--                      :data="item.suggestionFilesList"-->
<!--                      v-if="item.suggestionFilesList && item.suggestionFilesList.length"-->
<!--                    />-->
<!--                    <p v-else>&#45;&#45;</p>-->
<!--                  </div>-->
<!--                </div>-->
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
import { verifyDetail } from "@/api/projectDeclare";

export default {
  mixins: [rule],
  data() {
    return {
      id: "",
      address: "",
      projectStatus: "",
      projectType: "",
      declareYear: "",
      projectStatusMap: {
        2000: "未填报",
        2001: "待市级审核",
        // 2002: "市级审核不通过",
        // 2003: "省级审核不通过",
        // 2004: "市级审核通过，待省级审核",
        2002: "不通过",
        2003: "不通过",
        2004: "通过",
        2999: "通过",
      },
        projectTypeMap: {
        30001: "修缮",
        30002: "扩建",
        30003: "开发利用",
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
    // this.villageName = this.$route.query.villageName;
    // this.projectStatus = this.$route.query.projectStatus;
    // this.declareYear = this.$route.query.declareYear;
    this.getProcess();
  },
  methods: {
    async getProcess() {
      const res = await verifyDetail(this.id);
      this.address = res.address;
      this.projectType = res.projectType;
      this.declareYear = res.years;
      this.projectStatus = res.projectStatus;
      this.processList = res.processDetails;
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
