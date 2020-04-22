<template>
  <div class="container">
    <el-card class="factory_detail" shadow="never">
      <div slot="header" class="clearfix">
        <span>工厂概况</span>
      </div>
      <div class="text item">
        <el-row>
          <el-col :span="8">
            <div class="fac_logo">
              <el-image class="logo_img" :src="baseUrl+form.picture" fit="contain">
                <div slot="error" class="logo_img_err">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
              <span class="logo_name">{{form.factoryName}}</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="detail-item">
              <label for>所属代理商:</label>
              <span>{{deptName}}</span>
            </div>
            <div class="detail-item">
              <label for>工厂类型:</label>
              <span>{{factoryTypeName}}</span>
            </div>
            <div class="detail-item">
              <label for>负责人:</label>
              <span>{{form.leader}}(+86&nbsp;{{form.phone}})</span>
            </div>
            <div class="detail-item">
              <label for>座机号:</label>
              <span>
                <template>{{form.tel}}</template>
              </span>
            </div>
            <div class="detail-item">
              <label for>地址:</label>
              <span>{{form.address}}</span>
            </div>
            <div class="detail-item">
              <label for>位置:</label>
              <my-map-pos :data="pos" v-if="pos.lat!=''&&pos.lng!=''&&update"></my-map-pos>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="detail-item">
              <label for>设备总数:</label>
              <span>N/A</span>
            </div>
            <div class="detail-item">
              <label for>员工总数:</label>
              <span>N/A</span>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>

    <div class="button_wrap">
      <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAdd">新增传感器</el-button>
    </div>
    <div class="sensor_wrap">
      <div class="sensor_item" v-for="(item,i) in sensorList" :key="i">
        <el-image class="sensor_pic"></el-image>
        <div class="sensor_detail">
          <template
            v-if="item.transducerNew.deviceStatus == 0 && item.sensorFaultType == undefined"
          >
            <div class="circle success" title="在线"></div>
          </template>
          <template
            v-else-if="item.transducerNew.deviceStatus == 1 && item.sensorFaultType == undefined"
          >
            <div class="circle info" title="离线"></div>
          </template>
          <template v-else-if="item.sensorFaultType != undefined">
            <div class="circle danger" :title="item.sensorFaultType"></div>
          </template>
          <template v-if="item.transducerNew.batteryPercentage ==0">
            <div
              data-charge="0"
              class="battery"
              :title="'电量剩余'+item.transducerNew.batteryPercentage+'%'"
            ></div>
          </template>
          <template
            v-else-if="item.transducerNew.batteryPercentage >=0 && item.transducerNew.batteryPercentage <=10"
          >
            <div
              data-charge="1"
              class="battery"
              :title="'电量剩余'+item.transducerNew.batteryPercentage+'%'"
            ></div>
          </template>
          <template
            v-else-if="item.transducerNew.batteryPercentage >10 && item.transducerNew.batteryPercentage <=20"
          >
            <div
              data-charge="2"
              class="battery"
              :title="'电量剩余'+item.transducerNew.batteryPercentage+'%'"
            ></div>
          </template>
          <template
            v-else-if="item.transducerNew.batteryPercentage >20 && item.transducerNew.batteryPercentage <=30"
          >
            <div
              data-charge="3"
              class="battery"
              :title="'电量剩余'+item.transducerNew.batteryPercentage+'%'"
            ></div>
          </template>
          <template
            v-else-if="item.transducerNew.batteryPercentage >30 && item.transducerNew.batteryPercentage <=40"
          >
            <div
              data-charge="4"
              class="battery"
              :title="'电量剩余'+item.transducerNew.batteryPercentage+'%'"
            ></div>
          </template>
          <template
            v-else-if="item.transducerNew.batteryPercentage >40 && item.transducerNew.batteryPercentage <=50"
          >
            <div
              data-charge="5"
              class="battery"
              :title="'电量剩余'+item.transducerNew.batteryPercentage+'%'"
            ></div>
          </template>
          <template
            v-else-if="item.transducerNew.batteryPercentage >50 && item.transducerNew.batteryPercentage <=60"
          >
            <div
              data-charge="6"
              class="battery"
              :title="'电量剩余'+item.transducerNew.batteryPercentage+'%'"
            ></div>
          </template>
          <template
            v-else-if="item.transducerNew.batteryPercentage >60 && item.transducerNew.batteryPercentage <=70"
          >
            <div
              data-charge="7"
              class="battery"
              :title="'电量剩余'+item.transducerNew.batteryPercentage+'%'"
            ></div>
          </template>
          <template
            v-else-if="item.transducerNew.batteryPercentage >70 && item.transducerNew.batteryPercentage <=80"
          >
            <div
              data-charge="8"
              class="battery"
              :title="'电量剩余'+item.transducerNew.batteryPercentage+'%'"
            ></div>
          </template>
          <template
            v-else-if="item.transducerNew.batteryPercentage >80 && item.transducerNew.batteryPercentage <=90"
          >
            <div
              data-charge="9"
              class="battery"
              :title="'电量剩余'+item.transducerNew.batteryPercentage+'%'"
            ></div>
          </template>
          <template
            v-else-if="item.transducerNew.batteryPercentage >90 && item.transducerNew.batteryPercentage <=100"
          >
            <div
              data-charge="10"
              class="battery"
              :title="'电量剩余'+item.transducerNew.batteryPercentage+'%'"
            ></div>
          </template>
          <template v-if="item.transducerNew.rxLev <=84">
            <div data-signal="4" class="signal" title="信号强度优">
              <div v-for="i in 6" :key="i"></div>
            </div>
          </template>
          <template v-else-if="item.transducerNew.rxLev >84 &&item.transducerNew.rxLev <=94">
            <div data-signal="3" class="signal" title="信号强度良好">
              <div v-for="i in 6" :key="i"></div>
            </div>
          </template>
          <template v-else-if="item.transducerNew.rxLev >94 &&item.transducerNew.rxLev <=105">
            <div data-signal="2" class="signal" title="信号强度差">
              <div v-for="i in 6" :key="i"></div>
            </div>
          </template>
          <template v-else-if="item.transducerNew.rxLev >105">
            <div data-signal="1" class="signal" title="信号强度极差">
              <div v-for="i in 6" :key="i"></div>
            </div>
          </template>
          <div class="sensor_number">{{item.transducerOld.deviceNumber}}</div>
          <span>设备型号:{{item.transducerName}}</span>
          <span>位置:{{item.building.name}}-{{item.floor.floorName}}</span>
          <span>点位描述:{{item.transducerOld.currlocation}}</span>
          <span>到期时间:{{item.transducerOld.expirationDate == null ?'' :parseTime(item.transducerOld.expirationDate,'{y}-{m}-{d}')}}</span>
          <span v-if="item.transducerNew.liquidLevel">液位值(m):{{item.transducerNew.liquidLevel}}</span>
          <span v-if="item.transducerNew.temp">温度值(℃):{{item.transducerNew.temp}}</span>
          <span v-if="item.transducerNew.current">电流(A):{{item.transducerNew.current}}</span>
          <span v-if="item.transducerNew.voltage">电压(V):{{item.transducerNew.voltage}}</span>
          <span v-if="item.transducerNew.power">功率(W):{{item.transducerNew.power}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getFactory, listSensorByFactoryId } from "@/api/main/factory";
