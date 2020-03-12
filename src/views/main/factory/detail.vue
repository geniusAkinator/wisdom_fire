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
              <el-image class="logo_img" :src="baseUrl+form.picture" fit="contain">
                <div slot="error" class="logo_img_err">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
              <span class="logo_name">{{form.factoryName}}</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="detail-item">
              <label for>所属代理商:</label>
              <span>{{deptName}}</span>
            </div>
            <div class="detail-item">
              <label for>工厂类型:</label>
              <span>{{factoryTypeName}}</span>
            </div>
            <div class="detail-item">
              <label for>负责人:</label>
              <span>{{form.leader}}&nbsp;&nbsp;{{form.phone}}</span>
            </div>
            <div class="detail-item">
              <label for>座机号:</label>
              <span>{{form.tel}}</span>
            </div>
            <div class="detail-item">
              <label for>地址:</label>
              <span>{{form.address}}</span>
            </div>
            <div class="detail-item">
              <label for>位置:</label>
              <my-map-pos :data="pos" v-if="pos.lat!=''&&pos.lng!=''&&update"></my-map-pos>
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
import MyMapPos from "@/views/main/factory/map";
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
      pos: {
        lat: "",
        lng: ""
      },
      update: true,
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
          this.pos.lat = _data.sysFactory.latitude;
          this.pos.lng = _data.sysFactory.longitude;
        }
      });
    },
    reload() {
      this.update = false;
      this.$nextTick(() => {
        this.update = true;
      });
    }
  },
  mounted() {
    this.init();
    window.addEventListener("resize", this.reload);
  },
  components: {
    MyMapPos
  }
};
</script>

<style lang="scss">
.factory_detail {
  background: rgb(48, 65, 86);
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
    .logo_img_err {
      width: 200px;
      height: 200px;
      border-radius: 4px;
      background: #f5f7fa;
      color: #909399;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 30px;
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
      color: #e0e0e0;
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