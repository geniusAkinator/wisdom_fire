<!-- @author zhengjie -->
<template>
  <div class="icon-body">
    <el-input
      v-model="name"
      style="position: relative;"
      clearable
      placeholder="请输入图标名称"
      @clear="filterIcons"
      @input.native="filterIcons"
      size="small"
    >
      <i slot="suffix" class="el-icon-search el-input__icon" />
    </el-input>
    <div class="icon-list">
      <div v-for="(item, index) in iconList" :key="index" @click="selectedIcon(item)">
        <svg-icon :icon-class="item" style="height: 30px;width: 16px;" />
        <span>{{ item }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import icons from "./requireIcons";
export default {
  name: "IconSelect",
  data() {
    return {
      name: "",
      iconList: icons
    };
  },
  methods: {
    filterIcons() {
      if (this.name) {
        this.iconList = this.iconList.filter(item => item.includes(this.name));
      } else {
        this.iconList = icons;
      }
    },
    selectedIcon(name) {
      this.$emit("selected", name);
      document.body.click();
    },
    reset() {
      this.name = "";
      this.iconList = icons;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.icon-body {
  width: 100%;
  padding: 10px;
  .icon-list {
    margin-top: 10px;
    height: 200px;
    overflow-y: scroll;
    div {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      width: 31%;
      float: left;
      text-align: center;
      border: #e9ecef solid 1px;
      border-radius: 0.25rem;
      margin: 0 0 10px;
      padding: 5px;
      margin-left: 10px;
      &:nth-child(3n+1){
        margin-left: 0;
      }
      &:hover{
        background: #F8F9FA
      }
    }
    span {
      display: inline-block;
      vertical-align: -0.15em;
      fill: currentColor;
      overflow: hidden;
      margin-left: 5px;
    }
  }
}
</style>