import { listDept } from "@/api/system/dept";
import MyMapPos from "@/views/main/factory/map";
import { parseTimeStr, parseTime } from "@/utils/common";
import MySensorAdd from "@/views/main/factory/sadd";

export default {
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_API,
      id: this.$route.params.id,
      form: {
        factoryName: "",
        address: "",
        description: "",
        factoryType: "",
        latitude: "",
        leader: "",
        longitude: "",
        phone: "",
        picture: "",
        province: "",
        tel: "",
        factoryId: this.$parent.eid,
        deptId: ""
      },
      pos: {
        lat: "",
        lng: ""
      },
      update: true,
      dlist: [],
      deptName: "",
      factoryTypeName: "",
      typeOptions: [],
      deptId: 0,
      sensorList: [],
      layerId: ""
    };
  },
  watch: {
    "form.factoryType"(nVal, oVal) {
      this.typeOptions.map((item, i) => {
        if (item.dictValue == this.form.factoryType) {
          this.factoryTypeName = item.dictLabel;
        }
      });
    },
    "form.deptId"(nVal, oVal) {
      this.dlist.map((item, i) => {
        item.children.map((citem, j) => {
          if (citem.deptId == this.form.deptId) {
            this.deptName = item.deptName;
          }
        });
        if (item.deptId == this.form.deptId) {
          this.deptName = item.deptName;
        }
      });
    }
  },
  methods: {
    init() {
      listDept().then(response => {
        if (response.code == 200) {
          this.dlist = response.data[0].children;
        }
      });
      this.getDicts("main_factory_type").then(response => {
        if (response.code == 200) {
          this.typeOptions = response.data;
        }
      });
      getFactory(this.id).then(response => {
        if (response.code === 200) {
          let _data = response.data;
          this.deptId = _data.pId;
          this.form = _data.sysFactory;
          this.pos.lat = _data.sysFactory.latitude;
          this.pos.lng = _data.sysFactory.longitude;
        }
      });
      listSensorByFactoryId({ factoryId: this.id }).then(response => {
        if (response.code === 200) {
          let _data = response.data;
          console.log(_data);
          this.sensorList = _data;
        }
      });
    },
    reload() {
      this.update = false;
      this.$nextTick(() => {
        this.update = true;
      });
    },
    handleAdd() {
      var index = this.$layer.iframe({
        content: {
          content: MySensorAdd, //传递的组件对象
          parent: this, //当前的vue对象
          data: {} //props
        },
        shade: true,
        area: ["600px", "600px"],
        title: "新增传感器",
        target: ".app-main"
      });
      this.layerId = index;
      this.$layer.full(index);
    }
  },
  mounted() {
    this.init();
    window.addEventListener("resize", this.reload);
  },
  components: {
    MyMapPos
  }
};
</script>

