<template>
  <div class="organization-tree-wrapper block">
    <div class="text-lg organization-title">用户组织树</div>
    <el-tree
      ref="tree"
      class="org-tree"
      :load="loadNode"
      :props="defaultProps"
      :expand-on-click-node="false"
      @node-click="handleNodeClick"
      lazy
    >
      <div
        class="custom-tree-node"
        :class="{ active: activeDep === data.areaId }"
        slot-scope="{ node, data }"
      >
        <span class="label">{{ node.label }}</span>
      </div>
    </el-tree>
  </div>
</template>
<script>
import { getAreaListById, getUserListByDepId } from "@/api/user";
export default {
  name: "OrganizationTree",
  data() {
    return {
      keyWord: undefined,
      visible: false,
      defaultProps: {
        children: "children",
        label: "areaName",
        isLeaf: "leaf",
      },
      selectNode: {},

      // 选中组织节点
      activeDep: null,
    };
  },
  watch: {
    keyWord(val) {
      this.$refs.tree.filter(val);
    },
  },
  methods: {
    getUserData(depId) {
      return getUserListByDepId({ depId }).then((data) => {
        return (data || []).map((item) => ({
          ...item,
          name: item.nickNameCn,
          leaf: true,
        }));
      });
    },

    // 点击组织节点，获取该组织下用户信息
    handleNodeClick(data) {
      console.log(data)
      this.activeDep = this.activeDep === data.areaId ? "" : data.areaId;
      this.$emit("changeArea", data);
    },

    async loadNode(node, resolve) {
      if (node.level === 0) {
        const rootData = {
          areaId: "33",
          areaName: "浙江省",
          level: 1,
        };
        return resolve([rootData]);
      }
      if (node.data.level < 3) {
        this.getTreeData(node.data.areaId).then((data) => {
          //如果有数据返回，则通过resolve方法懒加载到相应节点
          setTimeout(() => {
            return resolve(data);
          }, 150);
        });
      } else {
        resolve([]);
      }
    },
    getTreeData(areaId = "33") {
      return getAreaListById({ areaId }).then((data) => {
        return (data || []).map((item) => ({
          ...item,
          name: item.depName,
        }));
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.organization-tree-wrapper {
  .organization-title {
    margin-bottom: 20px;
  }

  .org-tree {
    height: calc(100% - 48px);
    font-size: 16px;
    overflow-y: auto;

    // 滚动条样式
    &::-webkit-scrollbar {
      width: 5px;
    }
    /* 滚动条的滑块 */
    &::-webkit-scrollbar-thumb {
      background: #eee;
    }

    .custom-tree-node {
      flex: 1;
      display: flex;
      flex-grow: 0;
      height: 28px;
      line-height: 28px;
      align-items: center;
      justify-content: space-between;
      padding: 0 10px 0 8px;
      transition: all 0.25s;
      border-radius: 4px;

      .label {
        margin-left: 4px;
        user-select: none;
      }
    }

    ::v-deep .el-tree-node__content {
      height: 38px;
    }
  }

  .custom-tree-node.active {
    background: #409eff;
    color: #fff;
  }
}
</style>
