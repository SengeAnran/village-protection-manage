<template>
  <div class="basic-info-module">
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="mb-8">
          <el-form-item label="片区名称" v-if="villageType"> {{ saveVO.area }} </el-form-item>
          <el-form-item label="创建村名称" v-else> {{ saveVO.villageName }} </el-form-item>
        </div>
      </el-col>
      <el-col :span="8">
        <el-form-item label="创建批次" prop="countrySortNum">
          {{ saveVO.declarationBatch }}
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="总投资（万元）" prop="investNum">
          {{ saveVO.investNum }}
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="领办领导" prop="leader">
          {{ saveVO.leader }}
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="联系人" prop="contactPerson">
          {{ saveVO.contactPerson }}
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="联系方式" prop="phone">
          {{ saveVO.phone }}
        </el-form-item>
      </el-col>
    </el-row>

    <el-form-item label="乡镇（街道）人民政府（办事处）关于创建方案完成情况说明" prop="basicText">
      {{ form.completionStatement }}
    </el-form-item>

    <el-form-item label="县（市、区）人民政府自评结论" prop="basicText">
      {{ form.conclusion }}
    </el-form-item>
    <el-form-item label="附件">
      <view-file></view-file>
    </el-form-item>
  </div>
</template>
<script>
import ViewFile from './ViewFile.vue';

// import { getDetail } from '@/api2/acceptanceEvaluation';

export default {
  components: {
    ViewFile,
  },
  props: {
    form: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      // 片区名称
      district: '',

      villageType: 1,
    };
  },
  computed: {
    saveVO() {
      return this.form.saveVO || {};
    },
  },
  methods: {
    // 选择村庄地址
    // changeAddress(type, val) {
    //   console.log(type, val);
    //   const params = {};
    //   if (type === 'areaId') {
    //     params.type = 1;
    //     params.name = val.areaName;
    //   } else {
    //     params.type = 2;
    //     params.name = val;
    //   }
    //   getAreaBaseInfo(params).then((res) => {
    //     console.log(res, '---res');
    //   });
    //   // const { village, parent } = val;
    //   // console.log(village, parent, 'village, parent');
    //   // this.form.villageName = village.areaName;
    //   // this.form.town = parent.areaName;
    // },
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.basic-info-module {
  padding: 20px;
}
</style>
