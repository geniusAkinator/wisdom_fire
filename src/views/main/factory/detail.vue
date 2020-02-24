<template>
  <div class="container">
    <el-card class="factory_detail" shadow="never">
      <div slot="header" class="clearfix">
        <span>工厂概况</span>
      </div>
      <div class="text item">
        <el-row>
          <el-col :span="8">
            <div class="factory_logo">
              <template v-if="this.form.picture!=''">
                <el-image class="logo_img" :src="baseUrl+this.form.picture" fit="contain"></el-image>
              </template>
              <span class="logo_name">{{this.form.factoryName}}</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="detail-item">
              <label for>所属代理商:</label>
              <span>{{this.deptName}}</span>
            </div>
            <div class="detail-item">
              <label for>工厂类型:</label>
              <span>{{this.factoryTypeName}}</span>
            </div>
            <div class="detail-item">
              <label for>负责人:</label>
              <span>{{this.form.leader}}&nbsp;&nbsp;{{this.form.phone}}</span>
            </div>
            <div class="detail-item">
              <label for>座机号:</label>
              <span>{{this.form.tel}}</span>
            </div>
            <div class="detail-item">
              <label for>地址:</label>
              <span>{{this.form.address}}</span>
            </div>
            <div class="detail-item">
              <label for>位置:</label>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="detail-item">
              <label for>设备总数:</label>
              <span>N/A</span>
            </div>
            <div class="detail-item">
              <label for>员工总数:</label>
              <span>N/A</span>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getFactory } from "@/api/main/factory";
import { listDept } from "@/api/system/dept";

export default {
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_API,
      id: this.$route.params.id,
      form: {
        factoryName: "",
        address: "",
        description: "",
        factoryType: "",
        latitude: "",
        leader: "",
        longitude: "",
        phone: "",
        picture: "",
        province: "",
        tel: "",
        factoryId: this.$parent.eid,
        deptId: ""
      },
      dlist: [],
      deptName: "",
      factoryTypeName: "",
      typeOptions: [],
      deptId: 0
    };
  },
  watch: {
    "form.factoryType"(nVal, oVal) {
      this.typeOptions.map((item, i) => {
        if (item.dictValue == this.form.factoryType) {
          this.factoryTypeName = item.dictLabel;
        }
      });
    },
    "form.deptId"(nVal, oVal) {
      this.dlist.map((item, i) => {
        item.children.map((citem, j) => {
          if (citem.deptId == this.form.deptId) {
            this.deptName = item.deptName;
          }
        });
        if (item.deptId == this.form.deptId) {
          this.deptName = item.deptName;
        }
      });
    }
  },
  methods: {
    init() {
      listDept().then(response => {
        if (response.code == 200) {
          this.dlist = response.data[0].children;
        }
      });
      this.getDicts("main_factory_type").then(response => {
        if (response.code == 200) {
          this.typeOptions = response.data;
        }
      });
      getFactory(this.id).then(response => {
        if (response.code === 200) {
          let _data = response.data;
          this.deptId = _data.pId;
          this.form = _data.sysFactory;
        }
      });
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="scss">
.factory_detail {
  background: #1e2d38;
  color: #fff;
  .factory_logo {
    .logo_img {
      width: 200px;
      height: 200px;
      display: block;
      margin: auto;
      border-radius: 4px;
    }
    .logo_name {
      display: block;
      font-weight: bold;
      font-size: 16px;
      width: 100%;
      text-align: center;
      margin-top: 20px;
    }
  }
  .detail-item {
    width: 100%;
    overflow: hidden;
    line-height: 36px;
    label {
      display: block;
      text-align: right;
      vertical-align: middle;
      float: left;
      font-size: 14px;
      color: #81888e;
      line-height: 40px;
      padding: 0 12px 0 0;
      box-sizing: border-box;
      line-height: 36px;
      width: 100px;
    }
    span {
    }
  }
}
</style>