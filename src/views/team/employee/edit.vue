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
      <el-form-item label="职位" prop="postId">
        <el-select v-model="form.postId" placeholder="请选择职位">
          <el-option
            v-for="(item,index) in postList"
            :key="index"
            :label="item.postName"
            :value="item.postId"
          ></el-option>
        </el-select>
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
      <el-form-item label="领导" prop="leader">
        <el-radio-group v-model="form.leader">
          <el-radio
            v-for="dict in leaderOptions"
            :key="dict.dictValue"
            :label="dict.dictValue"
          >{{dict.dictLabel}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="微信号" prop="uid">
        <wechat-picker :uid="form.uid" @sendWechat="getWechat"></wechat-picker>
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
import { updateEmployee, getEmployee } from "@/api/team/employee";
import { listDepartment } from "@/api/team/department";
import { Loading } from "element-ui";
import { listPost } from "@/api/system/post";
import WechatPicker from "@/components/WechatPicker/index";
export default {
  data() {
    return {
      form: {
        postId: "",
        idCard: "",
        joinTime: "",
        name: "",
        phone: "",
        sex: "0",
        state: "0",
        departmentId: "",
        uid: 0,
        leader: "0",
        employeeId: this.$parent.eid
      },
      rules: {
        name: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
        idCard: [
          { required: true, message: "身份证不能为空", trigger: "blur" }
        ],
        phone: [{ required: true, message: "手机不能为空", trigger: "blur" }],
        postId: [{ required: true, message: "请选择职位", trigger: "change" }],
        joinTime: [
          { required: true, message: "请选择入职时间", trigger: "change" }
        ]
      },
      factoryList: [],
      departmentList: [],
      postList: [],
      sexOptions: [],
      statusOptions: [],
      leaderOptions: []
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
          updateEmployee(this.form).then(response => {
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
      listDepartment().then(response => {
        if (response.code == 200) {
          this.departmentList = response.rows;
        }
      });
      listPost().then(response => {
        if (response.code == 200) {
          this.postList = response.rows;
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
      this.getDicts("sys_team_leader").then(response => {
        if (response.code == 200) {
          this.leaderOptions = response.data;
        }
      });
      getEmployee(this.form.employeeId).then(response => {
        if (response.code == 200) {
          this.form = response.data;
          this.form.state = response.data.state + "";
          this.form.sex = response.data.sex + "";
          this.form.leader = response.data.leader + "";
        }
      });
      setTimeout(() => {
        loadingInstance.close();
      }, 300);
    },
    getWechat(e) {
      console.log(e)
      if (e.length > 0) {
        this.form.uid = e[0].uid;
      }
    }
  },
  mounted() {
    this.initForm();
  },
  components: {
    WechatPicker
  }
};
</script>

<style>
</style>