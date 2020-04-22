<template>
  <div class="container">
    <el-row :gutter="10">
      <el-col>
        <panel-group @handleSetLineChartData="handleSetLineChartData" />
      </el-col>
      <el-col :md="16">
        <el-col :md="24">
          <el-card class="box-card no-padding" shadow="never">
            <div class="text item" style="height:800px">
              <my-map :list.sync="geoList"></my-map>
            </div>
          </el-card>
        </el-col>
        <!-- <el-col :md="24" style="margin-top:10px">
          <el-card class="box-card no-padding" shadow="never">
            <div slot="header" class="clearfix">
              <i class="el-icon-receiving"></i>
              <span>数据概览</span>
            </div>
            <div class="text item">
              <el-carousel
                indicator-position="outside"
                arrow="never"
                :autoplay="false"
                :height="'500px'"
              >
                <el-carousel-item></el-carousel-item>
                <el-carousel-item>bbb</el-carousel-item>
                <el-carousel-item>ccc</el-carousel-item>
              </el-carousel>
            </div>
          </el-card>
        </el-col>-->
      </el-col>
      <el-col :md="8">
        <el-col :md="24">
          <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
              <i class="el-icon-s-promotion"></i>
              <span>日历</span>
            </div>
            <div class="text">
              <div class="tips">
                <div class="tips-item">
                  <i class="circle warning"></i>
                  隐患
                </div>
                <!-- <div class="tips-item">
                  <i class="circle danger"></i>
                  故障
                </div>-->
                <!-- <div class="tips-item">
                  <i class="circle info"></i>
                  离线
                </div>-->
              </div>
              <my-calendar class="calendar" :list="calList"></my-calendar>
            </div>
          </el-card>
        </el-col>
        <el-col :md="24" style="margin-top:10px">
          <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
              <i class="el-icon-data-line"></i>
              <span>本月隐患</span>
              <el-button class="header_right" type="text">
                <el-radio-group v-model="labelPos" size="small">
                  <el-radio-button label="monthly">月报</el-radio-button>
                  <el-radio-button label="weekly">周报</el-radio-button>
                </el-radio-group>
              </el-button>
            </div>
            <div class="text item">
              <!-- <div id="month_chart"></div> -->
              <template v-if="labelPos == 'monthly'">
                <my-echart-range :chartData="monthData" v-if="monthData.ydata.length > 0"></my-echart-range>
              </template>
              <template v-if="labelPos == 'weekly'">
                <my-echart-line :chartData="weekData" v-if="weekData.ydata.length > 0"></my-echart-line>
              </template>
            </div>
          </el-card>
        </el-col>
        <!-- <el-col :md="24" style="margin-top:10px">
          <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
              <i class="el-icon-edit-outline"></i>
              <span>操作日志</span>
            </div>
            <div class="text item" style="min-height:300px;height:auto">
              <div class="block">
                <el-timeline>
                  <el-timeline-item
                    v-for="(item,index) in logList"
                    :timestamp="parseTime(item.operTime)"
                    placement="top"
                    :key="index"
                  >
                    <el-card shadow="never">
                      <h4>{{item.title}}</h4>
                      <p>{{item.operName}}</p>
                    </el-card>
                  </el-timeline-item>
                </el-timeline>
              </div>
            </div>
          </el-card>
        </el-col>-->
      </el-col>
    </el-row>
    <el-backtop target=".app-main"></el-backtop>
  </div>
</template>

