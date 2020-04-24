<template>
  <div class="login">
    <el-row :gutter="10" style="height:100%">
      <el-col
        class="flex flex-direction align-center justify-center"
        :span="14"
        style="height:100%"
      >
        <div class="cf margin-bottom" style="margin-right:65px;">
          <div class="fl bg-white padding-xs radius text-xxl text-bold text-blue bg" >预</div>
          <div class="fl text-white padding-xs text-xxl text-bold" >知</div>
          <div class="fl text-white padding-xs text-xxl text-bold">则</div>
          <div class="fl text-white padding-xs text-xxl text-bold">无</div>
          <div class="fl text-white padding-xs text-xxl text-bold">优</div>
        </div>
        <div class="cf" style="margin-left:65px">
          <div class="fl bg-white padding-xs radius text-xxl text-bold text-blue">防</div>
          <div class="fl text-white padding-xs text-xxl text-bold bg-">患</div>
          <div class="fl text-white padding-xs text-xxl text-bold">于</div>
          <div class="fl text-white padding-xs text-xxl text-bold">未</div>
          <div class="fl text-white padding-xs text-xxl text-bold">然</div>
        </div>
        <div class="login_img1"></div>
      </el-col>
      <el-col
        class="bg-white flex flex-direction align-center justify-center"
        :span="10"
        style="height:100%;position:relative"
      >
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
          <div class="login_logo"></div>
          <h3 class="title">安中云智慧消防监控系统</h3>
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" type="text" auto-complete="off" placeholder="账号"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              type="password"
              auto-complete="off"
              placeholder="密码"
              @keyup.enter.native="handleLogin"
            ></el-input>
          </el-form-item>
          <el-form-item prop="code">
            <el-input
              v-model="loginForm.code"
              auto-complete="off"
              placeholder="验证码"
              style="width: 63%"
              @keyup.enter.native="handleLogin"
            ></el-input>
            <div class="login-code">
              <img :src="codeUrl" @click="getCode" />
            </div>
          </el-form-item>
          <el-checkbox v-model="loginForm.rememberMe" style="margin:0px 0px 25px 0px;">记住密码</el-checkbox>
          <el-form-item style="width:100%;">
            <el-button
              :loading="loading"
              size="medium"
              type="primary"
              style="width:100%;"
              @click.native.prevent="handleLogin"
              round
            >
              <span v-if="!loading">登 录</span>
              <span v-else>登 录 中...</span>
            </el-button>
          </el-form-item>
        </el-form>
        <!--  底部  -->
        <div class="el-login-footer">
          <span>&copy; COPYRIGHT AMHSZG.COM - ALL RIGHTS RESERVED.</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getCodeImg } from "@/api/login";
import Cookies from "js-cookie";
import { encrypt, decrypt } from "@/utils/jsencrypt";

export default {
  name: "Login",
  data() {
    return {
      codeUrl: "",
      cookiePassword: "",
      loginForm: {
        username: "admin",
        password: "admin123",
        rememberMe: false,
        code: "",
        uuid: ""
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: "用户名不能为空" }
        ],
        password: [
          { required: true, trigger: "blur", message: "密码不能为空" }
        ],
        code: [{ required: true, trigger: "change", message: "验证码不能为空" }]
      },
      loading: false,
      redirect: undefined
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  created() {
    this.getCode();
    this.getCookie();
  },
  methods: {
    getCode() {
      getCodeImg().then(res => {
        this.codeUrl = "data:image/gif;base64," + res.img;
        this.loginForm.uuid = res.uuid;
      });
    },
    getCookie() {
      const username = Cookies.get("username");
      const password = Cookies.get("password");
      const rememberMe = Cookies.get("rememberMe");
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password:
          password === undefined ? this.loginForm.password : decrypt(password),
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
      };
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          if (this.loginForm.rememberMe) {
            Cookies.set("username", this.loginForm.username, { expires: 30 });
            Cookies.set("password", encrypt(this.loginForm.password), {
              expires: 30
            });
            Cookies.set("rememberMe", this.loginForm.rememberMe, {
              expires: 30
            });
          } else {
            Cookies.remove("username");
            Cookies.remove("password");
            Cookies.remove("rememberMe");
          }
          this.$store
            .dispatch("Login", this.loginForm)
            .then(() => {
              this.loading = false;
              this.$router.push({ path: this.redirect || "/" });
            })
            .catch(() => {
              this.loading = false;
              this.getCode();
            });
        }
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.login {
  min-width: 980px;
  height: 100%;
  background: linear-gradient(top, #5236fa, #0d77ff);
  background: -ms-linear-gradient(top, #5236fa, #0d77ff);
  background: -webkit-linear-gradient(top, #5236fa, #0d77ff);
  background: -moz-linear-gradient(top, #5236fa, #0d77ff);
}
.title {
  margin: 20px auto 80px auto;
  text-align: center;
  color: #707070;
  font-size: 24px;
  font-family: "Source Han Sans SC";
  font-weight: 500;
  color: rgba(59, 59, 59, 1);
}

.login-form {
  width: 400px;
  border-radius: 6px;
  padding: 0 25px;
  .el-input {
    height: 38px;
    input {
      height: 38px;
    }
  }
  .input-icon {
    height: 34px;
    width: 14px;
    margin-left: 2px;
  }
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.login-code {
  width: 33%;
  height: 38px;
  float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: absolute;
  bottom: 0;
  text-align: center;
  color: #666666;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}
.bg-white {
  background: #ffffff;
}
.login_img1 {
  width: 800px;
  height: 500px;
  background: url("../assets/image/img1.png") no-repeat center;
  background-size: contain;
}
.login_logo {
  width: 120px;
  height: 100px;
  background: url("../assets/image/logo.png") no-repeat center;
  background-size: contain;
  display: block;
  margin: auto;
}
.login .el-input__inner{
  border: 0;
  border-bottom: 1px solid #999999;
  border-radius: 0;
}
</style>
