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
        <p class="statistics">{{nowYear}}年{{nowMonth?nowMonth:12}}月安中云共发现隐患38起，完成隐患维修1起，平均维修时间7小时。</p>
        <my-echart-bar style="height:400px;"></my-echart-bar>
      </div>
    </el-card>
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>3.人员统计</span>
      </div>
      <div class="text item">
        <p
          class="statistics"
        >{{nowYear}}年{{nowMonth?nowMonth:12}}月共有8人参与到安中云日常管理中，所有工作人员共在云平台中处理故障5次，处理隐患2次。</p>
        <el-table stripe border :data="tableData" align="center" style="width: 100%">
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
        </div> -->
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
  getCount,
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
    }
  },
  mounted() {
    this.initPreMonth();
    if (this.datetime == "") {
      this.datetime = this.nowYear + "-" + this.nowMonth;
    }

    getCount({ datetime: this.datetime + "-1" }).then(response => {
      if (response.code == 200) {
        console.log(response);
        let _data = response.rows;
        let _tableData = [];
        _data.map((item, i) => {
          let temp = {};

          if (i == 0) {
            temp.name = item.name;
            if (item.type == "G") {
              temp.errCount = item.count;
              temp.hazardCount = 0;
            } else {
              temp.hazardCount = item.count;
              temp.errCount = 0;
            }
          } else {
            _tableData.map((citem, j) => {
              if (citem.name == item.name) {
                if (item.type == "G") {
                  _tableData[j].errCount = item.count;
                } else {
                  _tableData[j].hazardCount = item.count;
                }
              } else {
                temp.name = item.name;
                if (item.type == "G") {
                  temp.errCount = item.count;
                  temp.hazardCount = 0;
                } else {
                  temp.hazardCount = item.count;
                  temp.errCount = 0;
                }
              }
            });
          }
          if (JSON.stringify(temp) == "{}") {
            return;
          }
          _tableData.push(temp);
          this.tableData = _tableData;
        });
         // this.total = response.total;
        // this.tableData = response.rows;
       
      }
    });

    getServiceCount({
      datetime: this.datetime + "-1"
    }).then(response => {
      let _data = response.data;
      _data.map((item, i) => {
        if (item.type == "app") {
          this.appCount = item.count;
        } else if (item.type == "message") {
          this.msgCount = item.count;
        }
      });
    });
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