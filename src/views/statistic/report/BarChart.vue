<template>
  <div :id="id" class="echart"></div>
</template>
<script>
export default {
  data() {
    return {
      id:
        "barchart" +
        Math.random()
          .toString(36)
          .substr(-8),
      myCharts: {}
    };
  },
  props: {
    color: {},
    data: {}
  },
  methods: {
    resizeChart() {
      this.myCharts.resize();
    }
  },
  mounted() {
    let _this = this;
    this.myCharts = echarts.init(document.getElementById(`${this.id}`));
    let option = {
      legend: {},
      tooltip: {},
      title: {
        left: "left",
        text: "隐患统计"
      },
      dataset: {
        dimensions: _this.data.dimensions,
        source: _this.data.source
      },
      xAxis: { type: "category" },
      yAxis: {},
      series: [{ type: "bar" }, { type: "bar" }]
    };
    this.myCharts.setOption(option);
    window.addEventListener("resize", this.resizeChart);
  }
};
</script>

<style>
.echart {
  width: 100%;
  height: 100%;
}
</style>