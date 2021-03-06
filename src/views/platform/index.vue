<template>
  <div class="container platform">
    <div class="platform-top">
      <div class="el-col el-col-7">
        <div class="platform-top-left"></div>
      </div>
      <div class="el-col el-col-10" style="position:relative">
        <div class="platform-top-title">
          <span class="main_title">阿米华晟安中云数据平台</span>
          <span class="date_time">{{nowDate}}</span>
        </div>
        <div class="rectangle left">
          <div v-for="i in 8" :key="i"></div>
        </div>
        <div class="rectangle right">
          <div v-for="i in 8" :key="i"></div>
        </div>
        <div class="gradient_line"></div>
      </div>
      <div class="el-col el-col-7">
        <div class="platform-top-right"></div>
      </div>
    </div>
    <el-row :gutter="10" class="platform-box">
      <el-col :span="6">
        <div class="echart-item">
          <div class="inner">
            <div class="item-title">
              <span>在线统计</span>
            </div>
            <div style="height:100%;width:50%;float:left">
              <my-echart-gauge :color="color1" :chartData="gauge1"></my-echart-gauge>
            </div>
            <div style="height:100%;width:50%;float:left">
              <my-echart-gauge :color="color2" :chartData="gauge2"></my-echart-gauge>
            </div>
          </div>
        </div>
        <div class="echart-item">
          <div class="inner">
            <div class="item-title">
              <span>高频异常设备排名</span>
            </div>
            <my-echart-rose :chartData="rateData"></my-echart-rose>
          </div>
        </div>
        <div class="echart-item" id="tableContent">
          <div class="inner">
            <div class="item-title">
              <span>设备故障事件中心</span>
            </div>
            <el-table
              :data="errData"
              class="platform-table"
              :max-height="tableHeight"
              style="width: 100%"
            >
              <el-table-column prop="factoryName" label="单位名称" align="center"></el-table-column>
              <el-table-column prop="currlocation" label="位置" align="center"></el-table-column>
              <el-table-column prop="type" label="状态" align="center"></el-table-column>
              <el-table-column prop="currdate" label="时间" align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.currdate">{{ parseTime(scope.row.currdate,"{y}-{m}-{d}") }}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <my-echart-map class="platform-map"></my-echart-map>
      </el-col>
      <el-col :span="6">
        <div class="echart-item">
          <div class="inner">
            <div class="item-title">
              <span>高频隐患类型排名</span>
            </div>
            <my-echart-rose :chartData="typeRankData"></my-echart-rose>
          </div>
        </div>
        <div class="echart-item">
          <div class="inner">
            <div class="item-title">
              <span>重大隐患单位排名</span>
            </div>
            <el-table
              :data="rankData"
              class="platform-table"
              :max-height="tableHeight"
              style="width: 100%"
            >
              <el-table-column prop="factoryName" label="单位名称" align="center"></el-table-column>
              <el-table-column prop="count" label="隐患数量" align="center"></el-table-column>
            </el-table>
          </div>
        </div>
        <div class="echart-item">
          <div class="inner">
            <div class="item-title">
              <span>隐患处理情况</span>
            </div>
            <el-radio-group v-model="labelHazard" class="hazard_btn_group" size="small">
              <el-radio-button :label="1">周</el-radio-button>
              <el-radio-button :label="2">月</el-radio-button>
              <el-radio-button :label="3">年</el-radio-button>
            </el-radio-group>
            <my-echart-line :chartData="weekData" v-if="labelHazard == 1"></my-echart-line>
            <my-echart-range :chartData="monthData" v-if="labelHazard == 2"></my-echart-range>
            <my-echart-line :chartData="yearData" v-if="labelHazard == 3"></my-echart-line>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template> 

