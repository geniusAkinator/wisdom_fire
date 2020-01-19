<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  watch: {
    $route: function(newVal, oldVal) {
      this.$layer.closeAll();
    }
  }
};
</script>

<style lang="scss">
.container {
  padding: 20px;
}
.container.form {
  width: 100%;
  height: 100%;
  overflow: scroll;
  padding-bottom: 54px;
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
  height: initial !important;
  bottom: -9999px !important;
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
.app-wrapper {
  overflow: hidden;
}
.help-block {
  color: #999;
  margin-top: 0;
  margin-bottom: 0;
  display: block;
}
.tips {
  display: flex;
  justify-content: flex-end;
  padding-bottom: 10px;
}
.el-card__header .tips {
  padding: 18px 0;
}
.tips-item {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
  line-height: 19px;
}
.tips-item:last-child {
  margin-right: 0;
}
.circle {
  width: 14px;
  height: 14px;
  display: block;
  border-radius: 50%;
  margin-right: 5px;
}
.circle.success {
  background: #67c23a;
}
.circle.warning {
  background: #e6a23c;
}
.circle.danger {
  background: #f56c6c;
}
.circle.info {
  background: #909399;
}
.el-card {
  position: relative;
}
.box-card .el-carousel .el-carousel__indicators {
  position: absolute;
  top: 0;
  right: 0;
  left: auto;
  bottom: auto;
  padding: 2px 20px;
  border-bottom: 0;
}
.box-card .el-carousel {
  position: initial;
}
.box-card .el-carousel .el-carousel__button {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: block;
}
.box-card .el-carousel .el-carousel__button.is-active {
  background: #999;
}
.box-card.no-padding .el-card__body {
  padding: 0;
}
.block-content .el-carousel__container {
  height: 200px;
}
.header_right {
  position: absolute;
  right: 20px;
  top: 0;
}
.el-input__prefix .svg-icon {
  margin-top: 2px;
  margin-left: 5px;
}
.el-tabs .el-tabs__nav-next,
.el-tabs .el-tabs__nav-prev {
  width: 40px;
  display: block;
  font-size: 18px;
  text-align: center;
  border-bottom: 1px solid #dfe4ed;
  line-height: 39px;
}
.el-card + .el-table {
  margin-top: 20px;
}

.calendar .el-calendar__header {
  position: absolute;
  top: 0;
  right: 0;
  padding: 13px 20px;
  border-bottom: 0;
}
.el-calendar__title {
  display: none;
}
.el-calendar__body {
  padding: 0;
}
.el-calendar-table .el-calendar-day {
  height: auto;
}

#tags-view-container
  .el-tabs--card
  > .el-tabs__header
  .el-tabs__item.is-active {
  border-bottom-color: #dfe4ed;
}

#tags-view-container .el-tabs__header {
  margin: 0;
}

::-webkit-scrollbar {
  width: 14px;
  height: 14px;
}

::-webkit-scrollbar-track,
::-webkit-scrollbar-thumb {
  border-radius: 999px;
  border: 5px solid transparent;
}

::-webkit-scrollbar-track {
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2) inset;
}

::-webkit-scrollbar-thumb {
  min-height: 20px;
  background-clip: content-box;
  box-shadow: 0 0 0 5px rgba(0, 0, 0, 0.2) inset;
}

.app-main ::-webkit-scrollbar-track {
  box-shadow: 1px 1px 5px rgba(255, 255, 255, 0.2) inset;
}

.app-main ::-webkit-scrollbar-thumb {
  min-height: 20px;
  background-clip: content-box;
  box-shadow: 0 0 0 5px rgba(255, 255, 255, 0.2) inset;
}

::-webkit-scrollbar-corner {
  background: transparent;
}
</style>
