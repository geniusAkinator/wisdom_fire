<template>
  <div :id="id" class="chart" style="height: 100%;"></div>
</template>

<script>
export default {
  data() {
    return {
      id:
        "meter" +
        Math.random()
          .toString(36)
          .substr(-8),
      myCharts: {}
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
    chartData: 0
  },
  methods: {
    resizeChart() {
      this.myCharts.resize();
    },
    initChart() {
      let _this = this;
      _this.myCharts = echarts.init(document.getElementById(`${_this.id}`));
      let option = {
       
      };
      _this.myCharts.setOption(option);
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
</style>