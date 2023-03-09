export default {
  // geo: {
  //   map: '浙江省', // 使用 registerMap 注册的地图名称。
  //   show: true, // 是否显示地理坐标系组件。
  //   roam: false, // 是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移，
  //   label: { // 图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等。
  //     emphasis: { // 高亮状态下的多边形和标签样式。
  //       show: false
  //     }
  //   },
  //   itemStyle: { // 地图区域的多边形 图形样式。
  //     normal: {
  //       areaColor: 'rgba(121, 192, 246, 0)', // 地图区域的颜色。
  //       borderColor: '#79C0F6', // 图形的描边颜色。支持的颜色格式同 color，不支持回调函数。
  //       // shadowColor: '#1773c3', // 阴影颜色。支持的格式同color。
  //       // shadowBlur: 20 // 图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果。
  //     }
  //   }
  // },
  series: [
    {
      name: '浙农游',
      type: 'map',
      mapType: '浙江省',
      roam: false,
      zoom: 1.2,
      selectedMode: false,
      itemStyle: { //控制镇名文字显示
        normal: {
          areaColor: '#213E5F', //区域背景颜色
          borderColor: '#79C0F6', //描边颜色
          label: {
            show: true,
            color: '#FFFFFF',
            fontSize: 20,
            fontFamily: 'Microsoft YaHei',
          },
          itemStyle: {
            color: '#4979A4',
          },
        },
        emphasis: { //高亮状态下的样式
          areaColor: '#4979A4', //区域背景颜色
          label: {
            show: true,
            color: '#FFFFFF',
            fontSize: 20,
            fontFamily: 'Microsoft YaHei',
            shadowColor: 'rgba(0, 0, 0, 0.36)',
            shadowBlur: 4,
            shadowOffsetY: 4,
          },
        },
      },
      data: []
    }
  ]
};
