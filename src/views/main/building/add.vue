<template>
  <div class="container form">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="所属工厂" prop="factoryId">
        <el-select v-model="form.factoryId" placeholder="请选择所属代理商">
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
      <el-form-item label="面积" prop="area">
        <el-input v-model="form.area" placeholder="请输入面积" />
      </el-form-item>
      <el-form-item label="照片" prop="picture">
        <el-input v-model="form.picture" placeholder="请输入内容" />
      </el-form-item>
      <el-form-item label="楼上层数" prop="upperLevel">
        <el-input v-model="form.upperLevel" placeholder="请输入楼上层数" />
      </el-form-item>
      <el-form-item label="楼下层数" prop="underLevel">
        <el-input v-model="form.underLevel" placeholder="请输入楼下层数" />
      </el-form-item>
    </el-form>
    <div class="add-footer">
      <el-button size="small" type="primary" icon="el-icon-check" @click="handleSubmit">提交</el-button>
      <el-button size="small" icon="el-icon-back" @click="handleBack">返回</el-button>
    </div>
  </div>
</template>

<script>
import { addBuilding } from "@/api/main/building";
import { listFactory } from "@/api/main/factory";
import { Loading } from "element-ui";
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
        upperLevel: ""
      },
      factoryList: [],
      rules: {}
    };
  },
  methods: {
    handleSubmit() {
      addBuilding(this.form).then(response => {
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
    initForm() {
      let options = {
        target: document.querySelector(`#${this.$parent.layerId}`),
        text: "加载中"
      };
      let loadingInstance = Loading.service(options);
      listFactory(this.queryParams).then(response => {
        this.factoryList = response.rows;
      });

      setTimeout(() => {
        loadingInstance.close();
      }, 300);
    }
  },
  mounted() {
    this.initForm();
  }
};
</script>

<style>
</style>