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
            <my-echart-line></my-echart-line>
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
import CountTo from "vue-count-to";

export default {
  data() {
    return {
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
        value: 5011
      },
      errData: [
        { value: 10, name: "二氧化碳" },
        { value: 5, name: "烟感" },
        { value: 15, name: "电气" },
        { value: 25, name: "水深" }
      ],
      resData: [{ value: 10, name: "水位不够" }, { value: 5, name: "水压低" }]
    };
  },
  components: {
    MyEchartGauge,
    MyEchartRose,
    MyEchartLine,
    MyEchartMap,
    CountTo
  }
};
</script>

<style lang="scss">
$bgColor: #07133d;
$font-color: #888;
$item-bgColor: rgba(
  $color: lighten($bgColor, 5%),
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
$border-radius: 0;
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
        color: #fff;
        overflow: hidden;
        .top-item-title {
          float: left;
        }
        .card-panel-num {
          float: left;
        }
      }
      .top-item-title {
        display: block;
        line-height: 100%;
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