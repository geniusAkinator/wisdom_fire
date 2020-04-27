<template>
  <div class="imgpicker">
    <div class="btn-group">
      <el-button-group>
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
        >删除</el-button>
        <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAdd">上传</el-button>
        <input type="file" ref="imgFile" accept="image/*" @change="handleChange" hidden />
      </el-button-group>
    </div>
    <div class="preview-content">
      <div v-if="list.length">
        <div
          v-for="(item,index) in list"
          :key="index"
          :class="item.checked?'img-preview active':'img-preview'"
          @click="handleSelect(index,item)"
        >
          <el-image :src="baseUrl+item.pictureurl" fit="cover"></el-image>
          <div class="cover">
            <i class="el-icon-check"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="add-footer">
      <el-button
        size="small"
        type="primary"
        icon="el-icon-check"
        @click="handleSubmit"
        :disabled="!isSelect"
      >选择</el-button>
      <el-button size="small" icon="el-icon-back" @click="handleBack">返回</el-button>
    </div>
  </div>
</template>

<script>
import { uploadImage, listImage, delImage } from "@/api/common/upload";
import utils from "@/utils/utils";
export default {
  data() {
    return {
      multiple: true,
      isSelect: false,
      form: {
        deptId: this.$store.getters.dept.deptId
      },
      dform: {
        deptId: this.$store.getters.dept.deptId,
        ids: ""
      },
      list: [],
      baseUrl: this.$parent.baseUrl,
      imgs: "",
      deptId: this.$store.getters.dept.deptId,
      isMulti: this.$parent.multiple
    };
  },
  watch: {
    "dform.ids"(nVal, oVal) {
      this.multiple = true;
      if (nVal !== "") this.multiple = false;
    },
    imgs(nVal, oVal) {
      this.isSelect = false;
      if (nVal !== "") this.isSelect = true;
    }
  },
  methods: {
    handleAdd() {
      this.$refs.imgFile.click();
    },
    handleDelete() {
      let _this = this;
      delImage(_this.dform).then(response => {
        if (response.code == 200) {
          _this.msgSuccess("删除成功");
          _this.init();
        }
      });
    },
    handleChange() {
      let _this = this;
      let imgFile = _this.$refs.imgFile.files;
      if (imgFile.length == 0) {
        _this.msgError("上传图片不能为空");
        return;
      }
      let file = imgFile[0];
      if (
        !(
          file.type == "image/jpeg" ||
          file.type == "image/png" ||
          file.type == "image/gif" ||
          file.type == "image/bmp"
        )
      ) {
        _this.msgError("请上传图片");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        _this.msgError("上传图片不能大于2M");
        this.value = null;
        return;
      }
      utils
        .reader(file)
        .then(function(reader) {
          var blob = utils.dataURItoBlob(reader.result);
          let fd = new FormData();
          fd.append("files", blob);
          fd.append("deptId", _this.deptId);
          return uploadImage(fd);
        })
        .then(response => {
          if (response.code == 200) {
            _this.msgSuccess("上传成功");
            _this.init();
          }
        });
    },
    handleSelect(index, row) {
      let isMulti = this.isMulti;
      if (isMulti) {
        this.list[index].checked = !this.list[index].checked;
        this.dform.ids = "";
        this.imgs = "";
        let _ids = "";
        let _imgs = "";
        this.list.map((item, i) => {
          if (item.checked) {
            _ids = _ids + "," + item.id;
            _imgs = _imgs + "|" + item.pictureurl;
          }
        });
        this.dform.ids = _ids.substr(1);
        this.imgs = _imgs.substr(1);
      } else {
        this.list.map((item, i) => {
          item.checked = false;
        });
        this.list[index].checked = !this.list[index].checked;
        this.dform.ids = row.id;
        this.imgs = row.pictureurl;
      }
    },
    handleSubmit() {
      this.$parent.imgs = this.imgs;
      this.closeDialog();
    },
    handleBack() {
      this.closeDialog();
    },
    closeDialog() {
      this.$parent.$layer.close(this.$parent.layerId);
    },
    init() {
      listImage(this.form).then(response => {
        console.log(response);
        if (response.code == 200) {
          let _list = response.rows;
          _list.map((item, i) => {
            item.checked = false;
          });
          this.list = _list;
        }
      });
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style>
.img-preview {
  width: 100px;
  height: 100px;
  float: left;
  margin-left: 10px;
  border: 1px solid #dcdfe6;
  margin-bottom: 10px;
  border-radius: 4px;
  cursor: pointer;
  position: relative;
}
.img-preview .el-image {
  width: 100%;
  height: 100%;
}
.img-preview .cover {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 26px;
  opacity: 0;
}
.img-preview .cover i {
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  padding: 15px;
}
.img-preview.active .cover {
  opacity: 1;
}
.img-preview.active {
  border: 1px solid #1890ff;
}
.btn-group {
  background: #f8f8f8;
  position: absolute;
  top: 40px;
  left: 0;
  right: 0;
  padding: 10px;
}
.preview-content {
  position: absolute;
  top: 100px;
  left: 0;
  right: 0;
  bottom: 54px;
}
</style>