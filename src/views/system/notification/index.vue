<template>
  <div class="container">
    <el-form ref="form" :model="form" label-width="140px">
      <el-row>
        <el-col :span="2" style="position:relative">
          <div class="notification_triangle_mark"></div>
          <svg-icon class-name="count-icon" icon-class="mark1" />
        </el-col>
        <el-col :span="22">
          <el-form-item label="误报故障自动处理">
            <el-switch v-model="form.isAutomate"></el-switch>
            <div v-if="form.isAutomate">
              <el-input-number
                v-model="num"
                @change="handleChange"
                :min="1"
                label="描述文字"
                size="mini"
              ></el-input-number>
              <span>分钟内不再重复上报，故障自动设置为误报。</span>
            </div>
          </el-form-item>
          <el-form-item label="故障处理超时设置">
            <el-switch v-model="form.isOvertime"></el-switch>
            <div v-if="form.isOvertime">
              <el-input-number
                v-model="num"
                @change="handleChange"
                :min="1"
                label="描述文字"
                size="mini"
              ></el-input-number>
              <span>分钟内不再重复上报，故障自动设置为超时。</span>
            </div>
          </el-form-item>
          <el-form-item label="故障处理通知超时">
            <el-switch v-model="form.isNotify"></el-switch>
            <div v-if="form.isNotify">
              <div>
                <el-input-number
                  v-model="num"
                  @change="handleChange"
                  :min="1"
                  label="描述文字"
                  size="mini"
                ></el-input-number>
                <span>分钟</span>
              </div>
              <ul class="member_ul">
                <span class="member_label">提醒人:</span>
                <li v-for="(item,index) in elist" :key="index">
                  <span>{{item.label}}</span>
                  <i class="el-icon-close" @click="handleDel(index)"></i>
                </li>
              </ul>
              <el-button size="medium" icon="el-icon-plus" round @click="handleNotifyClick"></el-button>
            </div>
          </el-form-item>
          <div class="divider_line dash"></div>
          <div class="add_box">
            <el-button
              type="primary"
              icon="el-icon-plus"
              size="medium"
              @click="handleAddErrRule"
            >新增规则</el-button>
          </div>
          <el-form-item v-for="(item,i) in errRule" :key="i">
            <div>
              <el-input-number v-model="item.num" :min="1" label="描述文字" size="mini"></el-input-number>
              <span>分钟</span>
            </div>
            <ul class="member_ul">
              <span class="member_label">提醒人:</span>
              <li v-for="(item,index) in item.children" :key="index">
                <span>{{item.label}}</span>
                <i class="el-icon-close"></i>
              </li>
            </ul>
            <el-button size="medium" icon="el-icon-plus" round @click="handleClick"></el-button>
          </el-form-item>
        </el-col>
        <div class="divider_line"></div>
        <el-col :span="2" style="position:relative">
          <div class="notification_circle_mark">
            <svg-icon class-name="count-icon" icon-class="mark2" />
          </div>
        </el-col>
        <el-col :span="22">
          <el-form-item label="隐患处理超时设置">
            <el-switch v-model="form.isOvertimeHazard"></el-switch>
            <div v-if="form.isOvertimeHazard">
              <el-input-number
                v-model="num"
                @change="handleChange"
                :min="1"
                label="描述文字"
                size="mini"
              ></el-input-number>
              <span>分钟内不再重复上报，隐患自动设置为超时。</span>
            </div>
          </el-form-item>
          <el-form-item label="隐患处理通知超时">
            <el-switch v-model="form.isNotifyHazard"></el-switch>
            <div v-if="form.isNotifyHazard">
              <div>
                <el-input-number
                  v-model="num"
                  @change="handleChange"
                  :min="1"
                  label="描述文字"
                  size="mini"
                ></el-input-number>
                <span>分钟</span>
              </div>
              <ul class="member_ul">
                <span class="member_label">提醒人:</span>
                <li v-for="(item,index) in hlist" :key="index">
                  <span>{{item.label}}</span>
                  <i class="el-icon-close" @click="handleHazardDel(index)"></i>
                </li>
              </ul>
              <el-button size="medium" icon="el-icon-plus" round @click="handleHazardNotifyClick"></el-button>
            </div>
          </el-form-item>
          <div class="divider_line dash"></div>
          <div class="add_box">
            <el-button type="primary" icon="el-icon-plus" size="medium">新增规则</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <div class="sysset-footer">
      <el-button type="primary" icon="el-icon-check" size="small">保存</el-button>
    </div>
    <!-- <div class="picker-content">
      <transition name="myFadeRight" mode="out-in"></transition>
    </div>-->
    <el-drawer :visible.sync="drawer" :direction="direction" :before-close="handleBeforeClose">
      <my-member-picker v-clickOutSide="handleClose" :list="nlist" @sendMember="getMember"></my-member-picker>
    </el-drawer>
  </div>
