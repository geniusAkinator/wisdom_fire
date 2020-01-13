<template>
  <div :id="id" style="width:100%;height:100%"></div>
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
          data: _this.chartData.ydata[i],
          type: "line",
          smooth: false
        });
      }
      let option = {
        title: {
          text: "",
          show: true,
          x: "10px",
          y: "10px",
          textStyle: {
            fontFamily: "Arial, Verdana, sans...",
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: "normal",
            color: "#8b969c"
          }
        },
        grid: {
          x: 0,
          y: 60,
          x2: 0,
          y2: 2
        },
        xAxis: {
          type: "category",
          show: false
        },
        yAxis: {
          show: false
        },
        series: _series
      };
      _this.myCharts.setOption(_this.option);
      window.addEventListener("resize", _this.resizeLineChart);
    }
  },
  mounted() {},
  beforeDestroy() {
    this.myCharts.clear();
  }
};
</script>
<style>
</style>