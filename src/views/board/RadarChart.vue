<template>
  <div :id="id" class="chart"></div>
</template>

<script>
export default {
  data() {
    return {
      id:
        "line" +
        Math.random()
          .toString(36)
          .substr(-8),
      myCharts: {}
    };
  },
  props: {
    chartData: {}
  },
  methods: {
    resizeChart() {
      this.myCharts.resize();
    },
    initChart() {
      let _this = this;
      _this.myCharts = echarts.init(document.getElementById(`${_this.id}`));
      var indicator = _this.chartData.indicator;
      var dataArr = [
        {
          value: _this.chartData.value,
          itemStyle: {
            normal: {
              lineStyle: {
                color: "#4A99FF"
                // shadowColor: '#4A99FF',
                // shadowBlur: 10,
              },
              shadowColor: "#4A99FF",
              shadowBlur: 10
            }
          },
          areaStyle: {
            normal: {
              // 单项区域填充样式
              color: {
                type: "linear",
                x: 0, //右
                y: 0, //下
                x2: 1, //左
                y2: 1, //上
                colorStops: [
                  {
                    offset: 0,
                    color: "#4A99FF"
                  },
                  {
                    offset: 0.5,
                    color: "rgba(0,0,0,0)"
                  },
                  {
                    offset: 1,
                    color: "#4A99FF"
                  }
                ],
                globalCoord: false
              },
              opacity: 1 // 区域透明度
            }
          }
        }
      ];
      var colorArr = ["#4BFFFC", "#4A99FF"]; //颜色
      let option = {
        color: colorArr,
        radar: {
          center: ["50%", "50%"],
          name: {
            textStyle: {
              color: "#fff",
              fontSize: 16
            }
          },
          radius: 60,
          indicator: indicator,
          splitArea: {
            // 坐标轴在 grid 区域中的分隔区域，默认不显示。
            show: true,
            areaStyle: {
              // 分隔区域的样式设置。
              color: ["rgba(255,255,255,0)", "rgba(255,255,255,0)"] // 分隔区域颜色。分隔区域会按数组中颜色的顺序依次循环设置颜色。默认是一个深浅的间隔色。
            }
          },
          axisLine: {
            //指向外圈文本的分隔线样式
            lineStyle: {
              color: "#153269"
            }
          },
          splitLine: {
            lineStyle: {
              color: "#113865", // 分隔线颜色
              width: 1 // 分隔线线宽
            }
          }
        },
        series: [
          {
            type: "radar",
            symbolSize: 8,
            // symbol: 'angle',
            data: dataArr
          }
        ]
      };
      _this.myCharts.setOption(option);
      window.addEventListener("resize", _this.resizeChart);
    }
  },

  mounted() {
    this.initChart();
  },
  beforeDestroy() {
    this.myCharts.clear();
  }
};
</script>

<style>
.chart {
  height: calc(100% - 40px);
  margin-top: 40px;
}
</style>