<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="scss">
.table-tool {
  position: relative;
  z-index: 15;
  padding: 10px 15px;
  border-top: 1px solid #e7e7e7;
  background-color: #f8f8f8;
  border-left: 1px solid #e7e7e7;
  border-right: 1px solid #e7e7e7;
  display: flex;
  .el-button-group + .query {
    margin-left: 10px;
  }
  .table-tool-others {
    margin-left: auto;
  }
  .table-tool-others .el-inline {
    position: relative;
    width: 26px;
    height: 26px;
    padding: 2px;
    line-height: 26px;
    margin-right: 10px;
    text-align: center;
    border: 1px solid #dcdfe6;
    cursor: pointer;
    -webkit-transition: 0.5s all;
    transition: 0.5s all;
    background: #ccc;
    color: #fff;
  }
  .table-tool-others .el-inline:hover {
    background: #909399;
  }
  
}
</style>
