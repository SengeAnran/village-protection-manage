<template>
  <el-dialog
    class="page-help-detail"
    title="参与人员"
    :visible="visible"
    v-if="visible"
    width="1000px"
    @close="cancel"
    v-loading="loading"
  >
    <div class="search clearFloat">
      <div class="search-item">
        <span class="label">地区：</span>
        <VillageAddressSelect
          v-model="query.areaId"
          @change="changeAddress"
        />
      </div>
      <div class="search-item">
        <span class="label">人员搜索：</span>
        <el-input
          style="width: 200px"
          v-model="query.userNickname"
          :maxlength="50"
          placeholder="请输入"
        ></el-input>
      </div>
      <el-button type="primary" @click="search">查询</el-button>
    </div>
    <div class="add-data">
<!--      <el-tag-->
<!--        v-for="(tag, index) in addNameList"-->
<!--        :key="index"-->
<!--        @close="remove(tag, index)"-->
<!--        closable-->
<!--      >-->
<!--        {{ tag.userNickname }}-->
<!--      </el-tag>-->
      已选择{{ checkNumber }}个用户
    </div>
    <ParticipantsListTable
      style="margin-top: 12px"
      :data="dataList"
      @changeSelect="changeSelect"
    />
    <span slot="footer" class="dialog-footer" v-if="canAudit">
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="onSubmit" plain>提交</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { getNamesList } from "@/api3/OnlineMeeting.js";
import VillageAddressSelect from "./VillageAddressSelect";
import ParticipantsListTable from "./ParticipantsListTable";
export default {
  name: "Participants",
  components: {
    VillageAddressSelect,
    ParticipantsListTable,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    nameList: {
      type: Array,
      default: () => {},
    },
  },
  data() {
    return {
      canAudit: true,
      dataList: [],
      checkNumber: 0,
      addNameList: [],
      query: {
        areaId: "",
        userNickname: "",
      },
    };
  },

  computed: {
  },

  methods: {
    // 选择村庄地址
    changeAddress(val) {
      const { village } = val;
      // this.form.villageName = village.areaName;
      console.log(village);
      this.query.areaId = village.value;
    },
    cancel() {
      this.addNameList = [];
      this.dataList = [];
      this.$emit('update:visible', false)
    },
    async search() {
      const data = {
        ...this.query,
        pageNum: 1,
        pageSize: 65536,
      }
      const { content } = await getNamesList(data);
      this.dataList = content;
    },
    // 处理表格
    changeSelect(index) {
      // console.log(...this.dataList.splice(index, 1), index);
      this.addNameList  = index;
      this.checkNumber = index.length;
    },
    remove(tag, index) {
      this.dataList.push(...this.addNameList.splice(index, 1));
      console.log('remove', tag);
    },
    onSubmit() {
      this.$emit("onSubmit", this.addNameList);
      this.cancel();
    },
  },
};
</script>
<style lang="scss" scoped>
.page-help-detail {
  ::v-deep .el-dialog {
    border-radius: 8px;
  }
  ::v-deep .el-dialog__header {
    text-align: center;
    border-bottom: 1px solid #e6e9f0;
  }
  ::v-deep .el-dialog__body {
    padding: 30px 50px;
  }
  ::v-deep .el-dialog__footer {
    text-align: center;
  }
  .search {
    .search-item {
      float: left;
      margin-right: 16px;
    }
  }
  .add-data {
    margin-top: 32px;
  }
  .base-info,
  .claim-info {
    padding: 20px;
  }
  .claim-info {
    border-top: 1px solid #e6e9f0;
  }
  .dialog-footer {
    & button {
      font-size: 14px;
      width: 80px;
      &:last-child {
        background-color: #fff;
        &:hover,
        &:active,
        &:focus {
          color: #409eff;
        }
      }
    }
  }
  .row {
    display: flex;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    line-height: 16px;
    padding: 10px 0;
    .label {
      display: block;
      width: 84px;
      color: #666666;
      flex-shrink: 0;
    }
    .value {
      display: block;
      color: #333333;
    }
  }
}
</style>
