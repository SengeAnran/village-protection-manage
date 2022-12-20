<template>
  <el-select v-model="village" placeholder="请选择" class="village-select" @change="onChange">
    <el-option v-for="item in villageData" :key="item.value" :label="item.label" :value="item.value"> </el-option>
  </el-select>
</template>
<script>
import { filterVillageArea } from '@/api2/acceptanceEvaluation';

export default {
  data() {
    return {
      village: '',
      villageData: [],
    };
  },
  computed: {
    userInfo() {
      return this.$store.getters.userInfo || {};
    },
  },
  methods: {
    onChange(val) {
      this.$emit('change', val);
    },
    getData() {
      filterVillageArea().then((res) => {
        this.villageData = res.map((c) => ({ label: c, value: c }));
      });
    },
    setValue(val) {
      this.village = val;
    },
  },
  mounted() {
    this.getData();
  },
};
</script>
