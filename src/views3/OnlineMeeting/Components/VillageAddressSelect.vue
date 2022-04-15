<template>
  <el-cascader
    style="width: 350px"
    ref="cascader"
    clearable
    :options="villageInfoOpt"
    show-all-levels
    :props="props"
    :placeholder="placeholder"
    @change="getCheckedNodes"
    :filterable="true"
    :emitPath="false"
  >
  </el-cascader>
</template>
<script>
import { getChildArea } from "@/api3/venueReservation";
export default {
  props: {
    value: String,
    placeholder: {
      type: String,
      default: "请选择",
    }

  },
  data() {
    return {
      villageInfoOpt: [
        {
          value: 33,
          label: "浙江省",
        }
      ],
      optionProps: {
        value: "areaId",
        label: "areaName",
        children: "children",
      },
      props: {
        lazy: true,
        lazyLoad (node, resolve) {
          const { level } = node;
          getChildArea({ areaId: node.value || 33 }).then(res => {
            const nodes = res.map(i => {
              return {
                value: i.areaId,
                label: i.areaName,
                leaf: level >= 4
              }
            });
            // 通过调用resolve将子节点数据返回，通知组件数据加载完成
            resolve(nodes);
          })
        },
      }
    };
  },
  computed: {
    _value: {
      get() {
        return this.value;
      },
      set(val) {
        const lastValue = val.slice(-1)[0];
        this.$emit("input", lastValue);
      },
    },
  },
  created() {
    // this.initData();
  },
  methods: {
    // initData() {
    //   getVillageArea().then((res) => {
    //     this.villageInfoOpt = res;
    //   });
    // },
    getCheckedNodes() {
      console.log( this.$refs.cascader.getCheckedNodes());
      const village = this.$refs.cascader.getCheckedNodes()[0];
      // const parent = village.parent;
      this.$emit("change", {
        // parent: parent.data,
        village: village.data || '',
        address: this.getNodeAddressName(village),
      });
    },
    getNodeAddressName(village) {
      console.log(village);
      let addressArr = [];
      let node = village;
      while (node){
        addressArr.splice(0,0, node.label);
        node = node.parent;
      }
      return addressArr.join("");
    }
  },
};
</script>
