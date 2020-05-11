<template>
  <div :id="id" class="chart"></div>
</template>

<script>
export default {
  data() {
    return {
      id:
        "radar" +
        Math.random()
          .toString(36)
          .substr(-8),
      myCharts: {},
      option: {}
    };
  },
  watch: {
    chartData: {
      handler() {
        this.initChart();
      },
      deep: true
    }
  },
  props: {
    chartData: {
      type: Object,
      deep: true
    }
  },
  methods: {
    resizeChart() {
      this.myCharts.resize();
    },
    initChart() {
      let _this = this;
      _this.myCharts = echarts.init(document.getElementById(`${_this.id}`));
      this.option = {
        normal: {
          top: 200,
          left: 300,
          width: 500,
          height: 400,
          zIndex: 6,
          backgroundColor: ""
        },
        color: ["rgba(245, 166, 35, 1)", "rgba(19, 173, 255, 1)"],
        tooltip: {
          show: true,
          trigger: "item"
        },
        
        radar: {
          center: ["50%", "50%"],
          radius: "70%",
          startAngle: 90,
          splitNumber: 4,
          shape: "circle",
          splitArea: {
            areaStyle: {
              color: ["transparent"]
            }
          },
          axisLabel: {
            show: false,
            fontSize: 18,
            color: "#fff",
            fontStyle: "normal",
            fontWeight: "normal"
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "grey" //
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "grey" //
            }
          },
          indicator: [
            {
              name: "道路结冰",
              max: 88
            },
            {
              name: "暴雪",
              max: 88
            },
            {
              name: "暴雨",
              max: 88
            },
            {
              name: "冰雹",
              max: 88
            },
            {
              name: "大风",
              max: 88
            },
            {
              name: "大雾",
              max: 88
            },
            {
              name: "高温",
              max: 88
            },
            {
              name: "干旱",
              max: 88
            },
            {
              name: "寒潮",
              max: 88
            },
            {
              name: "雷电",
              max: 88
            },
            {
              name: "霾",
              max: 88
            },
            {
              name: "沙尘暴",
              max: 88
            },
            {
              name: "霜冻",
              max: 88
            }
          ]
        },
        series: [
          {
            name: "数据1",
            type: "radar",
            symbol: "circle",
            symbolSize: 10,
            areaStyle: {
              normal: {
                color: "rgba(245, 166, 35, 0.4)"
              }
            },
            itemStyle: {
              color: "rgba(245, 166, 35, 1)",
              borderColor: "rgba(245, 166, 35, 0.3)",
              borderWidth: 10
            },
            lineStyle: {
              normal: {
                color: "rgba(245, 166, 35, 1)",
                width: 2
              }
            },
            data: [[80, 50, 55, 80, 50, 80, 48, 43, 60, 78, 60, 40, 42, 44, 65]]
          }
        ]
      };
      _this.myCharts.setOption(_this.option);
      window.addEventListener("resize", _this.resizeChart);
      // utils.loopChart(_this.myCharts, _this.option);
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
  width: 100%;
  height: 100%;
}
</style>
