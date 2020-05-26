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
    chartData: {
      type: Object,
      deep: true
    }
  },
  methods: {
    resizeChart() {
      this.myCharts.resize();
    },
    initChart() {
      let _this = this;
      _this.myCharts = echarts.init(document.getElementById(`${_this.id}`));
      var color = ["rgba(255,8,13", "rgba(250,100,5", "rgba(66,202,130", "rgba(66,202,130"];
      let line1 = [];
      let line2 = [];
      for (var i = 0; i < this.chartData.xdata.length; i++) {
        var x = i;
        if (x > color.length - 1) {
          x = color.length - 1;
        }
        var data1 = {
          name: this.chartData.xdata[i],
          color: color[x] + ")",
          value: this.chartData.ydata[0][i],
          itemStyle: {
            normal: {
              show: true,
              color: color[x]
            },
            emphasis: {
              shadowBlur: 15,
              shadowColor: "rgba(0, 0, 0, 0.1)"
            }
          }
        };
        var data2 = {
          name: this.chartData.xdata[i],
          color: "#737572",
          value: this.chartData.ydata[1][i],
          itemStyle: {
            normal: {
              show: true,
              color: "#737572"
            },
            emphasis: {
              shadowBlur: 15,
              shadowColor: "rgba(0, 0, 0, 0.1)"
            }
          }
        };
        line1.push(data1);
        line2.push(data2);
      }
      this.option = {
        title: {
          show: false
        },
        tooltip: {
          trigger: "item"
        },
        grid: {
          borderWidth: 0,
          top: "15",
          left: "5%",
          right: "10%",
          bottom: "7%"
        },
        color: color,
        yAxis: [
          {
            type: "category",
            inverse: true,
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              show: false,
              inside: false
            },
            data: _this.chartData.xdata
          }
        ],
        xAxis: {
          type: "value",
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            show: false
          }
        },
        series: [
          {
            name: "",
            type: "bar",
            zlevel: 2,
            data: line1,
            barWidth: 4, //柱图宽度
            animationDuration: 1500,
            label: {
              normal: {
                color: "#fff",
                show: true,
                position: [0, "-25px"],
                textStyle: {
                  fontSize: 20
                },
                formatter: function(a, b) {
                  return a.name;
                }
              }
            }
          },
          {
            name: "",
            type: "bar",
            zlevel: 1,
            data: line2,
            barWidth: 4, //柱图宽度
            animationDuration: 1500,
            barGap: "-100%",
            label: {
              normal: {
                color: "#51ecee",
                show: false,
                position: 'right',
                textStyle: {
                  fontSize: 18
                },
                // formatter: function(a, b) {
                //   return a.value + "件";
                // }
              }
            }
          }
        ],
        animationEasing: "cubicOut"
      };
      _this.myCharts.setOption(_this.option);
      window.addEventListener("resize", _this.resizeChart);
      // utils.loopChart(_this.myCharts, _this.option);
    }
  },
  mounted(){
      this.initChart();
  },
  beforeDestroy() {
    this.myCharts.clear();
  }
};
</script>

<style>
.chart {
  width: 100%;
  height: 100%;
}
</style>
