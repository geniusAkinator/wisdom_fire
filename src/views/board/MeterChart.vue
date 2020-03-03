<template>
  <div :id="id" class="chart"></div>
</template>

<script>
export default {
  data() {
    return {
      id:
        "meter" +
        Math.random()
          .toString(36)
          .substr(-8),
      myCharts: {}
    };
  },
  methods: {
    resizeChart() {
      this.myCharts.resize();
    }
  },
  props: {
    chartData: {
      type: Object,
      deep: true
    }
  },
  mounted() {
    let _this = this;
    _this.myCharts = echarts.init(document.getElementById(`${_this.id}`));
    let option = {
      series: [
        {
          name: "刻度",
          type: "gauge",
          radius: "58%",
          center: ["50%", "60%"],
          min: 0,
          max: 1000,
          splitNumber: 5, //刻度数量
          startAngle: 210,
          endAngle: -30,
          axisLine: {
            show: true,
            lineStyle: {
              width: 1,
              color: [[1, "rgba(0,0,0,0)"]]
            }
          }, //仪表盘轴线
          axisTick: {
            show: true,
            splitNumber: 10,
            lineStyle: {
              color: "#09C2FF",
              width: 2
            },
            length: -10
          }, //刻度样式
          splitLine: {
            show: true,
            length: -10,
            lineStyle: {
              color: "#09C2FF"
            }
          }, //分隔线样式
          detail: {
            show: false
          },
          pointer: {
            show: false
          }
        },
        {
          type: "gauge",
          radius: "90%",
          center: ["50%", "60%"],
          splitNumber: 0, //刻度数量
          startAngle: 210,
          endAngle: -30,
          axisLine: {
            show: true,
            lineStyle: {
              width: 15,
              color: [[1, "#0f407b"]]
            }
          },
          //分隔线样式。
          splitLine: {
            show: false
          },
          axisLabel: {
            show: false
          },
          axisTick: {
            show: false
          },
          pointer: {
            show: false
          },
          title: {
            show: false,
            offsetCenter: [0, "-26%"], // x, y，单位px
            textStyle: {
              color: "#fff",
              fontSize: 20
            }
          },
          //仪表盘详情，用于显示数据。
          detail: {
            show: false,
            offsetCenter: [0, "16%"],
            color: "#ffffff",
            formatter: function(params) {
              return params;
            },
            textStyle: {
              fontSize: 44
            }
          },
          data: [
            {
              value: 100
            }
          ]
        },
        {
          type: "gauge",
          radius: "90%",
          center: ["50%", "60%"],
          splitNumber: 0, //刻度数量
          startAngle: 210,
          endAngle: -30,
          axisLine: {
            show: true,
            lineStyle: {
              width: 15,
              color: [
                [
                  0.5,
                  new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    {
                      offset: 0,
                      color: "#40A4F5"
                    },
                    {
                      offset: 1,
                      color: "#60D3FD"
                    }
                  ])
                ],
                [1, "rgba(65,62,84,0)"]
              ]
            }
          },
          //分隔线样式。
          splitLine: {
            show: false
          },
          axisLabel: {
            show: false
          },
          axisTick: {
            show: false
          },
          pointer: {
            // show: false,
            length: "75%",
            width: 8
          },
          markPoint: {
            symbol: "circle",
            symbolSize: 5,
            data: [
              { x: "50%", y: "60%", itemStyle: { color: "#09194A" } }
            ]
          },
          //仪表盘详情，用于显示数据。
          detail: {
            show: true,
            offsetCenter: [0, 40],
            color: "#2AD1D9",
            formatter: function(params) {
              return params;
            },
            textStyle: {
              fontSize: 34,
              fontWeight:'bold'
            }
          },
          data: [{ name: "", value: 40 }]
        }
      ]
    };
    _this.myCharts.setOption(option);
    window.addEventListener("resize", _this.resizeChart);
  },
  beforeDestroy() {
    this.myCharts.clear();
  }
};
</script>

<style>
.chart {
  width: 100%;
  height: 100%;
}
</style>