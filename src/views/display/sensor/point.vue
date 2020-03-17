<template>
  <div class="container form">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="分数A" prop="pointB">
        <el-input v-model="form.pointA" placeholder="请输入分数A" />
      </el-form-item>
      <el-form-item label="分数B" prop="pointB">
        <el-input v-model="form.pointB" placeholder="请输入分数B" />
      </el-form-item>
      <el-form-item label="分数C" prop="pointC">
        <el-input v-model="form.pointC" placeholder="请输入分数C" />
      </el-form-item>
    </el-form>
    <div class="add-footer">
      <el-button size="small" type="primary" icon="el-icon-check" @click="handleSubmit('form')">提交</el-button>
      <el-button size="small" icon="el-icon-back" @click="handleBack">返回</el-button>
    </div>
  </div>
</template>
<script>
import { updatePoint, getPointDetail } from "@/api/display/sensor";
import { Loading } from "element-ui";
export default {
  data() {
    return {
      form: {
        transducerId: this.$parent.eid,
        factoryId: this.$parent.fid,
        pointA: 0,
        pointB: 0,
        pointC: 0
      },
      rules: {}
    };
  },
  methods: {
    handleSubmit(form) {
      console.log(this.form);
      this.$refs[form].validate(valid => {
        if (valid) {
          updatePoint(this.form).then(response => {
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
      getPointDetail(this.form).then(response => {
        if (response.code == 200) {
          let _data = response.rows[0];
          this.form.pointA = _data.pointA;
          this.form.pointB = _data.pointB;
          this.form.pointC = _data.pointC;
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