<style lang="scss">
.factory_detail {
  background: rgb(48, 65, 86);
  color: #fff;
  .fac_logo {
    .logo_img {
      width: 200px;
      height: 200px;
      display: block;
      margin: auto;
      border-radius: 4px;
    }
    .logo_name {
      display: block;
      font-weight: bold;
      font-size: 16px;
      width: 100%;
      text-align: center;
      margin-top: 20px;
    }
    .logo_img_err {
      width: 200px;
      height: 200px;
      border-radius: 4px;
      background: #f5f7fa;
      color: #909399;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 30px;
    }
  }
  .detail-item {
    width: 100%;
    overflow: hidden;
    line-height: 36px;
    label {
      display: block;
      text-align: right;
      float: left;
      font-size: 14px;
      color: #e0e0e0;
      line-height: 40px;
      padding: 0 12px 0 0;
      box-sizing: border-box;
      line-height: 36px;
      width: 100px;
    }
  }
}
.sensor_wrap {
  margin-top: 20px;
  padding-bottom: 20px;
  overflow: hidden;
}
.sensor_item {
  width: 370px;
  border: 1px solid rgb(226, 226, 226);
  float: left;
  padding: 20px;
  background: #fff;
  margin-right: 20px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15), 0 2px 2px rgba(0, 0, 0, 0.15),
    0 4px 4px rgba(0, 0, 0, 0.15), 0 8px 8px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  position: relative;
  margin-bottom: 10px;
  min-height: 250px;
}
.sensor_item span {
  display: block;
  width: 100%;
  margin-bottom: 5px;
  color: #676767;
  font-size: 14px;
  position: relative;
}

