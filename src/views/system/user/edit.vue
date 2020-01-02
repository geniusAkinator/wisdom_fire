<template>
  <div class="container form">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="用户昵称" prop="nickName">
            <el-input v-model="form.nickName" placeholder="请输入用户昵称" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="归属部门" prop="deptId">
            <treeselect v-model="form.deptId" :options="deptOptions" placeholder="请选择归属部门" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="手机号码" prop="phonenumber">
            <el-input v-model="form.phonenumber" placeholder="请输入手机号码" maxlength="11" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="form.email" placeholder="请输入邮箱" maxlength="50" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="用户名称" prop="userName">
            <el-input v-model="form.userName" placeholder="请输入用户名称" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item v-if="form.userId == undefined" label="用户密码" prop="password">
            <el-input v-model="form.password" placeholder="请输入用户密码" type="password" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="用户性别">
            <el-select v-model="form.sex" placeholder="请选择">
              <el-option
                v-for="dict in sexOptions"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="状态">
            <el-radio-group v-model="form.status">
              <el-radio
                v-for="dict in statusOptions"
                :key="dict.dictValue"
                :label="dict.dictValue"
              >{{dict.dictLabel}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="岗位">
            <el-select v-model="form.postIds" multiple placeholder="请选择">
              <el-option
                v-for="item in postOptions"
                :key="item.postId"
                :label="item.postName"
                :value="item.postId"
                :disabled="item.status == 1"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="角色">
            <el-select v-model="form.roleIds" multiple placeholder="请选择">
              <el-option
                v-for="item in roleOptions"
                :key="item.roleId"
                :label="item.roleName"
                :value="item.roleId"
                :disabled="item.status == 1"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注">
            <el-input v-model="form.remark" type="textarea" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="add-footer">
      <el-button size="small" type="primary" icon="el-icon-check" @click="handleSubmit">提交</el-button>
      <el-button size="small" icon="el-icon-back" @click="handleBack">返回</el-button>
    </div>
  </div>
</template>

<script>
import { updateUser, getUser } from "@/api/system/user";
import { treeselect } from "@/api/system/dept";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import { Loading } from "element-ui";

export default {
  data() {
    return {
      form: {
        userId: this.$parent.eid,
        userName: "",
        nickName: "",
        deptId: this.$parent.queryParams.deptId,
        password: "",
        email: "",
        phonenumber: "",
        status: "0"
      },
      deptOptions: [],
      postOptions: [],
      roleOptions: [],
      sexOptions: [],
      statusOptions: [],
      rules: {
        userName: [
          { required: true, message: "用户名称不能为空", trigger: "blur" }
        ],
        nickName: [
          { required: true, message: "用户昵称不能为空", trigger: "blur" }
        ],
        deptId: [
          { required: true, message: "归属部门不能为空", trigger: "blur" }
        ],
        password: [
          { required: true, message: "用户密码不能为空", trigger: "blur" }
        ],
        email: [
          { required: true, message: "邮箱地址不能为空", trigger: "blur" },
          {
            type: "email",
            message: "'请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        phonenumber: [
          { required: true, message: "手机号码不能为空", trigger: "blur" },
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: "请输入正确的手机号码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit() {
      updateUser(this.form).then(response => {
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
      treeselect().then(response => {
        this.deptOptions = response.data;
      });

      getUser(this.form.userId).then(response => {
        this.form = response.data;
        this.postOptions = response.posts;
        this.roleOptions = response.roles;
        this.form.postIds = response.postIds;
        this.form.roleIds = response.roleIds;
        this.form.password = "";
      });
      this.getDicts("sys_normal_disable").then(response => {
        this.statusOptions = response.data;
      });
      this.getDicts("sys_user_sex").then(response => {
        this.sexOptions = response.data;
      });
      this.getConfigKey("sys.user.initPassword").then(response => {
        this.initPassword = response.data;
      });
      setTimeout(() => {
        loadingInstance.close();
      }, 300);
    }
  },
  mounted() {
    this.initForm();
  },
  components: {
    Treeselect
  }
};
</script>

<style>
</style>