<template>
  <div :id="id" class="echart"></div>
</template>

<script>
export default {
  data() {
    return {
      id:
        "erange" +
        Math.random()
          .toString(36)
          .substr(-8),
      myCharts: {}
    };
  },
  props: {
    chartData: {
      type: Object,
      deep: true
    }
  },
  methods: {
    resizeRangeChart() {
      this.myCharts.resize();
    },
    initRangeChart() {
      let _this = this;
      this.myCharts = echarts.init(document.getElementById(_this.id));
      console.log(_this.chartData.ydata);
      let _series = [];
      for (let i = 0, size = _this.chartData.ydata.length; i < size; i++) {
        _series.push({
          name: _this.chartData.legend[i],
          type: "line",
          smooth: false,
          symbol: "none",
          sampling: "average",
          data: _this.chartData.ydata[i]
        });
      }
      let option = {
        tooltip: {
          trigger: "axis",
          position: function(pt) {
            return [pt[0], "10%"];
          }
        },
        legend: {
          data: _this.chartData.legend
        },
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: "none"
            },
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: _this.chartData.xdata
        },
        yAxis: {
          type: "value",
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
            handleIcon:
              "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
            handleSize: "80%",
            handleStyle: {
              color: "#fff",
              shadowBlur: 3,
              shadowColor: "rgba(0, 0, 0, 0.6)",
              shadowOffsetX: 2,
              shadowOffsetY: 2
            }
          }
        ],
        series: _series
      };
      _this.myCharts.setOption(option);
      window.addEventListener("resize", _this.resizeRangeChart);
    }
  },
  mounted() {
    this.initRangeChart();
  },
  destroyed() {
    this.myCharts.clear();
  }
};
</script>


<style>
.echart {
  width: 100%;
  height: 400px;
}
</style>