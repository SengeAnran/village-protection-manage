<template>
  <div>
    <el-checkbox-group v-model="villageProperty">
      <el-checkbox v-for="(item, index) of options" :key="index" :label="item"></el-checkbox>
    </el-checkbox-group>
    <div class="checkboxs">
      <div class="checkbox-item">
        <div class="checkbox-item-label">
          <el-checkbox v-model="showA" label="3A级景区村庄:"></el-checkbox>
        </div>
        <el-radio-group v-if="showA || villagePropertyA" class="radio-group" v-model="villagePropertyA">
          <el-radio v-for="(item, index) of aOptions" :key="index" :label="item"></el-radio>
        </el-radio-group>
      </div>
      <div class="checkbox-item">
        <div class="checkbox-item-label">
          <el-checkbox v-model="showF" label="法治村:"></el-checkbox>
        </div>
        <el-radio-group v-if="showF || villagePropertyF" class="radio-group" v-model="villagePropertyF">
          <el-radio v-for="(item, index) of fOptions" :key="index" :label="item"></el-radio>
        </el-radio-group>
      </div>
      <div class="checkbox-item">
        <div class="checkbox-item-label">
          <el-checkbox v-model="showW" label="文明村:"></el-checkbox>
        </div>
        <el-radio-group v-if="showW || villagePropertyW" class="radio-group" v-model="villagePropertyW">
          <el-radio v-for="(item, index) of wOptions" :key="index" :label="item"></el-radio>
        </el-radio-group>
      </div>
      <div class="checkbox-item">
        <div class="checkbox-item-label">
          <el-checkbox v-model="showS" label="善治村:"></el-checkbox>
        </div>
        <el-radio-group v-if="showS" class="radio-group" v-model="villagePropertyS">
          <el-radio v-for="(item, index) of sOptions" :key="index" :label="item"></el-radio>
        </el-radio-group>
      </div>
    </div>
  </div>
</template>

<script>
import emitter from 'element-ui/lib/mixins/emitter.js';
export default {
  mixins: [emitter],
  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      showS2: false,
      showW2: false,
      showF2: false,
      showA2: false,
      sOptions: ['善治村', '善治示范村'],
      wOptions: ['全国文明村', '省级文明村', '市级文明村'],
      fOptions: ['全国法治村', '省级法治村', '市级法治村'],
      aOptions: ['A景区村', 'AA景区村', 'AAA景区村'],
      options: ['县域风貌样板区内', '驻乡镇村规划师规划村庄', '下山移民新村'],
    };
  },
  computed: {
    villageProperty: {
      set: function (v) {
        this.updateValue(v, this.villagePropertyA, this.villagePropertyF, this.villagePropertyW, this.villagePropertyS);
      },
      get: function () {
        const dest = this.value.filter((ele) => this.options.some((el) => el === ele));
        return dest;
      },
    },
    villagePropertyS: {
      set: function (v) {
        this.updateValue(this.villageProperty, this.villagePropertyA, this.villagePropertyF, this.villagePropertyW, v);
      },
      get: function () {
        const dest = this.value.find((ele) => this.sOptions.some((el) => el === ele));
        return dest;
      },
    },
    villagePropertyF: {
      set: function (v) {
        this.updateValue(this.villageProperty, this.villagePropertyA, v, this.villagePropertyW, this.villagePropertyS);
      },
      get: function () {
        const dest = this.value.find((ele) => this.fOptions.some((el) => el === ele));
        return dest;
      },
    },
    villagePropertyW: {
      set: function (v) {
        this.updateValue(this.villageProperty, this.villagePropertyA, this.villagePropertyF, v, this.villagePropertyS);
      },
      get: function () {
        const dest = this.value.find((ele) => this.wOptions.some((el) => el === ele));
        return dest;
      },
    },
    villagePropertyA: {
      set: function (v) {
        this.updateValue(this.villageProperty, v, this.villagePropertyF, this.villagePropertyW, this.villagePropertyS);
      },
      get: function () {
        const dest = this.value.find((ele) => this.aOptions.some((el) => el === ele));
        return dest;
      },
    },
    showS: {
      set: function (v) {
        this.showS2 = v;
        if (!v) {
          this.villagePropertyS = undefined;
        }
      },
      get: function () {
        return !!this.villagePropertyS || this.showS2;
      },
    },
    showW: {
      set: function (v) {
        this.showW2 = v;
        if (!v) {
          this.villagePropertyW = undefined;
        }
      },
      get: function () {
        return !!this.villagePropertyW || this.showW2;
      },
    },
    showF: {
      set: function (v) {
        this.showF2 = v;
        if (!v) {
          this.villagePropertyF = undefined;
        }
      },
      get: function () {
        return !!this.villagePropertyF || this.showF2;
      },
    },
    showA: {
      set: function (v) {
        this.showA2 = v;
        if (!v) {
          this.villagePropertyA = undefined;
        }
      },
      get: function () {
        return !!this.villagePropertyA || this.showA2;
      },
    },
  },
  watch: {
    value(val) {
      this.dispatch('ElFormItem', 'el.form.change', [val]);
    },
    // showS(val) {
    //   if (!val) {
    //     this.villagePropertyS = undefined;
    //   }
    // },
    // showW(val) {
    //   if (!val) {
    //     this.villagePropertyW = undefined;
    //   }
    // },
    // showF(val) {
    //   if (!val) {
    //     this.villagePropertyF = undefined;
    //   }
    // },
    // showA(val) {
    //   if (!val) {
    //     this.villagePropertyA = undefined;
    //   }
    // },
  },
  methods: {
    updateValue(multi, a, f, w, s) {
      const dest = [...multi];
      if (a) {
        dest.push(a);
      }
      if (f) {
        dest.push(f);
      }
      if (w) {
        dest.push(w);
      }
      if (s) {
        dest.push(s);
      }
      this.$emit('input', dest);
      this.$emit('change', dest);
    },
  },
};
</script>

<style lang="scss" scoped>
.checkboxs {
  display: flex;
}
.checkbox-item {
  min-width: 130px;
  //flex: 1;
  //display: flex;
  align-items: center;
  //padding-left: 20px;

  .checkbox-item-label {
    width: 100px;
    display: inline-block;
    font-size: 14px;
    color: #606266;
    cursor: pointer;
  }

  ::v-deep .el-radio-group {
    display: block;
  }
  ::v-deep .el-radio {
    display: block;
    padding: 3px 0;
    min-width: 100px;
  }
}

.radio-group {
  padding-left: 20px;
}
</style>