</template>

<script>
import MyMemberPicker from "@/components/MemberPicker/index";
export default {
  data() {
    return {
      form: {
        isAutomate: false,
        isOvertime: false,
        isNotify: false,
        isOvertimeHazard: false,
        isNotifyHazard: false
      },
      num: 1,
      show: false,
      elist: [],
      hlist: [],
      drawer: false,
      direction: "rtl",
      nlist: [],
      errRule: [],
      which: ""
    };
  },
  methods: {
    handleBeforeClose(done) {
      done();
    },
    handleChange() {},
    handleNotifyClick() {
      this.drawer = true;
      this.nlist = this.elist;
      this.which = "first";
    },
    handleHazardNotifyClick() {
      this.drawer = true;
      this.nlist = this.hlist;
      this.which = "second";
    },
    handleClose(e) {},
    getMember(e) {
      if (this.which == "first") {
        this.elist = e;
      } else if (this.which == "second") {
        this.hlist = e;
      }
    },
    handleDel(e) {
      this.elist.splice(e, 1);
    },
    handleHazardDel(e) {
      this.hlist.splice(e, 1);
    },
    handleAddErrRule() {
      let temp = {};
      temp.num = 1;
      temp.children = [];
      this.errRule.push(temp);
      console.log(this.errRule);
    },
    handleClick() {
      console.log("dafsd");
      this.drawer = true;
    }
  },
  components: {
    MyMemberPicker
  }
};
</script>

<style>
/* .picker-content {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 53px;
  width: 300px;
  z-index: 999;
} */
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
.myFadeRight-enter-active,
.myFadeRight-leave-active {
  transition: all 0.3s ease-in-out;
}
.myFadeRight-enter, .myFadeRight-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(300px);
}
.member_ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  float: left;
}
.member_ul li {
  border: 1px solid #dcdfe6;
  float: left;
  border-radius: 5px;
  margin-right: 10px;
  position: relative;
}
.member_ul li span {
  line-height: 0 !important;
  padding: 10px;
  padding-right: 10px;
  font-size: 12px;
}

.member_ul li i:hover {
  background: #ff0000;
  color: #fff;
  border-radius: 2px;
  transition: all 0.3s ease-in-out;
}
.member_ul i {
  display: inline-block;
  margin-right: 10px;
  cursor: pointer;
}
.el-dialog__wrapper {
  z-index: 999999 !important;
}
.divider_line {
  width: 100%;
  height: 1px;
  background: #dcdfe6;
  float: left;
  margin-bottom: 20px;
}
.divider_line.dash {
  width: 100%;
  height: 1px;
  float: left;
  margin-bottom: 20px;
  background: initial;
  background-image: repeating-linear-gradient(
    90deg,
    #dcdfe6,
    #dcdfe6 8px,
    #fff 0,
    #fff 16px
  );
}
.add_box {
  margin-bottom: 20px;
}
.notice_icon {
  margin: auto;
  text-align: center;
  font-size: 30px;
  background: #ffa678;
  padding: 5px;
  color: #fff;
  border-radius: 4px;
}
.member_label {
  margin-right: 10px;
  float: left;
}
.notification_circle_mark {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #e5790d;
  display: flex;
  align-items: center;
  justify-content: center;
}

.notification_triangle_mark {
  position: relative;
  background-color: #e41f17;
  text-align: left;
  margin-left: 4px;
}
.notification_triangle_mark:before,
.notification_triangle_mark:after {
  content: "";
  position: absolute;
  background-color: inherit;
}
.notification_triangle_mark,
.notification_triangle_mark:before,
.notification_triangle_mark:after {
  width: 18px;
  height: 18px;
  border-top-right-radius: 30%;
}

.notification_triangle_mark {
  transform: rotate(-60deg) skewX(-30deg) scale(1, 0.866);
}
.notification_triangle_mark:before {
  transform: rotate(-135deg) skewX(-45deg) scale(1.414, 0.707)
    translate(0, -50%);
}
.notification_triangle_mark:after {
  transform: rotate(135deg) skewY(-45deg) scale(0.707, 1.414) translate(50%);
}
.notification_circle_mark svg {
  text-align: center;
  width: 100%;
  line-height: 40px;
  color: #fff;
  font-size: 22px;
}
.notification_triangle_mark + svg {
  color: #fff;
  font-size: 22px;
  position: absolute;
  left: 2px;
  top: 0;
  z-index: 10;
}
</style>