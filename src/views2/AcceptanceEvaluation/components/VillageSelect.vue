<template>
  <section>
    <el-cascader style="width: 100%" :props="villageProps" @change="onChange"></el-cascader>
  </section>
</template>
<script>
import { getVillageArea } from '@/api2/acceptanceEvaluation';
import store from '@/store';

export default {
  data() {
    return {
      villageProps: {
        lazy: true,
        lazyLoad: (node, resolve) => this.villageLazyLoad(node, resolve),
      },
    };
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
      getVillageArea({ areaId: node.value.areaId }).then((res) => {
        const nodes = res[0].children.map((c) => {
          return {
            label: c.areaName,
            value: c,
            leaf: c.level === 5 || c.level === '5',
          };
        });
        resolve(nodes);
      });
    },
  },
};
</script>
