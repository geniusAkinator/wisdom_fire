<template>
  <div class="container form">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="所属工厂" prop="factoryId">
        <el-select v-model="form.factoryId" placeholder="请选择所属工厂">
          <el-option
            v-for="(item,index) in factoryList"
            :key="index"
            :label="item.factoryName"
            :value="item.factoryId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属楼宇" prop="buildingId">
        <el-select v-model="form.buildingId" placeholder="请选择所属楼宇">
          <el-option
            v-for="(item,index) in buildingList"
            :key="index"
            :label="item.name"
            :value="item.buildingId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属楼层" prop="floorId">
        <el-select v-model="form.floorId" placeholder="请选择所属楼层">
          <el-option
            v-for="(item,index) in floorList"
            :key="index"
            :label="item.floorName"
            :value="item.floorId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="点位置">
        <my-pos-picker :img="floorImg" @sendPos="getPos"></my-pos-picker>
      </el-form-item>
      <el-form-item label="点位描述" prop="currlocation">
        <el-input v-model="form.currlocation" type="textarea" placeholder="请输入点位描述" />
      </el-form-item>
      <el-form-item label="设备型号" prop="ttId">
        <el-select v-model="form.ttId" placeholder="请选择所属楼层" disabled>
          <el-option
            v-for="(item,index) in typeList"
            :key="index"
            :label="item.name"
            :value="item.ttId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="设备编号" prop="deviceNumber">
        <el-input v-model="form.deviceNumber" placeholder="请输入设备编号" />
      </el-form-item>
      <el-form-item label="到期时间" prop="expirationDate">
        <el-date-picker
          clearable
          size="small"
          style="width: 200px"
          v-model="form.expirationDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择到期时间"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="经纬度" prop="pos">
        <el-row class="form-map-picker">
          <el-col :span="6">
            <el-input
              placeholder
              v-model="form.latitude"
              type="number"
              oninput="value=value.replace(/[^\d.]/g,'')"
              :readonly="true"
            >
              <template slot="prepend">经度</template>
            </el-input>
          </el-col>
          <el-col :span="6">
            <el-input
              placeholder
              v-model="form.longitude"
              type="number"
              oninput="value=value.replace(/[^\d.]/g,'')"
              :readonly="true"
            >
              <template slot="prepend">纬度</template>
            </el-input>
          </el-col>
          <el-col :span="6">
            <i
              :class="isShow ? 'el-icon-map-location toggleMap active' : 'el-icon-map-location toggleMap'"
              @click="isShow=!isShow"
            ></i>
          </el-col>
        </el-row>
        <el-collapse-transition>
          <my-map-picker :region="nowRegion" v-show="isShow" @sendPoint="getPoint"></my-map-picker>
        </el-collapse-transition>
      </el-form-item>
    </el-form>
    <div class="add-footer">
      <el-button size="small" type="primary" icon="el-icon-check" @click="handleSubmit('form')">提交</el-button>
      <el-button size="small" icon="el-icon-back" @click="handleBack">返回</el-button>
    </div>
  </div>
</template>

<script>
import { listTransducertype } from "@/api/display/type";
import { listFactory } from "@/api/main/factory";
import { listBuilding } from "@/api/main/building";
import { listFloor } from "@/api/main/floor";
import { addTransducer } from "@/api/display/sensor";
import { Loading } from "element-ui";
import MyMapPicker from "@/components/MapPicker";
import MyPosPicker from "@/components/PosPicker";

export default {
  data() {
    return {
      form: {
        factoryId: "",
        buildingId: "",
        floorId: "",
        description: "",
        name: "",
        deviceNumber: "",
        expirationDate: "",
        currlocation: "",
        longitude: 0,
        latitude: 0,
        ttId: this.$parent.pid,
        xaxis: 0,
        yaxis: 0
      },
      floorImg: "",
      factoryList: [],
      buildingList: [],
      floorList: [],
      typeList: [],
      rules: {
        factoryId: [
          { required: true, message: "请选择所属工厂", trigger: "change" }
        ],
        buildingId: [
          { required: true, message: "请选择所属楼宇", trigger: "change" }
        ],
        floorId: [
          { required: true, message: "请选择所属楼层", trigger: "change" }
        ],
        currlocation: [
          { required: true, message: "点位描述不能为空", trigger: "blur" }
        ],
        deviceNumber: [
          { required: true, message: "设备编号不能为空", trigger: "blur" }
        ],
        expirationDate: [
          { required: true, message: "到期时间不能为空", trigger: "change" }
        ]
      },
      bform: {
        factoryId: 0
      },
      fform: {
        buildingId: 0
      },
      tform: {
        systemId: this.$route.query.id
      },
      isShow: true,
      nowRegion: "江苏"
    };
  },
  watch: {
    "form.factoryId": function(nVal, oVal) {
      this.bform.factoryId = nVal;
      this.form.buildingId = "";
      this.buildingList = [];
      this.getBuildingList();
    },
    "form.buildingId": function(nVal, oVal) {
      this.fform.buildingId = nVal;
      this.form.floorId = "";
      this.floorList = [];
      this.getFloorList();
    },
    "form.floorId": function(nVal, oVal) {
      let list = this.floorList;
      console.log(this.floorList);
      let floorImg = "";
      list.map((item, i) => {
        if (item.floorId == nVal) {
          floorImg = item.picture;
        }
      });
      this.floorImg = floorImg;
    }
  },
  methods: {
    handleSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          addTransducer(this.form).then(response => {
            if (response.code === 200) {
              this.msgSuccess("新增成功");
              this.$parent.getList();
              this.closeDialog();
            } else {
              this.msgError(response.msg);
            }
          });
        }
      });
    },
    handleBack() {
      this.closeDialog();
    },
    closeDialog() {
      this.$parent.$layer.closeAll();
    },
    initForm() {
      let options = {
        target: document.querySelector(`#${this.$parent.layerId}`),
        text: "加载中"
      };
      let loadingInstance = Loading.service(options);
      listTransducertype()
        .then(response => {
          if (response.code === 200) {
            this.typeList = response.rows;
          }
          return listFactory();
        })
        .then(response => {
          if (response.code === 200) {
            this.factoryList = response.rows;
          }
        });
      setTimeout(() => {
        loadingInstance.close();
      }, 600);
    },
    getBuildingList() {
      listBuilding(this.bform).then(response => {
        if (response.code === 200) {
          this.buildingList = response.rows;
          console.log(this.buildingList);
        }
      });
    },
    getFloorList() {
      listFloor(this.fform).then(response => {
        if (response.code === 200) {
          this.floorList = response.rows;
        }
      });
    },
    getPoint(e) {
      this.form.latitude = e.lat;
      this.form.longitude = e.lng;
    },
    getPos(e) {
      this.form.xaxis = e.xAxis;
      this.form.yaxis = e.yAxis;
    }
  },
  mounted() {
    this.initForm();
  },
  components: {
    MyMapPicker,
    MyPosPicker
  }
};
</script>

<style>
</style>