<template>
  <div class="village-manage block">
    <!--    <div v-if="$route.name === 'Statistics'">-->
    <div>
      <div class="text-lg mb-4">政策列表</div>
      <Crud
        ref="crud"
        :form.sync="form"
        :get-method="getMethod"
        :query.sync="query"
        id-key="id"
        :selection="true"
        actionWidth="180px"
        :multipleDelete="true"
        :hideEdit="true"
        :hideView="true"
        :permission-add="20101"
        :permission-edit="0"
        :permission-delete="20102"
      >
        <template v-slot:search>
          <div class="inline-flex items-center mb-6 pl-0">
            政策名称：
            <el-input
              v-model="query.policyName"
              style="width: 200px"
              placeholder="请输入"
              clearable
            ></el-input>
          </div>
        </template>

        <template v-slot:table>
          <el-table-column
            label="政策名称"
            prop="policyName"
            width="500"
          ></el-table-column>
          <el-table-column label="上传时间" prop="gmtCreate">
            <!--            <template slot-scope="scope">-->
            <!--              <p>{{ declareType[scope.row.declareType] }}</p>-->
            <!--            </template>-->
          </el-table-column>
        </template>
        <template v-slot:tableEdit="scope">
          <el-link
            type="danger"
            @click.native="download(scope)"
          >下载</el-link
          >
        </template>
        <template v-slot:form>
          <el-form-item label="政策名称：" prop="policyName" :rules="rule.input">
            <el-input v-model="form.policyName" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="政策文件：" :rules="rule.upload" prop="processFilesArr" >
            <UploadFile
              :data="form.processFilesArr"
              tip="支持扩展名：.rar .zip .doc .docx .pdf .jpg..."
              accept=".rar,.zip,.doc,.docx,.pdf,.jpg"
              @add="addFile($event, 'processFilesArr')"
              @remove="removeFile($event, 'processFilesArr')"
            >
            </UploadFile>
<!--            <p style="color: #999999" class="py-3">-->
<!--&lt;!&ndash;              <i class="el-icon-warning"></i>&ndash;&gt;-->
<!--              支持扩展名：.rar .zip .doc .docx .pdf .jpg...-->
<!--            </p>-->
          </el-form-item>
        </template>
      </Crud>
    </div>
  </div>
</template>
<script>
// import { mapMutations, mapGetters } from "vuex";
import { getVillageList } from "@/api/villageManage";
import rule from "@/mixins/rule";

export default {
  mixins: [rule],
  data() {
    return {
      query: {
        policyName: '',
      },
      form: {
        policyName: '',
        processFilesArr:[],
      },
      getMethod: getVillageList,
    };
  },
  computed: {
  },
  beforeMount() {
  },
  mounted() {
  },
  methods: {
    download(row) {
      console.log(row)
    },
    addFile(file, key) {
      this.form[key].push(file);
    },
    removeFile(file, key) {
      let removeIndex;
      this.form[key].forEach((item, index) => {
        if(item.uid === file.uid || item.filePath === file.url)
          removeIndex = index
      })
      if(removeIndex !== -1) {
        this.form[key].splice(removeIndex,1);
      }
    },
  }
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
</style>
