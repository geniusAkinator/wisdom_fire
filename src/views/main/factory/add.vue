<template>
  <div class="container form">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="所属代理商">
        <el-select v-model="deptId" placeholder="请选择所属代理商" @change="handleSelect">
          <el-option
            v-for="(item,index) in dlist"
            :key="index"
            :label="item.deptName"
            :value="item.deptId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属工厂">
        <el-select
          v-model="form.deptId"
          placeholder="请选择所属工厂"
          @change="handleSelectFactory($event)"
        >
          <el-option
            v-for="(item,index) in flist"
            :key="index"
            :label="item.deptName"
            :value="item.deptId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="工厂地址" prop="address">
        <el-input v-model="form.address" placeholder="请输入工厂地址" />
      </el-form-item>
      <el-form-item label="工厂类型">
        <el-select v-model="form.factoryType" placeholder="请选择工厂类型">
          <el-option
            v-for="dict in typeOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
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
      <el-form-item label="负责人" prop="leader">
        <el-input v-model="form.leader" placeholder="请输入负责人" />
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="LOGO" prop="picture" class="readonly">
        <el-input v-model="form.picture" placeholder="请输入LOGO" readonly />
        <my-image-picker :multiple="false" @sendImage="getImage"></my-image-picker>
      </el-form-item>
      <el-form-item label="省市区" prop="province">
        <my-city-picker @sendPCD="getPCD"></my-city-picker>
      </el-form-item>
      <el-form-item label="座机号" prop="tel">
        <el-input v-model="form.tel" placeholder="请输入座机号" />
      </el-form-item>
      <el-form-item label="企业简介" prop="description">
        <my-editor :value="form.description" @input="getEditor"></my-editor>
      </el-form-item>
    </el-form>
    <div class="add-footer">
      <el-button size="small" type="primary" icon="el-icon-check" @click="handleSubmit">提交</el-button>
      <el-button size="small" icon="el-icon-back" @click="handleBack">返回</el-button>
    </div>
  </div>
</template>

<script>
import { addFactory } from "@/api/main/factory";
import { listDept } from "@/api/system/dept";
import { Loading } from "element-ui";
import MyImagePicker from "@/components/UploadImage";
import MyMapPicker from "@/components/MapPicker";
import MyCityPicker from "@/components/CityPicker";
import MyEditor from "@/components/Editor";

export default {
  data() {
    return {
      form: {
        deptId: "",
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
        tel: ""
      },
      rules: {},
      dlist: [],
      flist: [],
      deptId: "",
      typeOptions: [],
      isShow: true,
      nowRegion: "江苏"
    };
  },
  watch: {
    deptId(nVal, oVal) {
      this.dlist.map((item, i) => {
        if (item.deptId == this.deptId) {
          this.flist = item.children;
        }
      });
    }
  },
  methods: {
    handleSubmit() {
      addFactory(this.form).then(response => {
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
      this.$parent.$layer.close(this.$parent.layerId);
    },
    handleSelect() {
      this.form.deptId = "";
    },
    handleSelectFactory(e) {
      this.flist.map((item, i) => {
        if (item.deptId == e) {
          this.form.factoryName = item.deptName;
        }
      });
    },
    initForm() {
      let options = {
        target: document.querySelector(`#${this.$parent.layerId}`),
        text: "加载中"
      };
      let loadingInstance = Loading.service(options);
      listDept().then(response => {
        if (response.code === 200) {
          this.dlist = response.data[0].children;
        }
      });
      this.getDicts("main_factory_type").then(response => {
        this.typeOptions = response.data;
      });
      setTimeout(() => {
        loadingInstance.close();
      }, 300);
    },
    handleClick() {},
    getImage(e) {
      this.form.picture = e;
    },
    getPoint(e) {
      this.form.latitude = e.lat;
      this.form.longitude = e.lng;
    },
    getPCD(e) {
      this.form.province = e;
    },
    getEditor(e) {
      this.form.description = e;
    }
  },
  created() {
    this.initForm();
  },
  components: {
    MyImagePicker,
    MyMapPicker,
    MyCityPicker,
    MyEditor
  }
};
</script>

<style>
.readonly > input {
  background: #f5f7fa;
  border-color: #e4e7ed;
  color: #c0c4cc;
}
</style>