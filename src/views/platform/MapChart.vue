<template>
  <div style="width:100%;height:calc( 100% - 70px );position: relative;">
    <div :id="id" class="chart"></div>
  </div>
</template>

<script>
import MyPieRange from "@/views/platform/RangeChart";
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
      provinceData: {},
      option: {},
      pos: {
        left: 50,
        top: 50
      }
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
        _this.myCharts = echarts.init(document.getElementById(`${_this.id}`));
        let geoData = response.data;
        echarts.registerMap(mtype, geoData);
        _this.myCharts.setOption(_this.option);
        window.addEventListener("resize", _this.resizeChart);
        _this.myCharts.on("click", function(ev) {
          let key = ev.name;
          if (_this.provinceData.has(key)) {
            _this.mapType = _this.provinceData.get(key);
            _this.resetOption(key);
          }
        });
      });
    },
    convertData(data) {
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
    },
    resetOption(name) {
      let _this = this;
      let _len = 0;
      let _glen = _this.option.graphic.length;
      console.log(_glen);
      let temp = _this.option.graphic;
      temp.splice(2, 3);
      _this.option.graphic = temp;
      if (_glen == 3 || name == "中国") {
        _len = 60;
        _this.option.geo.map = _this.mapType;
      } else {
        let breadcrumb = this.createBreadcrumb(name);
        _len = 145;
        _this.option.geo.map = _this.mapType;
        _this.option.graphic.push(breadcrumb);
      }
      _this.option.series[0].map = _this.mapType;
      _this.option.graphic[0].children[0].shape.x2 = _len;
      _this.option.graphic[0].children[1].shape.x2 = _len;
      _this.myCharts.clear();
      _this.initChart();
    },
    createBreadcrumb(name) {
      //创建Echart Map Graphic Group
      let _this = this;
      let _pinyin = _this.provinceData.get(name);
      _pinyin = _pinyin.charAt(0).toUpperCase() + _pinyin.slice(1);
      _pinyin = _pinyin.replace(/\d+/g, "");
      let breadcrumb = {
        type: "group",
        left: _this.pos.left + 55,
        top: _this.pos.top,
        children: [
          {
            type: "polyline",
            left: -25,
            top: -6,
            shape: {
              points: [
                [0, 0],
                [8, 11],
                [0, 22]
              ]
            },
            style: {
              stroke: "#fff",
              key: name
              // lineWidth: 2,
            },
            onclick: function() {}
          },
          {
            type: "text",
            left: 0,
            top: "middle",
            style: {
              text: name,
              textAlign: "center",
              fill: "#efefef",
              font: '12px "Microsoft YaHei", sans-serif'
            },
            onclick: function() {}
          },
          {
            type: "text",
            left: 0,
            top: 10,
            style: {
              text: _pinyin,
              textAlign: "center",
              fill: "#efefef",
              font: '12px "Microsoft YaHei", sans-serif'
            },
            onclick: function() {}
          }
        ]
      };
      return breadcrumb;
    }
  },
  mounted() {
    let _this = this;
    //手动set Map防止多音字和重名
    let myMap = new Map();
    myMap.set("中国", "china");
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
    _this.provinceData = myMap;
    // console.log(this.provinceData);
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

    _this.option = {
      animation: true, //过度动画
      animationDuration: 1000,
      animationEasing: "cubicInOut",
      animationDurationUpdate: 1000,
      animationEasingUpdate: "cubicInOut",
      graphic: [
        {
          //上线条
          type: "group",
          left: _this.pos.left,
          top: _this.pos.top - 10,
          children: [
            {
              type: "line",
              left: 0,
              top: -20,
              shape: {
                x1: 0,
                y1: 0,
                x2: 60,
                y2: 0
              },
              style: {
                stroke: "rgba(147, 235, 248, .8)"
              }
            },
            {
              //下线条
              type: "line",
              left: 0,
              top: 20,
              shape: {
                x1: 0,
                y1: 0,
                x2: 60,
                y2: 0
              },
              style: {
                stroke: "rgba(147, 235, 248, .8)"
              }
            }
          ]
        },
        {
          type: "group",
          left: _this.pos.left + 15,
          top: _this.pos.top,
          children: [
            {
              type: "text",
              left: 0,
              top: "middle",
              style: {
                text: "中国",
                textAlign: "center",
                fill: "#fff",
                font: '12px "Microsoft YaHei", sans-serif'
              },
              onclick: function() {
                let _key = "中国";
                _this.mapType = _this.provinceData.get(_key);
                _this.resetOption(_key);
              }
            },
            {
              type: "text",
              left: 0,
              top: 10,
              style: {
                text: "China",
                textAlign: "center",
                fill: "#fff",
                font: '12px "Microsoft YaHei", sans-serif'
              },
              onclick: function() {
                let _key = "中国";
                _this.mapType = _this.provinceData.get(_key);
                _this.resetOption(_key);
              }
            }
          ]
        }
      ],
      backgroundColor: {
        //背景颜色
        type: "linear",
        x: 0,
        y: 0,
        x2: 1,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: "#061436" // 0% 处的颜色 0f378f
          },
          {
            offset: 1,
            color: "#061436" // 100% 处的颜色 00091a
          }
        ],
        globalCoord: false // 缺省为 false
      },
      legend: {
        orient: "vertical",
        y: "bottom",
        x: "right",
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
        map: _this.mapType,
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
            borderColor: "rgba(147, 235, 248, 1)",
            borderWidth: 1,
            areaColor: {
              type: "radial",
              x: 0.5,
              y: 0.5,
              r: 0.8,
              colorStops: [
                {
                  offset: 0,
                  color: "rgba(147, 235, 248, 0)" // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "rgba(147, 235, 248, .2)" // 100% 处的颜色
                }
              ],
              globalCoord: false // 缺省为 false
            },
            shadowColor: "rgba(128, 217, 248, 1)",
            // shadowColor: 'rgba(255, 255, 255, 1)',
            shadowOffsetX: -2,
            shadowOffsetY: 2,
            shadowBlur: 10
          },
          emphasis: {
            areaColor: "#389BB7",
            borderWidth: 0,
            zlevel:1
          }
        }
      },
      series: [
        {
          type: "map",
          map: _this.mapType,
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
          data: _this.convertData(data),
          symbolSize: function(val) {
            return val[2] / 10;
          },
          label: {
            normal: {
              formatter: "{b}",
              position: "right",
              show: true,
              color: "#fff"
            },
            emphasis: {
              show: true
            }
          },
          itemStyle: {
            normal: {
              color: "#d9100b",
              shadowBlur: 10,
              shadowColor: "#333",
              borderColor: "#fff",
              borderWidth: 2
            }
          }
        }
      ]
    };
    _this.initChart();
  }
};
</script>

<style>
.chart {
  width: 100%;
  height: 100%;
}
</style>