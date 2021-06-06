<template>
  <div class="block">
    <div class="text-lg mb-4">信息列表</div>
    <Crud
      ref="crud"
      :get-method="getMethod"
      :delete-method="deleteMethod"
      :query.sync="query"
      selection
      id-key="id"
      :hideSearch="true"
      :hideAdd="true"
      :hideEdit="true"
      :hideView="true"
      multiple-delete
      :permission-add="30032"
      :permission-edit="30033"
      :permission-delete="30034"
    >
      <template v-slot:crudAction>
        <el-button type="primary" @click="newInfo"> 新建申报 </el-button>
      </template>

      <template v-slot:tableAction="scope">
        <div style="text-align: left; display: inline">
          <el-link type="primary" @click="editRow(scope)">编辑</el-link>
          <el-divider direction="vertical"></el-divider>
        </div>
      </template>

      <template v-slot:table>
        <el-table-column
          align="center"
          label="村名"
          prop="villageName"
        ></el-table-column>
        <el-table-column
          align="center"
          label="地址"
          prop="address"
        ></el-table-column>
      </template>
    </Crud>

    <Add
      :data="editData"
      :visible="showDialog"
      :type="editType"
      @close="showDialog = false"
      @confirm="editConfirm"
    />
  </div>
</template>
<script>
import {
  getVillageInfo,
  deleteVillageInfo,
  addVillageInfo,
  updateVillageInfo,
} from "@/api/settingInfo";
import Add from "./Add.vue";

export default {
  components: { Add },
  data() {
    return {
      query: {},
      getMethod: getVillageInfo,
      deleteMethod: deleteVillageInfo,

      showDialog: false,
      editType: "",
      editData: {},
    };
  },
  methods: {
    editRow(row) {
      this.editData = {
        areaId: row.data.areaId,
        villageName: row.data.villageName,
        id: row.data.id,
      };
      this.editType = "edit";
      this.showDialog = true;
    },

    newInfo() {
      this.editType = "add";
      this.editData = {};
      this.showDialog = true;
    },

    editConfirm(params) {
      this.showDialog = false;
      if (params.type === "add") {
        addVillageInfo(params).then(() => {
          this.$message.success("新增成功");
          this.$refs.crud.getItems();
        });
      } else if (params.type === "edit") {
        updateVillageInfo(params).then(() => {
          this.$message.success("编辑成功");
          this.$refs.crud.getItems();
        });
      }
    },
  },
};
</script>
