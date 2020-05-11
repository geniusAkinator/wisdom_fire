<template>
  <div class="container kanban">
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
            <span>健康指数</span>
          </div>
          <div class="flex flex-direction" style="width:100%;height:100%">
            <div class="flex-sub">
              <my-echart-meter :chartData="meterData"></my-echart-meter>
            </div>
            <div class="flex-sub">
              <my-echart-line :chartData="pointData"></my-echart-line>
            </div>
          </div>
        </div>
        <div class="kanban-item bgBlack margin-bottom-xs">
          <div class="item-title vertical purple">
            <span>高频异常设备排名</span>
          </div>
          <div style="width:100%;height:100%">
            <div>今日隐患：个</div>
            <my-horizontal-bar :chartData="rankData1"></my-horizontal-bar>
          </div>
        </div>
        <div class="kanban-item bgBlack">
          <div class="item-title vertical purple">
            <span>设备故障事件中心</span>
          </div>
          <my-echart-radar :chartData="errData"></my-echart-radar>
        </div>
      </el-col>
      <el-col :span="18" class="flex flex-direction">
        <div class="flex flex-twice margin-tb-xs">
          <div class="flex-twice"></div>
          <div class="flex flex-direction flex-sub">
            <div class="kanban-item margin-bottom-xs">
              <div class="item-title vertical purple">
                <span>隐患处理情况</span>
              </div>
              <my-echart-line :chartData="resData"></my-echart-line>
            </div>
            <div class="kanban-item margin-bottom-xs">
              <div class="item-title vertical purple">
                <span>事件处理率</span>
              </div>
              <div class="flex flex-direction justify-center align-center flex-sub">
                <div
                  class="flex justify-between padding-xs"
                  style="border-bottom:1px dashed #a5a5a7"
                >
                  <div class="rate-item flex flex-direction justify-center align-center">
                    <div class="rate-title">本周隐患及时处理率</div>
                    <div class="rate-data">
                      <span class="rate-num">96</span>
                      %&nbsp;&nbsp;&nbsp;&nbsp;+16%
                    </div>
                  </div>
                  <my-echart-pie-doughnut :chartData="96" :color="'#48C3FB'" style="flex:1"></my-echart-pie-doughnut>
                </div>
                <div class="flex justify-between padding-xs">
                  <div class="rate-item flex flex-direction justify-center align-center">
                    <div class="rate-title">本周隐患及时处理率</div>
                    <div class="rate-data">
                      <span class="rate-num">96</span>%&nbsp;&nbsp;&nbsp;&nbsp;+16%
                    </div>
                  </div>
                  <my-echart-pie-doughnut :chartData="96" :color="'#48C3FB'" style="flex:1"></my-echart-pie-doughnut>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-sub">
          <div class="kanban-item bgBlack margin-right-xs flex-twice">
            <div class="item-title vertical purple">
              <span>监控在线统计</span>
            </div>
            <el-table :data="onlineData" class="kanban-table">
              <el-table-column prop="equipmentName" label="时间" align="center" width="100"></el-table-column>
              <el-table-column prop="content" label="工厂名称" align="center"></el-table-column>
              <el-table-column prop="content" label="传感器位置" align="center"></el-table-column>
              <el-table-column prop="content" label="类型" align="center"></el-table-column>
              <el-table-column prop="duration" label="状态" align="center"></el-table-column>
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
export default {
  data() {
    return {
      onlineData: [],
      pointData: {
        legend: ["安全评分"],
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
          [0, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
        ] //纵坐标的值
      },
      resData: {
        legend: ["隐患总数", "已解决数"],
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
          [0, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
          [10, 100, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
        ] //纵坐标的值
      },
      rankData1: {
        xdata: ["待处理", "处理中", "已完成"],
        ydata: [
          [10, 10, 10],
          [30, 30, 30]
        ]
      },
      errData: {},
      meterData: 86,
      pieData:[
          {
              name:"在线",
              value:60
          },
          {
              name:"离线",
              value:60
          },
      ]
    };
  },
  methods: {},
  mounted() {},
  components: {
    MyHorizontalBar,
    MyEchartLine,
    MyEchartPieDoughnut,MyEchartPie,
    MyEchartRadar,
    MyEchartMeter
  }
};
</script>

<style>
</style>