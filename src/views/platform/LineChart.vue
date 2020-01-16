<template>
  <div :id="id" class="chart"></div>
</template>

<script>
export default {
  data() {
    return {
      id:
        "line" +
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
  mounted() {
    this.myCharts = echarts.init(document.getElementById(`${this.id}`));

    let option = {
      legend: {
        data: ["隐患总数", "已解决数"],
        textStyle: {
          color: "#ccc"
        },
        left: "right"
      },
      color: ["#fff"],
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        axisLabel: {
          textStyle: {
            color: "#fff"
          }
        }
      },
      grid: {
        top: "20%",
        left: "3%",
        right: "3%",
        bottom: "10%",
        containLabel: true
      },
      yAxis: {
        type: "value",
        axisLine: {
          lineStyle: {
            color: "#fff" //轴颜色
          }
        },
        splitLine: { show: false } //隐藏网格
      },
      series: [
        {
          name: "隐患总数",
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: "line",
          smooth: true,
          color: "rgba(3, 187, 180" + ")",
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: "rgba(3, 187, 180" + ", 0.8)"
                  },
                  {
                    offset: 0.8,
                    color: "rgba(3, 187, 180" + ", 0)"
                  }
                ],
                false
              ),
              shadowColor: "rgba(0, 0, 0, 0.1)",
              shadowBlur: 10
            }
          }
        },
        {
          name: "已解决数",
          data: [100, 100, 100, 100, 100, 100, 100],
          type: "line",
          smooth: true,
          color: "rgba(4,126,216" + ")",
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: "rgba(4,126,216" + ", 0.3)"
                  },
                  {
                    offset: 0.8,
                    color: "rgba(4,126,216" + ", 0)"
                  }
                ],
                false
              ),
              shadowColor: "rgba(0, 0, 0, 0.1)",
              shadowBlur: 10
            }
          }
        }
      ]
    };
    this.myCharts.setOption(option);
    window.addEventListener("resize", this.resizeChart);
  }
};
</script>

<style>
.chart {
  width: 100%;
  height: 100%;
}
</style>