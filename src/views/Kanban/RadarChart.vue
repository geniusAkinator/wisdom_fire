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
          indicator: _this.chartData.indicator,
          name: {
            textStyle: { color: "#fff" }
          }
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
            data: _this.chartData.value
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
