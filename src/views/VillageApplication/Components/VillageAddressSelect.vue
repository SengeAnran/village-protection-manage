<template>
  <el-cascader
    ref="cascader"
    :options="villageInfoOpt"
    :props="optionProps"
    v-model="value"
    @change="getCheckedNodes"
  >
  </el-cascader>
</template>
<script>
import { getVillageArea } from "@/api/villageManage";
export default {
  props: {
    villageId: String,
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
    value: {
      get() {
        return this.villageId;
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
