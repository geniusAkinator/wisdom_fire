<template>
  <div :id="id" class="chart"></div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      id:
        "map" +
        Math.random()
          .toString(36)
          .substr(-8),
      myCharts: {},
      mapType: "china",
      provinceData: {}
    };
  },
  methods: {
    resizeChart() {
      this.myCharts.resize();
    },
    initProvinceMap() {
      axios.get("static/js/henan.json").then(response => {});
    },
    initChart() {
      let _this = this;
      let mtype = _this.mapType;
      axios.get(`static/js/province/${mtype}.json`).then(response => {
        this.myCharts = echarts.init(document.getElementById(`${this.id}`));
        let geoData = response.data;
        console.log(geoData);
        echarts.registerMap(mtype, geoData);
        var geoCoordMap = {
          台湾: [121.5135, 25.0308],
          黑龙江: [127.9688, 45.368],
          内蒙古: [110.3467, 41.4899],
          吉林: [125.8154, 44.2584],
          北京: [116.4551, 40.2539],
          辽宁: [123.1238, 42.1216],
          河北: [114.4995, 38.1006],
          天津: [117.4219, 39.4189],
          山西: [112.3352, 37.9413],
          陕西: [109.1162, 34.2004],
          甘肃: [103.5901, 36.3043],
          宁夏: [106.3586, 38.1775],
          青海: [101.4038, 36.8207],
          新疆: [87.9236, 43.5883],
          西藏: [91.11, 29.97],
          四川: [103.9526, 30.7617],
          重庆: [108.384366, 30.439702],
          山东: [117.1582, 36.8701],
          河南: [113.4668, 34.6234],
          江苏: [118.8062, 31.9208],
          安徽: [117.29, 32.0581],
          湖北: [114.3896, 30.6628],
          浙江: [119.5313, 29.8773],
          福建: [119.4543, 25.9222],
          江西: [116.0046, 28.6633],
          湖南: [113.0823, 28.2568],
          贵州: [106.6992, 26.7682],
          云南: [102.9199, 25.4663],
          广东: [113.12244, 23.009505],
          广西: [108.479, 23.1152],
          海南: [110.3893, 19.8516],
          上海: [121.4648, 31.2891]
        };
        var data = [
          {
            name: "北京",
            value: 199
          },
          {
            name: "天津",
            value: 42
          }
        ];
        var max = 480,
          min = 9; // todo
        var maxSize4Pin = 100,
          minSize4Pin = 20;
        var convertData = function(data) {
          var res = [];
          for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap[data[i].name];
            if (geoCoord) {
              res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
              });
            }
          }
          return res;
        };
        let option = {
          animation: true, //过度动画
          animationDuration: 1000,
          animationEasing: "cubicInOut",
          animationDurationUpdate: 1000,
          animationEasingUpdate: "cubicInOut",
          backgroundColor: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 1,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "#0f378f" // 0% 处的颜色
              },
              {
                offset: 1,
                color: "#00091a" // 100% 处的颜色
              }
            ],
            globalCoord: false // 缺省为 false
          },
          legend: {
            orient: "vertical",
            y: "10%",
            x: "70%",
            data: ["隐患"],
            textStyle: {
              color: "#fff"
            }
          },
          visualMap: {
            show: false,
            min: 0,
            max: 500,
            left: "left",
            top: "bottom",
            text: ["高", "低"], // 文本，默认为数值文本
            calculable: true,
            seriesIndex: [1],
            inRange: {}
          },
          geo: {
            map: mtype,
            show: true,
            roam: true,
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                areaColor: "#3a7fd5",
                borderColor: "#0a53e9", //线
                shadowColor: "#092f8f", //外发光
                shadowBlur: 20
              },
              emphasis: {
                areaColor: "#0a2dae" //悬浮区背景
              }
            }
          },
          series: [
            {
              type: "map",
              map: mtype,
              geoIndex: 0,
              aspectScale: 0.75, //长宽比
              showLegendSymbol: false, // 存在legend时显示
              label: {
                normal: {
                  show: false
                },
                emphasis: {
                  show: false,
                  textStyle: {
                    color: "#fff"
                  }
                }
              },
              roam: true,
              itemStyle: {
                normal: {
                  areaColor: "#031525",
                  borderColor: "#FFFFFF"
                },
                emphasis: {
                  areaColor: "#2B91B7"
                }
              },
              animation: false,
              data: data
            },
            {
              name: "隐患",
              type: "scatter",
              coordinateSystem: "geo",
              data: convertData(data),
              symbolSize: function(val) {
                return val[2] / 10;
              },
              label: {
                normal: {
                  formatter: "{b}",
                  position: "right",
                  show: false
                },
                emphasis: {
                  show: true
                }
              },
              itemStyle: {
                normal: {
                  color: "#ddb926"
                }
              }
            },
            {
              name: "隐患", //前五个
              type: "effectScatter",
              coordinateSystem: "geo",
              data: convertData(
                data
                  .sort(function(a, b) {
                    return b.value - a.value;
                  })
                  .slice(0, 6)
              ),
              symbolSize: function(val) {
                return val[2] / 10;
              },
              showEffectOn: "render",
              rippleEffect: {
                brushType: "stroke"
              },
              hoverAnimation: true,
              label: {
                normal: {
                  formatter: "{b}",
                  position: "right",
                  show: true
                }
              },
              itemStyle: {
                normal: {
                  color: "#f4e925",
                  shadowBlur: 10,
                  shadowColor: "#333"
                }
              },
              zlevel: 1
            }
          ]
        };
        _this.myCharts.setOption(option);
        window.addEventListener("resize", _this.resizeChart);

        _this.myCharts.on("click", function(ev) {
          let key = ev.name;
          if (_this.provinceData.has(key)) {
            _this.mapType = _this.provinceData.get(key);
            _this.initChart();
          }
        });
      });
    }
  },
  mounted() {
    let myMap = new Map();
    myMap.set("安徽", "anhui");
    myMap.set("澳门", "aomen");
    myMap.set("北京", "beijing");
    myMap.set("重庆", "chongqing");
    myMap.set("福建", "fujian");
    myMap.set("甘肃", "gansu");
    myMap.set("广东", "guangdong");
    myMap.set("广西", "guangxi");
    myMap.set("贵州", "guizhou");
    myMap.set("海南", "hainan");
    myMap.set("河北", "hebei");
    myMap.set("黑龙江", "heilongjiang");
    myMap.set("河南", "henan");
    myMap.set("湖北", "hubei");
    myMap.set("湖南", "hunan");
    myMap.set("江苏", "jiangsu");
    myMap.set("江西", "jiangxi");
    myMap.set("吉林", "jilin");
    myMap.set("辽宁", "liaoning");
    myMap.set("内蒙古", "neimenggu");
    myMap.set("宁夏", "ningxia");
    myMap.set("青海", "qinghai");
    myMap.set("山东", "shandong");
    myMap.set("上海", "shanghai");
    myMap.set("山西", "shanxi");
    myMap.set("陕西", "shanxi1");
    myMap.set("四川", "sichuan");
    myMap.set("天津", "tianjin");
    myMap.set("香港", "xianggang");
    myMap.set("新疆", "xinjiang");
    myMap.set("西藏", "xizang");
    myMap.set("云南", "yunnan");
    myMap.set("浙江", "zhejiang");
    this.provinceData = myMap;
    console.log(this.provinceData);
    this.initChart();
  }
};
</script>

<style>
.chart {
  width: 100%;
  height: 100%;
}
</style>