<template>
  <el-cascader
    v-model="cascaderValue"
    style="max-width: 240px"
    :props="villageProps"
    @change="onChange"
    :placeholder="placeholder"
  ></el-cascader>
</template>
<script>
import store from '@/store';
import { getSonAreas } from '@/api2/common';

export default {
  props: {
    value: String, // 用于重置
    checkStrictly: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: '全部',
    },
  },
  data() {
    return {
      cascaderValue: '',
      villageProps: {
        lazy: true,
        checkStrictly: this.checkStrictly, // 单次可选
        lazyLoad: (node, resolve) => this.villageLazyLoad(node, resolve),
      },
    };
  },
  watch: {
    value(newVal) {
      if (newVal === '') {
        this.cascaderValue = '';
      }
    },
  },
  computed: {
    userInfo() {
      return this.$store.getters.userInfo || {};
    },
  },
  methods: {
    onChange(val) {
      const chooseAreaId = val[val.length - 1];
      this.$emit('change', chooseAreaId);
    },
    villageLazyLoad(node, resolve) {
      if (node.level === 0) {
        resolve([{ label: store.getters.userInfo.areaName, value: store.getters.userInfo }]);
        return;
      }
      getSonAreas({ areaId: node.value.areaId }).then((res) => {
        const nodes = res.map((c) => {
          return {
            label: c.areaName,
            value: c,
            leaf: c.level === 3 || c.level === '3',
          };
        });
        resolve(nodes);
      });
    },
  },
};
</script>