.sensor_pic {
  width: 80px;
  height: 80px;
  float: left;
  margin-right: 15px;
  border-radius: 5px;
}
.sensor_detail {
  float: left;
}
.sensor_number {
  font-weight: 500;
  color: #000;
  font-size: 16px;
  margin-bottom: 5px;
}
.sensor_item .circle {
  position: absolute;
  right: 20px;
  top: 20px;
}
.circle {
  width: 14px;
  height: 14px;
  display: block;
  border-radius: 50%;
  margin-right: 5px;
}
.circle.success {
  background: rgb(105, 199, 58);
  box-shadow: 0 0 10px rgba(105, 199, 58, 0.8);
}
// .circle.warning {
//   background: rgb(230, 162, 61);
//   box-shadow: 0 0 10px rgba(230, 162, 60, 0.8);
// }
.circle.danger {
  background: #f56c6c;
  box-shadow: 0 0 10px rgba(245, 108, 108, 0.8);
}
.circle.info {
  background: rgb(144, 147, 153);
  box-shadow: 0 0 10px rgba(144, 147, 153, 0.8);
}
.button_wrap {
  margin-top: 20px;
}
.sensor_item .battery {
  position: absolute;
  top: 123px;
  left: 65px;
}
.battery {
  color: #34495e;
  border: 1px solid currentColor;
  display: inline-block;
  width: 28px;
  height: 14px;
  position: relative;
  border-radius: 2px;
  display: border-box;
  transition: color 500ms;
}
.battery::before,
.battery::after {
  content: "";
  position: absolute;
}
.battery::before {
  top: 2px;
  bottom: 2px;
  right: -3px;
  width: 1px;
  display: border-box;
  border: 1px solid currentColor;
  border-left: 0;
}
.battery::after {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 1px;
  border-radius: 1px;
  background-color: currentColor;
  transition: right 500ms;
}
.battery.low {
  color: #f56c6c;
}
.battery.low::after {
  right: 80%;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.battery.med {
  color: #f39c12;
}
.battery.med::after {
  right: 40%;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.battery.full {
  color: #69c73a;
}
.battery[data-charge="0"],
.battery[data-charge="1"],
.battery[data-charge="2"],
.battery[data-charge="3"] {
  color: #c0392b;
}
.battery[data-charge="4"],
.battery[data-charge="5"],
.battery[data-charge="6"] {
  color: #e6a23c;
}
.battery[data-charge="7"],
.battery[data-charge="8"],
.battery[data-charge="9"],
.battery[data-charge="10"] {
  color: #69c73a;
}

.battery[data-charge="0"]::after {
  right: 100%;
}
@for $i from 1 through 10 {
  .battery[data-charge="#{$i}"]::after {
    right: 100% - $i * 10%;
  }
}

.signal {
  position: absolute;
  top: 140px;
  left: 25px;
}
.signal div {
  width: 3px;
  position: absolute;
  bottom: 0;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.5);
}
@for $i from 1 through 4 {
  .signal div:nth-child(#{$i}) {
    height: 2px + 4 * $i;
    left: 0 + 5px * $i;
  }
}
.signal[data-signal="1"] div:nth-child(1),
.signal[data-signal="2"] div:nth-child(1),
.signal[data-signal="2"] div:nth-child(2),
.signal[data-signal="3"] div:nth-child(1),
.signal[data-signal="3"] div:nth-child(2),
.signal[data-signal="3"] div:nth-child(3),
.signal[data-signal="4"] div:nth-child(1),
.signal[data-signal="4"] div:nth-child(2),
.signal[data-signal="4"] div:nth-child(3),
.signal[data-signal="4"] div:nth-child(4) {
  background: #69c73a;
}
</style>