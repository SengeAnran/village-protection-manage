<template>
  <div class="map">
    <div
      class="map-bottom"
      ref="map"
      :style="{ zoom: zoom, transform: `scale(${1 / zoom}, ${1})`, transformOrigin: '0 0' }"
    ></div>
    <DataContent />
  </div>
</template>

<script>
import * as echarts from 'echarts';
import { getSpotOption, getSpotOption2 } from './spotOption';
import { getProviceJSON, getCityJSON, getCountyJSON } from '@/api2/get-json';
import { mapOption } from '@/config/mapOption';
import { cityMap } from '@/config/cityMap';
import { countyMap } from '@/config/countyMap';
import { mapGetters, mapMutations } from 'vuex';
import { getRanking } from '@/api2/homePage';
import DataContent from './DataContent';
import role from '@/views2/mixins/role';

export default {
  mixins: [role],
  name: 'index',
  components: { DataContent },
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
      deepTree: [], // 点击地图时push，点返回时pop 未用
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
      areaArr: [], // 地区数组用于控制首页地区塞选框联动
    };
  },
  computed: {
    ...mapGetters(['area', 'location', 'batch', 'year', 'status']),
    query() {
      return {
        area: this.area,
        year: this.year,
        batch: this.batch,
        status: this.status,
      };
    },
  },
  watch: {
    query: {
      handler: function () {
        this.changeArea();
      },
      deep: true,
    },
  },
  mounted() {
    this.$nextTick(async () => {
      const res = await this.mapEchartsInit(); // 绘画地图
      if (res) {
        // 绘制地图成功
        this.getListData(); // 获取数据并打点
      }
      // 注册地图点击事件
      this.myChart.on('click', this.echartsMapClick);
      // 消除zoom缩放导致鼠标偏移
      this.zoom = 1 / document.body.style.zoom;
    });
  },
  methods: {
    ...mapMutations('home', ['SET_AREA_COUNTY', 'SET_AREA_CITY', 'SET_AREA_ARR']),
    // 初次加载绘制地图
    async mapEchartsInit() {
      // echarts.registerMap('浙江省', dapuJson); //引入地图文件
      // const areaName = '浙江省';
      this.myChart = echarts.init(this.$refs.map); // 获取展示区域
      const params = {
        name: this.area,
      };
      return await this.echartsMapLoad(params);
    },
    // 加载地图
    async echartsMapLoad(params) {
      if (params.name in this.cityAreaMap) {
        // 加载的为市级
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
        return await this.requestGetCityJSON(data);
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
        return await this.requestGetCountyJSON(data);
      } else if (params.name === '浙江省') {
        return await this.requestGetProvinceJson();
      } else {
        // console.log('点击错误');
        return false;
      }
    },
    // 点击地图
    echartsMapClick(params) {
      const areaArr = [];
      if (params.name in this.cityAreaMap) {
        // 点击的为市级
        // 刷新地区数组
        if (this.PROVINCE) {
          areaArr.push({
            areaId: '33',
            areaName: '浙江省',
          });
          areaArr.push({
            areaId: (this.cityAreaMap[params.name] / 100).toString(),
            areaName: params.name,
          });
        }
        if (this.CITY || this.CITY_LEADER) {
          areaArr.push({
            areaId: (this.cityAreaMap[params.name] / 100).toString(),
            areaName: params.name,
          });
        }
        // 切换store内地区
        if (this.area !== params.name) {
          // 点击地图切换
          this.SET_AREA_CITY(params.name);
        }
        this.areaArr = areaArr;
        this.SET_AREA_ARR(areaArr);
      } else if (params.name in this.countyAreaMap) {
        // 点击的为区县级
        // 刷新地区数组
        if (this.PROVINCE) {
          areaArr.push({
            areaId: '33',
            areaName: '浙江省',
          });
          const cityAreaId = Math.floor(this.countyAreaMap[params.name] / 100) * 100;
          areaArr.push({
            areaId: (cityAreaId / 100).toString(),
            areaName: this.areaCityMap[cityAreaId],
          });
          areaArr.push({
            areaId: this.countyAreaMap[params.name].toString(),
            areaName: params.name,
          });
        }
        if (this.CITY || this.CITY_LEADER) {
          const cityAreaId = (this.countyAreaMap[params.name] / 100).toFixed(0) * 100;
          areaArr.push({
            areaId: (cityAreaId / 100).toString(),
            areaName: this.areaCityMap[cityAreaId],
          });
          areaArr.push({
            areaId: this.countyAreaMap[params.name].toString(),
            areaName: params.name,
          });
        }
        if (this.COUNTRY || this.COUNTRY_LEADER) {
          areaArr.push({
            areaId: this.countyAreaMap[params.name].toString(),
            areaName: params.name,
          });
        }
        // 切换store内地区
        if (this.area !== params.name) {
          // 点击地图切换
          this.SET_AREA_COUNTY(params.name);
        }
        this.areaArr = areaArr;
        this.SET_AREA_ARR(areaArr);
      } else {
        return false;
      }
    },
    //绘制浙江省地图
    requestGetProvinceJson() {
      return new Promise((resolve) => {
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
          resolve(true);
        });
      });
    },
    // 加载市级地图
    requestGetCityJSON(params) {
      // console.log(params)
      this.areaLevel = params.areaLevel;
      return new Promise((resolve) => {
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
          resolve(true);
        });
      });
    },
    // 加载区县级地图
    requestGetCountyJSON(params) {
      // console.log(params)
      this.areaLevel = params.areaLevel;
      return new Promise((resolve) => {
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
          resolve(true);
        });
      });
    },

    /* 获取列表数据 */
    async getListData() {
      const data = {
        batch: this.batch,
        ...this.location,
        year: this.year,
        status: this.status,
      };
      const res = await getRanking(data);
      if (!this.location.county) {
        // 打气泡数量点
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
        return;
      }
      //  打点
      this.listData = res.map((item) => {
        return {
          name: item.name,
          value: [Number(item.longitude), Number(item.latitude)],
        };
      });
      this.myChart.clear();
      this.myChart.setOption(getSpotOption2(this.listData, this.area), true); // 打点
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
    async changeArea() {
      // console.log('myChart', this.area);
      const params = {
        name: this.area,
      };
      const res = await this.echartsMapLoad(params);
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
  //margin-right: 32px;
  position: relative;
  box-sizing: border-box;
  background: url('./bg.png') left top no-repeat;
  background-size: 100% 100%;
  height: 355px;
  overflow: hidden;
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
    height: 390px;
    overflow: hidden;
    & > div {
      width: 100%;
    }
  }
}
</style>
