<template>
  <div style="width: 100%;height: 100%;position:relative">
    <div :id="id" class="chart"></div>
    <span class="gauge_label">{{data.label}}</span>
  </div>
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
      myCharts: {}
    };
  },
  props: {
    color: {},
    data: {
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
      this.myCharts = echarts.init(document.getElementById(`${this.id}`));
      let scolor = this.color.scolor;
      let bcolor = this.color.bcolor;
      let lcolor = this.color.lcolor;
      let center = ["50%", "40%"];
      var dataArr = [
        {
          value: this.data.value,
          name: this.data.label
        }
      ];
      var color = new echarts.graphic.LinearGradient(0, 0, 1, 0, [
        {
          offset: 0.05,
          color: scolor // 0% 处的颜色
        }
      ]);
      var colorSet = [
        [this.data.value / 100, color],
        [1, bcolor]
      ];
      var rich = {
        white: {
          fontSize: 35,
          color: "#fff",
          fontWeight: "500",
          padding: [55, 0, 0, 0]
        },
        bule: {
          fontSize: 35,
          color: "#fff",
          fontWeight: "500",
          padding: [55, 0, 0, 0]
        },
        size: {
          height: 0,
          padding: [0, 0, 0, 0]
        }
      };
      let option = {
        backgroundColor: "rgba(0,0,0,0)",
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%"
        },
        series: [
          {
            type: "gauge",
            center: center,
            name: "内层辅助",
            radius: "48%",
            startAngle: 359.9999,
            endAngle: 0,
            splitNumber: "100",
            pointer: {
              show: false
            },
            detail: {
              show: false
            },
            data: [
              {
                value: 1
              }
            ],
            axisLine: {
              show: true,
              lineStyle: {
                color: [[1, lcolor]], //最内层线的颜色
                width: 2,
                opacity: 1
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              show: false
            }
          },
          {
            type: "gauge",
            center: center,
            radius: "70%",
            startAngle: "90",
            endAngle: "-269.9999",
            pointer: {
              show: false
            },
            detail: {
              formatter: function(value) {
                var num = Math.round(value);
                return "{bule|" + num + "}{white|%}";
              },
              rich: rich
            },
            data: dataArr,
            title: {
              show: false
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: colorSet,
                width: 20,
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                opacity: 1
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              show: false
            }
          }
        ]
      };
      this.myCharts.setOption(option);
      window.addEventListener("resize", this.resizeChart);
    }
  },
  mounted() {
    let _this = this;
    _this.initChart();
  }
};
</script>

<style scoped>
.chart {
  height: calc(100% - 40px);
  margin-top: 40px;
}
.gauge_label{
  position: absolute;
  bottom: 5%;
  padding: 8px 10px;
  font-size: 12px;
  left: 50%;
  transform: translateX(-50%);
  background: #1b2e5b;
  border: #0281DA 1px solid;
  border-radius: 20px;
}
</style>