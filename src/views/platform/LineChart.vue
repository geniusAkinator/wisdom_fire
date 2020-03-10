<template>
  <div :id="id" class="chart"></div>
</template>

<script>
import utils from "@/utils/utils";
export default {
  data() {
    return {
      id:
        "line" +
        Math.random()
          .toString(36)
          .substr(-8),
      myCharts: {},
      option: {}
    };
  },
  methods: {
    resizeChart() {
      this.myCharts.resize();
    },
    initChart() {
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
          smooth: true,
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
      _this.option = {
        tooltip: {
          trigger: "axis",
          position: function(pt) {
            return [pt[0], "10%"];
          },
          confine: true
        },
        legend: {
          data: _this.chartData.legend,
          textStyle: {
            color: "#ccc"
          },
          x: "70%",
          y: "15"
        },
        color: ["#fff"],
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: _this.chartData.xdata,
          axisLabel: {
            textStyle: {
              color: "#fff"
            }
          },
          axisLine: {
            lineStyle: {
              color: "#fff" //轴颜色
            }
          }
        },
        grid: {
          top: "50",
          left: "20",
          right: "20",
          bottom: "15",
          containLabel: true
        },
        yAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#fff" //轴颜色
            }
          },
          splitLine: { show: false } //隐藏网格
        },
        series: _series
      };
      _this.myCharts.setOption(_this.option);
      window.addEventListener("resize", _this.resizeChart);
      utils.loopChart(_this.myCharts, _this.option);
    }
  },
  props: {
    chartData: {
      type: Object,
      deep: true
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