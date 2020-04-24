
<template>
  <div class="container form">
    <el-form ref="form" :model="form" :rules="rules" label-width="90px">
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
      <el-form-item label="轮播名称" prop="banner">
        <el-input v-model="form.banner" placeholder="请输入轮播名称"></el-input>
      </el-form-item>
      <el-form-item label="轮播图片" prop="bannerUrl" class="readonly">
        <el-input v-model="form.bannerUrl" placeholder="请选择轮播图片" readonly />
        <my-image-picker :images="form.bannerUrl" :multiple="false" @sendImage="getImage"></my-image-picker>
        <span class="help-block">图片格式必须为:png,jpeg,jpg;建议使用png格式图片,以保持效果;</span>
      </el-form-item>
    </el-form>
    <div class="add-footer">
      <el-button size="small" type="primary" icon="el-icon-check" @click="handleSubmit('form')">提交</el-button>
      <el-button size="small" icon="el-icon-back" @click="handleBack">返回</el-button>
    </div>
  </div>
</template>

<script>
import { updateBanner, getBanner } from "@/api/system/banner";
import { listFactory } from "@/api/main/factory";
import { Loading } from "element-ui";
import Editor from "@/components/Editor";
import MyImagePicker from "@/components/UploadImage";

export default {
  data() {
    return {
      form: {
        id: this.$parent.eid,
        factoryId: "",
        banner: "",
        bannerUrl: ""
      },
      rules: {
        factoryId: [
          { required: true, message: "请选择所属工厂", trigger: "change" }
        ],
        banner: [
          { required: true, message: "轮播名称不能为空", trigger: "blur" }
        ],
        bannerUrl: [
          { required: true, message: "轮播图片不能为空", trigger: "blur" }
        ]
      },
      factoryList: [],
      statusOptions: []
    };
  },
  methods: {
    handleSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          updateBanner(this.form).then(response => {
            if (response.code === 200) {
              this.msgSuccess("更新成功");
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
      listFactory().then(response => {
        if (response.code === 200) {
          this.factoryList = response.rows;
        }
      });
      getBanner(this.form.id).then(response => {
        if (response.code == 200) {
          this.form = response.data;
        }
      });
      setTimeout(() => {
        loadingInstance.close();
      }, 300);
    },
    getImage(e) {
      this.form.bannerUrl = e;
    }
  },
  mounted() {
    this.initForm();
  },
  components: {
    Editor,
    MyImagePicker
  }
};
</script>

<style>
</style>