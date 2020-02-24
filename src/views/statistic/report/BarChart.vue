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
        dimensions: ["name", "上月", "本月"],
        source: [
          {
            name: "隐患",
            上月: 43.3,
            本月: 85.8
          },
          { name: "忽略隐患", 上月: 83.1, 本月: 73.4 },
          {
            name: "复位隐患",
            上月: 86.4,
            本月: 65.2
          },
          {
            name: "解决隐患",
            上月: 72.4,
            本月: 53.9
          }
        ]
      },
      xAxis: { type: "category" },
      yAxis: {},
      // Declare several bar series, each will be mapped
      // to a column of dataset.source by default.
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