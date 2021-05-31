<template>
  <div class="organization-tree-wrapper block">
    <div class="text-lg organization-title">浙政钉组织树</div>
    <!-- <el-input
      placeholder="请输入"
      v-model="keyWord"
      suffix="el-icon-search"
      clearable
      class="search-input"
    >
    </el-input> -->
    <el-tree
      class="org-tree"
      :load="loadNode"
      :props="defaultProps"
      :filter-node-method="filterNode"
      ref="tree"
      lazy
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button
            class="handle-btn"
            @click="handleClick(node, data)"
            type="text"
            size="small"
            v-if="node.isLeaf"
            >{{ data.roleId ? "解除授权" : "授权" }}</el-button
          >
        </span>
      </span>
    </el-tree>
    <AuthDialog
      :visible="visible"
      @close="visible = false"
      :data="selectNode"
    />
  </div>
</template>
<script>
import { getDepListById, getUserListByDepId } from "@/api/user";
export default {
  name: "OrganizationTree",
  data() {
    return {
      keyWord: undefined,
      visible: false,
      rootData: [],
      defaultProps: {
        children: "children",
        label: "name",
        isLeaf: "leaf",
      },
      selectNode: {},
    };
  },
  watch: {
    keyWord(val) {
      this.$refs.tree.filter(val);
    },
  },
  methods: {
    async loadNode(node, resolve) {
      if (node.level === 0) {
        return resolve(await this.getTreeData());
      }
      // 如果 isLeadf === true, 则请求用户列表
      if (node.data.isLeaf) {
        this.getUserData(node.data.depId).then((data) => {
          setTimeout(() => {
            return resolve(data);
          }, 500);
        });
      } else {
        // 否则继续请求组织树
        this.getTreeData(node.data.depId).then((data) => {
          //如果有数据返回，则通过resolve方法懒加载到相应节点
          setTimeout(() => {
            return resolve(data);
          }, 500);
        });
      }
    },
    getTreeData(depPId = "ROOT") {
      return getDepListById({ depPId }).then((data) => {
        return (data || []).map((item) => ({
          ...item,
          name: item.depName,
        }));
      });
    },
    getUserData(depId) {
      return getUserListByDepId({ depId }).then((data) => {
        return (data || []).map((item) => ({
          ...item,
          name: item.nickNameCn,
          leaf: true,
        }));
      });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    handleClick(node, data) {
      // 有roleId 则是已授权的用户，显示接触授权提示框
      if (data.roleId) {
        this.$emit("deauthorize", data);
      } else {
        // 否则，显示授权弹窗
        this.visible = true;
        this.selectNode = Object.assign({}, data);
      }
    },
  },
  components: {
    AuthDialog: () => import("./AuthDialog"),
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
      align-items: center;
      justify-content: space-between;
      padding-right: 8px;

      .handle-btn {
        display: none;
        color: #1492ff;
        font-size: 16px;
      }

      &:hover .handle-btn {
        display: block;
      }
    }

    ::v-deep .el-tree-node__content {
      height: 38px;
    }
  }
}
</style>
