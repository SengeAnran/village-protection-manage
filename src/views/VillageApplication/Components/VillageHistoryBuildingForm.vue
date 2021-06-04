<template>
  <div>
    <el-form-item
      :label="item.label"
      v-for="(item, i) in historyBuildings"
      :key="i"
    >
      <el-input
        v-model.number="form[item.value]"
        placeholder="请输入"
      ></el-input>
    </el-form-item>
  </div>
</template>

<script>
import rule from "@/mixins/rule";
import { HISTORY_BUILDINGS } from "../constants";
export default {
  mixins: [rule],
  props: {
    form: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  created() {
    this.historyBuildings = HISTORY_BUILDINGS;
  },
};
</script>

<style lang="scss" scoped></style>
