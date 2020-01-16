<template>
  <div :id="id" class="echart"></div>
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
    let scolor = this.color.scolor;
    let ecolor = this.color.ecolor;
    let lcolor = this.color.lcolor;
    let center = ["50%", "55%"];
    //08BBB7
    //91D86C
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
      },
      {
        offset: 0.3,
        color: ecolor // 100% 处的颜色
      },
      {
        offset: 0.8,
        color: ecolor // 100% 处的颜色
      },
      {
        offset: 1,
        color: scolor // 100% 处的颜色
      }
    ]);
    var colorSet = [[0.91, color], [1, "#15337C"]];
    var rich = {
      white: {
        fontSize: 35,
        color: "#fff",
        fontWeight: "500",
        padding: [20, 0, 0, 0]
      },
      bule: {
        fontSize: 35,
        color: "#fff",
        fontWeight: "500",
        padding: [20, 0, 0, 0]
      },
      radius: {
        // lineHeight:80,
        borderWidth: 1,
        borderColor: "#0092F2",
        fontSize: 12,
        color: "#fff",
        backgroundColor: "#1B215B",
        borderRadius: 20,
        textAlign: "center",
        padding: [8, 10, 10, 10]
      },
      size: {
        height: 100,
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
          name: "外层辅助",
          radius: "74%",
          startAngle: "225",
          endAngle: "-45",
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
              color: [[1, lcolor]], //最外层线的颜色
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
          startAngle: "225",
          endAngle: "-45",
          pointer: {
            show: false
          },
          detail: {
            formatter: function(value) {
              var num = Math.round(value);
              return (
                "{bule|" +
                num +
                "}{white|%}" +
                "{size|" +
                "}\n{radius|" +
                _this.data.label +
                "}"
              );
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
};
</script>

<style>
.echart {
  width: 100%;
  height: 100%;
}
</style>