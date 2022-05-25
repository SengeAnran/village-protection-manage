<template>
  <div class="basic-info-module">
    <el-row :gutter="20">
      <el-radio v-model="villageType" :label="1">创建村申报</el-radio>
      <el-radio v-model="villageType" :label="2">片区申报</el-radio>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="mb-8">
          <el-form-item label="创建村名称" :rules="rule.select" v-if="villageType === 1">
            <VillageSelect v-model="form.areaId" @change="changeAddress('areaId', $event)" />
          </el-form-item>
          <el-form-item label="片区名称" :rules="rule.select" v-if="villageType === 2">
            <DistrictSelect v-model="district" @change="changeAddress('district', $event)" />
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="8">
        <el-form-item label="创建批次" prop="countrySortNum" :rules="rule.inputNumber">
          <el-input v-model.number="form.countrySortNum" placeholder="请输入" maxlength="8"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="总投资（万元）" prop="investNum" :rules="rule.inputNumber">
          <el-input v-model="form.investNum" placeholder="请输入" maxlength="8"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="领办领导" prop="leader" :rules="rule.input">
          <el-input v-model="form.leader" placeholder="请输入" maxlength="20"></el-input>
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="联系人" prop="contactPerson" :rules="rule.input">
          <el-input v-model="form.contactPerson" placeholder="请输入" maxlength="20"></el-input>
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="联系方式" prop="phone" :rules="rule.mobile">
          <el-input v-model.number="form.phone" placeholder="请输入"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-form-item label="乡镇（街道）人民政府（办事处）关于创建方案完成情况说明" prop="basicText" :rules="rule.input">
      <el-input type="textarea" :rows="5" placeholder="请输入" maxlength="800" show-word-limit v-model="form.basicText">
      </el-input>
    </el-form-item>

    <el-form-item label="县（市、区）人民政府自评结论" prop="basicText" :rules="rule.input">
      <el-input type="textarea" :rows="5" placeholder="请输入" maxlength="800" show-word-limit v-model="form.basicText">
      </el-input>
    </el-form-item>
  </div>
</template>
<script>
import rule from '@/mixins/rule';

import VillageSelect from '../components/VillageSelect.vue';
import DistrictSelect from '../components/DistrictSelect.vue';

export default {
  components: { VillageSelect, DistrictSelect },
  mixins: [rule],
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
  methods: {
    // 选择村庄地址
    changeAddress(type, val) {
      console.log(type, val);
      // const { village, parent } = val;
      // console.log(village, parent, 'village, parent');
      // this.form.villageName = village.areaName;
      // this.form.town = parent.areaName;
    },
  },
};
</script>
<style lang="scss" scoped>
.basic-info-module {
  padding: 20px;
}
</style>
