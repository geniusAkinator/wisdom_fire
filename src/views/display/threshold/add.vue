<template>
  <div class="container form">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入名称" />
      </el-form-item>
      <el-form-item label="最小值" prop="min">
        <el-input v-model="form.min" placeholder="请输入最小值" />
      </el-form-item>
      <el-form-item label="最大值" prop="max">
        <el-input v-model="form.max" placeholder="请输入最大值" />
      </el-form-item>
      <el-form-item label="类型名称" prop="keyname">
        <el-input v-model="form.keyname" placeholder="请输入类型名称" />
      </el-form-item>
      <el-form-item label="单位" prop="unit">
        <el-input v-model="form.unit" placeholder="请输入单位" />
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input v-model="form.sort" placeholder="请输入排序" />
      </el-form-item>
    </el-form>
    <div class="add-footer">
      <el-button size="small" type="primary" icon="el-icon-check" @click="handleSubmit">提交</el-button>
      <el-button size="small" icon="el-icon-back" @click="handleBack">返回</el-button>
    </div>
  </div>
</template>

<script>
import { addThreshold } from "@/api/display/threshold";
import { Loading } from "element-ui";

export default {
  data() {
    return {
      form: {
        name: "",
        min: "",
        max: "",
        keyname: "",
        unit: "",
        ttid: this.$parent.eid,
        sort: 0
      }
    };
  },
  methods: {
    handleSubmit() {
      addThreshold(this.form).then(response => {
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
    initForm() {}
  },
  mounted() {
    this.initForm();
  },
  components: {}
};
</script>

<style>
</style>