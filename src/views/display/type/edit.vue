<template>
  <div class="container form">
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="所属系统" prop="factoryId">
        <el-select v-model="form.systemId" placeholder="请选择所属系统" disabled>
          <el-option
            v-for="(item,index) in sysList"
            :key="index"
            :label="item.name"
            :value="item.systemId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="类型名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入传感器类型名称" />
      </el-form-item>
      <el-form-item label="传感器图片" prop="picture" class="readonly">
        <el-input v-model="form.img" placeholder="请选择传感器图片" readonly />
        <my-image-picker :images="form.img" @sendImage="getImage"></my-image-picker>
      </el-form-item>
    </el-form>
    <div class="add-footer">
      <el-button size="small" type="primary" icon="el-icon-check" @click="handleSubmit">提交</el-button>
      <el-button size="small" icon="el-icon-back" @click="handleBack">返回</el-button>
    </div>
  </div>
</template>

<script>
import { listSystem } from "@/api/display/sys";
import { updateTransducertype, getTransducertype } from "@/api/display/type";
import { Loading } from "element-ui";
import MyImagePicker from "@/components/UploadImage";

export default {
  data() {
    return {
      form: {
        systemId: this.$parent.pid,
        description: "",
        name: "",
        ttId: this.$parent.eid
      },
      sysList: [],
      rules: {}
    };
  },
  methods: {
    handleSubmit() {
      updateTransducertype(this.form).then(response => {
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
    initForm() {
      let options = {
        target: document.querySelector(`#${this.$parent.layerId}`),
        text: "加载中"
      };
      console.log("aaa", this.form.ttId);
      let loadingInstance = Loading.service(options);
      listSystem()
        .then(response => {
          if (response.code === 200) {
            this.sysList = response.rows;
            console.log(this.sysList);

            return getTransducertype(this.form.ttId);
          }
        })
        .then(response => {
          if (response.code === 200) {
            this.form = response.data;
          }
        });
      setTimeout(() => {
        loadingInstance.close();
      }, 300);
    },
    getImage(e) {
      this.form.img = e;
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