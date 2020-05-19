<template>
  <div class="container kanban">
    <my-loading v-if="loading"></my-loading>
    <div class="kanban-top">
      <div class="kanban-top-left">
        <el-image class="kanban_logo" :src="require('../../assets/image/logo_white.png')"></el-image>
        <h1 class="kanban_title">阿米华晟安中云数据平台</h1>
      </div>
      <div class="kanban-top-right">
        <div class="kanban-dropdown">
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
    <el-row :gutter="10" class="kanban-box">
      <el-col :span="6" class="flex flex-direction">
        <div class="kanban-item margin-bottom-xs">
          <div class="item-title vertical purple">
            <span>健康指数</span>
          </div>
          <div class="flex flex-direction" style="width:100%;height:100%">
            <div class="flex-sub">
              <my-echart-meter :chartData="meterData"></my-echart-meter>
            </div>
            <div class="flex-sub">
              <my-echart-line :chartData="yearlyPointData"></my-echart-line>
            </div>
          </div>
        </div>
        <div class="kanban-item bgBlack margin-bottom-xs">
          <div class="item-title vertical purple">
            <span>处理详情</span>
          </div>
          <div style="width:100%;height:100%">
            <div class="hazard_total">今日隐患：{{totalHazard}}个</div>
            <my-horizontal-bar :chartData="rankData1"></my-horizontal-bar>
          </div>
        </div>
        <div class="kanban-item bgBlack">
          <div class="item-title vertical purple">
            <span>设备故障事件中心</span>
          </div>
          <my-echart-radar :chartData="radarData"></my-echart-radar>
        </div>
      </el-col>
      <el-col :span="18" class="flex flex-direction">
        <div class="flex flex-twice margin-tb-xs">
          <div class="flex-twice">
            <my-building :data="blist"></my-building>
          </div>
          <div class="flex flex-direction flex-sub">
            <div class="kanban-item margin-bottom-xs">
              <div class="item-title vertical purple">
                <span>隐患处理情况</span>
              </div>
              <my-echart-line :chartData="yearData"></my-echart-line>
            </div>
            <div class="kanban-item margin-bottom-xs">
              <div class="item-title vertical purple">
                <span>事件处理率</span>
              </div>
              <div class="flex flex-direction justify-center align-center flex-sub">
                <my-echart-pie-doughnut :chartData="gauge1" :color="'#48C3FB'" style="flex:1"></my-echart-pie-doughnut>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-sub">
          <div class="kanban-item bgBlack margin-right-xs flex-twice">
            <el-table :data="onlineData" class="kanban-table">
              <el-table-column prop="currdate" label="时间" align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.currdate">{{ parseTime(scope.row.currdate,"{y}-{m}-{d}") }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="factoryName" label="单位名称" align="center"></el-table-column>
              <el-table-column prop="currlocation" label="位置" align="center"></el-table-column>
              <el-table-column prop="type" label="状态" align="center"></el-table-column>
              <el-table-column prop="state" label="状态" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.state == 0 ? '正常':'异常' }}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="kanban-item bgBlack flex-sub">
            <div class="item-title vertical purple">
              <span>监控在线统计</span>
            </div>
            <my-echart-pie :chartData="pieData"></my-echart-pie>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import MyHorizontalBar from "@/views/kanban/BarChart1";
