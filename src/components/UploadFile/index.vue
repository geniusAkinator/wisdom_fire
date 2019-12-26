<!-- 文件上传 -->
<template>
  <div>
    <el-button type="primary" @click="handleUpload">上传文件</el-button>
    <input
      type="file"
      ref="file"
      hidden
      @change="uploadFile"
      name="files"
      accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, text/plain, image/*, video/*, audio/*, .pdf, application/zip, application/x-zip, application/x-zip-compressed, application/x-rar-compressed"
    />
  </div>
</template>

<script>
import { uploadFile } from "@/api/common/upload";
import utils from "@/utils/utils";
export default {
  data() {
    return {};
  },
  methods: {
    handleUpload() {
      this.$refs.file.click();
    },
    uploadFile() {
      let _this = this;
      let _file = _this.$refs.file.files;
      if (_file.length == 0) {
        //非空
        _this.msgError("上传文件不能为空");
        return;
      }
      let file = _file[0];
      if (file.size > 20 * 1024 * 1024) {
        //上传文件大小限制
        _this.msgError("上传文件不能大于20M");
        return;
      }
      console.log(file.type)
      utils
        .reader(file)
        .then(function(reader) {
          var blob = utils.dataURItoBlob(reader.result);
          let fd = new FormData();
          fd.append("files", blob);
          fd.append("files", blob);
          return uploadFile(fd);
        })
        .then(response => {
          console.log(response);
          if (response.code == 200) {
            _this.msgSuccess("上传成功");
            _this.$emit("sendFile", response.fileUrl);
          }
        });
    }
  }
};
</script>

<style>
</style>