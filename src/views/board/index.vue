<template>
  <div class="container dark">
    <div class="board-top">
      <div class="el-col el-col-7">
        <div class="board-top-left"></div>
      </div>
      <div class="el-col el-col-10" style="position:relative">
        <div class="top-title">
          <span class="main_title">安中云数据平台</span>
          <span class="date_time">{{nowDate}}</span>
        </div>
        <div class="rectangle_left"></div>
        <div class="rectangle_right"></div>
        <div class="square left">
          <div v-for="i in 15"></div>
        </div>
        <div class="square right">
          <div v-for="i in 15"></div>
        </div>
        <div class="gradient_line"></div>
      </div>
      <div class="el-col el-col-7">
        <div class="board-top-right">
          <div class="platform-dropdown">
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                负责建筑
                <i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>黄金糕</el-dropdown-item>
                <el-dropdown-item>狮子头</el-dropdown-item>
                <el-dropdown-item>螺蛳粉</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>/
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                管理员
                <i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>AAA</el-dropdown-item>
                <el-dropdown-item>BBB</el-dropdown-item>
                <el-dropdown-item>CCC</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
    </div>
    <el-row :gutter="10" class="board-box">
      <el-col :span="6" id="board-left">
        <el-col
          :span="24"
          class="box-item"
          style="display: flex;justify-content: center;align-items: center"
        >
          <div class="hightlight_line top_left"></div>
          <div class="hightlight_line top_right"></div>
          <div class="hightlight_line bottom_left"></div>
          <div class="hightlight_line bottom_right"></div>
          <div class="box-item-title">
            <span class="title">健康指数</span>
            <div class="square_list">
              <div v-for="i in 5"></div>
            </div>
          </div>
          <el-row style="width:100%">
            <el-col :span="12" style="height:100%">
              <my-echart-meter></my-echart-meter>
            </el-col>
            <el-col :span="12" style="height:100%">
              <div class="count">
                <div class="count_item danger">
                  <svg-icon class-name="count-icon" icon-class="info" />
                  <span>隐患</span>
                  <span class="num">(02)</span>
                </div>
                <div class="count_item error">
                  <svg-icon class-name="count-icon" icon-class="error" />
                  <span>故障</span>
                  <span class="num">(02)</span>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="24" class="box-item">
          <div class="hightlight_line top_left"></div>
          <div class="hightlight_line top_right"></div>
          <div class="hightlight_line bottom_left"></div>
          <div class="hightlight_line bottom_right"></div>
          <div class="box-item-title">
            <span class="title">处理详情</span>
            <div class="square_list">
              <div v-for="i in 5"></div>
            </div>
          </div>
          <div class="detail-box">
            <ul class="detail-list">
              <li class="detail-item title">
                <p>
                  今日火警
                  <span>5个</span>
                </p>
              </li>
              <li class="detail-item">
                <i class="el-icon-time"></i>
                <p>
                  等待处理
                  <span>0</span>个
                </p>
              </li>
              <li class="detail-item">
                <i class="el-icon-stopwatch"></i>
                <p>
                  处理中
                  <span>0</span>个
                </p>
              </li>
              <li class="detail-item">
                <i class="el-icon-stopwatch"></i>
                <p>
                  已完成
                  <span>0</span>个
                </p>
              </li>
            </ul>
            <ul class="detail-list">
              <li class="detail-item title">
                <p>
                  今日火警
                  <span>5个</span>
                </p>
              </li>
              <li class="detail-item">
                <i class="el-icon-time"></i>
                <p>
                  等待处理
                  <span>0</span>个
                </p>
              </li>
              <li class="detail-item">
                <i class="el-icon-stopwatch"></i>
                <p>
                  处理中
                  <span>0</span>个
                </p>
              </li>
              <li class="detail-item">
                <i class="el-icon-stopwatch"></i>
                <p>
                  已完成
                  <span>0</span>个
                </p>
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :span="24" class="box-item">
          <div class="hightlight_line top_left"></div>
          <div class="hightlight_line top_right"></div>
          <div class="hightlight_line bottom_left"></div>
          <div class="hightlight_line bottom_right"></div>
          <div class="box-item-title">
            <span class="title">本日设备正常运行统计</span>
            <div class="square_list">
              <div v-for="i in 5"></div>
            </div>
          </div>
          <my-echart-radar></my-echart-radar>
        </el-col>
      </el-col>
      <el-col :span="12">
        <el-col :span="24" class="box-item middle" id="floorBox">
          <my-floor></my-floor>
        </el-col>
        <el-col :span="24" class="box-item" id="tableBox">
          <div class="hightlight_line top_left"></div>
          <div class="hightlight_line top_right"></div>
          <div class="hightlight_line bottom_left"></div>
          <div class="hightlight_line bottom_right"></div>
          <el-table
            :data="tableData"
            class="board-table"
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
      <el-col :span="6" id="board-right">
        <el-col :span="24" class="box-item">
          <div class="hightlight_line top_left"></div>
          <div class="hightlight_line top_right"></div>
          <div class="hightlight_line bottom_left"></div>
          <div class="hightlight_line bottom_right"></div>
          <div class="box-item-title">
            <span class="title">事件处理率</span>
            <div class="square_list">
              <div v-for="i in 5"></div>
            </div>
          </div>
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
          <div class="box-item-title">
            <span class="title">监控在线统计</span>
            <div class="square_list">
              <div v-for="i in 5"></div>
            </div>
          </div>
          <my-echart-pie></my-echart-pie>
        </el-col>
        <el-col :span="24" class="box-item">
          <div class="hightlight_line top_left"></div>
          <div class="hightlight_line top_right"></div>
          <div class="hightlight_line bottom_left"></div>
          <div class="hightlight_line bottom_right"></div>
          <div class="box-item-title">
            <span class="title">隐患处理情况</span>
            <div class="square_list">
              <div v-for="i in 5"></div>
            </div>
          </div>
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
import MyEchartMeter from "@/views/board/MeterChart";
import MyEchartRadar from "@/views/board/RadarChart";
import MyFloor from "@/views/board/floor";
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
    resizeTable() {
      let _table = document.querySelector("#tableBox");
      let _height = _table.offsetHeight;
      this.tableHeight = _height;
    },
    initDateTime() {
      let date = new Date();
      let _day = date.getDate();
      let year = date.getFullYear();
      let _month = date.getMonth() + 1;
      let _hour = date.getHours();
      let _min = date.getMinutes();
      let _sec = date.getSeconds();
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
      _day = this.getNumFormat(_day);
      _month = this.getNumFormat(_month);
      _hour = this.getNumFormat(_hour);
      _min = this.getNumFormat(_min);
      _sec = this.getNumFormat(_sec);
      this.nowDate = `${year}-${_month}-${_day} ${_hour}:${_min}:${_sec}  ${w}`;
    },
    getNumFormat(num) {
      return num > 10 ? num : "0" + num;
    }
  },
  mounted() {
    this.initDateTime();
    setInterval(() => {
      this.initDateTime();
    }, 1000);
    window.addEventListener("resize", this.resizeTable);
  },
  components: {
    MyEchartGauge,
    MyEchartLine,
    MyEchartPie,
    MyEchartMeter,
    MyEchartRadar,
    MyFloor
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
.board-box {
  height: 100%;
  padding: 0 20px;
}
.board-box > div {
  height: calc(100% - 60px);
}
.box-item {
  height: calc((100% - 100px) / 3);
  margin-top: 10px;
  overflow: hidden;
}
.middle {
  height: calc((200% - 170px) / 3);
}
.detail-list {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
.detail-item {
  display: flex;
}
.detail-item.title {
  font-weight: bold;
}
.detail-item p {
  margin: 0;
  padding: 0;
}
.box-item {
  padding-left: 0 !important;
  padding-right: 0 !important;
  position: relative;
  border: 1px solid #1087b1;
  background-image: radial-gradient(#07133b, #071844, rgba(7, 38, 84, 0.8));
}
.detail-list {
  width: 45%;
  padding: 10px 20px;
  margin-top: 40px;
  color: #fff;
  box-shadow: inset 0px 0px 16px 6px #513c4b;
}
.detail-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  color: #fff;
  line-height: 25px;
}
.detail-item i {
  margin-right: 10px;
  color: #fff;
}
.detail-item p {
  color: #fff;
  font-size: 12px;
}
.detail-item span {
  font-size: 18px;
  margin-right: 5px;
}
.board-table {
  background: initial;
}
.board-table .board-table {
  background-color: initial;
}
.board-table .el-table th {
  padding: 0;
}
div[id^="rchart"] {
  height: 100%;
  width: 100%;
}
.board-top {
  width: 100%;
  display: flex;
  margin-bottom: 20px;
}
.top-title {
  background: #132962;
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
  overflow: hidden;
}
.box-item-title span {
  float: left;
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
  z-index: 10;
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
  z-index: 10;
}

.board-table.el-table tr {
  background: initial !important;
}
.board-table.el-table th {
  background: initial !important;
}
.board-table.el-table th,
.board-table.el-table td {
  text-align: center;
  color: #fff;
}
.el-row {
  height: 100%;
}
.board-table.el-table .el-table__row:hover td {
  background-color: rgba(9, 66, 161, 0.8) !important;
}
#floorBox {
  border: 0;
  box-shadow: initial;
  background: initial;
}
.board-table.el-table--border {
  border: 1px solid #096c7f;
}
.board-table.el-table th.is-leaf,
.board-table.el-table td {
  border-bottom: 1px solid #096c7f;
}
.board-table.el-table--border th,
.board-table.el-table--border td {
  border-right: 1px solid #096c7f;
}
.board-table .el-table__row:hover {
  background: initial;
}
.count {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.count_item {
  display: flex;
  align-items: center;
  justify-content: center;
}
.count_item + .count_item {
  margin-top: 20px;
}
.count_item span {
  font-size: 20px;
}
.count_item.danger .num {
  color: #e5790d;
}
.count_item.error .num {
  color: #e41f17;
}
.count_item .num {
  margin-left: 10px;
}
.count_item .count-icon {
  font-size: 30px;
  margin-right: 10px;
}
.count_item.danger .count-icon {
  color: #e5790d;
}
.count_item.error .count-icon {
  color: #e41f17;
}
.square.left {
  position: absolute;
  left: -320px;
  top: 60px;
  z-index: 40;
}
.square.right {
  position: absolute;
  right: -320px;
  top: 60px;
  z-index: 40;
}
.square.left > div {
  background: #fff;
  width: 8px;
  height: 15px;
  float: left;
  margin-right: 10px;
  transform: skew(45deg);
}
.square.right > div {
  background: #fff;
  width: 8px;
  height: 15px;
  float: left;
  margin-right: 10px;
  transform: skew(-45deg);
}
.square.left > div:nth-child(1),
.square.right > div:nth-child(15) {
  background: #081944;
}
.square.left > div:nth-child(2),
.square.right > div:nth-child(14) {
  background: #051d49;
}
.square.left > div:nth-child(3),
.square.right > div:nth-child(13) {
  background: #092554;
}
.square.left > div:nth-child(4),
.square.right > div:nth-child(12) {
  background: #012c57;
}
.square.left > div:nth-child(5),
.square.right > div:nth-child(11) {
  background: #073664;
}
.square.left > div:nth-child(6),
.square.right > div:nth-child(10) {
  background: #0a3263;
}
.square.left > div:nth-child(7),
.square.right > div:nth-child(9) {
  background: #073664;
}
.square.left > div:nth-child(8),
.square.right > div:nth-child(8) {
  background: #064278;
}
.square.left > div:nth-child(9),
.square.right > div:nth-child(7) {
  background: #025b87;
}
.square.left > div:nth-child(10),
.square.right > div:nth-child(6) {
  background: #075c95;
}
.square.left > div:nth-child(11),
.square.right > div:nth-child(5) {
  background: #07659b;
}
.square.left > div:nth-child(12),
.square.right > div:nth-child(4) {
  background: #0570a6;
}
.square.left > div:nth-child(13),
.square.right > div:nth-child(3) {
  background: #0375a9;
}
.square.left > div:nth-child(14),
.square.right > div:nth-child(2) {
  background: #007fb4;
}
.square.left > div:nth-child(15),
.square.right > div:nth-child(1) {
  background: #0487bf;
}
.square_list {
  float: left;
  overflow: hidden;
  margin-left: 20px;
  padding-left: 8px;
}
.square_list > div {
  background: #fff;
  width: 8px;
  height: 15px;
  float: left;
  margin-right: 8px;
  transform: skew(-30deg);
}
.square_list > div:first-child {
  background: #02b6f3;
}
.square_list > div:nth-child(2) {
  background: #019ade;
}
.square_list > div:nth-child(3) {
  background: #0a7fb3;
}
.square_list > div:nth-child(4) {
  background: #006597;
}
.square_list > div:nth-child(5) {
  background: #004776;
}
.main_title {
  display: block;
  width: 100%;
  text-align: center;
  color: #01bbff;
  font-size: 30px;
  font-weight: bold;
}
.top-title {
  padding: 20px 0;
  position: relative;
}
.top-title::before {
  content: "";
  position: absolute;
  top: 40px;
  right: 0;
  display: block;
  width: 0;
  height: 0;
  border-bottom: 80px solid #071748;
  border-left: 80px solid transparent;
  z-index: 20;
}
.top-title::after {
  content: "";
  position: absolute;
  display: block;
  top: 40px;
  left: 0;
  width: 0;
  height: 0;
  border-bottom: 80px solid #071748;
  border-right: 80px solid transparent;
  z-index: 20;
}
.date_time {
  display: block;
  width: 100%;
  text-align: center;
  color: #4b95c2;
  font-size: 22px;
  margin-top: 10px;
}
.board-top-left {
  width: 100%;
  height: 40px;
  background: linear-gradient(to right, #071748, #132962);
}
.board-top-right {
  width: 100%;
  height: 40px;
  background: linear-gradient(to right, #132962, #071748);
  position: relative;
}
.rectangle_left {
  position: absolute;
  bottom: -10px;
  left: 60px;
  width: 50px;
  height: 10px;
  background: #132962;
  z-index: 10;
}
.rectangle_left::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  display: block;
  width: 0;
  height: 0;
  border-bottom: 10px solid #071748;
  border-left: 10px solid transparent;
  z-index: 20;
}
.rectangle_right {
  position: absolute;
  bottom: -10px;
  right: 60px;
  width: 50px;
  height: 10px;
  background: #132962;
  z-index: 10;
}
.rectangle_right::before {
  content: "";
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  border-bottom: 10px solid #071748;
  border-right: 10px solid transparent;
  z-index: 20;
}
.detail-box {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.platform-dropdown {
  position: absolute;
  right: 50px;
  height: 40px;
  line-height: 40px;
  cursor: pointer;
}
.platform-dropdown .el-dropdown-link {
  color: #fff;
}
.platform-dropdown .el-icon--right {
  margin-left: 0;
}
.gradient_line {
  position: absolute;
  left: 50%;
  margin-left: -200px;
  top: 105px;
  width: 400px;
  height: 4px;
  background: -webkit-linear-gradient(left, #132962, #04d4f0, #04d4f0, #132962);
  background: -o-linear-gradient(left, #132962, #04d4f0, #04d4f0, #132962);
  background: -moz-linear-gradient(left, #132962, #04d4f0, #04d4f0, #132962);
  background: -ms-linear-gradient(left, #132962, #04d4f0, #04d4f0, #132962);
}
/* 动画 */
#board-left {
  animation: fadeInLeft 2s ease 0s 1 both;
}
#board-right {
  animation: fadeInRight 2s ease 0s 1 both;
}
#tableBox {
  animation: fadeInUp 2s ease 0s 1 both;
}
#floorBox {
  animation: fadeIn 2s ease 0s 1 both;
}
</style>