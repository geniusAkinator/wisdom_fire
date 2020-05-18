<template>
  <div class="container kanban">
    <my-loading v-if="loading"></my-loading>
    <div class="kanban-top">
      <div class="kanban-top-left">
        <el-image class="kanban_logo" :src="require('../../assets/image/logo_white.png')"></el-image>
        <h1 class="kanban_title">阿米华晟安中云数据平台</h1>
      </div>
      <div class="kanban-top-right"></div>
    </div>
    <el-row :gutter="10" class="kanban-box">
      <el-col :span="6" class="flex flex-direction">
        <div class="kanban-item margin-bottom-xs">
          <div class="item-title vertical purple">
            <span>在线统计</span>
          </div>
          <div class="flex flex-direction justify-center align-center flex-sub">
            <!-- <div class="flex justify-between padding-xs" style="border-bottom:1px dashed #a5a5a7">
              <div class="rate-item flex flex-direction justify-center align-center">
                <div class="rate-title">本周隐患及时处理率</div>
                <div class="rate-data">
                  <span class="rate-num">96</span>
                  %&nbsp;&nbsp;&nbsp;&nbsp;+16%
                </div>
              </div>
              <my-echart-pie-doughnut :chartData="96" :color="'#48C3FB'" style="flex:1"></my-echart-pie-doughnut>
            </div>-->
            <my-echart-pie-doughnut :chartData="gauge1" :color="'#48C3FB'" style="flex:1"></my-echart-pie-doughnut>
            <my-echart-pie-doughnut :chartData="gauge2" :color="'#48C3FB'" style="flex:1"></my-echart-pie-doughnut>
          </div>
        </div>
        <div class="kanban-item bgBlack margin-bottom-xs">
          <div class="item-title vertical purple">
            <span>隐患处理情况</span>
          </div>
          <my-echart-line :chartData="yearData"></my-echart-line>
        </div>s
        <div class="kanban-item bgBlack">
          <div class="item-title vertical purple">
            <span>设备故障事件中心</span>
          </div>
          <el-table :data="errData" class="kanban-table">
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
      </el-col>
      <el-col :span="18" class="flex flex-direction">
        <div class="flex flex-twice margin-tb-xs">
          <my-echart-map :chartData="mapData"></my-echart-map>
        </div>
        <div class="flex flex-sub">
          <div class="kanban-item bgBlack margin-right-xs">
            <div class="item-title vertical purple">
              <span>高频异常设备排名</span>
            </div>
            <my-horizontal-bar :chartData="rankData1"></my-horizontal-bar>
          </div>
          <div class="kanban-item bgBlack margin-right-xs">
            <div class="item-title vertical purple">
              <span>高频隐患类型排名</span>
            </div>
            <my-horizontal-bar :chartData="rankData2"></my-horizontal-bar>
          </div>
          <div class="kanban-item bgBlack">
            <div class="item-title vertical purple">
              <span>重大隐患单位排名</span>
            </div>
            <el-table :data="rankData" class="kanban-table">
              <el-table-column prop="factoryName" label="单位名称" align="center"></el-table-column>
              <el-table-column prop="count" label="隐患数量" align="center"></el-table-column>
            </el-table>
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
import MyEchartMap from "@/views/kanban/MapChart";
import MyLoading from "@/components/Loading/index";
import {
  getWeekly,
  getMonthly,
  getYearly,
  getHazardUnitsRank,
  getHazardTypesRank,
  getErrRank,
  getOnlineRate,
  getErrEquipmentRank,
  getMapData
} from "@/api/platform/platform";
export default {
  data() {
    return {
      errData: [],
      unitData: [],
      rankData1: {
        //高频异常设备排名
        xdata: [],
        ydata: [[], []]
      },
      rankData2: {
        //高频隐患类型排名
        xdata: [],
        ydata: [[], []]
      },
      yearData: {
        //隐患处理情况
        legend: ["隐患总数", "已解决数"],
        xdata: [], //横坐标的值
        ydata: [] //纵坐标的值
      },
      rankData: [],
      gauge1: {
        label: "本周隐患及时处理率",
        value: 0
      },
      gauge2: {
        label: "本周故障及时处理率",
        value: 0
      },
      hazardTypeList: [], //隐患类型列表
      errTypeList: [],
      mapData: {
        factoryCount: 0,
        chinaList: [],
        transducerCount: 0
      },
      loading: true
    };
  },
  watch: {
    hazardTypeList() {
      this.getTypesRankList();
    },
    errTypeList() {
      //高频异常设备排名
      this.getErrEquipmentList();
    }
  },
  methods: {
    getUnitsRankList(data) {
      //重大隐患单位排名
      let _list = [];
      data.map((item, i) => {
        let temp = {};
        temp.id = i + 1;
        if (item.factoryName != null) {
          temp.factoryName = item.factoryName;
          temp.count = item.count;
          _list.push(temp);
        }
      });
      this.rankData = _list;
    },
    getTypesRankList() {
      //高频隐患类型排名
      getHazardTypesRank().then(response => {
        if (response.code == 200) {
          let _data = response.data;
          let _rankList = this.fliterBarList(_data, this.hazardTypeList);
          this.rankData2 = _rankList;
        }
      });
    },
    getErrEquipmentList() {
      //高频异常设备排名
      getErrEquipmentRank().then(response => {
        if (response.code == 200) {
          let _data = response.data;
          let _rankList = this.fliterBarList(_data, this.errTypeList);
          this.rankData1 = _rankList;
        }
      });
    },
    getErrRankList(data) {
      //设备故障事件中心
      this.errData = data;
    },
    getOnlinePercentage(data) {
      //本周隐患及时处理率
      //本周故障及时处理率
      this.gauge1.value = data.dangerPercentage.split("%")[0] * 1;
      this.gauge2.value = data.faultPercentage.split("%")[0] * 1;
    },
    getYearlyList(data) {
      //隐患处理情况
      //年
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
        data.map((item, j) => {
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
    },
    fliterBarList(data, typeList) {
      let _data = {
        xdata: [],
        ydata: [[], []]
      };
      let _xdata = [];
      let _ydata = [[], []];
      let _count = 0;
      data.map((item, i) => {
        let temp = {};
        _ydata[0].push(item.count);
        _count += item.count;
        typeList.map((tItem, j) => {
          if (tItem.dictValue == item.type) {
            _xdata.push(tItem.dictLabel);
          }
        });
      });
      _ydata[1] = [...Array(_xdata.length)].map(_ => _count);
      _data.xdata = _xdata;
      _data.ydata = _ydata;
      return _data;
    },
    getMapList(data) {
      this.mapData = data;
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
        this.hazardTypeList = _list;
      }
    });
    this.getDicts("sys_type_fault").then(response => {
      if (response.code == 200) {
        let _data = response.data;
        let _list = [];
        _data.map((item, i) => {
          let temp = {};
          temp.dictLabel = item.dictLabel;
          temp.dictValue = item.dictValue;
          _list.push(temp);
        });
        this.errTypeList = _list;
      }
    });
    Promise.all([
      getHazardUnitsRank(),
      getErrRank(),
      getYearly(),
      getOnlineRate(),
      getMapData()
    ])
      .then(result => {
        if (result[0].code == 200) {
          this.getUnitsRankList(result[0].data);
        }
        if (result[1].code == 200) {
          this.getErrRankList(result[1].data);
        }
        if (result[2].code == 200) {
          this.getYearlyList(result[2].data);
        }
        if (result[3].code == 200) {
          this.getOnlinePercentage(result[3].data);
        }
        if (result[4].code == 200) {
          this.getMapList(result[4].data);
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
    MyEchartMap,
    MyLoading
  }
};
</script>

<style>
</style>