<script>
import MyEchartGauge from "@/views/platform/GaugeChart";
import MyEchartRose from "@/views/platform/RoseChart";
import MyEchartLine from "@/views/platform/LineChart";
import MyEchartMap from "@/views/platform/MapChart";
import MyEchartRange from "@/views/platform/RangeChart";
import { parseTimeStr, parseTime } from "@/utils/common";
import {
  getWeekly,
  getMonthly,
  getYearly,
  getHazardUnitsRank,
  getHazardTypesRank,
  getErrRank,
  getOnlineRate
} from "@/api/platform/platform";
import CountTo from "vue-count-to";
export default {
  data() {
    return {
      labelHazard: 3,
      rankData: [],
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
      rateData: [
        { value: 5, name: "二氧化碳" },
        { value: 5, name: "烟感" },
        { value: 15, name: "电气" },
        { value: 4, name: "水深" }
      ],
      errData: [],
      typeRankData: [],
      typeList: [],
      weekData: {
        legend: ["隐患总数", "已解决数"],
        xdata: [], //横坐标的值
        ydata: [] //纵坐标的值
      },
      monthData: {
        legend: ["隐患总数", "已解决数"],
        xdata: [], //横坐标的值
        ydata: [] //纵坐标的值
      },
      yearData: {
        legend: ["隐患总数", "已解决数"],
        xdata: [], //横坐标的值
        ydata: [] //纵坐标的值
      },
      monthList: {},
      tableHeight: "250",
      nowDate: ""
    };
  },
  watch: {
    typeList: function() {
      this.getTypesRankList();
    }
  },
  methods: {
    resizeTable() {
      let _table = document.querySelector("#tableContent");
      let _height = _table.offsetHeight - 40;
      this.tableHeight = _height;
    },
    getWeeklyList() {
      getWeekly().then(response => {
        if (response.code == 200) {
          let _data = response.data;
          let _xdata = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
          let _allList = [...Array(_xdata.length)].map(_ => 0);
          let _doneList = [...Array(_xdata.length)].map(_ => 0);
          _xdata.map((xitem, i) => {
            _data.map((item, j) => {
              if (xitem == item.weekly && item.state == "2") {
                _doneList[i] = item.count;
              }
              if (xitem == item.weekly) {
                _allList[i] = _allList[i] + item.count;
              }
            });
          });
          this.weekData.xdata = _xdata;
          this.weekData.ydata.push(_allList);
          this.weekData.ydata.push(_doneList);
        }
      });
    },
    getMonthlyList() {
      getMonthly().then(response => {
        if (response.code == 200) {
          let _data = response.data;
          let d = new Date();
          let nYear = d.getFullYear(); //当前年
          let nMonth = d.getMonth() + 1; //当前月
          let base = new Date(nYear, nMonth, 0);
          let days = base.getDate(); //获取天数
          let _xdata = [];
          let _allList = [];
          let _doneList = [];
          for (let i = 1; i <= days; i++) {
            _xdata.push(i);
            _allList.push(0);
            _doneList.push(0);
          }
          _xdata.map((xitem, i) => {
            _data.map((item, j) => {
              let _day = item.monthly.split("-")[2] * 1;
              let index = i + 1;
              if (index == _day && item.state == "2") {
                _doneList[i] = item.count;
              }
              if (index == _day) {
                _allList[i] = _allList[i] + item.count;
              }
            });
          });
          this.monthData.xdata = _xdata;
          this.monthData.ydata.push(_allList);
          this.monthData.ydata.push(_doneList);
        }
      });
    },
    getYearlyList() {
      getYearly().then(response => {
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
            _data.map((item, j) => {
              let _month = item.yearly.split("-")[1] * 1;
              if (i == _month && item.state == "2") {
                _doneList[i] = item.count;
              }
              if (i == _month) {
                _allList[i] = _allList[i] + item.count;
              }
            });
          });
          this.yearData.xdata = _xdata;
          this.yearData.ydata.push(_allList);
          this.yearData.ydata.push(_doneList);
        }
      });
    },
    getUnitsRankList() {
      //重大隐患单位排名
      getHazardUnitsRank().then(response => {
        if (response.code == 200) {
          let _data = response.data;
          let _list = [];
          _data.map((item, i) => {
            let temp = {};
            temp.id = i + 1;
            if (item.factoryName != null) {
              temp.factoryName = item.factoryName;
              temp.count = item.count;
              _list.push(temp);
            }
          });
          this.rankData = _list;
        }
      });
    },
    getTypesRankList() {
      getHazardTypesRank().then(response => {
        if (response.code == 200) {
          let _data = response.data;
          let _list = [];
          let _tlist = this.typeList;
          _data.map((item, i) => {
            let temp = {};
            temp.value = item.count;
            _tlist.map((tItem, j) => {
              if (item.type == tItem.dictValue) {
                temp.name = tItem.dictLabel;
              }
            });
            _list.push(temp);
          });
          this.typeRankData = _list;
        }
      });
    },
    getErrRankList() {
      getErrRank().then(response => {
        if (response.code == 200) {
          let _data = response.data;
          this.errData = _data;
        }
      });
    },
    getOnlinePercentage() {
      getOnlineRate().then(response => {
        if (response.code == 200) {
          this.gauge1.value = response.data.dangerPercentage.split("%")[0] * 1;
          this.gauge2.value = response.data.faultPercentage.split("%")[0] * 1;
        }
      });
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
    }
  },
  mounted() {
    this.getDicts("sys_type_hidden").then(response => {
      if (response.code == 200) {
        let _data = response.data;
        let _list = [];
        _data.map((item, i) => {
          let temp = {};
          temp.dictLabel = item.dictLabel;
          temp.dictValue = item.dictValue;
          _list.push(temp);
        });
        this.typeList = _list;
      }
    });
    this.getWeeklyList();
    this.getMonthlyList();
    this.getYearlyList();
    this.getUnitsRankList();
    this.getErrRankList();
    this.getOnlinePercentage();
    this.resizeTable();
    window.addEventListener("resize", this.resizeTable);
    this.initDateTime();
    setInterval(() => {
      this.initDateTime();
    }, 1000);
  },
  components: {
    MyEchartGauge,
    MyEchartRose,
    MyEchartLine,
    MyEchartMap,
    MyEchartRange,
    CountTo
  }
};
</script>

