export default function getOption(data,map) {


  function NumDescSort(a, b) {
    return b.value - a.value;
  }

// 先进行一次降序排序
  data.sort(NumDescSort);

  return {
    tooltip: {
      trigger: "item"
    },
    visualMap: { // 视觉映射组件
      show: true,
      type: 'continuous', // 连续型视觉映射组件
      min: 0, // 组件的允许的最小值
      max: data[0].value, // 组件的允许的最大值
      seriesIndex: [0, 2], // 指定取哪个系列的数据，即哪个系列的 series.data。
      realtime: false, // 拖拽时，是否实时更新。如果为ture则拖拽手柄过程中实时更新图表视图。如果为false则拖拽结束时，才更新视图。
      right: 44, // visualMap 组件离容器左侧的距离。
      itemWidth: 12, // 图形的宽度，即长条的宽度。
      itemHeight: 86, // 图形的高度，即长条的高度。
      calculable: true, // 是否显示拖拽用的手柄（手柄能拖拽调整选中范围）。
      inRange: {  // 定义 在选中范围中 的视觉元素。（用户可以和 visualMap 组件交互，用鼠标或触摸选择范围）
        color: ['#9BC4FF', '#3B6DE6'], // 图元的颜色。
        symbolSize: [100, 100] // 图元的大小。
      },
      textStyle: {
        color: '#ffffff'
      }
    },
    series: [
      {
        name: "分布数量",
        type: "map",
        mapType: map,
        // left: '100',
        // width: '60%',
        roam: false,
        mapValueCalculation: "sum", // 多个拥有相同地图类型的系列会使用同一个地图展现，如果多个系列都在同一个区域有值，ECharts 会对这些值统计得到一个数据。这个配置项就是用于配置统计的方式
        zoom: 1.2,
        selectedMode: false, // 选中模式，表示是否支持多个选中，默认关闭，支持布尔值和字符串，字符串取值可选'single'表示单选，或者'multiple'表示多选。
        showLegendSymbol: false, // 在图例相应区域显示图例的颜色标识（系列标识的小圆点），存在 legend 组件时生效。
        label: {
          normal: {
            textStyle: {
              color: '#ffffff'
            }
          },
          emphasis: {
            textStyle: {
              color: '#ffffff'
            }
          }
        },
        itemStyle: {
          normal: {
            areaColor: '#9BC4FF',
            borderColor: '#FFFFFF',
            label: {
              show: true,
              color: '#FFFFFF',
              fontSize: 20,
              fontFamily: 'Microsoft YaHei',
            },
          },
          emphasis: {
            areaColor: '#4979A4',
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
        data: data
      },
    ]
  }
}