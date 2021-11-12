<template>
  <el-table class="table" :data="data" style="width: 45%">
    <el-table-column label="序号" type="index"> </el-table-column>
    <el-table-column prop="address" label="村庄所在乡镇"> </el-table-column>
    <el-table-column prop="villageName" label="村庄名称"> </el-table-column>
    <el-table-column
      v-if="!hiddenDeclareResult"
      label="市级审核结果"
      align="center"
    >
      <template slot-scope="scope">
        <el-link v-if="scope.row.cityVerify" :underline="false" type="success"
          >通过</el-link
        >
        <el-link
          v-if="
            !scope.row.cityVerify && typeof scope.row.cityVerify === 'number'
          "
          :underline="false"
          type="danger"
          >不通过</el-link
        >
        <el-link
          v-if="
            !scope.row.cityVerify && typeof scope.row.cityVerify !== 'number'
          "
          :underline="false"
          type="warning"
          >未审核</el-link
        >
      </template>
    </el-table-column>
    <el-table-column v-if="!hiddenDeclareResult" label="审核意见">
      <template slot-scope="scope">
        {{scope.row.cityOpinion|| '— —'}}
      </template>
    </el-table-column>
    <el-table-column
      v-if="!hiddenDeclareResult"
      label="省级审核结果"
      align="center"
    >
      <template slot-scope="scope">
        <el-link
          link
          v-if="scope.row.provinceVerify"
          :underline="false"
          type="success"
          >通过</el-link
        >
        <el-link
          v-if="
            !scope.row.provinceVerify &&
            typeof scope.row.provinceVerify === 'number'
          "
          :underline="false"
          type="danger"
          >不通过</el-link
        >
        <span v-if="scope.row.cityVerify === 0">
          <el-link
          >— —</el-link
          >
        </span>
        <span v-else>
          <el-link
            v-if="
            !scope.row.provinceVerify &&
            typeof scope.row.provinceVerify !== 'number'
          "
            :underline="false"
            type="warning"
          >未审核</el-link
          >
        </span>
      </template>
    </el-table-column>
    <el-table-column v-if="!hiddenDeclareResult" label="审核意见">
      <template slot-scope="scope">
        {{scope.row.provinceOpinion|| '— —'}}
      </template>
    </el-table-column>
    <el-table-column label="操作" v-if="!(hiddenEdit && hiddenDetail)">
      <template slot-scope="scope">
        <div v-if="!hiddenEdit">
          <el-link
            type="primary"
            @click="$emit('editForm', { data: scope.row, index: scope.$index })"
          >
            编辑
          </el-link>
          <el-divider direction="vertical"></el-divider>
          <el-link type="danger" @click="removeItem(scope.$index, scope.row)"
            >删除</el-link
          >
        </div>
        <div v-if="!hiddenDetail">
          <el-link type="primary" @click="$emit('goDetail', scope.row)"
            >详情</el-link
          >
        </div>
      </template>
    </el-table-column>
<!--    重新填报操作 -->
    <el-table-column label="操作" v-if="(hiddenEdit && hiddenDetail) && userInfo.roleId === 3">
      <template slot-scope="scope">
<!--        <div>-->
<!--          <el-divider direction="vertical"></el-divider>-->
<!--          <el-link type="danger" @click="removeItem(scope.$index, scope.row)"-->
<!--            >删除</el-link-->
<!--          >-->
<!--        </div>-->
        <div v-if="scope.row.cityVerify === 0 || scope.row.provinceVerify === 0">
          <el-link type="primary" @click="edit(scope.row)"
            >重新申报</el-link
          >
        </div>
        <div v-else>— —</div>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import { mapGetters } from "vuex";
import {VILLAGE_LIST_ROUTER_NAME} from "../constants";
export default {
  props: {
    data: {
      type: Array,
      default: () => [],
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
      refill: false,
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    removeItem(index) {
      this.$myConfirm({
        content: "确认删除该村庄申报数据？"
      }).then(() => {
        this.$emit("remove", index);
      })
    },
    // 重新申报
    edit(data) {
      console.log(data);
      const { villageDeclarationId, declareType } = data;
      this.$router.push({
        name: VILLAGE_LIST_ROUTER_NAME[declareType],
        query: { id: villageDeclarationId, declareYear: this.declareYear, Refill: true },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.table {
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.05);
  ::v-deep tr th {
    background-color: #f3f3f3;
    color: #222;
  }
}
</style>
