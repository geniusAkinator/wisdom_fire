<template>
  <div style="width:100%;height:100%;position: relative;">
    <div class="map-cover">
      <div class="fl padding-xs">
        <div class="my-count">注册单位总数</div>
        <count-to :start-val="0" :end-val="0" :duration="2600" class="card-panel-num" />
      </div>
      <div class="fl padding-xs">
        <div class="my-count">注册设备数量</div>
        <count-to :start-val="0" :end-val="0" :duration="2600" class="card-panel-num" />
      </div>
    </div>
    <div :id="id" style="height:100%;width:100%"></div>
  </div>
</template>

<script>
import MyPieRange from "@/views/platform/RangeChart";
import GeoCoordMapEnum from "@/enum/GeoCoordMapEnum";
import GeoCoordProvinceEnum from "@/enum/GeoCoordProvinceEnum";
import CountTo from "vue-count-to";
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
        bottom: 50
      }
    };
  },
  methods: {
    resizeChart() {
      this.myCharts.resize();
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
      var geoCoordMap = GeoCoordMapEnum;
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
        bottom: _this.pos.bottom - 3,
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
    _this.provinceData = GeoCoordProvinceEnum;
    var data = [
    //   {
    //     name: "苏州市",
    //     value: 100
    //   },
    //   {
    //     name: "上海",
    //     value: 42
    //   }
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
          bottom: _this.pos.bottom - 10,
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
          bottom: _this.pos.bottom - 3,
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

      tooltip: {
        trigger: "item"
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
            borderWidth: 0
          }
        },
        zlevel: -1
      },
      series: [
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
              show: false,
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
          },
          tooltip: {
            show: true,
            trigger: "item",
            formatter: function(params) {
              var tipHtml = "";
              tipHtml =
                '<div style="width:280px;height:180px;background:rgba(22,80,158,0.8);border:1px solid rgba(7,166,255,0.7)">' +
                '<div style="width:100%;height:40px;line-height:40px;border-bottom:2px solid rgba(7,166,255,0.7);padding:0 0">' +
                '<span style="margin-left:10px;color:#fff;font-size:16px;">' +
                "昆山亚辉有限公司" +
                "</span>" +
                "</div>" +
                '<div style="padding:20px">' +
                '<p style="color:#fff;font-size:12px;">' +
                '<i style="display:inline-block;width:10px;height:10px;background:#16d6ff;border-radius:40px;margin:0 8px">' +
                "</i>" +
                "单位地址：" +
                '<span style="color:#11ee7d;margin:0 6px;">' +
                "江苏省昆山市" +
                "</span></p>" +
                '<p style="color:#fff;font-size:12px;">' +
                '<i style="display:inline-block;width:10px;height:10px;background:#16d6ff;border-radius:40px;margin:0 8px">' +
                "</i>" +
                "负责人：" +
                '<span style="color:#11ee7d;margin:0 6px;">' +
                "王某" +
                "</span></p>" +
                '<p style="color:#fff;font-size:12px;">' +
                '<i style="display:inline-block;width:10px;height:10px;background:#16d6ff;border-radius:40px;margin:0 8px">' +
                "</i>" +
                "状态：" +
                '<span style="margin:0 6px;">' +
                "故障5" +
                "</span>" +
                '<span style="margin:0 6px;">' +
                "隐患2" +
                "</span></p>" +
                "</div>" +
                "</div>";
              // return params.name + ' : ' + params.value[2];
              return tipHtml;
            }
          }
        }
      ]
    };
    _this.initChart();
  },
  components: {
    CountTo
  }
};
</script>
<style>
.map-cover {
  position: absolute;
  left: 0;
  top: 0;
}
.map-cover .card-panel-num {
  color: #2b80ff;
  font-size: 60px;
  font-weight: bold;
  text-align: center;
  width: 100%;
  display: block;
}
.map-cover .my-count{
    font-size: 30px;
}
</style>
