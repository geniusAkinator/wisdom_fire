<template>
  <div :id="id" class="chart" style="height:100%"></div>
</template>
<script>
import utils from "@/utils/utils";
export default {
  data() {
    return {
      id:
        "piechart" +
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
    chartData: {}
  },
  methods: {
    resizeChart() {
      this.myCharts.resize();
    },
    initChart() {
      let _this = this;
      _this.myCharts = echarts.init(document.getElementById(`${_this.id}`));
      _this.option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        color: ["#2B80FF", "#48C3FB"],
        legend: {
          orient: "vertical",
          top: "center",
          right:"20",
          data: ["在线","离线"],
          backgroundColor: "rgba(22,82,93,0.8)",
          padding: 20,
          borderRadius: 5,
          icon: "circle",
          textStyle: {
            color: "#ffffff",
            fontSize:"14"
          },
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["30%", "50%"],
            data: _this.chartData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      _this.myCharts.setOption(_this.option);
      window.addEventListener("resize", _this.resizeChart);
      utils.loopChart(_this.myCharts, _this.option);
    }
  },
  mounted() {
    this.initChart();
  }
};
</script>

<style>
</style>