<script>
import { listFactory } from "@/api/main/factory";
import { getCalendar } from "@/api/hazard/overview";
import PanelGroup from "./dashboard/PanelGroup";
import MyMap from "@/components/Map/index";
import MyCalendar from "@/components/Calendar/index";
import { format } from "path";
import { parseTimeStr, parseTime } from "@/utils/common";
import MyEchartRange from "@/components/Echart/erange";
import MyEchartLine from "@/components/Echart/eline";
import { reportData } from "@/api/display/sensor";
export default {
  name: "Index",
  components: {
    PanelGroup,
    MyMap,
    MyCalendar,
    MyEchartRange,
    MyEchartLine
  },
  data() {
    return {
      geoList: [],
      calList: [],
      monthList: {},
      weekList: [],
      logList: [],
      labelPos: "monthly",
      mcharts: {},
      pattern: "{y}-{m}-{d}",
      monthData: {
        legend: ["本月隐患"],
        xdata: [], //横坐标的值
        ydata: [] //纵坐标的值
      },
      weekData: {
        legend: ["本周隐患"],
        xdata: [], //横坐标的值
        ydata: [] //纵坐标的值
      }
    };
  },
  watch: {
    monthList(nVal, oVal) {
      this.filterMonthList();
    },
    weekList(nVal, oVal) {
      this.filterWeekList();
    }
  },
  methods: {
    handleSetLineChartData(type) {},
    filterMonthList() {
      let d = new Date();
      let nYear = d.getFullYear(); //当前年
      let nMonth = d.getMonth() + 1; //当前月
      let base = new Date(nYear, nMonth, 0);
      let now = {};
      if (nMonth) {
        now = new Date(nYear, nMonth - 1, 0);
      } else {
        now = new Date(nYear - 1, 11, 0);
      }
      let date = []; //时间轴
      let data = []; //纵坐标（值）
      let days = base.getDate(); //获取天数
      let _map = this.monthList;
      for (let i = 1; i <= days; i++) {
        now.setDate(now.getDate() + 1);
        let _date = parseTimeStr(now, this.pattern);
        if (_map.has(_date)) {
          data.push(_map.get(_date));
        } else {
          data.push(0);
        }
        date.push([
          now.getDate() < 10 ? "0" + now.getDate() : "" + now.getDate()
        ]);
      }
      this.monthData.xdata = date;
      this.monthData.ydata.push(data);
    },
    filterWeekList() {
      let d = new Date();
      let nYear = d.getFullYear(); //当前年
      let nMonth = d.getMonth() + 1; //当前月
      let nDayOfWeek = d.getDay(); //今天本周的第几天
      let nDay = d.getDate(); //当前日
      let base = new Date(nYear, nMonth, nDay - nDayOfWeek); //获得本周的开始日期
      let date = []; //时间轴
      let data = []; //纵坐标（值）
      let _map = this.weekList;
      for (let i = 1, days = 7; i <= days; i++) {
        base.setDate(base.getDate() + 1);
        let _date = parseTimeStr(base, this.pattern);
        if (_map.has(_date)) {
          data.push(_map.get(_date));
        } else {
          data.push(0);
        }
        date.push([
          base.getDate() < 10 ? "0" + base.getDate() : "" + base.getDate()
        ]);
      }
      this.weekData.xdata = [
        "星期天",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六"
      ];
      this.weekData.ydata.push(data);
    },
    RndNum(n) {
      var rnd = "";
      for (var i = 0; i < n; i++) rnd += Math.floor(Math.random() * 10);
      return rnd;
    }
  },
  mounted() {
    listFactory().then(response => {
      if (response.code == 200) {
        let _data = response.rows;
        _data.map((item, i) => {
          item.show = false;
          this.geoList.push(item);
        });
      }
    });
    //获取本月隐患
    getCalendar({ type: "0" }).then(response => {
      if (response.code == 200) {
        let _data = response.data.monthList;
        let _map = new Map();
        _data.map((item, i) => {
          _map.set(parseTimeStr(item.currdate, this.pattern), item.count);
        });
        this.monthList = _map;
      }
    });
    //获取本周隐患
    getCalendar({ type: "1" }).then(response => {
      if (response.code == 200) {
        let _data = response.data.weekList;
        let _map = new Map();
        _data.map((item, i) => {
          _map.set(parseTimeStr(item.currdate, this.pattern), item.count);
        });
        this.weekList = _map;
      }
    });
    //获取全部隐患
    getCalendar({ type: "2" }).then(response => {
      if (response.code == 200) {
        let _data = response.data.allList;
        _data.map((item, i) => {
          let temp = {};
          temp.isHazard = true;
          temp.createDate = parseTimeStr(item.currdate, this.pattern);
          this.calList.push(temp);
        });
      }
    });
  }
};
</script>

<style lang="scss">
// #month_chart {
//   width: 100%;
//   height: 400px;
// }
.echarts {
  width: 100%;
  height: 100%;
}
.box-card .text.item {
  width: 100%;
  min-height: 300px;
}
.fast_box li {
  list-style: none;
  display: flex;
  padding: 10px 0;
}
.fast_box p {
  margin: 0;
}
.fast_box a {
  margin-left: auto;
}
.fast_box {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
.statistics {
  margin-bottom: 20px;
}
.sta_item {
  display: flex;
  align-items: center;
  height: 100px;
  background: #f2f6fc;
  border-radius: 10px;
  padding: 15px;
}
.sta_item i {
  font-size: 34px;
  color: #fff;
  padding: 10px;
  border-radius: 10px;
}
.sta_item .item {
  text-align: center;
  margin-left: 10px;
  font-size: 15px;
  font-weight: bold;
  text-decoration: none;
  color: #606266;
}
.sta_item i {
  background-color: #409eff;
}
.statistics > div:nth-child(2) i {
  background-color: #67c23a;
}
.statistics > div:nth-child(3) i {
  background-color: #f56c6c;
}
.statistics > div:nth-child(4) i {
  background-color: #909399;
}
.sta_item .item:last-child {
  margin-left: auto;
}
.statistics > div {
  color: #909399;
}
.sta_item span {
  width: 100%;
  display: block;
  font-size: 26px !important;
  color: #606266;
}

@media screen and (max-width: 768px) {
  .sta_item {
    margin-bottom: 20px;
  }
}
.sta_item:hover {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
@media screen and (max-width: 991px) {
  .el-col.el-col-24.el-col-md-16 + .el-col.el-col-24.el-col-md-8 {
    margin-top: 10px;
  }
}
</style>
