<template>
  <div class="container form">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="A最小值">
        <el-input v-model="form.mina" placeholder="请输入A最小值" />
      </el-form-item>
      <el-form-item label="A最大值">
        <el-input v-model="form.maxa" placeholder="请输入A最大值" />
      </el-form-item>
      <el-form-item label="B最小值">
        <el-input v-model="form.minb" placeholder="请输入B最小值" />
      </el-form-item>
      <el-form-item label="B最大值">
        <el-input v-model="form.maxb" placeholder="请输入B最大值" />
      </el-form-item>
      <el-form-item label="C最小值">
        <el-input v-model="form.minc" placeholder="请输入C最小值" />
      </el-form-item>
      <el-form-item label="C最大值">
        <el-input v-model="form.maxc" placeholder="请输入C最大值" />
      </el-form-item>
    </el-form>
    <div class="add-footer">
      <el-button size="small" type="primary" icon="el-icon-check" @click="handleSubmit('form')">提交</el-button>
      <el-button size="small" icon="el-icon-back" @click="handleBack">返回</el-button>
    </div>
  </div>
</template>
<script>
import { updateThreshold, getThreshold } from "@/api/display/threshold";
import { Loading } from "element-ui";
export default {
  data() {
    return {
      form: {
        transducerId: this.$parent.eid,
        maxa: 0,
        maxb: 0,
        maxc: 0,
        mina: 0,
        minb: 0,
        minc: 0
      },
      rules: {}
    };
  },
  methods: {
    handleSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          updateThreshold(this.form).then(response => {
            if (response.code === 200) {
              this.msgSuccess("更新成功");
              // this.$parent.getList();
              this.$parent.getSensorList();
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
      getThreshold({ transducerId: this.form.transducerId }).then(response => {
        if (response.code == 200) {
          let _data = response.data;
          if (_data != undefined) {
            this.form.maxa = _data.maxa;
            this.form.maxb = _data.maxb;
            this.form.maxc = _data.maxc;
            this.form.mina = _data.mina;
            this.form.minb = _data.minb;
            this.form.minc = _data.minc;
          }
        }
      });
      setTimeout(() => {
        loadingInstance.close();
      }, 600);
    }
  },
  mounted() {
    this.initForm();
  }
};
</script>

<style>
</style>