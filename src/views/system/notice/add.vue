<template>
  <div class="container form">
    <el-form ref="form" :model="form" :rules="rules" label-width="90px">
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
      <el-form-item label="封面" prop="cover" class="readonly">
        <el-input v-model="form.cover" placeholder="请选择封面" readonly />
        <my-image-picker :multiple="false" @sendImage="getImage"></my-image-picker>
        <span class="help-block">图片格式必须为:png,jpeg,jpg;建议使用png格式图片,以保持效果;</span>
      </el-form-item>
      <el-form-item label="公告标题" prop="noticeTitle">
        <el-input v-model="form.noticeTitle" placeholder="请输入公告标题"></el-input>
      </el-form-item>
      <el-form-item label="公告类型" prop="noticeType">
        <el-select v-model="form.noticeType" placeholder="请选择公告类型">
          <el-option
            v-for="item in typeOptions"
            :key="item.dictValue"
            :label="item.dictLabel"
            :value="item.dictValue"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="公告描述">
        <el-input v-model="form.description" placeholder="请输入公告描述"></el-input>
      </el-form-item>
      <el-form-item label="公告内容">
        <Editor v-model="form.noticeContent" />
      </el-form-item>
      <!-- <el-form-item label="附件" class="readonly">
        <el-input v-model="form.file" placeholder="请上传附件" :readonly="true">
          <template slot="append">
            <my-file-upload @sendFile="getFile"></my-file-upload>
          </template>
        </el-input>
      </el-form-item>-->
      <el-form-item label="查询关键字" prop="keyword">
        <el-input v-model="form.keyword" placeholder="请输入查询关键字"></el-input>
        <span class="help-block">用|分隔符隔开</span>
      </el-form-item>
    </el-form>
    <div class="add-footer">
      <el-button size="small" type="primary" icon="el-icon-check" @click="handleSubmit('form')">提交</el-button>
      <el-button size="small" icon="el-icon-back" @click="handleBack">返回</el-button>
    </div>
  </div>
</template>

<script>
import { addNotice } from "@/api/system/notice";
import { listBuilding } from "@/api/main/building";
import { listFactory } from "@/api/main/factory";
import { Loading } from "element-ui";
import Editor from "@/components/Editor";
import MyFileUpload from "@/components/UploadFile";
import MyImagePicker from "@/components/UploadImage";

export default {
  data() {
    return {
      form: {
        factoryId: "",
        description: "",
        noticeTitle: "",
        noticeType: "",
        noticeContent: "",
        status: "0",
        file: "",
        cover: "",
        keyword: ""
      },
      rules: {
        factoryId: [
          { required: true, message: "请选择所属工厂", trigger: "change" }
        ],
        noticeTitle: [
          { required: true, message: "公告标题不能为空", trigger: "blur" }
        ],
        noticeType: [
          { required: true, message: "公告类型不能为空", trigger: "blur" }
        ],
        cover: [
          { required: true, message: "封面图片不能为空", trigger: "change" }
        ]
      },
      factoryList: [],
      typeOptions: [],
      statusOptions: []
    };
  },
  methods: {
    handleSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          addNotice(this.form).then(response => {
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
      listFactory().then(response => {
        if (response.code === 200) {
          this.factoryList = response.rows;
        }
      });
      this.getDicts("sys_notice_status").then(response => {
        if (response.code === 200) {
          this.statusOptions = response.data;
        }
      });
      this.getDicts("sys_notice_type").then(response => {
        if (response.code === 200) {
          this.typeOptions = response.data;
          console.log(this.typeOptions);
        }
      });
      setTimeout(() => {
        loadingInstance.close();
      }, 300);
    },
    getFile(e) {
      this.form.file = e;
    },
    getImage(e) {
      this.form.cover = e;
    }
  },
  mounted() {
    this.initForm();
  },
  components: {
    Editor,
    MyFileUpload,
    MyImagePicker
  }
};
</script>

<style>
</style>