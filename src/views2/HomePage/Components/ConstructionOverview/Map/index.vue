<template>
  <div class="map">
    <div
      class="map-bottom"
      ref="map"
      :style="{ zoom: zoom, transform: `scale(${1 / zoom}, ${1})`, transformOrigin: '0 0' }"
    ></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import getSpotOption from './spotOption';
import { getProviceJSON, getCityJSON, getCountyJSON } from '@/api2/get-json';
import { mapOption } from '@/config/mapOption';
import { cityMap } from '@/config/cityMap';
import { countyMap } from '@/config/countyMap';
import { mapGetters } from 'vuex';
import { getRanking } from '@/api2/homePage';

export default {
  name: 'index',
  data() {
    return {
      province: '浙江省',
      city: '',
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
      zoom: 1,
      listData: [],
      geoCoordMap: {}, //点位数据
    };
  },
  computed: {
    ...mapGetters(['area', 'location', 'batch']),
  },
  watch: {
    area() {
      this.changeArea();
    },
    batch() {
      this.changeArea();
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.mapEchartsInit(); // 绘画地图
      this.getListData(); // 获取数据并打点
      // this.myChart.on('click', this.echartsMapClick);
      // 消除zoom缩放导致鼠标偏移
      this.zoom = 1 / document.body.style.zoom;
    });
  },
  methods: {
    // 初次加载绘制地图
    mapEchartsInit() {
      // echarts.registerMap('浙江省', dapuJson); //引入地图文件
      // const areaName = '浙江省';
      this.myChart = echarts.init(this.$refs.map); // 获取展示区域
      // if (this.areaCode === '330000') {
      //   this.requestGetProvinceJson();
      // }
      const params = {
        name: this.area,
      };
      this.echartsMapClick(params);
    },
    // 地图点击
    echartsMapClick(params) {
      // console.log('点击了');
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
        return true;
      } else if (params.name in this.countyAreaMap) {
        // 点击的为区县级
        this.areaName = params.name;
        this.areaCode = this.countyAreaMap[params.name];
        this.areaLevel = 'districts';
        const data = {
          areaName: this.areaName,
          areaCode: this.areaCode,
          areaLevel: this.areaLevel,
        };
        //如果点击的是区县，绘制选中地区的三级地图
        // this.area = params.name;
        this.areaId = String(Number(this.areaCode));
        this.requestGetCountyJSON(data);
        return true;
      } else if (params.name === '浙江省') {
        this.requestGetProvinceJson();
        return true;
      } else {
        // console.log('点击错误');
        return false;
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
        // this.$emit('map-change', this.deepTree[0].params);
        // this._saveMapInfo(this.deepTree[0].params);

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
        this.$emit('map-change', params);
        // this._saveMapInfo(params);

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
        this.$emit('map-change', params);
        // this._saveMapInfo(params);

        this.renderMap(params.areaName, arr);
      });
    },

    /* 获取列表数据 */
    async getListData() {
      const data = {
        batch: this.batch,
        ...this.location,
      };
      const res = await getRanking(data);
      this.listData = res.map((i) => {
        return {
          name: i.name,
          value: i.numberOfCreated,
        };
      });
      const optionData = this.convertData(this.listData);
      // console.log('optionData', optionData);

      this.myChart.clear();
      this.myChart.setOption(getSpotOption(optionData, this.area), true); // 打点
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
      this.getCoord();
    },
    // // 返回到省级
    // returnProvince() {
    //   this.deepTree = []; // 层级数组清空
    //   this.city = '';
    //   this.area = '';
    //   this.areaId = null;
    //   this.areaName = '浙江省';
    //   this.initIconAndButton();
    //   this.requestGetProvinceJson();
    // },
    // returnCity() {
    //   this.area = '';
    //   // 改
    //   console.log(this.deepTree[this.firstLevelOpt[this.firstLevel]]);
    //   this.areaId = String(Number(this.deepTree[this.firstLevelOpt[this.firstLevel]].params.areaCode) / 100);
    //   this.areaName = this.deepTree[this.firstLevelOpt[this.firstLevel]].params.areaName;
    //   this.deepTree.splice(this.firstLevelOpt[this.firstLevel] + 1, 1);
    //   console.log(this.deepTree);
    //   this.initIconAndButton();
    //   this.requestGetCityJSON(this.deepTree[this.firstLevelOpt[this.firstLevel]].params);
    // },
    changeArea() {
      // console.log('myChart', this.area);
      const params = {
        name: this.area,
      };
      const res = this.echartsMapClick(params);
      // console.log('res', res);
      if (res) {
        // 获取到地图的情况下才获取数据
        this.getListData(); // 获取数据并打点
      }
    },
    // 获取地图点位数据
    getCoord() {
      /*获取地图数据*/
      this.myChart.showLoading();
      const mapFeatures = echarts.getMap(this.area).geoJson.features;
      // console.log('mapFeatures', mapFeatures);
      this.myChart.hideLoading();
      mapFeatures.forEach((v) => {
        // 地区名称
        const name = v.properties.name;
        // 地区经纬度
        this.geoCoordMap[name] = v.properties.centroid || v.properties.center;
      });
      // console.log('geoCoordMap', this.geoCoordMap);
    },
    // _saveMapInfo(data) {
    //   const { areaLevel, areaCode, areaName } = data;
    //   // console.log(areaLevel, areaCode, areaName);
    //   this['map/setAreaId'](areaCode);
    //   this['map/setAreaLevel'](areaLevel);
    //   this['map/setAreaName'](areaName);
    // },
    /**
     *
     * @param data 数据
     * @returns {*[]}
     */
    convertData(data) {
      // 打点数据
      const res = [];
      for (let i = 0; i < data.length; i++) {
        const geoCoord = this.geoCoordMap[data[i].name]; // 坐标
        if (geoCoord) {
          res.push({
            name: data[i].name,
            value: geoCoord.concat(data[i].value),
          });
        }
      }
      return res;
    },
  },
};
</script>

<style lang="scss" scoped>
.map {
  margin-right: 32px;
  box-sizing: border-box;
  background: url('./bg.png') left top no-repeat;
  background-size: 100% 100%;
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
    //margin-top: 56px;
    background: url('./yuan.png') 33% 1px no-repeat;
    background-size: 55% 96%;
    width: 100%;
    height: 446px;
    overflow: hidden;
    & > div {
      width: 100%;
    }
  }
}
</style>
