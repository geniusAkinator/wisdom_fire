<template>
  <el-row :gutter="10" class="statistics">
    <el-col :sm="6" :xs="12">
      <div class="sta_item">
        <i class="el-icon-user"></i>
        <router-link class="item" :to="'/main/factory'">
          <div>
            工厂总数:
            <count-to :start-val="0" :end-val="20" :duration="2600" class="card-panel-num" />
          </div>
        </router-link>
        <router-link class="item" :to="'/team/department'">
          <div>
            人员总数:
            <span>55</span>
          </div>
        </router-link>
      </div>
    </el-col>
    <el-col :sm="6" :xs="12">
      <div class="sta_item">
        <i class="el-icon-link"></i>
        <router-link class="item" :to="'sensor'">
          <div>
            在线设备:
            <count-to :start-val="0" :end-val="20" :duration="2600" class="card-panel-num" />
          </div>
        </router-link>
        <router-link class="item" :to="'sensor'">
          <div>
            离线设备:
            <count-to :start-val="0" :end-val="20" :duration="2600" class="card-panel-num" />
          </div>
        </router-link>
      </div>
    </el-col>
    <el-col :sm="6" :xs="12">
      <div class="sta_item">
        <i class="el-icon-circle-close"></i>
        <router-link class="item" :to="'/hazard/overview'">
          <div>
            隐患总数:
            <count-to :start-val="0" :end-val="20" :duration="2600" class="card-panel-num" />
          </div>
        </router-link>
        <router-link class="item" :to="''">
          <div>
            处理总数:
            <count-to :start-val="0" :end-val="20" :duration="2600" class="card-panel-num" />
          </div>
        </router-link>
      </div>
    </el-col>
    <el-col :sm="6" :xs="12">
      <div class="sta_item">
        <i class="el-icon-s-order"></i>
        <router-link class="item" :to="''">
          <div>
            任务总数:
            <count-to :start-val="0" :end-val="20" :duration="2600" class="card-panel-num" />
          </div>
        </router-link>
        <router-link class="item" :to="''">
          <div>
            完成总数:
            <count-to :start-val="0" :end-val="20" :duration="2600" class="card-panel-num" />
          </div>
        </router-link>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from "vue-count-to";
export default {
  components: {
    CountTo
  },
  methods: {}
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
.sta_item i {
  background-color: #409eff;
}
.statistics > div:nth-child(2) i {
  background-color: #67c23a;
}
.statistics > div:nth-child(3) i {
  background-color: #f56c6c;
}
.statistics > div:nth-child(4) i {
  background-color: #909399;
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
