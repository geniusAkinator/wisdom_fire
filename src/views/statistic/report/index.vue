<template>
  <div class="container">
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
    </el-card>-->
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>2.隐患</span>
      </div>
      <div class="text item">
        <p
          class="statistics"
        >{{nowYear}}年{{nowMonth?nowMonth:12}}月安中云共发现隐患{{this.monthHazardCount}}起，完成隐患维修{{this.doneCount}}起，平均维修时间7小时。</p>
        <my-echart-bar :data="hazardData" :key="hazardKey" style="height:400px;"></my-echart-bar>
      </div>
    </el-card>
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>3.人员统计</span>
      </div>
      <div class="text item">
        <p
          class="statistics"
        >{{nowYear}}年{{nowMonth?nowMonth:12}}月共有{{this.staffCount}}人参与到安中云日常管理中，所有工作人员共在云平台中处理故障{{this.errCount}}次，处理隐患{{this.hazardCount}}次。</p>
        <el-table
          class="statistic_table"
          stripe
          border
          :data="tableData"
          align="center"
          style="width: 100%"
        >
          <el-table-column prop="name" label="人员姓名"></el-table-column>
          <el-table-column prop="errCount" label="处理故障"></el-table-column>
          <el-table-column prop="hazardCount" label="处理隐患"></el-table-column>
        </el-table>
        <!-- <div class="pagination">
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
        </div>-->
      </div>
    </el-card>
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>4.服务统计</span>
      </div>
      <div class="text item">
        <p
          class="statistics"
        >{{nowYear}}年{{nowMonth?nowMonth:12}}月共使用应用内推送{{this.appCount}}次，使用短信{{this.msgCount}}条，我们将继续结成为您提供优质的服务。</p>
      </div>
    </el-card>
  </div>
</template>
<script>
import MySearchTool from "@/components/SearchTool/index";
import MyEchartBar from "@/views/statistic/report/BarChart";
import {
  getStaffCount,
  getHazardCount,
  getServiceCount
} from "@/api/statistic/report";
export default {
  data() {
    return {
      rcharts: {},
      bcharts: {},
      hcharts: {},
      isPaging: true,
      currentPage: 0,
      tableData: [],
      datetime: "",
      nowYear: 2019,
      nowMonth: 1,
      appCount: 0,
      msgCount: 0,
      staffCount: 0,
      errCount: 0,
      hazardCount: 0,
      monthHazardCount: 0,
      doneCount: 0,
      hazardData: {
        dimensions: ["name", "上月", "本月"], //横坐标的值
        source: [] //纵坐标的值
      },
      hazardKey: 1,
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
      this.doStaffCount();
      this.doServiceCount();
      this.doHazardCount();
    }
  },
  methods: {
    handleSelect() {},
    handleSizeChange() {},
    handleCurrentChange() {},
    initPreMonth() {
      let nowDate = new Date();
      let nYear = nowDate.getFullYear();
      let nMonth = nowDate.getMonth() + 1;
      this.nowYear = nYear;
      this.nowMonth = nMonth;
    },
    doStaffCount() {
      // 人员统计
      this.tableData = [];
      this.errCount = 0;
      this.hazardCount = 0;
      this.staffCount = 0;
      getStaffCount({ datetime: this.datetime + "-1" }).then(response => {
        if (response.code == 200) {
          let _data = response.rows;
          this.tableData = _data;
          let _errCount = 0;
          let _hazardCount = 0;
          _data.map((item, i) => {
            _errCount = _errCount + item.errCount * 1;
            _hazardCount = _hazardCount + item.hazardCount * 1;
          });
          this.staffCount = _data.length;
          this.errCount = _errCount;
          this.hazardCount = _hazardCount;
        }
      });
    },
    doServiceCount() {
      // 服务统计
      this.appCount = 0;
      this.msgCount = 0;
      getServiceCount({
        datetime: this.datetime + "-1"
      }).then(response => {
        if (response.code == 200) {
          let _data = response.data;
          _data.map((item, i) => {
            if (item.type == "app") {
              this.appCount = item.count;
            } else if (item.type == "message") {
              this.msgCount = item.count;
            }
          });
        }
      });
    },
    doHazardCount() {
      this.hazardData.source = [];
      this.monthHazardCount = 0;
      this.doneCount = 0;
      // 隐患统计
      getHazardCount({
        datetime: this.datetime + "-1"
      }).then(response => {
        if (response.code == 200) {
          let _current = response.data.troubleCurrent;
          let _before = response.data.troubleBefore;
          let _list = [];
          for (let i = 0; i <= 3; i++) {
            let temp = {};
            if (i == 0) {
              temp.name = "待处理";
            } else if (i == 1) {
              temp.name = "处理中";
            } else if (i == 2) {
              temp.name = "已处理";
            } else if (i == 3) {
              temp.name = "已忽视";
            }
            temp.上月 = 0;
            temp.本月 = 0;
            _list.push(temp);
          }
          let _count = 0;
          _current.map((item, i) => {
            console.log(item.state, item.count);
            _list[item.state].本月 = item.count;
            _count = _count + item.count;
            if (item.state == 3) {
              this.doneCount = item.count;
            }
          });
          _before.map((item, i) => {
            _list[item.state].上月 = item.count;
          });
          this.monthHazardCount = _count;
          this.hazardData.source = _list;
          ++this.hazardKey;
        }
      });
    }
  },
  mounted() {
    this.initPreMonth();
    if (this.datetime == "") {
      this.datetime = this.nowYear + "-" + this.nowMonth;
    }
  },
  components: {
    MySearchTool,
    MyEchartBar
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
.el-table.statistic_table thead {
  background: #f5f7fa;
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