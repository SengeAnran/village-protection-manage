import bgImg from './bubble.png';
export default function getSpotOption(data, map) {
  const maxSize4Pin = 36;
  const minSize4Pin = 26;
  // const maxFontSize = 16;
  // const minFontSize = 11;
  let max, min;
  const sortData = data.map((i) => i.value[2]).sort((a, b) => a - b);
  max = sortData[sortData.length - 1];
  min = sortData[0];
  return {
    color: ['#1E913F', ''],
    tooltip: {
      trigger: 'item',
    },
    geo: {
      map: map, // 使用 registerMap 注册的地图名称。
      show: true, // 是否显示地理坐标系组件。
      roam: false, // 是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移，
      zoom: 1,
      itemStyle: {
        //控制镇名文字显示
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
        emphasis: {
          //高亮状态下的样式
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
      data: [],
    },
    series: [
      {
        name: '浙农游',
        type: 'map',
        mapType: map,
        roam: false,
        zoom: 1,
        itemStyle: {
          //控制镇名文字显示
          normal: {
            // areaColor: '#213E5F', //区域背景颜色
            areaColor: '#CEE9FF', //区域背景颜色
            borderColor: '#43A8FF', //描边颜色
            label: {
              show: true,
              color: 'black',
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
              fontSize: 12,
              fontFamily: 'Microsoft YaHei',
              shadowColor: 'rgba(0, 0, 0, 0.36)',
              shadowBlur: 4,
              shadowOffsetY: 4,
            },
          },
        },
        select: {
          itemStyle: {
            areaColor: '#213E5F', //区域背景颜色,
          },
          label: {
            color: '#FFFFFF',
          },
        },
        tooltip: {
          show: false,
          formatter: '{b}',
        },
      },
      {
        name: '未来乡村创建数',
        type: 'scatter', // 散点（气泡）图。直角坐标系上的散点图可以用来展现数据的 x，y 之间的关系，如果数据项有多个维度，其它维度的值可以通过不同大小的 symbol 展现成气泡图，也可以用颜色来表现。这些可以配合 visualMap 组件完成。
        // 可以应用在直角坐标系，极坐标系，地理坐标系上。
        coordinateSystem: 'geo', // 该系列使用的坐标系，可选： 'cartesian2d'：二维的直角坐标系 ； 'polar'：使用极坐标系； 'geo'：使用地理坐标系，通过 geoIndex 指定相应的地理坐标系组件。
        data: data, // 系列中的数据内容数组。数组项通常为具体的数据项。 // 维度X   维度Y   其他维度 ...
        // colorBy: 'series',
        symbol: `image://${bgImg}`,
        symbolSize: function (val) {
          if (max === min) {
            return maxSize4Pin;
          }
          const a = (maxSize4Pin - minSize4Pin) / (max - min);
          // let b = minSize4Pin - a * min;
          // b = maxSize4Pin - a * max;
          // return  val[2] ;
          return a * (val[2] - min) + minSize4Pin;
        },
        // symbolSize: 30,
        symbolKeepAspect: true, // 保持缩放比例
        symbolOffset: [0, -20], // 偏移设置
        label: {
          //标签：图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等。
          normal: {
            // formatter: '{a}', // 标签内容格式器，支持字符串模板和回调函数两种形式，字符串模板与回调函数返回的字符串均支持用 \n 换行。
            formatter: function (obj) {
              return obj.data.value[2];
            }, // 标签内容格式器，支持字符串模板和回调函数两种形式，字符串模板与回调函数返回的字符串均支持用 \n 换行。
            //字符串模板 模板变量有：
            // {a}：系列名。
            // {b}：数据名。
            // {c}：数据值。
            // {@xxx}：数据中名为 'xxx' 的维度的值，如 {@product} 表示名为 'product' 的维度的值。
            // {@[n]}：数据中维度 n 的值，如 {@[3]} 表示维度 3 的值，从 0 开始计数。 {b}: {@score}
            // position: 'center',
            show: true, // 是否常显
            textStyle: {
              // color: '#1492FF',
              color: '#fff',
              fontWeight: 500,
              fontSize: 14,
              // fontSize: function (val) {
              //   if (max === min) {
              //     return maxFontSize;
              //   }
              //   const a = (maxFontSize - minFontSize) / (max - min);
              //   // let b = minSize4Pin - a * min;
              //   // b = maxSize4Pin - a * max;
              //   // return  val[2] ;
              //   return a * (val[2] - min) + minFontSize;
              // },
            },
          },
          emphasis: {
            show: true,
          },
        },
        itemStyle: {
          normal: {
            // color: '#2D7EE7',
            color: '#2D7EE7',
            borderColor: 'rgba(45,126,231,0.2)',
            borderWidth: 8,
          },
        },
        tooltip: {
          formatter: function (obj) {
            return ` <div style="font-weight: bold">${obj.seriesName}</div><div style="margin-top: 3px">${obj.name} ${obj.value[2]} 个</div>`;
          },
        },
      },
    ],
  };
}
