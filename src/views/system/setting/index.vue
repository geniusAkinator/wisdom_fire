<template>
  <div class="container" style="padding-bottom: 60px;">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick" class="sysset-tab">
      <el-tab-pane label="功能入口" name="first">
        <ul class="url_list">
          <li v-for="(item,index) in urlList" :key="index">
            <span class="name">{{item.name}}</span>
            <a :href="item.url" target="_bank">{{item.url}}</a>
            <i
              title="拷贝"
              class="el-icon-copy-document"
              v-clipboard:copy="item.url"
              v-clipboard:success="handleCopySuc"
              v-clipboard:error="handleCopyErr"
            ></i>
            <el-popover trigger="hover">
              <i slot="reference" class="el-icon-view"></i>
            </el-popover>
          </li>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="基本设置" name="second">
        <el-form ref="commonForm" :model="commonForm" :label-width="labelWidth">
          <el-form-item label="计划任务">
            <el-radio-group v-model="commonForm.planTask">
              <el-radio :label="0">启用</el-radio>
              <el-radio :label="1">关闭</el-radio>
            </el-radio-group>
            <span class="help-block">启用后，系统可以支持计划执行任务</span>
          </el-form-item>
          <el-form-item label="后台消息推送地址">
            <el-input v-model="commonForm.pushUrl">
              <template slot="prepend">URL</template>
            </el-input>
            <span class="help-block">消息服务器地址，可以http://或https://开头.</span>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="风格样式" name="third">
        <el-form ref="form" :model="themeForm" :label-width="labelWidth">
          <el-form-item label="手机模板">
            <el-select v-model="themeForm.theme" placeholder="请选择手机模板">
              <el-option
                v-for="item in themeOptions"
                :key="item.dictValue"
                :label="item.dictLabel"
                :value="item.dictValue"
              ></el-option>
            </el-select>
            <span class="help-block"></span>
          </el-form-item>
          <el-form-item label="菜单颜色">
            <div class="color-picker readonly">
              <el-input v-model="themeForm.menuColor" readonly></el-input>
              <el-color-picker v-model="themeForm.menuColor" show-alpha></el-color-picker>
            </div>
            <span class="help-block">菜单颜色</span>
          </el-form-item>
          <el-form-item label="背景颜色">
            <div class="color-picker readonly">
              <el-input v-model="themeForm.backgroundColor" readonly></el-input>
              <el-color-picker v-model="themeForm.backgroundColor" show-alpha></el-color-picker>
            </div>
            <span class="help-block">背景颜色</span>
          </el-form-item>
          <el-form-item label="按钮颜色">
            <div class="color-picker readonly">
              <el-input v-model="themeForm.buttonColor" readonly></el-input>
              <el-color-picker v-model="themeForm.buttonColor" show-alpha></el-color-picker>
            </div>
            <span class="help-block">按钮颜色</span>
          </el-form-item>
          <el-form-item label="首页显示">
            <el-input v-model="themeForm.splashScreen" disabled></el-input>
            <my-image-picker
              :images="themeForm.splashScreen"
              :multiple="false"
              @sendImage="getImage"
            ></my-image-picker>
            <span class="help-block">小程序、APP的splash屏显示图片</span>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="通知模板" name="fourth">
        <el-form ref="form" :model="templateForm" :label-width="labelWidth">
          <el-form-item label="模板标题颜色">
            <div class="color-picker readonly">
              <el-input v-model="templateForm.titleColor" readonly></el-input>
              <el-color-picker v-model="templateForm.titleColor" show-alpha></el-color-picker>
            </div>
            <span class="help-block"></span>
          </el-form-item>
          <el-form-item label="模板文本颜色">
            <div class="color-picker readonly">
              <el-input v-model="templateForm.textColor" readonly></el-input>
              <el-color-picker v-model="templateForm.textColor" show-alpha></el-color-picker>
            </div>
            <span class="help-block"></span>
          </el-form-item>
          <el-form-item label="关键字颜色">
            <div class="color-picker readonly">
              <el-input v-model="templateForm.keywordColor" readonly></el-input>
              <el-color-picker v-model="templateForm.keywordColor" show-alpha></el-color-picker>
            </div>
            <span class="help-block"></span>
          </el-form-item>
          <el-form-item label="标题">
            <el-input v-model="templateForm.title"></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="短信设置" name="fifth">
        <el-form ref="form" :model="smsForm" :label-width="labelWidth">
          <el-form-item label="绑定验证">
            <el-radio-group v-model="smsForm.bindingValidation">
              <el-radio label="0">验证</el-radio>
              <el-radio label="1">不验证</el-radio>
            </el-radio-group>
            <span class="help-block">验证为手机短信验证，请设置短信验证码模板.此处为总开关，工厂还需单独开启.</span>
          </el-form-item>
          <el-form-item label="邀请验证">
            <el-radio-group v-model="smsForm.invitationValidation">
              <el-radio label="0">验证</el-radio>
              <el-radio label="1">不验证</el-radio>
            </el-radio-group>
            <span class="help-block">验证为手机短信验证，请设置短信验证码模板.此处为总开关，工厂还需单独开启.</span>
          </el-form-item>
          <el-form-item label="短信服务商">
            <el-radio-group v-model="smsForm.smsType">
              <el-radio :label="0">聚合数据</el-radio>
              <el-radio :label="1">阿里云短信</el-radio>
              <el-radio :label="2">阿里云通讯</el-radio>
            </el-radio-group>
          </el-form-item>
          <template v-if="smsForm.smsType=='0'">
            <el-form-item label="AppKey">
              <el-input v-model="smsForm.appKey" placeholder="请输入AppKey"></el-input>
              <span class="help-block">请填写聚合数据AppKey 申请</span>
            </el-form-item>
          </template>
          <template v-if="smsForm.smsType=='1'">
            <el-form-item label="App code">
              <el-input v-model="smsForm.appCode" placeholder="请输入AppKey"></el-input>
              <span class="help-block">请填写阿里云短信App code 申请</span>
            </el-form-item>
            <el-form-item label="签名">
              <el-input v-model="smsForm.sign" placeholder="请输入AppKey"></el-input>
              <span class="help-block">必须与阿里云短信申请的签名保持一致</span>
            </el-form-item>
          </template>
          <template v-if="smsForm.smsType=='2'">
            <el-form-item label="Access Key ID">
              <el-input v-model="smsForm.accessKeyId" placeholder="请输入AppKey"></el-input>
              <span class="help-block">请填写阿里云通信Access Key ID 申请</span>
            </el-form-item>
            <el-form-item label="Access Key Secret">
              <el-input v-model="smsForm.accessKeySecret" placeholder="请输入AppKey"></el-input>
              <span class="help-block">请填写阿里云通信Access Key Secret 申请</span>
            </el-form-item>
            <el-form-item label="签名">
              <el-input v-model="smsForm.sign" placeholder="请输入AppKey"></el-input>
              <span class="help-block">必须与阿里云通信申请的签名保持一致</span>
            </el-form-item>
          </template>
          <el-form-item label="验证码模板">
            <el-input v-model="smsForm.verification" placeholder="请输入验证码模板"></el-input>
            <span class="help-block">短信验证码模板.例：XXXXXXXXXX</span>
          </el-form-item>
          <el-form-item label="报警通知模板">
            <el-input v-model="smsForm.alarmNotification" placeholder="请输入报警通知模板"></el-input>
            <span class="help-block">报警通知模板.例：XXXXXXXXXX</span>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="微信小程序" name="sixth">
        <el-form ref="form" :model="wxForm" :label-width="labelWidth">
          <el-form-item label="APPID">
            <el-input v-model="wxForm.appKey" placeholder="请输入APPID"></el-input>
            <span class="help-block">微信小程序APPID</span>
          </el-form-item>
          <el-form-item label="访问密钥">
            <el-input v-model="wxForm.appSecret" placeholder="请输入APPSERET"></el-input>
            <span class="help-block">微信小程序APPSERET</span>
          </el-form-item>
          <el-form-item label="商户号">
            <el-input v-model="wxForm.mchId" placeholder="请输入微信商户号"></el-input>
            <span class="help-block">对应的商户号</span>
          </el-form-item>
          <el-form-item label="商户支付密钥">
            <el-input v-model="wxForm.mchSecret">
              <template slot="append">
                <span class="pointer">生成秘钥</span>
              </template>
            </el-input>
            <span class="help-block">对应商户支付密钥</span>
          </el-form-item>
          <el-form-item label="小程序标题">
            <el-input v-model="wxForm.title" placeholder="请输入标题"></el-input>
            <span class="help-block">用于打包小程序进入页面的标题</span>
          </el-form-item>
          <el-form-item label="小程序跳转背景">
            <el-input v-model="wxForm.splashScreen" disabled></el-input>
            <my-image-picker
              :images="wxForm.splashScreen"
              :multiple="false"
              @sendImage="getSpaImage"
            ></my-image-picker>
            <span class="help-block">小程序跳转背景图片，可以为空</span>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="平台设置" name="seventh">
        <el-form ref="form" :model="platformForm" :label-width="labelWidth">
          <el-form-item label="平台服务电话">
            <el-input v-model="platformForm.tel"></el-input>
            <span class="help-block">平台服务电话</span>
          </el-form-item>
          <el-form-item label="平台看板密码">
            <el-input v-model="platformForm.pwd" type="password"></el-input>
            <span class="help-block"></span>
          </el-form-item>
          <el-form-item label="平台LOGO">
            <el-input class="readonly" v-model="platformForm.logo" :readonly="true"></el-input>
            <my-image-picker :images="platformForm.logo" :multiple="false" @sendImage="getLogo"></my-image-picker>
            <span class="help-block"></span>
          </el-form-item>
          <el-form-item label="版权信息">
            <el-input v-model="platformForm.copyright" type="textarea"></el-input>
            <span class="help-block"></span>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="API接口" name="eighth">
        <el-form ref="form" :model="apiForm" :label-width="labelWidth">
          <el-form-item label="API访问">
            <el-radio-group v-model="apiForm.apiStatus">
              <el-radio label="0">开启</el-radio>
              <el-radio label="1">关闭</el-radio>
            </el-radio-group>
            <span class="help-block">关闭后app和小程序都不可访问</span>
          </el-form-item>
          <el-form-item label="访问密钥" class="readonly">
            <el-input v-model="apiForm.apiSecret" readonly>
              <template slot="append">
                <span class="pointer" @click="handleGenerate">生成秘钥</span>
              </template>
            </el-input>
            <span class="help-block">第三方系统访问密钥</span>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="监控接入" name="ninth">
        <el-form ref="form" :model="cameraForm" :label-width="labelWidth">
          <el-form-item label="视频监控平台">
            <el-radio-group v-model="cameraForm.cameraType">
              <el-radio :label="0">国标28181</el-radio>
              <el-radio :label="1">乐橙云</el-radio>
              <el-radio :label="2">ONVIF</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="协议版本">
            <el-input v-model="cameraForm.deviceNumber" placeholder="请输入协议版本"></el-input>
          </el-form-item>
          <el-form-item label="SIP服务器ID">
            <el-input v-model="cameraForm.deviceNumber" placeholder="请输入SIP服务器ID"></el-input>
          </el-form-item>
          <el-form-item label="SIP服务器域">
            <el-input v-model="cameraForm.deviceNumber" placeholder="请输入SIP服务器域"></el-input>
          </el-form-item>
          <el-form-item label="SIP服务器地址">
            <el-input v-model="cameraForm.deviceNumber" placeholder="请输入SIP服务器地址"></el-input>
          </el-form-item>
          <el-form-item label="SIP服务器端口">
            <el-input v-model="cameraForm.deviceNumber" placeholder="请输入SIP服务器端口"></el-input>
          </el-form-item>
          <el-form-item label="SIP用户名">
            <el-input v-model="cameraForm.deviceNumber" placeholder="请输入SIP用户名"></el-input>
          </el-form-item>
          <el-form-item label="SIP用户认证ID">
            <el-input v-model="cameraForm.deviceNumber" placeholder="请输入SIP用户认证ID"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="cameraForm.password" type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input v-model="cameraForm.cpwd" type="password"></el-input>
          </el-form-item>
          <el-form-item label="注册有效期">
            <el-input v-model="cameraForm.deviceNumber" placeholder="请输入注册有效期"></el-input>
          </el-form-item>
          <el-form-item label="最大心跳超时">
            <el-input v-model="cameraForm.deviceNumber" placeholder="请输入注册有效期"></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <div class="sysset-footer" v-if="activeName!='first'">
      <el-button type="primary" icon="el-icon-check" size="small" @click="handleSubmit">保存</el-button>
    </div>
  </div>
