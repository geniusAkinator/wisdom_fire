<template>
  <div :id="id" style="width:100%;height:100%"></div>
</template>

<script>
export default {
  data() {
    return {
      id:
        "egauge" +
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
    }
  },
  props: {
    data: {
      type: Array,
      deep: true
    }
  },
  mounted() {
    let _this = this;
    _this.myCharts = echarts.init(document.getElementById(`${_this.id}`));
    let option = {
      calculable: true,
      color: ["#4287F5", "#57DB8F", "#F4F2C6", "#DFB141", "#FDFEFF"],
      series: [
        {
          name: "",
          type: "pie",
          radius: [30, 80],
          center: ["50%", "50%"],
          roseType: "area",
          data: _this.data
        }
      ]
    };
    _this.myCharts.setOption(option);
    window.addEventListener("resize", _this.resizeChart);
  },
  beforeDestroy() {
    this.myCharts.clear();
  }
};
</script>
<style>
</style>