export default function getOptions(data) {
  return {
    title: {
      text: '村庄分布',
      textStyle: {
        color: '#333333',
        fontSize:'18',
        fontFamily: 'PingFangSC-Medium, PingFang SC',
        fontWeight: '500'
      }
    },
    xAxis: {
      type: 'category',
      data: data.map((d) => d.name),
      axisLabel: {
        margin: 8,
        color: '#333333',
        fontSize: 14,
        fontFamily: 'PingFangSC-Regular, PingFang SC',
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#DDDDDD',
          opacity: 0.5,
          width: 2,
        },
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
      },
    },
    yAxis: [{
      type: 'value',
      name: '数量/户',
      nameTextStyle: {
        fontSize: 22,
        fontFamily: 'Source Han Sans CN',
        fontWeight: 500,
        color: '#FFF',
        opacity: 0.7,
        align: 'center',
        padding: [0, 0, 0, -10],
      },
      splitLine: {
        lineStyle: {
          color: '#97979733',
        },
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisLabel: {
        show: false,
        margin: 8,
        color: 'rgba(225,225,225,.7)',
        fontSize: 21,
        fontFamily: 'DINPro',
      },
    }],
    series: [
      {
        type: 'bar',
        name: '新增注册',
        data: data.map((d) => d.value),
        label: {
          show: true,
          position: 'top',
          fontSize: 18,
          fontFamily: 'PingFangSC-Regular, PingFang SC',
          color: '#666666',
        },
        barWidth: 32,
        itemStyle: {
          borderRadius: 4,
          color: {
            type: 'linear',
            x: 0,
              y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(20, 146, 255, 1)',
              },
              {
                offset: 1,
                color: 'rgba(20, 146, 255, 0)',
              },
            ],
          },
        },
      }
    ],
  }
}
