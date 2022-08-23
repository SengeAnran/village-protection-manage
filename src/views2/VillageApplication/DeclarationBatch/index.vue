<template>
  <div class="block">
    <div>
      <div class="text-lg mb-4">申报批次配置</div>
      <Crud
        ref="crud"
        :add-method="addMethod"
        :get-method="getMethod"
        :update-method="updateMethod"
        :delete-method="deleteMethod"
        :before-edit-method="beforeEditMethod"
        :query.sync="query"
        :form.sync="form"
        id-key="id"
        actionWidth="180px"
        :multiple-delete="userInfo.roleId === 3"
        hideSearch
        :multipleDelete="false"
        :selection="false"
        :hideView="true"
        :permission-add="4100"
        :permission-edit="4100"
        :permission-delete="4100"
      >
        <template v-slot:form>
          <el-form-item label="申报批次：" prop="batch" :rules="rule.input">
            <el-input v-model="form.batch" maxlength="20"></el-input>
          </el-form-item>
          <el-form-item label="申报批次：">
            <el-col :span="11">
              <!-- <el-date-picker type="date" placeholder="选择日期" v-model="form.startTime"> </el-date-picker> -->
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="form.startTime"
                style="width: 100%"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">至</el-col>
            <el-col :span="11">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="form.endTime"
                style="width: 100%"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-col>
          </el-form-item>
        </template>
        <!--        <template v-slot:tableAction="scope">-->
        <!--          <div style="text-align: left">-->
        <!--            <div-->
        <!--              style="display: inline-block"-->
        <!--            >-->
        <!--              <el-link @click="edit(scope.data)" type="primary"> 修改</el-link>-->
        <!--              &lt;!&ndash;              <el-divider direction="vertical"></el-divider>&ndash;&gt;-->
        <!--            </div>-->
        <!--            <el-divider direction="vertical"></el-divider>-->
        <!--          </div>-->
        <!--        </template>-->

        <template v-slot:crudAction>
          <!--          <el-button v-if="roleId === 3" type="primary" icon="el-icon-plus" @click="newApplications"> 新建</el-button>-->
        </template>

        <template v-slot:table>
          <el-table-column label="申报批次" prop="batch"></el-table-column>
          <el-table-column label="申报时间">
            <template slot-scope="scope">
              <p>{{ scope.row.startTime.slice(0, 10) }}——{{ scope.row.endTime.slice(0, 10) }}</p>
            </template>
          </el-table-column>
        </template>
      </Crud>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import { deleteVillageItem, getSetList, setAdd, setDelete, setUpdate } from '@/api2/declarationBatch';
import rule from '@/mixins/rule';
const type = 2; //type 1：验收时间，2：申报批次
export default {
  mixins: [rule],
  data() {
    return {
      query: {
        type: type,
      },
      form: {
        // type: type, //type 1：验收时间，2：申报批次
        batch: '',
        endTime: '',
        startTime: '',
      },
      addMethod: setAdd,
      deleteMethod: setDelete,
      updateMethod: setUpdate,
      getMethod: getSetList,
      value1: '',
      dialogVisible: false,
    };
  },
  computed: {
    ...mapGetters(['userInfo']),
    roleId() {
      console.log(this.userInfo.roleId);
      return this.userInfo.roleId;
    },
  },
  mounted() {},
  methods: {
    ...mapMutations('villageMange', ['changeDeclareList']),
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
      console.log(item, 11111);
      this.form.batch = item.batch;
      // this.form.type = type; //type 1：验收时间，2：申报批次
      this.form.id = item.id;
      this.form.endTime = item.endTime;
      this.form.startTime = item.startTime;
    },

    changeTime(item) {
      console.log(item);
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
