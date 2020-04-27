<template>
  <div class="container form">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="系统图标" prop="imageUrl" class="readonly">
        <el-input v-model="form.imageUrl" placeholder="请选择图标" readonly />
        <my-image-picker :multiple="false" @sendImage="getImage"></my-image-picker>
      </el-form-item>
      <el-form-item label="系统名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入系统名称" />
      </el-form-item>
      <el-form-item label="系统描述" prop="description">
        <el-input v-model="form.description" type="textarea" placeholder="请输入描述" />
      </el-form-item>
    </el-form>
    <div class="add-footer">
      <el-button size="small" type="primary" icon="el-icon-check" @click="handleSubmit('form')">提交</el-button>
      <el-button size="small" icon="el-icon-back" @click="handleBack">返回</el-button>
    </div>
  </div>
</template>

<script>
import { addSystem } from "@/api/display/sys";
import MyImagePicker from "@/components/UploadImage";

export default {
  data() {
    return {
      form: {
        description: "",
        name: "",
        imageUrl: ""
      },
      factoryList: [],
      rules: {
        name: [
          { required: true, message: "系统名称不能为空", trigger: "blur" }
        ],
        imageUrl: [
          { required: true, message: "系统图标不能为空", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    handleSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          addSystem(this.form).then(response => {
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
    getImage(e) {
      this.form.imageUrl = e;
    }
  },
  mounted() {},
  components: {
    MyImagePicker
  }
};
</script>

<style>
</style>