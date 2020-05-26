<template>
  <div :id="id" class="echart"></div>
</template>
<script>
export default {
  data() {
    return {
      id:
        "eline" +
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
    resizeLineChart() {
      this.myCharts.resize();
    },
    initLineChart() {
      let _this = this;
      _this.myCharts = echarts.init(document.getElementById(_this.id));
      let _series = [];
      for (let i = 0, size = _this.chartData.ydata.length; i < size; i++) {
        _series.push({
          name: _this.chartData.legend[i],
          data: _this.chartData.ydata[i],
          type: "line",
          smooth: false
        });
      }
      let option = {
        legend: {
          data: _this.chartData.legend
        },
        xAxis: {
          type: "category",
          data: _this.chartData.xdata
        },
        yAxis: {
          type: "value"
        },
        series: _series
      };
      _this.myCharts.setOption(option);
      window.addEventListener("resize", _this.resizeLineChart);
    }
  },
  mounted() {
    this.initLineChart();
  },
  beforeDestroy() {
    this.myCharts.clear();
  }
};
</script>
<style>
.echart {
  width: 100%;
}
</style>