<style lang="scss">
$bgColor: #061436;
$font-color: #888;
$item-bgColor: rgba(
  $color: lighten($bgColor, 20%),
  $alpha: 0.5
);
$item-alpha: 0.5;
$top-item-width: 500px;
$top-item-height: 100px;
$top-item-top: 30px;
$border-radius: 4px;
@mixin border-radius($radius) {
  border-radius: $radius;
  -ms-border-radius: $radius;
  -moz-border-radius: $radius;
  -webkit-border-radius: $radius;
}
.container {
  &.platform {
    width: 100%;
    height: 100%;
    min-width: 1500px;
    min-height: 800px;
    overflow: hidden;
    background: $bgColor;
    position: relative;
    color: $font-color;
    padding: 0;
    .platform-box {
      height: 100%;
      padding: 0 20px;
      & > div {
        height: calc(100% - 160px);
      }
    }
    .el-row {
      height: 100%;
    }
    .pla-top {
      z-index: 11;
    }
    .echart-item {
      height: 33.3%;
      position: relative;
      .hazard_btn_group {
        position: absolute;
        z-index: 99;
        top: 10px;
        left: 150px;
        height: 28px;
        .el-radio-button--small .el-radio-button__inner {
          padding: 7px 15px;
        }
        .el-radio-button__inner {
          height: 28px;
        }
      }
      .item-title {
        position: absolute;
        left: 20px;
        top: 15px;
        color: #fff;
        font-weight: bold;
        // text-shadow: 0 0 4px #fff;
      }
      .platform-table {
        background: initial !important;
        width: 90% !important;
        margin: auto;
        margin-top: 25px;
        &::before {
          background: initial;
        }
        th {
          padding: 0;
          background: initial !important;
          color: #fff !important;
          border-bottom: initial;
        }
        tr {
          background: initial !important;
          color: #fff;
        }
        .el-table__row:hover td {
          background-color: rgba(9, 66, 161, 0.8) !important;
        }
        td {
          border-bottom: initial;
        }
      }
      .el-radio-button__inner {
        background: initial;
        color: #fff;
      }
      .el-radio-button__orig-radio:checked + .el-radio-button__inner {
        background: #093a90;
      }
      .el-table--medium td {
        padding: 4px 0;
      }
    }
  }
}
.platform-top-left {
  width: 100%;
  height: 20px;
  background: linear-gradient(to right, #071748, #0c3463);
  border-right: 0;
}
.platform-top-right {
  width: 100%;
  height: 20px;
  background: linear-gradient(to right, #0c3463, #071748);
  border-left: 0;
}
.platform-top {
  width: 100%;
  display: flex;
  margin-bottom: 20px;
}
.platform-top-title {
  padding: 20px 0;
  position: relative;
  background: #0c3463;
}
.platform-top-title .main_title {
  display: block;
  width: 100%;
  text-align: center;
  color: #01bbff;
  font-size: 30px;
  font-weight: bold;
}

.platform-top-title::after {
  content: "";
  position: absolute;
  top: 20px;
  right: 0;
  display: block;
  width: 0;
  height: 0;
  border-bottom: 90px solid #061436;
  border-left: 90px solid transparent;
  z-index: 20;
}
.platform-top-title::before {
  content: "";
  position: absolute;
  display: block;
  top: 20px;
  left: 0;
  width: 0;
  height: 0;
  border-bottom: 90px solid #061436;
  border-right: 90px solid transparent;
  z-index: 20;
}
.echart-item {
  border: 2px solid #fff;
  border-image: url("../../assets/image/border.png") 51 38 21 132;
  border-width: 2.125rem 1.583rem 0.875rem 5.5rem;
  margin-top: 10px;
}
.echart-item > .inner {
  position: absolute;
  top: -2.125rem;
  right: -1.583rem;
  bottom: -0.875rem;
  left: -5.5rem;
  z-index: 99;
}
.date_time {
  display: block;
  width: 100%;
  text-align: center;
  color: #4b95c2;
  font-size: 22px;
  margin-top: 10px;
}
.rectangle.left {
  position: absolute;
  left: -130px;
  top: 30px;
  z-index: 40;
  overflow: hidden;
  padding-right: 60px;
}
.rectangle.right {
  position: absolute;
  right: -130px;
  top: 30px;
  z-index: 40;
  overflow: hidden;
  padding-left: 60px;
}
.rectangle > div {
  width: 8px;
  height: 15px;
  background: #fff;
}
.rectangle.left > div {
  margin-left: 10px;
  float: left;
  transform: skew(45deg);
}
.rectangle.right > div {
  margin-right: 10px;
  float: left;
  transform: skew(-45deg);
}
.rectangle > div:nth-child(2) {
  height: 15px;
}
@for $i from 1 to 9 {
  .rectangle.left > div:nth-child(#{$i}) {
    height: #{(15 + $i * 5)}px;
  }
  .rectangle.right > div:nth-child(#{$i}) {
    height: #{(55 - $i * 5)}px;
  }
}
.rectangle.left > div:nth-child(1),
.rectangle.right > div:nth-child(8) {
  background: #2a4d6a;
}
.rectangle.left > div:nth-child(2),
.rectangle.right > div:nth-child(7) {
  background: #34607f;
}
.rectangle.left > div:nth-child(3),
.rectangle.right > div:nth-child(6) {
  background: #3c7493;
}
.rectangle.left > div:nth-child(4),
.rectangle.right > div:nth-child(5) {
  background: #4489a8;
}
.rectangle.left > div:nth-child(5),
.rectangle.right > div:nth-child(4) {
  background: #4d9ebe;
}
.rectangle.left > div:nth-child(6),
.rectangle.right > div:nth-child(3) {
  background: #56b0d3;
}
.rectangle.left > div:nth-child(7),
.rectangle.right > div:nth-child(2) {
  background: #60c5e9;
}
.rectangle.left > div:nth-child(8),
.rectangle.right > div:nth-child(1) {
  background: #68dbfe;
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
.echart-top-item {
  width: 200px;
  margin-top: 10px;
  text-align: center;
  padding: 10px;
  background: #1b2e5b;
  border: #0281da 1px solid;
}
.echart-top-item .top-item-title {
  color: #01bbff;
  font-size: 18px;
  font-weight: bold;
}
.echart-top-item .card-panel-num {
  color: #01bbff;
  font-size: 18px;
  font-weight: bold;
}
</style>
