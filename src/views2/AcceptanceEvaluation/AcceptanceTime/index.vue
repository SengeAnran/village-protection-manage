<template>
  <div class="block">
    <div>
      <div class="text-lg mb-4">验收评价配置</div>
      <Crud
        ref="crud"
        :add-method="addMethod"
        :get-method="getMethod"
        :update-method="updateMethod"
        :before-edit-method="beforeEditMethod"
        :query.sync="query"
        :form.sync="form"
        id-key="id"
        actionWidth="180px"
        :multiple-delete="COUNTRY"
        hideSearch
        hideDelete
        :multipleDelete="false"
        :selection="false"
        :hideView="true"
        :permission-add="4100"
        :permission-edit="4100"
        :permission-delete="4100"
      >
        <template v-slot:form>
          <el-form-item label="比选时间：" prop="acceptanceTime" :rules="rule.multiSelect">
            <el-date-picker
              v-model="form.acceptanceTime"
              value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-form-item>
        </template>

        <template v-slot:crudAction> </template>

        <template v-slot:table>
          <el-table-column label="验收评价时间段">
            <template slot-scope="scope">
              <p>{{ scope.row.acceptanceStartTime }} 至 {{ scope.row.acceptanceEndTime }}</p>
            </template>
          </el-table-column>
        </template>
      </Crud>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { deleteVillageItem, getSetList, setAdd, setUpdate } from '@/api2/acceptanceTime';
import rule from '@/mixins/rule';
import role from '@/views2/mixins/role';
import { recVerify } from '../../../api/villageManage';
const type = 1; //type 1：验收时间，2：申报批次
export default {
  mixins: [rule, role],
  data() {
    return {
      query: {
        type: type,
      },
      form: {
        // type: type, //type 1：验收时间，2：申报批次
        acceptanceTime: [],
      },
      // deleteMethod: setDelete,
      getMethod: getSetList,

      dialogVisible: false,
      submitSortMethod: recVerify,
    };
  },
  mounted() {},
  methods: {
    ...mapMutations('villageMange', ['changeDeclareList']),
    updateMethod(form) {
      const { acceptanceTime, id } = form;
      const [acceptanceStartTime, acceptanceEndTime] = acceptanceTime;
      return setUpdate({
        acceptanceStartTime,
        acceptanceEndTime,
        id,
      });
    },
    addMethod(form) {
      const { acceptanceTime } = form;
      const [acceptanceStartTime, acceptanceEndTime] = acceptanceTime;
      return setAdd({
        acceptanceStartTime,
        acceptanceEndTime,
      });
    },
    // 删除
    deleteItem(id) {
      this.$confirm('是否删除该条数据？', '提示', {
        type: 'warning',
      }).then(async () => {
        deleteVillageItem([id]).then(() => {
          this.$notify.success('删除成功');
          this.$refs.crud.getItems();
        });
      });
    },
    beforeEditMethod(item) {
      this.form.acceptanceTime = [item.acceptanceStartTime, item.acceptanceEndTime];
      // this.form.type = type; //type 1：验收时间，2：申报批次
      this.form.id = item.id;
    },
  },
};
</script>
<style lang="scss" scoped>
.search-item {
  margin-right: 20px;

  .label {
    font-weight: 400;
    color: #333333;
  }
}

.status {
  display: inline-block;
  margin-right: 6px;
  width: 8px;
  height: 8px;
  border-radius: 100%;
  background: #ccc;

  &.active {
    background: #15be50;
  }
}

.tip {
  background: #edf4ff;
  border: 1px solid #99cbf9;
  border-radius: 4px;
  padding: 12px 16px;
  margin-bottom: 20px;
  display: flex;

  .tip-left {
    img {
      width: 16px;
      height: 16px;
      //background: #1492FF;
    }

    margin-right: 12px;
  }

  .tip-right {
    .tip-title {
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #000000;
      line-height: 22px;
      margin-bottom: 8px;
    }

    .tip-content {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #666666;
      line-height: 22px;
      margin-bottom: 8px;

      span {
        color: #1492ff;
      }
    }

    .tip-button {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #1492ff;
      line-height: 22px;
    }
  }
}
</style>
