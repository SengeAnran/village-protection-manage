<template>
  <el-cascader
    ref="cascader"
    :options="villageInfoOpt"
    :props="optionProps"
    v-model="_value"
    @change="getCheckedNodes"
    :emitPath="false"
  >
  </el-cascader>
</template>
<script>
import { getVillageArea } from "@/api/villageManage";
export default {
  props: {
    value: String,
  },
  data() {
    return {
      villageInfoOpt: [],
      optionProps: {
        value: "areaId",
        label: "areaName",
        children: "children",
      },
    };
  },
  computed: {
    _value: {
      get() {
        return this.value;
      },
      set(val) {
        const lastValue = val.slice(-1)[0];
        this.$emit("input", lastValue);
      },
    },
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      getVillageArea().then((res) => {
        this.villageInfoOpt = res;
      });
    },
    getCheckedNodes() {
      const village = this.$refs.cascader.getCheckedNodes()[0];
      const parent = village.parent;
      this.$emit("change", {
        parent: parent.data,
        village: village.data,
      });
    },
  },
};
</script>
