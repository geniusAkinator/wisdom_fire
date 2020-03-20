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
          <div v-for="i in 15" :key="i"></div>
        </div>
        <div class="square right">
          <div v-for="i in 15" :key="i"></div>
        </div>
        <div class="gradient_line"></div>
      </div>
      <div class="el-col el-col-7">
        <div class="board-top-right">
          <div class="platform-dropdown">
            <el-dropdown @command="switchFactory" v-if="factoryName!=''">
              <span class="el-dropdown-link">
                {{factoryName}}
                <i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="(item,index) in factoryList"
                  :command="item.id"
                  :key="index"
                >{{item.name}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>/
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                {{userName}}
                <i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
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
              <div v-for="i in 5" :key="i"></div>
            </div>
          </div>
          <el-row style="width:100%">
            <el-col :span="11" style="height:100%">
              <my-echart-meter :data="meterData" :key="meterKey"></my-echart-meter>
            </el-col>
            <el-col :span="13" style="height:100%;position:relative">
              <el-radio-group v-model="labelPoint" class="point_btn_group" size="small">
                <el-radio-button :label="1">周</el-radio-button>
                <el-radio-button :label="2">月</el-radio-button>
                <el-radio-button :label="3">年</el-radio-button>
              </el-radio-group>
              <my-echart-line :chartData="weeklyPointData" :key="wkey" v-if="labelPoint == 1"></my-echart-line>
              <my-echart-line :chartData="monthlyPointData" :key="mkey" v-if="labelPoint == 2"></my-echart-line>
              <my-echart-line :chartData="yearlyPointData" :key="ykey" v-if="labelPoint == 3"></my-echart-line>
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
              <div v-for="i in 5" :key="i"></div>
            </div>
          </div>
          <div class="detail-box">
            <ul class="detail-list">
              <li class="detail-item title">
                <p>
                  今日隐患
                  <span>{{this.totalHazard}}个</span>
                </p>
              </li>
              <li class="detail-item">
                <i class="el-icon-time"></i>
                <p>
                  待处理
                  <span>{{this.waitHazard}}个</span>
                </p>
              </li>
              <li class="detail-item">
                <i class="el-icon-stopwatch"></i>
                <p>
                  处理中
                  <span>{{this.processingHazard}}个</span>
                </p>
              </li>
              <li class="detail-item">
                <i class="el-icon-stopwatch"></i>
                <p>
                  已完成
                  <span>{{this.solvedHazard}}个</span>
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
              <div v-for="i in 5" :key="i"></div>
            </div>
          </div>
          <my-echart-radar :data="radarData" :key="radarKey" v-if="radarData.indicator.length"></my-echart-radar>
        </el-col>
      </el-col>
      <el-col :span="12">
        <el-col :span="24" class="box-item middle" id="floorBox">
          <my-building :data="buildingData" v-if="buildingData.length"></my-building>
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
            <el-table-column prop="createDateTime" label="时间">
              <template slot-scope="scope">
                <span
                  v-if="scope.row.createDateTime"
                >{{ parseTime(scope.row.createDateTime,"{y}-{m}-{d}") }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="factoryName" label="传感器位置"></el-table-column>
            <el-table-column prop="name" label="类型"></el-table-column>
            <el-table-column prop="deviceStatus" label="状态">
              <template slot-scope="scope">
                <span>{{scope.row.deviceStatus==0?'正常':'异常'}}</span>
              </template>
            </el-table-column>
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
              <div v-for="i in 5" :key="i"></div>
            </div>
          </div>
          <el-row>
            <el-col
              :span="24"
              style="height:100%;display:flex;justify-content:center;align-items: center;"
            >
              <my-echart-gauge :color="color1" :data="gauge1" :key="gaugeKey1"></my-echart-gauge>
            </el-col>
            <!-- <el-col :span="12" style="height:100%">
              <my-echart-gauge :color="color2" :data="gauge2" :key="gaugeKey2"></my-echart-gauge>
            </el-col>-->
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
              <div v-for="i in 5" :key="i"></div>
            </div>
          </div>
          <my-echart-pie :data="pieData" :key="pieKey"></my-echart-pie>
        </el-col>
        <el-col :span="24" class="box-item">
          <div class="hightlight_line top_left"></div>
          <div class="hightlight_line top_right"></div>
          <div class="hightlight_line bottom_left"></div>
          <div class="hightlight_line bottom_right"></div>
          <div class="box-item-title">
            <span class="title">隐患处理情况</span>
            <div class="square_list">
              <div v-for="i in 5" :key="i"></div>
            </div>
          </div>
          <my-echart-line :chartData="yearData" :key="yearKey"></my-echart-line>
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
import MyBuilding from "@/views/board/building";
import {
  getHazardResult,
  getEventDoneRate,
  getSensorData,
  getOnlineRate,
  getNormalEquipment,
  getHandleDetail,
  getBuildingDetail,
  getHealthPoint
} from "@/api/platform/board";
import { listFactory } from "@/api/main/factory";
export default {
  data() {
    return {
      tableData: [],
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
        value: 0
      },
      gauge2: {
        label: "本周故障及时处理率",
        value: 0
      },
      form: {
        id: 1
      },
      bform: {
        id: 1 //工厂id
      },
      yearData: {
        legend: ["已解决数", "隐患总数"],
        xdata: [], //横坐标的值
        ydata: [[], []] //纵坐标的值
      },
      weeklyPointData: {
        legend: ["安全评分"],
        xdata: [], //横坐标的值
        ydata: [[]] //纵坐标的值
      },
      monthlyPointData: {
        legend: ["安全评分"],
        xdata: [], //横坐标的值
        ydata: [[]] //纵坐标的值
      },
      yearlyPointData: {
        legend: ["安全评分"],
        xdata: [], //横坐标的值
        ydata: [[]] //纵坐标的值
      },
      pieData: [],
      radarData: {
        indicator: [],
        value: [0, 10, 10]
      },
      meterData: 0,
      meterKey: 0,
      yearKey: 1,
      gaugeKey1: 2,
      gaugeKey2: 3,
      pieKey: 4,
      radarKey: 5,
      wkey: 7,
      mkey: 8,
      ykey: 9,
      totalHazard: 0,
      waitHazard: 0,
      processingHazard: 0,
      solvedHazard: 0,
      userName: this.$store.getters.name,
      factoryList: [],
      factoryName: "",
      factoryId: 0,
      buildingData: [],
      labelPoint: 1
    };
  },
  watch: {
    factoryList(nVal, oVal) {
      let _this = this;
      if (nVal.length) {
        _this.factoryName = nVal[0].name;
        _this.factoryId = nVal[0].id;
      }
    },
    factoryId(nVal, oVal) {
      let _this = this;
      _this.getBuilding();
      _this.getHealthPointList();
    }
  },
  methods: {
    resizeTable() {
      let _this = this;
      let _table = document.querySelector("#tableBox");
      let _height = _table.offsetHeight;
      _this.tableHeight = _height;
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
      return num >= 10 ? num : "0" + num;
    },
    getHazardResultList() {
      let _this = this;
      getHazardResult().then(response => {
        if (response.code == 200) {
          let _data = response.data;
          let _xdata = [
            "一月",
            "二月",
            "三月",
            "四月",
            "五月",
            "六月",
            "七月",
            "八月",
            "九月",
            "十月",
            "十一月",
            "十二月"
          ];
          let _allList = [...Array(_xdata.length)].map(_ => 0);
          let _doneList = [...Array(_xdata.length)].map(_ => 0);
          _xdata.map((xitem, i) => {
            _data.hiddenDangerSum.map((item, j) => {
              let _month = item.yearly.split("-")[1] * 1;
              if (i == _month) {
                _allList[i] = item.count;
              }
            });
            _data.hiddenDangerOverSum.map((item, j) => {
              let _month = item.yearly.split("-")[1] * 1;
              if (i == _month) {
                _doneList[i] = item.count;
              }
            });
          });
          _this.yearData.xdata = _xdata;
          _this.yearData.ydata[0] = _doneList;
          _this.yearData.ydata[1] = _allList;
          console.log(_this.yearData);
          _this.yearKey++;
        }
      });
    },
    getEventDoneRateList() {
      let _this = this;
      getEventDoneRate().then(response => {
        if (response.code == 200) {
          let _data = response.data;
          _this.gauge1.value = _data.dangerPercentage.dangerPercentage * 1;
          _this.gauge2.value = _data.faultPercentage.faultPercentage * 1;
          ++this.gaugeKey1;
          ++this.gaugeKey2;
        }
      });
    },
    getSensorList() {
      let _this = this;
      getSensorData().then(response => {
        if (response.code == 200) {
          let _data = response.data;
          _this.tableData = _data;
        }
      });
    },
    getOnlineRateList() {
      let _this = this;
      getOnlineRate().then(response => {
        if (response.code == 200) {
          let _data = response.data;
          let _arr = [];
          _data.map((item, i) => {
            let temp = {};
            if (item.deviceStatus == 0) {
              temp.name = "离线";
            } else if (item.deviceStatus == 1) {
              temp.name = "在线";
            }
            temp.value = item.count;
            _arr.push(temp);
          });
          _this.pieData = _arr;
          ++_this.pieKey;
        }
      });
    },
    getNormalEquipmentList() {
      let _this = this;
      getNormalEquipment().then(response => {
        if (response.code == 200) {
          let _data = response.data;
          let _arr1 = [];
          let _arr2 = [];
          _data.map((item, i) => {
            let temp = {};
            temp.text = item.name;
            temp.max = item.countSum;
            _arr1.push(temp);
            _arr2.push(item.count);
          });
          _this.radarData.value = _arr2;
          _this.radarData.indicator = _arr1;
          ++_this.radarKey;
        }
      });
    },
    getHandleDetailList() {
      let _this = this;
      getHandleDetail().then(response => {
        if (response.code == 200) {
          let _data = response.data;
          _data.map((item, i) => {
            if (item.state == 0) {
              this.waitHazard = item.count;
            } else if (item.state == 1) {
              this.processingHazard = item.count;
            } else if (item.state == 2) {
              this.solvedHazard = item.count;
            }
            this.totalHazard = this.totalHazard + item.count;
          });
        }
      });
    },
    getFactoryList() {
      let _this = this;
      listFactory().then(response => {
        if (response.code == 200) {
          let _data = response.rows;
          let _arr = [];
          _data.map((item, i) => {
            let temp = {};
            temp.id = item.factoryId;
            temp.name = item.factoryName;
            _arr.push(temp);
          });
          _this.factoryList = _arr;
        }
      });
    },
    getBuilding() {
      let _this = this;
      getBuildingDetail({ factoryIds: _this.factoryId }).then(response => {
        if (response.code == 200) {
          let _data = response.data;
          _this.buildingData = _data;
        }
      });
    },
    getHealthPointList() {
      let _this = this;
      console.log(_this.factoryId);
      getHealthPoint({ factoryId: _this.factoryId }).then(response => {
        if (response.code == 200) {
          let _data = response.data;
          let _xdata1 = [
            "周日",
            "周一",
            "周二",
            "周三",
            "周四",
            "周五",
            "周六"
          ]; //周xdata
          let _xdata3 = [
            "一月",
            "二月",
            "三月",
            "四月",
            "五月",
            "六月",
            "七月",
            "八月",
            "九月",
            "十月",
            "十一月",
            "十二月"
          ];
          let d = new Date();
          let nYear = d.getFullYear(); //当前年
          let nMonth = d.getMonth() + 1; //当前月
          let base = new Date(nYear, nMonth, 0);
          let days = base.getDate(); //获取天数
          let _xdata2 = [];
          let _ydataList2 = [];
          for (let i = 1; i <= days; i++) {
            _xdata2.push(i);
            _ydataList2.push(0);
          }
          let _ydataList1 = [...Array(_xdata1.length)].map(_ => 0);
          let _ydataList3 = [...Array(_xdata3.length)].map(_ => 0);
          let _wlist = _data.weeklyPointList;
          let _mlist = _data.monthsPointList;
          let _ylist = _data.yearlyPointList;
          let _point = _data.percentage;
          _this.meterData = _point; //健康指数赋值

          _xdata1.map((xitem, i) => {
            //周
            _wlist.map((item, j) => {
              if (xitem == item.weekly) {
                _ydataList1[i] = item.percentage;
              }
            });
          });
          _xdata2.map((xitem, i) => {
            _mlist.map((item, j) => {
              let _day = item.monthly.split("-")[2] * 1;
              let index = i + 1;
              if (index == _day) {
                _ydataList2[i] = item.percentage;
              }
            });
          });
          _xdata3.map((xitem, i) => {
            //年
            _ylist.map((item, j) => {
              let _month = item.yearly.split("-")[1] * 1;
              if (i == _month) {
                _ydataList3[i] = item.percentage;
              }
            });
          });
          console.log(_ydataList1);
          // _this.weekData.xdata = _weeklyAllList
          _this.weeklyPointData.xdata = _xdata1;
          _this.weeklyPointData.ydata[0] = _ydataList1;
          _this.monthlyPointData.xdata = _xdata2;
          _this.monthlyPointData.ydata[0] = _ydataList2;
          _this.yearlyPointData.xdata = _xdata3;
          _this.yearlyPointData.ydata[0] = _ydataList3;
          console.log("aaa", _this.yearlyPointData);
          ++_this.meterKey;
          ++_this.wkey;
          ++_this.mkey;
          ++_this.ykey;
          console.log(response);
        }
      });
    },
    logout() {
      console.log("dafas");
      this.$confirm("确定注销并退出系统吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$store.dispatch("LogOut").then(() => {
          location.reload();
        });
      });
    },
    handleCommand(command) {
      if (command == "logout") {
        this.logout();
      }
    },
    switchFactory(command) {
      let _this = this;
      _this.factoryId = command;
    }
  },

  mounted() {
    let _this = this;
    _this.initDateTime();
    setInterval(() => {
      _this.initDateTime();
    }, 1000);
    _this.getHazardResultList();
    _this.getEventDoneRateList();
    _this.getSensorList();
    _this.getOnlineRateList();
    _this.getNormalEquipmentList();
    _this.getHandleDetailList();
    _this.getFactoryList();
    _this.$nextTick(() => {
      window.addEventListener("resize", _this.resizeTable);
    });
  },
  components: {
    MyEchartGauge,
    MyEchartLine,
    MyEchartPie,
    MyEchartMeter,
    MyEchartRadar,
    MyBuilding
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
}
.middle {
  height: calc((200% - 170px) / 3);
}
.detail-item {
  display: flex;
}
.detail-item p {
  margin: 0;
  padding: 0;
  font-size: 14px;
}
.box-item {
  padding-left: 0 !important;
  padding-right: 0 !important;
  position: relative;
  border: 1px solid #1087b1;
  background-image: radial-gradient(#07133b, #071844, rgba(7, 38, 84, 0.8));
}
.detail-list {
  list-style-type: none;
  margin: 0;
  padding: 0;
  width: 45%;
  height: calc(100% - 70px);
  padding: 10px 20px;
  margin-top: 40px;
  color: #fff;
  box-shadow: inset 0px 0px 16px 6px #513c4b;
}
.detail-item {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
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
  display: flex;
  width: 100%;
}
.detail-item p span {
  font-size: 18px;
  margin-left: auto;
  color: #02addb;
}
.detail-item.title p {
  font-size: 20px;
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
.board-table.el-table::before {
  background-color: initial;
}
.board-table.el-table--border::after {
  background-color: initial;
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
  position: relative;
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
  padding: 5px;
}
.count_item.danger .count-icon {
  color: #fff;
}
.count_item.error .count-icon {
  color: #fff;
}
.triangle_mark + svg {
  position: absolute;
  left: -2px;
  top: -1px;
  z-index: 99;
}
.circle_mark {
  border-radius: 50%;
  background: #e5790d;
  margin-right: 10px;
}

.triangle_mark {
  position: relative;
  background-color: #e41f17;
  text-align: left;
  margin-right: 18px;
  margin-left: 4px;
}
.triangle_mark:before,
.triangle_mark:after {
  content: "";
  position: absolute;
  background-color: inherit;
}
.triangle_mark,
.triangle_mark:before,
.triangle_mark:after {
  width: 18px;
  height: 18px;
  border-top-right-radius: 30%;
}

.triangle_mark {
  transform: rotate(-60deg) skewX(-30deg) scale(1, 0.866);
}
.triangle_mark:before {
  transform: rotate(-135deg) skewX(-45deg) scale(1.414, 0.707)
    translate(0, -50%);
}
.triangle_mark:after {
  transform: rotate(135deg) skewY(-45deg) scale(0.707, 1.414) translate(50%);
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
  width: 6px;
  height: 15px;
  float: left;
  margin-right: 6px;
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
  height: 100%;
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
.point_btn_group {
  position: absolute;
  z-index: 99;
  left: 0;
  top: 5px;
  height: 28px;
}
.point_btn_group .el-radio-button--small .el-radio-button__inner {
  padding: 7px 15px;
}
.point_btn_group .el-radio-button__inner {
  height: 28px;
}
.point_btn_group .el-radio-button__inner {
  background: initial;
  color: #fff;
}
.point_btn_group
  .el-radio-button__orig-radio:checked
  + .el-radio-button__inner {
  background: #093a90;
}
.point_btn_group .el-table--medium td {
  padding: 4px 0;
}
</style>