
<template>
  <div class="container">
    <el-card class="state-card" shadow="never">
      <el-row :gutter="20">
        <el-col :span="8">
          <ul class="info_block">
            <li class="info_item">
              <span class="info_item_name">所属工厂:</span>
              <span class="info_item_value">{{info.factoryName}}</span>
            </li>
            <li class="info_item">
              <span class="info_item_name">所属楼宇:</span>
              <span class="info_item_value">{{info.buildingName}}</span>
            </li>
            <li class="info_item">
              <span class="info_item_name">所属楼层:</span>
              <span class="info_item_value">{{info.floorName}}</span>
            </li>
          </ul>
        </el-col>
        <el-col :span="8">
          <ul class="info_block">
            <li class="info_item">
              <span class="info_item_name">设备编号:</span>
              <span class="info_item_value">
                <template
                  v-if="info.deviceNumber!=null&&info.deviceNumber!=''"
                >{{info.deviceNumber}}</template>
                <template v-else>N/A</template>
              </span>
            </li>
            <li class="info_item">
              <span class="info_item_name">设备型号:</span>
              <span class="info_item_value">
                <template v-if="info.ttId!=null&&info.ttId!=''">{{info.type}}</template>
                <template v-else>N/A</template>
              </span>
            </li>
            <li class="info_item">
              <span class="info_item_name">点位描述:</span>
              <span class="info_item_value">
                <template
                  v-if="info.currLocation!=null&&info.currLocation!=''"
                >{{info.currLocation}}</template>
                <template v-else>N/A</template>
              </span>
            </li>
          </ul>
        </el-col>
        <el-col :span="8">
          <ul class="info_block">
            <li class="info_item">
              <span class="info_item_name">故障类型:</span>
              <span class="info_item_value">
                <template v-for="(item,i) in typeOptions">
                  <span :key="i" v-if="item.dictValue == info.type">{{item.dictLabel}}</span>
                </template>
              </span>
            </li>
            <li class="info_item">
              <span class="info_item_name">故障状态:</span>
              <span class="info_item_value">
                <template v-if="info.state == 0">待处理</template>
                <template v-else-if="info.state == 1">处理中</template>
                <template v-else-if="info.state == 2">已处理</template>
              </span>
            </li>
            <li class="info_item">
              <span class="info_item_name">故障描述:</span>
              <span class="info_item_value">{{info.content}}</span>
            </li>
            <li class="info_item">
              <span class="info_item_name">上报时间:</span>
              <span class="info_item_value">
                <template v-if="info.currDate!=null&&info.currDate!=''">{{parseTime(info.currDate)}}</template>
                <template v-else>N/A</template>
              </span>
            </li>
            <li class="info_item">
              <span class="info_item_name">更新时间:</span>
              <span class="info_item_value">
                <template v-if="info.uptime!=null&&info.uptime!=''">{{parseTime(info.uptime)}}</template>
                <template v-else>N/A</template>
              </span>
            </li>
            <li class="info_item">
              <span class="info_item_name">完成时间:</span>
              <span class="info_item_value">
                <template v-if="info.repair!=null&&info.repair!=''">{{parseTime(info.repair)}}</template>
                <template v-else>N/A</template>
              </span>
            </li>
          </ul>
        </el-col>
      </el-row>
    </el-card>
    <el-row :gutter="20" style="margin-top:20px">
      <el-col :span="12">
        <div class="detail_img_content">
          <img :src="baseUrl+info.pictur" style="width: 100%;" />
          <img
            ref="marker"
            :style="{left:info.xaxis+'%',top:info.yaxis+'%',position:'absolute'}"
            class="floor_img_marker"
            :src="icon"
          />
          <div class="not_found" v-if="info.pictur==''">暂无楼层图，请先到工厂管理中添加</div>
        </div>
      </el-col>
      <el-col :span="12">
        <span class="subtitle">进度预览</span>
        <el-timeline>
          <!-- <el-timeline-item timestamp="2020/5/3" placement="top">
            <el-card shadow="never">
              <h5>
                <el-tag type="success" effect="dark">已处理</el-tag>
              </h5>
              <h4>传感器正常工作</h4>
              <p>王小虎 提交于 2020/5/3 13:20</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="2020/5/3" placement="top">
            <el-card shadow="never">
              <h5>
                <el-tag type="warning" effect="dark">处理中</el-tag>
              </h5>
              <h4>1.检测0℃时的敏感阻值;</h4>
              <h4>2.修前传感器化学除油、清除传感器表面氧化腐蚀层;</h4>
              <h4>3.进行修复;</h4>
              <h4>4.压缩空气吹干后,立即放入干燥箱内,60min后取出;</h4>
              <h4>5.自然冷却至常温后,测试温度传感器性能指标</h4>
              <p>王小虎 提交于 2020/5/3 10:12</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="2020/5/2" placement="top">
            <el-card shadow="never">
              <h5>
                <el-tag type="danger" effect="dark">待处理</el-tag>
              </h5>
              <h4>传感器温度过高</h4>
              <p>系统 上报 2020/5/2 14:46</p>
            </el-card>
          </el-timeline-item> -->
        </el-timeline>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getHazardDetail } from "@/api/hazard/overview";
import MyAppointAdd from "@/views/devOps/ops/add";
import { parseTimeStr, parseTime } from "@/utils/common";

export default {
  data() {
    return {
      dform: {
        hdId: this.$route.params.hdId,
        transducerId: this.$route.params.transducerId
      },
      info: {
        buildingName: "",
        repair: null,
        currLocation: "",
        factoryName: "",
        floorName: "",
        state: 0,
        type: "",
        currDate: "",
        deviceNumber: "11",
        deviceId: null,
        content: "",
        uptime: "",
        ttId: null,
        pictur: "",
        xaxis: 0,
        yaxis: 0
      },
      baseUrl: process.env.VUE_APP_BASE_API,
      icon: require("@/assets/image/map-marker.png"),
      typeOptions: []
    };
  },
  methods: {
    getAllInfoData() {
      let _this = this;
      getHazardDetail(_this.dform).then(response => {
        if (response.code == 200) {
          let _data = response.data;
          console.log(response);
          for (let key in _data) {
            this.info[key] = _data[key];
          }
          console.log(response.data);
        }
      });
    }
  },
  mounted() {
    this.getDicts("sys_type_hidden").then(response => {
      if (response.code == 200) {
        this.typeOptions = response.data;
      }
    });
    this.getAllInfoData();
  }
};
</script>

<style>
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
.detail_img_content {
  min-height: 100px;
  width: 100%;
  border: 1px solid #dcdfe6;
  overflow: hidden;
  cursor: crosshair;
  position: relative;
  line-height: 0;
}
.not_found {
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  line-height: 102px;
}
.subtitle {
  margin: 20px;
  display: block;
  font-weight: bold;
}
.info_item_name {
  font-weight: bold;
  display: block;
  width: 70px;
}
.info_item_value {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
  text-align: right;
}
</style>













