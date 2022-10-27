<template>
  <el-table class="table-custom" :data="data">
    <el-table-column label="序号" type="index"> </el-table-column>
    <el-table-column prop="projectName" label="项目名称"> </el-table-column>
    <el-table-column prop="constructUnit" label="建设单位">
      <template slot-scope="scope">
        {{ scope.row.constructUnit || '-' }}
      </template>
    </el-table-column>
    <el-table-column prop="constructAddress" label="建设地点"> </el-table-column>
    <el-table-column prop="constructDetail" label="建设内容和规模"> </el-table-column>
    <el-table-column label="进度安排">
      <template slot-scope="scope"> {{ scope.row.schedule || '-' }} 至 {{ scope.row.scheduleEnd || '-' }} </template>
    </el-table-column>
    <el-table-column prop="landUse" label="用地情况（m²）">
      <template slot-scope="scope">
        {{ scope.row.landUse || '-' }}
      </template>
    </el-table-column>
    <el-table-column label="计划总投资（万元）" header-align="center">
      <el-table-column :label="firstYear + ''" header-align="center">
        <el-table-column prop="planFirstGov" label="政府投资" width="100" :resizable="false">
          <template slot-scope="scope">
            <span>{{ formatMoney(scope.row.planFirstGov) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="planFirstDrive" label="带动投资" width="100" :resizable="false">
          <template slot-scope="scope">
            <span>{{ formatMoney(scope.row.planFirstDrive) }}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column :label="firstYear + 1 + ''" header-align="center">
        <el-table-column prop="planSecondGov" label="政府投资" width="100" :resizable="false">
          <template slot-scope="scope">
            <span>{{ formatMoney(scope.row.planSecondGov) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="planSecondDrive" label="带动投资" width="100" :resizable="false">
          <template slot-scope="scope">
            <span>{{ formatMoney(scope.row.planSecondDrive) }}</span>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table-column>
    <el-table-column prop="arrangements" label="运行维护管理安排">
      <template slot-scope="scope">
        {{ scope.row.arrangements || '-' }}
      </template>
    </el-table-column>
    <el-table-column prop="type" label="类型">
      <template slot-scope="scope">
        <span>{{ scope.row.type === null ? '-' : mapType(scope.row.type) }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="remark" label="备注">
      <template slot-scope="scope">
        {{ scope.row.remark || '-' }}
      </template>
    </el-table-column>
    <el-table-column v-if="!hiddenOperation" fixed="right" label="操作" min-width="164px">
      <template slot-scope="scope">
        <div>
          <el-link type="primary" @click="$emit('moveUp', { data: scope.row, index: scope.$index })">上移</el-link>
          <el-divider direction="vertical"></el-divider>
          <el-link type="primary" @click="$emit('moveDown', { data: scope.row, index: scope.$index })">下移</el-link>
          <el-divider direction="vertical"></el-divider>
          <el-link type="primary" @click="$emit('editForm', { data: scope.row, index: scope.$index })"> 编辑 </el-link>
          <el-divider direction="vertical"></el-divider>
          <el-link type="danger" @click="removeItem(scope.$index, scope.row)">删除</el-link>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import { mapGetters } from 'vuex';
import { mapType } from '@/views2/utils/project';
import { formatMoney } from '@/views2/utils/formatter';

export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    hiddenOperation: {
      // 隐藏操作栏
      type: Boolean,
      default: false,
    },
    hiddenDetail: {
      type: Boolean,
      default: false,
    },
    declareYear: {
      type: Number,
      default: null,
    },
    hiddenEdit: {
      type: Boolean,
      default: true,
    },
    hiddenDeclareResult: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      refill: false,
    };
  },
  computed: {
    ...mapGetters(['userInfo']),
    firstYear() {
      return this.data.find((ele) => ele.firstYear)?.firstYear || new Date().getFullYear();
    },
  },
  methods: {
    formatMoney,
    mapType,
    removeItem(index) {
      this.$myConfirm({
        content: '确认删除该数据？',
      }).then(() => {
        this.$emit('remove', index);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.table-custom {
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.05);
  overflow: hidden;
  width: 90%;
  ::v-deep tr th {
    background-color: #f3f3f3;
    color: #222;
  }
  ::v-deep .el-table__body-wrapper {
    /*定义滚动条样式（高宽及背景）*/
    &::-webkit-scrollbar {
      //width: 16px; /* 滚动条宽度， width：对应竖滚动条的宽度  height：对应横滚动条的高度*/
      height: 10px; // 横向滚动条设高度
    }
    /*定义滚动条轨道（凹槽）样式*/
    &::-webkit-scrollbar-track {
      border-radius: 13px;
    }
    /*定义滑块 样式*/
    ::-webkit-scrollbar-thumb {
      border-radius: 3px;
      //height: 100px; /* 滚动条滑块长度 */
      //background-color: #ccc;
    }
  }
}
</style>
