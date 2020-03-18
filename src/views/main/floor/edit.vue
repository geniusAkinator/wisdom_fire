<template>
  <div class="container form">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="所属楼宇" prop="factoryId">
        <el-select v-model="form.buildingId" placeholder="请选择所属楼宇" disabled>
          <el-option
            v-for="(item,index) in buildingList"
            :key="index"
            :label="item.name"
            :value="item.buildingId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="楼层名称" prop="floorName">
        <el-input v-model="form.floorName" placeholder="请输入楼层名称" />
      </el-form-item>
      <el-form-item label="图片" prop="picture" class="readonly">
        <el-input v-model="form.picture" placeholder="请输入图片" readonly />
        <my-image-picker :images="form.picture" @sendImage="getImage"></my-image-picker>
      </el-form-item>
      <el-form-item label="层级" prop="level">
        <el-input type="number" v-model="form.level" placeholder="请输入层级">
          <template slot="append">F</template>
        </el-input>
      </el-form-item>
    </el-form>
    <div class="add-footer">
      <el-button size="small" type="primary" icon="el-icon-check" @click="handleSubmit">提交</el-button>
      <el-button size="small" icon="el-icon-back" @click="handleBack">返回</el-button>
    </div>
  </div>
</template>

<script>
import { listBuilding } from "@/api/main/building";
import { updateFloor, getFloor } from "@/api/main/floor";
import { Loading } from "element-ui";
import MyImagePicker from "@/components/UploadImage";

export default {
  data() {
    return {
      form: {
        floorId: this.$parent.eid,
        floorName: "",
        picture: "",
        createtime: "",
        updatetime: "",
        buildingId: "",
        level: ""
      },
      rules: {},
      buildingList: []
    };
  },
  watch: {
    buildingList() {
      this.form.buildingId = this.$parent.pid * 1;
    }
  },
  methods: {
    handleSubmit() {
      updateFloor(this.form).then(response => {
        if (response.code === 200) {
          this.msgSuccess("更新成功");
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
      listBuilding(this.queryParams)
        .then(response => {
          if (response.code === 200) {
            this.buildingList = response.rows;
            return getFloor(this.form.floorId);
          }
        })
        .then(response => {
          if (response.code === 200) {
            this.form = response.data;
          }
        });
      setTimeout(() => {
        loadingInstance.close();
      }, 300);
    },
    getImage(e) {
      this.form.picture = e;
    }
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
</style>