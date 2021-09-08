<template>
  <div class="block">
    <div class="text-lg mb-4">信息列表</div>
    <Crud
      ref="crud"
      :get-method="getMethod"
      :delete-method="deleteMethod"
      :query.sync="query"
      id-key="id"
      hide-add
      hide-edit
      hide-view
      :permission-add="900101"
      :permission-edit="900103"
      :permission-delete="900104"
    >
      <template v-slot:search>
        <el-input
          v-model="query.villageName"
          style="width: 200px"
          placeholder="请输入村名"
          clearable
        ></el-input>
        <el-input
          v-model="query.address"
          style="width: 200px"
          placeholder="请输入地址"
          clearable
        ></el-input>
      </template>

      <template v-slot:crudAction>
        <el-button type="primary" @click="add">新增</el-button>
      </template>

      <template v-slot:table>
        <el-table-column label="村名" prop="villageName"></el-table-column>
        <el-table-column label="地址" prop="address"></el-table-column>
        <el-table-column label="时间" prop="gmtCreate"></el-table-column>
      </template>

      <template v-slot:tableAction="scope">
        <el-link v-permission="900103" class="mx-2" type="primary" @click="edit(scope)">编辑</el-link>
      </template>
    </Crud>

    <el-dialog
      :visible.sync="showDialog"
      :title="title"
      width="420px"
      @close="resetForm"
    >
      <el-form
        ref="form"
        :model="form"
        label-position="left"
        label-width="60px"
      >
        <el-form-item label="村名" prop="villageName" :rules="rule.input">
          <el-input
            v-model="form.villageName"
            style="width: 300px"
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item label="地址" prop="areaId" :rules="rule.select">
          <el-cascader
            style="width: 300px"
            v-model="form.areaId"
            :options="areaTree"
            :props="{
              value: 'areaId',
              label: 'areaName',
              expandTrigger: 'hover',
              emitPath: false,
            }"
            placeholder="请选择"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <div>
          <el-button @click="resetForm">取消</el-button>
          <el-button type="primary" @click="submit">确定</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getInfoList,
  getAreaTree,
  createInfo,
  modifyInfo,
  deleteInfo,
} from "@/api/infoSetting";
import rule from "@/mixins/rule";

export default {
  mixins: [rule],
  data() {
    return {
      query: {
        villageName: "",
        address: "",
      },
      form: {
        id: "",
        villageName: "",
        areaId: "",
      },
      getMethod: getInfoList,
      deleteMethod: deleteInfo,
      areaTree: [],
      showDialog: false,
      title: "新增",
    };
  },
  watch: {
    'form.areaId': {
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          console.log(newVal, oldVal)
          console.log('改变了');
        }
      },
      deep: true
    }
  },
  created() {
    this.getTree();
  },
  methods: {
    async getTree() {
      this.areaTree = await getAreaTree();
    },
    add() {
      this.title = "编辑";
      this.showDialog = true;
    },
    edit(scope) {
      this.title = "编辑";
      this.showDialog = true;
      this.form = {
        id: scope.data.id,
        villageName: scope.data.villageName,
        areaId: scope.data.areaId,
      };
    },
    resetForm() {
      this.showDialog = false;
      this.form = {
        id: "",
        villageName: "",
        areaId: "",
      };
      this.$refs.form.resetFields();
    },
    submit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          if (this.form.id) {
            await modifyInfo(this.form);
          } else {
            await createInfo(this.form);
          }
          this.resetForm();
          this.$refs.crud.getItems();
        }
      });
    },
  },
};
</script>
