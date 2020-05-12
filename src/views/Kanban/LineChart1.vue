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
      let colorList = ["rgba(4,205,244", "rgba(25,95,226"];
      let _series = [];
      for (let i = 0; i < _this.chartData.ydata.length; i++) {
        _series.push({
          name: _this.chartData.legend[i],
          data: _this.chartData.ydata[i],
          type: "line",
          smooth: false,
          symbol: "circle",
          symbolSize: 8,
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
                    color: colorList[i] + ", 1)"
                  },
                  {
                    offset: 1,
                    color: colorList[i] + ", 0)"
                  }
                ],
                false
              ),
              shadowColor: "rgba(0, 0, 0, 0.6)",
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
          y1: "0"
        },
        color: ["#fff"],
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: _this.chartData.xdata,
          axisLabel: {
            textStyle: {
              color: "#48c3fc"
            }
          },
          axisLine: {
            show: false
          },
          axisTick: {
            //x轴刻度线
            show: false
          }
        },
        grid: {
          top: "40",
          left: "20",
          right: "20",
          bottom: "0",
          containLabel: true
        },
        yAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#fff" //轴颜色
            },
            show: false
          },
          axisTick: {
            //y轴刻度线
            show: false
          },
          splitLine: { show: false } //隐藏网格
        },
        series: _series
      };
      _this.myCharts.setOption(_this.option);
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
  width: 100%;
  height: 100%;
}
</style>