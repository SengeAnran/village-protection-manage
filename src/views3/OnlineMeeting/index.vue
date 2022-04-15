<template>
  <div class="block">
    <div>
      <div class="text-lg mb-4">网上议事</div>
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
        idKey="id"
      >
        <template v-slot:search>
          <div class="inline-flex mb-6 pl-0">
            <div class="search-item">
              <span class="label">地区：</span>
              <VillageAddressSelect
                v-model="query.address"
                @change="changeAddress"
              />
            </div>
            <div class="search-item">
              <span class="label">议事主题：</span>
              <el-input
                style="width: 200px"
                v-model="query.topic"
                :maxlength="50"
                placeholder="请输入"
              ></el-input>
            </div>
            <div class="search-item">
              <span class="label">发起人：</span>
              <el-input
                style="width: 200px"
                v-model="query.initiatorUserName"
                :maxlength="50"
                placeholder="请输入礼堂名称/地址"
              ></el-input>
            </div>
            <div class="search-item">
              <span class="label">状态：</span>
              <el-select v-model="query.status" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
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
            <el-link
              @click="deleteItem(scope.data.id)"
              type="danger"
            >
              删除
            </el-link>
          </div>
        </template>

        <template v-slot:crudAction>
          <el-button type="primary" icon="el-icon-plus" @click="newOne"> 发起议事 </el-button>
        </template>

        <template v-slot:table>
          <el-table-column
            label="地区"
            prop="address"
          ></el-table-column>
          <el-table-column
            label="议事主题"
            prop="topic"
          ></el-table-column>
          <el-table-column
            label="议事发起人"
            prop="initiatorUserName"
          ></el-table-column>
          <el-table-column
            label="发起时间"
            prop="startDate"
          ></el-table-column>
          <el-table-column
            label="状态"
          >
            <template slot-scope="scope">
              <span
                class="status-icon"
                :style="`background:${
                  TYPE_TAG_MAP_COLORS[scope.row.status]
                }`"
              ></span>
              {{ TYPE_STATUS_MAP[scope.row.status]}}
            </template>
          </el-table-column>
        </template>
      </Crud>
    </div>
  </div>
</template>

<script>
import { deleteOne, getList } from "../../api3/OnlineMeeting";
import VillageAddressSelect from "./Components/VillageAddressSelect";
import { TYPE_STATUS_MAP, TYPE_TAG_MAP_COLORS } from "./constants";
export default {
  name: "index",
  components: {
    VillageAddressSelect,
  },
  data() {
    return {
      query: {
        address: "",
        topic: "",
        initiatorUserName: "",
        status: "",
      },
      options: [{
        value: '',
        label: '全部'
      },{
        value: '0',
        label: '进行中'
      }, {
        value: '3',
        label: '已结束'
      }, {
        value: '2',
        label: '未通过'
      }, {
        value: '1',
        label: '待审核'
      }],
      value: '',
      getMethod: getList,
      deleteMethod: deleteOne,
      TYPE_STATUS_MAP,
      TYPE_TAG_MAP_COLORS,
    };
  },
  mounted() {
  },
  methods: {
    // 选择村庄地址
    changeAddress(val) {
      const { address } = val;
      // this.form.villageName = village.areaName;
      console.log(address);
      this.query.address = address;
    },
    newOne() {
      this.$router.push({
        path: "/onlineMeeting/new",
      });
    },
    goDetail(scope) {
      this.$router.push({
        path: "/onlineMeeting/detail",
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
        deleteOne({id}).then(() => {
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
.status-icon {
  display: inline-block;
  margin-right: 10px;
  width: 8px;
  height: 8px;
  border-radius: 100%;
}
</style>