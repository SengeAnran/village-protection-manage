<template>
  <div class="block">
    <div>
      <div class="text-lg mb-4">场馆预约</div>
      <Crud
        ref="crud"
        :get-method="getMethod"
        :query.sync="query"
        actionWidth="180px"
        :hideAdd="true"
        :hideEdit="true"
        :hideView="true"
        :hideDelete="true"
        :hideDialogAction="true"
        :permission-add="0"
        :permission-edit="0"
        :permission-delete="0"
      >
        <template v-slot:search>
          <div class="inline-flex mb-6 pl-0">
            <div class="search-item">
<!--              <span class="label">村庄名称：</span>-->
              <el-input
                style="width: 200px"
                v-model="query.address"
                :maxlength="50"
                placeholder="请输入礼堂名称/地址"
              ></el-input>
            </div>
          </div>
        </template>
        <template v-slot:tableAction="scope">
          <div style="text-align: left">
            <el-link
              @click="goDetail(scope)"
              type="primary"
            >
              详情
            </el-link>
            <el-divider direction="vertical"></el-divider>
            <div
              style="display: inline-block"
            >
              <el-link @click="edit(scope)" type="primary"> 编辑 </el-link>
            </div>
            <el-divider direction="vertical"></el-divider>
            <el-link
              @click="deleteItem(scope.data.id)"
              type="danger"
            >
              删除
            </el-link>
          </div>
        </template>

        <template v-slot:crudAction>
          <el-button v-permission="10001" type="primary" icon="el-icon-plus" @click="newOne"> 新增 </el-button>
        </template>

        <template v-slot:table>
          <el-table-column
            label="地址"
            prop="address"
          ></el-table-column>
          <el-table-column
            label="场馆名称"
            prop="auditoriumName"
          ></el-table-column>
        </template>
      </Crud>
    </div>
  </div>
</template>

<script>
import { deleteVenue, getVenueList } from "../../api3/venueReservation";

export default {
  name: "index",
  data() {
    return {
      query: {
        declarationBatch: "",
        finalStatus: "",
        villageName: "",
      },
      getMethod: getVenueList,
      deleteMethod: deleteVenue,
    };
  },
  methods: {
    newOne() {
      this.$router.push({
        path: "/venueReservation/new",
      });
    },
    goDetail(scope) {
      this.$router.push({
        path: "/venueReservation/detail",
        query: {
          id: scope.data.id,
        }
      });
    },
    edit(scope) {
      console.log(scope);
      this.$router.push({
        path: "/venueReservation/new",
        query: {
          id: scope.data.id,
        }
      });
    },
    deleteItem(id) {
      this.$confirm("是否删除该条数据？", "提示", {
        type: "warning",
      }).then(async () => {
        deleteVenue({id}).then(() => {
          this.$notify.success("删除成功");
          this.$refs.crud.getItems();
        });
      });
    },
  }
}
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
</style>