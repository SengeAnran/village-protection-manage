<template>
  <div class="area-tree">
    <!--    <el-tree :data="data" :props="defaultProps" accordion @node-click="handleNodeClick" label="area" children="child">-->
    <el-tree
      :data="data"
      :props="defaultProps"
      node-key="area"
      :default-expanded-keys="[defaultExpanded]"
      accordion
      @node-click="handleNodeClick"
      label="area"
      children="child"
    >
    </el-tree>
  </div>
</template>

<script>
import { getObtainArea } from '@/api2/progressSubmission';
import { mapGetters } from 'vuex';

export default {
  name: 'AreaTree',
  data() {
    return {
      data: [],
      defaultProps: {
        children: 'child',
        label: 'area',
      },
    };
  },
  computed: {
    ...mapGetters(['userInfo']),
    defaultExpanded() {
      return this.userInfo.areaName;
    },
  },
  beforeMount() {
    this.getData();
  },
  methods: {
    getData() {
      getObtainArea().then((res) => {
        if (res) {
          this.data = [res];
        }
      });
    },
    handleNodeClick(data) {
      this.$emit('changeArea', data);
    },
  },
};
</script>

<style scoped lang="scss">
.area-tree {
  min-width: 130px;
}
</style>
