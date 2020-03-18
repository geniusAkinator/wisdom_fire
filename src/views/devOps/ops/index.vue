<template>
  <div class="app-container">
    <el-card class="state-card" shadow="never">
      <el-row :gutter="20">
        <el-col :span="10">
          <ul class="state_block">
            <li class="state_item">
              <span>实时待处理</span>
              <div class="border-circle warning">{{realTimeCount}}</div>
            </li>
            <li class="state_item">
              <span>累计故障</span>
              <div class="border-circle danger">{{allCount}}</div>
            </li>
          </ul>
        </el-col>
        <el-col :span="14">
          <ul class="info_block" style="width:50%">
            <li class="info_item">
              <span class="info_name">故障最多单位:</span>
              <span>{{mostFactory}}</span>
            </li>
          </ul>
        </el-col>
      </el-row>
    </el-card>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick" class="devops-tab">
      <el-tab-pane label="待处理" name="first">
        <el-table
          stripe
          border
          :data="waitingList"
          align="center"
          style="width: 100%"
          v-loading="loading1"
        >
          <el-table-column label="ID" type="index" align="center">
            <template slot-scope="scope">
              <span>{{(queryParams.pageNum - 1) * queryParams.pageSize + scope.$index + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="factoryName" label="单位"></el-table-column>
          <el-table-column prop="sensorName" label="设备类型"></el-table-column>
          <el-table-column prop="type" label="故障类型"></el-table-column>
          <el-table-column prop="content" label="故障内容"></el-table-column>
          <el-table-column prop="currlocation" label="点位描述"></el-table-column>
          <el-table-column prop="currdate" label="首次上报时间" width="160px">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.currdate) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="uptime" label="更新时间" width="160px">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.uptime) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="80px">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
              <!-- <el-button
                size="mini"
                type="primary"
                @click="handleAppoint(scope.$index, scope.row)"
              >指派任务</el-button>-->
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="处理中" name="second">
        <el-table
          stripe
          border
          :data="processingList"
          align="center"
          style="width: 100%"
          v-loading="loading2"
        >
          <el-table-column prop="id" label="ID" width="80"></el-table-column>
          <el-table-column prop="factoryName" label="单位"></el-table-column>
          <el-table-column prop="sensorName" label="设备类型"></el-table-column>
          <el-table-column prop="type" label="故障类型"></el-table-column>
          <el-table-column prop="content" label="故障内容"></el-table-column>
          <el-table-column prop="currlocation" label="点位描述"></el-table-column>
          <el-table-column prop="uptime" label="更新时间" width="160px">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.uptime) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="80px">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
              <!-- <el-button size="mini" type="danger" @click="handleRevoke(scope.$index, scope.row)">撤销</el-button> -->
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="已处理" name="third">
        <el-table
          stripe
          border
          :data="handledList"
          align="center"
          style="width: 100%"
          v-loading="loading3"
        >
          <el-table-column prop="id" label="ID" width="80"></el-table-column>
          <el-table-column prop="factoryName" label="单位"></el-table-column>
          <el-table-column prop="sensorName" label="设备类型"></el-table-column>
          <el-table-column prop="type" label="故障类型"></el-table-column>
          <el-table-column prop="currlocation" label="点位描述"></el-table-column>
          <el-table-column prop="repair" label="解决时间" width="160px">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.repair) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="80px">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getSensorFaultList } from "@/api/devops/ops";
import { parseTimeStr, parseTime } from "@/utils/common";
import MyAppointAdd from "@/views/devOps/ops/add";
import { revokeAppoint } from "@/api/devops/ops";

export default {
  name: "OverView",
  data() {
    return {
      // 遮罩层
      loading1: true,
      loading2: true,
      loading3: true,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10
      },
      waitingList: [],
      processingList: [],
      handledList: [],
      // 表单参数
      form: {
        pageNum: 1,
        pageSize: 10,
        state: 0
      },
      rowId: 0,
      layerId: "",
      activeName: "first",
      rowFactoryId: "",
      realTimeCount: 0,
      allCount: 0,
      mostFactory: "",
      eid: 0
    };
  },
  watch: {
    activeName(nVal, oVal) {
      let _this = this;
      if (nVal == "first") {
        _this.form.state = 0;
      } else if (nVal == "second") {
        _this.form.state = 1;
      } else if (nVal == "third") {
        _this.form.state = 2;
      }
      _this.getList();
    }
  },
  methods: {
    handleClick() {},
    /** 查询菜单列表 */
    getList() {
      let _this = this;
      getSensorFaultList(_this.form).then(response => {
        if (response.code == 200) {
          let _data = response.data;
          _this.realTimeCount = _data.realTimeCount;
          _this.allCount = _data.sum;
          _this.mostFactory = _data.factoryName;
          let _row = _data.sensorFaultList;
          let _factoryName = _data.factoryName;
          let _arr = [];
          _row.map((item, i) => {
            let temp = {};
            temp.id = item.id;
            temp.factoryName = item.factoryName;
            temp.sensorName = item.sensorName;
            temp.type = item.type;
            temp.uptime = item.uptime;
            temp.content = item.content;
            temp.currdate = item.currdate;
            temp.repair = item.repair;
            temp.currlocation = item.currlocation;
            temp.factoryId = item.factoryId;
            temp.sid = item.transducerId;
            _arr.push(temp);
          });
          _this.waitingList = _row;
          if (_this.form.state == 0) {
            _this.loading1 = false;
            _this.waitingList = _arr;
          } else if (_this.form.state == 1) {
            _this.loading2 = false;
            _this.processingList = _arr;
          } else if (_this.form.state == 2) {
            _this.loading3 = false;
            _this.handledList = _arr;
          }
        }
      });
    },
    handleDetail(index, row) {
      this.$router.push({
        name: "OpsDetail",
        params: { id: row.id, sid: row.sid }
      });
    },
    handleAppoint(index, row) {
      var index = this.$layer.iframe({
        content: {
          content: MyAppointAdd, //传递的组件对象
          parent: this, //当前的vue对象
          data: {} //props
        },
        shade: true,
        area: ["800px", "600px"],
        title: "指派任务",
        target: ".app-main"
      });
      this.layerId = index;
      this.rowFactoryId = row.factoryId;
      this.eid = row.id;
    },
    handleRevoke(index, row) {
      //撤销，无操作步骤的即为刚下发的任务可以撤销
      revokeAppoint({ sensorId: row.id }).then(response => {
        if (response.code === 200) {
          this.msgSuccess("撤销成功");
          this.getList();
        }
      });
    }
  },
  created() {
    this.getList();
  }
};
</script>

<style>
.border-circle {
  width: 100px;
  height: 100px;
  border: 2px solid #409eff;
  text-align: center;
  line-height: 100px;
  border-radius: 50%;
}
.border-circle.danger {
  border: 2px solid #f56c6c;
  background: #fff;
}
.border-circle.warning {
  border: 2px solid #e6a23c;
  background: #fff;
}
.state_block {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.state_item > span {
  display: block;
  font-weight: bold;
  margin-bottom: 10px;
}
.devops-tab {
  margin-top: 10px;
}
.info_block {
  list-style-type: none;
  margin: 0;
  padding: 0;
  position: relative;
  padding: 0 20px;
}
.info_item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.info_item:last-child {
  margin-bottom: 0;
}
.info_name {
  font-weight: bold;
}
</style>