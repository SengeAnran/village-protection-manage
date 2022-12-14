export default function getSpotOption (data,map) {
  return {
    color: ['#1E913F',''],
    tooltip: {
      trigger: "item"
    },
    geo: {
      map: map, // 使用 registerMap 注册的地图名称。
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
      data: []
    },
    series: [
      {
        name: '浙农游',
        type: 'map',
        mapType: map,
        roam: false,
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
        select: {
          itemStyle: {
            areaColor: '#213E5F', //区域背景颜色,
          },
          label: {
            color: '#FFFFFF',
          }
        },
        tooltip: {
          formatter: '{b}'
        }
      },
      {
        name: '24节气村',
        type: 'scatter', // 散点（气泡）图。直角坐标系上的散点图可以用来展现数据的 x，y 之间的关系，如果数据项有多个维度，其它维度的值可以通过不同大小的 symbol 展现成气泡图，也可以用颜色来表现。这些可以配合 visualMap 组件完成。
        // 可以应用在直角坐标系，极坐标系，地理坐标系上。
        coordinateSystem: 'geo', // 该系列使用的坐标系，可选： 'cartesian2d'：二维的直角坐标系 ； 'polar'：使用极坐标系； 'geo'：使用地理坐标系，通过 geoIndex 指定相应的地理坐标系组件。
        data: data.data1, // 系列中的数据内容数组。数组项通常为具体的数据项。 // 维度X   维度Y   其他维度 ...
        colorBy: 'series',
        symbol: 'circle',
        symbolSize: 10,
        symbolKeepAspect: true, // 保持缩放比例
        label: { //标签：图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等。
          normal: {
            formatter: '{a}', // 标签内容格式器，支持字符串模板和回调函数两种形式，字符串模板与回调函数返回的字符串均支持用 \n 换行。
            //字符串模板 模板变量有：
            // {a}：系列名。
            // {b}：数据名。
            // {c}：数据值。
            // {@xxx}：数据中名为 'xxx' 的维度的值，如 {@product} 表示名为 'product' 的维度的值。
            // {@[n]}：数据中维度 n 的值，如 {@[3]} 表示维度 3 的值，从 0 开始计数。 {b}: {@score}
            position: 'right',
            show: false // 是否常显
          },
          emphasis: {
            show: false
          }
        },
        itemStyle: {
          normal: {
            color: '#2D7EE7',
            borderColor: 'rgba(45,126,231,0.2)',
            borderWidth: 8,
          }
        },
        tooltip: {
          formatter: `<div style="font-weight: bold">{a}</div><div style="margin-top: 3px">{b}</div>`
        }
      },
      {
        name: '农业文化遗产地',
        type: 'scatter', // 散点（气泡）图。直角坐标系上的散点图可以用来展现数据的 x，y 之间的关系，如果数据项有多个维度，其它维度的值可以通过不同大小的 symbol 展现成气泡图，也可以用颜色来表现。这些可以配合 visualMap 组件完成。
        // 可以应用在直角坐标系，极坐标系，地理坐标系上。
        coordinateSystem: 'geo', // 该系列使用的坐标系，可选： 'cartesian2d'：二维的直角坐标系 ； 'polar'：使用极坐标系； 'geo'：使用地理坐标系，通过 geoIndex 指定相应的地理坐标系组件。
        data: data.data2, // 系列中的数据内容数组。数组项通常为具体的数据项。 // 维度X   维度Y   其他维度 ...
        colorBy: 'series',
        symbol: 'circle',
        symbolSize: 10,
        symbolKeepAspect: true, // 保持缩放比例
        label: { //标签：图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等。
          normal: {
            formatter: '{a}', // 标签内容格式器，支持字符串模板和回调函数两种形式，字符串模板与回调函数返回的字符串均支持用 \n 换行。
            //字符串模板 模板变量有：
            // {a}：系列名。
            // {b}：数据名。
            // {c}：数据值。
            // {@xxx}：数据中名为 'xxx' 的维度的值，如 {@product} 表示名为 'product' 的维度的值。
            // {@[n]}：数据中维度 n 的值，如 {@[3]} 表示维度 3 的值，从 0 开始计数。 {b}: {@score}
            position: 'right',
            show: false // 是否常显
          },
          emphasis: {
            show: false
          }
        },
        itemStyle: {
          normal: {
            color: '#1E913F',
            borderColor: 'rgba(30,145,63,0.2)',
            borderWidth: 8,
          }
        },
        tooltip: {
          formatter: `<div style="font-weight: bold">{a}</div><div style="margin-top: 3px">{b}</div>`
        }
      },
      {
        name: '历史文化重点保护村',
        type: 'scatter', // 散点（气泡）图。直角坐标系上的散点图可以用来展现数据的 x，y 之间的关系，如果数据项有多个维度，其它维度的值可以通过不同大小的 symbol 展现成气泡图，也可以用颜色来表现。这些可以配合 visualMap 组件完成。
        // 可以应用在直角坐标系，极坐标系，地理坐标系上。
        coordinateSystem: 'geo', // 该系列使用的坐标系，可选： 'cartesian2d'：二维的直角坐标系 ； 'polar'：使用极坐标系； 'geo'：使用地理坐标系，通过 geoIndex 指定相应的地理坐标系组件。
        data: data.data3, // 系列中的数据内容数组。数组项通常为具体的数据项。 // 维度X   维度Y   其他维度 ...
        colorBy: 'series',
        symbol: 'circle',
        symbolSize: 10,
        symbolKeepAspect: true, // 保持缩放比例
        label: { //标签：图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等。
          normal: {
            formatter: '{a}', // 标签内容格式器，支持字符串模板和回调函数两种形式，字符串模板与回调函数返回的字符串均支持用 \n 换行。
            //字符串模板 模板变量有：
            // {a}：系列名。
            // {b}：数据名。
            // {c}：数据值。
            // {@xxx}：数据中名为 'xxx' 的维度的值，如 {@product} 表示名为 'product' 的维度的值。
            // {@[n]}：数据中维度 n 的值，如 {@[3]} 表示维度 3 的值，从 0 开始计数。 {b}: {@score}
            position: 'right',
            show: false // 是否常显
          },
          emphasis: {
            show: false
          }
        },
        itemStyle: {
          normal: {
            color: '#F6B980',
            borderColor: 'rgba(246,185,128,0.2)',
            borderWidth: 8,
          }
        },
        tooltip: {
          formatter: `<div style="font-weight: bold">{a}</div><div style="margin-top: 3px">{b}</div>`
        }
      },
      {
        name: '历史文化重点保护村',
        type: 'scatter', // 散点（气泡）图。直角坐标系上的散点图可以用来展现数据的 x，y 之间的关系，如果数据项有多个维度，其它维度的值可以通过不同大小的 symbol 展现成气泡图，也可以用颜色来表现。这些可以配合 visualMap 组件完成。
        // 可以应用在直角坐标系，极坐标系，地理坐标系上。
        coordinateSystem: 'geo', // 该系列使用的坐标系，可选： 'cartesian2d'：二维的直角坐标系 ； 'polar'：使用极坐标系； 'geo'：使用地理坐标系，通过 geoIndex 指定相应的地理坐标系组件。
        data: data.data4, // 系列中的数据内容数组。数组项通常为具体的数据项。 // 维度X   维度Y   其他维度 ...
        colorBy: 'series',
        symbol: 'circle',
        symbolSize: 10,
        symbolKeepAspect: true, // 保持缩放比例
        label: { //标签：图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等。
          normal: {
            formatter: '{a}', // 标签内容格式器，支持字符串模板和回调函数两种形式，字符串模板与回调函数返回的字符串均支持用 \n 换行。
            //字符串模板 模板变量有：
            // {a}：系列名。
            // {b}：数据名。
            // {c}：数据值。
            // {@xxx}：数据中名为 'xxx' 的维度的值，如 {@product} 表示名为 'product' 的维度的值。
            // {@[n]}：数据中维度 n 的值，如 {@[3]} 表示维度 3 的值，从 0 开始计数。 {b}: {@score}
            position: 'right',
            show: false // 是否常显
          },
          emphasis: {
            show: false
          }
        },
        itemStyle: {
          normal: {
            color: '#00DCA6',
            borderColor: 'rgba(0,220,166,0.2)',
            borderWidth: 8,
          }
        },
        tooltip: {
          formatter: `<div style="font-weight: bold">{a}</div><div style="margin-top: 3px">{b}</div>`
        }
      },
    ]
  }
}