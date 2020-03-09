<template>
  <div :id="id" class="echart"></div>
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
  props: {
    data: {
       type: Array,
       required: true
    }
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
        color: ["#3573fc", "#234bf2"],
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data:_this.data,
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
.echart {
  width: 100%;
  height: 100%;
}
</style>