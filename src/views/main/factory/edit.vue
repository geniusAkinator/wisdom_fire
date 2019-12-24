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
      <el-form-item label="描述" prop="description">
        <el-input v-model="form.description" placeholder="请输入描述" />
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
      <el-form-item label="纬度" prop="latitude">
        <el-input v-model="form.latitude" placeholder="请输入纬度" />
      </el-form-item>
      <el-form-item label="负责人" prop="leader">
        <el-input v-model="form.leader" placeholder="请输入负责人" />
      </el-form-item>
      <el-form-item label="经度" prop="longitude">
        <el-input v-model="form.longitude" placeholder="请输入经度" />
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="图片" prop="picture">
        <el-input v-model="form.picture" placeholder="请输入图片" />
      </el-form-item>
      <el-form-item label="省市区" prop="province">
        <my-city-picker :pcd.sync="form.province" @sendPCD="getPCD"></my-city-picker>
      </el-form-item>
      <el-form-item label="座机号" prop="tel">
        <el-input v-model="form.tel" placeholder="请输入座机号" />
      </el-form-item>
    </el-form>
    <div class="add-footer">
      <el-button size="small" type="primary" icon="el-icon-check" @click="handleSubmit">提交</el-button>
      <el-button size="small" icon="el-icon-back" @click="handleBack">返回</el-button>
    </div>
  </div>
</template>

<script>
import { updateFactory, getFactory } from "@/api/main/factory";
import { listDept } from "@/api/system/dept";
import { Loading } from "element-ui";
import MyUploadImage from "@/components/UploadImage";
import MyMapPicker from "@/components/MapPicker";
import MyCityPicker from "@/components/CityPicker";
export default {
  data() {
    return {
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
      rules: {},
      dlist: [],
      flist: [],
      deptId: "",
      typeOptions: []
    };
  },
  watch: {
    deptId(nVal, oVal) {
      this.dlist.map((item, i) => {
        if (item.deptId == this.deptId) {
          this.flist = item.children;
        }
      });
    },
    dlist() {
      this.dlist.map((item, i) => {
        if (item.deptId == this.deptId) {
          this.flist = item.children;
        }
      });
    }
  },
  methods: {
    handleSubmit() {
      updateFactory(this.form).then(response => {
        if (response.code === 200) {
          this.msgSuccess("编辑成功");
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
      getFactory(this.form.factoryId).then(response => {
        if (response.code === 200) {
          let _data = response.data;
          this.deptId = _data.pId;
          this.form = _data.sysFactory;
        }
      });
      setTimeout(() => {
        loadingInstance.close();
      }, 300);
    },
    getPCD(e) {
      this.form.province = e;
    }
  },
  mounted() {
    this.initForm();
  },
  components: {
    MyUploadImage,
    MyMapPicker,
    MyCityPicker
  }
};
</script>

<style>
</style>