<template>
  <el-select v-model="declarationBatch" placeholder="请选择" @change="changeSelect">
    <el-option
      v-for="item in queryDeclareTypeOpt"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
    </el-option>
  </el-select>
</template>

<script>
import {queryBatchInfo} from "@/api2/villageManage";

export default {
  name: "SelectBatch",
  data() {
    return {
      declarationBatch: '',
      queryDeclareTypeOpt: [
        {
          label: "全部批次",
          value: ""
        }
      ],
    }
  },
  mounted() {
    this.getBatchInfo();
  },
  methods: {
    // 批次
    async getBatchInfo() {
      const res = await queryBatchInfo();
      const opt = res.map(i => {
        return {
          label: i,
          value: i,
        }
      });
      this.queryDeclareTypeOpt = this.queryDeclareTypeOpt.concat(opt);
    },
    changeSelect() {
      this.$emit('changeSelect', this.declarationBatch)
    },
  }
}
</script>

<style scoped>

</style>