<template>
  <div class="picker_container">
    <el-input
      class="picker_input"
      v-model="queryParams.nickname"
      placeholder="请输入内容"
      suffix-icon="el-icon-search"
    ></el-input>
    <ul class="query_list" v-if="queryList.length>0">
      <li v-for="(item,index) in queryList" :key="index">
        <el-image :src="item.headimgurl"></el-image>
        <span class="nickname">{{item.nickname}}</span>
        <span class="select" @click="handleSelect(item,index)">选择</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { listUnbind } from "@/api/member/unbind";
export default {
  data() {
    return {
      queryParams: {
        state: 0,
        nickname: ""
      },
      queryList: []
    };
  },
  watch: {
    "queryParams.nickname": {
      immediate: true,
      handler(curVal, oldVal) {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.handleInputDone(curVal);
        }, 500);
      }
    }
  },
  methods: {
    handleInputDone(value) {
      if (value === "") {
        return false;
      }
      this.initList();
      console.log("输入完成", value);
    },
    initList() {
      listUnbind(this.queryParams).then(response => {
        if (response.code == 200) {
          this.queryList = response.rows;
        }
      });
    },
    handleSelect(row, i) {
      let temp = {};
      temp.uid = row.uid;
      temp.nickname = row.nickname;
      temp.headimgurl = row.headimgurl;
      this.$parent.list = [];
      this.$parent.list.push(temp);
      this.$parent.$layer.close(this.$parent.layerId);
    }
  },
  mounted() {
    this.initList();
  }
};
</script>

<style>
.query_list {
  list-style-type: none;
  overflow: hidden;
  padding: 0;
  margin: 0;
  padding: 10px;
  width: 100%;
}
.query_list > li {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding: 10px;
  float: left;
  width: 185px;
  margin-bottom: 10px;
  overflow: hidden;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease-in-out;
}
.query_list > li:nth-child(3n) {
  margin-right: 0;
}
.query_list > li .el-image {
  width: 30px;
  height: 30px;
  border-radius: 4px;
  margin-right: 5px;
}
.query_list > li .nickname {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #606266;
  font-size: 13px;
  font-weight: bold;
}
.query_list > li .select {
  margin-left: auto;
  font-size: 12px;
  cursor: pointer;
  color: #1890ff;
  opacity: 0;
}
.query_list > li:hover .select {
  opacity: 1;
}
.query_list > li:hover {
  transform: translateY(-3px);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.picker_container {
  width: 100%;
}
.picker_input {
  width: 100%;
}
</style>