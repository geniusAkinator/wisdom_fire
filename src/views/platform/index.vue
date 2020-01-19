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
    <div class="platform-top">
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
            <my-echart-rose :data="resData"></my-echart-rose>
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
            <my-echart-line
              :chartData="weekData"
              key="weekData-chart"
              v-if="labelHazard == 'weekly'&&weekData.ydata.length > 0"
            ></my-echart-line>
            <my-echart-range
              :chartData="monthData"
              key="monthData-chart"
              v-if="labelHazard == 'monthly'&&monthData.ydata.length > 0"
            ></my-echart-range>
            <my-echart-line
              :chartData="yearData"
              key="yearData-chart"
              v-if="labelHazard == 'yearly'&&yearData.ydata.length > 0"
            ></my-echart-line>
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
      rankData: [
        {
          id: 1,
          factoryName: "阿米华晟集团",
          count: 1
        },
        {
          id: 1,
          factoryName: "阿米华晟集团",
          count: 1
        },
        {
          id: 1,
          factoryName: "阿米华晟集团",
          count: 1
        },
        {
          id: 1,
          factoryName: "阿米华晟集团",
          count: 1
        },
        {
          id: 1,
          factoryName: "阿米华晟集团",
          count: 1
        }
      ],
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
      resData: [
        { value: 10, name: "水位不够" },
        { value: 5, name: "水压低" }
      ],
      weekData: {
        legend: ["隐患总数", "已解决数"],
        xdata: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"], //横坐标的值
        ydata: [
          [820, 932, 901, 934, 1290, 1330, 1320],
          [100, 100, 100, 100, 100, 100, 100]
        ] //纵坐标的值
      },
      monthData: {
        legend: ["隐患总数", "已解决数"],
        xdata: [], //横坐标的值
        ydata: [] //纵坐标的值
      },
      yearData: {
        legend: ["隐患总数", "已解决数"],
        xdata: [
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
        ], //横坐标的值
        ydata: [
          [820, 932, 901, 934, 1290, 1330, 1320, 901, 934, 1290, 1330, 1320],
          [901, 934, 1290, 1330, 1320, 100, 100, 100, 290, 1330, 1320, 100]
        ] //纵坐标的值
      }
    };
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
      background: $item-bgColor;
      z-index: 11;
      .el-row {
        height: 100%;
      }
    }
    .platform-top {
      position: absolute;
      left: 50%;
      top: $top-item-top;
      width: $top-item-width;
      height: $top-item-height;
      margin-left: -$top-item-width / 2;
      @include border-radius($border-radius);
      background: $item-bgColor;
      z-index: 11;
      .echart-top-item {
        height: 50%;
        font-size: 30px;
        line-height: 50px;
        color: #fff;
        overflow: hidden;
        .top-item-title {
          float: left;
          color: #addbf3;
        }
        .card-panel-num {
          float: left;
          color: #1ea3b6;
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
          background: initial;
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