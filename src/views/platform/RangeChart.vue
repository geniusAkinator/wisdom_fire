<template>
  <div :id="id" class="echart"></div>
</template>

<script>
import utils from "@/utils/utils";
export default {
  data() {
    return {
      id:
        "erange" +
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
      this.myCharts = echarts.init(document.getElementById(_this.id));
      let _series = [];
      let colorList = ["rgba(3, 187, 180", "rgba(4,126,216"];
      for (let i = 0, size = _this.chartData.ydata.length; i < size; i++) {
        _series.push({
          name: _this.chartData.legend[i],
          type: "line",
          symbol: "none",
          sampling: "average",
          data: _this.chartData.ydata[i],
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
        grid: {
          top: "60",
          left: "20",
          right: "20",
          bottom: "18%",
          containLabel: true
        },
        legend: {
          data: _this.chartData.legend,
          x: "70%",
          y: "15",
          textStyle: {
            color: "#ccc"
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          axisLabel: {
            textStyle: {
              color: "#fff"
            }
          },
          axisLine: {
            lineStyle: {
              color: "#fff" //轴颜色
            }
          },
          data: _this.chartData.xdata
        },
        yAxis: {
          type: "value",
          axisLabel: {
            textStyle: {
              color: "#fff"
            }
          },
          axisLine: {
            lineStyle: {
              color: "#fff" //轴颜色
            }
          },
          boundaryGap: [0, "100%"]
        },
        dataZoom: [
          {
            type: "inside",
            start: 0,
            end: 100
          },
          {
            start: 0,
            end: 10,
            bottom: 15,
            handleIcon:
              "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
            handleSize: "80%",
            handleStyle: {
              color: "#fff",
              shadowBlur: 3,
              shadowColor: "rgba(0, 0, 0, 0.6)",
              shadowOffsetX: 2,
              shadowOffsetY: 2
            },
            dataBackground: {},
            textStyle: {
              color: "#fff"
            }
          }
        ],
        series: _series
      };
      _this.myCharts.setOption(_this.option);
      window.addEventListener("resize", _this.resizeChart);
      utils.loopChart(_this.myCharts, _this.option);
    }
  },
  mounted() {
    this.initChart();
  },
  destroyed() {
    this.myCharts.clear();
  }
};
</script>
<style>
.echart {
  width: 100%;
  height: 100%;
}
</style>