</template>

<script>
import {
  getSetting,
  addSetting,
  getTheme,
  addTheme,
  getTemplate,
  addTemplate,
  getSms,
  addSms,
  getWx,
  addWx,
  getApi,
  addApi,
  getSetup,
  addSetup,
  generateApiToken
} from "@/api/system/setting";
import MyImagePicker from "@/components/UploadImage";
import { Loading } from "element-ui";

export default {
  data() {
    return {
      limited: 1,
      urlList: [
        {
          name: "看板入口",
          url: "http://192.168.1.146:8080/#/Platform"
        },
        {
          name: "桌面",
          url: "http://192.168.1.146:8080/#/desktop"
        }
      ],
      activeName: "first",
      commonForm: {
        planTask: 0,
        pushUrl: ""
      },
      themeForm: {
        theme: 1,
        menuColor: "",
        backgroundColor: "",
        buttonColor: "",
        splashScreen: ""
      },
      themeOptions: [],
      wxForm: {
        uniacId: "",
        appKey: "",
        appSecret: "",
        mchId: "",
        mchSecret: "",
        title: "",
        splashScreen: ""
      },
      templateForm: {
        titleColor: "",
        textColor: "",
        keywordColor: "",
        title: ""
      },
      smsForm: {
        bindingValidation: "0",
        invitationValidation: "0",
        appKey: "",
        appCode: "",
        accessKeyId: "",
        verification: "",
        alarmNotification: "",
        sign: "",
        accessKeySecret: "",
        smsType: 0
      },
      apiForm: {
        apiStatus: "1",
        apiSecret: ""
      },
      platformForm: {
        tel: "",
        pwd: "",
        logo: "",
        copyright: ""
      },
      cameraForm: {
        factory: {
          factoryId: ""
        },
        cameraType: 0
      },
      labelWidth: "130px"
    };
  },
  watch: {
    activeName() {
      this.initForm();
    }
  },
  methods: {
    handleClick(e) {},
    handleGenerate() {
      generateApiToken().then(response => {
        if (response.code == 200) {
          console.log(response.data);
          this.apiForm.apiSecret = response.data.token;
        }
      });
    },
    handleCopySuc() {
      this.$message({ type: "success", message: "拷贝成功" });
    },
    handleCopyErr() {},
    handleSubmit() {
      let _activeName = this.activeName;
      if (_activeName == "second") {
        // 基本设置
        addSetting(this.commonForm).then(response => {
          if (response.code == 200) {
            this.msgSuccess("更新成功");
          }
        });
      } else if (_activeName == "third") {
        // 风格样式
        addTheme(this.themeForm).then(response => {
          if (response.code == 200) {
            this.msgSuccess("更新成功");
          }
        });
      } else if (_activeName == "fourth") {
        // 通知模板
        addTemplate(this.templateForm).then(response => {
          if (response.code == 200) {
            this.msgSuccess("更新成功");
          }
        });
      } else if (_activeName == "fifth") {
        // 短信设置
        addSms(this.smsForm).then(response => {
          if (response.code == 200) {
            this.msgSuccess("更新成功");
          }
        });
      } else if (_activeName == "sixth") {
        // 微信小程序
        addWx(this.wxForm).then(response => {
          if (response.code == 200) {
            this.msgSuccess("更新成功");
          }
        });
      } else if (_activeName == "seventh") {
        addSetup(this.platformForm).then(response => {
          if (response.code == 200) {
            this.msgSuccess("更新成功");
          }
        });
      } else if (_activeName == "eighth") {
        addApi(this.apiForm).then(response => {
          if (response.code == 200) {
            this.msgSuccess("更新成功");
          }
        });
      }
      console.log(_activeName);
    },
    initForm() {
      let options = {
        target: document.querySelector(".el-tabs__content"),
        text: "加载中"
      };
      let loadingInstance = Loading.service(options);
      let _activeName = this.activeName;
      if (_activeName == "second") {
        //基本设置
        getSetting().then(response => {
          if (response.code == 200) {
            let _data = response.data;
            for (let key in _data) {
              this.commonForm[key] = _data[key];
            }
          }
        });
      } else if (_activeName == "third") {
        //风格样式
        this.getDicts("sys_theme_type").then(response => {
          if (response.code == 200) {
            this.themeOptions = response.data;
          }
        });
        getTheme().then(response => {
          if (response.code == 200) {
            let _data = response.data;
            for (let key in _data) {
              this.themeForm[key] = _data[key];
            }
          }
        });
      } else if (_activeName == "fourth") {
        //通知模板
        getTemplate().then(response => {
          if (response.code == 200) {
            let _data = response.data;
            for (let key in _data) {
              this.templateForm[key] = _data[key];
            }
          }
        });
      } else if (_activeName == "fifth") {
        //短信设置
        getSms().then(response => {
          if (response.code == 200) {
            let _data = response.data;
            for (let key in _data) {
              this.smsForm[key] = _data[key];
            }
          }
        });
      } else if (_activeName == "sixth") {
        //小程序设置
        getWx().then(response => {
          if (response.code == 200) {
            let _data = response.data;
            for (let key in _data) {
              this.wxForm[key] = _data[key];
            }
          }
        });
      } else if (_activeName == "seventh") {
        //小程序设置
        getSetup().then(response => {
          if (response.code == 200) {
            let _data = response.data;
            for (let key in _data) {
              this.platformForm[key] = _data[key];
            }
            this.platformForm.pwd = ""
          }
        });
      } else if (_activeName == "eighth") {
        //api设置
        getApi().then(response => {
          if (response.code == 200) {
            let _data = response.data;
            console.log(response.data);
            for (let key in _data) {
              this.apiForm[key] = _data[key];
            }
          }
        });
      }
      setTimeout(() => {
        loadingInstance.close();
      }, 600);
    },
    getImage(e) {
      this.themeForm.splashScreen = e;
    },
    getSpaImage(e) {
      this.wxForm.splashScreen = e;
    },
    getLogo(e) {
      this.platformForm.logo = e;
    },
  },
  mounted() {
    this.initForm();
  },
  components: {
    MyImagePicker
  }
};
</script>

<style>
.sysset-footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 10px 20px;
  background: #f8f8f8;
  border-top: 1px solid #e7e7e7;
  display: flex;
  justify-content: flex-end;
  z-index: 10;
}
.color-picker {
  display: flex;
}
.color-picker input {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.color-picker .el-input {
  width: 217px;
}
.color-picker .el-color-picker__trigger {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-left: 0;
}
.readonly > input {
  background: #f5f7fa;
  border-color: #e4e7ed;
  color: #c0c4cc;
}
.url_list {
  list-style-type: none;
}
.url_list li {
  margin-top: 10px;
}
.url_list i {
  font-size: 16px;
  cursor: pointer;
  margin-left: 20px;
}
.url_list .name {
  font-weight: bold;
  font-size: 16px;
  margin-right: 10px;
}
.url_list a {
  font-size: 18px;
}
</style>