<template>
  <section class="flex">
    <el-select style="width: 140px" v-model="_value" placeholder="请选择" @change="onDistrictChange">
      <el-option v-for="item in districtData" :key="item.value" :label="item.label" :value="item.value"> </el-option>
    </el-select>
    <el-select
      v-model="_districtVillage"
      multiple
      collapse-tags
      style="margin-left: 10px; width: 140px"
      placeholder="请选择"
      class="village-select"
    >
      <el-option v-for="item in districtVillageData" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
  </section>
</template>
<script>
import { getDistrictArea, getDistrictVillage } from '@/api2/acceptanceEvaluation';
export default {
  props: {
    area: String,
  },
  data() {
    return {
      // district: '',
      districtData: [],
      districtVillage: [],
      districtVillageData: [],
    };
  },
  computed: {
    _districtVillage: {
      get() {
        return this.districtVillage;
      },
      set() {},
    },
    _value: {
      get() {
        return this.area;
      },
      set(val) {
        this.$emit('update:area', val);
      },
    },
  },
  methods: {
    onDistrictChange(name) {
      this.$emit('change', name);
      this.getDistrictVillage(name);
    },

    getDistrictData() {
      getDistrictArea().then((res) => {
        this.districtData = res.map((c) => {
          return {
            label: c,
            value: c,
          };
        });
      });
    },
    // 查找片区村庄
    getDistrictVillage(name) {
      getDistrictVillage({ name }).then((res) => {
        const data = res.map((c) => ({
          label: c,
          value: c,
        }));
        this.districtVillage = res;
        this.districtVillageData = data;
      });
    },
  },
  mounted() {
    // 获取片区数据
    this.getDistrictData();
    this._value && this.onDistrictChange(this._value);
  },
};
</script>
<style lang="scss" scoped>
.village-select {
  ::v-deep .el-tag.el-tag--info {
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
