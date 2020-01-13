<template>
  <div class="container">
    <!-- <el-select v-model="value" placeholder="请选择" size="mini">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
    <el-card class="box-card" style="margin-top:20px">
      <div slot="header" class="clearfix">
        <span>XXX分析报告</span>
        <el-button class="header_right" type="text">
          <el-radio-group v-model="labelPos" size="small">
            <el-radio-button label="monthly">月报</el-radio-button>
            <el-radio-button label="weekly">周报</el-radio-button>
          </el-radio-group>
        </el-button>
      </div>
      <div class="table-tool">
        <my-search-tool>
          <template slot="content">
            <el-form
              :label-position="labelPosition"
              ref="form"
              :model="searchForm"
              label-width="80px"
            >
              <el-form-item label="设备" size="small">
                <el-input v-model="searchForm.name"></el-input>
              </el-form-item>
              <el-form-item label="创建时间" size="small">
                <el-date-picker
                  v-model="searchForm.range"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :clearable="false"
                ></el-date-picker>
              </el-form-item>
            </el-form>
          </template>
          <template slot="end">
            <el-dropdown size="small" split-button @command="handleClick">
              导出
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="csv">导出到 Csv 文件</el-dropdown-item>
                <el-dropdown-item command="excel">导出到 Excel 文件</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-button size="small" @click="handleReset">重置</el-button>
            <el-button size="small" type="primary" @click="handleSearch">查询</el-button>
          </template>
        </my-search-tool>
        <div class="table-tool-others">
          <div class="el-inline" title="打印">
            <i class="el-icon-printer"></i>
          </div>
        </div>
      </div>
      <el-table
        stripe
        border
        :data="tableData"
        align="center"
        style="width: 100%"
        @row-click="handleRowClick"
      >
        <el-table-column label="用电警告">
          <el-table-column prop="name" label="剩余电量(Max)"></el-table-column>
          <el-table-column prop="name" label="告警总次数"></el-table-column>
          <el-table-column prop="name" label="告警次数最多位置"></el-table-column>
          <el-table-column prop="name" label="告警最多位置告警次数"></el-table-column>
        </el-table-column>
        <el-table-column label="温度警告">
          <el-table-column prop="name" label="温度值(Max)"></el-table-column>
          <el-table-column prop="name" label="告警总次数"></el-table-column>
          <el-table-column prop="name" label="告警次数最多位置"></el-table-column>
          <el-table-column prop="name" label="告警最多位置告警次数"></el-table-column>
        </el-table-column>
        <el-table-column label="液位警告">
          <el-table-column prop="name" label="液位值(Max)"></el-table-column>
          <el-table-column prop="name" label="告警总次数"></el-table-column>
          <el-table-column prop="name" label="告警次数最多位置"></el-table-column>
          <el-table-column prop="name" label="告警最多位置告警次数"></el-table-column>
        </el-table-column>
        <el-table-column label="噪声强度">
          <el-table-column prop="name" label="噪声强度(Max)"></el-table-column>
          <el-table-column prop="name" label="告警总次数"></el-table-column>
          <el-table-column prop="name" label="告警次数最多位置"></el-table-column>
          <el-table-column prop="name" label="告警最多位置告警次数"></el-table-column>
        </el-table-column>
        <el-table-column label="通讯中断隐患">
          <el-table-column prop="name" label="告警总次数"></el-table-column>
          <el-table-column prop="name" label="告警次数最多位置"></el-table-column>
          <el-table-column prop="name" label="告警最多位置告警次数"></el-table-column>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :hide-on-single-page="isPaging"
          :current-page="currentPage"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="prev,pager,next,jumper,total,sizes"
          :total="400"
        ></el-pagination>
      </div>

      <el-table
        stripe
        border
        :data="tableData2"
        align="center"
        style="width: 100%;margin-top:100px;"
        @row-click="handleRowClick"
      >
        <el-table-column prop="amount" label="设备总数"></el-table-column>
        <el-table-column prop="battery" label="剩余电流总报警"></el-table-column>
        <el-table-column prop="overheart" label="超温总报警"></el-table-column>
        <el-table-column prop="overpower" label="过流总报警"></el-table-column>
        <el-table-column prop="overvoltage" label="过压总报警"></el-table-column>
        <el-table-column prop="liquidlevel" label="液位总报警"></el-table-column>
        <el-table-column prop="name" label="欠压力总报警"></el-table-column>
        <el-table-column prop="shot" label="短路总报警"></el-table-column>
        <el-table-column prop="disconnection" label="断路总报警"></el-table-column>
      </el-table>
    </el-card>-->
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>1.消防安全评分</span>
        <div class="header_right">
          <el-date-picker
            v-model="datetime"
            size="medium"
            type="month"
            placeholder="选择日期时间"
            class="datetime"
            value-format="yyyy-MM"
            @change="handleSelect"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </div>
      </div>
      <div class="text item">
        <p
          class="statistics"
        >您管理的安中云{{nowYear}}年{{nowMonth?nowMonth:12}}月平均消防安全评分40分，请继续加强消防加强消防安全管理。</p>
        <div id="rate_chart"></div>
      </div>
    </el-card>
    <!-- <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>2.故障</span>
      </div>
      <div class="text item">
        <p class="statistics">{{nowYear}}年{{nowMonth?nowMonth:12}}月安中云共发现故障38起，完成故障维修1起，平均维修时间7小时。</p>
        <div id="breakdown_chart"></div>
        <span class="title">故障频发点位</span>
        <el-table stripe border :data="tableData" align="center" style="width: 100%">
          <el-table-column prop="name" label="点位号"></el-table-column>
          <el-table-column prop="name" label="点位描述"></el-table-column>
          <el-table-column prop="name" label="设备地址"></el-table-column>
          <el-table-column prop="name" label="故障上报次数"></el-table-column>
          <el-table-column prop="name" label="备注"></el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :hide-on-single-page="isPaging"
            :current-page="currentPage"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="prev,pager,next,jumper,total,sizes"
            :total="400"
          ></el-pagination>
        </div>
      </div>
    </el-card> -->
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>3.隐患</span>
      </div>
      <div class="text item">
        <p class="statistics">{{nowYear}}年{{nowMonth?nowMonth:12}}月安中云共发现隐患38起，完成隐患维修1起，平均维修时间7小时。</p>
        <div id="hazard_chart"></div>
      </div>
    </el-card>
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>4.人员统计</span>
      </div>
      <div class="text item">
        <p
          class="statistics"
        >{{nowYear}}年{{nowMonth?nowMonth:12}}月共有8人参与到安中云日常管理中，所有工作人员共在云平台中处理故障5次，处理隐患2次。</p>
        <el-table stripe border :data="tableData" align="center" style="width: 100%">
          <el-table-column prop="name" label="人员姓名"></el-table-column>
          <el-table-column prop="name" label="处理故障"></el-table-column>
          <el-table-column prop="name" label="处理隐患"></el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :hide-on-single-page="isPaging"
            :current-page="currentPage"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="prev,pager,next,jumper,total,sizes"
            :total="400"
          ></el-pagination>
        </div>
      </div>
    </el-card>
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>5.服务统计</span>
      </div>
      <div class="text item">
        <p
          class="statistics"
        >{{nowYear}}年{{nowMonth?nowMonth:12}}月共使用应用内推送234次，使用短信23条，我们将继续结成为您提供优质的服务。</p>
      </div>
    </el-card>
  </div>
