<template>
  <div class="container dark">
    <div class="platform-top">
        <div class="el-col el-col-9"></div>
        <div class="el-col el-col-6"></div>
        <div class="el-col el-col-9"></div>
    </div>
    <el-row :gutter="10" class="platform-box">
      <el-col :span="6" id="platform-left">
        <el-col
          :span="24"
          class="box-item"
          style="display: flex;justify-content: center;align-items: center"
        >
          <div class="hightlight_line top_left"></div>
          <div class="hightlight_line top_right"></div>
          <div class="hightlight_line bottom_left"></div>
          <div class="hightlight_line bottom_right"></div>
          <div class="box-item-title">健康指数</div>
          <div id="dashboard"></div>
        </el-col>
        <el-col :span="24" class="box-item">
          <div class="hightlight_line top_left"></div>
          <div class="hightlight_line top_right"></div>
          <div class="hightlight_line bottom_left"></div>
          <div class="hightlight_line bottom_right"></div>
          <div class="box-item-title">处理详情</div>
          <el-col :span="12">
            <ul class="platform-list">
              <li class="platform-item title">今日火警</li>
              <li class="platform-item">
                <i class="el-icon-time"></i>
                <p>
                  等待处理
                  <span>0</span>个
                </p>
              </li>
              <li class="platform-item">
                <i class="el-icon-time"></i>
                <p>
                  等待处理
                  <span>0</span>个
                </p>
              </li>
              <li class="platform-item">
                <i class="el-icon-stopwatch"></i>
                <p>
                  等待处理
                  <span>0</span>个
                </p>
              </li>
            </ul>
          </el-col>
          <el-col :span="12">
            <ul class="platform-list">
              <li class="platform-item title">今日火警</li>
              <li class="platform-item">
                <i class="el-icon-time"></i>
                <p>
                  等待处理
                  <span>0</span>个
                </p>
              </li>
              <li class="platform-item">
                <i class="el-icon-stopwatch"></i>
                <p>
                  等待处理
                  <span>0</span>个
                </p>
              </li>
              <li class="platform-item">
                <i class="el-icon-stopwatch"></i>
                <p>
                  等待处理
                  <span>0</span>个
                </p>
              </li>
              <li class="platform-item">
                <i class="el-icon-stopwatch"></i>
                <p>
                  等待处理
                  <span>0</span>个
                </p>
              </li>
            </ul>
          </el-col>
        </el-col>
        <el-col :span="24" class="box-item">
          <div class="hightlight_line top_left"></div>
          <div class="hightlight_line top_right"></div>
          <div class="hightlight_line bottom_left"></div>
          <div class="hightlight_line bottom_right"></div>
          <div class="box-item-title">本日设备正常运行统计</div>
          <div id="today_chart"></div>
        </el-col>
      </el-col>
      <el-col :span="12">
        <el-col :span="24" class="box-item middle" id="floorBox">
          <!-- <my-floor :height="floorHeight"></my-floor> -->
        </el-col>
        <el-col :span="24" class="box-item" id="tableBox">
          <div class="hightlight_line top_left"></div>
          <div class="hightlight_line top_right"></div>
          <div class="hightlight_line bottom_left"></div>
          <div class="hightlight_line bottom_right"></div>
          <el-table
            :data="tableData"
            class="platform-table"
            style="width: 100%"
            border
            :max-height="tableHeight"
          >
            <el-table-column prop="datetime" label="时间"></el-table-column>
            <el-table-column prop="pos" label="传感器位置"></el-table-column>
            <el-table-column prop="type" label="类型"></el-table-column>
            <el-table-column prop="state" label="状态"></el-table-column>
          </el-table>
        </el-col>
      </el-col>
      <el-col :span="6" id="platform-right">
        <el-col :span="24" class="box-item">
          <div class="hightlight_line top_left"></div>
          <div class="hightlight_line top_right"></div>
          <div class="hightlight_line bottom_left"></div>
          <div class="hightlight_line bottom_right"></div>
          <div class="box-item-title">事件处理率</div>
          <el-row>
            <el-col :span="12" style="height:100%">
              <my-echart-gauge :color="color1" :data="gauge1"></my-echart-gauge>
            </el-col>
            <el-col :span="12" style="height:100%">
              <my-echart-gauge :color="color2" :data="gauge2"></my-echart-gauge>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="24" class="box-item">
          <div class="hightlight_line top_left"></div>
          <div class="hightlight_line top_right"></div>
          <div class="hightlight_line bottom_left"></div>
          <div class="hightlight_line bottom_right"></div>
          <div class="box-item-title">监控在线统计</div>
          <my-echart-pie></my-echart-pie>
        </el-col>
        <el-col :span="24" class="box-item">
          <div class="hightlight_line top_left"></div>
          <div class="hightlight_line top_right"></div>
          <div class="hightlight_line bottom_left"></div>
          <div class="hightlight_line bottom_right"></div>
          <div class="box-item-title">隐患处理情况</div>
          <my-echart-line :chartData="yearData"></my-echart-line>
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import MyEchartGauge from "@/views/board/GaugeChart";
import MyEchartLine from "@/views/board/LineChart";
import MyEchartPie from "@/views/board/PieChart";
export default {
  data() {
    return {
      tableData: [
        {
          datetime: "2019-12-06",
          pos: "苏州市振兴化工厂",
          type: "烟感",
          state: 0
        },
        {
          datetime: "2019-12-06",
          pos: "苏州市振兴化工厂",
          type: "烟感",
          state: 0
        },
        {
          datetime: "2019-12-06",
          pos: "苏州市振兴化工厂",
          type: "烟感",
          state: 0
        },
        {
          datetime: "2019-12-06",
          pos: "苏州市振兴化工厂",
          type: "烟感",
          state: 0
        },
        {
          datetime: "2019-12-06",
          pos: "苏州市振兴化工厂",
          type: "烟感",
          state: 0
        },
        {
          datetime: "2019-12-06",
          pos: "苏州市振兴化工厂",
          type: "烟感",
          state: 0
        },
        {
          datetime: "2019-12-06",
          pos: "苏州市振兴化工厂",
          type: "烟感",
          state: 0
        },
        {
          datetime: "2019-12-06",
          pos: "苏州市振兴化工厂",
          type: "烟感",
          state: 0
        }
      ],
      tchart: {},
      bchart: {},
      rchart1: {},
      rchart2: {},
      rchart3: {},
      rchart4: {},
      pchart: {},
      chart1: "pechart",
      chart2: "pechart1",
      nowDate: "",
      nowTime: "",
      tableHeight: "250",
      floorHeight: "200",
      color1: {
        scolor: "#e5790d",
        bcolor: "#fbc795",
        lcolor: "#e5790d"
      },
      color2: {
        scolor: "#e81f18",
        bcolor: "#fda9a7",
        lcolor: "#e81f18"
      },
      gauge1: {
        label: "本周隐患及时处理率",
        value: 70
      },
      gauge2: {
        label: "本周故障及时处理率",
        value: 30
      },
      form: {
        id: 1
      },
      bform: {
        id: 1 //工厂id
      },
      yearData: {
        legend: ["2018年", "2019年"],
        xdata: [
          "1月",
          "2月",
          "3月",
          "4月",
          "5月",
          "6月",
          "7月",
          "8月",
          "9月",
          "10月",
          "11月",
          "12月"
        ], //横坐标的值
        ydata: [
          [820, 932, 901, 934, 1290, 1330, 1320, 901, 934, 1290, 1330, 1320],
          [901, 934, 1290, 1330, 1320, 100, 100, 100, 290, 1330, 1320, 100]
        ] //纵坐标的值
      }
    };
  },
  methods: {
    resizeChart() {
      this.resizeFloor();
    },
    resizeFloor() {
      let floor = document.querySelector("#floorBox");
      let _height = floor.offsetHeight - 95;
      this.floorHeight = _height;
      console.log(this.floorHeight);
    },
    initTodayChart() {
      //今日传感器
      this.tchart = echarts.init(document.getElementById("today_chart"));
      let option = {
        radar: {
          center: ["50%", "70%"],
          radius: "80%",
          splitNumber: 8,
          axisLine: {
            lineStyle: {
              color: "#fff",
              opacity: 0.2
            }
          },
          splitLine: {
            lineStyle: {
              color: "#fff",
              opacity: 0.2
            }
          },
          splitArea: {
            areaStyle: {
              color: "rgba(127,95,132,.3)",
              opacity: 1,
              shadowBlur: 45,
              shadowColor: "rgba(0,0,0,.5)",
              shadowOffsetX: 0,
              shadowOffsetY: 15
            }
          },
          indicator: [
            {
              name: "气体传感器",
              max: 6000
            },
            {
              name: "温湿度",
              max: 16000
            },
            {
              name: "烟感传感器",
              max: 30000
            }
          ]
        },
        series: [
          {
            type: "radar",
            symbolSize: 0,
            areaStyle: {
              normal: {
                shadowBlur: 13,
                shadowColor: "rgba(0,0,0,.2)",
                shadowOffsetX: 0,
                shadowOffsetY: 10,
                opacity: 1
              }
            },
            data: [
              {
                value: [2500, 12000, 8000]
              }
            ]
          }
        ],
        color: ["#ef4b4c", "#b1eadb"]
      };
      this.tchart.setOption(option);
    },
    initDashboard() {
      //仪表盘
      //   this.bchart = echarts.init(document.getElementById("dashboard"));
      //   let option = {
      //     series: [
      //       {
      //         name: "高程",
      //         type: "gauge",
      //         center: ["50%", "75%"], // 默认全局居中
      //         radius: "140%", //仪表大小
      //         startAngle: 180, //开始角度
      //         endAngle: 0, //结束角度
      //         min: 0, //最小角度
      //         max: 100, //最小角度
      //         axisLine: {
      //           show: true,
      //           lineStyle: {
      //             width: 20, //颜色宽度
      //             shadowBlur: 0,
      //             color: [
      //               [0.2, "#ce244a"],
      //               [0.6, "#E6A23C"],
      //               [1, "#2deb69"]
      //             ]
      //           }
      //         },
      //         axisTick: {
      //           show: true,
      //           splitNumber: 2 //刻度
      //         },
      //         splitLine: {
      //           show: true,
      //           length: 25, //最大刻度长度
      //           lineStyle: {
      //             //color:'black'
      //           }
      //         },
      //         axisLabel: {
      //           textStyle: {
      //             fontSize: 12,
      //             fontWeight: ""
      //           }
      //         },
      //         pointer: {
      //           show: true
      //         },
      //         detail: {
      //           //show:false,
      //           offsetCenter: [0, 30],
      //           textStyle: {
      //             fontSize: 16
      //           }
      //         },
      //         data: [
      //           {
      //             name: "",
      //             value: 50
      //           }
      //         ]
      //       }
      //     ]
      //   };
      //   this.bchart.setOption(option);
    },
    initDateTime() {
      let date = new Date();
      let _day = date.getDate();
      let year = date.getFullYear();
      let _month = date.getMonth() + 1;
      let week = date.getDay();
      let w = "";
      switch (week) {
        case 0:
          w = "星期日";
          break;
        case 1:
          w = "星期一";
          break;
        case 2:
          w = "星期二";
          break;
        case 3:
          w = "星期三";
          break;
        case 4:
          w = "星期四";
          break;
        case 5:
          w = "星期五";
          break;
        case 6:
          w = "星期六";
          break;
      }
      _day > 10 ? (_day = _day) : (_day = "0" + _day);
      _month > 10 ? (_month = _month) : (_month = "0" + _month);
      this.nowDate = `${year}/${_month}/${_day}  ${w}`;
      setInterval(() => {
        this.updateTime();
      }, 1000);
    },
    updateTime() {
      let date = new Date();
      let _hour = date.getHours();
      let _min = date.getMinutes();
      // _hour > 10 ? (_hour = _hour) : (_hour = "0" + _hour);
      _min > 10 ? {} : (_min = "0" + _min);
      this.nowTime = `${_hour}:${_min}`;
    }
  },
  mounted() {
    this.initTodayChart();
    this.initDashboard();
    this.initDateTime();
    this.resizeFloor();

    window.addEventListener("resize", this.resizeChart);
  },
  components: {
    MyEchartGauge,
    MyEchartLine,
    MyEchartPie
  }
};
</script>

