<template>
  <div class="block">
    <div class="text-lg mb-4">日志审计</div>
    <Crud
      :get-method="getMethod"
      :query.sync="query"
      id-key="id"
      hide-add
      hide-delete
      hide-view
      hide-table-action
      :permission-add="1"
      :permission-edit="1"
      :permission-delete="1"
    >
      <template v-slot:search>
        <el-select v-model="query.typeId"
        clearable placeholder="请选择操作类型">
          <el-option
            v-for="item in logType"
            :key="item.typeId"
            :label="item.typeName"
            :value="item.typeId"
          ></el-option>  
        </el-select>
        <el-input
          v-model="query.name"
          style="width: 200px;"
          placeholder="请输入关键字"
          :maxlength="50"
          clearable
        ></el-input>
      </template>

      <template v-slot:table>
        <el-table-column label="用户账号" prop="userName"></el-table-column>
        <el-table-column label="IP地址"
        prop="ip"></el-table-column>
        <el-table-column label="数据库表名"
        prop="tables"></el-table-column>
        <el-table-column label="操作类型"
        prop="operationType"></el-table-column>
        <el-table-column label="操作时间"
        prop="operateTime"></el-table-column>
      </template>
    </Crud>
  </div>
</template>

<script>
import { getSystemLog} from '@/api/systemLog';
import { getLogType } from '@/api/dropList';

export default {
  data() {
    return {
      query: {
        name: '',
        typeId: '',
        typeName: ''
      },
      getMethod: getSystemLog,
      logType: [],
    };
  },
  created() {
    this.getLogType()
  },
  methods: {
    async getLogType() {
      this.logType = await getLogType();
    }
  }
}
</script>
