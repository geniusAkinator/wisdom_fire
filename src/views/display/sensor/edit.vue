<template>
  <div class="container form">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="工厂id" prop="factoryId">
        <el-input v-model="form.factoryId" placeholder="请输入工厂id" />
      </el-form-item>
      <el-form-item label="楼层id" prop="floorId">
        <el-input v-model="form.floorId" placeholder="请输入楼层id" />
      </el-form-item>
      <el-form-item label="传感器类型" prop="ttId">
        <el-input v-model="form.ttId" placeholder="请输入传感器类型" />
      </el-form-item>
      <el-form-item label="设备类型" prop="deviceId">
        <el-input v-model="form.deviceId" placeholder="请输入设备类型" />
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
import { updateTransducer } from "@/api/display/sensor";
export default {
  data() {
    return {
      form: {
        description: "",
        name: "",
        transducerId:this.$parent.eid
      },
      factoryList: [],
      rules: {}
    };
  },
  methods: {
    handleSubmit() {
      updateTransducer(this.form).then(response => {
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
    }
  },
  mounted() {}
};
</script>

<style>
</style>