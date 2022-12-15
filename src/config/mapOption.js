export const mapOption = {
  basicOption: {
    tooltip: {
      trigger: 'item',
    },
    geo: {
      // 地理坐标系组件用于地图的绘制，支持在地理坐标系上绘制散点图，线集。
      // top:100,
      // map: '浙江省', // 使用 registerMap 注册的地图名称。
      show: true, // 是否显示地理坐标系组件。
      roam: false, // 是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移，
      zoom: 1,
      itemStyle: {
        //控制镇名文字显示
        normal: {
          areaColor: '#CEE9FF', //区域背景颜色
          borderColor: '#43A8FF', //描边颜色
          label: {
            show: true,
            color: '#FFFFFF',
            fontSize: 12,
            fontFamily: 'Microsoft YaHei',
          },
          itemStyle: {
            color: '#4979A4',
          },
        },
        emphasis: {
          //高亮状态下的样式
          areaColor: '#4979A4', //区域背景颜色
          label: {
            show: true,
            color: '#FFFFFF',
            fontSize: 14,
            fontFamily: 'Microsoft YaHei',
            shadowColor: 'rgba(0, 0, 0, 0.36)',
            shadowBlur: 4,
            shadowOffsetY: 4,
          },
        },
      },
    },
  },
  seriesOption: {
    type: 'map',
    roam: false,
    zoom: 1,
    selectedMode: false,
    itemStyle: {
      //控制镇名文字显示
      normal: {
        areaColor: '#CEE9FF', //区域背景颜色
        borderColor: '#43A8FF', //描边颜色
        label: {
          show: true,
          color: '#FFFFFF',
          fontSize: 12,
          fontFamily: 'Microsoft YaHei',
        },
        itemStyle: {
          color: '#4979A4',
        },
      },
      emphasis: {
        //高亮状态下的样式
        areaColor: '#4979A4', //区域背景颜色
        label: {
          show: true,
          color: '#FFFFFF',
          fontSize: 14,
          fontFamily: 'Microsoft YaHei',
          shadowColor: 'rgba(0, 0, 0, 0.36)',
          shadowBlur: 4,
          shadowOffsetY: 4,
        },
      },
    },
  },
};
