<template>
  <div class="map">
    <div class="address">
      <div class="img" v-if="province">
        <img src="./img/wz.png" alt="" />
      </div>
      <div class="address-name" @click="returnProvince">{{ province }}</div>
      <div v-if="city" class="img">
        <img src="./img/wz.png" alt="" />
      </div>
      <div class="address-name" @click="returnCity">{{ city }}</div>
      <div v-if="area" class="img">
        <img src="./img/wz.png" alt="" />
      </div>
      <div class="address-name">{{ area }}</div>
    </div>
    <div class="map-bottom" ref="map"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
// import getOption from "./number_option";
import getSpotOption from './spot_option';
// import {
//   getConlocationDistribution, // （浙农游）（县级）查询位置分布带点位坐标
//   getLocationDistribution, // 打点
// } from "@/api/index";
import { getProviceJSON, getCityJSON, getCountyJSON } from '@/api2/get-json';
import { mapOption } from '@/config/mapOption';
import { cityMap } from '@/config/cityMap';
import { countyMap } from '@/config/countyMap';
// vuex
import { createNamespacedHelpers } from 'vuex';
const { mapMutations, mapGetters } = createNamespacedHelpers('map');

export default {
  name: 'index',
  data() {
    return {
      province: '浙江省',
      city: '',
      area: '',
      // village: '',
      activeIndex: 6,
      myChart: null, // 实例化echarts

      areaId: null, // 获取数据时用的区域id
      cityAreaMap: cityMap.areaMap, //  省行政区划，用于数据的查找，按行政区划查数据
      areaCityMap: cityMap.areaMap1, //  省行政区划，用于数据的查找，按行政区划查数据
      countyAreaMap: countyMap.areaMap, //  省行政区划，用于数据的查找，按行政区划查数据
      mapData: [], // 当前地图上的地区
      option: { ...mapOption.basicOption }, // map的相关配置
      deepTree: [], // 点击地图时push，点返回时pop
      areaName: '浙江省', // 当前地名
      areaCode: '330000', // 当前行政区划
      areaLevel: 'province', // 当前级别
      firstLevel: 1, // 1:省级 2：市级 3： 区县级
      firstLevelOpt: {
        1: 1,
        2: 0,
        3: 0,
      },
    };
  },
  computed: {
    ...mapGetters(['mapAreaId', 'mapAreaName']),
  },
  watch: {},
  mounted() {
    this.$nextTick(() => {
      this.mapEchartsInit(); // 绘画地图
      this.myChart.on('click', this.echartsMapClick);
    });
  },
  methods: {
    ...mapMutations(['setAreaId', 'setAreaName', 'setAreaLevel']),
    // 初次加载绘制地图
    async mapEchartsInit() {
      // echarts.registerMap('浙江省', dapuJson); //引入地图文件
      const areaName = '浙江省';
      this.myChart = echarts.init(this.$refs.map); // 获取展示区域
      if (areaName) {
        console.log(areaName);
        if (areaName in this.cityAreaMap) {
          // 初次加载为市级
          this.province = '';
          this.firstLevel = 2; // 市级
          this.areaName = this.$route.query.areaName;
          this.areaCode = this.cityAreaMap[this.$route.query.areaName];
          this.areaLevel = 'city';
          const data = {
            areaName: this.areaName,
            areaCode: this.areaCode,
            areaLevel: this.areaLevel,
          };
          //如果点击的是11个市，绘制选中地区的二级地图
          this.city = this.$route.query.areaName;
          this.areaId = String(Number(this.areaCode) / 100);
          this.requestGetCityJSON(data);
        } else if (areaName in this.countyAreaMap) {
          // 初次加载为区县级
          this.province = '';
          this.firstLevel = 3; // 区县级
          //  ssssss
          this.areaName = this.$route.query.areaName;
          this.areaCode = this.countyAreaMap[this.$route.query.areaName];
          this.areaLevel = 'districts';
          const data = {
            areaName: this.areaName,
            areaCode: this.areaCode,
            areaLevel: this.areaLevel,
          };
          //如果点击的是区县，绘制选中地区的三级地图
          this.area = this.$route.query.areaName;
          this.areaId = String(Number(this.areaCode));
          this.requestGetCountyJSON(data);
        }
      }
      if (this.areaCode === '330000') {
        this.requestGetProvinceJson();
      }
    },
    // 地图点击
    echartsMapClick(params) {
      console.log('点击了');
      if (params.name in this.cityAreaMap) {
        // 点击的为市级
        this.areaName = params.name;
        this.areaCode = this.cityAreaMap[params.name];
        this.areaLevel = 'city';
        const data = {
          areaName: this.areaName,
          areaCode: this.areaCode,
          areaLevel: this.areaLevel,
        };
        //如果点击的是11个市，绘制选中地区的二级地图
        this.city = params.name;
        this.areaId = String(Number(this.areaCode) / 100);
        this.requestGetCityJSON(data);
      } else if (params.name in this.countyAreaMap) {
        // 点击的为区县级
        console.log(params);
        this.areaName = params.name;
        this.areaCode = this.countyAreaMap[params.name];
        this.areaLevel = 'districts';
        const data = {
          areaName: this.areaName,
          areaCode: this.areaCode,
          areaLevel: this.areaLevel,
        };
        //如果点击的是区县，绘制选中地区的三级地图
        this.area = params.name;
        this.areaId = String(Number(this.areaCode));
        this.requestGetCountyJSON(data);
      } else {
        console.log('点击错误');
        // return;
      }
    },
    //绘制浙江省地图
    requestGetProvinceJson() {
      getProviceJSON().then((res) => {
        let arr = [];
        for (let i = 0; i < res.features.length; i++) {
          let obj = {
            name: res.features[i].properties.name,
            areaName: res.features[i].properties.name,
            areaCode: res.features[i].properties.adcode,
            areaLevel: 'city',
          };
          arr.push(obj);
        }
        this.mapData = arr;
        this.deepTree.push({
          mapData: arr,
          params: {
            name: '浙江省',
            areaName: '浙江省',
            areaLevel: 'province',
            areaCode: '330000',
          },
        });
        this.$emit('map-change', this.deepTree[0].params);
        this._saveMapInfo(this.deepTree[0].params);

        //注册地图
        this.$echarts.registerMap('浙江省', res);
        //绘制地图
        this.renderMap('浙江省', arr);
      });
    },
    // 加载市级地图
    requestGetCityJSON(params) {
      // console.log(params)
      this.areaLevel = params.areaLevel;
      getCityJSON(params.areaCode).then((res) => {
        this.$echarts.registerMap(params.areaName, res);
        let arr = [];
        for (let i = 0; i < res.features.length; i++) {
          let obj = {
            name: res.features[i].properties.name,
            areaName: res.features[i].properties.name,
            areaCode: res.features[i].properties.adcode,
            areaLevel: 'districts',
          };
          arr.push(obj);
        }
        this.mapData = arr;
        this.deepTree.push({ mapData: arr, params: params });
        console.log(this.deepTree);
        this.$emit('map-change', params);
        this._saveMapInfo(params);

        this.renderMap(params.areaName, arr);
      });
    },
    // 加载区县级地图
    requestGetCountyJSON(params) {
      // console.log(params)
      this.areaLevel = params.areaLevel;
      getCountyJSON(params.areaCode).then((res) => {
        this.$echarts.registerMap(params.areaName, res);
        let arr = [];
        for (let i = 0; i < res.features.length; i++) {
          let obj = {
            name: res.features[i].properties.name,
            areaName: res.features[i].properties.name,
            areaCode: res.features[i].properties.adcode,
            areaLevel: 'town',
          };
          arr.push(obj);
        }
        this.mapData = arr;
        this.deepTree.push({ mapData: arr, params: params });
        console.log(this.deepTree);
        this.$emit('map-change', params);
        this._saveMapInfo(params);

        this.renderMap(params.areaName, arr);
      });
    },
    // 打点
    async selectMart(item, index) {
      this.showDim = false;
      this.activeIndex = 6; // 上面按钮初始化
      this.list[index].show = !this.list[index].show;
      if (
        this.list.every((item) => {
          return item.show === false;
        })
      ) {
        const map = this.deepTree[this.deepTree.length - 1].params.areaName;
        const data = this.deepTree[this.deepTree.length - 1].mapData;
        await this.getData();
        this.renderMap(map, data);
      } else {
        this.getData();
      }
    },
    // 绘制地图
    renderMap(map, data) {
      this.option.series = [
        {
          name: map,
          mapType: map,
          ...mapOption.seriesOption,
          data: data,
        },
      ];
      this.option.geo = {
        map: map,
        ...mapOption.basicOption.geo,
      };
      //渲染地图
      this.myChart.setOption(this.option, true);
    },
    // 返回到省级
    returnProvince() {
      this.deepTree = []; // 层级数组清空
      this.city = '';
      this.area = '';
      this.areaId = null;
      this.areaName = '浙江省';
      this.initIconAndButton();
      this.requestGetProvinceJson();
    },
    returnCity() {
      this.area = '';
      // 改
      console.log(this.deepTree[this.firstLevelOpt[this.firstLevel]]);
      this.areaId = String(Number(this.deepTree[this.firstLevelOpt[this.firstLevel]].params.areaCode) / 100);
      this.areaName = this.deepTree[this.firstLevelOpt[this.firstLevel]].params.areaName;
      this.deepTree.splice(this.firstLevelOpt[this.firstLevel] + 1, 1);
      console.log(this.deepTree);
      this.initIconAndButton();
      this.requestGetCityJSON(this.deepTree[this.firstLevelOpt[this.firstLevel]].params);
    },
    // 获取打点数据
    async getData() {
      let res, data;
      if (this.area) {
        data = {
          q1: this.list[0].show,
          q2: this.list[1].show,
          q3: this.list[2].show,
          q4: this.list[3].show,
          areaName: this.areaName,
        };
        res = await getConlocationDistribution(data);
      } else {
        data = {
          q1: this.list[0].show,
          q2: this.list[1].show,
          q3: this.list[2].show,
          q4: this.list[3].show,
          areaId: this.areaId,
        };
        res = await getLocationDistribution(data);
      }
      const optionData = {
        data1: [],
        data2: [],
        data3: [],
        data4: [],
      };
      if (res.q1) {
        optionData.data1 = res.q1.map((item) => {
          return {
            name: item.name,
            value: [Number(item.areaY), Number(item.areaX)],
          };
        });
      }
      if (res.q2) {
        optionData.data2 = res.q2.map((item) => {
          return {
            name: item.name,
            value: [Number(item.areaY), Number(item.areaX)],
          };
        });
      }
      if (res.q3) {
        optionData.data3 = res.q3.map((item) => {
          return {
            name: item.name,
            value: [Number(item.areaY), Number(item.areaX)],
          };
        });
      }
      if (res.q4) {
        optionData.data4 = res.q4.map((item) => {
          return {
            name: item.name,
            value: [Number(item.areaY), Number(item.areaX)],
          };
        });
      }
      this.myChart.setOption(getSpotOption(optionData, this.areaName), true);
    },

    _saveMapInfo(data) {
      const { areaLevel, areaCode, areaName } = data;
      console.log(areaLevel, areaCode, areaName);
      this.setAreaId(areaCode);
      this.setAreaLevel(areaLevel);
      this.setAreaName(areaName);
    },
  },
};
</script>

<style lang="scss" scoped>
.map {
  box-sizing: border-box;
  //width: 688px;
  //height: 985px;
  //background: red;
  .address {
    display: flex;
    margin-left: 44px;
    margin-top: 18px;
    margin-bottom: 30px;
    .img {
      width: 24px;
      margin-right: 7px;
      margin-left: 7px;
      &:nth-of-type(1) {
        margin-left: 0;
      }
    }
    .address-name {
      cursor: pointer;
    }
  }
  .map-bottom {
    margin-top: 56px;
    width: 100%;
    height: 303px;
    overflow: hidden;
  }
}
</style>