</template>
<script>
import MySearchTool from "@/components/SearchTool/index";
export default {
  data() {
    return {
      rcharts: {},
      bcharts: {},
      hcharts: {},
      nowMonth: 0,
      isPaging: true,
      currentPage: 0,
      tableData: [],
      datetime: "",
      nowYear: 2019,
      nowMonth: 1,
      pickerOptions: {
        disabledDate: time => {
          return time.getTime() > new Date();
        }
      }
    };
  },
  watch: {
    datetime(newVal, oldVal) {
      if (newVal == null) {
        return;
      }
      let dtime = newVal;
      let y = dtime.split("-")[0];
      let m = dtime.split("-")[1];
      this.nowYear = y;
      this.nowMonth = m;
      this.initRateChart();
    }
  },
  methods: {
    handleSelect() {},
    handleSizeChange() {},
    handleCurrentChange() {},
    resizeRateChart() {
      this.rcharts.resize();
    },
    resizeBreakdownChart() {
      this.bcharts.resize();
    },
    resizeHazardChart() {
      this.hcharts.resize();
    },
    initRateChart() {
      this.rcharts = echarts.init(document.getElementById(`rate_chart`));
      let nYear = this.nowYear;
      let nMonth = this.nowMonth;
      let base = new Date(nYear, nMonth, 0);
      let now = {};
      if (nMonth) {
        now = new Date(nYear, nMonth - 1, 0);
      } else {
        now = new Date(nYear - 1, 11, 0);
      }
      let date = []; //时间轴
      let data = [Math.random() * 300]; //纵坐标（值）
      let days = base.getDate(); //获取天数
      for (var i = 1; i <= days; i++) {
        now.setDate(now.getDate() + 1);
        date.push([now.getDate() < 10 ? "0" + now.getDate() : now.getDate()]);
        data.push(Math.round(Math.random() * 20 + 10));
      }
      let option = {
        tooltip: {
          trigger: "axis",
          position: function(pt) {
            return [pt[0], "10%"];
          }
        },
        legend: {
          data: ["安全评分"]
        },
        title: {
          left: "left",
          text: "消防安全评分"
        },
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: "none"
            },
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: date
        },
        yAxis: {
          type: "value",
          boundaryGap: [0, "100%"]
        },
        dataZoom: [
          {
            type: "inside",
            start: 0,
            end: 100
          },
          {
            start: 0,
            end: 10,
            handleIcon:
              "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
            handleSize: "80%",
            handleStyle: {
              color: "#fff",
              shadowBlur: 3,
              shadowColor: "rgba(0, 0, 0, 0.6)",
              shadowOffsetX: 2,
              shadowOffsetY: 2
            }
          }
        ],
        series: [
          {
            name: "安全评分",
            type: "line",
            smooth: false,
            symbol: "none",
            sampling: "average",
            itemStyle: {
              color: "rgb(255, 70, 131)"
            },
            data: data
          }
        ]
      };
      this.rcharts.setOption(option);
      window.addEventListener("resize", this.resizeRateChart);
    },
    initBreakdownChart() {
      this.hcharts = echarts.init(document.getElementById(`breakdown_chart`));
      let option = {
        legend: {},
        tooltip: {},
        title: {
          left: "left",
          text: "故障统计"
        },
        dataset: {
          dimensions: ["name", "上月", "本月"],
          source: [
            {
              name: "故障",
              上月: 43.3,
              本月: 85.8
            },
            { name: "忽略故障", 上月: 83.1, 本月: 73.4 },
            {
              name: "复位故障",
              上月: 86.4,
              本月: 65.2
            },
            {
              name: "维修故障",
              上月: 72.4,
              本月: 53.9
            }
          ]
        },
        xAxis: { type: "category" },
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [{ type: "bar" }, { type: "bar" }, { type: "bar" }]
      };

      this.hcharts.setOption(option);
      window.addEventListener("resize", this.resizeBreakdownChart);
    },
    initHazardChart() {
      this.bcharts = echarts.init(document.getElementById(`hazard_chart`));
      let option = {
        legend: {},
        tooltip: {},
        title: {
          left: "left",
          text: "隐患统计"
        },
        dataset: {
          dimensions: ["name", "上月", "本月"],
          source: [
            {
              name: "隐患",
              上月: 43.3,
              本月: 85.8
            },
            { name: "忽略隐患", 上月: 83.1, 本月: 73.4 },
            {
              name: "复位隐患",
              上月: 86.4,
              本月: 65.2
            },
            {
              name: "解决隐患",
              上月: 72.4,
              本月: 53.9
            }
          ]
        },
        xAxis: { type: "category" },
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [{ type: "bar" }, { type: "bar" }, { type: "bar" }]
      };

      this.bcharts.setOption(option);
      window.addEventListener("resize", this.resizeHazardChart);
    },
    initPreMonth() {
      let nowDate = new Date();
      let nYear = nowDate.getFullYear();
      let nMonth = nowDate.getMonth();
      this.nowYear = nYear;
      this.nowMonth = nMonth;
    }
  },
  mounted() {
    this.initPreMonth();
    this.initRateChart();
    this.initBreakdownChart();
    this.initHazardChart();
  },
  components: {
    MySearchTool
  }
};
</script>
<style>
/* .sta_header {
  display: flex;
  align-items: center;
}
.el-card__header {
  padding: 10px 20px;
} */
.el-table thead {
  background: #f5f7fa !important;
}
.el-card + .el-card {
  margin-top: 20px;
}
#rate_chart {
  width: 100%;
  height: 400px;
}
#breakdown_chart {
  width: 100%;
  height: 400px;
}
#hazard_chart {
  width: 100%;
  height: 400px;
}
.statistics {
  font-size: 20px;
}
.text.item .title {
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 10px;
  display: block;
}
.datetime {
  margin-top: 10px;
}
</style>