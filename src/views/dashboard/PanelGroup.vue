<template>
  <el-row :gutter="10" class="statistics">
    <el-col :sm="6" :xs="12">
      <div class="sta_item">
        <i class="el-icon-user"></i>
        <router-link class="item" :to="'/main/factory'">
          <div>
            工厂总数:
            <count-to
              :start-val="0"
              :end-val="factoryCount"
              :duration="2600"
              class="card-panel-num"
            />
          </div>
        </router-link>
        <router-link class="item" :to="'/team/department'">
          <div>
            人员总数:
            <count-to
              :start-val="0"
              :end-val="employeeCount"
              :duration="2600"
              class="card-panel-num"
            />
          </div>
        </router-link>
      </div>
    </el-col>
    <el-col :sm="6" :xs="12">
      <div class="sta_item">
        <i class="el-icon-link"></i>
        <router-link class="item" :to="''">
          <div>
            在线设备:
            <count-to :start-val="0" :end-val="onlineCount" :duration="2600" class="card-panel-num" />
          </div>
        </router-link>
        <router-link class="item" :to="''">
          <div>
            离线设备:
            <count-to :start-val="0" :end-val="outlineCount" :duration="2600" class="card-panel-num" />
          </div>
        </router-link>
      </div>
    </el-col>
    <el-col :sm="6" :xs="12">
      <div class="sta_item">
        <i class="el-icon-warning-outline"></i>
        <router-link class="item" :to="'/hazard/overview'">
          <div>
            隐患总数:
            <count-to
              :start-val="0"
              :end-val="hazardCount"
              :duration="2600"
              class="card-panel-num"
            />
          </div>
        </router-link>
        <router-link class="item" :to="'/hazard/overview'">
          <div>
            处理总数:
            <count-to
              :start-val="0"
              :end-val="hazardHandleCount"
              :duration="2600"
              class="card-panel-num"
            />
          </div>
        </router-link>
      </div>
    </el-col>
    <el-col :sm="6" :xs="12">
      <div class="sta_item">
        <i class="el-icon-circle-close"></i>
        <router-link class="item" :to="'/devOps/ops'">
          <div>
            故障总数:
            <count-to :start-val="0" :end-val="errCount" :duration="2600" class="card-panel-num" />
          </div>
        </router-link>
        <router-link class="item" :to="'/devOps/ops'">
          <div>
            处理总数:
            <count-to
              :start-val="0"
              :end-val="errHandleCount"
              :duration="2600"
              class="card-panel-num"
            />
          </div>
        </router-link>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from "vue-count-to";
import { getGrandTotal } from "@/api/main/factory";
export default {
  data() {
    return {
      factoryCount: 0,
      employeeCount: 0,
      hazardCount: 0,
      hazardHandleCount: 0,
      errCount: 0,
      errHandleCount: 0,
      onlineCount: 0,
      outlineCount: 0
    };
  },
  methods: {},
  mounted() {
    getGrandTotal().then(response => {
      if (response.code == 200) {
        let _data = response.data;
        console.log(_data);
        this.factoryCount = _data.factoryIdCount;
        this.employeeCount = _data.employeeCount;
        this.hazardCount = _data.hiddenDangerCount[0].countSum;
        this.hazardHandleCount = _data.hiddenDangerCount[0].handleCount;
        this.errCount = _data.sensorFaultCount[0].countSum;
        this.errHandleCount = _data.sensorFaultCount[0].handleCount;
        _data.sysMonitoringStatistics.map((item, i) => {
          if (item.deviceStatus == 1) {
            this.onlineCount = item.count;
          } else {
            this.outlineCount = item.count;
          }
        });
      }
    });
  },
  components: {
    CountTo
  }
};
</script>

<style lang="scss">
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
</style>
