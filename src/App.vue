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
.container {
  padding: 20px;
}
.container.form {
  width: 100%;
}
.container.form .el-form {
  padding-bottom: 70px;
}
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
.vl-notify,
.vl-notify-mask {
  position: absolute !important;
}
.vl-notify-mask {
  background-color: #000;
  opacity: 0.2;
  right: 0;
  height: auto;
  width: auto;
  left: 0;
  bottom: -9999px;
}
// .vl-notify-content {
//   z-index: 2002 !important;
// }
// .vl-notify {
//   z-index: 2003 !important;
// }
.add-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #f8f8f8;
  padding: 10px;
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid #eee;
  z-index: 99;
}
.add-footer .el-button + .el-button {
  margin-left: 10px;
}

.vl-notify.vl-notify-main + .vl-notify.vl-notify-main + .vl-notify-mask {
  z-index: 503 !important;
}
.readonly > input {
  background: #f5f7fa;
  border-color: #e4e7ed;
  color: #c0c4cc;
}
.readonly input[readonly="readonly"] {
  background: #f5f7fa;
  border-color: #e4e7ed;
  color: #c0c4cc;
}
.toggleMap {
  position: relative;
  width: 38px;
  height: 38px;
  padding: 0;
  line-height: 38px;
  margin-right: 10px;
  text-align: center;
  color: #333;
  border: 1px solid #ccc;
  cursor: pointer;
  -webkit-transition: 0.5s all;
  transition: 0.5s all;
  font-size: 16px;
  margin-left: 20px;
  border-radius: 4px;
}
.toggleMap.active {
  color: #fff;
  background: #409eff;
  border: 1px solid #409eff;
}
.form-map-picker + .map-picker {
  margin-top: 10px;
}
.form-map-picker .el-col:nth-child(2) {
  margin-left: 20px;
}
</style>
