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
      <el-form-item label="所属楼宇" prop="factoryId">
        <el-select v-model="form.buildingId" placeholder="请选择所属楼宇">
          <el-option
            v-for="(item,index) in buildingList"
            :key="index"
            :label="item.buildingName"
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
      <el-form-item label="经度" prop="longitude">
        <el-input v-model="form.longitude" placeholder="请输入经度" />
      </el-form-item>
      <el-form-item label="纬度" prop="latitude">
        <el-input v-model="form.latitude" placeholder="请输入纬度" />
      </el-form-item>
      <el-form-item label="当前位置" prop="currlocation">
        <el-input v-model="form.currlocation" placeholder="请输入当前位置" />
      </el-form-item>
    </el-form>
    <div class="add-footer">
      <el-button size="small" type="primary" icon="el-icon-check" @click="handleSubmit">提交</el-button>
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
export default {
  data() {
    return {
      form: {
        factoryId: "",
        buildingId: "",
        floorId: "",
        description: "",
        name: "",
        ttId: this.$parent.pid
      },
      factoryList: [],
      buildingList: [],
      floorList: [],
      typeList: [],
      rules: {},
      bform: {
        factoryId: 0
      },
      fform: {
        buildingId: 0
      },
      tform: {
        systemId: this.$route.query.id
      }
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
    }
  },
  methods: {
    handleSubmit() {
      addTransducer(this.form).then(response => {
        if (response.code === 200) {
          this.msgSuccess("新增成功");
          this.$parent.getList();
          this.closeDialog();
        } else {
          this.msgError(response.msg);
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

      listTransducertype(this.queryParams)
        .then(response => {
          this.typeList = response.rows;
          console.log(this.typeList);
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
        }
      });
    },
    getFloorList() {
      listFloor(this.fform).then(response => {
        if (response.code === 200) {
          this.floorList = response.rows;
        }
      });
    }
  },
  mounted() {
    this.initForm();
  }
};
</script>

<style>
</style>