<template>
  <div class="picker_content">
    <ul class="res_list" v-if="list.length>0">
      <li v-for="(item,index) in list" :key="index">
        <el-image :src="item.headimgurl"></el-image>
        <span class="nickname">{{item.nickname}}</span>
        <span class="remove" @click="handleRemove(item,index)">移除</span>
      </li>
    </ul>
    <div class="append" @click="handleChoose">请选择微信</div>
  </div>
</template>

<script>
import wxpicker from "@/views/common/wxpicker";
import { listUnbind } from "@/api/member/unbind";
export default {
  data() {
    return {
      list: [],
      layerId: "",
      queryParams: {
        state: 0
      }
    };
  },
  watch: {
    list(nVal, oVal) {
      if (nVal.length > 0) {
        this.$emit("sendMember", nVal);
      }
    },
    uid(nVal, oVal) {
      if (nVal != null) {
        this.queryParams.uid = nVal;
        this.list = [];
        listUnbind(this.queryParams).then(response => {
          if (response.code == 200) {
            let _data = response.rows;
            _data.map((item, i) => {
              if (item.uid == nVal) {
                let temp = {};
                temp.uid = item.uid;
                temp.nickname = item.nickname;
                temp.headimgurl = item.headimgurl;
                this.list.push(temp);
              }
            });
          }
        });
      }
    }
  },
  props: {
    uid: 0
  },
  methods: {
    handleChoose() {
      var index = this.$layer.iframe({
        content: {
          content: wxpicker, //传递的组件对象
          parent: this, //当前的vue对象
          data: {} //props
        },
        shade: true,
        area: ["600px", "600px"],
        title: "选择成员微信号",
        target: ".app-main"
      });
      this.layerId = index;
    },
    handleRemove(row, idx) {
      this.list = this.list.splice(0, idx);
    }
  }
};
</script>

<style>
.picker_content {
  width: 100%;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  outline: none;
  padding: 0 15px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
  min-height: 36px;
}
.picker_content > .append {
  background-color: #f5f7fa;
  color: #909399;
  vertical-align: middle;
  display: table-cell;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding: 0 20px;
  white-space: nowrap;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  cursor: pointer;
}
.res_list {
  list-style-type: none;
  overflow: hidden;
  padding: 0;
  margin: 0;
  padding: 10px;
  width: 100%;
}
.res_list > li {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding: 10px;
  float: left;
  width: 185px;
  overflow: hidden;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease-in-out;
}
.res_list > li:nth-child(3n) {
  margin-right: 0;
}
.res_list > li .el-image {
  width: 30px;
  height: 30px;
  border-radius: 4px;
  margin-right: 5px;
}
.res_list > li .nickname {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #606266;
  font-size: 13px;
  font-weight: bold;
}
.res_list > li:hover {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.res_list + .append {
  line-height: 78px;
}
.res_list > li .remove {
  margin-left: auto;
  font-size: 12px;
  cursor: pointer;
  color: #ff4949;
  opacity: 0;
}
.res_list > li:hover .remove {
  opacity: 1;
}
</style>