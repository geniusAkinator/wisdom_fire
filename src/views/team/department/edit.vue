<template>
  <div class="container form">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
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
      <el-form-item label="团队名称" prop="departmentName">
        <el-input v-model="form.departmentName" placeholder="请输入团队名称" />
      </el-form-item>
      <el-form-item label="座机号" prop="tel">
        <el-input v-model="form.tel" placeholder="请输入座机号" />
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.remark" type="textarea"></el-input>
      </el-form-item>
    </el-form>
    <div class="add-footer">
      <el-button size="small" type="primary" icon="el-icon-check" @click="handleSubmit('form')">提交</el-button>
      <el-button size="small" icon="el-icon-back" @click="handleBack">返回</el-button>
    </div>
  </div>
</template>

<script>
import { updateDepartment, getDepartment } from "@/api/team/department";
import { listFactory } from "@/api/main/factory";
import { Loading } from "element-ui";
export default {
  data() {
    let validatePhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入联系电话"));
      } else {
        if (!isPhone(value)) {
          callback(new Error("联系电话格式不正确"));
        }
        callback();
      }
    };
    return {
      form: {
        departmentId: this.$parent.eid,
        departmentName: "",
        phone: "",
        remark: "",
        tel: "",
        factoryId: 0
      },
      rules: {
        factoryId: [
          { required: true, message: "请选择所属工厂", trigger: "change" }
        ],
        departmentName: [
          { required: true, message: "团队名称不能为空", trigger: "blur" }
        ],
        phone: [{ required: true, validator: validatePhone, trigger: "change" }]
      },
      factoryList: []
    };
  },
  methods: {
    handleSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          updateDepartment(this.form).then(response => {
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
      getDepartment(this.form.departmentId).then(response => {
        if (response.code === 200) {
          this.form = response.data;
        }
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