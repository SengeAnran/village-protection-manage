<template>
  <div>
    <el-dialog
      :title="type === 'add' ? '添加' : '编辑'"
      :visible.sync="_visible"
    >
      <el-form :model="form" ref="form">
        <el-form-item
          label="村名"
          :label-width="formLabelWidth"
          prop="villageName"
          :rules="rule.input"
        >
          <el-input
            class="input"
            v-model="form.villageName"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="地址"
          :label-width="formLabelWidth"
          prop="areaId"
          :rules="rule.select"
        >
          <el-cascader
            class="input"
            v-model="form.areaId"
            :options="villageInfoOpt"
            :props="optionProps"
            v-if="_visible"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="$emit('close')">取 消</el-button>
        <el-button type="primary" @click="confirm"> 确 定 </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import rule from "@/mixins/rule";
import { getVillageInfoTree } from "@/api/settingInfo";
export default {
  mixins: [rule],
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "add",
    },
    data: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      form: {
        areaId: [],
        villageName: "",
      },
      formLabelWidth: "120px",

      villageInfoOpt: [],
      optionProps: {
        value: "areaId",
        label: "areaName",
        children: "children",
      },
    };
  },
  watch: {
    visible(val) {
      if (val) {
        this.$refs["form"] && this.$refs["form"].resetFields();
      }
      if (this.type === "edit") {
        this.form.villageName = this.data.villageName;
        this.form.areaId = this.normalizeAreaId(this.data.areaId);
      }
    },
  },
  computed: {
    _visible: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit("close", val);
      },
    },
  },
  created() {
    this.getVillageInfoTree();
  },
  methods: {
    getVillageInfoTree() {
      getVillageInfoTree().then((res) => {
        this.villageInfoOpt = res;
      });
    },

    confirm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          const params = {
            areaId: this.form.areaId.pop(),
            villageName: this.form.villageName,
          };
          params.type = this.type;
          params.id = this.data.id;
          this.$emit("confirm", params);
        } else {
          return false;
        }
      });
    },

    normalizeAreaId(areaId) {
      if (!areaId) return [];

      const res = [];
      for (let i = 1; i <= areaId.length / 2; i += 1) {
        res.push(areaId.slice(0, i * 2));
      }

      return res;
    },
  },
};
</script>

<style lang="scss" scoped>
.input {
  width: 430px;
}
</style>
