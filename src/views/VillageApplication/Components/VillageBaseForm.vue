<template>
  <div class="input-item-wrp">
    <el-form-item
      label="当年户籍人口（人）"
      prop="population"
      :rules="rule.input"
    >
      <el-input
        v-model.number="form.population"
        placeholder="请输入内容"
        :disabled="disabled"
      ></el-input>
    </el-form-item>
    <el-form-item
      label="当年村集体经济收入（万元）"
      prop="income"
      :rules="rule.input"
    >
      <el-input
        v-model.number="form.income"
        placeholder="请输入内容"
        :disabled="disabled"
      ></el-input>
    </el-form-item>
    <el-form-item label="古建筑村落年代" prop="villageAge" :rules="rule.select">
      <el-select
        style="width: 100%"
        v-model="form.villageAge"
        placeholder="请选择"
        :disabled="disabled"
      >
        <el-option
          v-for="item in villageAgeOpt"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="是否历史文化名村" prop="isFamous" :rules="rule.select">
      <el-radio v-model="form.isFamous" :label="true" :disabled="disabled">
        是
      </el-radio>
      <el-radio v-model="form.isFamous" :label="false" :disabled="disabled">
        否
      </el-radio>
    </el-form-item>
    <el-form-item label="是否一般村" prop="isGeneral" :rules="rule.select">
      <el-radio v-model="form.isGeneral" :label="true" :disabled="disabled">
        是
      </el-radio>
      <el-radio v-model="form.isGeneral" :label="false" :disabled="disabled">
        否
      </el-radio>
    </el-form-item>
  </div>
</template>
<script>
import rule from "@/mixins/rule";
import { VILLAGE_AGE } from "../constants";

export default {
  mixins: [rule],
  props: {
    form: {
      type: Object,
      required: true,
      default: () => {},
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  created() {
    this.villageAgeOpt = this._arrToSelectOptions(VILLAGE_AGE);
  },
  methods: {
    _arrToSelectOptions(arr) {
      return arr.map((item) => {
        return {
          label: item,
          value: item,
        };
      });
    },
  },
};
</script>
