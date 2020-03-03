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
    let colorList = ["rgba(3, 187, 180", "rgba(4,126,216"];
    let _series = [];
    // console.log(_this.chartData.ydata[0]);
    for (let i = 0; i < _this.chartData.ydata.length; i++) {
      _series.push({
        name: _this.chartData.legend[i],
        data: _this.chartData.ydata[i],
        type: "line",
        smooth: false,
        color: colorList[i] + ")",
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: colorList[i] + ", 0.3)"
                },
                {
                  offset: 0.8,
                  color: colorList[i] + ", 0)"
                }
              ],
              false
            ),
            shadowColor: "rgba(0, 0, 0, 0.1)",
            shadowBlur: 10
          }
        }
      });
    }
    let option = {
      legend: {
        data: _this.chartData.legend,
        textStyle: {
          color: "#ccc"
        },
        x: "right",
        y: "5%",
        orient: "vertical"
      },
      color: ["#fff"],
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: _this.chartData.xdata,
        axisLabel: {
          textStyle: {
            color: "#4c81a9"
          }
        },
        axisLine: {
          lineStyle: {
            color: "#4c81a9" //轴颜色
          }
        }
      },
      grid: {
        top: "20%",
        left: "3%",
        right: "3%",
        bottom: "0",
        containLabel: true
      },
      yAxis: {
        type: "value",
        axisLine: {
          show: false,
          lineStyle: {
            color: "#4c81a9" //轴颜色
          }
        },
        axisTick: {
          lineStyle: {
            color: ["#143151"]
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: ["#143151"],
            width: 1,
            type: "solid"
          }
        }
      },
      series: _series
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