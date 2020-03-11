<template>
  <div class="container form">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="所属部门" prop="departmentId">
        <el-select v-model="form.departmentId" placeholder="请选择所属工厂" disabled>
          <el-option
            v-for="(item,index) in departmentList"
            :key="index"
            :label="item.departmentName"
            :value="item.departmentId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="身份证" prop="idCard">
        <el-input v-model="form.idCard" placeholder="请输入身份证" />
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="职位" prop="duty">
        <el-input v-model="form.duty" placeholder="请输入职位" />
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="form.sex">
          <el-radio
            v-for="dict in sexOptions"
            :key="dict.dictValue"
            :label="dict.dictValue"
          >{{dict.dictLabel}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="入职时间" prop="joinTime">
        <el-date-picker
          clearable
          size="small"
          style="width: 200px"
          v-model="form.joinTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择入职时间"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="状态" prop="state">
        <el-radio-group v-model="form.state">
          <el-radio
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictValue"
          >{{dict.dictLabel}}</el-radio>
        </el-radio-group>
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
import { addEmployee } from "@/api/team/employee";
import { listDepartment } from "@/api/team/department";
import { Loading } from "element-ui";
export default {
  data() {
    return {
      form: {
        duty: "",
        idCard: "",
        joinTime: "",
        name: "",
        phone: "",
        sex: "0",
        state: "0",
        departmentId: ""
      },
      rules: {
        name: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
        idCard: [{ required: true, message: "身份证不能为空", trigger: "blur" }],
        phone: [{ required: true, message: "手机不能为空", trigger: "blur" }],
        duty: [{ required: true, message: "职位不能为空", trigger: "blur" }],
        joinTime: [
          { required: true, message: "请选择入职时间", trigger: "change" }
        ]
      },
      factoryList: [],
      departmentList: [],
      sexOptions: [],
      statusOptions: []
    };
  },
  watch: {
    departmentList() {
      this.form.departmentId = this.$parent.pid * 1;
    }
  },
  methods: {
    handleSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          addEmployee(this.form).then(response => {
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
    initForm() {
      let options = {
        target: document.querySelector(`#${this.$parent.layerId}`),
        text: "加载中"
      };
      let loadingInstance = Loading.service(options);
      listDepartment().then(response => {
        if (response.code == 200) {
          this.departmentList = response.rows;
        }
      });
      this.getDicts("team_employee_sex").then(response => {
        if (response.code == 200) {
          this.sexOptions = response.data;
        }
      });
      this.getDicts("team_employee_status").then(response => {
        if (response.code == 200) {
          this.statusOptions = response.data;
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