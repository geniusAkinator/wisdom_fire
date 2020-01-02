<template>
  <div class="container">
    <el-row :gutter="10">
      <el-col>
        <panel-group @handleSetLineChartData="handleSetLineChartData" />
      </el-col>
      <el-col :md="16">
        <el-col :md="24">
          <el-card class="box-card no-padding" shadow="hover">
            <div class="text item" style="height:700px">
              <my-map :list.sync="geoList"></my-map>
            </div>
          </el-card>
        </el-col>
        <el-col :md="24" style="margin-top:10px">
          <el-card class="box-card no-padding" shadow="hover">
            <div slot="header" class="clearfix">
              <i class="el-icon-receiving"></i>
              <span>数据概览</span>
            </div>
            <div class="text item">
              <el-carousel
                indicator-position="outside"
                arrow="never"
                :autoplay="false"
                :height="'500px'"
              >
                <el-carousel-item></el-carousel-item>
                <el-carousel-item>bbb</el-carousel-item>
                <el-carousel-item>ccc</el-carousel-item>
              </el-carousel>
            </div>
          </el-card>
        </el-col>
      </el-col>
      <el-col :md="8">
        <el-col :md="24">
          <el-card class="box-card" shadow="hover">
            <div slot="header" class="clearfix">
              <i class="el-icon-s-promotion"></i>
              <span>日历</span>
            </div>
            <div class="text">
              <div class="tips">
                <div class="tips-item">
                  <i class="circle warning"></i>
                  报警
                </div>
                <div class="tips-item">
                  <i class="circle danger"></i>
                  故障
                </div>
                <div class="tips-item">
                  <i class="circle info"></i>
                  离线
                </div>
              </div>
              <!-- <my-calendar class="calendar" :list="calList"></my-calendar> -->
            </div>
          </el-card>
        </el-col>
        <el-col :md="24" style="margin-top:10px">
          <el-card class="box-card" shadow="hover">
            <div slot="header" class="clearfix">
              <i class="el-icon-data-line"></i>
              <span>本月隐患</span>
              <el-button class="header_right" type="text">
                <el-radio-group v-model="labelPos" size="small">
                  <el-radio-button label="monthly">月报</el-radio-button>
                  <el-radio-button label="weekly">周报</el-radio-button>
                </el-radio-group>
              </el-button>
            </div>
            <div class="text item"></div>
          </el-card>
        </el-col>
        <el-col :md="24" style="margin-top:10px">
          <el-card class="box-card" shadow="hover">
            <div slot="header" class="clearfix">
              <i class="el-icon-edit-outline"></i>
              <span>操作日志</span>
            </div>
            <div class="text item" style="min-height:300px;height:auto">
              <div class="block">
                <el-timeline>
                  <el-timeline-item timestamp="2019/10/10" placement="top">
                    <el-card shadow="hover">
                      <h4>修改了什么什么页面</h4>
                      <p>admin 提交于 2019/10/10 20:46</p>
                    </el-card>
                  </el-timeline-item>
                  <el-timeline-item timestamp="2019/10/10" placement="top">
                    <el-card shadow="hover">
                      <h4>修改了什么什么页面</h4>
                      <p>admin 提交于 2019/10/10 20:46</p>
                    </el-card>
                  </el-timeline-item>
                  <el-timeline-item timestamp="2019/10/10" placement="top">
                    <el-card shadow="hover">
                      <h4>修改了什么什么页面</h4>
                      <p>admin 提交于 2019/10/10 20:46</p>
                    </el-card>
                  </el-timeline-item>
                </el-timeline>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-col>
    </el-row>
    <el-backtop target=".app-main"></el-backtop>
  </div>
</template>

<script>
import PanelGroup from "./dashboard/PanelGroup";
import MyMap from "@/components/Map/index";

export default {
  name: "Index",
  components: {
    PanelGroup,
    MyMap
  },
  data() {
    return {
      geoList: [],
      calList: [],
      labelPos: "weekly"
    };
  },
  methods: {
    handleSetLineChartData(type) {}
  }
};
</script>

<style lang="scss">
.echarts {
  width: 100%;
  height: 100%;
}
.box-card .text.item {
  width: 100%;
  min-height: 300px;
}
.fast_box li {
  list-style: none;
  display: flex;
  padding: 10px 0;
}
.fast_box p {
  margin: 0;
}
.fast_box a {
  margin-left: auto;
}
.fast_box {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
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
