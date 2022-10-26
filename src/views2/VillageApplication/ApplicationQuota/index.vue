<template>
  <div class="bolck">
    <span class="text-lg mb-4">
      {{ $route.meta.title }}
    </span>
    <div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="创建申报名额配置" name="first">
          <CreateDeclaration />
        </el-tab-pane>
        <el-tab-pane label="验收评价名额配置" name="second">
          <AcceptanceEvaluation />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import AcceptanceEvaluation from './AcceptanceEvaluation';
import CreateDeclaration from './CreateDeclaration';
export default {
  components: { AcceptanceEvaluation, CreateDeclaration },
  data() {
    return {
      activeName: 'first',
    };
  },
  mounted() {},
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>

<style lang="scss" scoped>
.bolck {
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 8px;
  background-color: #fff;
  position: relative;
}
</style>
