<template>
  <div class="container form">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="所属工厂" prop="factoryId">
        <el-select v-model="form.factoryId" placeholder="请选择所属工厂" disabled>
          <el-option
            v-for="(item,index) in factoryList"
            :key="index"
            :label="item.factoryName"
            :value="item.factoryId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="楼宇名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入楼宇名称" />
      </el-form-item>
      <el-form-item label="建筑面积" prop="area">
        <el-input v-model="form.area" type="number" placeholder="请输入建筑面积">
          <template slot="append">
            m
            <sup>2</sup>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item label="楼上层数" prop="upperLevel">
        <el-input v-model="form.upperLevel" type="number" placeholder="请输入楼上层数">
          <template slot="append">层</template>
        </el-input>
      </el-form-item>
      <el-form-item label="楼下层数" prop="underLevel">
        <el-input v-model="form.underLevel" type="number" placeholder="请输入楼下层数">
          <template slot="append">层</template>
        </el-input>
      </el-form-item>
      <el-form-item label="建筑图片" prop="picture" class="readonly">
        <el-input v-model="form.picture" placeholder="请输入图片" readonly />
        <my-image-picker @sendImage="getImage"></my-image-picker>
      </el-form-item>
    </el-form>
    <div class="add-footer">
      <el-button size="small" type="primary" icon="el-icon-check" @click="handleSubmit('form')">提交</el-button>
      <el-button size="small" icon="el-icon-back" @click="handleBack">返回</el-button>
    </div>
  </div>
</template>

<script>
import { addBuilding } from "@/api/main/building";
import { listFactory } from "@/api/main/factory";
import { Loading } from "element-ui";
import MyImagePicker from "@/components/UploadImage";

export default {
  data() {
    return {
      form: {
        area: "",
        createtime: "",
        name: "",
        picture: "",
        underLevel: "",
        updatetime: "",
        upperLevel: "",
        factoryId: ""
      },
      factoryList: [],
      rules: {
        name: [{ required: true, message: "请输入楼宇名称", trigger: "blur" }],
        area: [{ required: true, message: "请输入建筑面积", trigger: "blur" }],
        upperLevel: [
          { required: true, message: "请输入楼上层数", trigger: "blur" }
        ],
        underLevel: [
          { required: true, message: "请输入楼下层数", trigger: "blur" }
        ]
      }
    };
  },
  watch: {
    factoryList() {
      this.form.factoryId = this.$parent.pid * 1;
    }
  },
  methods: {
    handleSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          addBuilding(this.form).then(response => {
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
      this.$parent.$layer.close(this.$parent.layerId);
    },
    initForm() {
      let options = {
        target: document.querySelector(`#${this.$parent.layerId}`),
        text: "加载中"
      };
      let loadingInstance = Loading.service(options);
      listFactory().then(response => {
        this.factoryList = response.rows;
      });
      setTimeout(() => {
        loadingInstance.close();
      }, 300);
    },
    getImage(e) {
      this.form.picture = e;
    }
  },
  mounted() {
    this.initForm();
  },
  components: {
    MyImagePicker
  }
};
</script>

<style>
</style>