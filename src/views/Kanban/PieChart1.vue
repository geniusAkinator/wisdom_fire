<template>
  <div class="flex justify-between padding-xs">
    <div class="rate-item flex flex-direction justify-center align-center">
      <div class="rate-title">{{chartData.label}}</div>
      <div class="rate-data">
        <span class="rate-num">{{chartData.value}}</span>%&nbsp;&nbsp;&nbsp;&nbsp;+0%
      </div>
    </div>
    <div :id="id" class="chart" style="width:125px;height:125px;margin:auto"></div>
  </div>
</template>

<script>
// import utils from "@/utils/utils";
export default {
  data() {
    return {
      id:
        "pie" +
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
    },
    color: {
      type: String,
      default: "#2A81FC"
    }
  },
  methods: {
    resizeChart() {
      this.myCharts.resize();
    },
    initChart() {
      let _this = this;
      _this.myCharts = echarts.init(document.getElementById(`${_this.id}`));
      var value = Math.floor(Math.random() * 100);
      var value = (_this.chartData.value * 360) / 100;
      var values = 360 - value;
      _this.option = {
        title: {
          text: "{a|" + Math.floor((value / 360) * 100) + "%" + "}",
          x: "center",
          y: "center",
          textStyle: {
            rich: {
              a: {
                fontSize: 20,
                color: "#fff",
                fontWeight: "bold"
              }
            }
          }
        },
        series: [
          {
            name: "",
            type: "pie",
            radius: ["68%", "80%"],
            center: ["50%", "50%"],
            silent: false,
            clockwise: true,
            startAngle: 90,
            z: 0,
            zlevel: 0,
            label: {
              normal: {
                position: "center"
              }
            },
            data: [
              {
                value: value,
                name: "",
                label: {
                  normal: {
                    show: false
                  }
                },
                itemStyle: {
                  normal: {
                    color: _this.color
                  }
                }
              },
              {
                value: values,
                name: "",
                label: {
                  normal: {
                    show: false
                  }
                },
                itemStyle: {
                  normal: {
                    color: "#050c1c"
                  }
                }
              }
            ]
          },
          {
            type: "pie",
            name: "内层细圆环",
            radius: ["80%", "82%"],
            hoverAnimation: false,
            clockWise: false,
            itemStyle: {
              normal: {
                color: _this.color
              }
            },
            label: {
              show: false
            },
            data: [90]
          }
        ]
      };
      _this.myCharts.setOption(_this.option);
      window.addEventListener("resize", _this.resizeChart);
      // utils.loopChart(_this.myCharts, _this.option);
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
/* .chart {
  width: 100%;
  height: 100%;
} */
.pie_title {
  display: block;
  width: 100%;
  text-align: center;
  font-weight: 500;
}
</style>