<style>
.container.dark {
  width: 100%;
  height: 100%;
  padding: 0;
  background: #071748;
  overflow: hidden;
  color: #fff;
  min-width: 1500px;
  min-height: 800px;
}
.platform-box {
  height: 100%;
}
.platform-box > div {
  height: 100%;
}
.box-item {
  height: calc((100% - 100px) / 3);
  margin-top: 10px;
  box-shadow: inset 0px 0px 10px 2px #0942a1;
}
.middle {
  height: calc((200% - 180px) / 3);
}
.platform-list {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
.platform-item {
  display: flex;
}
.platform-item.title {
  font-weight: bold;
}
.platform-item p {
  margin: 0;
  padding: 0;
}
#today_chart {
  width: 100%;
  height: 100%;
}
/* .box-item {
  border: 1px solid #fff;
} */
.box-item {
  padding-left: 0 !important;
  padding-right: 0 !important;
  background: rgba(8, 27, 83, 0.2);
  position: relative;
  border: 1px solid #1087b1;
}
.platform-list {
  padding: 10px;
  margin-top: 40px;
  color: #fff;
  box-shadow: inset 0px 0px 10px 2px #4e3d4f;
}
.platform-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  color: #fff;
  line-height: 25px;
}
.platform-item i {
  margin-right: 10px;
  color: #fff;
}
.platform-item p {
  color: #fff;
  font-size: 12px;
}
.platform-item span {
  font-size: 18px;
  margin-right: 5px;
}
.platform-table {
  background: initial;
}
.platform-table .platform-table {
  background-color: initial;
}
.platform-table .el-table th {
  padding: 0;
}
#dashboard {
  width: 100%;
  height: 150px;
}
div[id^="rchart"] {
  height: 100%;
  width: 100%;
}
.platform-top {
  width: 100%;
  height: 40px;
  display: flex;
}
.flex-box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.admin-item {
  float: left;
  position: relative;
  padding: 0 10px;
}
.admin-item:last-child::before {
  content: "";
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 1px;
  background: #efefef;
}
.box-item-title {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  font-size: 16px;
  padding: 10px;
  padding-left: 20px;
  font-weight: bold;
  color: #fff;
}
.hightlight_line.top_left {
  position: absolute;
  left: 0;
  top: 0;
}
.hightlight_line.top_right {
  position: absolute;
  right: 0;
  top: 0;
  transform: rotate(90deg);
}
.hightlight_line.bottom_left {
  position: absolute;
  left: 0;
  bottom: 0;
  transform: rotate(-90deg);
}
.hightlight_line.bottom_right {
  position: absolute;
  right: 0;
  bottom: 0;
  transform: rotate(180deg);
}
.hightlight_line::before {
  content: "";
  width: 20px;
  height: 2px;
  background: #1cc0c1;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 1;
}
.hightlight_line::after {
  content: "";
  height: 20px;
  width: 2px;
  background: #1cc0c1;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 1;
}

.platform-table.el-table tr {
  background: initial !important;
}
.platform-table.el-table th {
  background: initial !important;
}
.platform-table.el-table th,
.platform-table.el-table td {
  text-align: center;
  color: #fff;
}
.el-row {
  height: 100%;
}
#floorBox {
  border: 0;
  box-shadow: initial;
}
.el-table--border {
  border: 1px solid #096c7f;
}
.platform-table.el-table th.is-leaf,
.platform-table.el-table td {
  border-bottom: 1px solid #096c7f;
}
.el-table--border th,
.el-table--border td {
  border-right: 1px solid #096c7f;
}
.el-table__row:hover {
  background: initial;
}
.platform-top>div{
    background: rgba(255, 255, 255, 0.2)
}
/* 动画 */
#platform-left {
  animation: fadeInLeft 2s ease 0s 1 both;
}
#platform-right {
  animation: fadeInRight 2s ease 0s 1 both;
}
#tableBox {
  animation: fadeInUp 2s ease 0s 1 both;
}
#floorBox {
  animation: fadeIn 2s ease 0s 1 both;
}
</style>