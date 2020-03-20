<template>
  <div :id="id" class="chart"></div>
</template>

<script>
export default {
  data() {
    return {
      id:
        "pieChart" +
        Math.random()
          .toString(36)
          .substr(-8),
      myCharts: {}
    };
  },
  methods: {
    resizeChart() {
      this.myCharts.resize();
    }
  },
  props: {
    chartData: {
      type: Object,
      deep: true
    }
  },
  mounted() {
    let _this = this;
    _this.myCharts = echarts.init(document.getElementById(`${_this.id}`));
    let option = {
      tooltip: {
        formatter: "{a} <br/>{b} : {c}%"
      },
      series: [
        {
          name: "",
          type: "gauge",
          center: ["50%", "25%"], // 默认全局居中
          radius: "40%",
          axisLine: {
            show: false,
            lineStyle: {
              // 属性lineStyle控制线条样式
              color: [
                [0.8, "#0193cf"],
                [1, "rgba(1, 147, 207, 0.3)"]
              ],
              width: 10
            }
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          pointer: {
            show: false,
            length: "0",
            width: "0"
          },
          detail: {
            formatter: "{value}%",
            offsetCenter: [0, "5%"]
          },
          data: [
            {
              value: 80,
              label: {
                textStyle: {
                  fontSize: 12
                }
              }
            }
          ]
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
.chart {
  height: calc(100% - 40px);
  margin-top: 40px;
}
</style>