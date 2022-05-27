<template>
  <div class="basic-info-module">
    <el-row :gutter="20">
      <el-radio v-model="villageType" :label="1">创建村申报</el-radio>
      <el-radio v-model="villageType" :label="2">片区申报</el-radio>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="mb-8">
          <el-form-item prop="areaId" label="创建村名称" :rules="rule.select" v-if="villageType === 1">
            <VillageSelect ref="villageSelect" v-model="form.areaId" @change="changeAddress('areaId', $event)" />
          </el-form-item>
          <el-form-item prop="declarationId" label="片区名称" :rules="rule.select" v-if="villageType === 2">
            <DistrictSelect
              v-model="form.declarationId"
              :area.sync="saveVO.area"
              @change="changeAddress('district', $event)"
            />
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="8">
        <el-form-item label="创建批次">
          <el-input disabled v-model.number="baseInfo.declarationBatch" placeholder="请输入" maxlength="8"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="总投资（万元）">
          <el-input disabled v-model="baseInfo.investNum" placeholder="请输入" maxlength="8"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="领办领导">
          <el-input disabled v-model="baseInfo.leader" placeholder="请输入" maxlength="20"></el-input>
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="联系人">
          <el-input disabled v-model="baseInfo.contactPerson" placeholder="请输入" maxlength="20"></el-input>
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="联系方式">
          <el-input disabled v-model.number="baseInfo.phone" placeholder="请输入"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-form-item
      label="乡镇（街道）人民政府（办事处）关于创建方案完成情况说明"
      prop="completionStatement"
      :rules="rule.input"
    >
      <el-input
        type="textarea"
        :rows="5"
        placeholder="请输入"
        maxlength="800"
        show-word-limit
        v-model="form.completionStatement"
      >
      </el-input>
    </el-form-item>

    <el-form-item label="县（市、区）人民政府自评结论" prop="conclusion" :rules="rule.input">
      <el-input
        type="textarea"
        :rows="5"
        placeholder="请输入"
        maxlength="800"
        show-word-limit
        v-model="form.conclusion"
      >
      </el-input>
    </el-form-item>
  </div>
</template>
<script>
import rule from '@/mixins/rule';

import VillageSelect from './VillageSelect.vue';
import DistrictSelect from './DistrictSelect.vue';

import { getAreaBaseInfo } from '@/api2/acceptanceEvaluation';

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
      villageType: 1,

      baseInfo: {
        declarationBatch: '', //申报批次
        investNum: '', //总投资（万元）
        leader: '', //领办领导
        contactPerson: '', //联系人
        phone: '', //联系方式
      },
    };
  },
  computed: {
    saveVO() {
      return this.form.saveVO || {};
    },
  },
  watch: {
    villageType() {
      this._resetBaseInfo();
    },
    form(val) {
      if (val.saveVO) {
        const { declarationId, areaId } = val;
        this.baseInfo = { ...val.saveVO };
        this.villageType = val.saveVO.decType;
        this.$nextTick(() => {
          declarationId && (this.form.declarationId = declarationId);
          areaId && (this.form.declarationId = declarationId);

          val.saveVO.decType === 1 && this.$refs.villageSelect.setCascaderValue(val.saveVO.villageName);
        });
      }
    },
  },
  methods: {
    // 选择村庄地址
    changeAddress(type, val) {
      const params = {};
      if (type === 'areaId') {
        params.type = 1;
        params.name = val.areaName;
      } else {
        params.type = 2;
        params.name = val;
      }
      getAreaBaseInfo(params).then((res) => {
        const data = {
          areaId: res.areaId,
          declarationId: res.declarationId,
        };
        // type === 'areaId' ? (data.declarationId = undefined) : (data.declarationId = res.declarationId);
        this._assignBaseInfo(res);
        this.$emit('change', data);
      });
    },

    _assignBaseInfo(data) {
      Object.keys(this.baseInfo).map((key) => {
        this.baseInfo[key] = data[key] || '--';
      });
    },
    _resetBaseInfo() {
      Object.keys(this.baseInfo).map((key) => {
        this.baseInfo[key] = '';
        this.$emit('change', { areaId: undefined, declarationId: undefined });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.basic-info-module {
  padding: 20px;
}
</style>
