<template>
  <div class="input-item-wrp">
    <el-form-item
      label=""
      prop="population"
      :rules="rule.input"
    >
      <div style="display: inline-block" slot="label">
        当年户籍人口（人）
        <el-popover
          placement="top-start"
          title=""
          width="200"
          trigger="hover"
          content="按农经年报数填写。">
          <div slot="reference" style="display: inline-block;width: 0.8rem; height: 0.8rem" >
            <img src="./img/u15.png" alt="">
          </div>
        </el-popover>
      </div>
      <el-input
        v-model.number="form.population"
        placeholder="请输入内容"
        :disabled="disabled"
      ></el-input>
    </el-form-item>
    <el-form-item
      prop="income"
      :rules="rule.input"
    >
      <div style="display: inline-block" slot="label">
        当年村集体经济收入（万元）
        <el-popover
          placement="top-start"
          title=""
          width="200"
          trigger="hover"
          content="按农经年报数填写。">
          <div slot="reference" style="display: inline-block;width: 0.8rem; height: 0.8rem" >
            <img src="./img/u15.png" alt="">
          </div>
        </el-popover>
      </div>
      <el-input
        v-model.number="form.income"
        placeholder="请输入内容"
        :disabled="disabled"
      ></el-input>
    </el-form-item>
    <el-form-item label="古建筑村落年代" prop="villageAge" :rules="rule.select">
      <div style="display: inline-block" slot="label">
        古建筑村落年代
        <el-popover
          placement="top-start"
          title=""
          width="200"
          trigger="hover"
          content="以村落内主要古建筑所属年代来确定村落年代，清代是指 1644—1911 年，明代是指 1368—1643 年，明代前是指 1367 年前，年代不能交叉。">
          <div slot="reference" style="display: inline-block;width: 0.8rem; height: 0.8rem" >
            <img src="./img/u15.png" alt="">
          </div>
        </el-popover>
      </div>
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
    <el-form-item
      label="当年常住人口（人）"
      prop="resPopulation"
      :rules="rule.input"
    >
      <el-input
        v-model.number="form.resPopulation"
        placeholder="请输入内容"
        :disabled="disabled"
      ></el-input>
    </el-form-item>
    <el-form-item label="是否历史文化名村" prop="isFamous" :rules="rule.select">
      <el-radio v-model="form.isFamous" :label="2" :disabled="disabled">
        是，国家级
      </el-radio>
      <el-radio v-model="form.isFamous" :label="1" :disabled="disabled">
        是，省级
      </el-radio>
      <el-radio v-model="form.isFamous" :label="0" :disabled="disabled">
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
    <el-form-item label="是否传统村" prop="isTradition" :rules="rule.select">
      <el-radio v-model="form.isTradition" :label="2" :disabled="disabled">
        是，国家级
      </el-radio>
      <el-radio v-model="form.isTradition" :label="1" :disabled="disabled">
        是，省级
      </el-radio>
      <el-radio v-model="form.isTradition" :label="0" :disabled="disabled">
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