import MyEchartLine from "@/views/kanban/LineChart1";
import MyEchartPieDoughnut from "@/views/kanban/PieChart1";
import MyEchartPie from "@/views/kanban/PieChart2";
import MyEchartRadar from "@/views/kanban/RadarChart";
import MyEchartMeter from "@/views/kanban/MeterChart";
import MyBuilding from "@/views/kanban/Building";
import MyLoading from "@/components/Loading/index";
import {
  getHazardResult,
  getEventDoneRate,
  getSensorData,
  getNormalEquipment,
  getHandleDetail,
  getBuildingDetail,
  getHealthPoint,
  getOnlineRate,
  getBuildingGroup
} from "@/api/platform/board";
import { listFactory } from "@/api/main/factory";
export default {
  data() {
    return {
      factoryName: "",
      totalHazard: 0,
      userName: this.$store.getters.name,
      factoryList: [],
      onlineData: [],
      yearData: {
        legend: [],
        xdata: [], //横坐标的值
        ydata: [] //纵坐标的值
      },
      rankData1: {
        xdata: ["待处理", "处理中", "已完成"],
        ydata: [
          [0, 0, 0],
          [0, 0, 0]
        ]
      },
      meterData: 0,
      pieData: [],
      radarData: {
        indicator: [],
        value: []
      },
      gauge1: {
        label: "本周隐患及时处理率",
        value: 0
      },
      factoryId: 0,
      yearlyPointData: {
        legend: ["安全评分"],
        xdata: [],
        ydata: []
      },
      loading: true,
      blist:[]
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
      let _list = _this.factoryList;
      _list.map((item, i) => {
        if (item.id == nVal) {
          _this.factoryName = item.name;
        }
      });
      _this.getHealthPointList();
      _this.getBuildingList();
    }
  },
  methods: {
    getHealthPointList() {
      let _this = this;
      getHealthPoint({ factoryId: _this.factoryId }).then(response => {
        if (response.code == 200) {
          let _data = response.data;
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
          let _ydataList3 = [...Array(_xdata3.length)].map(_ => 0);
          let _ylist = _data.yearlyPointList;
          let _point = _data.percentage;
          _this.meterData = _point ? _point : 0; //健康指数赋值
          _xdata3.map((xitem, i) => {
            //年
            _ylist.map((item, j) => {
              let _month = item.yearly.split("-")[1] * 1;
              if (i == _month) {
                _ydataList3[i] = item.percentage;
              }
            });
          });
          _this.yearlyPointData.xdata = _xdata3;
          _this.yearlyPointData.ydata[0] = _ydataList3;
        }
      });
    },
    getNormalEquipmentList(data) {
      //设备故障事件中心
      let _this = this;
      let _arr1 = [];
      let _arr2 = [];
      data.map((item, i) => {
        let temp = {};
        temp.text = item.name;
        temp.max = item.countSum;
        _arr1.push(temp);
        _arr2.push(item.count);
      });
      _this.radarData.value.push(_arr2);
      _this.radarData.indicator = _arr1;
    },
    getOnlinePercentage(data) {
      //本周隐患及时处理率
      //本周故障及时处理率
      this.gauge1.value = data.dangerPercentage.dangerPercentage * 1;
    },
    getOnlineRateList(data) {
      //监控在线统计
      let _this = this;
      let _arr = [];
      data.map((item, i) => {
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
    },
    getErrRankList() {
      //监控在线统计
      getErrRank().then(response => {
        if (response.code == 200) {
          let _data = response.data;
          this.onlineData = _data;
        }
      });
    },
    logout() {
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
    },
    getFactoryList(data) {
      let _this = this;
      let _arr = [];
      data.map((item, i) => {
        let temp = {};
        temp.id = item.factoryId;
        temp.name = item.factoryName;
        _arr.push(temp);
      });
      _this.factoryList = _arr;
    },
    getHandleDetailList(data) {
      //处理详情
      let _this = this;
      data.map((item, i) => {
        this.rankData1.ydata[0][item.state] = item.count;
        this.totalHazard = this.totalHazard + item.count;
      });
    },
    getHazardResultList(data) {
      let _this = this;
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
        data.hiddenDangerSum.map((item, j) => {
          let _month = item.yearly.split("-")[1] * 1;
          if (i == _month) {
            _allList[i] = item.count;
          }
        });
        data.hiddenDangerOverSum.map((item, j) => {
          let _month = item.yearly.split("-")[1] * 1;
          if (i == _month) {
            _doneList[i] = item.count;
          }
        });
      });
      _this.yearData.xdata = _xdata;
      _this.yearData.ydata[0] = _doneList;
      _this.yearData.ydata[1] = _allList;
      _this.yearKey++;
    },
    getBuildingList() {
      let _this = this;
      getBuildingGroup({ factoryIds: _this.factoryId }).then(response => {
        if (response.code == 200) {
          console.log(response.data);
          this.blist = response.data;
        }
      });
    }
  },
  mounted() {
    Promise.all([
      getNormalEquipment(),
      getEventDoneRate(),
      getOnlineRate(),
      listFactory(),
      getHandleDetail(),
      getHazardResult()
    ])
      .then(result => {
        if (result[0].code == 200) {
          this.getNormalEquipmentList(result[0].data);
        }
        if (result[1].code == 200) {
          this.getOnlinePercentage(result[1].data);
        }
        if (result[2].code == 200) {
          this.getOnlineRateList(result[2].data);
        }
        if (result[3].code == 200) {
          this.getFactoryList(result[3].rows);
        }
        if (result[4].code == 200) {
          this.getHandleDetailList(result[4].data);
        }
        if (result[5].code == 200) {
          this.getHazardResultList(result[5].data);
        }
        this.loading = false;
      })
      .catch(error => {
        this.loading = false;
      });
  },
  components: {
    MyHorizontalBar,
    MyEchartLine,
    MyEchartPieDoughnut,
    MyEchartPie,
    MyEchartRadar,
    MyEchartMeter,
    MyBuilding,
    MyLoading
  }
};
</script>

<style>
.kanban-dropdown .el-dropdown {
  color: #fff;
  cursor: pointer;
}
.hazard_total {
  padding: 20px;
  text-align: center;
}
</style>