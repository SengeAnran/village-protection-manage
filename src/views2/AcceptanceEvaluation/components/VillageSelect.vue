<template>
  <section>
    <el-cascader
      style="width: 100%"
      :props="villageProps"
      @change="onChange"
      :placeholder="placeAreaName"
      :class="{ darkColor: cascaderStyle }"
    ></el-cascader>
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

      placeAreaName: '请选择', // 数据回填，展示当前列表数据
      cascaderStyle: false, //placeholder 样式
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
    clearCascaderValue() {
      this.placeAreaName = '请选择';
      this.cascaderStyle = false;
    },
    setCascaderValue(val) {
      this.placeAreaName = val;
      this.cascaderStyle = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.darkColor {
  ::v-deep .el-input {
    input:-moz-placeholder,
    textarea:-moz-placeholder {
      color: #606266;
    }
    input:-ms-input-placeholder,
    textarea:-ms-input-placeholder {
      color: #606266;
    }
    input::-webkit-input-placeholder,
    textarea::-webkit-input-placeholder {
      color: #606266;
    }
  }
}
</style>
