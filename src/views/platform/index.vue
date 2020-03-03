<template>
  <div class="container platform">
    <div class="platform-left">
      <div class="echart-item">
        <div class="item-title">在线统计</div>
        <el-row>
          <el-col :span="12" style="height:100%">
            <my-echart-gauge :color="color1" :data="gauge1"></my-echart-gauge>
          </el-col>
          <el-col :span="12" style="height:100%">
            <my-echart-gauge :color="color2" :data="gauge2"></my-echart-gauge>
          </el-col>
        </el-row>
      </div>
      <div class="echart-item">
        <div class="item-title">高频异常设备排名</div>
        <el-row>
          <el-col :span="24" style="height:100%">
            <my-echart-rose :data="errData"></my-echart-rose>
          </el-col>
        </el-row>
      </div>
      <div class="echart-item">
        <div class="item-title">设备故障事件中心</div>
        <el-row>
          <el-col :span="24" style="height:100%">
            <el-table :data="hazardData" class="platform-table" style="width: 100%">
              <el-table-column prop="id" label="ID" align="center" width="60"></el-table-column>
              <el-table-column prop="datetime" label="时间" align="center"></el-table-column>
              <el-table-column prop="pos" label="传感器位置" align="center"></el-table-column>
              <el-table-column prop="state" label="状态" align="center"></el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="pla-top">
      <div class="echart-top-item">
        <div class="top-item-title">注册单位总数</div>
        <count-to :start-val="0" :end-val="20" :duration="2600" class="card-panel-num" />
      </div>
      <div class="echart-top-item">
        <div class="top-item-title">注册设备数量</div>
        <count-to :start-val="0" :end-val="13088" :duration="2600" class="card-panel-num" />
      </div>
    </div>
    <div class="platform-right">
      <div class="echart-item">
        <div class="item-title">高频隐患类型排名</div>
        <el-row>
          <el-col :span="24" style="height:100%">
            <my-echart-rose :data="typeRankData" :key="rankKey"></my-echart-rose>
          </el-col>
        </el-row>
      </div>
      <div class="echart-item">
        <div class="item-title">重大隐患单位排名</div>
        <el-row>
          <el-col :span="24" style="height:100%">
            <el-table :data="rankData" class="platform-table" style="width: 100%">
              <el-table-column prop="id" label="ID" align="center"></el-table-column>
              <el-table-column prop="factoryName" label="单位名称" align="center"></el-table-column>
              <el-table-column prop="count" label="隐患数量" align="center"></el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </div>
      <div class="echart-item">
        <div class="item-title">隐患处理情况</div>
        <el-row>
          <el-col :span="24" style="height:100%">
            <el-radio-group v-model="labelHazard" class="hazard_btn_group" size="small">
              <el-radio-button label="weekly">近7天</el-radio-button>
              <el-radio-button label="monthly">近30天</el-radio-button>
              <el-radio-button label="yearly">近1年</el-radio-button>
            </el-radio-group>
            <my-echart-line :chartData="weekData" :key="weekDataKey" v-if="labelHazard == 'weekly'"></my-echart-line>
            <my-echart-range
              :chartData="monthData"
              :key="monthDataKey"
              v-if="labelHazard == 'monthly'"
            ></my-echart-range>
            <my-echart-line :chartData="yearData" :key="yearDataKey" v-if="labelHazard == 'yearly'"></my-echart-line>
          </el-col>
        </el-row>
      </div>
    </div>
    <my-echart-map class="platform-map"></my-echart-map>
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
  getHazardTypesRank
} from "@/api/platform/platform";
import CountTo from "vue-count-to";
export default {
  data() {
    return {
      labelHazard: "weekly",
      hazardData: [
        {
          id: 1,
          datetime: "2019-01-15",
          pos: "aaa",
          state: "异常"
        },
        {
          id: 1,
          datetime: "2019-01-15",
          pos: "aaa",
          state: "异常"
        },
        {
          id: 1,
          datetime: "2019-01-15",
          pos: "aaa",
          state: "异常"
        },
        {
          id: 1,
          datetime: "2019-01-15",
          pos: "aaa",
          state: "异常"
        },
        {
          id: 1,
          datetime: "2019-01-15",
          pos: "aaa",
          state: "异常"
        },
        {
          id: 1,
          datetime: "2019-01-15",
          pos: "aaa",
          state: "异常"
        }
      ],
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
        value: 70
      },
      gauge2: {
        label: "本周故障及时处理率",
        value: 30
      },
      errData: [
        { value: 10, name: "二氧化碳" },
        { value: 5, name: "烟感" },
        { value: 15, name: "电气" },
        { value: 25, name: "水深" }
      ],
      typeRankData: [],
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
      weekDataKey: 1,
      monthDataKey: 10,
      yearDataKey: 20,
      rankKey: 30,
      monthList: {}
    };
  },
  methods: {
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
          ++this.weekDataKey;
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
          ++this.monthDataKey;
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
          ++this.yearDataKey;
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
            temp.factoryName = item.factoryName;
            temp.count = item.count;
            _list.push(temp);
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
          _data.map((item, i) => {
            let temp = {};
            temp.name = item.type;
            temp.value = item.count;
            _list.push(temp);
          });
          console.log(_list);
          this.typeRankData = _list;
          ++this.rankKey;
        }
      });
    }
  },
  mounted() {
    this.getWeeklyList();
    this.getMonthlyList();
    this.getYearlyList();
    this.getUnitsRankList();
    this.getTypesRankList();
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
$bgColor: #041a49;
$font-color: #888;
$item-bgColor: rgba(
  $color: lighten($bgColor, 20%),
  $alpha: 0.5
);
$item-alpha: 0.5;
$left-item-width: 400px;
$left-item-left: 30px;
$left-item-top: 30px;
$left-item-bottom: 30px;
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
    background: $bgColor;
    position: relative;
    color: $font-color;
    .platform-map {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: 10;
    }
    .platform-left {
      position: absolute;
      overflow: hidden;
      left: $left-item-left;
      top: $left-item-top;
      bottom: $left-item-bottom;
      width: $left-item-width;
      @include border-radius($border-radius);
      z-index: 11;
      .el-row {
        height: 100%;
      }
    }
    .pla-top {
      position: absolute;
      left: 50%;
      top: $top-item-top;
      width: $top-item-width;
      height: $top-item-height;
      margin-left: -$top-item-width / 2;
      @include border-radius($border-radius);
      z-index: 11;
      .echart-top-item {
        height: 50%;
        font-size: 30px;
        line-height: 50px;
        color: #fff;
        overflow: hidden;
        .top-item-title {
          float: left;
          color: #fff;
        }
        .card-panel-num {
          float: left;
          color: #fff;
          font-weight: bold;
        }
      }
      .top-item-title {
        display: block;
        margin-left: 100px;
        margin-right: 20px;
      }
    }
    .platform-right {
      left: initial;
      right: $left-item-left;
      @extend .platform-left;
    }
    .echart-item {
      height: 33.3%;
      position: relative;
      overflow: hidden;
      .hazard_btn_group {
        position: absolute;
        z-index: 99;
        top: 5px;
        right: 10px;
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
        padding: 0 20px;
        top: 10px;
        color: #fff;
        font-weight: bold;
        text-shadow: 0 0 10px #fff;
      }
      .platform-table {
        background: initial !important;
        width: 90% !important;
        margin: auto;
        margin-top: 35px;
        th {
          padding: 0;
          background: initial !important;
          color: #fff !important;
        }
        tr {
          background: initial !important;
          color: #fff;
        }
        .el-table__row:hover td {
          background-color: rgba(9, 66, 161, 0.8) !important;
        }
      }
    }
  }
}
</style>
