export const mapOption = {
  basicOption:{
    tooltip: {
      trigger: "item"
    },
    geo: {
      // top:100,
      // map: '浙江省', // 使用 registerMap 注册的地图名称。
      show: true, // 是否显示地理坐标系组件。
      roam: false, // 是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移，
      zoom: 1.2,
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
        }
      },
    },
  },
  seriesOption:{
    type: 'map',
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
  }
}
