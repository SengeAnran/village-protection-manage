<template>
  <div class="basic-info-module">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item prop="areaId" label="创建村名称" :rules="rule.select" v-if="villageType === 1">
          <VillageSelect ref="villageSelect" v-model="saveVO.villageName" @change="changeAddress('areaId', $event)" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="创建批次">
          <el-input disabled v-model.number="baseInfo.declarationBatch" placeholder="请输入" maxlength="8"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="总投资（万元）">
          <el-input-number
            disabled
            v-model="baseInfo.investNum"
            :controls="false"
            :precision="2"
            placeholder="请输入"
            maxlength="8"
          ></el-input-number>
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
    <el-form-item label="是否配备物业" prop="isAllocated" :rules="isAllocatedRule">
      <el-select v-model="form.isAllocated" placeholder="请选择" class="village-select">
        <el-option v-for="item in propertyOptions" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-select v-if="form.isAllocated" v-model="form.propertyType" placeholder="请选择类型" class="village-select">
        <el-option v-for="item in propertyTypeOptions" :key="item.value" :label="item.label" :value="item.label">
        </el-option>
      </el-select>
      <el-select
        v-if="form.isAllocated"
        multiple
        v-model="form.provisionService"
        placeholder="请勾选配备服务"
        class="village-select"
      >
        <el-option v-for="item in propertyServeOptions" :key="item.value" :label="item.label" :value="item.label">
        </el-option>
      </el-select>
    </el-form-item>
  </div>
</template>
<script>
import rule from '@/mixins/rule';

import VillageSelect from './VillageSelect.vue';

import { getAreaBaseInfo } from '@/api2/acceptanceEvaluation';

export default {
  components: { VillageSelect },
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
      propertyOptions: [
        {
          label: '是',
          value: 1,
        },
        {
          label: '否',
          value: 0,
        },
      ],
      propertyTypeOptions: [
        {
          label: '专业服务',
          value: 0,
        },
        {
          label: '自治服务',
          value: 1,
        },
        {
          label: '托管服务',
          value: 2,
        },
      ],
      propertyServeOptions: [
        {
          label: '公共区域保洁',
          value: 0,
        },
        {
          label: '安全秩序维护',
          value: 1,
        },
        {
          label: '停车秩序维护',
          value: 2,
        },
        {
          label: '共用设施维修',
          value: 3,
        },
        {
          label: '绿化养护',
          value: 4,
        },
        {
          label: '小区道路保养',
          value: 5,
        },
      ],
      baseInfo: {
        // villageName: '',
        declarationBatch: '', //申报批次
        investNum: '', //总投资（万元）
        leader: '', //领办领导
        contactPerson: '', //联系人
        phone: '', //联系方式
      },
      isAllocatedRule: {
        required: true,
        validator: this.isAllocatedRuleFun,
        trigger: ['blur', 'change'],
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

          val.saveVO.decType === 1 && this.$refs.villageSelect.setValue(val.saveVO.villageName);
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
        params.name = val;
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
    // 校验是否匹配物业
    isAllocatedRuleFun(rule, value, callback) {
      if (value === undefined) {
        callback(new Error('选择不能为空'));
      }
      if (value && (!this.form.propertyType || this.form.propertyType === 0)) {
        callback(new Error('请选择物业类型'));
      } else if (value && this.form.provisionService.length === 0) {
        callback(new Error('请勾选配备服务'));
      } else {
        callback();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.basic-info-module {
  padding: 20px;
}
</style>
