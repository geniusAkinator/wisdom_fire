<!-- 图片选择器 -->
<template>
  <div class="myUpload">
    <template v-if="list.length">
      <div
        v-for="(item,index) in list"
        :key="index"
        class="image-item"
        @click="handleDel(index,item)"
      >
        <el-image :src="baseUrl+item" fit="cover"></el-image>
        <div class="item-cover">
          <i class="el-icon-delete"></i>
        </div>
      </div>
    </template>
    <div class="upload-btn" @click="handleClick">
      <i class="el-icon-plus"></i>
    </div>
  </div>
</template>

<script>
import imgpicker from "@/views/common/imgpicker";
export default {
  data() {
    return {
      idx: "",
      imgs: "",
      list: [],
      baseUrl: process.env.VUE_APP_BASE_API
    };
  },
  watch: {
    images(nVal, oVal) {
      this.imgs = nVal;
    },
    imgs(nVal, oVal) {
      this.$emit("sendImage", nVal);
      if (nVal == "") {
        this.list = [];
      } else {
        this.list = nVal.split("|");
      }
    }
  },
  props: {
    images: ""
  },
  methods: {
    handleClick() {
      var index = this.$layer.iframe({
        content: {
          content: imgpicker, //传递的组件对象
          parent: this, //当前的vue对象
          data: {} //props
        },
        shade: true,
        area: ["600px", "600px"],
        title: "图片选择器",
        target: ".app-main"
      });
      this.idx = index;
    },
    handleDel(index, row) {
      let temp = this.imgs.split("|");
      let _imgs = "";
      temp.splice(index, 1);
      console.log(temp);
      temp.map((item, i) => {
        _imgs = _imgs + "|" + item;
      });
      this.imgs = _imgs.substr(1);
    }
  }
};
</script>

<style>
.el-input + .myUpload {
  margin-top: 10px;
}
.upload-btn {
  width: 110px;
  height: 110px;
  border: 1px dashed #409eff;
  color: #409eff;
  border-radius: 3px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  font-size: 30px;
  cursor: pointer;
  float: left;
  margin-left: 1px;
  float: left;
}
.image-item {
  width: 110px;
  height: 110px;
  margin-right: 10px;
  float: left;
  border-radius: 4px;

  position: relative;
}
.image-item .el-image {
  width: 110px;
  height: 110px;
  border: 1px solid #dcdfe6;
}
.myUpload {
  overflow: hidden;
}
.image-item:hover .item-cover {
  opacity: 1;
}
.item-cover {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 26px;
  opacity: 0;
}
.item-cover i {
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  padding: 15px;
  cursor: pointer;
}
</style>